# Hero Tab Segmented Brutalist Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify hero switcher controls layout to segmented brutalist buttons with a canvas gap.

**Architecture:** Update in-place `.theater-controls`, `.control-tab`, `.control-tab:hover`, and `.control-tab.active` rules in `index.css` to implement independent spaced card tabs, hover scaling, and active 3D lifting styling. Clean up previously appended noticeability overrides at the end of the file.

**Tech Stack:** Vanilla CSS

---

### Task 1: CSS Layout Updates

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css`

- [ ] **Step 1: Clean up appended rules at the end of index.css**
  Remove lines 1852 to 1901 (the entire block of noticeability styling that starts with `/* ========================================== HERO DECK SWITCHER NOTICEABILITY ... */`).

- [ ] **Step 2: Update in-place CSS rules in index.css**
  Find the existing `.theater-controls` block (around lines 554-561) and update it to:
  ```css
  .theater-controls {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px; /* Spacing gap between buttons */
      margin-top: 16px; /* Gap from the canvas wrapper */
      margin-bottom: 24px;
  }
  ```

- [ ] **Step 3: Update .control-tab base styles**
  Find the existing `.control-tab` block (around lines 563-577) and update it to:
  ```css
  .control-tab {
      background: var(--bg-card);
      border: var(--border-thin) !important; /* Full border on all sides */
      color: var(--text-muted);
      font-family: var(--font-mono);
      padding: 8px 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: background var(--transition-speed) ease, color var(--transition-speed) ease, border-color var(--transition-speed) ease, transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  ```

- [ ] **Step 4: Update .control-tab hover and active styles**
  Find `.control-tab:last-child`, `.control-tab:hover`, and `.control-tab.active` (around lines 579-593) and update them to:
  ```css
  .control-tab:last-child {
      border-right: var(--border-thin); /* Keep standard thin border */
  }

  .control-tab:hover {
      color: var(--text-light);
      border-color: var(--text-light);
      transform: scale(1.02);
  }

  .control-tab.active {
      color: var(--text-light);
      background: var(--electric-crimson);
      border-color: var(--text-light);
      box-shadow: 3px 3px 0px var(--text-light);
      transform: translate(-3px, -3px);
  }
  ```

- [ ] **Step 5: Commit changes**
  Run: `git commit -am "feat: implement segmented brutalist hero tab layout with canvas gap"`
  Expected: Git commit completes successfully.

### Task 2: Verify Visual Elements

**Files:**
- Manual verification of the browser view.

- [ ] **Step 1: Check tabs design on browser**
  Verify that:
  1. There is a visible 16px gap between the video/render canvas and the buttons.
  2. The buttons are spaced apart by an 8px gap.
  3. Hovering over a tab scales it and highlights the border white.
  4. The active tab turns crimson, gets a solid white shadow, and translates `-3px, -3px` for a 3D lift effect.
