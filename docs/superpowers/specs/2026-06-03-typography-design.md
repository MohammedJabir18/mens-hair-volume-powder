# Spec: Storefront Typography & Visual Redesign

This specification details the transition of the storefront from its current **Industrial Brutalist / Hacker** style to a high-converting, modern **Premium DTC (Direct-To-Consumer)** design with **Prestige Gold** accents.

## 1. Objectives
- **Remove CCTV/Hacker Style**: Strip all occurrences of `[]`, `//`, technical labels, and monospace telemetry text.
- **Premium DTC Typography**: Implement the **Outfit** (headings) and **Inter** (body) font system for high-converting visual appeal.
- **Prestige Gold Aesthetics**: Replace the aviation crimson highlights with a premium warm gold theme.
- **Refine Layout Containers**: Transition from rigid sharp borders to modern rounded corners (`8px` to `12px`) and smooth micro-interactions.

---

## 2. Typography & Fonts
- **Font Imports (Google Fonts)**:
  - Heading font: `Outfit` (weights 700, 900)
  - Body & Nav font: `Inter` (weights 400, 500, 600)
- **CSS Variable Updates**:
  ```css
  --font-heading: 'Outfit', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  ```

---

## 3. Brand Tone & Text Replacements
All technical telemetry phrases will be rewritten to clean, high-conversion marketing copy:

| Source (Hacker Style) | Target (Premium DTC Style) |
| :--- | :--- |
| `VALO // ROOT-LOCK` | `VALO Root-Lock` |
| `[ TYPE: HIGH-CONVERSION SALES ENGINE ]` | `Premium Hair Density Formula` |
| `[ STATUS: ACTIVE // 1.0 ]` | `Guaranteed In Stock` |
| `FREE U.S. SHIPPING ... // DUST IT ... //` | `Free U.S. Shipping on orders over $40 • Dust it for density • Secure checkout` |
| `[ PRODUCT: ROOT-LOCK // TYPE: VOLUME POWDER ]` | `Volume & Lift Booster` |
| `[ CHOOSE CAPSULE DUO OFFER // INCREASE DENSITY ]` | `Select Your Hair Density Pack` |
| `MOST POPULAR // SAVE $10` | `Most Popular • Save $10` |
| `BEFORE // FLAT` | `Before: Flat & Thin` |
| `AFTER // VALO` | `After: Fuller & Thick` |
| `[ COMPOUND_ANALYSIS // ACTIVE INGREDIENTS ]` | `Formulated with Clean Ingredients` |
| `[ USER // @MARK_T ]` | `Mark T.` |
| `[ FILED: 2 WEEKS AGO // PRODUCT: 2X PACK ]` | `Verified Purchase • 2 weeks ago` |

---

## 4. Visual Styles & Colors
- **Colors**:
  - Primary Background: `#050505` (Deep Obsidian)
  - Card Background: `#0d0d0f` (Rich Charcoal)
  - Accent Gold: `#ca8a04` (Warm Gold)
  - Hover Gold: `#a16207` (Darker Gold)
  - Borders: `#27272a` (Subtle Zinc border)
- **Borders & Corners**:
  - Replace `border-radius: 0px` with `border-radius: 12px` on cards, tiles, and input fields.
  - Buttons will use `border-radius: 8px` and replace heavy blocky shadow styling with a clean, hardware-accelerated subtle shadow transition.

---

## 5. Verification Plan
- **Aesthetic Validation**: Open the modified storefront in the browser to ensure font rendering, layout, spacing, and transitions work flawlessly.
- **Copy Integrity**: Verify that no occurrences of hacker-style characters (`[` or `]` or `//`) remain in user-visible content.
