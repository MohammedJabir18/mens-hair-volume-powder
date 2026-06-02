# Storefront Maximum Performance, SEO, and Animation Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize the storefront for peak loading speed, search engine discoverability, zero cumulative layout shift (CLS), and fluid 60fps animations.

**Architecture:** We will preconnect to CDNs, preload above-the-fold comparison assets, inject rich JSON-LD Product & FAQ schemas, lock layout shifts with structural CSS aspect-ratios, promote elements to the GPU using will-change rules, and offload scroll listeners to GSAP's optimized ScrollTrigger engine.

**Tech Stack:** Vanilla HTML5, Vanilla CSS, GSAP, ScrollTrigger, JSON-LD Schema.

---

### Task 1: CDN Connections & Above-the-Fold Preloading (index.html)

**Files:**
- Modify: `c:\Users\jabir\Documents\Scraped Data\output\Products\Men's Hair Volume Powder\index.html`

- [ ] **Step 1: Inject Preconnect and Preload links**
  Modify `<head>` in `index.html` to add CDN preconnects and preload above-the-fold image paths.
  
  *Code to add (replace lines 4-9 in `<head>`):*
  ```html
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <!-- DNS Prefetching and CDNs Preconnect -->
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
      
      <!-- Above-the-Fold Image Preloads -->
      <link rel="preload" as="image" href="assets/Before.png">
      <link rel="preload" as="image" href="assets/After.png">

      <title>VALO // ROOT-LOCK Men's Hair Volume Powder</title>
      <link rel="stylesheet" href="index.css">
  </head>
  ```

- [ ] **Step 2: Add Native Dimensions to Hero Image Sliders**
  Locate above-the-fold slider markup (lines 120-126) and specify explicit dimensions to eliminate CLS layout recalculation.
  
  *Target Content:*
  ```html
                                      <!-- Background: "After" State -->
                                      <div class="slider-after" style="background-image: url('assets/After.png');">
                                          <span class="badge badge-after">AFTER // VALO</span>
                                      </div>
                                      <!-- Foreground: "Before" State (Clipped) -->
                                      <div class="slider-before" id="before-image" style="background-image: url('assets/Before.png');">
                                          <span class="badge badge-before">BEFORE // FLAT</span>
                                      </div>
  ```
  *Replacement Content:*
  ```html
                                      <!-- Background: "After" State -->
                                      <div class="slider-after" style="background-image: url('assets/After.png');" width="480" height="320">
                                          <span class="badge badge-after">AFTER // VALO</span>
                                      </div>
                                      <!-- Foreground: "Before" State (Clipped) -->
                                      <div class="slider-before" id="before-image" style="background-image: url('assets/Before.png');" width="480" height="320">
                                          <span class="badge badge-before">BEFORE // FLAT</span>
                                      </div>
  ```

- [ ] **Step 3: Verify structure in index.html**
  Confirm that head elements are correctly nested and there are no duplicate `<title>` or `<link>` tags.

- [ ] **Step 4: Commit**
  Run: `git add index.html`  
  Run: `git commit -m "perf: add CDN preconnects and preload above-the-fold slider images"`

---

### Task 2: Advanced Search SEO & JSON-LD Schemas (index.html)

**Files:**
- Modify: `c:\Users\jabir\Documents\Scraped Data\output\Products\Men's Hair Volume Powder\index.html`

