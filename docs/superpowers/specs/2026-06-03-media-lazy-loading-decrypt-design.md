# Media Lazy Loading & Decrypt Animation Design Spec

## Goal
Implement a premium, high-performance "Matrix Decrypt Unblur" animation for all primary image and video media on the storefront. This optimizes loading visual stability, prevents layout jumps, and enforces a stunning Neo-Tokyo technical look.

## Proposed Changes

### Media Layout & Transitions
Modify `index.html`, `index.css`, and `index.js` to support lazy loading with visual blur/zoom transition states.

#### [MODIFY] [index.html](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.html)
- Add the `lazy-blur` class to critical storefront media tags:
  - Inside the `.product-showcase-gallery` `.gallery-item` mock backgrounds. Wait, the gallery items use `background-image` inline styles instead of `<img>` tags!
    Ah! If they use `background-image`, we can apply `.lazy-blur` directly to `.gallery-item` itself! Since the background image is loaded by the browser, we can detect its load by creating a temporary Image object in JS.
  - The Lab Science Closeup image (`assets/valo_07.png`).
  - Customer review photos (`assets/valo_01.png`, etc.).
  - UGC evidence gallery images.
  - Widescreen final CTA background image.
  - Video tags (`video_5.mp4` loop).

#### [MODIFY] [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css)
- Create base styles for `.lazy-blur`:
  ```css
  .lazy-blur {
      filter: blur(15px) grayscale(0.3) !important;
      transform: scale(1.05);
      opacity: 0.5;
  }
  
  /* Selectors for elements that support transitions */
  .gallery-item, .lab-product-img, .review-photo, .evidence-img, .cta-bg-img, .theater-slide video {
      transition: filter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                  transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                  opacity 0.8s ease;
      will-change: filter, transform, opacity;
  }
  ```
- Implement `[ DECRYPTING... ]` pseudoelement overlays on wrappers (`.gallery-item.lazy-blur`, `.scan-frame.loading-active`, `.evidence-frame.loading-active`, etc.) using `@keyframes blink` animation.

#### [MODIFY] [index.js](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.js)
- Wire load event listeners inside a new function `initMediaDecryptor()`:
  - For `<img>` tags: check `complete` and bind `load` listener to remove `.lazy-blur` (and wrapper loading state).
  - For `<video>` tags: bind `loadeddata` to remove `.lazy-blur`.
  - For `background-image` elements (like `.gallery-item`): load image programmatically in JS via `new Image()` and remove `.lazy-blur` on success.

## Verification Plan

### Manual Verification
- Deploy/run the page locally.
- Throttle the network to "Fast 3G" or "Slow 3G" in Chrome DevTools.
- Verify that before images and videos finish loading, they are blurred, dimmed, and display a pulsing red `[ DECRYPTING... ]` monospace overlay.
- Verify that once loaded, the overlays vanish, and the images transition to crisp focus and full scale via a smooth unblur easing.
