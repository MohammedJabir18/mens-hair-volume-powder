# Hero Tab Noticeability Improvements Spec

## Goal
Improve the visual prominence and interactivity cues of the media deck switcher tabs (PRODUCT_RENDERS, ACTIVE_LOOP, COMPARISON) in the hero section. This ensures users immediately notice they are clickable and understand which view is currently selected.

## Proposed Changes

### [Component Name] Styling & Animations
Modify `index.css` to add enhanced animations, hover states, and active visual markers.

#### [MODIFY] [index.css](file:///c:/Users/jabir/Documents/Scraped%20Data/output/Products/Men's%20Hair%20Volume%20Powder/index.css)
- Implement a pulsating background keyframe animation for the active tab to draw eye focus.
- Add an `::after` pseudo-element on the `.control-tab.active .tab-index` to dynamically display a pulsating dot and `• ACTIVE` tag.
- Add a terminal cursor blink animation `::after` on `.control-tab.active .tab-label`.
- Enhance hover states with scaling, border highlight transitions, and slight background transparency updates.

## Verification Plan

### Manual Verification
- Deploy/run the page locally and hover over the tabs.
- Confirm the hover state transitions smoothly.
- Confirm the active tab displays the pulsating glow background, the `• ACTIVE` badge, and the blinking trailing terminal cursor `_`.
- Verify no cumulative layout shift (CLS) occurs when switching tabs.
