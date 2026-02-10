<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-10 | Updated: 2026-02-10 -->

# prompts

## Purpose
AI prompt definitions for the Gemini data extraction pipeline. Contains system prompts and prompt builder functions that instruct Gemini 2.5 Pro to extract structured JSON from influencer matching reports.

## Key Files
| File | Description |
|------|-------------|
| `food-extract.ts` | System prompt + prompt builder for food category reports — defines the complete data schema (6 keys), extraction rules, icon names, theme color assignment, text length guidelines, and keyword highlighting rules |

## For AI Agents

### Working In This Directory
- `FOOD_EXTRACT_SYSTEM_PROMPT` is a comprehensive Korean-language system prompt that strictly constrains Gemini to output JSON only (no UI code, no explanations)
- `buildFoodExtractPrompt()` constructs the user message with profile metadata and report text
- `MetadataInput` interface mirrors the metadata shape from `../types.ts`

### Data Schema (6 output keys)
1. `celebData` — Celebrity profile (name, handle, platform, category, tagline, identity[3], dna[5])
2. `matchScore` — Match score and summary
3. `productDefinition` — Product definition (headline, highlight, description, quote, keyConcepts[3])
4. `matchPoints` — Core (3 fixed, isCore:true) + Sub (N flexible, isCore:false) match points
5. `strategicPillars` — Exactly 3 pillars with theme: green/blue/pink in order
6. `contentIdeas` — N ideas with theme cycling: green→blue→pink→green→...

### Critical Rules
- AI must NOT generate `externalLinks` (added programmatically by `api/extract.ts`)
- AI must NOT generate UI code, App.tsx, or any TypeScript — JSON only
- Icons are referenced by string name (e.g., `"CheckCircle2"`) from a fixed allowed list
- DNA labels are fixed: 논리적 설득, 문제 해결, 팬덤 신뢰, 정보성, 심미성
- Keyword highlighting uses single quotes (`'keyword'`) in text fields

### Testing Requirements
- Changes to the prompt directly affect AI output quality
- Test with actual matching reports to verify extraction accuracy
- Verify schema changes are reflected in `../types.ts` and `../../templates/food/types.ts`

### Common Patterns
- System prompt uses strict "do/don't" format with emoji markers for emphasis
- Includes a detailed section-to-output mapping guide (보고서 섹션 → 출력 데이터)
- Text length recommendations ensure dashboard readability

## Dependencies

### Internal
- Used by `../../../api/extract.ts` — imported for Gemini API call
- Schema must align with `../../templates/food/types.ts` type definitions

### External
- None (pure prompt text, no runtime dependencies)

<!-- MANUAL: -->
