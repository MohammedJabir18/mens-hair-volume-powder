# Spec: System-Default Light & Dark Theme Support

Detailed design spec for implementing automatic system-preferred Light and Dark mode styles for the VALO Volume Powder storefront using CSS Custom Properties.

## Goal

Provide a premium, high-converting light mode experience that automatically loads based on the user's OS/device theme settings (`prefers-color-scheme`), while keeping the existing high-performing dark mode as the default fallback.

## User Review Required

> [!IMPORTANT]
> **No Manual Toggle Button:** The theme transitions dynamically using the browser's native system media query. No UI toggles or toggle scripts will be introduced.
> **High Contrast Accents:** To maintain compliance with WCAG readability guidelines on a light background, the accent gold color shifts from a bright gold (`#CA8A04`) in dark mode to a deeper amber-gold (`#B45309`) with white text for light mode buttons.

## Proposed Changes

### [CSS Architecture]

#### [MODIFY] [index.css](file:///C:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css)
* Add `@media (prefers-color-scheme: light)` block to re-define key theme variables.
* Migrate hardcoded colors (`#000`, dark background transparency values) in components (buttons, badges, accordions) to theme variables.
* Ensure media/video wrappers maintain a dark background (`#000`) for high-contrast presentation.

## Detailed Variable Mapping

```css
:root {
    /* Base Dark Mode Variables */
    --bg-dark: #050505;
    --bg-card: #0d0d0f;
    --bg-card-rgb: 13, 13, 15;
    --text-light: #ffffff;
    --text-muted: #a1a1aa;
    --prestige-gold: #ca8a04;
    --prestige-gold-rgb: 202, 138, 4;
    --gold-hover: #a16207;
    --gold-glow: rgba(var(--prestige-gold-rgb), 0.15);
    --border-color: #27272a;
    --btn-text: #000000;
    --badge-after-text: #000000;
    
    /* Structural tokens */
    --font-grotesque: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --font-heading: 'Outfit', system-ui, sans-serif;
    --grid-gap: 16px;
    --transition-speed: 0.3s;
    --border-radius: 12px;
    --border-radius-sm: 8px;
}

@media (prefers-color-scheme: light) {
    :root {
        /* Overrides for Light Mode (Warm Alabaster DTC) */
        --bg-dark: #faf9f6;
        --bg-card: #ffffff;
        --bg-card-rgb: 255, 255, 255;
        --text-light: #1c1917;
        --text-muted: #78716c;
        --prestige-gold: #b45309; /* High-contrast amber-gold */
        --prestige-gold-rgb: 180, 83, 9;
        --gold-hover: #9a3412;
        --gold-glow: rgba(var(--prestige-gold-rgb), 0.08);
        --border-color: #e7e5e4;
        --btn-text: #ffffff; /* White text on darker gold button */
        --badge-after-text: #ffffff;
    }
}
```

### Affected Components & Refactoring Checklist

1. **Header & Navigation:** 
   * Transition `rgba(5, 5, 5, 0.85)` background of sticky header to use `rgba(var(--bg-card-rgb), 0.85)` or equivalent dynamic opacity wrapper.
2. **Comparison Slider:**
   * Before/After badges must use variables: `.badge-before` should get background `rgba(var(--bg-card-rgb), 0.85)` and text `var(--text-light)`.
   * Drag handle should transition cleanly.
3. **Primary Action Buttons (`.btn-brutalist`):**
   * Change color to `var(--btn-text)` instead of `#000`.
4. **Ticker Track:**
   * Keep black text on gold (`color: #000` on `--prestige-gold`). Since `--prestige-gold` is `#b45309` in light mode, check contrast. If contrast is low, transition ticker text to white `#fff` in light mode:
     ```css
     @media (prefers-color-scheme: light) {
         .ticker-text {
             color: #fff;
         }
     }
     ```
5. **Accordions & Review Blocks:**
   * Ensure `faq-content` and accordion borders utilize `--border-color`.

## Verification Plan

### Manual Verification
* Inspect styling in a browser under Dark and Light settings to verify correct theme styling.
* Verify button and label contrast ratios using DevTools accessibility audit.
