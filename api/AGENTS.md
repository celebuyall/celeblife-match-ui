<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-10 | Updated: 2026-02-10 -->

# api

## Purpose
Vercel serverless API functions that power the backend. Two endpoints: `/api/extract` uses Google Gemini AI to extract structured data from matching reports, and `/api/deploy` deploys generated dashboards as standalone Vercel projects via the Vercel Deploy API.

## Key Files
| File | Description |
|------|-------------|
| `extract.ts` | POST `/api/extract` — Sends report text + metadata to Gemini 2.5 Pro, returns structured `dataTs` code string |
| `deploy.ts` | POST `/api/deploy` — Creates a standalone Vercel project with template files + generated data, returns deployment URL |
| `template-files.ts` | Helper module — provides template file contents (package.json, vite config, tsconfig, HTML, CSS, main.tsx) and `readTemplateFile()` for reading food template source files |

## For AI Agents

### Working In This Directory
- These are Vercel serverless functions (not Express routes) — each file exports a `default` handler function
- All handlers include CORS headers and OPTIONS preflight handling
- `extract.ts` uses `@google/generative-ai` SDK with `responseMimeType: 'application/json'` for structured output
- `extract.ts` builds `externalLinks` programmatically from metadata (not from AI output) and merges with AI data
- `deploy.ts` uses Vercel Deploy API v13 (`POST /v13/deployments`) with file-based deployment
- `template-files.ts` reads from `src/templates/food/` at runtime using `fs.readFileSync`
- Project naming convention: `celebfood-report-{sanitized-handle}`

### Data Flow
```
extract.ts:
  Input: { reportText: string, metadata: {...} }
  → Gemini 2.5 Pro (system prompt from food-extract.ts)
  → JSON response parsed
  → externalLinks added from metadata
  → Output: { success: true, dataTs: "import type {...}\nexport const reportData = {...}" }

deploy.ts:
  Input: { dataTs: string, metadata: {...} }
  → Reads template files (App.tsx, types.ts, Icons.tsx, Logo.tsx from src/templates/food/)
  → Combines with generated templates (package.json, vite.config, tsconfig, etc.)
  → POST to Vercel Deploy API
  → Output: { success: true, deploymentUrl: "https://...", projectName: "..." }
```

### Testing Requirements
- Cannot test locally with `npm run dev` (Vite dev server only)
- Use `vercel dev` for local serverless function testing
- Requires `GOOGLE_AI_API_KEY` env var for extract endpoint
- Requires `VERCEL_DEPLOY_TOKEN` env var for deploy endpoint

### Security Notes
- `extract.ts` validates all required metadata fields before processing
- `deploy.ts` sanitizes handle input: strips `@`, removes special chars, lowercases, truncates to 50 chars
- CORS is set to `*` (open) — appropriate for a tool-type application
- API keys are read from `process.env` (not exposed to client)

### Common Patterns
- Error responses follow `{ success: false, error: string }` format
- Korean error messages for user-facing errors, English for technical errors
- Request validation happens before any API calls
- Both endpoints support retry with exponential backoff on the client side

## Dependencies

### Internal
- `../src/lib/prompts/food-extract` — System prompt and prompt builder for Gemini
- `../src/templates/food/` — Template source files read at deploy time

### External
- `@google/generative-ai` — Gemini AI SDK (extract.ts)
- `@vercel/node` — VercelRequest/VercelResponse types
- `fs`, `path`, `url` — Node.js built-ins for file reading (template-files.ts)

<!-- MANUAL: -->
