const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const outputDir = 'C:\\Users\\madha\\.gemini\\antigravity-ide\\brain\\dde2617a-8edf-4014-9a6c-671e0646a3c7\\screenshots';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const viewports = [
  { width: 320, height: 800, name: '320x800' },
  { width: 360, height: 800, name: '360x800' },
  { width: 375, height: 800, name: '375x800' },
  { width: 390, height: 844, name: '390x844' },
  { width: 430, height: 932, name: '430x932' }
];

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const inspectionResults = {};

  for (const vp of viewports) {
    console.log(`\nCapturing viewport: ${vp.name}...`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });

    await page.addInitScript(() => {
      localStorage.setItem('lanthera_consent_gate_seen', 'true');
    });

    await page.goto('http://localhost:5173/accessibility', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600); // allow font & css to settle

    const screenshotPath = path.join(outputDir, `accessibility_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    // Detailed DOM Inspection
    const metrics = await page.evaluate((vpWidth) => {
      const getBox = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          id: el.id,
          class: el.className ? String(el.className).slice(0, 80) : '',
          rect: {
            left: Math.round(r.left * 10) / 10,
            right: Math.round(r.right * 10) / 10,
            top: Math.round(r.top * 10) / 10,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10
          },
          styles: {
            marginLeft: cs.marginLeft,
            marginRight: cs.marginRight,
            paddingLeft: cs.paddingLeft,
            paddingRight: cs.paddingRight,
            transform: cs.transform,
            position: cs.position,
            overflow: cs.overflow,
            overflowX: cs.overflowX
          }
        };
      };

      const header = document.querySelector('header');
      const logo = document.querySelector('header a[aria-label*="Home"]');
      const emergencyPill = document.querySelector('.emergency-pill');
      const langBtn = document.querySelector('button[aria-label="Toggle language"]');
      const themeBtn = document.querySelector('button[aria-label*="Current theme"]');
      const menuBtn = document.querySelector('button[aria-label*="navigation menu"]');
      const h1 = document.querySelector('h1');
      const p = document.querySelector('h1 + p');
      const badge = document.querySelector('header + *') || document.querySelector('.font-mono.uppercase');
      const main = document.querySelector('main');
      const root = document.querySelector('#root');
      const body = document.body;

      // Check if anything extends outside [0, vpWidth]
      const clippedElements = [];
      document.querySelectorAll('*').forEach((el) => {
        if (['HTML', 'BODY', 'SCRIPT', 'STYLE'].includes(el.tagName)) return;
        const r = el.getBoundingClientRect();
        if (r.left < -0.5 || r.right > vpWidth + 0.5) {
          clippedElements.push({
            tag: el.tagName,
            class: el.className ? String(el.className).slice(0, 50) : '',
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
            text: (el.innerText || '').slice(0, 25).replace(/\n/g, ' ')
          });
        }
      });

      return {
        vpWidth,
        bodyWidth: body.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        root: getBox(root),
        main: getBox(main),
        header: getBox(header),
        logo: getBox(logo),
        emergencyPill: getBox(emergencyPill),
        langBtn: getBox(langBtn),
        themeBtn: getBox(themeBtn),
        menuBtn: getBox(menuBtn),
        h1: getBox(h1),
        p: getBox(p),
        clippedElements
      };
    }, vp.width);

    inspectionResults[vp.name] = metrics;
    await page.close();
  }

  await browser.close();

  const resultsPath = path.join(outputDir, 'inspection_metrics.json');
  fs.writeFileSync(resultsPath, JSON.stringify(inspectionResults, null, 2));
  console.log(`Saved screenshots and inspection metrics to ${outputDir}`);
}

capture().catch(console.error);
