# Yunho Cho · Platform Engineer Portfolio

기업 제출용 16:9 포트폴리오입니다. HTML을 편집 가능한 원본으로 사용하고, 동일한 화면을 PDF로 내보냅니다.

## Local development

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 13페이지 문서를 연속으로 확인할 수 있습니다.

## PDF export

개발 서버를 실행한 상태에서 다음 명령으로 `output/pdf/yunho-cho-platform-engineer-portfolio.pdf`를 생성합니다.

```bash
npm run pdf
```

## Validation

```bash
npm test
npm run lint
```
