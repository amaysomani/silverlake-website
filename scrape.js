const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.kawaspace.com/', { waitUntil: 'networkidle2' });
    const text = await page.evaluate(() => document.body.innerText);
    const html = await page.evaluate(() => document.body.innerHTML);
    fs.writeFileSync('kawa.txt', text);
    fs.writeFileSync('kawa.html', html);
    await browser.close();
    console.log("Scraping completed.");
  } catch (error) {
    console.error("Error scraping:", error);
  }
})();
