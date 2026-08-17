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

test("server-renders the complete 16:9 portfolio document", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /data-portfolio-document="yunho-cho-platform-engineer-portfolio"/);
  assert.equal((html.match(/data-portfolio-page=/g) ?? []).length, 13);
  for (const text of ["반복 작업을 자동화", "K-Le-PaaS", "Gjallar", "Heimdall", "FAILURE &amp; DATA", "CLOSING"]) {
    assert.match(html, new RegExp(text));
  }
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("ships every portfolio evidence asset", async () => {
  await Promise.all([
    access(new URL("../public/projects/gjallar.png", import.meta.url)),
    access(new URL("../public/projects/heimdall.png", import.meta.url)),
    access(new URL("../public/projects/klepaas-dashboard.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
