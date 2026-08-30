# QBE Accenture — Community of Practice Microsite

A single-page React/TypeScript application hosting the **Network & Observability CoP** hub and individual detail pages for **15+ internal technology Communities of Practice** at QBE Accenture.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [How to Make Changes](#how-to-make-changes)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment Targets](#deployment-targets)
- [Adding a New CoP](#adding-a-new-cop)

---

## Architecture Overview

```
Developer (VS Code + Claude Code)
        │
        ▼
  Edit source files
  ├── content/<cop>/     ← CSV data (source of truth)
  ├── src/data/pages/    ← Auto-generated TypeScript modules
  └── src/               ← React components & styles
        │
        ▼ git push → main
  GitHub Repository
        │
        ├──► sync-cop-data.yml   → regenerates TS from CSVs → auto-commit
        ├──► build-app.yml       → npm run build → docs/index.html artifact
        ├──► deploy-to-pages.yml → force-pushes docs/ → gh-pages branch → GitHub Pages
        └──► deploy-to-azure.yml → deploys docs/ → Azure Static Web Apps (+ AAD auth)
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript 5.6 |
| Build Tool | Vite 6 + `vite-plugin-singlefile` |
| Routing | React Router 7 (hash-based, no server config needed) |
| Auth | Azure Active Directory (MSAL) via `staticwebapp.config.json` |
| Hosting | GitHub Pages + Azure Static Web Apps |
| CI/CD | GitHub Actions (4 workflows) |
| Data Pipeline | Node.js sync script (CSV → TypeScript) |
| Node Version | 22 (pinned via `.nvmrc`) |

---

## Project Structure

```
Microsite/
├── src/                    # React application source
│   ├── main.tsx            # App entry point & router
│   ├── App.tsx             # N&O CoP custom page (premium)
│   ├── CoPTemplate.tsx     # Generic template for all other CoPs
│   ├── LandingPage.tsx     # Hub landing page
│   ├── context/            # Azure AD auth context (MSAL)
│   └── data/
│       ├── types.ts        # Shared TypeScript interfaces
│       ├── communities.ts  # Master CoP registry
│       └── pages/          # Per-CoP data modules (auto-generated)
│
├── content/                # CSV source data (one folder per CoP)
│   ├── _template/          # Blank template for new CoPs
│   └── <cop-id>/           # page.csv, leadership.csv, members.csv, events.csv, links.csv
│
├── scripts/
│   ├── sync.js             # CSV → TypeScript data pipeline
│   └── generate-form.ps1   # CoP lead intake form generator
│
├── public/                 # Static assets (icons, photos) — inlined at build
├── docs/                   # Vite build output → deployed artifact
│   └── index.html          # Single self-contained HTML (~520 KB)
│
├── .github/workflows/      # CI/CD GitHub Actions
│   ├── sync-cop-data.yml
│   ├── build-app.yml
│   ├── deploy-to-pages.yml
│   └── deploy-to-azure.yml
│
├── vite.config.ts          # Build config (singlefile output to docs/)
├── staticwebapp.config.json # Azure auth + routing rules
└── package.json            # Scripts: dev, build, sync, sync:build
```

---

## Quick Start

### Prerequisites

- Node.js 22+ (use `nvm use` or install from `.nvmrc`)
- Git
- VS Code (recommended) + Claude Code extension

### Setup

```bash
# Clone the repository
git clone https://github.com/pramodh-nagaraja/community-of-practice-microsite.git
cd community-of-practice-microsite

# Install dependencies
npm install

# Start local dev server
npm run dev
# → http://localhost:5173
```

### Available Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | TypeScript compile + Vite build → `docs/index.html` |
| `npm run sync` | Regenerate `src/data/pages/*.ts` from `content/` CSVs |
| `npm run sync:build` | sync + build in sequence |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## How to Make Changes

### Option A — Update CoP Data (CSV-driven)

1. Edit the relevant CSV files in `content/<cop-id>/`
2. Run `npm run sync` to regenerate TypeScript
3. Run `npm run dev` to verify in browser
4. `git add . && git commit -m "Update: <cop> member data"`
5. `git push origin main`
6. CI automatically syncs, builds, and deploys

### Option B — UI / Component Changes

1. Edit files in `src/` directly
2. Run `npm run dev` for live preview
3. Commit and push → CI builds and deploys

### Option C — Add a New CoP

See the [Adding a New CoP](#adding-a-new-cop) section below.

---

## CI/CD Pipeline

Four GitHub Actions workflows run automatically on push to `main`:

| Workflow | Trigger | Action |
|---|---|---|
| `sync-cop-data.yml` | `content/**` or `scripts/sync.js` changed | Runs `sync.js`, auto-commits TS files |
| `build-app.yml` | Any push to `main` | `npm run build` → uploads `docs/` artifact |
| `deploy-to-pages.yml` | Any push to `main` | Builds + force-pushes `docs/` to `gh-pages` |
| `deploy-to-azure.yml` | Any push to `main` | Builds + deploys to Azure Static Web Apps |

All workflows can also be triggered manually via **Actions → Run workflow** in GitHub.

---

## Deployment Targets

### GitHub Pages
- URL: `https://pramodh-nagaraja.github.io/community-of-practice-microsite/`
- Branch: `gh-pages` (auto-managed by CI)
- Auth: None (public)

### Azure Static Web Apps
- Auth: Azure Active Directory (tenant `e0793d39-0939-496d-b129-198edd916feb`)
- All routes require `authenticated` role
- Unauthenticated users are redirected to AAD login
- Configured via `staticwebapp.config.json`

---

## Adding a New CoP

1. Create `content/<new-cop-id>/` with the 5 CSV files from `content/_template/`
2. Fill in member, leadership, event, and link data
3. Add the CoP entry to `src/data/communities.ts`
4. Register it in `src/data/pages/index.ts`
5. Run `npm run sync:build` to generate the TS module and build
6. Test locally with `npm run preview`
7. Push to `main` — CI handles the rest

See [content/README.md](content/README.md) for the full CSV schema.

---

## Component READMEs

| Component | README |
|---|---|
| React Application | [src/README.md](src/README.md) |
| CSV Data Layer | [content/README.md](content/README.md) |
| Build Scripts | [scripts/README.md](scripts/README.md) |
| CI/CD Workflows | [.github/workflows/README.md](.github/workflows/README.md) |
| Build Output | [docs/README.md](docs/README.md) |

---

*Maintained by Pramodh Nagaraja — N&O CoP Lead, QBE Accenture*
