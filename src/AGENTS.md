<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-10 | Updated: 2026-02-10 -->

# src

## Purpose
Frontend application source code for the Haarpeer Report Generator. Contains the main React app, UI components, API client library, prompt definitions, and the food template dashboard that serves both as an in-app preview and as the deployable output.

## Key Files
| File | Description |
|------|-------------|
| `main.tsx` | React entry point — mounts `<App />` into `#root` with StrictMode |
| `App.tsx` | Main application component — tab-based UI (입력/미리보기/배포) with report generation workflow |
| `index.css` | Global styles — Tailwind CSS v4 `@theme` with custom olive palette, Pretendard font, fade-in animation |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `components/` | Reusable UI components for the generator app (see `components/AGENTS.md`) |
| `lib/` | API client, TypeScript types, and AI prompt definitions (see `lib/AGENTS.md`) |
| `templates/` | Template dashboards used for preview and deployment (see `templates/AGENTS.md`) |
| `assets/` | Static assets (react.svg) |

## For AI Agents

### Working In This Directory
- `App.tsx` is the main orchestrator: manages state for report text, metadata, generated data, loading, and tabs
- Three tabs: `input` (report text + metadata form), `preview` (live dashboard render), `deploy` (Vercel deployment)
- The `Metadata` interface defines: handle, platform (instagram/youtube), profileUrl, category (일반/뷰티/푸드), productStoreUrl, campaignPlanUrl, channelReportUrl
- Generation requires: report text > 100 chars AND handle filled
- Loading has 3 steps: data extraction → preview generation → complete
- All UI text is in Korean

### Testing Requirements
- `npm run build` to verify TypeScript compilation
- Visual testing via `npm run dev` — check all 3 tabs function correctly

### Common Patterns
- Controlled form inputs with React `useState`
- Async operations with try/catch and user-facing Korean error messages
- Tailwind CSS utility classes with custom `olive-*` color tokens
- `animate-fade-in` CSS class for tab transitions

## Dependencies

### Internal
- `components/` — UI building blocks (ReportInput, MetadataForm, LoadingState, DeployButton, PreviewFrame)
- `lib/api` — `extractReportData()` and `deployReportDashboard()` functions
- `templates/food/` — Dashboard component used in PreviewFrame

### External
- `react` — useState hooks for state management
- `lucide-react` — Sparkles, RotateCcw icons in App.tsx

<!-- MANUAL: -->
