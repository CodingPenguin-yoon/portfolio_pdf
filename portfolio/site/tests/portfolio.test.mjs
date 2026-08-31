import assert from 'node:assert/strict';
import test from 'node:test';

const portfolioUrl = process.env.PORTFOLIO_URL ?? 'http://127.0.0.1:4173';

async function loadPortfolio() {
  const response = await fetch(portfolioUrl);
  assert.equal(response.status, 200, `portfolio route returned ${response.status}`);
  return response.text();
}

test('표지에서 윤호가 해결하는 문제와 대표 결과를 바로 보여준다', async () => {
  const html = await loadPortfolio();

  assert.match(html, /반복되는 인프라 작업/);
  assert.match(html, /약 5분/);
  assert.match(html, /실제 Proxmox/);
  assert.match(html, /자연어.*Kubernetes/s);
});

test('각 사례는 독립된 A4 페이지로 읽힌다', async () => {
  const html = await loadPortfolio();

  const a4Pages = html.match(/data-page-format=["']a4["']/g) ?? [];
  assert.equal(a4Pages.length, 6, 'portfolio must render exactly six A4 pages');

  for (const project of ['heimdall', 'gjallar', 'klepaas']) {
    assert.match(html, new RegExp(`id=["']${project}["']`));
  }
});
