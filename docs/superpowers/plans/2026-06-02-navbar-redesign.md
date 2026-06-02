# Premium Navbar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the VALO storefront navbar into a clean technical luxury layout with a spaced logo, lowercase links, and a brutalist checkout trigger button.

**Architecture:** Replace the standard simple header inside `index.html` with an Awwwards-tier three-column nav row, add custom monospace link hover glows and underline slider animations in `index.css`, and implement high-performance scroll triggers in `index.js`.

**Tech Stack:** HTML5, CSS3, Vanilla Javascript.

---

### Task 1: Scaffolding HTML & Testing Framework

**Files:**
- Create: `test-nav.js`
- Modify: `index.html`

- [ ] **Step 1: Write the failing check script**
  Create a test script `test-nav.js` to verify our navbar structure in HTML and scroll interactions in JS.

  ```javascript
  // test-nav.js
  const fs = require('fs');
  const assert = require('assert');

  console.log('--- STARTING NAV REDESIGN CHECK ---');

  // 1. Verify index.html structure
  const html = fs.readFileSync('index.html', 'utf8');
  assert(html.includes('class="brand-text">V A L O</span>'), 'ERROR: Navbar logo must be V A L O spaced');
  assert(html.includes('class="nav-links"'), 'ERROR: Navbar links container nav-links must be present');
  assert(html.includes('id="nav-buy-trigger"'), 'ERROR: Navbar buy button trigger ID must be present');
  assert(!html.includes('SYSTEM_ACTIVE'), 'ERROR: [ SYSTEM_ACTIVE ] must be removed');
  console.log('✔ index.html layout checks passed.');

  // 2. Verify index.js scroll handler definition
  const js = fs.readFileSync('index.js', 'utf8');
  assert(js.includes('function initNavScroll'), 'ERROR: index.js must define initNavScroll function');
  console.log('✔ index.js function checks passed.');
  console.log('--- ALL CHECKS PASSED ---');
  ```

- [ ] **Step 2: Run the test to verify it fails**
  Run: `node test-nav.js`
  Expected: Fails with `AssertionError: ERROR: Navbar logo must be V A L O spaced` (or similar).

- [ ] **Step 3: Modify index.html header layout**
  Replace the existing `<header class="tech-header" role="banner">` tag in `index.html` with the spaced logo, lowercase nav links, and brutalist buy button.

  Target content in `index.html`:
  ```html
          <!-- Live Tech Navigation Header -->
          <header class="tech-header" role="banner">
              <nav class="nav-row" aria-label="Main Navigation">
                  <span class="brand-text">VALO</span>
                  <span class="status-indicator" aria-live="polite">[ SYSTEM_ACTIVE // v1.0 ]</span>
              </nav>
              <div class="ticker-wrapper" role="region" aria-label="Promotions & Shipping Marquee">
                  <div class="ticker-track">
                      <span class="ticker-text">FREE U.S. SHIPPING ON ORDERS OVER $40 // DUST IT FOR DENSITY // SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span class="ticker-text" aria-hidden="true">FREE U.S. SHIPPING ON ORDERS OVER $40 // DUST IT FOR DENSITY // SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
              </div>
          </header>
  ```

  Replacement:
  ```html
          <!-- Live Tech Navigation Header -->
          <header class="tech-header" role="banner">
              <nav class="nav-row" aria-label="Main Navigation">
                  <!-- Spaced V A L O Logo -->
                  <span class="brand-text">V A L O</span>
                  
                  <!-- lowercase links -->
                  <div class="nav-links" role="menubar">
                      <a href="#app-root" class="nav-link" role="menuitem">formula</a>
                      <a href=".social-proof-section" class="nav-link" role="menuitem">reports</a>
                      <a href=".faq-section" class="nav-link" role="menuitem">faq</a>
                  </div>
                  
                  <!-- Brutalist buy button (Option A style) -->
                  <button class="btn-brutalist btn-nav-buy" id="nav-buy-trigger">
                      BUY NOW
                  </button>
              </nav>
              <div class="ticker-wrapper" role="region" aria-label="Promotions & Shipping Marquee">
                  <div class="ticker-track">
                      <span class="ticker-text">FREE U.S. SHIPPING ON ORDERS OVER $40 // DUST IT FOR DENSITY // SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span class="ticker-text" aria-hidden="true">FREE U.S. SHIPPING ON ORDERS OVER $40 // DUST IT FOR DENSITY // SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
              </div>
          </header>
  ```

