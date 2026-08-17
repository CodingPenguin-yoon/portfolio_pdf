/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

const PAGE_COUNT = 13;

function Page({
  number,
  eyebrow,
  title,
  children,
  tone = "paper",
  className = "",
}: {
  number: number;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  tone?: "paper" | "blue" | "mint" | "sky";
  className?: string;
}) {
  return (
    <section className={`portfolio-page tone-${tone} ${className}`} data-portfolio-page={number}>
      <header className="page-head">
        <span>{eyebrow}</span>
        <strong>{String(number).padStart(2, "0")} / {PAGE_COUNT}</strong>
      </header>
      <div className="page-title">{title}</div>
      <div className="page-body">{children}</div>
      <footer className="page-foot"><span>YUNHO CHO</span><span>PLATFORM ENGINEER PORTFOLIO · 2026</span></footer>
    </section>
  );
}

const repeatSteps = [
  ["01", "VM 생성", "매번 다른 사양과 설정"],
  ["02", "IP·네트워크", "충돌과 연결 상태 확인"],
  ["03", "Docker", "반복 설치와 기본 구성"],
  ["04", "내부 환경", "프로젝트마다 다른 실행 조건"],
  ["05", "배포", "실패 지점 재추적"],
] as const;

const currentZones = [
  ["PROXMOX", "Actual Inventory", "VM runtime base"],
  ["GJALLAR", "Infrastructure Create", "Profile · Preflight · Approval"],
  ["HEIMDALL", "Application Release", "Candidate · Verify · Promote"],
  ["STORAGE", "User Data", "Project DB · Role · Schema"],
] as const;

