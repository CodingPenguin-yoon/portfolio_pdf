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

  assert.match(html, /직접 굴려보며 이해하고/);
  assert.match(html, /반복되는 불편을 도구로 바꿉니다/);
  assert.match(html, /Heimdall/);
  assert.match(html, /Gjallar/);
  assert.match(html, /K-Le-PaaS/);
});

test('프로젝트를 첫 시도와 마찰, 판단, 이후의 기준으로 설명한다', async () => {
  const html = await loadPortfolio();

  assert.match(html, /궁금한 것을 직접 확인하는 과정에서 운영 자동화를 시작했습니다/);
  assert.match(html, /FIRST ATTEMPT/);
  assert.match(html, /VM 생성과 애플리케이션 배포의 권한·실패 범위·완료 조건이 달랐습니다/);
  assert.match(html, /실패했을 때 지켜야 할 상태를 먼저 정의/);
  assert.match(html, /수동으로 주소를 관리하다 IP가 충돌/);
  assert.match(html, /자동으로 실행해도 되는 범위와 운영자가 판단해야 하는 범위/);
  assert.match(html, /migration·snapshot·임의 shell 작업은 현재 실행 범위에 포함하지 않았습니다/);
  assert.doesNotMatch(html, /migration·snapshot·임의 shell 작업은 분리했습니다/);
  assert.match(html, /공모전 조건과 개발 기간을 기준으로 NCP 배포 흐름에 합의/);
  assert.match(html, /HOME LAB FAILURE CASE/);
  assert.match(html, /HOW I WORK NOW/);
  assert.match(html, /인프라와 애플리케이션 사이의 반복을 줄이고/);
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
    'LIVE DEPLOYMENT',
    'CURRENT SCOPE',
  ]) {
    assert.match(html, new RegExp(marker));
  }

  assert.match(html, /WHAT CHANGED/);
  assert.match(html, /자유 형식 요청보다 검증 가능한 중간 표현을 먼저 만듭니다/);
  assert.match(html, /기술 선택은 개인 취향보다 프로젝트의 제약으로 결정합니다/);
  assert.match(html, /실행 결과를 사용자가 확인할 피드백까지 연결합니다/);
  assert.doesNotMatch(html, /MERGED EVIDENCE/);
  assert.doesNotMatch(html, /PR #28|PR #42|PR #63/);
  assert.match(html, /Backend 27 \+ Frontend 21 · merged PR 48개/);
  assert.match(html, /FROM REQUEST TO FEEDBACK/);
  assert.match(html, /patch_namespaced_deployment/);
  assert.doesNotMatch(html, /지속적인 실사용 성과로 확대하지 않습니다/);
  assert.doesNotMatch(html, /NOT CLAIMED/);
  assert.doesNotMatch(html, /전면 자동화라고 부르지 않습니다/);
  assert.doesNotMatch(html, /3분 이내/);
  assert.match(html, /2-minute demo/);
  assert.match(html, /https:\/\/youtu\.be\/-fzROUCZEAQ/);
  assert.match(html, /guided unlock/);
  assert.match(html, /반복 배포 절차를 하나의 흐름으로 자동화했습니다/);
  assert.match(html, /AUTOMATED DELIVERY WITH A SAFETY GATE/);
  assert.doesNotMatch(html, /프로세스가 실행됐다는 사실만으로는/);
  assert.doesNotMatch(html, /AI-ASSISTED/);
});

test('표지 연락처와 Heimdall 실증 자료가 링크와 이미지로 제공된다', async () => {
  const html = await loadPortfolio();

  assert.match(html, /href="https:\/\/github\.com\/CodingPenguin-yoon"/);
  assert.match(html, /href="mailto:code\.penguin\.yoon@gmail\.com"/);
  assert.match(html, /href="https:\/\/yoonman\.page"/);
  assert.match(html, /src="\/images\/heimdall-deployment\.png"/);
  assert.match(html, /src="\/images\/heimdall-chat-preview\.png"/);
});

test('모든 페이지에 완전한 페이지 번호가 있다', async () => {
  const html = (await loadPortfolio()).replaceAll(/<!--.*?-->/g, '');
  for (let page = 1; page <= 9; page += 1) {
    assert.match(html, new RegExp(`0${page} / 09`));
  }
});
