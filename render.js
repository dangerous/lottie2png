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

  const svgHandle = await page.$('svg');
  if (!svgHandle) {
    console.error('❌ No <svg> found on page');
    process.exit(1);
  }
  
  const baseName = path.basename(inputFile).replace('.json', '');
  const pngFile = path.join(__dirname, 'output', baseName + '.png');
  const svgFile = path.join(__dirname, 'output', baseName + '.svg');
  
  await svgHandle.screenshot({ path: pngFile });
  
  const svgContent = await svgHandle.evaluate(el => el.outerHTML);
  fs.writeFileSync(svgFile, svgContent);

  console.log('✅ Saved PNG:', pngFile);
  console.log('✅ Saved SVG:', svgFile);
  await browser.close();
})();
