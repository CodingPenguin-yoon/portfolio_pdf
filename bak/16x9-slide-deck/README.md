# Yunho Cho - Platform Engineer Portfolio

16:9 HTML portfolio and PDF source for Yunho Cho's Platform Engineer portfolio.

The 15-page narrative covers:

- the engineering profile and design retrospective;
- Heimdall's verified Preview deployment lifecycle;
- K-Le-PaaS command, deployment URL, and NKS monitoring contributions;
- Gjallar's Proxmox operation boundaries and guarded execution model;
- the validation environment and shared engineering principles.

## Preview

```bash
pnpm install
pnpm dev
```

Open `http://127.0.0.1:4173`.

## Export

```bash
pnpm pdf
pnpm capture
```

- PDF: `output/pdf/cho-yunho-platform-engineer-portfolio.pdf`
- Rendered page previews: `tmp/rendered/`

The HTML source is the canonical artifact. PDF export uses the same 1600 x 900 CSS page size, fonts, diagrams, and linked implementation references.
