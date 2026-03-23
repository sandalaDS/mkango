# M'kango Golfview Hotel - Design System

This document outlines the core design tokens and stylistic principles used throughout the application. When redesigning the Home Page or creating new components, adhere strictly to these variables to maintain brand consistency.

## 1. Color Palette

The color scheme is designed to evoke a premium, nature-inspired hospitality experience. All colors are defined in `app/globals.css` and exposed directly to Tailwind v4 via `@theme inline`.

| Token | Hex Value | Usage |
|---|---|---|
| `--color-canvas` | `#f8f4ee` | Primary background color (warm off-white). |
| `--color-ink` | `#0b1813` | Primary text color. |
| `--color-emerald-deep`| `#0f3d2e` | Primary brand color, dark backgrounds, high contrast buttons. |
| `--color-emerald-dark`| `#1e5a46` | Secondary brand color, hover states, UI elements. |
| `--color-fern` | `#4e8a64` | Tertiary green, lighter accents or success states. |
| `--color-gold` | `#c8a96a` | Accent color, used for highlighting luxury or call-to-actions. |
| `--color-mist` | `#e2dbcf` | Subtle gray/beige used for borders or muted backgrounds. |

*Note: The application explicitly specifies `color-scheme: only light`.*

## 2. Typography

Two primary font families are utilized. They are available via Tailwind as `font-sans` and `font-display`.

### Primary Sans-Serif (`font-sans`)
* **Stack**: `"Plus Jakarta Sans", "Segoe UI", "Helvetica Neue", system-ui, sans-serif`
* **Usage**: Body copy, UI components, buttons, small metadata.
* **Line Height**: `1.6` for general body text.

### Display Serif (`font-display`)
* **Stack**: `"Playfair Display", "Fraunces", serif`
* **Usage**: Headings (`<h1>` through `<h4>`).
* **Attributes**: Features a tight letter-spacing of `-0.015em`.

## 3. Shadows & Depth

The design relies on soft, colored glow shadows rather than harsh drop-shadows.

*   **`.card-glow`**: `0 25px 70px rgba(12, 41, 32, 0.15)`
    *   *Usage*: Used to elevate major content cards with a subtle dark-green tinted shadow.
*   **`.whatsapp-shadow`**: `0 20px 70px rgba(30, 90, 70, 0.25)`
    *   *Usage*: Used for floating widgets or highly active CTA elements.

## 4. Layout & Spacing Defaults
*   **Container Widths**: Maximum component constraints typically sit at `max-w-7xl` with inner padding.
*   **Border Radius**: The system favors soft edges. 
    *   Use `--radius-pill` (`999px`) for full-rounded buttons or tags.
    *   Typical Next.js UI rounded values (`rounded-xl` or `rounded-2xl`) apply for cards.

## 5. Micro-Interactions & Details
*   **Scroll Indicator**: A custom CSS animation (`scrollPulse`) is available for a vertical line indicator below the hero section.
*   **Text Selection**: Employs a custom color mix (`color-mix(in oklch, var(--color-emerald-dark) 70%, white)`) for highlighted text.
*   **Background Patterns**: The `.golf-grid` class provides a subtle, luxury radial gradient dot pattern (used in specific prominent sections).

---
*Note for AI Agents: Tailwind v4 implicitly loads these CSS variables. You can utilize classes like `bg-canvas`, `text-ink`, or `bg-emerald-deep` natively without a `tailwind.config.ts` file.*
