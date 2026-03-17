---
name: impeccable-design
description: Canonical visual reference for this project; use it before any UI or UX decision to align typography, color, layout, motion, and UX writing with our non-negotiable dos and don'ts.
---

# Impeccable Design Reference

Use this skill as the single source of truth for every visual or interaction decision. Load it first when the user asks for anything that touches aesthetics, UX writing, layout, or motion.

## 1. Required Workflow
1. **Check live context**
   - If instructions already include a `## Design Context` section, reference it immediately.
   - Otherwise read `.impeccable.md` in the repo root. If it is missing or stale, run `teach-impeccable` before proceeding.
   - Mirror any updates back into `.impeccable.md` at the end of the task.
2. **Classify the task**
   - *Net-new artifact*: run `/frontend-design` after absorbing this skill.
   - *Quality lift / polish*: pair this skill with `/polish`, `/bolder`, `/quieter`, or `/delight` depending on intensity changes needed.
   - *System enforcement*: pair with `/normalize`, `/audit`, or `/extract`.
3. **Plan**
   - Write a quick creative brief (audience, problem, promise, memorable hook) before touching code.
   - Choose the direction (Section 2) and guardrails (Sections 3-6) intentionally. Document chosen direction inside your working notes or PR description.
4. **Ship + log**
   - When you finish, append a `### Decisions` bullet list to `.impeccable.md` or project docs summarizing what changed and why.

## 2. Design DNA (default when user gives no overrides)
- **Audience**: time-strapped pros who expect productivity tools to feel premium and editorial.
- **Brand personality**: *Precise / Expressive / Self-assured*. Every screen should feel curated, not templated.
- **Hero emotion**: calm confidence. Create tension via scale and whitespace rather than neon gimmicks.
- **Differentiator**: asymmetry, tinted neutrals, and one bold accent per screen. Empty space is a feature, not waste.
- **Grid bias**: asymmetric column layouts (3/2 + 2/1 splits) with intentional negative space.
- **Component vibe**: layered typography, razor-thin rules, subtle grain/noise backgrounds, cold-warm color interplay.
- **Accessibility contract**: WCAG AA minimum; treat AAA as default for text contrast and focus indicators.

> Update these bullet points whenever product leadership redefines the brand. They must always match `.impeccable.md`.

## 3. Canonical Dos & Don'ts
| Topical Area | DO | DON'T |
| --- | --- | --- |
| **Color** | Build palettes in OKLCH, tint neutrals toward the brand hue, reserve accent color for the single most important action, keep semantic colors consistent. | Never use pure gray/black/white, never combine gray text on colored backgrounds, avoid cyan-purple "AI" gradients, skip glassmorphism and random neon glows. |
| **Typography** | Use a two-font system max: expressive display (Fraunces/Newsreader) + modern sans (Plus Jakarta Sans/Instrument Sans). Apply a modular scale (1:1.333). Clamp hero text. Enable tabular nums for data and `font-display: swap`. | Do not reach for Inter/Roboto/Open Sans; avoid more than 5 size steps; never rely on placeholder text as labels; do not ship FOIT/FOUT. |
| **Layout & Space** | Drive rhythm with a 4pt spacing scale, heavy asymmetry, and clamp-based spacing. Let important sections bleed edge-to-edge. Use container queries for component responsiveness. | Don't center everything, don't nest cards inside cards, don't stack identical card grids, don't mix arbitrary spacing values. |
| **Motion** | Use ease-out-quart/quint/expo, animate only transform/opacity, choreograph one hero motion plus purposeful micro-interactions, honor `prefers-reduced-motion`. | No bounce/elastic easings, no layout property animations, no decorative-only motion, no blocking animations longer than 500 ms. |
| **Interaction** | Provide full state sets (default/hover/focus/active/disabled/loading/error/success). Use `:focus-visible` with 2px offset rings. Implement optimistic UI where safe. | Never `outline: none` without replacement, never hide essential actions behind hover-only affordances, never rely solely on gesture interactions. |
| **Copy & Tone** | Write concise, confident UX copy. Buttons = verb + object. Errors explain what happened + how to fix. Empty states teach and invite. Loading text is product-specific. | No "Click here/Submit/OK", no generic "Something went wrong", no filler loading jokes ("herding pixels"), no redundant header+intro pairs. |

