/* oxlint-disable next/no-img-element -- local screenshots must render deterministically in the PDF export */

type PageProps = {
  page: string;
  section: string;
  title: string;
  className?: string;
  children: React.ReactNode;
};

function Page({ page, section, title, className = '', children }: PageProps) {
  return (
    <section className={`sheet ${className}`} data-page-format="a4">
      <header className="running-head">
        <span>{section}</span>
        <span>{title}</span>
      </header>
      {children}
      <footer className="page-mark">
        <span>YUNHO CHO · PLATFORM ENGINEER</span>
        <span>{page} / 09</span>
      </footer>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="label">{children}</p>;
}

function ProjectIntro({
  number,
  name,
  category,
  title,
  summary,
}: {
  number: string;
  name: string;
  category: string;
  title: string;
  summary: string;
}) {
  return (
    <div className="project-intro">
      <div className="project-id">
        <span>{number}</span>
        <div>
          <strong>{name}</strong>
          <small>{category}</small>
        </div>
      </div>
      <h1>{title}</h1>
      <p>{summary}</p>
    </div>
  );
}

function CaseCard({
  label,
  title,
  children,
  result = false,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  result?: boolean;
}) {
  return (
    <article className={`case-card ${result ? 'case-card-result' : ''}`}>
      <Label>{label}</Label>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

const executionSteps = [
  ['01', 'PIN', 'exact SHA와 설정 snapshot 고정'],
  ['02', 'BUILD', '분리된 Docker candidate 빌드'],
  ['03', 'CHECK', '서비스별 health 확인'],
  ['04', 'ROUTE', 'NGINX 적용 후 endpoint probe'],
  ['05', 'PROMOTE', '검증된 Preview만 활성화'],
];

const operationSteps = [
  ['01', 'PLAN', 'live inventory로 사전 조건 계산'],
  ['02', 'CONFIRM', '권한·승인·위험 확인'],
  ['03', 'EXECUTE', '제한된 Proxmox API 변경'],
  ['04', 'TRACK', 'UPID task 완료 상태 확인'],
  ['05', 'POST-CHECK', '변경 후 실제 VM 상태 조회'],
  ['06', 'RECORD', '성공 또는 재확인 상태 기록'],
];

const klepaasSteps = [
  ['01', 'PARSE', '자연어를 command·parameters JSON으로 변환'],
  ['02', 'VALIDATE', 'CommandRequest로 형식과 대상 검증'],
  ['03', 'PLAN', '허용된 CommandPlan(tool, args) 생성'],
  ['04', 'EXECUTE', 'Kubernetes Python Client API 호출'],
  ['05', 'FEEDBACK', '상태·URL·메트릭을 사용자에게 반환'],
];

export default function Home() {
  return (
    <main className="portfolio-document">
      <Page
        page="01"
        section="PORTFOLIO / 2026"
        title="CHO YUNHO"
        className="cover"
      >
        <div className="cover-copy">
          <Label>PLATFORM ENGINEER</Label>
          <h1>
            반복되는 운영 절차를 줄이고,
            <strong>실제 결과로 성공을 확인합니다.</strong>
          </h1>
          <p>
            배포와 인프라 변경을 재사용 가능한 흐름으로 만들고, 요청 접수가
            아니라 서비스와 자원의 실제 상태를 기준으로 완료 여부를 판단합니다.
          </p>
        </div>
        <div className="cover-projects">
          <article>
            <span>01</span>
            <div>
              <strong>Heimdall</strong>
              <p>
                저장소 등록부터 검증된 Preview 전환까지 반복 배포 절차를 자동화
              </p>
            </div>
            <small>DEPLOYMENT</small>
          </article>
          <article>
            <span>02</span>
            <div>
              <strong>Gjallar</strong>
              <p>
                Proxmox 변경을 승인·중복 방지·사후 확인으로 통제하는 운영 도구
              </p>
            </div>
            <small>INFRASTRUCTURE</small>
          </article>
          <article>
            <span>03</span>
            <div>
              <strong>K-Le-PaaS</strong>
              <p>자연어 요청을 제한된 Kubernetes 실행 계획과 피드백으로 연결</p>
            </div>
            <small>KUBERNETES</small>
          </article>
        </div>
        <div className="cover-contact">
          <strong>조윤호 · Platform Engineer</strong>
          <div>
            <a href="https://github.com/CodingPenguin-yoon">
              github.com/CodingPenguin-yoon
            </a>
            <a href="mailto:code.penguin.yoon@gmail.com">
              code.penguin.yoon@gmail.com
            </a>
            <a href="https://yoonman.page">yoonman.page</a>
          </div>
        </div>
      </Page>

      <Page page="02" section="ENGINEER PROFILE" title="RESPONSIBILITY MAP">
        <div className="page-title compact-title">
          <Label>HOW THE WORK EVOLVED</Label>
          <h1>제어 대상과 성공 조건을 나눠 운영 자동화를 설계했습니다.</h1>
          <p>
            초기에는 VM 생성부터 애플리케이션 배포까지 한 흐름으로 묶으려
            했습니다. 테스트 과정에서 두 작업의 권한과 실패 방식이 다르다는 것을
            확인하고, 인프라 변경은 Gjallar로, 애플리케이션 배포는 Heimdall로
            책임을 분리했습니다.
          </p>
        </div>
        <div className="evolution">
          <article>
            <span>01 · LEARN</span>
            <strong>K-Le-PaaS</strong>
            <p>
              입력 → 계획 → 확인 → 실행 → 피드백으로 운영 요청을 구조화했습니다.
            </p>
          </article>
          <div className="evolution-arrow">→</div>
          <article className="evolution-split">
            <span>02 · SPLIT RESPONSIBILITY</span>
            <div>
              <strong>Heimdall</strong>
              <p>애플리케이션 배포와 Preview 전환</p>
            </div>
            <div>
              <strong>Gjallar</strong>
              <p>Proxmox 관찰과 제한된 변경 통제</p>
            </div>
          </article>
        </div>
        <div className="profile-grid">
          <section>
            <Label>VALIDATION ENVIRONMENT</Label>
            <h2>직접 운영하는 환경에서 확인합니다.</h2>
            <p>
              Proxmox 3노드와 IPFire로 분리한 RED·GREEN·ORANGE 네트워크,
              NAS/NFS, WireGuard·OCI reverse proxy 환경에서 정상 경로와 실패
              경로를 검증합니다.
            </p>
            <div className="tag-list">
              <span>Proxmox VE 3-node</span>
              <span>IPFire segmentation</span>
              <span>NAS / NFS</span>
              <span>WireGuard / OCI</span>
            </div>
          </section>
          <section>
            <Label>CORE SKILLS</Label>
            <div className="skill-list">
              <div>
                <strong>Platform</strong>
                <span>Linux · Docker · Kubernetes · Proxmox</span>
              </div>
              <div>
                <strong>Backend</strong>
                <span>Python · FastAPI · PostgreSQL · REST API</span>
              </div>
              <div>
                <strong>Delivery</strong>
                <span>Git · NGINX · GitHub Actions · Prometheus</span>
              </div>
              <div>
                <strong>Network</strong>
                <span>IPFire · WireGuard · Reverse Proxy · NFS</span>
              </div>
            </div>
          </section>
        </div>
        <aside className="principle-note">
          <Label>COMMON STANDARD</Label>
          <strong>
            실행 전 대상을 고정하고, 실행 후 실제 상태를 확인하며, 불확실한
            결과를 성공으로 바꾸지 않습니다.
          </strong>
        </aside>
      </Page>

      <Page
        page="03"
        section="PROJECT 01 / HEIMDALL"
        title="PROBLEM & DECISION"
      >
        <ProjectIntro
          number="01"
          name="HEIMDALL"
          category="APPLICATION DELIVERY AUTOMATION · PERSONAL PROJECT"
          title="저장소 등록부터 Preview 전환까지 반복 배포 절차를 하나의 흐름으로 자동화했습니다."
          summary="공개 GitHub 저장소를 Docker Preview로 배포하는 self-hosted 플랫폼입니다. 애플리케이션마다 반복하던 빌드·실행·DB·공개 경로 준비를 공용 배포 흐름으로 묶었습니다."
        />
        <div className="case-grid">
          <CaseCard
            label="PROBLEM"
            title="애플리케이션마다 실행 환경과 공개 경로를 반복해서 준비해야 했습니다."
          >
            저장소 checkout과 Docker build·실행, 환경 설정, 프로젝트 DB, NGINX
            route를 애플리케이션마다 다시 연결하고 결과를 별도로 확인해야
            했습니다.
          </CaseCard>
          <CaseCard
            label="ROOT CAUSE"
            title="배포에 필요한 설정과 작업 순서가 재사용 가능한 실행 단위로 구조화되지 않았습니다."
          >
            commit·환경 설정·DB 연결·route 구성과 검증 절차가 개별 작업으로
            흩어져 있어, 같은 배포 과정을 애플리케이션마다 반복해야 했습니다.
          </CaseCard>
          <CaseCard
            label="DECISION"
            title="입력을 고정하면 candidate 준비부터 검증·전환까지 자동 실행되도록 만들었습니다."
            result
          >
            exact commit과 설정 snapshot을 기준으로 Docker candidate와 필요한
            DB·route를 준비합니다. health와 route probe까지 통과하면 Preview를
            전환하고, 실패하면 기존 정상 경로를 유지합니다.
          </CaseCard>
        </div>
        <div className="before-after">
          <div>
            <Label>BEFORE</Label>
            <strong>애플리케이션마다 VM·Docker·공개 경로를 수동 준비</strong>
            <p>새 버전의 실행 여부와 실제 서비스 응답을 별도로 확인</p>
          </div>
          <div>
            <Label>AFTER</Label>
            <strong>실행 중인 공용 플랫폼에 저장소와 설정을 등록</strong>
            <p>candidate 검증과 Preview 전환을 하나의 배포 흐름으로 수행</p>
          </div>
        </div>
        <div className="architecture" aria-label="Heimdall 배포 아키텍처">
          <div>
            <span>CONTROL</span>
            <strong>React UI</strong>
            <small>deployment request</small>
          </div>
          <i>→</i>
          <div>
            <span>CONTROL</span>
            <strong>FastAPI + DB</strong>
            <small>snapshot · job state</small>
          </div>
          <i>→</i>
          <div>
            <span>RUNTIME</span>
            <strong>Worker</strong>
            <small>Docker execution</small>
          </div>
          <i>→</i>
          <div className="architecture-accent">
            <span>VERIFY</span>
            <strong>Health + Route</strong>
            <small>promotion gate</small>
          </div>
        </div>
      </Page>

      <Page
        page="04"
        section="PROJECT 01 / HEIMDALL"
        title="IMPLEMENTATION & EVIDENCE"
        className="heimdall-evidence-page"
      >
        <div className="page-title project-page-title">
          <Label>AUTOMATED DELIVERY WITH A SAFETY GATE</Label>
          <h1>
            저장소 등록부터 Preview 전환까지 하나의 배포 작업으로 실행합니다.
          </h1>
          <p>
            배포 대상을 고정한 뒤 build·실행·health·route 검증과 전환을 순서대로
            자동화했습니다. candidate 검증은 안전한 전환을 위한 조건입니다.
          </p>
        </div>
        <ol className="step-flow five-steps">
          {executionSteps.map(([number, name, body]) => (
            <li key={number}>
              <span>{number}</span>
              <strong>{name}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className="live-proof-grid">
          <figure>
            <img
              src="/images/heimdall-deployment.png"
              alt="Heimdall의 배포 단계 완료 상태와 실시간 서비스 로그"
            />
            <figcaption>
              <Label>LIVE DEPLOYMENT</Label>
              <strong>단계별 진행 상태와 서비스 로그를 함께 확인</strong>
            </figcaption>
          </figure>
          <figure>
            <img
              src="/images/heimdall-chat-preview.png"
              alt="Heimdall을 통해 배포한 실시간 채팅 Preview"
            />
            <figcaption>
              <Label>LIVE PREVIEW</Label>
              <strong>Frontend·Backend·PostgreSQL을 연결한 실제 서비스</strong>
            </figcaption>
          </figure>
        </div>
        <div className="evidence-panel">
          <div className="evidence-lead">
            <Label>FAILURE TEST</Label>
            <strong>
              Backend 시작 실패를 주입해 Preview 전환 차단을 확인했습니다.
            </strong>
            <p>
              3-tier 테스트 애플리케이션의 새 candidate에서 Backend 시작 실패를
              발생시켰습니다. Health 검증 실패로 전환이 중단됐고, 기존 stable
              Preview는 같은 URL에서 계속 응답했습니다.
            </p>
          </div>
          <div className="status-sequence">
            <div className="status-failed">
              <span>NEW</span>
              <strong>candidate failed</strong>
            </div>
            <i>→</i>
            <div className="status-blocked">
              <span>PROMOTION</span>
              <strong>blocked</strong>
            </div>
            <i>→</i>
            <div className="status-good">
              <span>ACTIVE</span>
              <strong>stable kept serving</strong>
            </div>
          </div>
        </div>
        <div className="runtime-evidence-strip">
          <div>
            <Label>RUNTIME</Label>
            <strong>Frontend + Backend + Managed PostgreSQL</strong>
          </div>
          <div>
            <Label>VERIFY</Label>
            <strong>service health + NGINX route probe</strong>
          </div>
          <div>
            <Label>CURRENT SCOPE</Label>
            <strong>Public GitHub · fixed main · single Docker host</strong>
          </div>
        </div>
        <div className="link-row">
          <a href="https://youtu.be/-fzROUCZEAQ">2-minute demo ↗</a>
          <a href="https://github.com/CodingPenguin-yoon/heimdall_final">
            Repository ↗
          </a>
          <a href="https://github.com/CodingPenguin-yoon/heimdall_final/blob/main/backend/tests/test_nginx_gateway.py">
            Gateway tests ↗
          </a>
          <a href="https://github.com/CodingPenguin-yoon/heimdall_final/blob/main/backend/tests/integration/test_worker_runtime_smoke.py">
            Runtime smoke ↗
          </a>
        </div>
      </Page>

      <Page page="05" section="PROJECT 02 / GJALLAR" title="PROBLEM & DECISION">
        <ProjectIntro
          number="02"
          name="GJALLAR"
          category="CONTROLLED INFRASTRUCTURE OPERATIONS · PERSONAL PROJECT"
          title="API 응답이 아니라 변경 후 실제 VM 상태로 성공을 판단합니다."
          summary="Proxmox actual inventory를 관찰하고, 제한된 변경을 사전 검증·승인·사후 확인 절차로 실행하는 운영 제어 도구입니다."
        />
        <div className="case-grid">
          <CaseCard
            label="PROBLEM"
            title="수동 VM 작업은 반복 입력과 사전 조건 누락에 취약했습니다."
          >
            VM마다 CPU·메모리 사양과 IP를 다시 확인해야 했고, 중복 요청이나 IP
            충돌을 작업 전에 일관되게 차단하기 어려웠습니다.
          </CaseCard>
          <CaseCard
            label="RISK"
            title="Proxmox가 요청을 수락해도 목표 상태에 도달했다고 단정할 수 없었습니다."
          >
            비동기 task의 timeout, 누락된 task reference, task 완료 후 실제 상태
            불일치가 발생할 수 있으므로 API 응답과 운영 결과를 분리해야
            했습니다.
          </CaseCard>
          <CaseCard
            label="DECISION"
            title="관찰과 제한된 변경 통제에 제품 범위를 좁혔습니다."
            result
          >
            live inventory를 기준으로 권한·IP·network·storage를 확인하고, 승인된
            작업만 실행합니다. 전체 VM lifecycle 자동화보다 안전한 실행 경계를
            우선했습니다.
          </CaseCard>
        </div>
        <div className="truth-model">
          <section>
            <Label>SOURCE OF TRUTH</Label>
            <h3>Proxmox VE</h3>
            <p>
              Node / VM inventory
              <br />
              Task reference and status
              <br />
              Observed resource state
            </p>
          </section>
          <div className="truth-arrows">
            <span>READ LIVE STATE</span>
            <strong>⇄</strong>
            <span>EXECUTE EXPLICIT CHANGE</span>
          </div>
          <section className="truth-control">
            <Label>OPERATION RECORD</Label>
            <h3>Gjallar</h3>
            <p>
              Operator intent and policy
              <br />
              Approval · idempotency
              <br />
              Post-check and reconciliation
            </p>
          </section>
        </div>
        <div className="before-after compact-compare">
          <div>
            <Label>BEFORE</Label>
            <strong>VM마다 사양·IP 조건을 다시 확인</strong>
          </div>
          <div>
            <Label>AFTER</Label>
            <strong>Profile 재사용 + live preflight로 잘못된 요청 차단</strong>
          </div>
        </div>
      </Page>

      <Page
        page="06"
        section="PROJECT 02 / GJALLAR"
        title="EXECUTION & EVIDENCE"
      >
        <div className="page-title project-page-title">
          <Label>GUARDED EXECUTION</Label>
          <h1>
            변경 작업을 같은 버튼이 아니라, 같은 검증 원칙으로 묶었습니다.
          </h1>
          <p>
            현재 구현한 Create·Start·graceful Shutdown은 사전 확인·실행·task
            추적·실제 상태 재조회로 끝납니다. Guided unlock은 운영자 실행 후
            해제 상태를 다시 확인합니다.
          </p>
        </div>
        <ol className="step-flow six-steps">
          {operationSteps.map(([number, name, body]) => (
            <li key={number}>
              <span>{number}</span>
              <strong>{name}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className="operation-grid">
          <article>
            <span>01</span>
            <strong>CREATE VM</strong>
            <p>Profile · IP preflight · 승인 · UPID · 생성 후 상태 확인</p>
          </article>
          <article>
            <span>02</span>
            <strong>START</strong>
            <p>명시적 확인 · idempotency · task polling · running 확인</p>
          </article>
          <article>
            <span>03</span>
            <strong>GRACEFUL SHUTDOWN</strong>
            <p>허용 상태 확인 · 제한된 실행 · 종료 상태 재조회</p>
          </article>
          <article>
            <span>04</span>
            <strong>GUIDED UNLOCK</strong>
            <p>짧은 지침 발급 · 운영자 실행 · API로 lock 해제 확인</p>
          </article>
        </div>
        <div className="non-success">
          <Label>NON-SUCCESS PATH</Label>
          <div>
            <article>
              <strong>TIMEOUT</strong>
              <p>응답 지연을 자동 성공으로 변경하지 않음</p>
            </article>
            <article>
              <strong>MISSING TASK</strong>
              <p>task reference가 없으면 결과를 확정하지 않음</p>
            </article>
            <article>
              <strong>STATE MISMATCH</strong>
              <p>예상 상태와 다르면 재확인 대상으로 기록</p>
            </article>
          </div>
        </div>
        <div className="result-grid gjallar-results">
          <CaseCard
            label="RESULT"
            title="반복 입력을 줄이고, 변경 결과를 실제 상태로 다시 확인했습니다."
            result
          >
            VM Profile로 자원 사양을 재사용하고 IP 충돌을 사전에 확인합니다.
            Create·Start·graceful Shutdown의 task와 after-state를 검증했고,
            guided unlock은 운영자 실행 후 lock 해제를 재조회합니다.
          </CaseCard>
          <CaseCard
            label="CONTROL RANGE"
            title="반복 작업은 자동화하고, 고위험 변경은 운영자 판단에 남겼습니다."
          >
            Create·Start·graceful Shutdown과 제한된 guided unlock을 승인
            흐름으로 제공하고, migration·snapshot·임의 shell 작업은
            분리했습니다.
          </CaseCard>
        </div>
        <div className="link-row single-link">
          <a href="https://github.com/CodingPenguin-yoon/Gjallar">
            github.com/CodingPenguin-yoon/Gjallar ↗
          </a>
        </div>
      </Page>

      <Page
        page="07"
        section="PROJECT 03 / K-LE-PAAS"
        title="PROBLEM & APPROACH"
      >
        <ProjectIntro
          number="03"
          name="K-LE-PAAS"
          category="KUBERNETES OPERATIONS · TEAM OF 2 · 2025.09-12"
          title="모호한 자연어를 허용된 Kubernetes 실행 계획으로 바꿨습니다."
          summary="웹과 Slack의 운영 요청을 해석하고, 사용자가 확인할 수 있는 계획과 실행 결과·모니터링 피드백으로 연결한 팀 프로젝트입니다."
        />
        <div className="case-grid three-column-case">
          <CaseCard
            label="PROBLEM"
            title="자연어를 그대로 실행하면 해석 오류가 운영 변경으로 이어질 수 있습니다."
          >
            모호한 요청에서 대상과 의도를 분리하고, 시스템이 지원하는 작업과
            인자만 실행하도록 제한할 필요가 있었습니다.
          </CaseCard>
          <CaseCard
            label="SOLUTION"
            title="요청을 CommandRequest와 허용된 CommandPlan으로 구조화했습니다."
          >
            상태·로그 조회, 재시작·스케일링·버전 롤백 API로 연결하고 실행 결과와
            외부 URL을 다시 사용자에게 반환했습니다.
          </CaseCard>
          <CaseCard
            label="RESULT"
            title="실행 결과와 운영 정보를 다시 사용자에게 연결했습니다."
            result
          >
            Kubernetes 작업 결과에 더해 Prometheus 지표와 Ingress 외부 URL을
            웹·Slack 요청 흐름으로 반환했습니다.
          </CaseCard>
        </div>
        <div className="command-flow">
          <div>
            <Label>INPUT EXAMPLE</Label>
            <strong>K-Le-PaaS/test01 재시작해줘</strong>
          </div>
          <i>→</i>
          <div>
            <Label>INTERPRET</Label>
            <strong>intent + repository</strong>
          </div>
          <i>→</i>
          <div>
            <Label>PLAN</Label>
            <strong>k8s_restart_deployment</strong>
          </div>
          <i>→</i>
          <div className="command-result">
            <Label>FEEDBACK</Label>
            <strong>state · URL · metrics</strong>
          </div>
        </div>
        <div className="before-after klepaas-decision">
          <div>
            <Label>INITIAL OPTION</Label>
            <strong>온프레미스 배포 + NCP 게이트웨이</strong>
            <p>직접 운영 환경을 활용하는 구성을 검토</p>
          </div>
          <div>
            <Label>TEAM DECISION</Label>
            <strong>NCP SourcePipeline → NKS</strong>
            <p>공모전 조건과 구축 범위를 비교해 NCP 배포 흐름으로 합의</p>
          </div>
        </div>
      </Page>

      <Page
        page="08"
        section="PROJECT 03 / K-LE-PAAS"
        title="IMPLEMENTATION & EVIDENCE"
      >
        <div className="page-title project-page-title klepaas-detail-title">
          <Label>FROM REQUEST TO FEEDBACK</Label>
          <h1>
            요청을 실행하고, 상태·URL·지표를 다시 사용자에게 돌려줬습니다.
          </h1>
          <p>
            자연어를 자유 형식 명령으로 실행하지 않고, 검증 가능한 작업 단위로
            변환해 Kubernetes API와 NKS 관측 경로에 연결했습니다.
          </p>
        </div>
        <ol className="step-flow five-steps klepaas-steps">
          {klepaasSteps.map(([number, name, body]) => (
            <li key={number}>
              <span>{number}</span>
              <strong>{name}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className="contribution-grid klepaas-contribution">
          <section>
            <Label>MY CONTRIBUTION</Label>
            <ul>
              <li>
                <strong>자연어 실행 계획</strong>
                command·parameters 구조화와 Kubernetes 실행·조회 연결
              </li>
              <li>
                <strong>NKS 모니터링</strong>
                Prometheus 설치·수집 대상 구성, CPU·메모리·디스크·네트워크 조회
                API
              </li>
              <li>
                <strong>서비스 접근 경로</strong>
                Ingress 외부 주소와 사용자·저장소별 service URL 생성·저장·조회
              </li>
            </ul>
          </section>
          <section className="pr-list">
            <Label>MERGED EVIDENCE</Label>
            <a href="https://github.com/K-Le-PaaS/backend-hybrid/pull/28">
              <strong>PR #28</strong>
              <span>NLP / Kubernetes operations</span>
            </a>
            <a href="https://github.com/K-Le-PaaS/backend-hybrid/pull/42">
              <strong>PR #42</strong>
              <span>NKS monitoring API</span>
            </a>
            <a href="https://github.com/K-Le-PaaS/backend-hybrid/pull/63">
              <strong>PR #63</strong>
              <span>Deployment URL</span>
            </a>
          </section>
        </div>
        <div className="klepaas-runtime-detail">
          <div>
            <Label>RESTART TARGET</Label>
            <strong>owner / repository → Deployment</strong>
            <p>저장소 식별자를 실행 대상 namespace와 Deployment로 매핑</p>
          </div>
          <div>
            <Label>API ACTION</Label>
            <strong>patch_namespaced_deployment()</strong>
            <p>pod template annotation을 변경해 rollout restart 수행</p>
          </div>
          <div>
            <Label>AFTER STATE</Label>
            <strong>state · metrics · service URL</strong>
            <p>실행 이후 확인에 필요한 운영 정보를 요청 흐름으로 반환</p>
          </div>
        </div>
        <div className="klepaas-evidence-strip">
          <div>
            <Label>DELIVERY RECORD</Label>
            <strong>Backend 27 + Frontend 21 · merged PR 48개</strong>
          </div>
          <div>
            <Label>RUNTIME RESULT</Label>
            <strong>NKS 작업·모니터링·Ingress URL 흐름 시연</strong>
          </div>
          <a href="https://www.youtube.com/watch?v=tY4XmxIsDok">
            <span>DEMO</span>
            <strong>12-minute walkthrough ↗</strong>
          </a>
        </div>
      </Page>

      <Page
        page="09"
        section="VALIDATION & CONTACT"
        title="ENGINEERING CONTEXT"
      >
        <div className="page-title compact-title final-title">
          <Label>WHERE I VERIFY</Label>
          <h1>직접 운영하는 환경에서 정상 경로와 실패 경로를 확인합니다.</h1>
          <p>
            기능 구현을 API 응답에서 끝내지 않고, 네트워크 경로와 런타임·자원
            상태까지 확인할 수 있는 환경을 유지합니다.
          </p>
        </div>
        <div className="lab-flow">
          <div>
            <span>PUBLIC</span>
            <strong>Client</strong>
            <small>request</small>
          </div>
          <i>→</i>
          <div>
            <span>EDGE</span>
            <strong>OCI Reverse Proxy</strong>
            <small>public route</small>
          </div>
          <i>→</i>
          <div>
            <span>TUNNEL</span>
            <strong>WireGuard</strong>
            <small>encrypted path</small>
          </div>
          <i>→</i>
          <div className="lab-core">
            <span>BOUNDARY</span>
            <strong>IPFire</strong>
            <small>RED · GREEN · ORANGE</small>
          </div>
        </div>
        <div className="zone-grid">
          <article>
            <span>GREEN / MANAGEMENT</span>
            <strong>Proxmox VE 3-node</strong>
            <p>VM inventory · task · management access</p>
          </article>
          <article>
            <span>ORANGE / SERVICE</span>
            <strong>Heimdall · service VMs</strong>
            <p>Docker Preview · NGINX route · public workloads</p>
          </article>
          <article>
            <span>STORAGE</span>
            <strong>NAS / NFS</strong>
            <p>shared storage and project validation</p>
          </article>
        </div>
        <div className="proof-summary">
          <Label>WHAT THESE PROJECTS SHOW</Label>
          <ol>
            <li>
              <span>01</span>
              <strong>배포</strong>
              <p>
                반복되던 build·DB·route 준비와 Preview 전환을 하나의 배포
                흐름으로 자동화했습니다.
              </p>
            </li>
            <li>
              <span>02</span>
              <strong>인프라 변경</strong>
              <p>
                권한·중복 방지·task·actual state 확인으로 제한된 변경을
                통제했습니다.
              </p>
            </li>
            <li>
              <span>03</span>
              <strong>운영 인터페이스</strong>
              <p>
                모호한 자연어를 허용된 계획으로 바꾸고 결과와 지표를 다시
                연결했습니다.
              </p>
            </li>
          </ol>
        </div>
        <div className="final-grid">
          <section>
            <Label>EDUCATION & CERTIFICATIONS</Label>
            <strong>광운대학교 전자통신공학과 · 2026.02 졸업</strong>
            <p>정보처리기사 · 리눅스마스터 2급</p>
          </section>
          <section className="final-contact">
            <Label>CONTACT</Label>
            <strong>조윤호 · Platform Engineer</strong>
            <a href="mailto:code.penguin.yoon@gmail.com">
              code.penguin.yoon@gmail.com
            </a>
            <a href="https://github.com/CodingPenguin-yoon">
              github.com/CodingPenguin-yoon
            </a>
            <a href="https://yoonman.page">yoonman.page</a>
          </section>
        </div>
      </Page>
    </main>
  );
}
