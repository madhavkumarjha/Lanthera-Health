const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { width: 320, height: 800, label: '320x800' },
  { width: 360, height: 800, label: '360x800' },
  { width: 375, height: 812, label: '375x812' },
  { width: 390, height: 844, label: '390x844' },
  { width: 430, height: 932, label: '430x932' },
  { width: 768, height: 1024, label: '768x1024' },
  { width: 1024, height: 768, label: '1024x768' },
  { width: 1280, height: 800, label: '1280x800' },
];

const ROUTES = [
  '/',
  '/about',
  '/departments',
  '/departments/cardiology',
  '/doctors',
  '/doctors/doc-founder',
  '/team',
  '/guide',
  '/book',
  '/emergency',
  '/path',
  '/families',
  '/families/board',
  '/ledger',
  '/packages',
  '/diagnostics',
  '/portal',
  '/understand',
  '/international',
  '/careers',
  '/contact',
];

async function deepScan() {
  const browser = await chromium.launch({ headless: true });
  const findings = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    await page.addInitScript(() => {
      localStorage.setItem('lanthera_consent', 'accepted');
      localStorage.setItem('lanthera_theme', 'light');
    });

    for (const route of ROUTES) {
      const url = `http://localhost:3000${route}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(400);

      // Deep inspection in page context
      const result = await page.evaluate((vpWidth) => {
        const issues = [];

        // 1. Temporarily disable overflow-x: hidden on all wrappers to see if unmasked content exceeds viewport
        const wrappers = Array.from(document.querySelectorAll('*')).filter(el => {
          const s = window.getComputedStyle(el);
          return s.overflowX === 'hidden' || s.overflowX === 'clip';
        });

        // Store original inline styles
        const origStyles = wrappers.map(w => w.getAttribute('style') || '');
        wrappers.forEach(w => {
          w.style.overflowX = 'visible';
        });

        const docScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        if (docScrollWidth > vpWidth || bodyScrollWidth > vpWidth) {
          // Find the exact offenders causing this overflow
          const allEls = document.querySelectorAll('*');
          for (const el of allEls) {
            if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'TITLE', 'BR'].includes(el.tagName)) continue;
            const r = el.getBoundingClientRect();
            if (r.right > vpWidth + 1.5 && r.width > 0 && r.height > 0) {
              const s = window.getComputedStyle(el);
              if (s.display !== 'none' && s.visibility !== 'hidden') {
                issues.push({
                  type: 'UNMASKED_HORIZONTAL_OVERFLOW',
                  tag: el.tagName.toLowerCase(),
                  id: el.id || undefined,
                  className: typeof el.className === 'string' ? el.className.slice(0, 120) : '',
                  text: (el.innerText || el.textContent || '').slice(0, 60).trim().replace(/\s+/g, ' '),
                  width: Math.round(r.width),
                  right: Math.round(r.right),
                  excess: Math.round(r.right - vpWidth),
                });
              }
            }
          }
        }

        // Restore wrappers
        wrappers.forEach((w, idx) => {
          if (origStyles[idx]) {
            w.setAttribute('style', origStyles[idx]);
          } else {
            w.removeAttribute('style');
          }
        });

        // 2. Header Inspection
        const header = document.querySelector('header');
        if (header) {
          const hRect = header.getBoundingClientRect();
          const logo = header.querySelector('a[aria-label*="Home"]') || header.querySelector('svg');
          const logoRect = logo ? logo.getBoundingClientRect() : null;
          const controlsDiv = header.querySelector('.flex.items-center.gap-1, .flex.items-center.gap-2, [class*="shrink-0"]');
          const controlsRect = controlsDiv ? controlsDiv.getBoundingClientRect() : null;

          if (hRect.width > vpWidth + 1) {
            issues.push({
              type: 'HEADER_OVERFLOW',
              tag: 'header',
              width: Math.round(hRect.width),
              excess: Math.round(hRect.width - vpWidth),
            });
          }

          if (logoRect && controlsRect && logoRect.right > controlsRect.left) {
            issues.push({
              type: 'HEADER_COLLISION',
              tag: 'header',
              detail: `Logo overlaps controls by ${Math.round(logoRect.right - controlsRect.left)}px`,
            });
          }

          if (logoRect && logoRect.width < 10) {
            issues.push({
              type: 'LOGO_COLLAPSED',
              tag: 'header logo',
              width: Math.round(logoRect.width),
            });
          }
        }

        // 3. Form inputs / selects / buttons clipping
        const interactives = document.querySelectorAll('input, select, textarea, button');
        for (const el of interactives) {
          const r = el.getBoundingClientRect();
          if (r.right > vpWidth + 1 && r.width > 0 && r.height > 0) {
            const s = window.getComputedStyle(el);
            if (s.display !== 'none' && s.visibility !== 'hidden') {
              issues.push({
                type: 'INTERACTIVE_OVERFLOW',
                tag: el.tagName.toLowerCase(),
                className: typeof el.className === 'string' ? el.className.slice(0, 100) : '',
                text: (el.innerText || el.getAttribute('placeholder') || el.value || '').slice(0, 40),
                width: Math.round(r.width),
                right: Math.round(r.right),
                excess: Math.round(r.right - vpWidth),
              });
            }
          }
        }

        // 4. Tables / Code blocks without scroll containers
        const tables = document.querySelectorAll('table');
        for (const tbl of tables) {
          const p = tbl.parentElement;
          const pStyle = window.getComputedStyle(p);
          const tRect = tbl.getBoundingClientRect();
          if (tRect.width > vpWidth && pStyle.overflowX !== 'auto' && pStyle.overflowX !== 'scroll') {
            issues.push({
              type: 'UNSCROLLABLE_TABLE',
              tag: 'table',
              width: Math.round(tRect.width),
              containerOverflow: pStyle.overflowX,
            });
          }
        }

        // 5. Sidebar in Portal
        if (window.location.pathname.startsWith('/portal')) {
          const aside = document.querySelector('aside');
          if (aside) {
            const aRect = aside.getBoundingClientRect();
            if (aRect.width > vpWidth) {
              issues.push({
                type: 'SIDEBAR_OVERFLOW',
                tag: 'aside',
                width: Math.round(aRect.width),
                excess: Math.round(aRect.width - vpWidth),
              });
            }
          }
        }

        return {
          docScrollWidth,
          bodyScrollWidth,
          issues,
        };
      }, vp.width);

      if (result.issues.length > 0) {
        findings.push({
          viewport: vp.label,
          vpWidth: vp.width,
          route,
          issues: result.issues,
        });
      }
    }

    await context.close();
  }

  await browser.close();

  const outPath = path.resolve('C:/Users/madha/.gemini/antigravity-ide/brain/27865d0e-0f3b-4f4b-8462-8cac49e9df54/scratch/deep-scan-results.json');
  fs.writeFileSync(outPath, JSON.stringify(findings, null, 2));
  console.log(`Deep scan complete! Findings written to ${outPath}`);
  console.log(`Total problem instances: ${findings.length}`);
}

deepScan().catch(console.error);
