<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-10 | Updated: 2026-02-10 -->

# components

## Purpose
Reusable React UI components for the Haarpeer Report Generator application. Each component handles a specific section of the three-tab workflow: report input, metadata form, loading progress, dashboard preview, and deployment.

## Key Files
| File | Description |
|------|-------------|
| `ReportInput.tsx` | Textarea for pasting matching report text — clipboard paste button, clear button, character counter |
| `MetadataForm.tsx` | Two-section form: basic info (handle, platform, profileUrl, category) and external links (productStoreUrl, campaignPlanUrl, channelReportUrl) |
| `LoadingState.tsx` | Three-step progress indicator with spinner animation — data extraction → preview generation → complete |
| `PreviewFrame.tsx` | Parses generated `dataTs` code string, deep-merges with sample defaults, renders the food Dashboard component with error boundary |
| `DeployButton.tsx` | Vercel deployment trigger with status states (idle/deploying/success/error), fallback copy-to-clipboard, and code preview |

## For AI Agents

### Working In This Directory
- Each component is a single file with its own props interface defined inline
- Components use `lucide-react` icons directly (not the template Icons barrel export)
- `PreviewFrame.tsx` is the most complex: parses TypeScript code strings using regex + `new Function()`, deep-merges with sample data defaults, and includes a class-based `DashboardErrorBoundary`
- `DeployButton.tsx` manages its own async deployment state (not lifted to App.tsx)
- All user-facing text is in Korean
- Tailwind CSS classes with custom `olive-*` tokens for brand colors

### Key Implementation Details
- `PreviewFrame.parseDashboardData()`: extracts object literal from `export const reportData = {...};` using regex, evaluates with `new Function()`, then deep-merges with `sampleData` from `templates/food/data.ts`
- `deepMergeDefaults()`: recursively merges, preferring source values over defaults; arrays are replaced entirely if source has items
- `MetadataForm` uses controlled inputs with a generic `handleChange` function keyed by field name
- `LoadingState` uses a `LoadingStep` type union (1 | 2 | 3) — not arbitrary numbers

### Testing Requirements
- Visual testing via `npm run dev`
- `PreviewFrame` is fragile to data format changes — test with both valid and malformed `dataTs` strings
- Verify error boundary catches render crashes in Dashboard component

### Common Patterns
- Props interfaces defined above component, inline in each file
- Default exports for `ReportInput` and `DeployButton`, named exports for others
- Conditional CSS classes using template literals with ternary operators
- State management via local `useState` (no global state)

## Dependencies

### Internal
- `../lib/api` — `extractReportData`, `deployReportDashboard` (used by DeployButton)
- `../templates/food/App` — Dashboard component (used by PreviewFrame)
- `../templates/food/data` — `reportData` sample data for deep-merge defaults (used by PreviewFrame)

### External
- `react` — useState, useMemo, Component (for error boundary)
- `lucide-react` — Various icons per component

<!-- MANUAL: -->