- [ ] **Step 4: Run the test to check partial progress**
  Run: `node test-nav.js`
  Expected: HTML checks pass, but JS checks fail with `AssertionError: ERROR: index.js must define initNavScroll function`.

- [ ] **Step 5: Save and commit scaffolding**
  Run:
  ```bash
  git add test-nav.js index.html
  git commit -m "scaffold: implement premium navbar html structure and test harness"
  ```

---

### Task 2: Redesign Navigation Visuals (CSS)

**Files:**
- Modify: `index.css`

- [ ] **Step 1: Replace base brand-text styles**
  Modify `.brand-text` and nav header classes inside `index.css`.

  Target content in `index.css` (lines 87-115):
  ```css
  .tech-header {
      border-bottom: var(--border-thin);
      background-color: var(--bg-dark);
      padding: 12px 0 0 0;
      position: sticky;
      top: 0;
      z-index: 100;
  }

  .nav-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px 8px 16px;
  }

  .brand-text {
      font-size: 20px;
      font-weight: 900;
      font-family: var(--font-grotesque);
      letter-spacing: -1px;
  }

  .status-indicator {
      font-family: var(--font-mono);
      font-size: 9px;
      color: var(--electric-crimson);
      text-transform: uppercase;
  }
  ```

  Replacement:
  ```css
  .tech-header {
      border-bottom: var(--border-thin);
      background-color: var(--bg-dark);
      padding: 12px 0 0 0;
      position: sticky;
      top: 0;
      z-index: 100;
  }

  .nav-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px 8px 16px;
      width: 100%;
  }

  .brand-text {
      font-family: var(--font-grotesque);
      font-size: 16px;
      font-weight: 900;
      letter-spacing: 0.35em; /* Spaced brand design */
      text-transform: uppercase;
      color: var(--text-light);
      cursor: pointer;
      user-select: none;
  }

  .nav-links {
      display: flex;
      gap: 16px;
      align-items: center;
  }

  .nav-link {
      font-family: var(--font-mono);
      font-size: 10.5px;
      color: var(--text-muted);
      text-decoration: none;
      text-transform: lowercase;
      transition: color var(--transition-speed) ease, text-shadow var(--transition-speed) ease;
      position: relative;
      padding: 2px 0;
  }

  .nav-link:hover {
      color: var(--electric-crimson);
      text-shadow: 0 0 4px rgba(225, 29, 72, 0.7); /* Subtle elegant glow */
  }

  .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--electric-crimson);
      box-shadow: 0 0 4px var(--electric-crimson);
      transition: width var(--transition-speed) ease;
  }

  .nav-link:hover::after {
      width: 100%;
  }

  .btn-nav-buy {
      padding: 6px 12px;
      font-size: 9px;
      border: 1px solid var(--text-light);
      box-shadow: 2px 2px 0px var(--text-light);
      background-color: var(--electric-crimson);
      color: var(--text-light);
      font-weight: bold;
      cursor: pointer;
      transition: background-color var(--transition-speed) ease, 
                  transform var(--transition-speed) ease, 
                  box-shadow var(--transition-speed) ease;
  }

  .btn-nav-buy:hover {
      background-color: var(--crimson-hover);
      box-shadow: 1px 1px 0px var(--text-light);
      transform: translate(1px, 1px);
  }

  .btn-nav-buy:active {
      box-shadow: 0px 0px 0px var(--text-light);
      transform: translate(2px, 2px);
  }
  ```

