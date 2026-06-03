# Hero Tab Noticeability Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the visual noticeability and interactive styling of the hero media control tabs.

**Architecture:** Utilize CSS transitions, keyframes, and pseudo-elements (like `::after`) on `.control-tab` and `.control-tab.active` to create premium high-contrast noticeability cues.

**Tech Stack:** Vanilla CSS, HTML5

---

### Task 1: CSS Styling Updates for Switcher Tabs

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css`

- [ ] **Step 1: Add animations and styles to index.css**
  Append the following CSS rules to the bottom of the file `index.css`:

  ```css
  /* ==========================================
     HERO DECK SWITCHER NOTICEABILITY
     ========================================== */
  
  @keyframes active-tab-pulse {
      0% { background-color: rgba(225, 29, 72, 0.1); }
      50% { background-color: rgba(225, 29, 72, 0.25); }
      100% { background-color: rgba(225, 29, 72, 0.1); }
  }

  @keyframes cursor-blink {
      from, to { opacity: 0; }
      50% { opacity: 1; }
  }

  .control-tab {
      position: relative;
      cursor: pointer !important;
      transition: background var(--transition-speed) ease, color var(--transition-speed) ease, border-color var(--transition-speed) ease, transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .control-tab:hover {
      color: var(--text-light);
      background: rgba(255, 255, 255, 0.05);
      border-color: #555555;
      transform: scale(1.02);
  }

  .control-tab.active {
      color: var(--text-light);
      animation: active-tab-pulse 2s infinite ease-in-out;
      box-shadow: inset 0 0 10px rgba(225, 29, 72, 0.2);
      border-bottom-color: var(--electric-crimson);
  }

  .control-tab.active .tab-index::after {
      content: " • ACTIVE";
      font-size: 7px;
      letter-spacing: 0.05em;
      color: var(--electric-crimson);
  }

  .control-tab.active .tab-label::after {
      content: "_";
      color: var(--text-light);
      animation: cursor-blink 0.8s step-end infinite;
  }
  ```

- [ ] **Step 2: Commit CSS changes**
  Run: `git commit -am "feat: improve hero media tabs noticeability with hover, pulse and blink effects"`
  Expected: Commit completes successfully.

### Task 2: Verify Visual Elements

**Files:**
- Manual verification of the browser view.

- [ ] **Step 1: Check tabs design on browser**
  Inspect the page `http://localhost:52341` or your locally deployed page and verify:
  1. Hovering over a tab scales it to `1.02`, highlights the border, and adds a dark white background overlay.
  2. The active tab has a breathing crimson pulse background (`active-tab-pulse`).
  3. The active tab shows `• ACTIVE` next to the number (e.g. `[ 01 • ACTIVE ]`).
  4. The active tab label has a blinking `_` terminal cursor.