- [ ] **Step 1: Inject Meta Description, OG Tags, Twitter Cards, and Favicon**
  Add primary search engine tags, Open Graph preview bindings, Twitter visual cards, and favicon references to `<head>` right after preloads.
  
  *Code to insert:*
  ```html
      <!-- Primary SEO Meta Tags -->
      <meta name="description" content="Dust it for instant density. VALO is a weightless micro-mineral volume powder engineered to lift roots and coat flat strands in under 3 seconds. Try it safe with a 30-day guarantee.">
      <meta name="keywords" content="hair volume powder, mens hair styling, hair texturizing powder, thin hair volume, matte hair style">
      <meta name="robots" content="index, follow">
      <link rel="canonical" href="https://mohammedjabir.me/mens-hair-volume-powder">

      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://mohammedjabir.me/mens-hair-volume-powder">
      <meta property="og:title" content="VALO // ROOT-LOCK Men's Hair Volume Powder">
      <meta property="og:description" content="Dust it for instant density. Weightless micro-mineral styling powder coats flat strands for instant matte volume.">
      <meta property="og:image" content="assets/valo_01.png">

      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:url" content="https://mohammedjabir.me/mens-hair-volume-powder">
      <meta property="twitter:title" content="VALO // ROOT-LOCK Men's Hair Volume Powder">
      <meta property="twitter:description" content="Dust it for instant density. Weightless micro-mineral styling powder coats flat strands for instant matte volume.">
      <meta property="twitter:image" content="assets/valo_01.png">

      <!-- Favicon -->
      <link rel="icon" type="image/png" sizes="32x32" href="assets/valo_08.png">
  ```

- [ ] **Step 2: Inject Structured JSON-LD Schemas**
  Add structured JSON-LD Product & FAQPage schema blocks in `<head>` right before `</head>` to enable expandable FAQ rich snippets in Google Search results.
  
  *Code to insert right before `</head>`:*
  ```html
      <!-- Structured Product Data Schema -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "VALO ROOT-LOCK Men's Hair Volume Powder",
        "image": [
          "assets/valo_01.png",
          "assets/valo_08.png"
        ],
        "description": "Weightless micro-mineral volume powder that instantly coats flat strands, lifting roots to create a thick, gravity-defying matte structure.",
        "sku": "VALO-RL-01",
        "mpn": "VALO-ROOTLOCK",
        "brand": {
          "@type": "Brand",
          "name": "VALO"
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Mark T."
          },
          "reviewBody": "Finally something that doesn't make my thin hair look like a greasy helmet by noon. Standard clays weigh it down. VALO literally keeps it thick and dry all day."
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "2847"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": "29.99",
          "highPrice": "59.97",
          "offerCount": "3",
          "offers": [
            {
              "@type": "Offer",
              "name": "Standard Capsule (1x Bottle)",
              "price": "29.99",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": "https://mohammedjabir.me/mens-hair-volume-powder"
            },
            {
              "@type": "Offer",
              "name": "Double Density (2x Bottle Pack)",
              "price": "49.98",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": "https://mohammedjabir.me/mens-hair-volume-powder"
            },
            {
              "@type": "Offer",
              "name": "Styles Syndicate (3x Bottle Kit)",
              "price": "59.97",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": "https://mohammedjabir.me/mens-hair-volume-powder"
            }
          ]
        }
      }
      </script>

      <!-- Structured FAQ Data Schema -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Will this work on very thin or thinning hair?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. VALO was specifically engineered for thin and fine hair types. The micro-mineral particles coat individual strands without weighing them down, creating friction-based lift at the root level."
            }
          },
          {
            "@type": "Question",
            "name": "How long does one bottle last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "One bottle lasts 60-90 days with daily use. Because VALO is a concentrated powder, a tiny dusting is all you need per application."
            }
          },
          {
            "@type": "Question",
            "name": "Is it visible in dark hair? Light hair?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "VALO is completely invisible once applied and worked into the hair. The micro-mineral particles are translucent and colorless. It works equally well on all hair colors."
            }
          },
          {
            "@type": "Question",
            "name": "Does it wash out easily?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. VALO washes out completely with any standard shampoo in one wash. There is zero product buildup."
            }
          },
          {
            "@type": "Question",
            "name": "Will it make my hair look greasy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The opposite. VALO actively absorbs oil and moisture at the scalp. It delivers a completely dry, matte texture finish."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it with other styling products?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Apply VALO first to dry hair for root volume, then layer any finishing product on top — pomade, clay, spray."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between this and dry shampoo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dry shampoo absorbs oil but adds zero volume. VALO is an engineered volumizing powder that mechanically separates and lifts individual hair strands."
            }
          },
          {
            "@type": "Question",
            "name": "Does this cause side effects, hair fall, or hair damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Let's be completely real: we would never sell something that hurts your hair. VALO is crafted from natural, dermatologically inert styling minerals (like silica silylate and organic kaolin clay) that sit completely on the outside of your hair fibers to create mechanical volume. It never penetrates your scalp, never blocks your hair follicles, and doesn't interfere with your hair's natural growth cycle."
            }
          }
        ]
      }
      </script>
  ```

