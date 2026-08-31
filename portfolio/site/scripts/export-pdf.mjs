import { execFileSync, spawn } from 'node:child_process';
import { mkdir, mkdtemp, rename, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(
  siteRoot,
  'output/pdf/cho-yunho-platform-engineer-portfolio.pdf',
);
const portfolioUrl = process.env.PORTFOLIO_URL ?? 'http://localhost:4173';
const chromePath =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

await mkdir(dirname(output), { recursive: true });

let server;
if (!process.env.PORTFOLIO_URL) {
  server = spawn(
    'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173'],
    {
      cwd: siteRoot,
      stdio: 'ignore',
    },
  );

  const deadline = Date.now() + 30_000;
  let ready = false;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(portfolioUrl);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  if (!ready)
    throw new Error(`portfolio server did not become ready at ${portfolioUrl}`);
}

try {
  const response = await fetch(portfolioUrl);
  if (!response.ok)
    throw new Error(`portfolio route returned ${response.status}`);

  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
  });
  const indexPage = await browser.newPage({
    viewport: { width: 1200, height: 900 },
  });
  await indexPage.goto(portfolioUrl, { waitUntil: 'networkidle' });
  const pageCount = await indexPage.locator('.sheet').count();
  await indexPage.close();

  const tempRoot = join(siteRoot, 'tmp');
  await mkdir(tempRoot, { recursive: true });
  const tempDirectory = await mkdtemp(join(tempRoot, 'pdf-export-'));
  try {
    const pageFiles = [];

    for (let index = 0; index < pageCount; index += 1) {
      const page = await browser.newPage({
        viewport: { width: 1200, height: 900 },
      });
      await page.goto(portfolioUrl, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ media: 'print' });
      await page.locator('.sheet').evaluateAll((sheets, visibleIndex) => {
        const target = sheets[visibleIndex];
        target.classList.add(`export-page-${visibleIndex + 1}`);
        target.style.display = target.classList.contains('cover')
          ? 'flex'
          : 'block';
        target.style.breakBefore = 'auto';
        target.querySelector('.page-mark > span:last-child')?.remove();
        target.parentElement.replaceChildren(target);
      }, index);

      const pageFile = join(
        tempDirectory,
        `page-${String(index + 1).padStart(2, '0')}.pdf`,
      );
      await page.pdf({
        path: pageFile,
        printBackground: true,
        preferCSSPageSize: true,
        tagged: true,
      });
      await page.close();
      pageFiles.push(pageFile);
    }

    const mergedOutput = join(tempDirectory, 'portfolio.pdf');
    const pythonPath =
      process.env.PYTHON_PATH ??
      '/Users/yoonman/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
    execFileSync(
      pythonPath,
      [
        resolve(siteRoot, 'scripts/merge-pdf-pages.py'),
        mergedOutput,
        ...pageFiles,
      ],
      { stdio: 'inherit' },
    );
    await rename(mergedOutput, output);
  } finally {
    await rm(tempDirectory, { recursive: true, force: true });
    await browser.close();
  }

  console.log(output);
} finally {
  server?.kill('SIGTERM');
}