## 4. Direction Selector
Choose a direction per artifact, document it, and stick to it. Examples:
- **Editorial Minimalism** (default): tinted off-white canvas, razor-thin dividers, high-contrast type, one accent block.
- **Industrial Luxe**: charcoal base, desaturated metal gradients, luminous serif headlines, glassless depth via layered shadows.
- **Playful Precision** (use sparingly): sorbet neutrals, micro-illustrations, kinetic hover reveals.

When in doubt, fall back to Editorial Minimalism. Never mix multiple directions on the same screen.

## 5. Color System Implementation
1. Derive primitives in `tokens/colors.(ts|json)` using OKLCH values. Example:
   ```ts
   export const brand = {
     base: 'oklch(62% 0.15 20)',
     dim: 'oklch(48% 0.12 20)',
     tint: 'oklch(88% 0.06 20)'
   };
   ```
2. Map semantic tokens (`--color-primary`, `--surface-1`, etc.) per theme layer; never reference primitives directly in components.
3. Use `color-mix()` or `oklch()` adjustments for hover/active states instead of opaque hex math.
4. Provide dark-theme overrides that lighten surfaces for elevation (lighter = higher) and reduce chroma slightly.

## 6. Typography & Copy Framework
- Base body: 16px/1.6 `clamp(1rem, 0.9rem + 0.5vw, 1.125rem)`.
- Heading scale: `h1 clamp(2.5rem, 1rem + 5vw, 4.5rem)`, `h2 clamp(1.75rem, 0.5rem + 2.5vw, 3rem)`, `h3 1.5rem`, `h4 1.25rem`.
- Use `font-variant-numeric: tabular-nums lining-nums` for data, `font-variant-ligatures: none` inside code snippets.
- Never exceed two weights per block. Combine weight + color + space for hierarchy.
- Narrative voice: confident, editorial, never cutesy. Prefer short declarative sentences.

## 7. Interaction & States Checklist
For every interactive element ensure:
- Hit area >= 44px (use pseudo-elements if visual size is smaller).
- Focus management for modals/menus uses `<dialog>` or `inert` strategy.
- All forms validate on blur + submit, with inline help and recovery suggestions.
- Empty/loading/error/success states are designed for each data source before handoff.
- Drag/drop, copy, multi-select interactions provide immediate visual + textual feedback.

## 8. Anti-Pattern Blacklist
Reject work immediately if you see any of these. Replace them with guidance above.
- Cyan/purple gradient hero backgrounds, AI glow cards, neumorphic glassmorphism, large rounded cards with thick side borders.
- Generic hero metric layouts (big number, "up 12%" chip, repeated cards).
- Identical 3-up card grids containing icon + heading + text without differentiation.
- Default fonts (Inter/Roboto) or system defaults paired with neon palettes.
- Placeholder-only form labels, `outline: none`, or missing focus states.
- Loading text such as "spinning up clouds", "counting backwards from infinity", etc.

## 9. Maintenance Rules
- Update this skill + `.impeccable.md` whenever direction shifts. Keep sections short (<120 words each) to minimize context cost.
- Reference deeper technique details from `frontend-design/reference/*.md` files as needed; load only the relevant file (typography, color, spatial, motion, interaction, responsive, ux-writing).
- If new reusable artifacts (token sets, templates, scripts) emerge, store them under `impeccable-design/references/` and link them here.
- Run `scripts/quick_validate.py .codex/skills/impeccable-design` after edits.

Impeccable work means intentional decisions, ruthless avoidance of AI slop, and documentation of every choice. Treat this skill as law.

