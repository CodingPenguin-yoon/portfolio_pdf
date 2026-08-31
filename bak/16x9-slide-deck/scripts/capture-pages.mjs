import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const input = pathToFileURL(resolve(root, 'index.html')).href;
const outputDir = resolve(root, 'tmp/rendered');
const executablePath = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });

await page.goto(input, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  document.documentElement.style.setProperty('--preview-scale', '1');
  await document.fonts.ready;
});
await page.addStyleTag({ content: '.viewer-controls { display: none !important; }' });

const slides = page.locator('.slide');
const count = await slides.count();

for (let index = 0; index < count; index += 1) {
  await slides.nth(index).screenshot({
    path: resolve(outputDir, `slide-${String(index + 1).padStart(2, '0')}.png`),
  });
}

await browser.close();
console.log(`${count} slides captured in ${outputDir}`);
