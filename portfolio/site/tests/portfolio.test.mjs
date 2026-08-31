import assert from 'node:assert/strict';
import test from 'node:test';

const portfolioUrl = process.env.PORTFOLIO_URL ?? 'http://127.0.0.1:4173';

async function loadPortfolio() {
  const response = await fetch(portfolioUrl);
  assert.equal(
    response.status,
    200,
    `portfolio route returned ${response.status}`,
  );
  return response.text();
}

test('표지에서 역할과 세 프로젝트의 해결 범위를 바로 보여준다', async () => {
  const html = await loadPortfolio();

  assert.match(html, /반복되는 운영 절차/);
  assert.match(html, /Heimdall/);
  assert.match(html, /Gjallar/);
  assert.match(html, /K-Le-PaaS/);
});

test('프로젝트 케이스 스터디가 아홉 장의 A4 문서로 구성된다', async () => {
  const html = await loadPortfolio();

  const a4Pages = html.match(/data-page-format=["']a4["']/g) ?? [];
  assert.equal(
    a4Pages.length,
    9,
    'portfolio must render exactly nine A4 pages',
  );

  for (const marker of [
    'PROBLEM',
    'SOLUTION',
    'RESULT',
    'AUTOMATED FLOW',
    'NEXT EXTENSIONS',
  ]) {
    assert.match(html, new RegExp(marker));
  }

  assert.match(html, /PR #28/);
  assert.match(html, /PR #42/);
  assert.match(html, /PR #63/);
  assert.match(html, /authored merged PR 48개/);
  assert.match(html, /FROM REQUEST TO FEEDBACK/);
  assert.match(html, /patch_namespaced_deployment/);
  assert.doesNotMatch(html, /지속적인 실사용 성과로 확대하지 않습니다/);
  assert.doesNotMatch(html, /NOT CLAIMED/);
  assert.doesNotMatch(html, /전면 자동화라고 부르지 않습니다/);
  assert.match(html, /3분 이내/);
  assert.match(html, /VM 생성이 포함되지 않습니다/);
  assert.match(html, /guided unlock/);
  assert.match(html, /반복 배포 절차를 하나의 흐름으로 자동화했습니다/);
  assert.match(html, /AUTOMATED DELIVERY WITH A SAFETY GATE/);
  assert.doesNotMatch(html, /프로세스가 실행됐다는 사실만으로는/);
  assert.doesNotMatch(html, /AI-ASSISTED/);
});

test('모든 페이지에 완전한 페이지 번호가 있다', async () => {
  const html = (await loadPortfolio()).replaceAll(/<!--.*?-->/g, '');
  for (let page = 1; page <= 9; page += 1) {
    assert.match(html, new RegExp(`0${page} / 09`));
  }
});