- [ ] **Step 3: Run HTML Validation**
  Check index.html for any unclosed tags or syntax syntax errors.

- [ ] **Step 4: Commit**
  Run: `git add index.html`  
  Run: `git commit -m "seo: integrate rich meta tags, Open Graph, Twitter preview cards, and comprehensive JSON-LD Product & FAQ Schemas"`

---

### Task 3: Below-the-Fold Native Sizing and Media Optimizations (index.html)

**Files:**
- Modify: `c:\Users\jabir\Documents\Scraped Data\output\Products\Men's Hair Volume Powder\index.html`

- [ ] **Step 1: Polish Science Lab Product Image Attributes**
  Locate `valo_01.png` closeup (line 259) and add specific width/height dimensions alongside native lazy loading and async decoding parameters.
  
  *Target Content:*
  ```html
  <img src="assets/valo_01.png" alt="VALO Hair Volume Powder product closeup under analysis" class="lab-product-img" loading="lazy">
  ```
  *Replacement Content:*
  ```html
  <img src="assets/valo_01.png" alt="VALO Hair Volume Powder product closeup under analysis" class="lab-product-img" loading="lazy" decoding="async" width="280" height="280">
  ```

- [ ] **Step 2: Polish Customer Review Image Attributes**
  Locate Jake R's customer result photo (`assets/image_9.jpg`, line 331) and optimize loading.
  
  *Target Content:*
  ```html
                                  <img src="assets/image_9.jpg" alt="Customer result photo showing hair volume" class="review-photo" loading="lazy">
  ```
  *Replacement Content:*
  ```html
                                  <img src="assets/image_9.jpg" alt="Customer result photo showing hair volume" class="review-photo" loading="lazy" decoding="async" width="64" height="64">
  ```

