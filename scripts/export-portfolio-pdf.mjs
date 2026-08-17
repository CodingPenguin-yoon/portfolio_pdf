import { mkdir, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { chromium } from "playwright";

const sourceUrl = process.env.PORTFOLIO_URL ?? "http://localhost:3000/";
const outputPath = resolve(process.argv[2] ?? "output/pdf/yunho-cho-platform-engineer-portfolio.pdf");
const temporaryPath = `${outputPath}.tmp`;
const expectedPages = 13;

await mkdir(dirname(outputPath), { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const response = await page.goto(sourceUrl, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`Portfolio HTML returned HTTP ${response?.status() ?? "no response"}`);

  await page.emulateMedia({ media: "print" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (image) => image.decode()));
  });

  const audit = await page.locator("[data-portfolio-page]").evaluateAll((pages) =>
    pages.map((element) => ({
      page: element.getAttribute("data-portfolio-page"),
      width: element.getBoundingClientRect().width,
      height: element.getBoundingClientRect().height,
      overflowX: element.scrollWidth - element.clientWidth,
      overflowY: element.scrollHeight - element.clientHeight,
    })),
  );

  if (audit.length !== expectedPages) throw new Error(`Expected ${expectedPages} pages, found ${audit.length}`);
  for (const item of audit) {
    if (Math.abs(item.width / item.height - 16 / 9) > 0.002) throw new Error(`Page ${item.page} is not 16:9`);
    if (item.overflowY > 1) throw new Error(`Page ${item.page} overflows vertically by ${item.overflowY}px`);
  }

  await page.pdf({
    path: temporaryPath,
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    tagged: true,
  });
  await rename(temporaryPath, outputPath);
  console.log(`Exported ${audit.length} 16:9 pages to ${outputPath}`);
} finally {
  await browser.close();
}
