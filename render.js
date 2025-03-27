// render.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Usage: node render.js path/to/file.json');
  process.exit(1);
}

(async () => {
  const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlPath = 'file://' + path.resolve(__dirname, 'render.html');

  await page.goto(htmlPath);
  await page.evaluate((data) => window.renderLottie(data), jsonData);

  const canvas = await page.$('canvas');
  const outputFile = path.join(__dirname, 'output', path.basename(inputFile).replace('.json', '.png'));
  await canvas.screenshot({ path: outputFile });

  console.log('✅ Saved:', outputFile);
  await browser.close();
})();