- [ ] **Step 3: Polish Evidence Specimens Sizing**
  Locate the 9 specimen cards in the evidence grid (lines 381-425) and apply native dimensions and async parameters to completely prevent layout shifting upon loading.
  
  *Target Content:*
  ```html
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_01.png" alt="VALO density result specimen 01" class="evidence-img" loading="lazy">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_01 // DENSITY_ACTIVE ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_02.png" alt="VALO texture result specimen 02" class="evidence-img" loading="lazy">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_02 // TEXTURE_MATRIX ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_03.png" alt="VALO root elevation specimen 03" class="evidence-img" loading="lazy">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_03 // ROOT_ELEVATION ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_04.png" alt="VALO hold structure specimen 04" class="evidence-img" loading="lazy">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_04 // HOLD_STRUCTURE ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_05.png" alt="VALO matte finish specimen 05" class="evidence-img" loading="lazy">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_05 // MATTE_FINISH ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_06.png" alt="VALO volume stack specimen 06" class="evidence-img" loading="lazy">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_06 // VOLUME_STACK ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_07.png" alt="VALO fiber coat specimen 07" class="evidence-img" loading="lazy">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_07 // FIBER_COAT ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_20.png" alt="VALO gravity defy specimen 08" class="evidence-img" loading="lazy">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_08 // GRAVITY_DEFY ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_22.png" alt="VALO full deploy specimen 09" class="evidence-img" loading="lazy">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_09 // FULL_DEPLOY ]</span>
                      </div></div>
  ```
  *Replacement Content:*
  ```html
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_01.png" alt="VALO density result specimen 01" class="evidence-img" loading="lazy" decoding="async" width="150" height="150">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_01 // DENSITY_ACTIVE ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_02.png" alt="VALO texture result specimen 02" class="evidence-img" loading="lazy" decoding="async" width="150" height="150">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_02 // TEXTURE_MATRIX ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_03.png" alt="VALO root elevation specimen 03" class="evidence-img" loading="lazy" decoding="async" width="150" height="150">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_03 // ROOT_ELEVATION ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_04.png" alt="VALO hold structure specimen 04" class="evidence-img" loading="lazy" decoding="async" width="150" height="150">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_04 // HOLD_STRUCTURE ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_05.png" alt="VALO matte finish specimen 05" class="evidence-img" loading="lazy" decoding="async" width="150" height="150">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_05 // MATTE_FINISH ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_06.png" alt="VALO volume stack specimen 06" class="evidence-img" loading="lazy" decoding="async" width="150" height="150">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_06 // VOLUME_STACK ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_07.png" alt="VALO fiber coat specimen 07" class="evidence-img" loading="lazy" decoding="async" width="150" height="150">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_07 // FIBER_COAT ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_20.png" alt="VALO gravity defy specimen 08" class="evidence-img" loading="lazy" decoding="async" width="150" height="150">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_08 // GRAVITY_DEFY ]</span>
                      </div></div>
                      <div class="evidence-item"><div class="evidence-frame">
                          <div class="frame-corner tl"></div><div class="frame-corner tr"></div><div class="frame-corner bl"></div><div class="frame-corner br"></div>
                          <img src="assets/valo_22.png" alt="VALO full deploy specimen 09" class="evidence-img" loading="lazy" decoding="async" width="150" height="150">
                          <span class="evidence-caption tech-mono">[ SPECIMEN_09 // FULL_DEPLOY ]</span>
                      </div></div>
  ```

- [ ] **Step 4: Commit**
  Run: `git add index.html`  
  Run: `git commit -m "perf: add native lazy loading, async decoding, and explicit layout dimensions to all below-the-fold media"`

---

### Task 4: CSS GPU promotion & Aspect-Ratios (index.css)

**Files:**
- Modify: `c:\Users\jabir\Documents\Scraped Data\output\Products\Men's Hair Volume Powder\index.css`

- [ ] **Step 1: Add Compositing Promoters in CSS root**
  Promote animated brutalist cards and structural items to the GPU to offload main-thread calculations.
  
  *Code to append to the bottom of the root rules in `index.css`:*
  ```css
  /* GPU Compositing promotion to ensure high-performance rendering */
  .main-headline,
  .spec-tile,
  .step-card,
  .compound-card,
  .review-block,
  .evidence-item,
  .faq-item,
  .urgency-cell,
  .cta-content {
      will-change: transform, opacity;
      backface-visibility: hidden;
      transform: translate3d(0, 0, 0);
  }
  ```

- [ ] **Step 2: Reserve Visual Spacing via Aspect-Ratios**
  Reserve placeholder space for major dynamic media components to guarantee a Cumulative Layout Shift (CLS) score of exactly zero.
  
  *Code to add before the desktop overrides (`@media (min-width: 768px)`) in `index.css`:*
  ```css
  /* Dynamic Aspect Ratios to block CLS Shifts on load */
  .slider-wrapper {
      aspect-ratio: 4 / 3;
      height: auto;
  }

  .media-theater {
      aspect-ratio: 4 / 3;
      height: auto;
  }

  .review-photo-frame {
      aspect-ratio: 1 / 1;
  }

  .evidence-frame {
      aspect-ratio: 1 / 1;
  }

  .scan-frame {
      aspect-ratio: 1 / 1;
      height: auto;
  }
  ```