- [ ] **Step 2: Append desktop media query layout configurations**
  Add overrides inside the existing `@media (min-width: 768px)` media block.

  Target content inside `@media (min-width: 768px)` (around line 800):
  ```css
      .tech-header {
          padding: 6px 0 0 0; /* Reduced top padding to save vertical space */
      }

      .ticker-wrapper {
          padding: 2px 0; /* Compact ticker height */
      }

      .nav-row {
          padding: 0 40px 4px 40px; /* Tightened padding */
      }
  ```

  Replacement:
  ```css
      .tech-header {
          padding: 6px 0 0 0; /* Reduced top padding to save vertical space */
      }

      .ticker-wrapper {
          padding: 2px 0; /* Compact ticker height */
      }

      .nav-row {
          padding: 0 40px 8px 40px; /* Increased bottom padding on desktop */
      }

      .brand-text {
          font-size: 18px;
      }
      
      .nav-links {
          gap: 28px; /* Roomier layout on desktop view */
      }
      
      .nav-link {
          font-size: 11px;
      }
      
      .btn-nav-buy {
          padding: 8px 16px;
          font-size: 10px;
      }
  ```

- [ ] **Step 3: Save and commit CSS**
  Run:
  ```bash
  git add index.css
  git commit -m "style: implement spaced brand-text, glowing lowercase links, and brutalist nav buy button"
  ```

---

### Task 3: Interactive Smooth Scrolling and Synced Actions (JS)

**Files:**
- Modify: `index.js`

- [ ] **Step 1: Register initNavScroll in DOMContentLoaded**
  Add `initNavScroll();` inside `DOMContentLoaded` event listener at the top of the file.

  Target content in `index.js` (lines 1-9):
  ```javascript
  /* index.js */
  document.addEventListener('DOMContentLoaded', () => {
      initDragSlider();
      initBundleSelector();
      initStickyDrawer();
      initMediaTheater();
      initFAQAccordion();
      initFinalCTA();
  });
  ```

  Replacement:
  ```javascript
  /* index.js */
  document.addEventListener('DOMContentLoaded', () => {
      initDragSlider();
      initBundleSelector();
      initStickyDrawer();
      initMediaTheater();
      initFAQAccordion();
      initFinalCTA();
      initNavScroll();
  });
  ```

- [ ] **Step 2: Add initNavScroll function definition to the end of index.js**
  Write smooth scrolling and focus anchor navigation inside `index.js`.

  Target content (end of file):
  ```javascript
              stockEl.style.color = '#E11D48';
              setTimeout(() => {
                  stockEl.style.color = '';
              }, 300);
          }
      }, 15000);
  }
  ```

  Replacement:
  ```javascript
              stockEl.style.color = '#E11D48';
              setTimeout(() => {
                  stockEl.style.color = '';
              }, 300);
          }
      }, 15000);
  }

  function initNavScroll() {
      const buyBtn = document.getElementById('nav-buy-trigger');
      const links = Array.from(document.querySelectorAll('.nav-link'));

      if (buyBtn) {
          buyBtn.addEventListener('click', (e) => {
              e.preventDefault();
              const target = document.querySelector('.bundle-selector-container');
              if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  // Focus the checkout button for accessibility
                  const trigger = document.getElementById('hero-checkout-trigger');
                  if (trigger) trigger.focus({ preventScroll: true });
              }
          });
      }

      links.forEach(link => {
          link.addEventListener('click', (e) => {
              e.preventDefault();
              const href = link.getAttribute('href');
              let target = null;
              
              if (href === '#app-root') {
                  target = document.getElementById('app-root');
              } else {
                  target = document.querySelector(href);
              }
              
              if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
          });
      });
  }
  ```

- [ ] **Step 3: Run the check script to verify all tests pass**
  Run: `node test-nav.js`
  Expected: Outputs `--- ALL CHECKS PASSED ---`

- [ ] **Step 4: Verify javascript compiles properly**
  Run: `node -c index.js`
  Expected: Successful compilation, no errors.

- [ ] **Step 5: Save and commit implementation**
  Run:
  ```bash
  git add index.js
  git commit -m "feat: implement high-performance smooth scrolling for navbar options and secure buy triggers"
  ```

- [ ] **Step 6: Cleanup test-nav.js**
  Run:
  ```bash
  rm test-nav.js
  git commit -am "cleanup: remove local test harness"
  ```
