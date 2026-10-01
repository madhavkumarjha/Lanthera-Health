const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  for (const w of [320, 360, 375, 390, 430, 768, 1024, 1280]) {
    const page = await browser.newPage({ viewport: { width: w, height: 800 } });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(500);

    const data = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;

      const container = header.querySelector('.max-w-7xl');
      const logoWrapper = container.children[0];
      const nav = container.querySelector('nav');
      const controls = container.children[container.children.length - 1];

      const getR = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
        };
      };

      const links = nav ? Array.from(nav.querySelectorAll('a')).map(a => ({
        text: a.innerText.trim().replace(/\n/g, ' '),
        ...getR(a),
      })) : [];

      return {
        container: getR(container),
        logoWrapper: getR(logoWrapper),
        nav: getR(nav),
        links,
        controls: getR(controls),
      };
    });

    console.log(`\n=== Viewport: ${w}px ===`);
    console.log(`Container: [${data.container.left} -> ${data.container.right}] (width: ${data.container.width})`);
    console.log(`Logo: [${data.logoWrapper.left} -> ${data.logoWrapper.right}] (width: ${data.logoWrapper.width})`);
    if (data.nav && data.nav.width > 0) {
      console.log(`Nav: [${data.nav.left} -> ${data.nav.right}] (width: ${data.nav.width})`);
      data.links.forEach(l => {
        console.log(`  - "${l.text}": [${l.left} -> ${l.right}]`);
      });
    } else {
      console.log(`Nav: hidden (mobile drawer mode)`);
    }
    console.log(`Controls: [${data.controls.left} -> ${data.controls.right}] (width: ${data.controls.width})`);

    // Check collision
    if (data.nav && data.nav.width > 0) {
      if (data.nav.left < data.logoWrapper.right) {
        console.log(`⚠️ COLLISION: Nav overlaps Logo by ${data.logoWrapper.right - data.nav.left}px!`);
      }
      if (data.nav.right > data.controls.left) {
        console.log(`⚠️ COLLISION: Nav overlaps Controls by ${data.nav.right - data.controls.left}px!`);
      }
    } else {
      if (data.logoWrapper.right > data.controls.left) {
        console.log(`⚠️ COLLISION: Logo overlaps Controls by ${data.logoWrapper.right - data.controls.left}px!`);
      }
    }

    await page.close();
  }
  await browser.close();
})();
