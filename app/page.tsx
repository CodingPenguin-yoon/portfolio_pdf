import Image from "next/image";

const primaryProjects = [
  {
    index: "01",
    name: "Gjallar",
    label: "INFRASTRUCTURE CONTROL",
    title: "실제 상태를 확인하고, 승인된 변경만 실행합니다.",
    description:
      "Proxmox의 현재 상태를 기준으로 VM 생성 조건을 검증하고, 계획과 승인 단계를 거쳐 Native API를 실행하는 운영 콘솔입니다.",
    image: "/projects/gjallar.png",
    imageAlt: "Gjallar Proxmox 클러스터 운영 콘솔",
    role: "Product design · Backend · Operations UI",
    stack: ["Proxmox API", "FastAPI", "React", "PostgreSQL"],
    problem:
      "VM을 만들 때마다 사양·네트워크·스토리지를 다시 확인했고, 실행 전 판단과 실행 후 결과가 남지 않았습니다.",
    decision:
      "범용 IaC 실행기를 유지하기보다 실제 inventory, 재사용 가능한 Profile, Preflight, Approval을 하나의 제어 흐름으로 만들었습니다.",
    outcome:
      "작업 전후 상태와 Proxmox UPID를 같은 Job에 남겨, 무엇을 왜 바꿨는지 다시 확인할 수 있게 했습니다.",
    flow: ["Actual inventory", "Profile", "Preflight", "Approval", "Native create", "Observed after"],
    note: "현재 범위 · Native Create + 제한된 승인 기반 Start",
    repo: "https://github.com/CodingPenguin-yoon/Gjallar",
  },
  {
    index: "02",
    name: "Heimdall",
    label: "APPLICATION DELIVERY",
    title: "검증된 후보만 현재 서비스로 승격합니다.",
    description:
      "Git commit을 고정해 새 배포 세대를 만들고, Health와 실제 Route를 검증한 뒤에만 Current를 전환하는 로컬 프리뷰 배포 관리자입니다.",
    image: "/projects/heimdall.png",
    imageAlt: "Heimdall 프리뷰 배포 운영 콘솔",
    role: "Product design · Backend · Deployment automation",
    stack: ["Docker", "FastAPI", "PostgreSQL", "Nginx"],
    problem:
      "빌드 성공만으로 배포 성공을 판단하면, 실행이나 라우팅 단계의 실패가 기존 서비스까지 흔들 수 있었습니다.",
    decision:
      "Candidate와 Current를 분리하고 Build, Health, nginx 검증, Route Probe가 모두 끝난 뒤 원자적으로 승격합니다.",
    outcome:
      "후보 배포가 실패해도 기존 Current와 사용자 데이터를 유지하고, 불확실한 상태는 자동 삭제하지 않도록 설계했습니다.",
    flow: ["Exact commit", "Build", "Candidate", "Health", "Route probe", "Promote current"],
    note: "원칙 · 실패한 후보보다 마지막 정상 상태 보존",
    repo: "https://github.com/CodingPenguin-yoon/Heimdall",
  },
] as const;

const supportingProjects = [
  {
    name: "K-Le-PaaS",
    tag: "2인 팀 · 2025.09—12",
    title: "자연어 기반 Kubernetes 운영 플랫폼",
    description:
      "자연어 요청을 의도와 대상으로 해석해 CommandPlan으로 정규화하고 Kubernetes·NCP 작업과 결과 피드백에 연결했습니다.",
    contribution: "Gemini 의도·엔티티 해석, Kubernetes 명령 계획, 도메인 동기화, NKS 모니터링",
    stack: "Gemini · Kubernetes · FastAPI · GitHub Actions · Slack",
    image: "/projects/klepaas-dashboard.png",
    imageAlt: "K-Le-PaaS 운영 대시보드",
    repo: "https://github.com/K-Le-PaaS/backend-hybrid",
  },
  {
    name: "Argus",
    tag: "개인 프로젝트 · 진행 중",
    title: "한국 시장 경제 데이터 대시보드",
    description:
      "서로 다른 시장·뉴스 공급자를 독립적인 Adapter로 분리하고, 비교 가능한 Snapshot으로 정규화해 판단 화면에 연결했습니다.",
    contribution: "데이터 수집 파이프라인, 공급자 경계, 정규화 모델, 대시보드",
    stack: "Next.js · FastAPI · KIS API · Market Data",
    image: "/projects/argus.png",
    imageAlt: "Argus 경제 데이터 대시보드",
    repo: "https://github.com/CodingPenguin-yoon",
  },
] as const;

