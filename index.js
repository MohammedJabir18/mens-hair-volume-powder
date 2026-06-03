/* index.js */
document.addEventListener('DOMContentLoaded', () => {
    initDragSlider();
    initBundleSelector();
    initStickyDrawer();
    initMediaTheater();
    initFAQAccordion();
    initFinalCTA();
    initNavScroll();
    initLazyMedia();
});

function initDragSlider() {
    const slider = document.getElementById('before-after-slider');
    const beforeImg = document.getElementById('before-image');
    const handle = document.getElementById('slider-handle');

    if (!slider || !beforeImg || !handle) return;

    let rect = null;
    let currentPercent = 50;
    let ticking = false;

    const updateSlider = (percent) => {
        // Clamp percentage between 0 and 100
        percent = Math.max(0, Math.min(100, percent));
        currentPercent = percent;
        
        beforeImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        handle.style.left = `${percent}%`;
        
        // Update WAI-ARIA accessibility state
        slider.setAttribute('aria-valuenow', Math.round(percent));
    };

    const onDrag = (clientX) => {
        if (!rect) {
            rect = slider.getBoundingClientRect();
        }
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        updateSlider(percent);
    };

    const dragMove = (e) => {
        // Prevent default mobile scrolling / navigation gestures while dragging the slider
        if (e.cancelable) {
            e.preventDefault();
        }
        
        if (!ticking) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            window.requestAnimationFrame(() => {
                onDrag(clientX);
                ticking = false;
            });
            ticking = true;
        }
    };

    const stopDragging = () => {
        slider.classList.remove('is-dragging');
        
        // Unbind window event listeners when drag is inactive to maximize CPU efficiency
        window.removeEventListener('mousemove', dragMove);
        window.removeEventListener('mouseup', stopDragging);
        window.removeEventListener('touchmove', dragMove);
        window.removeEventListener('touchend', stopDragging);
        
        rect = null; // Clear cached bounding rect so resize/orientation changes are handled on next drag
    };

    const startDragging = (e) => {
        // Left-click only for mouse interaction
        if (e.type === 'mousedown' && e.button !== 0) return;
        
        slider.classList.add('is-dragging');
        
        // Cache the slider bounding box immediately at drag start to completely eliminate layout thrashing inside mousemove
        rect = slider.getBoundingClientRect();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        onDrag(clientX);

        // Bind drag listeners to the window so the drag continues smoothly if the pointer drifts outside the slider container
        window.addEventListener('mousemove', dragMove);
        window.addEventListener('mouseup', stopDragging);
        
        // Bind touch events with passive: false to allow blocking default scroll behavior
        window.addEventListener('touchmove', dragMove, { passive: false });
        window.addEventListener('touchend', stopDragging);
        
        if (e.cancelable) {
            e.preventDefault();
        }
    };

    // Initialize pointer-down event triggers
    slider.addEventListener('mousedown', startDragging);
    slider.addEventListener('touchstart', startDragging, { passive: false });

    // Keyboard accessibility navigation (compliant with WAI-ARIA slider standard)
    slider.addEventListener('keydown', (e) => {
        let step = 0;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            step = -5;
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            step = 5;
        } else if (e.key === 'Home') {
            step = -currentPercent;
        } else if (e.key === 'End') {
            step = 100 - currentPercent;
        }

        if (step !== 0) {
            e.preventDefault();
            updateSlider(currentPercent + step);
        }
    });
}

function initBundleSelector() {
    const cards = Array.from(document.querySelectorAll('.bundle-card'));
    const checkoutBtn = document.getElementById('hero-checkout-trigger');
    let selectedBundle = 2; // Default 2x Double Density

    if (!cards.length || !checkoutBtn) return;

    const selectCard = (card) => {
        cards.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-checked', 'false');
            c.setAttribute('tabindex', '-1');
        });
        
        card.classList.add('active');
        card.setAttribute('aria-checked', 'true');
        card.setAttribute('tabindex', '0');
        
        selectedBundle = Number(card.getAttribute('data-bundle'));
        const price = card.getAttribute('data-price');
        const titleEl = card.querySelector('.bundle-title');
        const title = titleEl ? titleEl.innerText : '';
        checkoutBtn.innerText = `ADD ${title} TO BAG • $${price}`;
        
        // Sync with Sticky Drawer if active
        updateStickyFooterState(selectedBundle, price, title);
    };

    cards.forEach((card, index) => {
        // Mouse click selector
        card.addEventListener('click', () => {
            selectCard(card);
        });

        // Keyboard arrow and activation controls
        card.addEventListener('keydown', (e) => {
            let nextIndex = index;
            let shouldSelect = false;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextIndex = (index + 1) % cards.length;
                shouldSelect = true;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                nextIndex = (index - 1 + cards.length) % cards.length;
                shouldSelect = true;
            } else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                shouldSelect = true;
            }

            if (shouldSelect) {
                const targetCard = cards[nextIndex];
                selectCard(targetCard);
                targetCard.focus();
            }
        });
    });

    checkoutBtn.addEventListener('click', () => {
        triggerSecureCheckout(selectedBundle);
    });
}

