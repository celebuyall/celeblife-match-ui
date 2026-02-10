<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-10 | Updated: 2026-02-10 -->

# components

## Purpose
Shared sub-components for the food dashboard template. Provides a barrel re-export of lucide-react icons (enabling string-based icon resolution at runtime) and the Celebfood SVG logo.

## Key Files
| File | Description |
|------|-------------|
| `Icons.tsx` | Barrel import/re-export of ~35 lucide-react icons — enables `App.tsx` to resolve icon string names (e.g., `"CheckCircle2"`) to React components via `Icons[name]` lookup |
| `Logo.tsx` | SVG logo component rendering "Celebfood" text in Caviar Dreams font with olive color (#7c7d35), accepts optional `className` prop |

## For AI Agents

### Working In This Directory
- `Icons.tsx` is purely a re-export file — it imports specific icons from `lucide-react` and re-exports them by name
- When new icons are needed in the dashboard, add them to both the import and export blocks in `Icons.tsx`
- The allowed icon names in `Icons.tsx` must match the list in `src/lib/prompts/food-extract.ts` system prompt
- `Logo.tsx` uses inline SVG with `<text>` element — depends on Caviar Dreams font loaded via CDN in the deployed HTML

### Icon List (current)
CheckCircle2, Target, Zap, Search, Lightbulb, BarChart3, User, Instagram, Youtube, ArrowRight, TrendingUp, Brain, Layers, Quote, Sparkles, Link, MessageCircle, Puzzle, Microscope, ArrowRightLeft, ChevronRight, Maximize2, Fingerprint, HeartHandshake, Scale, Film, BookOpen, Calendar, RefreshCw, MousePointerClick, ArrowDown, PlayCircle, Clapperboard, ShoppingBag, FileSpreadsheet, LayoutDashboard

### Testing Requirements
- Adding/removing icons: verify the Gemini prompt's allowed icon list stays in sync
- Logo: verify Caviar Dreams font renders correctly (requires CDN font link in HTML)

### Common Patterns
- Barrel export pattern: import from external lib, re-export for internal use
- This pattern exists because deployed standalone projects need a single import source that can be bundled

## Dependencies

### Internal
- Used by `../App.tsx` — both named imports and `* as Icons` namespace import

### External
- `lucide-react` — Source icon library

<!-- MANUAL: -->
