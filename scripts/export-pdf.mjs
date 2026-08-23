import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const input = pathToFileURL(resolve(root, 'index.html')).href;
const output = resolve(root, 'output/pdf/cho-yunho-platform-engineer-portfolio.pdf');
const executablePath = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

await mkdir(dirname(output), { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });

await page.goto(input, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: output,
  printBackground: true,
  preferCSSPageSize: true,
  tagged: true,
});

await browser.close();
console.log(output);
