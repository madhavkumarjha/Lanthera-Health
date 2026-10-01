const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  for (const w of [320, 375, 768]) {
    const page = await browser.newPage({ viewport: { width: w, height: 800 } });
    await page.goto('http://localhost:3000/');
    await page.evaluate(() => localStorage.setItem('lanthera_consent_gate_seen', 'true'));
    await page.reload();
    await page.waitForTimeout(300);

    const menuBtn = await page.waitForSelector('button[aria-label="Toggle navigation menu"]');
    await menuBtn.click();
    await page.waitForTimeout(300);

    const drawer = await page.$('header nav.lg\\:hidden');
    const box = await drawer.boundingBox();
    console.log(`Viewport ${w}px drawer bounding box:`, box);

    // Check if any link in drawer overflows
    const links = await page.$$('header nav.lg\\:hidden a');
    for (const l of links) {
      const lBox = await l.boundingBox();
      if (lBox.x + lBox.width > w) {
        console.log(`⚠️ Link in drawer overflows viewport:`, await l.innerText(), lBox);
      }
    }

    await page.screenshot({ path: `C:/Users/madha/.gemini/antigravity-ide/brain/27865d0e-0f3b-4f4b-8462-8cac49e9df54/scratch/audit_v2/${w}_drawer_open.png` });
    await page.close();
  }
  await browser.close();
})();
