# Media Lazy Loading & Decrypt Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a high-performance "Matrix Decrypt Unblur" media loader on the storefront.

**Architecture:** Initialize images, videos, and gallery backgrounds with a blur filter and a `[ DECRYPTING... ]` monospace overlay tag, and animate them to full focus and scale once they finish loading in JS.

**Tech Stack:** Vanilla CSS, JavaScript, HTML5

---

### Task 1: CSS Transitions & Keyframe Layouts

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.css`

- [ ] **Step 1: Append transitions and styles to index.css**
  Append the following CSS code to the bottom of `index.css`:

  ```css
  /* ==========================================
     MEDIA DECRYPT LAZY LOADING
     ========================================== */

  @keyframes decrypt-blink {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
  }

  .lazy-blur {
      filter: blur(15px) grayscale(0.3) !important;
      transform: scale(1.05);
      opacity: 0.5;
  }

  /* Base transitions for all storefront media subject to lazy loading */
  .gallery-item, 
  .lab-product-img, 
  .review-photo, 
  .evidence-img, 
  .cta-bg-img, 
  .theater-slide video {
      transition: filter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                  transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                  opacity 0.8s ease;
      will-change: filter, transform, opacity;
  }

  /* Pseudo-element overlays for decrypting HUD indicators */
  .gallery-item.lazy-blur::after,
  .scan-frame.loading-active::after,
  .evidence-frame.loading-active::after,
  .cta-bg-frame.loading-active::after {
      content: "[ DECRYPTING_ASSETS // METADATA_WAIT ]";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font-mono);
      font-size: 8px;
      color: var(--electric-crimson);
      background: rgba(0, 0, 0, 0.8);
      border: 1px solid var(--electric-crimson);
      padding: 6px 12px;
      letter-spacing: 0.05em;
      z-index: 10;
      pointer-events: none;
      animation: decrypt-blink 1.5s infinite ease-in-out;
  }
  ```

- [ ] **Step 2: Commit CSS changes**
  Run: `git commit -am "feat: add lazy loading css transitions and decryption overlay keyframes"`
  Expected: Git commit completes successfully.

### Task 2: HTML Classes Ingestion

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.html`

- [ ] **Step 1: Add lazy-blur class to the slideshow gallery items**
  Locate `.product-showcase-gallery` (around lines 294-300) and add `lazy-blur` class to all 5 `.gallery-item` tags:
  ```html
                                       <div class="gallery-item active lazy-blur" style="background-image: url('assets/valo_08.png');"></div>
                                       <div class="gallery-item lazy-blur" style="background-image: url('assets/valo_09.png');"></div>
                                       ...
  ```

- [ ] **Step 2: Add lazy-blur class to the video player**
  Locate the `<video>` tag inside the media carousel (around line 316) and add `lazy-blur`:
  ```html
                              <video class="lazy-blur" autoplay loop muted playsinline ...>
  ```

- [ ] **Step 3: Add lazy-blur and loading-active classes to the Ingredient Lab section**
  Locate `.scan-frame` and its child `<img>` tag (around lines 428-431) and add `loading-active` to the frame and `lazy-blur` to the image:
  ```html
                          <div class="scan-frame loading-active">
                              ...
                              <img class="lab-product-img lazy-blur" src="assets/valo_07.png" ...>
  ```

- [ ] **Step 4: Add lazy-blur and loading-active classes to the Evidence UGC grid**
  Locate all `.evidence-frame` elements and their child `<img>` tags (around lines 510-545) and update them:
  ```html
                          <div class="evidence-frame loading-active">
                              ...
                              <img class="evidence-img lazy-blur" src="..." ...>
  ```

- [ ] **Step 5: Add classes to final CTA background**
  Locate `.cta-bg-frame` and its child `<img>` (around lines 600-603) and update them:
  ```html
                  <div class="cta-bg-frame loading-active">
                      <img class="cta-bg-img lazy-blur" src="assets/valo_06.png" ...>
  ```

- [ ] **Step 6: Commit HTML changes**
  Run: `git commit -am "feat: add lazy-blur and loading-active classes to html media nodes"`
  Expected: Git commit completes successfully.

### Task 3: JavaScript Load Observers

**Files:**
- Modify: `c:/Users/jabir/Documents/Scraped Data/output/Products/Men's Hair Volume Powder/index.js`

- [ ] **Step 1: Add initMediaDecryptor() invocation to DOMContentLoaded**
  Locate the `DOMContentLoaded` listener in `index.js` (around line 50) and append `initMediaDecryptor();`.

- [ ] **Step 2: Add initMediaDecryptor() definition**
  Append the following function definition to the end of `index.js`:
  ```javascript
  function initMediaDecryptor() {
      // 1. Decrypt standard images
      const lazyImages = document.querySelectorAll('img.lazy-blur');
      lazyImages.forEach(img => {
          const wrapper = img.closest('.loading-active');
          const decrypt = () => {
              img.classList.remove('lazy-blur');
              if (wrapper) wrapper.classList.remove('loading-active');
          };
          if (img.complete) {
              decrypt();
          } else {
              img.addEventListener('load', decrypt);
              img.addEventListener('error', decrypt); // Fail gracefully
          }
      });

      // 2. Decrypt videos
      const lazyVideos = document.querySelectorAll('video.lazy-blur');
      lazyVideos.forEach(video => {
          const decryptVideo = () => {
              video.classList.remove('lazy-blur');
          };
          video.addEventListener('loadeddata', decryptVideo);
          if (video.readyState >= 2) {
              decryptVideo();
          }
      });

      // 3. Decrypt background-image gallery items
      const lazyBgItems = document.querySelectorAll('.gallery-item.lazy-blur');
      lazyBgItems.forEach(item => {
          const style = window.getComputedStyle(item);
          const bgImg = style.backgroundImage;
          if (!bgImg || bgImg === 'none') return;
          
          const urlMatch = bgImg.match(/url\((['"]?)(.*?)\1\)/);
          if (!urlMatch) return;
          
          const imgUrl = urlMatch[2];
          const tempImg = new Image();
          tempImg.onload = () => {
              item.classList.remove('lazy-blur');
          };
          tempImg.onerror = () => {
              item.classList.remove('lazy-blur');
          };
          tempImg.src = imgUrl;
      });
  }
  ```

- [ ] **Step 3: Commit JS changes**
  Run: `git commit -am "feat: implement initMediaDecryptor observers in index.js"`
  Expected: Git commit completes successfully.

### Task 4: Verify Loader Animations

**Files:**
- Manual verification of the browser view.

- [ ] **Step 1: Check media decrypter on browser**
  Reload `http://localhost:52342` (or locally deployed page) with network throttling enabled:
  1. Confirm elements are blurred and display a pulsing `[ DECRYPTING_ASSETS // METADATA_WAIT ]` overlay initially.
  2. Confirm they transition smoothly to focus and full scale when loaded.
