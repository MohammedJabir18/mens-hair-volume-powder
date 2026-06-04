# System-Default Light/Dark Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement automatic system-preferred Light and Dark mode styling for the VALO Volume Powder storefront using CSS variables.

**Architecture:** All color tokens are centralized in `:root` inside `index.css`. A `@media (prefers-color-scheme: light)` media query redefines these variables, keeping all components (sticky nav, bundles, accordions, reviews, buttons) styled dynamically without any JavaScript changes.

**Tech Stack:** Vanilla HTML/CSS, prefers-color-scheme media query.

---

### Task 1: Update CSS Root Variables & Add Light Media Query

**Files:**
- Modify: [index.css](file:///C:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css#L4-L22)

- [ ] **Step 1: Replace root variables and add the light theme media query override block**
  Open [index.css](file:///C:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css) and replace the `:root` block (lines 4-22) with the following code to add RGB variable mappings, button text variables, and the prefers-color-scheme overrides:
  ```css
  :root {
      --bg-dark: #050505;
      --bg-card: #0d0d0f;
      --bg-card-rgb: 13, 13, 15;
      --text-light: #FFFFFF;
      --text-muted: #a1a1aa;
      --prestige-gold: #ca8a04; /* Prestige Gold Primary */
      --prestige-gold-rgb: 202, 138, 4;
      --gold-hover: #a16207;   /* Prestige Gold Hover */
      --gold-glow: rgba(var(--prestige-gold-rgb), 0.15);
      --border-color: #27272a;    /* Clean zinc border */
      --border-thick: 2px solid var(--prestige-gold);
      --border-thin: 1px solid var(--border-color);
      --font-grotesque: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-heading: 'Outfit', system-ui, sans-serif;
      --grid-gap: 16px;
      --transition-speed: 0.3s;
      --border-radius: 12px;
      --border-radius-sm: 8px;
      --btn-text: #000000;
      --badge-after-text: #000000;
  }

  @media (prefers-color-scheme: light) {
      :root {
          --bg-dark: #faf9f6;
          --bg-card: #ffffff;
          --bg-card-rgb: 255, 255, 255;
          --text-light: #1c1917;
          --text-muted: #78716c;
          --prestige-gold: #b45309; /* Darker amber-gold for accessibility */
          --prestige-gold-rgb: 180, 83, 9;
          --gold-hover: #9a3412;
          --gold-glow: rgba(var(--prestige-gold-rgb), 0.08);
          --border-color: #e7e5e4;
          --btn-text: #ffffff; /* High contrast text on dark gold button */
          --badge-after-text: #ffffff;
      }
  }
  ```

- [ ] **Step 2: Commit variables setup**
  Run:
  ```bash
  git add index.css
  git commit -m "style: define variables and light mode media query overrides"
  ```

---

### Task 2: Refactor Navigation Header and Button Text Colors

**Files:**
- Modify: [index.css](file:///C:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css)

- [ ] **Step 1: Update navigation header to use dynamic card background with transparency**
  Find the `.tech-header` rule in `index.css` (around line 109) and replace it to use `--bg-card-rgb` instead of the hardcoded `#050505`:
  ```css
  .tech-header {
      border-bottom: var(--border-thin);
      background-color: rgba(var(--bg-card-rgb), 0.85);
      backdrop-filter: blur(12px);
      padding: 16px 0;
      position: sticky;
      top: 0;
      z-index: 100;
  }
  ```

- [ ] **Step 2: Update primary brutalist action button text color**
  Find `.btn-brutalist` in `index.css` (around line 61) and update the text `color` rule to use `var(--btn-text)`:
  ```css
  .btn-brutalist {
      background-color: var(--prestige-gold);
      color: var(--btn-text);
      padding: 16px 24px;
      font-family: var(--font-heading);
      font-weight: 900;
      font-size: 14px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      border-radius: var(--border-radius-sm);
      transition: all var(--transition-speed) ease;
      box-shadow: 0 4px 16px rgba(var(--prestige-gold-rgb), 0.25);
  }
  ```

- [ ] **Step 3: Update navigation buy button text color**
  Find `.btn-nav-buy` in `index.css` (around line 159) and update the text `color` rule to use `var(--btn-text)`:
  ```css
  .btn-nav-buy {
      padding: 8px 16px;
      font-size: 11px;
      border: 1px solid var(--prestige-gold);
      border-radius: var(--border-radius-sm);
      background-color: var(--prestige-gold);
      color: var(--btn-text);
      font-family: var(--font-heading);
      font-weight: 700;
      cursor: pointer;
      transition: all var(--transition-speed) ease;
  }
  ```

- [ ] **Step 4: Commit header and button updates**
  Run:
  ```bash
  git add index.css
  git commit -m "style: refactor sticky header background and checkout buttons to use theme variables"
  ```

---

### Task 3: Refactor Comparison Slider Badges and Ticker Track Text Contrast

**Files:**
- Modify: [index.css](file:///C:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css)

- [ ] **Step 1: Update comparison slider badges**
  Find the `.badge-before` and `.badge-after` rules in `index.css` (around line 319) and update them:
  ```css
  .badge-before {
      left: 12px;
      background: rgba(var(--bg-card-rgb), 0.85);
      color: var(--text-light);
      border-color: var(--border-color);
  }

  .badge-after {
      right: 12px;
      background: rgba(var(--prestige-gold-rgb), 0.9);
      color: var(--badge-after-text);
      border-color: var(--prestige-gold);
      box-shadow: 0 4px 12px var(--gold-glow);
  }
  ```

- [ ] **Step 2: Update ticker text color to maintain contrast**
  Find `.ticker-text` in `index.css` (around line 196) and update the `color` rule to use `var(--btn-text)`:
  ```css
  .ticker-text {
      flex-shrink: 0;
      font-family: var(--font-heading);
      font-size: 10px;
      font-weight: 700;
      color: var(--btn-text);
      letter-spacing: 0.05em;
  }
  ```

- [ ] **Step 3: Commit slider and ticker updates**
  Run:
  ```bash
  git add index.css
  git commit -m "style: refactor comparison badges and ticker text colors for light mode accessibility"
  ```

---

### Task 4: Verify Styling in Light and Dark Modes

- [ ] **Step 1: Test Light Mode styling in browser**
  Emulate light mode in Chrome/browser developer tools (Rendering > Emulate CSS media feature prefers-color-scheme: light) or toggle system preferences to light mode.
  Verify:
  - Background is warm cream `#faf9f6`.
  - Text is stone-900 `#1c1917` and readable.
  - Primary button is dark gold `#b45309` with white text.
  - Sticky nav header is opaque warm cream.
  - Review cards and accordions have light grey borders and white backgrounds.
  - Media showcase and comparison slider letterboxes remain black.

- [ ] **Step 2: Test Dark Mode styling in browser**
  Switch preferences back to dark mode.
  Verify:
  - Theme restores correctly to the original prestige dark gold layout.