function triggerSecureCheckout(bundleId) {
    alert(`Initializing Secure Stripe Checkout for Bundle #${bundleId}...`);
}

function updateStickyFooterState(bundleId, price, title) {
    const footerPrice = document.getElementById('sticky-price-display');
    const footerBtn = document.getElementById('sticky-checkout-btn');
    const footerTitle = document.getElementById('sticky-title-display');
    if (footerPrice && footerBtn) {
        footerPrice.innerText = `$${price}`;
        footerBtn.setAttribute('data-active-bundle', bundleId);
    }
    if (footerTitle && title) {
        footerTitle.innerText = `VALO ${title}`;
    }
}

function initStickyDrawer() {
    const drawer = document.getElementById('sticky-checkout-drawer');
    const checkoutBtn = document.getElementById('sticky-checkout-btn');

    if (!drawer || !checkoutBtn) return;

    // Use hardware-optimized GSAP ScrollTrigger if available to offload thread operations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: "#main-content",
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

// Register GSAP ScrollTrigger plugin and initialize entrance animations if GSAP is loaded
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Detect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Simplified fade-in animations with zero movement to respect accessibility guidelines
        gsap.from(".main-headline", {
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
        });

        gsap.from(".spec-tile", {
            scrollTrigger: {
                trigger: ".specs-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
        });

        gsap.from(".step-card", {
            scrollTrigger: {
                trigger: ".workflow-steps",
                start: "top 85%"
            },
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out"
        });

        // Simplified reveals for new sections
        gsap.from('.compound-card', {
            scrollTrigger: { trigger: '.lab-compounds', start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
        });

        gsap.from('.stat-cell', {
            scrollTrigger: { trigger: '.proof-stats-bar', start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
        });

        gsap.from('.review-block', {
            scrollTrigger: { trigger: '.proof-feed', start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
        });

        gsap.from('.evidence-item', {
            scrollTrigger: { trigger: '.evidence-grid', start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out'
        });

        gsap.from('.faq-item', {
            scrollTrigger: { trigger: '.faq-list', start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out'
        });

        gsap.from('.urgency-cell', {
            scrollTrigger: { trigger: '.urgency-grid', start: 'top 90%', toggleActions: 'play none none none' },
            opacity: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out'
        });

        gsap.from('.cta-content', {
            scrollTrigger: { trigger: '.final-cta-section', start: 'top 70%', toggleActions: 'play none none none' },
            opacity: 0, duration: 0.5, ease: 'power2.out'
        });

        // Purity bars (still animate width even in reduced motion)
        document.querySelectorAll('.purity-fill').forEach(bar => {
            const purity = bar.getAttribute('data-purity') || 0;
            gsap.to(bar, {
                scrollTrigger: { trigger: bar, start: 'top 90%', toggleActions: 'play none none none' },
                width: purity + '%', duration: 1, ease: 'power2.out'
            });
        });
    } else {
        // Full motion-rich and hardware-accelerated animations
        gsap.from(".main-headline", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power4.out"
        });

        gsap.from(".spec-tile", {
            scrollTrigger: {
                trigger: ".specs-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)"
        });

        gsap.from(".step-card", {
            scrollTrigger: {
                trigger: ".workflow-steps",
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Compound cards reveal
        gsap.from('.compound-card', {
            scrollTrigger: { trigger: '.lab-compounds', start: 'top 85%', toggleActions: 'play none none none' },
            x: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out'
        });

        // Stats bar reveal
        gsap.from('.stat-cell', {
            scrollTrigger: { trigger: '.proof-stats-bar', start: 'top 85%', toggleActions: 'play none none none' },
            y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
        });

        // Review blocks reveal
        gsap.from('.review-block', {
            scrollTrigger: { trigger: '.proof-feed', start: 'top 85%', toggleActions: 'play none none none' },
            y: 30, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out'
        });

        // Evidence gallery items reveal
        gsap.from('.evidence-item', {
            scrollTrigger: { trigger: '.evidence-grid', start: 'top 85%', toggleActions: 'play none none none' },
            scale: 0.95, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)'
        });

        // FAQ items reveal
        gsap.from('.faq-item', {
            scrollTrigger: { trigger: '.faq-list', start: 'top 85%', toggleActions: 'play none none none' },
            x: -20, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out'
        });

        // Urgency cells reveal
        gsap.from('.urgency-cell', {
            scrollTrigger: { trigger: '.urgency-grid', start: 'top 90%', toggleActions: 'play none none none' },
            y: 15, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
        });

        // Final CTA content reveal
        gsap.from('.cta-content', {
            scrollTrigger: { trigger: '.final-cta-section', start: 'top 70%', toggleActions: 'play none none none' },
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
        });

        // Purity bars fill animation
        document.querySelectorAll('.purity-fill').forEach(bar => {
            const purity = bar.getAttribute('data-purity') || 0;
            gsap.to(bar, {
                scrollTrigger: { trigger: bar, start: 'top 90%', toggleActions: 'play none none none' },
                width: purity + '%', duration: 1.5, ease: 'power2.out'
            });
        });
    }
}

function initMediaTheater() {
    const theater = document.getElementById('valo-media-theater');
    const slides = Array.from(document.querySelectorAll('.theater-slide'));
    const tabs = Array.from(document.querySelectorAll('.control-tab'));
    const video = document.getElementById('ugc-video');
    
    if (!theater || !slides.length || !tabs.length) return;

    let activeIndex = 0;

    const playVideo = () => {
        if (video) {
            video.currentTime = 0;
            video.play().catch(err => console.log('Autoplay blocked by browser policy:', err));
        }
    };

    const pauseVideo = () => {
        if (video) {
            video.pause();
        }
    };

    const updateActiveSlide = (index) => {
        // Reset old active slide/tab
        slides[activeIndex].classList.remove('active');
        tabs[activeIndex].classList.remove('active');
        tabs[activeIndex].setAttribute('aria-selected', 'false');

        // Pause video if moving away from Slide 2
        if (activeIndex === 1) {
            pauseVideo();
        }

        // Update active pointer
        activeIndex = index;

        // Set new active slide/tab
        slides[activeIndex].classList.add('active');
        tabs[activeIndex].classList.add('active');
        tabs[activeIndex].setAttribute('aria-selected', 'true');

        // Play video if moving to Slide 2
        if (activeIndex === 1) {
            playVideo();
        }
    };

    // Bind tab clicks for manual navigation
    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            if (activeIndex === i) return;
            updateActiveSlide(i);
        });
    });

    // Gallery Arrows trigger for Slide 3
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const prevBtn = document.querySelector('.gallery-arrow.prev');
    const nextBtn = document.querySelector('.gallery-arrow.next');
    let galleryIndex = 0;

    if (galleryItems.length && prevBtn && nextBtn) {
        const updateGallery = (idx) => {
            galleryItems[galleryIndex].classList.remove('active');
            galleryIndex = (idx + galleryItems.length) % galleryItems.length;
            galleryItems[galleryIndex].classList.add('active');
        };

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering tab click bubble
            updateGallery(galleryIndex - 1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateGallery(galleryIndex + 1);
        });
        
        // Auto rotate gallery images when Slide 1 is active (keeps gallery alive dynamically!)
        setInterval(() => {
            if (activeIndex === 0) {
                updateGallery(galleryIndex + 1);
            }
        }, 5000);
    }
}

function initFAQAccordion() {
    const faqItems = Array.from(document.querySelectorAll('.faq-item'));
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-trigger');
        const answer = item.querySelector('.faq-content');
        const toggleIcon = item.querySelector('.faq-icon');

        if (!questionBtn || !answer || !toggleIcon) return;

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items first (Exclusive Accordion for elegant e-commerce flow)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-trigger');
                    const otherAnswer = otherItem.querySelector('.faq-content');

                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) {
                        otherAnswer.setAttribute('aria-hidden', 'true');
                        otherAnswer.style.maxHeight = null;
                    }
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                questionBtn.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

function initFinalCTA() {
    const finalBtn = document.getElementById('final-checkout-btn');
    const heroBtn = document.getElementById('hero-checkout-trigger');
    const cards = Array.from(document.querySelectorAll('.bundle-card'));

    if (!finalBtn) return;

    let selectedBundle = 2; // Default Double Density
    const activeCard = document.querySelector('.bundle-card.active');
    if (activeCard) {
        selectedBundle = Number(activeCard.getAttribute('data-bundle')) || 2;
    }

    const syncFinalCTACopy = (price) => {
        finalBtn.innerText = `Secure Checkout • $${price}`;
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            selectedBundle = Number(card.getAttribute('data-bundle')) || 2;
            const price = card.getAttribute('data-price') || '49.98';
            syncFinalCTACopy(price);
        });
    });

    finalBtn.addEventListener('click', () => {
        triggerSecureCheckout(selectedBundle);
    });

    initStockCounter();
}

