# Design Spec: VALO E-commerce Redesigned Widescreen & Mobile Navbar

> [!NOTE]
> **Status:** APPROVED BY USER
> **Aesthetic Theme:** Clean Technical Luxury hybrid with Brutalist Purchase Hook and subtle Neon-Tokyo glows.

---

## 1. Overview & Objectives
The goal of this task is to replace the simple placeholder header in the storefront with an "Awwwards-winning" premium e-commerce navigation header. 

### Key Adjustments:
1. **Remove** `[ SYSTEM_ACTIVE // v1.0 ]` status marker from the main navigation panel.
2. **Add Navigation Options**: Create 3 lowercase navigation links (`formula`, `reports`, `faq`) linking to their respective sections.
3. **Refine Logo Style**: Shift the `VALO` brand logo to a high-end spaced typographic style (`V A L O`).
4. **Brutalist CTA Trigger**: Add an Option A style high-contrast brutalist `BUY NOW` button to accelerate click-to-bag metrics.
5. **Decelerated Hover Glow**: Implement a subtle, relaxed neon-tokyo pink hover glow on navigation options to feel extremely elegant and premium, respecting user preference for lower-intensity glows.

---

## 2. Component Design & HTML Structure

### File to modify: [index.html](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.html)
We will replace the existing `<header class="tech-header" role="banner">` element with a multi-column navigation row:

```html
<!-- Live Tech Navigation Header -->
<header class="tech-header" role="banner">
    <nav class="nav-row" aria-label="Main Navigation">
        <!-- Spaced minimalist high-end logo -->
        <span class="brand-text">V A L O</span>
        
        <!-- lowercase navigation links with neon-tokyo hover accents -->
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
    <!-- Promotions Marquee Ticker -->
    <div class="ticker-wrapper" role="region" aria-label="Promotions & Shipping Marquee">
        <div class="ticker-track">
            <span class="ticker-text">FREE U.S. SHIPPING ON ORDERS OVER $40 // DUST IT FOR DENSITY // SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="ticker-text" aria-hidden="true">FREE U.S. SHIPPING ON ORDERS OVER $40 // DUST IT FOR DENSITY // SECURE CHECKOUT &nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
    </div>
</header>
```

---

## 3. CSS Visual Architecture & Layout Tokens

### File to modify: [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css)
We will define styles for logo, links, hover transformations, button layout, and desktop overlays.

```css
/* ===== REDESIGNED NAVIGATION HEADER STYLES ===== */

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

/* 1. Spaced V A L O Logo */
.brand-text {
    font-family: var(--font-grotesque);
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 0.35em; /* Spaced text design */
    text-transform: uppercase;
    color: var(--text-light);
    cursor: pointer;
    user-select: none;
}

/* 2. Navigation Links Wrapper & Subtle Glow Hover Options */
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

/* Elegant, relaxed Neon-Tokyo pink text-shadow glow */
.nav-link:hover {
    color: var(--electric-crimson);
    text-shadow: 0 0 4px rgba(225, 29, 72, 0.7); /* Subtle, elegant glow */
}

/* Subtle Crimson Slide Underline */
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

/* 3. Brutalist BUY NOW Button */
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

/* 4. Desktop Adjustments inside @media (min-width: 768px) */
@media (min-width: 768px) {
    .nav-row {
        padding: 0 40px 8px 40px; /* Aligns perfectly with desktop grid margin */
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
}
```

---

## 4. JS High-Performance Scroller Integration

### File to modify: [index.js](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.js)
We will add scroll anchors linking to page layout sections:
1. `formula` link triggers scroll to **specs section** or **above the fold hero**.
2. `reports` link triggers scroll to **social proof section**.
3. `faq` link triggers scroll to **faq objection crusher section**.
4. `BUY NOW` button triggers scroll to the **bundle selector** inside the hero block.

```javascript
function initNavScroll() {
    const buyBtn = document.getElementById('nav-buy-trigger');
    const links = Array.from(document.querySelectorAll('.nav-link'));

    // 1. Buy Now scroll action
    if (buyBtn) {
        buyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('.bundle-selector-container');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Add focus ring to checkout triggers for keyboard access
                const trigger = document.getElementById('hero-checkout-trigger');
                if (trigger) trigger.focus({ preventScroll: true });
            }
        });
    }

    // 2. Navigation links scroll action
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

---

## 5. Verification & Quality Safeguards

1. **Compilation Check**: Confirm no lint or syntax issues inside `index.js`.
2. **Keyboard Accessibility**: Ensure navigation links and the purchase trigger button are accessible via keyboard tabs and trigger on `Enter`/`Space` keys.
3. **Motion-Reduced Degradation**: Under `prefers-reduced-motion` settings, standard smooth scroll coordinates slide instantly without transitions.
4. **Mobile Layout Constraints**: Verify the navbar row fits inline at `320px` width without overflows or stacked vertical wrapping.