export default function PortfolioDocument() {
  return (
    <main className="portfolio-document" data-portfolio-document="yunho-cho-platform-engineer-portfolio">
      <Page number={1} eyebrow="PORTFOLIO · 2026" title={<><span>조윤호</span><small>Platform Engineer</small></>} tone="sky" className="cover-page">
        <div className="cover-copy">
          <h1>반복 작업을 자동화하는 데서 시작해,<br /><em>시스템의 책임과 실패 경계</em>를 설계했습니다.</h1>
          <p>홈랩 운영의 반복을 줄이기 위해 자동화를 시작했습니다. 범위가 커지며 생긴 결합을 직접 겪은 뒤, VM 생성·애플리케이션 배포·사용자 데이터의 수명주기를 분리했습니다.</p>
          <div className="contact-line"><span>code.penguin.yoon@gmail.com</span><span>github.com/CodingPenguin-yoon</span><span>yoonman.page</span></div>
        </div>
        <ol className="cover-spine">
          <li><b>01</b><span>반복 운영</span></li><li><b>02</b><span>통합 자동화</span></li><li><b>03</b><span>책임 결합 발견</span></li><li><b>04</b><span>경계 분리</span></li><li><b>05</b><span>실패 시 기존 상태 보존</span></li>
        </ol>
      </Page>

      <Page number={2} eyebrow="ORIGIN" title={<>새 서비스를 올릴 때마다,<br />같은 실행 환경을 다시 만들었습니다.</>}>
        <div className="origin-layout">
          <div className="story-copy">
            <p>홈랩에 프로그램을 올리는 일은 애플리케이션 배포만으로 끝나지 않았습니다. VM과 네트워크를 준비하고 Docker와 내부 실행 환경을 구성한 뒤에야 배포를 시작할 수 있었습니다.</p>
            <blockquote>처음의 목표는 거대한 플랫폼이 아니라,<br />매번 반복하던 준비 작업을 줄이는 것이었습니다.</blockquote>
          </div>
          <ol className="repeat-flow">
            {repeatSteps.map(([number, title, detail]) => <li key={number}><span>{number}</span><b>{title}</b><small>{detail}</small></li>)}
            <li className="loop-back"><span>↻</span><b>새 프로젝트</b><small>처음부터 다시 시작</small></li>
          </ol>
        </div>
      </Page>

      <Page number={3} eyebrow="AUTOMATION LENS · K-LE-PAAS" title={<>자연어 요청을 바로 실행하지 않고,<br /><em>실행 가능한 계획</em>으로 바꿨습니다.</>} tone="mint">
        <div className="evidence-layout">
          <figure className="screen-frame"><img src="/projects/klepaas-dashboard.png" alt="K-Le-PaaS 운영 대시보드" /><figcaption>Previous · 2인 팀 · 2025.09 - 2025.12</figcaption></figure>
          <div className="evidence-copy">
            <p>자연어 요청의 의도와 대상을 해석하고, 실행 가능한 <strong>CommandPlan</strong>으로 정규화한 뒤 Kubernetes·NCP 작업에 연결했습니다.</p>
            <div className="pipeline compact"><span>Natural Language</span><i>→</i><span>Intent & Entity</span><i>→</i><span>CommandPlan</span><i>→</i><span>Execution</span><i>→</i><span>Feedback</span></div>
            <div className="contribution-box"><b>확인된 개인 기여</b><ul><li>Gemini 의도·엔티티 해석</li><li>Kubernetes 상태 조회·재시작 CommandPlan</li><li>Ingress 도메인·배포 URL 동기화</li><li>Prometheus 기반 NKS 모니터링</li></ul></div>
            <blockquote>입력과 실행 사이에 계획과 확인 단계를 두는 관점이 홈랩 자동화의 출발점이 됐습니다.</blockquote>
          </div>
        </div>
      </Page>

      <Page number={4} eyebrow="FIRST ARCHITECTURE · PREVIOUS" title={<>처음에는 모든 책임을 한곳에 모아야<br />더 효율적이라고 생각했습니다.</>}>
        <div className="first-architecture">
          <div className="arch-chain"><article><span>REQUEST</span><b>배포 요청</b></article><i>→</i><article className="core"><span>ORCHESTRATOR</span><b>초기 Heimdall</b><small>VM 생성 + 설정 + 배포</small></article><i>→</i><div className="tool-stack"><span>Terraform</span><span>Ansible</span><span>Docker</span></div><i>→</i><article><span>OUTPUT</span><b>VM + Application</b></article></div>
          <div className="reason-grid"><article><span>01</span><b>한 번의 요청</b><p>수동 단계를 하나의 실행 경로로 연결</p></article><article><span>02</span><b>반복 감소</b><p>VM과 환경 구성을 자동화</p></article><article><span>03</span><b>한 경로에서 추적</b><p>상태와 로그를 한곳에 기록</p></article></div>
          <p className="page-note">당시에는 합리적인 선택이었지만, 자동화 범위와 함께 시스템이 책임져야 할 실패도 커졌습니다.</p>
        </div>
      </Page>

      <Page number={5} eyebrow="FRICTION" title={<>기능을 더할수록 책임의 소유자와<br />실패의 원인이 흐려졌습니다.</>} tone="blue">
        <div className="friction-layout">
          <div className="friction-copy"><p>VM 생성과 애플리케이션 배포는 변경되는 이유가 달랐습니다. 인프라 용량과 네트워크를 바꾸는 일, 코드와 설정을 배포하는 일이 같은 실행 경로에서 실패했습니다.</p><p>Terraform·Ansible·Docker 의존성을 함께 관리하면서 기능을 추가할수록 복구 범위도 함께 넓어졌습니다.</p></div>
          <ol className="causal-flow"><li><span>SYMPTOM</span><b>책임 결합</b><p>인프라와 배포가 함께 변경</p></li><li><span>CAUSE</span><b>실행 경로 확대</b><p>의존성과 실패 지점 증가</p></li><li><span>COST</span><b>복구 범위 확대</b><p>서로 다른 실패를 함께 복구</p></li></ol>
          <div className="crossroad"><span>기존 구조 확장</span><span>전체 재작성</span><strong>책임 경계를 다시 정하기</strong></div>
        </div>
      </Page>

      <Page number={6} eyebrow="DECISION" title={<>변경 이유와 실패 영향을 기준으로<br /><em>Gjallar와 Heimdall</em>을 분리했습니다.</>} tone="sky">
        <div className="split-layout">
          <section className="before"><span>BEFORE · PREVIOUS</span><h3>초기 Heimdall</h3><p>VM 생성 + 설정 + 배포</p><small>한 시스템이 서로 다른 변경과 실패를 소유</small></section>
          <div className="split-axis"><span>변경 이유</span><i>+</i><span>실패 영향</span><b>→</b></div>
          <section className="after"><article><span>INFRASTRUCTURE</span><h3>Gjallar</h3><p>Proxmox VM Create</p><small>실패: 승인된 생성 작업만 중단</small></article><article><span>APPLICATION</span><h3>Heimdall</h3><p>Generation & Route</p><small>실패: Candidate를 승격하지 않음</small></article></section>
          <div className="tradeoff"><p><b>얻은 것</b> 결합과 복구 범위 축소</p><p><b>감수한 것</b> 시스템 간 계약과 상태 관찰 필요</p></div>
        </div>
      </Page>

      <Page number={7} eyebrow="CURRENT SYSTEM" title={<>제어·배포·데이터의 수명주기를<br />같은 실패 정책으로 다루지 않습니다.</>}>
        <div className="system-map">
          {currentZones.map(([name, role, details], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><b>{role}</b><p>{details}</p>{index < currentZones.length - 1 && <i>→</i>}</article>)}
        </div>
        <div className="legend-row"><span><i className="control" />제어 요청</span><span><i className="observe" />상태 관찰</span><span><i className="data" />데이터 경계</span></div>
        <div className="boundary-statement"><b>핵심 불변 조건</b><p>한 시스템의 실패가 다른 시스템의 복구 경로와 사용자 데이터까지 오염시키지 않게 합니다.</p></div>
      </Page>

      <Page number={8} eyebrow="GJALLAR · DECISION" title={<>실행 전에 실제 상태와 계획을 확인하고,<br />승인된 변경만 Proxmox에 전달합니다.</>} tone="mint">
        <div className="gjallar-layout">
          <div className="decision-copy"><p>현재 문제에는 Terraform·Ansible을 active dependency로 유지하는 것보다 Proxmox API 기반 Native Create가 더 직접적이었습니다.</p><blockquote>도구를 포기한 것이 아니라, 실제 상태와 승인 경계를 직접 제어하기 위해 다시 선택했습니다.</blockquote><div className="scope-label">CURRENT SCOPE · Native Create + limited gated Start</div></div>
          <ol className="vertical-flow"><li><span>01</span><b>Actual Inventory</b><small>node · VM · storage 상태 조회</small></li><li><span>02</span><b>VM Profile</b><small>CPU · memory · disk 정책 재사용</small></li><li><span>03</span><b>Preflight</b><small>template · IP · network · storage 검증</small></li><li><span>04</span><b>Plan & Approval</b><small>변경 내용과 실행 조건 확인</small></li><li><span>05</span><b>Native Create</b><small>clone · config · task API</small></li><li><span>06</span><b>Observed After</b><small>작업 후 실제 상태와 근거 보존</small></li></ol>
        </div>
      </Page>

      <Page number={9} eyebrow="GJALLAR · EVIDENCE" title={<>실행 결과가 아니라, 실행 전후의 상태를<br /><em>운영 근거</em>로 남겼습니다.</>}>
        <div className="evidence-screen-page">
          <figure className="large-screen"><img src="/projects/gjallar.png" alt="Gjallar Proxmox 클러스터 운영 콘솔" /><span className="marker m1">1</span><span className="marker m2">2</span><span className="marker m3">3</span></figure>
          <ol className="callout-list"><li><span>1</span><div><b>Actual Inventory</b><p>3개 노드와 18개 VM의 실제 상태</p></div></li><li><span>2</span><div><b>Storage & Network</b><p>생성 전 용량과 연결 조건 확인</p></div></li><li><span>3</span><div><b>Job Evidence</b><p>요청·승인·UPID·observed-after 기록</p></div></li></ol>
        </div>
      </Page>

      <Page number={10} eyebrow="HEIMDALL · PROMOTION" title={<>새 배포를 바로 교체하지 않고,<br />검증된 Candidate만 Current로 승격합니다.</>} tone="sky">
        <div className="promotion-layout">
          <div className="promotion-stage"><span>CANDIDATE</span><ol><li>Exact Commit</li><li>Build</li><li>Generation Network</li><li>Start</li><li>Health</li></ol></div>
          <div className="promotion-gate"><span>ALL GREEN</span><b>검증 통과</b><i>→</i></div>
          <div className="promotion-stage active"><span>ACTIVATION</span><ol><li>nginx -t</li><li>Atomic Replace</li><li>Reload</li><li>Route Probe</li><li>Current</li></ol></div>
          <div className="invariants"><article><b>01</b><p>고정한 commit과 설정 snapshot으로 빌드</p></article><article><b>02</b><p>실제 route 응답까지 확인한 뒤 current 전환</p></article><article><b>03</b><p>성공이 확정된 뒤에만 previous generation 회수</p></article></div>
        </div>
      </Page>

      <Page number={11} eyebrow="FAILURE & DATA" title={<>실패했을 때 무엇을 지킬지부터<br />각 단계의 복구 경계를 정했습니다.</>} tone="blue">
        <div className="failure-layout">
          <div className="failure-list"><article><span>BUILD / HEALTH</span><b>Candidate cleanup</b><p>Current 유지</p></article><article><span>ACTIVATION</span><b>Last-known-good config 복원</b><p>이전 route 유지</p></article><article><span>WORKER</span><b>DB · marker · label reconcile</b><p>불확실한 candidate 보존</p></article></div>
          <div className="data-boundary"><div><span>RUNTIME</span><h3>Application Generation</h3><p>실행 이미지와 route는 교체 가능</p></div><i>≠</i><div><span>DATA</span><h3>PostgreSQL User Data</h3><p>배포 실패와 함께 되돌리거나 삭제하지 않음</p></div><blockquote>불확실한 상태는 자동 삭제보다 보존을 선택합니다.</blockquote></div>
          <div className="limits"><span>NOT IMPLEMENTED</span><p>DB backup / restore · data rollback · credential rotation · automatic purge</p></div>
        </div>
      </Page>

      <Page number={12} eyebrow="HEIMDALL · EVIDENCE" title={<>Commit·배포 세대·Health·Route를<br />하나의 화면에서 확인합니다.</>}>
        <div className="evidence-screen-page reverse">
          <ol className="callout-list"><li><span>1</span><div><b>Exact Commit</b><p>현재 배포의 입력을 고정</p></div></li><li><span>2</span><div><b>Generation State</b><p>candidate와 current를 구분</p></div></li><li><span>3</span><div><b>Data Boundary</b><p>이미지 rollback과 DB 복구를 분리</p></div></li></ol>
          <figure className="large-screen"><img src="/projects/heimdall.png" alt="Heimdall 프리뷰 배포 운영 콘솔" /><span className="marker hm1">1</span><span className="marker hm2">2</span><span className="marker hm3">3</span></figure>
        </div>
      </Page>

      <Page number={13} eyebrow="CLOSING" title={<>반복을 줄이고, 경계를 나누며,<br />실패해도 되돌아갈 상태를 남깁니다.</>} tone="mint" className="closing-page">
        <div className="closing-layout">
          <ol className="principles"><li><span>01</span><b>Observe before change</b><p>실행 전에 실제 상태와 계획을 확인합니다.</p></li><li><span>02</span><b>Separate by failure</b><p>변경 이유가 다르면 책임과 실패 경계를 분리합니다.</p></li><li><span>03</span><b>Preserve uncertainty</b><p>불확실한 상태는 자동 삭제보다 보존합니다.</p></li></ol>
          <div className="profile-summary"><div className="skills"><span>PLATFORM / INFRA</span><p>Proxmox · Kubernetes · Docker · Linux</p><span>BACKEND / DATA</span><p>FastAPI · PostgreSQL · Redis · REST API</p><span>AUTOMATION</span><p>GitHub Actions · Terraform · Ansible · WireGuard</p></div><div className="credentials"><p><span>EDUCATION</span><b>광운대학교 전자통신공학과 · 2026.02</b></p><p><span>CERTIFICATIONS</span><b>정보처리기사 · 리눅스마스터 2급</b></p></div><div className="final-contact"><b>조윤호 · Platform Engineer</b><p>code.penguin.yoon@gmail.com</p><p>github.com/CodingPenguin-yoon</p></div></div>
        </div>
      </Page>
    </main>
  );
}