const principles = [
  ["01", "Observe before change", "실행 전에 실제 상태와 변경 계획을 확인합니다."],
  ["02", "Separate by failure", "변경 이유와 실패 영향이 다르면 책임을 분리합니다."],
  ["03", "Preserve uncertainty", "상태가 불확실할 때는 자동 삭제보다 보존을 선택합니다."],
] as const;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="조윤호 포트폴리오 처음으로">
          <span>YH</span>
          <strong>Yunho Cho</strong>
        </a>
        <nav aria-label="주요 탐색">
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <a href="#experience">Experience</a>
          <a className="nav-contact" href="mailto:code.penguin.yoon@gmail.com">Contact ↗</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> PLATFORM ENGINEER · SEOUL</p>
          <h1>
            반복을 자동화하고,<br />
            <em>실패의 경계</em>를 설계합니다.
          </h1>
          <p className="hero-lead">
            홈랩의 반복 운영에서 시작해 VM 생성, 애플리케이션 배포, 사용자 데이터의 수명주기를 분리했습니다.
            정상 경로보다 실패했을 때 무엇을 지킬지 먼저 고민하는 신입 플랫폼 엔지니어 조윤호입니다.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">대표 프로젝트 보기 <span>↓</span></a>
            <a className="button button-secondary" href="/resume/yunho-cho-resume.pdf" target="_blank">이력서 PDF <span>↗</span></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="운영 자동화가 책임 경계 설계로 발전한 과정">
          <div className="visual-topbar"><span /><span /><span /><b>system-boundaries.yml</b></div>
          <div className="visual-body">
            <p className="code-comment"># automation grew into architecture</p>
            <div className="code-line"><span>observe:</span><strong> actual_state</strong></div>
            <div className="code-line"><span>plan:</span><strong> explicit_change</strong></div>
            <div className="code-line"><span>execute:</span><strong> approved_action</strong></div>
            <div className="boundary-map">
              <article><small>INFRA</small><b>Gjallar</b><p>VM create</p></article>
              <i>→</i>
              <article><small>RELEASE</small><b>Heimdall</b><p>App generation</p></article>
              <i>→</i>
              <article><small>DATA</small><b>PostgreSQL</b><p>Preserved</p></article>
            </div>
            <div className="code-line code-success"><span>on_failure:</span><strong> preserve_current</strong><i>✓</i></div>
          </div>
          <div className="visual-caption"><span>01</span><p>책임이 다르면 변경과 복구의 경계도 달라야 합니다.</p></div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <span>PROXMOX</span><i>+</i><span>KUBERNETES</span><i>+</i><span>FASTAPI</span><i>+</i><span>DOCKER</span><i>+</i><span>POSTGRESQL</span><i>+</i><span>GITHUB ACTIONS</span>
      </div>

      <section className="origin shell section" id="about">
        <div className="section-index">01 / ABOUT</div>
        <div className="origin-grid">
          <div>
            <p className="kicker">HOW I THINK</p>
            <h2>도구보다 먼저,<br />운영의 흐름을 봅니다.</h2>
          </div>
          <div className="origin-story">
            <p className="lead-quote">“처음의 목표는 거대한 플랫폼이 아니라, 매번 반복하던 준비 작업을 줄이는 것이었습니다.”</p>
            <p>새 서비스를 올릴 때마다 VM, 네트워크, Docker, 내부 설정을 다시 준비했습니다. 자동화 범위가 커질수록 VM 생성과 애플리케이션 배포가 서로 다른 이유로 바뀌고 실패한다는 사실이 보였습니다.</p>
            <p>기능을 계속 붙이는 대신, 인프라 생성은 Gjallar로, 애플리케이션 릴리스는 Heimdall로 분리했습니다. 이 경험은 제가 시스템을 보는 기준이 되었습니다.</p>
          </div>
        </div>
        <ol className="evolution" aria-label="설계 관점이 발전한 과정">
          <li><span>01</span><b>반복 운영</b><small>Manual work</small></li>
          <li><span>02</span><b>통합 자동화</b><small>One workflow</small></li>
          <li className="turn"><span>03</span><b>책임 결합 발견</b><small>Turning point</small></li>
          <li><span>04</span><b>경계 분리</b><small>Gjallar / Heimdall</small></li>
          <li><span>05</span><b>실패 시 보존</b><small>Preserve current</small></li>
        </ol>
      </section>

      <section className="principles-band">
        <div className="shell">
          <div className="section-index light">ENGINEERING PRINCIPLES</div>
          <div className="principle-grid">
            {principles.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span><h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work shell section" id="work">
        <div className="section-index">02 / SELECTED WORK</div>
        <div className="section-heading">
          <div><p className="kicker">CASE STUDIES</p><h2>대표 프로젝트</h2></div>
          <p>기능의 수보다 문제를 정의하고 경계를 다시 설계한 과정을 중심으로 정리했습니다.</p>
        </div>

        {primaryProjects.map((project) => (
          <article className="case-study" key={project.name}>
            <div className="case-heading">
              <div className="case-number">{project.index}</div>
              <div><p className="kicker">{project.label}</p><h3>{project.name}</h3></div>
              <p className="case-title">{project.title}</p>
            </div>
            <div className="project-shot">
              <div className="shot-bar"><span>{project.name.toLowerCase()}.local</span><b>IMPLEMENTED</b></div>
              <Image src={project.image} alt={project.imageAlt} width={1600} height={900} sizes="(max-width: 700px) 100vw, 1240px" />
            </div>
            <div className="case-summary">
              <p className="case-description">{project.description}</p>
              <div className="meta"><span>ROLE</span><p>{project.role}</p></div>
              <div className="meta"><span>STACK</span><p>{project.stack.join(" · ")}</p></div>
              <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">GitHub 저장소 <span>↗</span></a>
            </div>
            <div className="case-details">
              <div className="decision-list">
                <article><span>PROBLEM</span><p>{project.problem}</p></article>
                <article><span>DECISION</span><p>{project.decision}</p></article>
                <article><span>OUTCOME</span><p>{project.outcome}</p></article>
              </div>
              <div className="project-flow">
                <p>CONTROL FLOW</p>
                <ol>{project.flow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b></li>)}</ol>
                <small>{project.note}</small>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="supporting section">
        <div className="shell">
          <div className="section-index">03 / MORE WORK</div>
          <div className="supporting-grid">
            {supportingProjects.map((project) => (
              <article className="support-card" key={project.name}>
                <div className="support-image"><Image src={project.image} alt={project.imageAlt} width={900} height={506} sizes="(max-width: 700px) 100vw, 50vw" /></div>
                <div className="support-copy">
                  <p className="kicker">{project.tag}</p><h3>{project.name}</h3><h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <dl><div><dt>개인 기여</dt><dd>{project.contribution}</dd></div><div><dt>기술</dt><dd>{project.stack}</dd></div></dl>
                  <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">관련 저장소 <span>↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="experience shell section" id="experience">
        <div className="section-index">04 / EXPERIENCE</div>
        <div className="experience-grid">
          <div><p className="kicker">CAPABILITIES</p><h2>기술은 목적보다<br />선택의 근거로 둡니다.</h2></div>
          <div className="skill-rows">
            <div><span>Platform / Infra</span><p>Proxmox · Kubernetes · NCP · Docker · Linux</p></div>
            <div><span>Backend / Data</span><p>FastAPI · PostgreSQL · Redis · SQLAlchemy · REST API</p></div>
            <div><span>Automation / Delivery</span><p>GitHub Actions · Terraform · Ansible · WireGuard · Slack API</p></div>
            <div><span>Interface</span><p>React · Next.js · TypeScript · Vite</p></div>
          </div>
        </div>
        <div className="credentials">
          <article><span>EDUCATION</span><h3>광운대학교 전자통신공학과</h3><p>졸업 · 2026.02</p></article>
          <article><span>CERTIFICATIONS</span><h3>정보처리기사</h3><p>리눅스마스터 2급</p></article>
          <article><span>WORK STATUS</span><h3>신입 Platform Engineer</h3><p>Seoul, Korea · Open to work</p></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="shell contact-grid">
          <div><p className="kicker">LET&apos;S BUILD RELIABLE SYSTEMS</p><h2>함께 일할 엔지니어를<br />찾고 계신가요?</h2></div>
          <div className="contact-right">
            <p>새로운 문제를 빠르게 이해하고, 실행 가능한 경계로 나누어 끝까지 구현하겠습니다.</p>
            <a href="mailto:code.penguin.yoon@gmail.com">code.penguin.yoon@gmail.com <span>↗</span></a>
          </div>
        </div>
        <footer className="shell">
          <p>© 2026 Yunho Cho</p>
          <div><a href="https://github.com/CodingPenguin-yoon" target="_blank" rel="noreferrer">GitHub ↗</a><a href="/resume/yunho-cho-resume.pdf" target="_blank">Resume ↗</a><a href="#top">Back to top ↑</a></div>
        </footer>
      </section>
    </main>
  );
}
