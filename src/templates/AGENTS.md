<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-10 | Updated: 2026-02-10 -->

# templates

## Purpose
Container directory for template dashboards. Each subdirectory is a self-contained dashboard template that serves dual purpose: (1) rendered in-app as a live preview via `PreviewFrame`, and (2) deployed as a standalone Vercel project via the deploy API.

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `food/` | Food influencer matching report dashboard template (see `food/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- Template files are read at runtime by `api/template-files.ts` using `fs.readFileSync`
- Templates must be self-contained: they cannot import from outside their directory (when deployed standalone)
- Adding a new template category requires: new subdirectory, updating `api/deploy.ts` to read correct template, adding category to metadata options
- Currently only `food/` template exists; the architecture supports future templates for other categories (뷰티, 일반)

### Common Patterns
- Each template has: `App.tsx` (main dashboard), `data.ts` (sample/default data), `types.ts` (data interfaces), `components/` (shared sub-components)
- Templates use the same tech stack as the parent app (React, Tailwind CSS v4, Recharts, lucide-react)
- Data is injected via `overrideData` prop or imported from `data.ts`

<!-- MANUAL: -->
