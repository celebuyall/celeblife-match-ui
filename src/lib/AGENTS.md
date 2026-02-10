<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-10 | Updated: 2026-02-10 -->

# lib

## Purpose
Core library modules: API client for backend communication, shared TypeScript type definitions, and AI prompt templates for the Gemini data extraction pipeline.

## Key Files
| File | Description |
|------|-------------|
| `api.ts` | HTTP client with `extractReportData()` and `deployReportDashboard()` — includes timeout, retry with exponential backoff, and custom `ApiError` class |
| `types.ts` | Shared TypeScript interfaces: `ExtractRequest`, `ExtractResponse`, `DeployRequest`, `DeployResponse`, `Platform`, `Category` |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `prompts/` | AI prompt definitions for data extraction (see `prompts/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `api.ts` auto-detects environment: production uses `/api`, development uses `http://localhost:3000/api`
- Request timeout: 180s for extract (Gemini can be slow), 120s for deploy
- Max 1 retry with exponential backoff (1s, 2s) for retryable errors (server 5xx, network failures)
- `ApiError` class tracks `statusCode` and `isRetryable` for retry logic
- On final failure, returns `{ success: false, error: string }` instead of throwing
- Korean error messages for user-facing errors

### Type Definitions
- `ExtractRequest`: `{ reportText: string, metadata: { handle, platform, profileUrl, category, productStoreUrl, campaignPlanUrl, channelReportUrl } }`
- `ExtractResponse`: `{ success: boolean, dataTs?: string, error?: string }`
- `DeployRequest`: `{ dataTs: string, metadata: {...} }`
- `DeployResponse`: `{ success: boolean, deploymentUrl?: string, projectName?: string, error?: string }`

### Testing Requirements
- Types are shared between frontend and conceptually mirrored in API handlers
- Changes to type interfaces must be reflected in both `api.ts` usage and `api/extract.ts` / `api/deploy.ts` handlers

### Common Patterns
- `fetchWithTimeout()` wraps native fetch with `AbortController`
- Error handling returns error responses instead of throwing (graceful degradation)
- All functions are async and return typed response objects

## Dependencies

### Internal
- Used by `../components/DeployButton.tsx`, `../App.tsx`

### External
- Native `fetch` API (no HTTP library)

<!-- MANUAL: -->
