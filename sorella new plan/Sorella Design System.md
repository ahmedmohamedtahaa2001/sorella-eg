> Design system for the Sorella storefront rebuild. Built on the two anchor colors provided (`#2C2C2C` ink, `#F5F5F5` parchment), expanded into a full ink-to-paper ladder, and paired with a brand-gold accent carried over from the existing Sorella UI kit (`#C79C5A`, Fraunces).
> 

## Overview

Sorella's system runs on one rule: **everything is ink and paper — color is a privilege earned only by a tag.**

The canvas is near-white, the ink is near-black, and 90% of the interface — headings, body copy, buttons, borders, product cards — lives on that monochrome ladder, exactly like the Geist reference. But Sorella isn't a dev tool; it's a perfume brand, and perfume is sold on mood, season, occasion, and note. So instead of confining color to a single hero gradient (Vercel's move), Sorella confines color to a single UI atom: **the tag chip.** Every mood, season, occasion, sillage level, concentration, and fragrance family gets exactly one hue, used nowhere else in the interface. The result: a storefront that reads as restrained, editorial, almost monastic — until you look at a product's tags, which bloom like a spice rack against all that grey.

The existing Sorella brand mark (Fraunces serif, `#C79C5A` gold) is preserved as the *one* neutral-breaking accent for CTAs, links, and moments of emphasis — gold is allowed to touch chrome; the tag palette is not.

**Key Characteristics:**

- A 16-step ink→paper ladder anchored on the brand's own `#2C2C2C` / `#F5F5F5` — far more tonal range than a simple black/white/grey triad.
- Color is confined to exactly one component: the tag chip. No other surface, icon, or illustration carries hue.
- Every canonical tag value (mood, season, occasion, sillage, concentration, fragrance family, gender positioning) owns one fixed, never-reused hex.
- Fraunces (serif, display) + Inter (sans, UI/body) — carrying the emotional warmth of perfume copy against the functional clarity of a storefront.
- Sorella Gold (`#C79C5A`) is the single chrome-level accent: CTAs, links, focus rings, price emphasis.
- Rounder, softer geometry than a dev-tool reference — 12–24px radii, pill CTAs — because perfume is felt, not engineered.

---

## Colors

### The Ink & Paper Ladder (neutral scale)

Anchored on the two brand colors supplied — `{colors.ink-800}` (#2C2C2C) and `{colors.paper-50}` (#F5F5F5) — expanded into a full 16-step scale so text, borders, and surfaces each get their own precise tier instead of reusing two flat greys everywhere.

!image.png

| Token | Hex | Name | Use |
| --- | --- | --- | --- |
| `{colors.ink-1000}` | #0A0A0A | Absolute | Rare — pure-black emphasis moments only (e.g. sold-out overlay text) |
| `{colors.ink-900}` | #171717 | Void | Deepest heading tier, footer background option |
| `{colors.ink-850}` | #212121 | Onyx | Pressed/active state of primary buttons |
| `{colors.ink-800}` | **#2C2C2C** | **Ink** (brand primary) | Default headings, primary button fill, logo |
| `{colors.ink-700}` | #3D3D3D | Graphite | High-emphasis body text |
| `{colors.ink-600}` | #525252 | Smoke | Standard paragraph copy |
| `{colors.ink-500}` | #6B6B6B | Ash | Secondary text, nav links |
| `{colors.ink-400}` | #8A8A8A | Stone | Captions, metadata, icon default |
| `{colors.ink-300}` | #ABABAB | Mist | Placeholder text, disabled labels |
| `{colors.ink-200}` | #C9C9C9 | Fog | Disabled borders, dividers on dark |
| `{colors.ink-150}` | #DCDCDC | Haze | Default hairline border |
| `{colors.ink-100}` | #E8E8E8 | Linen | Input fill, inset wells |
| `{colors.ink-75}` | #EFEFEF | Petal | Alternating panel background |
| `{colors.paper-50}` | **#F5F5F5** | **Parchment** (brand primary) | Default page canvas |
| `{colors.paper-25}` | #FAFAFA | Snow | Card background on Parchment canvas |
| `{colors.paper-0}` | #FFFFFF | Pure | Elevated surfaces, modals, product image背景 |

> Rule of thumb: text sits at `ink-900→ink-500`, structure (borders/dividers) sits at `ink-200→ink-150`, surfaces sit at `paper-0→ink-75`. Never use `#000000` or pure `#FFFFFF` for text/background — always the nearest ladder step.
> 

### Brand Accent — Sorella Gold

Carried over from the existing Sorella UI kit for continuity across all touchpoints.

!image.png

| Token | Hex | Use |
| --- | --- | --- |
| `{colors.gold-deep}` | #9C7A3E | Pressed/active CTA state |
| `{colors.gold}` | #C79C5A | Primary accent — CTAs, links, price emphasis, focus ring |
| `{colors.gold-soft}` | #E8D4B0 | Hover wash, selected-state fill |
| `{colors.gold-whisper}` | #F5ECD9 | Barely-there background tint (e.g. "Bestseller" ribbon fill) |

### Semantic / System Colors

Kept deliberately separate from the tag palette below — these communicate *system state*, not *product mood*, so they must never collide with a tag hue.

!image.png

| Token | Hex | Use |
| --- | --- | --- |
| `{colors.success}` | #3F8A5C | In Stock |
| `{colors.warning}` | #D69A2D | Low Stock |
| `{colors.unavailable}` | #8C5A5A | Sold Out |
| `{colors.info}` | #4A7FA5 | Pre-Order |
| `{colors.upcoming}` | #7B6BA0 | Coming Soon |
| `{colors.backorder}` | #B5652D | Backorder |
| `{colors.error}` | #C0392B | Form validation / destructive actions |

---

### The Tag Color System

**Core rule:** color exists on this storefront *only* inside a tag chip. Every value below is locked — never reassigned, never reused for anything else in the UI. Designers/devs should treat this table exactly like the Canonical Tag Dictionary: a fixed source of truth, updated deliberately, never ad hoc.

#### Mood (16) — the emotional core of the product page

Each mood reads as a distinct, editorial-but-wearable color — muted enough to sit next to Ink and Parchment without fighting them.

!image.png

| Tag | Hex | Tag | Hex |
| --- | --- | --- | --- |
| Confident | #B5482E (Terracotta) | Mysterious | #4B2545 (Deep Plum) |
| Warm | #C0813A (Amber Clay) | Sophisticated | #566073 (Slate Blue) |
| Fresh | #4E9C86 (Eucalyptus) | Bold | #A8283E (Crimson) |
| Calming | #8CA593 (Sage Grey) | Comforting | #D6A45C (Honey) |
| Seductive | #7A1F3D (Wine) | Clean | #9FC1C9 (Powder Blue) |
| Energizing | #E0A526 (Marigold) | Sensual | #5E1F2E (Merlot) |
| Elegant | #9C7B8C (Mauve) | Romantic | #C97B8C (Dusty Rose) |
| Nocturnal | #2E3157 (Midnight Indigo) | Playful | #E8735A (Coral) |

#### Season (6) — mapped to the light of each season, "All-Season" deliberately neutral

!image.png

| Tag | Hex |
| --- | --- |
| Summer | #E8B93E (Citrus Yellow) |
| Winter | #A8C5D6 (Ice Blue) |
| Spring | #E3A9B8 (Blossom Pink) |
| Autumn | #B5652D (Burnt Sienna) |
| Spring/Autumn (Transitional) | #B8A088 (Sand Taupe) |
| All-Season | `{colors.ink-400}` #8A8A8A — *intentionally pulled from the neutral ladder, not the color wheel: no season bias = no hue* |

#### Time of Day (4) — a literal light-to-dark gradient

!image.png

| Tag | Hex |
| --- | --- |
| Day | #F0C555 (Sunlit Gold) |
| Evening | #C97A3E (Amber Dusk) |
| Night | #1F2847 (Deep Navy) |
| Day-to-Night | Dual-tone chip: #F0C555 → #1F2847 gradient fill — the only tag allowed a gradient, because it *is* a transition |

#### Occasion (10)

!image.png

| Tag | Hex | Tag | Hex |
| --- | --- | --- | --- |
| Formal | `{colors.ink-900}` #171717 | Wedding | #E8D9CE (Ivory Blush) |
| Casual | #5B7C99 (Denim Blue) | Everyday | #A68A72 (Warm Taupe) |
| Office | `{colors.ink-600}` #525252 | Party/Night Out | #7B3FA0 (Electric Violet) |
| Date Night | #8C2F4A (Wine Rose) | Travel | #4A8FA0 (Sky Teal) |
| Special Occasion | #D4AF7A (Champagne Gold) | Gym/Active | #4C9A5B (Signal Green) |

#### Sillage (4) — a single-hue intensity ramp: pale = stays close to skin, deep = fills the room

!image.png

| Tag | Hex |
| --- | --- |
| Intimate | #E8D2AE |
| Moderate | #D6A25C |
| Strong | #B5762E |
| Enormous | #94481E |

#### Concentration (5) — a second intensity ramp in a *different* hue family (teal) so it's never confused with Sillage

!image.png

| Tag | Hex |
| --- | --- |
| Eau Fraiche | #C9D6D9 |
| Eau de Cologne (EDC) | #A9BFC4 |
| Eau de Toilette (EDT) | #7E9CA3 |
| Eau de Parfum (EDP) | #4E7480 |
| Parfum/Extrait | #2C4750 |

#### Fragrance Family (20) — mapped to the classic Fragrance Wheel families, so power users' intuitions ("woody = brown", "oriental = gold") hold true

!image.png

| Tag | Hex | Tag | Hex |
| --- | --- | --- | --- |
| Floral | #D98CA3 | Water/Aquatic | #4FA8B5 |
| Soft Floral | #E3B4C2 | Fruity | #C4485A |
| Floral Oriental | #C77A9C | Aromatic Fougere | #7A8F6E |
| Soft Oriental | #D9A87E | Gourmand | #A6712E |
| Oriental | #C0812E | Chypre | #6E6B3D |
| Woody Oriental | #9C5E32 | Leather | #4A2E22 |
| Wood | #6B4530 | Spicy | #A3332A |
| Mossy Woods | #5C6B3E | Powdery | #B3A3C2 |
| Dry Woods | #8A6544 | Aldehydic | #C7CDD1 |
| Citrus | #C4D142 | Green | #5F8A4D |

#### Gender Positioning (5) — kept deliberately quiet; "Unisex" pulled from the neutral ladder on purpose

!image.png

| Tag | Hex |
| --- | --- |
| Masculine | #3A4550 |
| Masculine-Leaning | #5C6570 |
| Unisex | `{colors.ink-700}` #3D3D3D |
| Feminine-Leaning | #C9A0A8 |
| Feminine | #D98CA0 |

---

## Typography

### Font Family

Two faces, split by role — carried over from the existing Sorella brand kit:

- **Fraunces** (serif, display) — hero headlines, product names, section titles. Its warm, slightly wonky serif gives the emotional/editorial voice fragrance copy needs (this is the section 1.1 "Olfactory Journey" and value-proposition copy).
- **Inter** (sans, UI/body) — everything functional: nav, buttons, body copy, price, form fields, table cells. Clean and quiet so it never competes with Fraunces or the tag colors.
- **JetBrains Mono** (mono, small use only) — SKU codes, cost-per-spray calculations, stock counters — the "technical spec" moments, echoed like a fragrance formula code.

### Hierarchy

| Token | Font | Size | Weight | Line Height | Letter Spacing | Use |
| --- | --- | --- | --- | --- | --- | --- |
| `{typography.display-xl}` | Fraunces | 56px | 500 | 60px | -0.5px | Hero headline |
| `{typography.display-lg}` | Fraunces | 36px | 500 | 42px | -0.3px | Product name (PDP) |
| `{typography.heading-lg}` | Fraunces | 28px | 500 | 34px | -0.2px | Section headings |
| `{typography.heading-md}` | Inter | 18px | 600 | 26px | 0 | Card / sub-section headings |
| `{typography.label-sm}` | Inter | 13px | 600 | 18px | 0.2px uppercase | Tag chip labels, quiz step labels |
| `{typography.body-lg}` | Inter | 16px | 400 | 26px | 0 | Value proposition, lead paragraphs |
| `{typography.body-md}` | Inter | 14px | 400 | 22px | 0 | Default body, nav, table cells |
| `{typography.body-sm}` | Inter | 12px | 400 | 18px | 0 | Captions, footnotes |
| `{typography.button-lg}` | Inter | 15px | 600 | 20px | 0 | Marketing pill CTAs |
| `{typography.button-md}` | Inter | 13px | 600 | 18px | 0 | Nav / inline buttons |
| `{typography.mono-sku}` | JetBrains Mono | 12px | 400 | 16px | 0 | SKU codes, cost-per-spray |

### Principles

- Fraunces is reserved for anything meant to be *felt* — product names, hero copy, brand story. Inter handles anything meant to be *used*.
- Weight stays restrained: 500 for Fraunces display, 600 for Inter headings/labels/buttons, 400 for body — no light, no black, no italic (Fraunces' natural warmth already does that work).
- Tag chip labels are always uppercase Inter 600 at `{typography.label-sm}` — this is the one place letter-spacing opens up (+0.2px), giving the color chips a slightly jewelry-label feel.

---

## Layout

### Spacing System

- **Base unit**: 4px, scale steps 4→8→12→16→24→32→48→64→96→128px.
- `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.2xl}` 48 · `{spacing.3xl}` 64 · `{spacing.4xl}` 96 · `{spacing.section}` 128.
- Product card interiors: `{spacing.lg}–{spacing.xl}`. Section bands: `{spacing.4xl}–{spacing.section}`.

### Grid

- Centered container, max-width ~1280px.
- Product grid: 4-up desktop → 2-up tablet → 1-up mobile, `{spacing.lg}` gutters.
- PDP: 55/45 split — image gallery left, olfactory-journey + tags + buy-box right.

### Responsive Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Mobile | ≤640px | 1-col product grid, pill CTAs full-width, tag chips wrap and horizontal-scroll on PDP |
| Tablet | 768px | 2-up product grid |
| Laptop | 1024px | 3–4-up grid, full nav |
| Desktop | 1280px+ | Full container, 4-up grid, PDP 55/45 split |

---

## Elevation & Depth

| Level | Treatment | Use |
| --- | --- | --- |
| 0 — Flat | 1px hairline `{colors.ink-150}`, no shadow | Product cards, inputs, dividers |
| 1 — Whisper | Border + `0px 2px 4px rgba(44,44,44,0.05)` | Hover-lifted product cards |
| 2 — Floating | `0px 4px 8px rgba(44,44,44,0.06)`  • `0px 16px 32px -8px rgba(44,44,44,0.10)` | Modals, quiz overlay, mega-nav |

Depth stays as restrained as the Geist reference — hairline first, shadow only as a last resort, never a colored glow. Color never appears in a shadow, only in a tag chip.

---

## Shapes

| Token | Value | Use |
| --- | --- | --- |
| `{rounded.none}` | 0px | Full-bleed image bands |
| `{rounded.sm}` | 8px | Inputs, small buttons |
| `{rounded.md}` | 14px | Product cards, ingredient close-up tiles |
| `{rounded.lg}` | 20px | Bundle cards, pricing panels |
| `{rounded.pill}` | 100px | Marketing CTAs ("Take the Quiz", "Add to Bag") |
| `{rounded.chip}` | 6px | Tag chips — deliberately *not* a pill, so 6–8 chips in a row read as a clean row of labeled swatches rather than a cluttered pile of pills |
| `{rounded.full}` | 9999px | Avatar/quiz-icon circles, size-selector dots |

Softer and rounder than a dev-tool reference throughout (14–20px vs. Geist's 12–16px) — fragrance is a soft, sensory category, and the geometry should feel more like packaging than software.

---

## Components

### `tag-chip` — the one place color lives

- Background: the tag's hex at **12% opacity** over `{colors.paper-0}`.
- Left dot or thin left border: the tag's hex at full saturation.
- Text: the tag's hex, darkened ~15% for AA contrast on the tint.
- Shape: `{rounded.chip}` (6px), padding `4px 10px`, type `{typography.label-sm}`.
- Never filled solid — the tint-plus-dot treatment keeps the page reading as ink-and-paper even when six chips sit in a row.

### `product-card`

- Background `{colors.paper-0}`, 1px hairline `{colors.ink-150}`, rounded `{rounded.md}`, padding `{spacing.md}`.
- Image on `{colors.paper-25}`, product name in Fraunces `{typography.heading-md}`, price in Inter, up to 3 `tag-chip`s along the bottom edge.

### `button-primary` (Add to Bag, Take the Quiz)

- Background `{colors.gold}`, text `{colors.paper-0}`, `{rounded.pill}`, `{typography.button-lg}`, padding `0px 20px`, height 48px. Pressed state → `{colors.gold-deep}`.

### `button-secondary`

- Background `{colors.paper-0}`, text `{colors.ink-800}`, 1px hairline `{colors.ink-150}`, `{rounded.pill}`, same type/padding as primary.

### `size-selector`

- Row of circular `{rounded.full}` swatches (30/50/100ml), default border `{colors.ink-150}`, selected border `{colors.gold}` 2px, text `{typography.body-sm}` beneath each.

### `olfactory-journey-block`

- Three stacked rows (Top / Heart / Base), each a small `{colors.ink-400}` label + ingredient chips using the *mood* tag colors of that ingredient's associated feeling — this is where the Mood palette and the product schema's `olfactoryJourney` field meet visually.

### `comparison-table` (dupe vs. original)

- `{colors.paper-25}` zebra rows, `{colors.ink-150}` dividers, shared-ingredient cells get a small `tag-chip` per ingredient, similarity percentage rendered large in `{colors.gold}`.

### `longevity-sillage-meter`

- Horizontal bar, filled using the *Sillage* intensity-ramp color matching the product's rating (e.g. "Strong" → #B5762E fill), track in `{colors.ink-100}`.

### `quiz-card`

- `{colors.paper-0}` background, `{rounded.lg}`, Level-2 shadow, each answer option is a `tag-chip`-styled button using the relevant Mood/Occasion color so the quiz visually *is* the tag system.

---

## Do's and Don'ts

### Do

- Use the full 16-step ink/paper ladder — never fall back to flat `#000`/`#fff`/one-grey shortcuts.
- Keep every tag chip's color exactly as locked in the tables above — treat this page like the Canonical Tag Dictionary: update deliberately, never ad hoc per-product.
- Reserve `{colors.gold}` for chrome-level emphasis only (CTAs, links, focus, price) — never use it as a tag color.
- Let Fraunces carry anything meant to be felt (names, hero copy); let Inter carry anything meant to be used (buttons, tables, nav).
- Keep tag chips at the 12%-tint treatment — never a solid color fill — so the page stays ink-and-paper first, colorful second.

### Don't

- Don't introduce a new hue anywhere outside a tag chip or the gold accent — icons, illustrations, and backgrounds stay strictly on the neutral ladder.
- Don't reuse a tag's hex for anything else on the page (status colors, gold, or another tag) — uniqueness is the entire point of the system.
- Don't round tag chips into pills — the 6px `{rounded.chip}` is what keeps a row of six tags feeling like a labeled spec sheet instead of a pile of buttons.
- Don't mix Sillage's amber ramp with Concentration's teal ramp — they're deliberately different hue families so the two intensity meters are never confused at a glance.
- Don't set Fraunces below 500 weight or Inter below 400 — no thin/light weights anywhere in the system.