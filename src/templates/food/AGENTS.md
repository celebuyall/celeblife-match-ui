<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-10 | Updated: 2026-02-10 -->

# food

## Purpose
Self-contained food influencer matching report dashboard template. Renders a rich, interactive dashboard with celebrity profile, match scoring, product analysis, strategic pillars, and content strategy sections. Used both as an in-app preview component and as the source for standalone Vercel deployments.

## Key Files
| File | Description |
|------|-------------|
| `App.tsx` | Main dashboard component (~750 lines) — 5 sections: celeb profile hero, match score & key points, product deep dive, strategic fit (interactive tabs), content strategy (tabbed timeline) |
| `data.ts` | Sample/default data conforming to all type interfaces — used as fallback defaults when AI-generated data has missing fields |
| `types.ts` | TypeScript interfaces: `CelebProfile`, `MatchPoint`, `ContentIdea`, `StrategicPillar`, `MatchScore`, `KeyConcept`, `ProductDefinition`, `ExternalLink` |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `components/` | Shared sub-components for the dashboard (see `components/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `App.tsx` accepts optional `overrideData` prop — when provided (preview mode), uses it instead of imported `data.ts`
- The component is designed to be deployed standalone: all imports are relative within this directory
- `getIcon()` helper resolves string icon names to React components via the `Icons` barrel export
- `highlightKeywords()` converts `'quoted text'` into styled `<strong>` elements with theme-colored classes
- Five dashboard sections render in order: Profile Hero → Match Score + Key Points → Product Definition (dark bg) → Strategic Pillars (interactive) → Content Strategy (tabbed)

### Dashboard Sections
1. **Celeb Profile Hero** — Avatar placeholder, identity tags, tagline quote, DNA radar chart (Recharts)
2. **Match Score & Key Points** — Radial bar gauge (0-100), checklist of core (olive) + sub (indigo) match points
3. **Product Deep Dive** — Dark slate background, headline with gradient highlight, quote card, 3 key concepts grid
4. **Strategic Fit** — 3 interactive pill tabs (green/blue/pink themes), split context/solution layout
5. **Content Strategy** — Tab navigation per content idea, timeline flow, rationale vs synergy grid

### Styling Conventions
- Three-theme system: `green` (olive-*), `blue` (blue-*/indigo-*), `pink` (pink-*/rose-*)
- Large border-radius: `rounded-[2rem]`, `rounded-[2.5rem]` for cards
- Decorative blurred gradient overlays for visual depth
- `break-keep` and `textWrap: 'balance'` for Korean text wrapping
- Sticky header with backdrop blur

### Type Interfaces (types.ts)
- `CelebProfile`: name, handle, platform, profileUrl, category, tagline, identity[], dna[]
- `MatchPoint`: id, feature, connection, title, logic, isCore
- `ContentIdea`: id, title, subTitle, tags[], concept, flow[], rationale, synergy, theme
- `StrategicPillar`: id, tabTitle, icon, title, subtitle, context{}, bridge?, solution{}, theme
- `MatchScore`: score, summary
- `ProductDefinition`: headline, highlight, description, quote, keyConcepts[]
- `ExternalLink`: label, url, icon, color

### Testing Requirements
- Visual testing required — complex interactive UI with hover states, transitions, and responsive layout
- Test with various data shapes: full data, minimal data, edge cases (empty arrays, long text)
- Verify chart rendering (Recharts RadarChart, RadialBarChart)
- Test responsive behavior at mobile, tablet, and desktop breakpoints

### Common Patterns
- Interactive state via `useState` for `activePillarIndex` and `activeContentIndex`
- Theme-conditional Tailwind classes using ternary chains
- `useMemo` for date formatting (computed once)
- External links rendered in header from `externalLinks` array

## Dependencies

### Internal
- `components/Icons` — Barrel re-export of lucide-react icons (used for string-to-component resolution)
- `components/Logo` — SVG logo component (Celebfood brand)
- `data.ts` — Default sample data (fallback)
- `types.ts` — All data type interfaces

### External
- `react` — useState, useMemo
- `recharts` — RadarChart, RadialBarChart, ResponsiveContainer
- `lucide-react` (via `components/Icons`) — ~35 icons used throughout

<!-- MANUAL: -->