function initStockCounter() {
    const stockEl = document.getElementById('stock-counter');
    if (!stockEl) return;

    let stockUnits = 127;
    
    const interval = setInterval(() => {
        if (Math.random() > 0.6) {
            stockUnits -= Math.floor(Math.random() * 3) + 1;
            if (stockUnits < 12) {
                stockUnits = 12;
                clearInterval(interval);
            }
            stockEl.innerText = `${stockUnits} UNITS`;
            
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
            const target = document.getElementById('bundle-selector');
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
            
            if (href === '#main-content') {
                target = document.getElementById('main-content');
            } else {
                target = document.querySelector(href);
            }
            
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initLazyMedia() {
    // 1. Observe and handle normal image tags
    const imgs = document.querySelectorAll('img.lazy-blur');
    imgs.forEach(img => {
        const onImgLoad = () => {
            img.classList.remove('lazy-blur');
            img.removeEventListener('load', onImgLoad);
            img.removeEventListener('error', onImgLoad);
            const parent = img.closest('.loading-active');
            if (parent) {
                parent.classList.remove('loading-active');
            }
        };

        if (img.complete) {
            onImgLoad();
        } else {
            img.addEventListener('load', onImgLoad, { once: true });
            img.addEventListener('error', onImgLoad, { once: true });
        }
    });

    // 2. Observe and handle background images on gallery items
    const galleryItems = document.querySelectorAll('.gallery-item.lazy-blur');
    galleryItems.forEach(item => {
        const bgImgStyle = item.style.backgroundImage || window.getComputedStyle(item).backgroundImage;
        if (bgImgStyle && bgImgStyle !== 'none') {
            const urlMatch = bgImgStyle.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch && urlMatch[1]) {
                const src = urlMatch[1];
                const img = new Image();
                const onBgLoad = () => {
                    item.classList.remove('lazy-blur');
                    img.onload = null;
                    img.onerror = null;
                };
                img.onload = onBgLoad;
                img.onerror = onBgLoad;
                img.src = src;
                if (img.complete) {
                    onBgLoad();
                }
            } else {
                item.classList.remove('lazy-blur');
            }
        } else {
            item.classList.remove('lazy-blur');
        }
    });

    // 3. Observe and handle video tags
    const videos = document.querySelectorAll('video.lazy-blur');
    videos.forEach(video => {
        const onVideoLoad = () => {
            video.classList.remove('lazy-blur');
            video.removeEventListener('loadeddata', onVideoLoad);
            video.removeEventListener('canplay', onVideoLoad);
            video.removeEventListener('error', onVideoLoad);
            const parent = video.closest('.loading-active');
            if (parent) {
                parent.classList.remove('loading-active');
            }
        };

        if (video.readyState >= 2) {
            onVideoLoad();
        } else {
            video.addEventListener('loadeddata', onVideoLoad, { once: true });
            video.addEventListener('canplay', onVideoLoad, { once: true });
            video.addEventListener('error', onVideoLoad, { once: true });
        }
    });
}

