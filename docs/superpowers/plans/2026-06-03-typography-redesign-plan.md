# Storefront Typography & Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the storefront styling, moving from a rigid CCTV/hacker aesthetic to a modern, high-converting Premium DTC storefront utilizing Google Fonts (Outfit & Inter), rounded borders, and Prestige Gold accents.

**Architecture:** We will modify `index.css` to import the Google Fonts and define updated visual CSS design tokens (Prestige Gold, soft zinc borders, rounded border radii). Then, we will refactor `index.html` component by component to rewrite hacker-style copy (brackets `[]` and slashes `//`) into persuasive DTC marketing copy and update UI element structures.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Google Fonts API.

---

### Task 1: Update CSS Variables and Design Tokens

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css:1-35`

- [ ] **Step 1: Replace font and color definitions in CSS root variables**
  
  In [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css), import the Google Fonts and update variable declarations to map font families and gold variables.
  
  Replace lines 1-17 with:
  ```css
  /* index.css */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@700;900&display=swap');

  :root {
      --bg-dark: #050505;
      --bg-card: #0d0d0f;
      --text-light: #FFFFFF;
      --text-muted: #a1a1aa;
      --electric-crimson: #ca8a04; /* Prestige Gold Primary */
      --crimson-hover: #a16207;   /* Prestige Gold Hover */
      --crimson-glow: rgba(202, 138, 4, 0.15);
      --border-color: #27272a;    /* Clean zinc border */
      --border-thick: 2px solid var(--electric-crimson);
      --border-thin: 1px solid var(--border-color);
      --font-grotesque: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-heading: 'Outfit', system-ui, sans-serif;
      --font-mono: 'Inter', system-ui, sans-serif; /* Replace monospace font */
      --grid-gap: 16px;
      --transition-speed: 0.3s;
      --border-radius: 12px;
      --border-radius-sm: 8px;
  }
  ```

- [ ] **Step 2: Update base body styles and mobile container edges**
  
  In [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css), modify the `.container` block (around line 34) to use rounded corner boundaries and soft padding:
  ```css
  .container {
      width: 100%;
      max-width: 480px; /* Locked mobile viewport */
      margin: 0 auto;
      padding: 0 16px;
      border-left: var(--border-thin);
      border-right: var(--border-thin);
      min-height: 100vh;
      background: var(--bg-dark);
  }
  ```

- [ ] **Step 3: Force stage and commit Task 1**
  
  Run:
  ```bash
  git add -f index.css
  git commit -m "style: update font imports, root design tokens, and color variables to Prestige Gold"
  ```

---

### Task 2: Redesign Header & Navigation

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.html:199-215`
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css:102-192`

- [ ] **Step 1: Clean navigation HTML elements**
  
  In [index.html](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.html), replace the header layout. Remove the double slashes from the navigation links and uppercase/space the content elegantly.
  
  Update lines 199-215 to:
  ```html
      <!-- App Mobile Viewport Container -->
      <div class="container">
          <!-- Navigation Header -->
          <header class="tech-header" role="banner">
              <nav class="nav-row" aria-label="Main Navigation">
                  <div class="brand-text" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">VALO</div>
                  <div class="nav-links">
                      <a href="#formula" class="nav-link">Formula</a>
                      <a href="#reviews" class="nav-link">Reviews</a>
                      <a href="#faq" class="nav-link">FAQ</a>
                      <button class="btn-nav-buy" onclick="document.getElementById('bundle-selector').scrollIntoView({behavior: 'smooth'})">Order Now</button>
                  </div>
              </nav>
  ```

- [ ] **Step 2: Restyle navigation CSS**
  
  In [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css), update the header and nav styling. Change navigation links to use title-case, adjust margins, and update the buy button to use rounded corners:
  ```css
  .tech-header {
      border-bottom: var(--border-thin);
      background-color: rgba(5, 5, 5, 0.85);
      backdrop-filter: blur(12px);
      padding: 16px 0;
      position: sticky;
      top: 0;
      z-index: 100;
  }

  .nav-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      width: 100%;
  }

  .brand-text {
      font-family: var(--font-heading);
      font-size: 20px;
      font-weight: 900;
      letter-spacing: 0.15em;
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
      font-family: var(--font-grotesque);
      font-size: 13px;
      font-weight: 500;
      color: var(--text-muted);
      text-decoration: none;
      transition: color var(--transition-speed) ease;
      position: relative;
      padding: 4px 0;
  }

  .nav-link:hover {
      color: var(--electric-crimson);
  }

  .btn-nav-buy {
      padding: 8px 16px;
      font-size: 11px;
      border: 1px solid var(--electric-crimson);
      border-radius: var(--border-radius-sm);
      background-color: var(--electric-crimson);
      color: #000;
      font-family: var(--font-heading);
      font-weight: 700;
      cursor: pointer;
      transition: all var(--transition-speed) ease;
  }

  .btn-nav-buy:hover {
      background-color: var(--crimson-hover);
      border-color: var(--crimson-hover);
      transform: translateY(-1px);
  }
  ```

- [ ] **Step 3: Force stage and commit Task 2**
  
  Run:
  ```bash
  git add -f index.html index.css
  git commit -m "style: redesign header navigation and update branding elements"
  ```

---

### Task 3: Redesign Ticker Banner & Hero Section

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.html:209-224`
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css:193-270`

- [ ] **Step 1: Remove brackets and slashes from Ticker and Hero Header**
  
  In [index.html](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.html), clean up the banner track text and hero intro text.
  
  Update lines 208-223 to:
  ```html
              <!-- Promotional Ticker -->
              <div class="ticker-wrapper" aria-hidden="true">
                  <div class="ticker-track">
                      <span class="ticker-text">FREE U.S. SHIPPING ON ORDERS OVER $40 • DUST IT FOR DENSITY • SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span class="ticker-text">FREE U.S. SHIPPING ON ORDERS OVER $40 • DUST IT FOR DENSITY • SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span class="ticker-text">FREE U.S. SHIPPING ON ORDERS OVER $40 • DUST IT FOR DENSITY • SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span class="ticker-text">FREE U.S. SHIPPING ON ORDERS OVER $40 • DUST IT FOR DENSITY • SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
              </div>
          </header>

          <main id="main-content">
              <!-- Hero Section -->
              <section class="hero-section" aria-labelledby="hero-title">
                  <div class="hero-left-col">
                      <div class="headline-container">
                          <span class="badge-dtc">Root-Lock Volume Powder</span>
                          <h1 id="hero-title" class="main-headline">Stop Hiding <span class="highlight">Thin Hair</span></h1>
                          <p class="hero-subtext">Engineered for instant volume, 24-hour weightless lift, and a clean matte texture. Achieve fuller-looking hair in under 10 seconds.</p>
                      </div>
  ```

- [ ] **Step 2: Update Hero CSS and layout tokens**
  
  In [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css), modify the banner text, main headline, and hero subtext styling:
  ```css
  .ticker-wrapper {
      background: var(--electric-crimson);
      border-top: var(--border-thin);
      border-bottom: var(--border-thin);
      padding: 6px 0;
      overflow: hidden;
      white-space: nowrap;
      display: flex;
  }

  .ticker-text {
      flex-shrink: 0;
      font-family: var(--font-heading);
      font-size: 10px;
      font-weight: 700;
      color: #000;
      letter-spacing: 0.05em;
  }

  .hero-section {
      padding: 32px 16px;
      border-bottom: var(--border-thin);
      display: flex;
      flex-direction: column;
  }

  .badge-dtc {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--electric-crimson);
      margin-bottom: 12px;
  }

  .main-headline {
      font-family: var(--font-heading);
      font-size: 46px;
      font-weight: 900;
      line-height: 1.0;
      letter-spacing: -1.5px;
      text-transform: uppercase;
  }

  .hero-subtext {
      margin-top: 16px;
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
  }
  ```

- [ ] **Step 3: Force stage and commit Task 3**
  
  Run:
  ```bash
  git add -f index.html index.css
  git commit -m "style: clean promotional ticker and redesign hero typography layout"
  ```

---

### Task 4: Redesign Before/After Slider & Media Controls

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.html:325-335`
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css:271-419`

- [ ] **Step 1: Remove slashes from slider image badges**
  
  In [index.html](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.html), locate the slider container inside the media theater and remove `//` from badges.
  
  Update lines 325-335 to:
  ```html
                                      <div class="slider-wrapper" tabindex="0" aria-label="Before and After Volume Powder Comparison Slider">
                                          <div class="slider-after" style="background-image: url('assets/After.png');">
                                              <span class="badge badge-after">After: Fuller & Thick</span>
                                          </div>
                                          <div class="slider-before" style="background-image: url('assets/Before.png');">
                                              <span class="badge badge-before">Before: Flat & Lifeless</span>
                                          </div>
  ```

