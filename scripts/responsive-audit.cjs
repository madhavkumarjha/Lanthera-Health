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

const OUTPUT_DIR = path.resolve('C:/Users/madha/.gemini/antigravity-ide/brain/27865d0e-0f3b-4f4b-8462-8cac49e9df54/scratch/audit');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Testing Viewport: ${vp.label} ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // Set localStorage so consent gate or hints don't block
    await page.addInitScript(() => {
      localStorage.setItem('lanthera_consent', 'accepted');
      localStorage.setItem('lanthera_theme', 'light');
    });

    for (const route of ROUTES) {
      const url = `http://localhost:3000${route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(500);

        // Check for horizontal overflow without any overflow-x: hidden masking it
        const overflowAnalysis = await page.evaluate((vpWidth) => {
          // Check actual scrollWidth first
          const rawDocScrollWidth = document.documentElement.scrollWidth;
          const rawBodyScrollWidth = document.body.scrollWidth;

          // Now find elements that exceed viewport or bleed out
          const overflowingElements = [];
          const allElements = document.querySelectorAll('*');

          for (const el of allElements) {
            // Ignore script, style, head, etc.
            if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'TITLE', 'SVG', 'PATH'].includes(el.tagName)) continue;

            const rect = el.getBoundingClientRect();
            // Check if element extends past right edge by more than 1px
            if (rect.right > vpWidth + 1.5 && rect.width > 0 && rect.height > 0) {
              // Check if it's visible
              const style = window.getComputedStyle(el);
              if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
                overflowingElements.push({
                  tag: el.tagName.toLowerCase(),
                  id: el.id || '',
                  className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 100) : '',
                  textSnippet: (el.innerText || el.textContent || '').slice(0, 50).trim().replace(/\s+/g, ' '),
                  rect: {
                    left: Math.round(rect.left),
                    right: Math.round(rect.right),
                    width: Math.round(rect.width),
                  },
                  excess: Math.round(rect.right - vpWidth),
                });
              }
            }

            // Check if element has negative left position causing scroll
            if (rect.left < -1.5 && rect.width > 0 && rect.height > 0) {
              const style = window.getComputedStyle(el);
              if (style.display !== 'none' && style.visibility !== 'hidden') {
                overflowingElements.push({
                  tag: el.tagName.toLowerCase(),
                  id: el.id || '',
                  className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 100) : '',
                  textSnippet: (el.innerText || el.textContent || '').slice(0, 50).trim().replace(/\s+/g, ' '),
                  rect: {
                    left: Math.round(rect.left),
                    right: Math.round(rect.right),
                    width: Math.round(rect.width),
                  },
                  negativeLeft: Math.round(rect.left),
                });
              }
            }
          }

          // Header specific checks
          const header = document.querySelector('header');
          let headerInfo = null;
          if (header) {
            const hRect = header.getBoundingClientRect();
            const logo = header.querySelector('a[aria-label*="Home"]') || header.querySelector('svg');
            const logoRect = logo ? logo.getBoundingClientRect() : null;
            headerInfo = {
              width: Math.round(hRect.width),
              right: Math.round(hRect.right),
              overflows: hRect.right > vpWidth + 1,
              logoVisible: !!logo && logoRect.width > 0 && logoRect.height > 0 && logoRect.right <= vpWidth,
            };
          }

          return {
            rawDocScrollWidth,
            rawBodyScrollWidth,
            hasDocOverflow: rawDocScrollWidth > vpWidth,
            overflowingElements: overflowingElements.slice(0, 10), // Top 10 offenders
            headerInfo,
          };
        }, vp.width);

        // Take a screenshot of the top of the page
        const screenshotName = `${vp.label}_${route.replace(/[\/:]/g, '_') || 'home'}.png`;
        const screenshotPath = path.join(OUTPUT_DIR, screenshotName);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        const pageResult = {
          viewport: vp.label,
          route,
          ...overflowAnalysis,
          screenshot: screenshotName,
        };

        if (overflowAnalysis.overflowingElements.length > 0 || overflowAnalysis.hasDocOverflow) {
          console.log(`[ISSUE FOUND] ${route} @ ${vp.label}: ${overflowAnalysis.overflowingElements.length} overflowing elements`);
          overflowAnalysis.overflowingElements.slice(0, 3).forEach(el => {
            console.log(`  - <${el.tag} class="${el.className}"> width:${el.rect.width} right:${el.rect.right} (excess: ${el.excess || el.negativeLeft}) text:"${el.textSnippet}"`);
          });
        }

        results.push(pageResult);
      } catch (err) {
        console.error(`Error auditing ${route} @ ${vp.label}:`, err.message);
      }
    }
    await context.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(OUTPUT_DIR, 'audit-results.json'), JSON.stringify(results, null, 2));
  console.log(`\nAudit complete! Results written to ${path.join(OUTPUT_DIR, 'audit-results.json')}`);
}

runAudit().catch(console.error);
