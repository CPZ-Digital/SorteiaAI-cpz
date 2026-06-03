const { chromium } = require('./node_modules/playwright');
const path = require('path');

const BASE = 'c:/Users/adria/OneDrive/Documentos/GitHub/appsorteio-cpz';
const BASE_URL = 'https://adrianpz.github.io/appsorteio-cpz';

// Play Store phone: portrait, ~390x844
const VIEWPORT = { width: 390, height: 844 };

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36'
  });

  const screens = [
    { url: `${BASE_URL}/`, file: 'screenshot-home.png', wait: 2000 },
    { url: `${BASE_URL}/volei.html`, file: 'screenshot-volei.png', wait: 2000 },
    { url: `${BASE_URL}/futebol.html`, file: 'screenshot-futebol.png', wait: 2000 },
    { url: `${BASE_URL}/basquete.html`, file: 'screenshot-basquete.png', wait: 2000 },
    { url: `${BASE_URL}/handebol.html`, file: 'screenshot-handebol.png', wait: 2000 },
  ];

  for (const { url, file, wait } of screens) {
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(wait);
    await page.screenshot({ path: path.join(BASE, file), fullPage: false });
    console.log('Screenshot salvo:', file);
    await page.close();
  }

  await browser.close();
  console.log('Pronto!');
}

main().catch(err => { console.error(err); process.exit(1); });