- [ ] **Step 2: Update Slider CSS layout**
  
  In [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css), adjust the slider handles, badges, and theater controls to use rounded borders and clean, premium highlights instead of the flat box-shadow brutalist styling:
  ```css
  .slider-wrapper {
      position: relative;
      width: 100%;
      height: 320px;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      overflow: hidden;
      user-select: none;
      cursor: ew-resize;
      transition: border-color var(--transition-speed) ease;
  }

  .badge {
      position: absolute;
      bottom: 12px;
      font-family: var(--font-heading);
      font-size: 10px;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
  }

  .badge-before {
      left: 12px;
      background: rgba(0, 0, 0, 0.75);
      color: #fff;
  }

  .badge-after {
      right: 12px;
      background: rgba(202, 138, 4, 0.9);
      color: #000;
  }

  .handle-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      background: #000;
      border: 2px solid var(--electric-crimson);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(202, 138, 4, 0.4);
      transition: all var(--transition-speed) ease;
  }
  ```

- [ ] **Step 3: Update Media Theater controls**
  
  In [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's Hair Volume Powder/index.css), update the tab selector `.control-tab` and `.tab-label` to look elegant and modern (rounded tabs, simple gold border highlighting):
  ```css
  .theater-controls {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 16px;
      margin-bottom: 24px;
  }

  .control-tab {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-sm);
      color: var(--text-muted);
      font-family: var(--font-grotesque);
      font-weight: 600;
      padding: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all var(--transition-speed) ease;
  }

  .control-tab:hover {
      color: var(--text-light);
      border-color: #3f3f46;
  }

  .control-tab.active {
      color: #000;
      background: var(--electric-crimson);
      border-color: var(--electric-crimson);
      box-shadow: 0 4px 12px rgba(202, 138, 4, 0.2);
  }

  .tab-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
  }
  ```

- [ ] **Step 4: Force stage and commit Task 4**
  
  Run:
  ```bash
  git add -f index.html index.css
  git commit -m "style: restyle comparison slider and rounded control buttons"
  ```

---

### Task 5: Redesign Bundle Selector Cards & Checkout Button

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.html:227-272`
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css:625-728`

- [ ] **Step 1: Clean and update bundle selector tags**
  
  In [index.html](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.html), replace the bundle header, custom labels, and checkout button. Remove `[]` and `//`.
  
  Update lines 227-272 to:
  ```html
                      <!-- Package Bundle Selector -->
                      <div id="bundle-selector" class="bundle-selector-container">
                          <span class="badge-dtc">Select Your Hair Density Pack</span>
                          
                          <div class="bundle-options" role="radiogroup" aria-label="Purchase Options">
                              <!-- Bundle Card 1 -->
                              <div class="bundle-card" role="radio" aria-checked="false" tabindex="0" data-value="1" data-price="29.99" data-checkout-url="https://buy.stripe.com/test_1xSingle">
                                  <div class="bundle-left">
                                      <span class="mono-badge">Starter Lift</span>
                                      <h3 class="bundle-title">1x Valo Volume Powder</h3>
                                      <p class="bundle-desc">Perfect for testing the formula. Lasts 30-45 days.</p>
                                  </div>
                                  <div class="bundle-right">
                                      <div class="price">$29.99</div>
                                  </div>
                              </div>

                              <!-- Bundle Card 2 -->
                              <div class="bundle-card active" role="radio" aria-checked="true" tabindex="0" data-value="2" data-price="49.98" data-checkout-url="https://buy.stripe.com/test_2xDouble">
                                  <div class="bundle-ribbon">Most Popular • Save $10</div>
                                  <div class="bundle-left">
                                      <span class="mono-badge crimson">Double Lift Pack</span>
                                      <h3 class="bundle-title">2x Valo Volume Powder</h3>
                                      <p class="bundle-desc">Recommended for daily styling. Lasts 90 days.</p>
                                  </div>
                                  <div class="bundle-right">
                                      <div class="price">$49.98</div>
                                  </div>
                              </div>

                              <!-- Bundle Card 3 -->
                              <div class="bundle-card" role="radio" aria-checked="false" tabindex="0" data-value="3" data-price="59.97" data-checkout-url="https://buy.stripe.com/test_3xTriple">
                                  <div class="bundle-ribbon black">Buy 2 Get 1 Free • Save $30</div>
                                  <div class="bundle-left">
                                      <span class="mono-badge">Maximum Lift Pack</span>
                                      <h3 class="bundle-title">3x Valo Volume Powder</h3>
                                      <p class="bundle-desc">Share with friends or stock up. Lasts 180 days.</p>
                                  </div>
                                  <div class="bundle-right">
                                      <div class="price">$59.97</div>
                                  </div>
                              </div>
                          </div>

                          <button id="checkout-button" class="btn-brutalist btn-hero-checkout">ADD SELECTED PACK TO BAG • $49.98</button>
                      </div>
  ```

- [ ] **Step 2: Update Bundle Card CSS**
  
  In [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css), restyle the cards, ribbons, and main CTA button. Implement rounded corners, smooth borders, and gold background highlight:
  ```css
  .bundle-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 18px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: all var(--transition-speed) ease;
  }

  .bundle-card:hover {
      border-color: #3f3f46;
  }

  .bundle-card.active {
      border: 2px solid var(--electric-crimson);
      background: rgba(202, 138, 4, 0.02);
  }

  .bundle-ribbon {
      position: absolute;
      top: -10px;
      right: 16px;
      background: var(--electric-crimson);
      color: #000;
      font-family: var(--font-heading);
      font-size: 9px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 12px;
      text-transform: uppercase;
  }

  .bundle-ribbon.black {
      background: var(--text-light);
      color: #000;
  }

  .mono-badge {
      font-family: var(--font-grotesque);
      font-size: 10px;
      font-weight: 600;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 2px 8px;
      width: fit-content;
      text-transform: uppercase;
      margin-bottom: 6px;
      display: inline-block;
  }

  .mono-badge.crimson {
      border-color: var(--electric-crimson);
      color: var(--electric-crimson);
  }

  .bundle-title {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 700;
      color: #fff;
  }

  .bundle-desc {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 2px;
  }

  .bundle-right .price {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 900;
      color: #fff;
  }

  .btn-brutalist {
      background-color: var(--electric-crimson);
      color: #000;
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
      box-shadow: 0 4px 16px rgba(202, 138, 4, 0.25);
  }

  .btn-brutalist:hover {
      background-color: var(--crimson-hover);
      box-shadow: 0 6px 20px rgba(202, 138, 4, 0.35);
      transform: translateY(-1px);
  }
  ```

- [ ] **Step 3: Force stage and commit Task 5**
  
  Run:
  ```bash
  git add -f index.html index.css
  git commit -m "style: redesign e-commerce bundle cards and purchase CTA buttons"
  ```

---

### Task 6: Redesign Specifications & Ingredients

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.html:418-454`
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css:729-820`

- [ ] **Step 1: Remove brackets/slashes from specifications and ingredients**
  
  In [index.html](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.html), clean the sections for ingredients and specs.
  
  Update lines 418-454 to:
  ```html
              <!-- Specifications & Ingredients Section -->
              <section id="formula" class="funnel-specs-section" aria-labelledby="specs-title">
                  <span class="badge-dtc">Advanced Science</span>
                  <h2 id="specs-title" class="main-headline" style="font-size: 32px; margin-bottom: 20px;">Precision Formulated</h2>
                  
                  <ul class="specs-grid">
                      <li class="spec-tile">
                          <div class="spec-label">Matte Finish</div>
                          <p class="spec-desc">Absorbs excess scalp oils instantly for a natural shine-free style.</p>
                      </li>
                      <li class="spec-tile">
                          <div class="spec-label">24HR Hold</div>
                          <p class="spec-desc">Locks roots in place without stiffness or product build-up.</p>
                      </li>
                      <li class="spec-tile">
                          <div class="spec-label">Weightless Lift</div>
                          <p class="spec-desc">Micro-powder particles coat fibers without weighing them down.</p>
                      </li>
                      <li class="spec-tile">
                          <div class="spec-label">Zero Residue</div>
                          <p class="spec-desc">Translucent formula blends invisibly into all hair colors.</p>
                      </li>
                  </ul>

                  <div class="styling-guide-container">
                      <span class="badge-dtc">Active Ingredients</span>
                      <div class="workflow-steps">
                          <div class="step-card">
                              <div class="step-body">
                                  <div class="compound-formula" style="color: var(--electric-crimson); font-weight: 700; margin-bottom: 4px;">Silica Silylate</div>
                                  <p class="spec-desc">High-performance compound responsible for structural grip, absorbing grease, and expanding individual shaft volume.</p>
                              </div>
                          </div>
                          <div class="step-card">
                              <div class="step-body">
                                  <div class="compound-formula" style="color: var(--electric-crimson); font-weight: 700; margin-bottom: 4px;">Kaolin Clay</div>
                                  <p class="spec-desc">Natural mineral base that provides the signature matte texture and detoxifies the hair follicles.</p>
                              </div>
                          </div>
                          <div class="step-card">
                              <div class="step-body">
                                  <div class="compound-formula" style="color: var(--electric-crimson); font-weight: 700; margin-bottom: 4px;">Volumizing Polymers</div>
                                  <p class="spec-desc">Weightless cross-linking chains that bond with hair fibers to build flexible, reworkable density.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
  ```

- [ ] **Step 2: Update grid & card CSS styling**
  
  In [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css), style `.spec-tile` and `.step-card` with rounded corners and modern layouts:
  ```css
  .spec-tile {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 16px;
  }

  .spec-label {
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 4px;
      color: #fff;
  }

  .step-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
  }
  ```

- [ ] **Step 3: Force stage and commit Task 6**
  
  Run:
  ```bash
  git add -f index.html index.css
  git commit -m "style: clean specifications and active ingredient cards"
  ```

---

### Task 7: Redesign Reviews & FAQ Accordions

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.html:460-600` (Review and FAQ section ranges)
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css:820-1300`

- [ ] **Step 1: Clean review usernames, dates, and stars**
  
  In [index.html](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.html), replace review banners and headers. Remove `[]`, `//`, and replace with clean usernames and rating elements.
  
  Update review blocks (around lines 460-540) to match this structure:
  ```html
              <!-- Reviews Section -->
              <section id="reviews" class="funnel-specs-section" aria-labelledby="reviews-title">
                  <span class="badge-dtc">Customer Experience</span>
                  <h2 id="reviews-title" class="main-headline" style="font-size: 32px; margin-bottom: 20px;">Field Reports</h2>
                  
                  <div class="reviews-list">
                      <!-- Review 1 -->
                      <div class="review-block">
                          <div class="review-header">
                              <span class="review-user" style="font-family: var(--font-heading); font-weight: 700; color: #fff;">Mark T.</span>
                              <span class="review-rating" style="color: var(--electric-crimson);">★★★★★</span>
                          </div>
                          <p class="review-text">Instantly lifts my flat hair. It's completely matte and doesn't feel sticky. Lasts all day.</p>
                          <div class="review-meta" style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">
                              Verified Purchase • 2 weeks ago • Product: Double Pack
                          </div>
                      </div>
                      
                      <!-- Review 2 -->
                      <div class="review-block">
                          <div class="review-header">
                              <span class="review-user" style="font-family: var(--font-heading); font-weight: 700; color: #fff;">Jake R.</span>
                              <span class="review-rating" style="color: var(--electric-crimson);">★★★★★</span>
                          </div>
                          <p class="review-text">This stuff is a game changer. A tiny bit is enough. Finally got some volume in my hair.</p>
                          <div class="review-meta" style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">
                              Verified Purchase • 5 days ago • Product: Triple Pack
                          </div>
                      </div>
                  </div>
              </section>
  ```

- [ ] **Step 2: Clean the FAQ accordions and headers**
  
  In [index.html](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.html), replace the FAQ section header and content, removing all brackets and slashes:
  ```html
              <!-- FAQ Section -->
              <section id="faq" class="funnel-specs-section" aria-labelledby="faq-title">
                  <span class="badge-dtc">Got Questions?</span>
                  <h2 id="faq-title" class="main-headline" style="font-size: 32px; margin-bottom: 20px;">Frequently Asked Questions</h2>
                  
                  <div class="faq-container">
                      <div class="faq-item">
                          <button class="faq-trigger" aria-expanded="false">
                              <span>How do I apply it?</span>
                              <span class="faq-icon">+</span>
                          </button>
                          <div class="faq-content" aria-hidden="true">
                              <p>Sprinkle a small amount directly onto dry hair roots, then run your fingers through your hair to style and lock in lift.</p>
                          </div>
                      </div>
                      <div class="faq-item">
                          <button class="faq-trigger" aria-expanded="false">
                              <span>Does it wash out easily?</span>
                              <span class="faq-icon">+</span>
                          </button>
                          <div class="faq-content" aria-hidden="true">
                              <p>Yes, the formula washes out easily with normal shampoo and warm water without leaving any buildup.</p>
                          </div>
                      </div>
                  </div>
              </section>
  ```

- [ ] **Step 3: Update Review and FAQ CSS**
  
  In [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css), apply rounded corners and clean borders:
  ```css
  .review-block {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 16px;
      margin-bottom: 12px;
  }
  
  .faq-item {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      margin-bottom: 8px;
      overflow: hidden;
  }
  ```

- [ ] **Step 4: Force stage and commit Task 7**
  
  Run:
  ```bash
  git add -f index.html index.css
  git commit -m "style: restyle customer reviews and FAQ accordions with rounded cards"
  ```
