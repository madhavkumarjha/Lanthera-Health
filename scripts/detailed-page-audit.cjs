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
  '/understand/understanding-hypertension-guidelines',
  '/international',
  '/careers',
  '/contact',
];

const OUTPUT_DIR = path.resolve('C:/Users/madha/.gemini/antigravity-ide/brain/27865d0e-0f3b-4f4b-8462-8cac49e9df54/scratch/audit_v2');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runDetailedAudit() {
  const browser = await chromium.launch({ headless: true });
  const allFindings = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n========================================`);
    console.log(`Auditing Viewport: ${vp.label}`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    await page.addInitScript(() => {
      localStorage.setItem('lanthera_consent_gate_seen', 'true');
      localStorage.setItem('lanthera_theme', 'light');
    });

    for (const route of ROUTES) {
      const url = `http://localhost:3000${route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        // Wait for page transition animation to complete (duration 450ms)
        await page.waitForTimeout(600);

        const pageAudit = await page.evaluate((vpWidth) => {
          const pageIssues = [];

          // 1. Check Document & Body Width
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const hasDocOverflow = docScrollWidth > vpWidth || bodyScrollWidth > vpWidth;

          // 2. Check Header
          const header = document.querySelector('header');
          let headerDetails = null;
          if (header) {
            const hRect = header.getBoundingClientRect();
            const headerContainer = header.querySelector('.max-w-7xl');
            const cRect = headerContainer ? headerContainer.getBoundingClientRect() : hRect;
            const logo = header.querySelector('a[aria-label*="Home"]');
            const logoRect = logo ? logo.getBoundingClientRect() : null;
            const emergencyPill = header.querySelector('.emergency-pill');
            const pillRect = emergencyPill ? emergencyPill.getBoundingClientRect() : null;
            const langBtn = header.querySelector('button[aria-label="Toggle language"]');
            const themeBtn = header.querySelector('button[aria-label*="Current theme"]');
            const menuBtn = header.querySelector('button[aria-label="Toggle navigation menu"]');

            headerDetails = {
              headerWidth: Math.round(hRect.width),
              containerWidth: Math.round(cRect.width),
              logoWidth: logoRect ? Math.round(logoRect.width) : 0,
              emergencyWidth: pillRect ? Math.round(pillRect.width) : 0,
              isHeaderOverflowing: hRect.width > vpWidth + 1,
              isLogoVisible: !!logo && logoRect && logoRect.width > 20 && logoRect.right <= vpWidth,
            };

            // Check if logo collides or wraps badly
            if (logoRect && pillRect && logoRect.right > pillRect.left) {
              pageIssues.push({
                area: 'HEADER',
                element: 'Header / Logo',
                problem: `Logo collides with Emergency pill by ${Math.round(logoRect.right - pillRect.left)}px`,
                detail: `Logo right: ${Math.round(logoRect.right)}px, Pill left: ${Math.round(pillRect.left)}px`,
              });
            }

            if (hRect.width > vpWidth + 1) {
              pageIssues.push({
                area: 'HEADER',
                element: 'header',
                problem: `Header is wider than viewport (${Math.round(hRect.width)}px vs ${vpWidth}px)`,
                detail: `Excess width: ${Math.round(hRect.width - vpWidth)}px`,
              });
            }
          }

          // 3. Scan all elements for horizontal overflow or clipping
          // Specifically detect elements whose boundingClientRect extends past viewport width
          const allEls = document.querySelectorAll('*');
          for (const el of allEls) {
            if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'TITLE', 'BR'].includes(el.tagName)) continue;

            const r = el.getBoundingClientRect();
            // Ignore fixed overlays that are meant to fill screen like modal backdrop or loader
            const s = window.getComputedStyle(el);
            if (s.position === 'fixed' && r.left === 0 && Math.abs(r.width - vpWidth) < 2) continue;

            if (r.right > vpWidth + 2 && r.width > 0 && r.height > 0) {
              if (s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0') {
                pageIssues.push({
                  area: 'MAIN CONTENT / OVERFLOW',
                  element: `<${el.tagName.toLowerCase()} class="${(el.className && typeof el.className === 'string') ? el.className.slice(0, 80) : ''}">`,
                  problem: `Element extends past right edge by ${Math.round(r.right - vpWidth)}px (width: ${Math.round(r.width)}px, right: ${Math.round(r.right)}px)`,
                  detail: `Text snippet: "${(el.innerText || el.textContent || '').slice(0, 40).trim().replace(/\s+/g, ' ')}"`,
                });
              }
            }

            if (r.left < -2 && r.width > 0 && r.height > 0) {
              if (s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0') {
                pageIssues.push({
                  area: 'MAIN CONTENT / NEGATIVE LEFT',
                  element: `<${el.tagName.toLowerCase()} class="${(el.className && typeof el.className === 'string') ? el.className.slice(0, 80) : ''}">`,
                  problem: `Element bleeds off left edge by ${Math.round(Math.abs(r.left))}px (left: ${Math.round(r.left)}px)`,
                  detail: `Text snippet: "${(el.innerText || el.textContent || '').slice(0, 40).trim().replace(/\s+/g, ' ')}"`,
                });
              }
            }

            // Check if interactive controls (inputs, buttons, selects) are wider than their parent container
            if (['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(el.tagName)) {
              const p = el.parentElement;
              if (p) {
                const pr = p.getBoundingClientRect();
                if (r.width > pr.width + 3) {
                  pageIssues.push({
                    area: 'INTERACTIVE ELEMENT OVERFLOW',
                    element: `<${el.tagName.toLowerCase()} class="${(el.className && typeof el.className === 'string') ? el.className.slice(0, 80) : ''}">`,
                    problem: `Interactive element (${Math.round(r.width)}px) is wider than parent container (${Math.round(pr.width)}px)`,
                    detail: `Element: ${el.getAttribute('placeholder') || el.innerText || el.value || el.tagName}`,
                  });
                }
              }
            }
          }

          // 4. Portal Sidebar specific check
          if (window.location.pathname.startsWith('/portal')) {
            const aside = document.querySelector('aside');
            if (aside) {
              const aRect = aside.getBoundingClientRect();
              if (aRect.width > vpWidth) {
                pageIssues.push({
                  area: 'SIDEBAR',
                  element: 'aside.portal-sidebar',
                  problem: `Portal sidebar width (${Math.round(aRect.width)}px) exceeds viewport (${vpWidth}px)`,
                  detail: `Excess: ${Math.round(aRect.width - vpWidth)}px`,
                });
              }
            }
          }

          return {
            docScrollWidth,
            hasDocOverflow,
            headerDetails,
            pageIssues: pageIssues.slice(0, 15), // cap top 15 issues per page
          };
        }, vp.width);

        // Take screenshot of rendered page
        const screenshotName = `${vp.label}_${route.replace(/[\/:]/g, '_') || 'home'}.png`;
        const screenshotPath = path.join(OUTPUT_DIR, screenshotName);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        if (pageAudit.pageIssues.length > 0 || pageAudit.hasDocOverflow) {
          console.log(`[ISSUES] ${route} @ ${vp.label}: ${pageAudit.pageIssues.length} issues`);
          pageAudit.pageIssues.forEach((issue) => {
            console.log(`  - [${issue.area}] ${issue.element}: ${issue.problem}`);
          });
        } else {
          console.log(`[PASS] ${route} @ ${vp.label}`);
        }

        allFindings.push({
          viewport: vp.label,
          vpWidth: vp.width,
          route,
          ...pageAudit,
          screenshot: screenshotName,
        });
      } catch (err) {
        console.error(`Error auditing ${route} @ ${vp.label}:`, err.message);
      }
    }

    await context.close();
  }

  await browser.close();

  const outPath = path.join(OUTPUT_DIR, 'audit-v2-results.json');
  fs.writeFileSync(outPath, JSON.stringify(allFindings, null, 2));
  console.log(`\n========================================`);
  console.log(`Detailed audit complete! Results saved to ${outPath}`);
  console.log(`========================================`);
}

runDetailedAudit().catch(console.error);
