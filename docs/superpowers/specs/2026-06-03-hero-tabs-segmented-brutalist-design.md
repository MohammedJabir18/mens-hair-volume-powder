# Hero Switcher Segmented Brutalist Design Spec

## Goal
Redesign the hero section media deck tabs switcher (PRODUCT_RENDERS, ACTIVE_LOOP, COMPARISON) to use a segmented brutalist layout with a physical gap from the media canvas. This improves interactive noticeability and fits the Industrial Brutalist design system.

## Proposed Changes

### [Component Name] Switcher Styling
Modify `index.css` to implement the segmented brutalist cards layout and clean up the previously appended noticeability overrides.

#### [MODIFY] [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css)
- Add a `margin-top: 16px` and `gap: 8px` to `.theater-controls` to separate it from the canvas and space out the buttons.
- Update `.control-tab` base styling to have a full `var(--border-thin)` on all sides and a card background (`var(--bg-card)`).
- Update `.control-tab:hover` to scale to `1.02` and highlight the border.
- Update `.control-tab.active` to set background to `var(--electric-crimson)`, border to `#fff`, add a `3px 3px 0px #fff` brutalist shadow, and apply `transform: translate(-3px, -3px)`.
- Remove the previously appended `@keyframes` and `.control-tab` overriding styles at the end of the file.

## Verification Plan

### Manual Verification
- Deploy/run the page locally.
- Inspect the hero control deck switcher.
- Verify there is a visible `16px` gap between the video/render canvas and the buttons.
- Verify the buttons are separated by `8px` spacing.
- Verify hovering over a tab scales it and highlights the border white.
- Verify the active tab turns crimson, gets a solid white shadow, and translates `-3px, -3px` for a 3D lift effect.
