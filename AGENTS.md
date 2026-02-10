<!-- Generated: 2026-02-10 | Updated: 2026-02-10 -->

# celeb-match-generator (Haarpeer Report Generator)

## Purpose
A Vite + React + TypeScript web application that automatically generates celebrity-product matching report dashboards. Users paste influencer matching analysis reports, the app extracts structured data via Google Gemini AI, renders an interactive preview dashboard, and deploys the result as a standalone Vercel project.

## Key Files
| File | Description |
|------|-------------|
| `package.json` | Project dependencies (React 19, Recharts, Gemini AI, Tailwind CSS v4) |
| `index.html` | Entry HTML with Korean (Pretendard) font loading |
| `vite.config.ts` | Vite config with React and Tailwind CSS plugins |
| `vercel.json` | Vercel deployment config: serverless functions for `/api/extract` (180s) and `/api/deploy` (30s) |
| `tsconfig.json` | TypeScript project references (app + node configs) |
| `eslint.config.js` | ESLint configuration |
| `.env.example` | Required env var: `GOOGLE_AI_API_KEY` |
| `.gitignore` | Git ignore rules |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `src/` | Frontend application source code (see `src/AGENTS.md`) |
| `api/` | Vercel serverless API functions (see `api/AGENTS.md`) |
| `public/` | Static assets served as-is |

## Architecture Overview

```
User pastes report text + metadata
        ↓
  [Frontend: src/App.tsx]
        ↓ POST /api/extract
  [API: api/extract.ts] → Gemini 2.5 Pro → JSON data → TypeScript code string
        ↓
  [Frontend: PreviewFrame] → parses data.ts string → renders Dashboard component
        ↓ POST /api/deploy
  [API: api/deploy.ts] → Vercel Deploy API → standalone project with template files
        ↓
  Deployed dashboard URL returned to user
```

## For AI Agents

### Working In This Directory
- This is a Korean-language application (UI labels, prompts, error messages are in Korean)
- Uses Tailwind CSS v4 with `@tailwindcss/vite` plugin (NOT PostCSS-based)
- Custom olive color palette defined in `src/index.css` via `@theme` directive
- Pretendard font family for Korean text rendering
- All API functions are Vercel serverless functions (not Express/Node server)

### Testing Requirements
- Run `npm run build` (includes `tsc -b`) to verify TypeScript compilation
- Run `npm run dev` for local development (frontend only; API functions need Vercel CLI)
- For full-stack local dev, use `vercel dev` to test serverless functions

### Environment Variables
| Variable | Purpose | Required |
|----------|---------|----------|
| `GOOGLE_AI_API_KEY` | Gemini AI for data extraction | Yes (extract endpoint) |
| `VERCEL_DEPLOY_TOKEN` | Vercel API token for auto-deploy | Yes (deploy endpoint) |
| `VERCEL_TEAM_ID` | Vercel team scope for deployment | Optional |

### Common Patterns
- Three-theme color system: `green` (olive), `blue`, `pink` used throughout
- Icon references are string names (e.g., `"CheckCircle2"`) resolved at runtime via `lucide-react`
- Data flows as TypeScript code strings (`dataTs`) containing `export const reportData = {...}`
- Deep merge with sample defaults handles missing AI-generated fields

## Dependencies

### External
- `react` 19.x, `react-dom` 19.x — UI framework
- `@google/generative-ai` — Gemini AI SDK for data extraction
- `recharts` — Radar and radial bar charts
- `lucide-react` — Icon library
- `tailwindcss` 4.x with `@tailwindcss/vite` — Styling
- `vite` 7.x — Build tool
- `typescript` 5.9.x — Type safety
- `@vercel/node` — Serverless function types

<!-- MANUAL: -->