- [ ] **Step 3: Modify Desktop Overrides for Aspect Ratios**
  Reset layout aspect ratios on desktop viewport grid systems where height scales to content height.
  
  *Code to add inside the `@media (min-width: 768px)` override block:*
  ```css
      .slider-wrapper, .media-theater {
          aspect-ratio: auto;
          height: 100%;
          min-height: 400px;
      }
      .scan-frame {
          aspect-ratio: auto;
          height: 380px;
      }
  ```

- [ ] **Step 4: Commit**
  Run: `git add index.css`  
  Run: `git commit -m "perf: integrate CSS aspect-ratio locks for zero CLS and GPU rendering layers on animated elements"`

---

### Task 5: Scroll Listener Offloading via GSAP (index.js)

**Files:**
- Modify: `c:\Users\jabir\Documents\Scraped Data\output\Products\Men's Hair Volume Powder\index.js`

- [ ] **Step 1: Offload Window Scroll Listener in initStickyDrawer()**
  Locate `initStickyDrawer()` in `index.js` (lines 203-236) and replace the direct window scroll polling loop with an optimized GSAP ScrollTrigger timeline configuration, preserving a lightweight RAF scroll fallback if GSAP fails.
  
  *Target Content:*
  ```javascript
  function initStickyDrawer() {
      const drawer = document.getElementById('sticky-checkout-drawer');
      const checkoutBtn = document.getElementById('sticky-checkout-btn');

      if (!drawer || !checkoutBtn) return;

      let isShown = false;
      let ticking = false;

      const checkScroll = () => {
          const shouldShow = window.scrollY > 350;
          if (shouldShow !== isShown) {
              isShown = shouldShow;
              if (isShown) {
                  drawer.classList.add('show');
              } else {
                  drawer.classList.remove('show');
              }
          }
          ticking = false;
      };

      window.addEventListener('scroll', () => {
          if (!ticking) {
              window.requestAnimationFrame(checkScroll);
              ticking = true;
          }
      }, { passive: true });

      checkoutBtn.addEventListener('click', () => {
          const bundleId = checkoutBtn.getAttribute('data-active-bundle');
          triggerSecureCheckout(bundleId);
      });
  }
  ```
  *Replacement Content:*
  ```javascript
  function initStickyDrawer() {
      const drawer = document.getElementById('sticky-checkout-drawer');
      const checkoutBtn = document.getElementById('sticky-checkout-btn');

      if (!drawer || !checkoutBtn) return;

      // Use hardware-optimized GSAP ScrollTrigger if available to offload thread operations
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.create({
              trigger: "#app-root",
              start: "top -350px", // Fires when main page scrolls past 350px
              onEnter: () => drawer.classList.add('show'),
              onLeaveBack: () => drawer.classList.remove('show'),
              fastScrollEnd: true
          });
      } else {
          // Robust microsecond-throttled scroll fallback
          let isShown = false;
          let ticking = false;

          const checkScroll = () => {
              const shouldShow = window.scrollY > 350;
              if (shouldShow !== isShown) {
                  isShown = shouldShow;
                  if (isShown) {
                      drawer.classList.add('show');
                  } else {
                      drawer.classList.remove('show');
                  }
              }
              ticking = false;
          };

          window.addEventListener('scroll', () => {
              if (!ticking) {
                  window.requestAnimationFrame(checkScroll);
                  ticking = true;
              }
          }, { passive: true });
      }

      checkoutBtn.addEventListener('click', () => {
          const bundleId = checkoutBtn.getAttribute('data-active-bundle');
          triggerSecureCheckout(bundleId);
      });
  }
  ```

- [ ] **Step 2: Commit**
  Run: `git add index.js`  
  Run: `git commit -m "perf: migrate sticky drawer scroll listener to GSAP ScrollTrigger to minimize main-thread calculations"`
