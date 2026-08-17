import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the recruiting portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ko">/i);
  assert.match(html, /조윤호 \| Platform Engineer Portfolio/);
  assert.match(html, /반복을 자동화하고/);
  assert.match(html, /Gjallar/);
  assert.match(html, /Heimdall/);
  assert.match(html, /K-Le-PaaS/);
  assert.match(html, /Argus/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("ships project evidence and resume assets", async () => {
  await Promise.all([
    access(new URL("../public/projects/gjallar.png", import.meta.url)),
    access(new URL("../public/projects/heimdall.png", import.meta.url)),
    access(new URL("../public/projects/klepaas-dashboard.png", import.meta.url)),
    access(new URL("../public/projects/argus.png", import.meta.url)),
    access(new URL("../public/resume/yunho-cho-resume.pdf", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
