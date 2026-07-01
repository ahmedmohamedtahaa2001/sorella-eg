<!-- Sorella Design System.md -->
# Sorella — Design System

**Direction:** Glassmorphism × Bento Grid · Charcoal / Gold / Parchment
**Prepared for:** Ahmed Aboelsnoon · **Owner:** Sorella (sorella-eg.com) · **Platform:** Shopify
**Last updated:** July 1, 2026 · **Status:** Phase 0 foundation (authoritative)

> This is the single source of truth for Sorella's visual language. It supersedes the earlier `DesignSystem.md`, which documented an Apple.com-derived system on the wrong accent/typeface. That file's _rigor_ — tokenized scales, tight display tracking, context-specific line-heights, breakpoints, touch targets, whitespace philosophy — is carried forward here and re-tuned for a luxury fragrance brand built on glass and bento. Everything here is expressed as tokens so it drops straight into Shopify sections and CSS custom properties (see §16).

---

## 0. How to use this document

- **Design in tokens, not values.** Reference `{color.gold}`, `{type.display-lg}`, `{space.lg}` — never raw hex/px. The token table (§16) is the only place values live; change once, propagate everywhere.
- **Two surface modes.** The whole system runs on **dark surfaces** (Ink/Slate backgrounds, Parchment text, light-tinted glass) as the default, with **light surfaces** (Parchment backgrounds, Ink text) for catalog and reading contexts. Every token that behaves differently by mode is marked.
- **Glass is a budget, not a default.** Blur is expensive and, overused, reads as noise. §7.3 lists exactly where it's allowed. Everything else is solid.
- **Gold is the only accent.** One accent, used with restraint, is what makes a luxury palette feel intentional (§2.4).

---

## 1. Brand foundation & principles

Sorella is a refined Egyptian fragrance house. The design language should feel **editorial, quiet, and expensive** — closer to a printed lookbook than a SaaS storefront. Three ideas govern every decision:

1. **Atmosphere over ornament.** Depth comes from photography, surface-color change, and a single layer of frosted glass — not from gradients-as-decoration, drop-shadow stacks, or competing accents.
2. **Editorial pace.** Body copy runs at 17px with generous leading; headlines are set in a high-contrast serif with tight tracking. The page should feel _read_, not _scanned_.
3. **Bento for curation, grid for catalog.** Marketing surfaces (homepage, campaigns, mega-menu) use an asymmetric **bento** layout to create hierarchy. High-count catalog pages (32+ SKUs) use a **uniform grid** for scannability. Never mix the two purposes.

### 1.1 Do

- Use **`{color.gold}`** for every interactive/attention signal — CTAs, price, active nav state, "Inspired by" borders, cart badge — and nothing else.
- Set headlines in the **display serif** with negative tracking for the editorial, high-contrast cadence.
- Run body copy at **`{type.body}` (17px)**, not 16px — the extra pixel is the brand's reading pace.
- Reserve **glass** for the nav dock, hero card, brand-story panels, cart drawer, and mega-menu (§7.3).
- Create rhythm by **alternating Ink and Parchment surfaces** full-bleed — the color change is the divider, no border needed.
- Use **bento spans** to signal importance on curated surfaces; keep catalog grids uniform.

### 1.2 Don't

- Don't introduce a second accent. Every "click me" is Gold.
- Don't use Gold as a large decorative **background fill**, or as **small body text on Parchment** — it fails AA (§2.6, §11).
- Don't use decorative CSS gradients as a substitute for photography; gradients exist only as glass backdrops and hero scrims.
- Don't cascade blur into dense grids — product catalog cards stay **solid** for performance and legibility.
- Don't set body copy in the serif — serif is display-only; thin serifs lose contrast inside blurred glass.
- Don't mix radii grammars — use the scale in §6 and nothing in between.
- Don't rely on color alone for state (sold-out uses a labeled pill, not just a gray-out).

---

## 2. Color system

### 2.1 Core palette

| Token               | Hex       | Name           |
| ------------------- | --------- | -------------- |
| `{color.ink}`       | `#1C1F24` | Ink (charcoal) |
| `{color.slate}`     | `#3A4452` | Slate          |
| `{color.mist}`      | `#9AA3AD` | Mist           |
| `{color.parchment}` | `#F2EEE7` | Parchment      |
| `{color.gold}`      | `#C79C5A` | Gold           |

### 2.2 Role mapping

| Role                                                                          | Token               | Notes                                    |
| ----------------------------------------------------------------------------- | ------------------- | ---------------------------------------- |
| Page background (dark mode)                                                   | `{color.ink}`       | Default site surface                     |
| Secondary/layered background, gradient stop                                   | `{color.slate}`     | Section fills, glass gradient base       |
| Text on light surfaces / dark section fills                                   | `{color.ink}`       | Primary reading color on Parchment       |
| Text on dark surfaces / light glass                                           | `{color.parchment}` | Primary reading color on Ink             |
| Secondary text, borders, dividers, disabled/sold-out                          | `{color.mist}`      | Never a primary text color for long copy |
| Accent — CTA fill, price, active state, icon accents, tag borders, cart badge | `{color.gold}`      | Accent only; see §2.4                    |

### 2.3 Derived tints & alphas

These are the working values behind glass, borders, scrims, and hovers. Defined once here, referenced everywhere.

| Token                  | Value                    | Use                                                          |
| ---------------------- | ------------------------ | ------------------------------------------------------------ |
| `{color.ink-90}`       | `rgba(28,31,36,0.90)`    | Glass solid fallback; heavy scrim                            |
| `{color.ink-70}`       | `rgba(28,31,36,0.70)`    | Hero scrim over photography (text legibility)                |
| `{color.ink-35}`       | `rgba(28,31,36,0.35)`    | Glass panel shadow color                                     |
| `{color.parchment-65}` | `rgba(242,238,231,0.65)` | Nav dock glass fill (scrolled)                               |
| `{color.parchment-12}` | `rgba(242,238,231,0.12)` | Glass panel fill on dark backgrounds                         |
| `{color.parchment-08}` | `rgba(242,238,231,0.08)` | Subtle glass fill / hairline highlight                       |
| `{color.mist-25}`      | `rgba(154,163,173,0.25)` | Glass & hairline borders                                     |
| `{color.mist-40}`      | `rgba(154,163,173,0.40)` | Dividers on light surfaces                                   |
| `{color.gold-15}`      | `rgba(199,156,90,0.15)`  | Gold hover wash, tag fill                                    |
| `{color.gold-40}`      | `rgba(199,156,90,0.40)`  | Gold hover border (product card)                             |
| `{color.black-pure}`   | `#000000`                | Reserved; not used as a surface (Ink is the darkest surface) |

### 2.4 Gold usage rule (reconciled)

The redesign report says two things that read as conflicting — "accent only, never a fill background" (§6.1) and "solid-fill buttons" (§6.3). The reconciliation:

- ✅ **Gold as a solid CTA button fill** with **Ink text** — allowed. Button labels are large/bold and pass AA (§2.6).
- ✅ **Gold as border, price text, active-state indicator, icon, small pill border** — allowed.
- ✅ **Gold as a thin underline / focus ring** — allowed.
- ❌ **Gold as a large decorative section/background fill** — not allowed (turns the accent into a theme color and cheapens it).
- ❌ **Gold as small body text on Parchment** — not allowed (contrast failure).

### 2.5 Gradients & scrims

Gradients are **functional only** — never decorative wallpaper.

| Token                   | Value                                                                              | Use                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `{gradient.surface}`    | `linear-gradient(160deg, {color.ink} 0%, {color.slate} 100%)`                      | Dark section backdrop behind glass when no photo is present         |
| `{gradient.hero-scrim}` | `linear-gradient(180deg, {color.ink-70} 0%, transparent 40%, {color.ink-70} 100%)` | Over hero photography so nav + headline stay legible top and bottom |
| `{gradient.card-sheen}` | `linear-gradient(135deg, {color.parchment-08} 0%, transparent 60%)`                | Optional 1-pass glass sheen highlight (top-left)                    |

### 2.6 Contrast-verified text pairings

Only these combinations are cleared for the stated use. (Ratios approximate; re-verify final renders.)

| Foreground          | Background                            | Ratio          | Cleared for                                                            |
| ------------------- | ------------------------------------- | -------------- | ---------------------------------------------------------------------- |
| `{color.parchment}` | `{color.ink}`                         | ~13:1          | All text                                                               |
| `{color.ink}`       | `{color.parchment}`                   | ~13:1          | All text                                                               |
| `{color.ink}`       | `{color.parchment-65}` glass          | ~AA+           | Nav dock text (scrolled) — safe                                        |
| `{color.parchment}` | `{color.parchment-12}` glass over Ink | passes (large) | Headlines/large text on dark glass                                     |
| `{color.gold}`      | `{color.ink}`                         | ~4.7:1         | **Large text & UI only**; borderline for small body — prefer ≥18px/600 |
| `{color.ink}`       | `{color.gold}` (button fill)          | ~4.5:1         | Button labels ≥16px/600                                                |
| `{color.gold}`      | `{color.parchment}`                   | ~1.9:1         | ❌ **Fails** — large text/icons/borders only, never body               |
| `{color.mist}`      | `{color.ink}`                         | ~4.6:1         | Secondary text ≥16px; not for fine print                               |

**Rules that follow:** Gold is never small body text. Mist is never fine print. Nav transparent-state text always carries a text-shadow safety net (§8.1).

---

## 3. Typography

### 3.1 Type families (decision — confirm with client, §17)

The report left the pairing open (§6.4). Decision for Phase 0: a **high-contrast display serif** for headings + a **neutral grotesk** for body/UI. Rationale: the serif delivers the luxury/editorial cue the moodboard calls for; the grotesk stays legible at small sizes and inside blurred glass, where thin serif strokes disappear.

| Role                     | Family                  | Stack                                                           | Notes                                                                                                                            |
| ------------------------ | ----------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Display / Headings**   | **Fraunces** (variable) | `"Fraunces", "Canela", Georgia, "Times New Roman", serif`       | High optical contrast; supports optical-size + soft/wonky axes. Free (Google Fonts). Premium alternative: **Canela** or **Ogg**. |
| **Body / UI**            | **Inter** (variable)    | `"Inter", "General Sans", system-ui, -apple-system, sans-serif` | Neutral grotesk; tall x-height reads well at 17px and inside glass. Free. Alternative: **General Sans**.                         |
| **Numeric (price/spec)** | Inter, tabular          | `font-variant-numeric: tabular-nums`                            | Prices, quantities, spec sheets align in columns.                                                                                |

**OpenType:** enable `tabular-nums` on prices and cart math. On Fraunces, use the optical-size axis so large display sizes get the high-contrast cut and smaller sizes stay sturdy. Eyebrows/overlines use tracked uppercase (§3.4).

### 3.2 Type scale

Serif tokens = display family; sans tokens = body/UI family. Line-heights are **context-specific** (tight for display, editorial for body) — this is intentional, not a default.

| Token                   | Family         | Size | Weight | Line Height | Tracking           | Use                                                    |
| ----------------------- | -------------- | ---- | ------ | ----------- | ------------------ | ------------------------------------------------------ |
| `{type.display-hero}`   | Serif          | 60px | 400    | 1.05        | -0.5px             | Homepage hero headline                                 |
| `{type.display-lg}`     | Serif          | 44px | 400    | 1.08        | -0.4px             | Section heads, brand-story titles                      |
| `{type.display-md}`     | Serif          | 32px | 500    | 1.15        | -0.3px             | Product name (PDP), bento tile titles                  |
| `{type.headline}`       | Serif          | 24px | 500    | 1.2         | -0.2px             | Card headlines, subsection heads                       |
| `{type.title}`          | Sans           | 21px | 600    | 1.24        | -0.15px            | Sub-nav category, tagline, prominent UI titles         |
| `{type.lead}`           | Sans           | 20px | 300    | 1.5         | 0                  | Airy lead paragraphs (rare light weight — atmospheric) |
| `{type.body-lg}`        | Sans           | 18px | 400    | 1.5         | -0.2px             | Emphasized paragraph / intro copy                      |
| `{type.body}`           | Sans           | 17px | 400    | 1.47        | -0.2px             | **Default paragraph** (17px, not 16px)                 |
| `{type.body-strong}`    | Sans           | 17px | 600    | 1.35        | -0.2px             | Inline strong emphasis                                 |
| `{type.body-sm}`        | Sans           | 15px | 400    | 1.45        | -0.1px             | Dense copy, secondary descriptions                     |
| `{type.caption}`        | Sans           | 14px | 400    | 1.43        | -0.1px             | Captions, button text, filter labels                   |
| `{type.caption-strong}` | Sans           | 14px | 600    | 1.3         | -0.1px             | Emphasized captions, active filter                     |
| `{type.price}`          | Sans (tabular) | 17px | 600    | 1.2         | 0                  | Product price (Gold on light / Parchment on dark)      |
| `{type.eyebrow}`        | Sans           | 12px | 600    | 1.0         | +1.2px (uppercase) | Gold overline above headlines — the luxury cue         |
| `{type.nav-link}`       | Sans           | 15px | 500    | 1.0         | -0.1px             | Nav dock links                                         |
| `{type.fine-print}`     | Sans           | 12px | 400    | 1.4         | 0                  | Footer body, fine print                                |
| `{type.micro-legal}`    | Sans           | 10px | 400    | 1.3         | 0                  | Micro legal disclaimers                                |

### 3.3 Weight ladder

- **Serif (display):** 300 (light, rare/atmospheric) · 400 (regular, default display) · 500 (semibold display).
- **Sans (body/UI):** 300 (rare lead) · 400 (body) · 500 (nav/labels) · 600 (strong/price/buttons) · 700 (reserved, sparing).
- **Weight 300 is real and rare** — reserved for `{type.lead}` and airy moments where content should feel light. Not an accident.

### 3.4 Principles

- **Negative tracking at display sizes.** Every serif heading tightens (-0.2 → -0.5px). This is the editorial cadence. Never applied below 14px.
- **Body at 17px, leading 1.47.** The brand's reading pace. Don't tighten body leading below 1.47.
- **Serif is display-only.** Never set body, captions, or UI in the serif — it loses contrast in glass and at small sizes.
- **Gold eyebrows.** A tracked uppercase `{type.eyebrow}` in Gold above a serif headline is the signature luxury device; use it to introduce sections.
- **Line-height is context-specific.** Display 1.05–1.2, body 1.47–1.5, UI ~1.0–1.24.

### 3.5 Substitution notes (off-brand-font environments)

- If Fraunces/Inter can't load, the stacks in §3.1 degrade to Georgia (serif) and system-ui (sans) gracefully.
- Fraunces default tracking runs slightly wider than premium serifs — the negative tracking in §3.2 already compensates.
- Inter's tall x-height means body leading of 1.47 is correct; don't inflate it.

---

## 4. Spacing & layout

### 4.1 Spacing scale

Base unit **8px**. Sub-base values (2, 4, 6) for tight typographic nudges; structural layout snaps to 8/16/24/32.

| Token             | Value | Use                                    |
| ----------------- | ----- | -------------------------------------- |
| `{space.xxs}`     | 4px   | Icon/label gaps, tight nudges          |
| `{space.xs}`      | 8px   | Compact internal padding               |
| `{space.sm}`      | 12px  | Chip padding, small gaps               |
| `{space.md}`      | 16px  | Default component padding, grid gutter |
| `{space.lg}`      | 24px  | Card padding, comfortable gaps         |
| `{space.xl}`      | 32px  | Bento gap, large internal padding      |
| `{space.xxl}`     | 48px  | Between stacked blocks                 |
| `{space.section}` | 80px  | Section vertical padding (desktop)     |

**Button padding:** 12–14px vertical, 20–28px horizontal (larger than the Apple baseline — glass CTAs need more presence). **Card padding:** `{space.lg}` (24px). **Section padding:** `{space.section}` (80px desktop), tightening to 48px on large-phone and below.

### 4.2 Grid & container

| Context                           | Max width                                               | Columns                                 | Gutter              |
| --------------------------------- | ------------------------------------------------------- | --------------------------------------- | ------------------- |
| Text-heavy (brand story, about)   | ~820px                                                  | 1 (centered)                            | —                   |
| Bento (homepage, campaigns)       | 1280px                                                  | 12-col base, variable spans             | `{space.xl}` (32px) |
| Catalog grid (collection)         | 1440px                                                  | `repeat(auto-fill, minmax(240px, 1fr))` | `{space.lg}` (24px) |
| Full-bleed (hero, brand-story bg) | 100vw                                                   | —                                       | 0                   |
| Wide desktop lock                 | Content locks at **1440px**; margins absorb extra width |                                         |                     |

### 4.3 Whitespace philosophy

Whitespace is the product's pedestal. Hero and brand-story blocks open with generous air (≥64px above the headline, 48–64px below). Product renders are never crowded — nearest content sits ≥40px away. **The footer is the deliberate exception**: it goes dense so the full information architecture is visible at a glance.

---

## 5. Bento grid system

Bento is reserved for **curated/marketing surfaces** (homepage collections, mega-menu, campaign landings). Catalog pages do **not** use bento (§5.2 of the report).

- **Base:** CSS grid, 12 columns on desktop, gap `{space.xl}` (32px).
- **Cell spans:** `1×1`, `2×1` (wide), `1×2` (tall), `2×2` (feature). Use span to signal importance — the hero and a hero category (e.g. Unisex) take larger spans; trust/stat cells take `1×1`.
- **Cap:** ≤ 9 primary bento cells in the homepage above-to-fold zone (report guardrail).
- **Responsive collapse:** 12-col → 8-col (tablet) → stacked single column (phone). Feature cells (`2×2`) drop to full-width first.
- **Seasonal cell:** one schema-driven, swappable bento cell (art/copy/link change without a code deploy).

---

## 6. Border radius scale

| Token           | Value | Use                                                                  |
| --------------- | ----- | -------------------------------------------------------------------- |
| `{radius.none}` | 0px   | Full-bleed hero/brand-story imagery, edge-to-edge sections           |
| `{radius.xs}`   | 6px   | Inline chips, small tags                                             |
| `{radius.sm}`   | 10px  | Inline card imagery, small buttons, input fields                     |
| `{radius.md}`   | 14px  | Compact glass elements, quick-add buttons                            |
| `{radius.lg}`   | 20px  | **Glass panels, bento cells, product cards** (system default)        |
| `{radius.xl}`   | 28px  | Large hero glass card, cart drawer corners                           |
| `{radius.pill}` | 999px | Primary Gold CTA, filter chips, "Inspired by" tag, scrolled nav dock |
| `{radius.full}` | 50%   | Circular icon controls, avatars, cart badge                          |

Don't mix radii grammars: `{radius.lg}` for panels/cards, `{radius.pill}` for actions/chips, `{radius.md}` for compact glass, and nothing arbitrary in between.

---

## 7. Elevation, glass & depth

### 7.1 Depth philosophy

Elevation comes from **three** sources, in priority order:

1. **Surface-color change** — alternating Ink and Parchment full-bleed sections. The color change is the divider; no border, no shadow needed.
2. **Frosted glass** — a single translucent, blurred layer that reads as "floating over content." Used sparingly (§7.3).
3. **One product shadow** — a soft shadow under product renders resting on a surface, to give the bottle weight. Never on cards, buttons, or text.

### 7.2 Shadow & glass tokens

| Token                 | Value                            | Use                                                      |
| --------------------- | -------------------------------- | -------------------------------------------------------- |
| `{shadow.glass}`      | `0 8px 32px {color.ink-35}`      | Glass panels, hero card, brand-story cards               |
| `{shadow.dock}`       | `0 8px 24px rgba(28,31,36,0.25)` | Scrolled nav dock                                        |
| `{shadow.product}`    | `0 5px 30px rgba(28,31,36,0.22)` | Product renders on a surface (the only "product" shadow) |
| `{shadow.card-hover}` | `0 4px 20px rgba(28,31,36,0.18)` | Solid product card lift on hover (subtle)                |
| `{border.hairline}`   | `1px solid {color.mist-25}`      | Glass borders, sub-nav separator                         |

### 7.3 Glass panel spec & blur budget

Blur is a **budget**. It is allowed only on: **nav dock · hero card · brand-story panels · cart drawer · mega-menu**. The product catalog grid stays **solid** — for performance across 32+ SKU pages (heavy mid-range Android base in Egypt) and to avoid visual noise. Use **10–18px** blur, never 30px+.

```css
/* Standard glass panel — dark-mode default (light tint over Ink) */
.glass-panel {
  background: rgba(242, 238, 231, 0.12); /* {color.parchment-12} */
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(154, 163, 173, 0.25); /* {color.mist-25} */
  border-radius: 20px; /* {radius.lg} */
  box-shadow: 0 8px 32px rgba(28, 31, 36, 0.35); /* {shadow.glass} */
}

/* Progressive-enhancement fallback: no blur support → solid Ink, no fog */
@supports not (
  (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
) {
  .glass-panel {
    background: rgba(28, 31, 36, 0.9);
  } /* {color.ink-90} */
}
```

Every glass surface must be QA'd with the `@supports` fallback forced on, so no browser ever ships a flat foggy-gray box (Safari iOS supports `backdrop-filter` fully; the fallback targets edge cases).

---

## 8. The Adaptive Nav Dock (signature interaction)

The nav is the first thing a visitor experiences and the anchor interaction of the rebuild. It has **two scroll-driven states**.

### 8.1 State A — Top of page (transparent)

- Full-width, no background, no border, no shadow — intentionally "invisible" so the hero reads full-bleed.
- Logo, links, and icons rendered in **Parchment** with a **soft dark text-shadow** (`0 1px 3px {color.ink-70}`) so they stay legible over variable hero content (test against lightest and darkest expected hero frames).
- Taller/roomier height (**88px**) — an opening title card, not a utility bar.
- No blur.

### 8.2 State B — Scrolled (glass dock)

- **Trigger:** tie to the hero's bottom edge (roughly 80–120px), not a hardcoded pixel, so it stays correct across hero heights.
- **Condenses** into a docked bar: shorter (**56–64px**), and **narrower than a typical full-width sticky nav** — a centered, inset capsule with `max-width: 920px`, ≥16–24px from the viewport edge, floating `12–16px` below the top.
- **Glass treatment** (this is a persistent single element, so blur is always justified here regardless of the §7.3 budget):

```css
.nav-dock {
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 920px;
  width: calc(100% - 32px);
  height: 60px;
  border-radius: 999px; /* {radius.pill} */
  background: rgba(242, 238, 231, 0.65); /* {color.parchment-65} */
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(154, 163, 173, 0.25); /* {color.mist-25} */
  box-shadow: 0 8px 24px rgba(28, 31, 36, 0.25); /* {shadow.dock} */
  color: #1c1f24; /* Ink text on light glass */
  transition:
    background 300ms ease-out,
    backdrop-filter 300ms ease-out,
    max-width 300ms ease-out,
    height 300ms ease-out,
    top 300ms ease-out,
    border-radius 300ms ease-out,
    color 300ms ease-out;
}

.nav-dock--top {
  /* State A */
  top: 0;
  max-width: 100%;
  width: 100%;
  height: 88px;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-color: transparent;
  box-shadow: none;
  color: #f2eee7; /* Parchment text over hero */
  text-shadow: 0 1px 3px rgba(28, 31, 36, 0.7);
}
```

- **Transition:** animate `background`, `backdrop-filter`, `width/max-width`, `height`, `top`, `border-radius`, and `color` **together** on one 250–350ms ease-out — never an instant snap. The dock should feel like it _condenses_.
- **Color flip** (Parchment → Ink) times to the background fill's midpoint so there's no moment of low contrast.
- Contrast check: Ink-on-Parchment-glass passes AA comfortably (the inverse of the risky Gold-on-Parchment case).

### 8.3 Structure & content

| Zone   | Content                                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Left   | Logo — compact icon mark in the docked state; full wordmark allowed in the transparent top state if room                                                      |
| Center | Primary links: **For Her / For Him / Unisex / Perfume Oil / Bundles** — collapse to a **"Shop" mega-menu trigger** if the dock can't fit all five comfortably |
| Right  | Search icon · account icon · cart icon (with item-count **badge in Gold**)                                                                                    |

The **mega-menu is not width-locked to the dock** — it drops as its own wide/full-width glass panel (independent of the dock's compact footprint) with room for bento-style category tiles.

### 8.4 Scroll behavior

- Docked nav **stays visible on scroll-up**, **hides on scroll-down** past a threshold — so it doesn't compete while reading a product description, but reappears the instant the user wants to navigate. _(Confirm with client — §17.)_

### 8.5 Mobile

- Same two-state logic, but the docked state becomes a **full-width** glass bar (the "narrower than usual" inset is a desktop refinement; edge-to-edge is more usable on small viewports). A persistent nav element is the one justified exception to limiting mobile blur.
- Hamburger opens a **full-height glass drawer** (§9), not a dropdown.

### 8.6 States to design & QA

Transparent over light photo · transparent over dark/gradient · docked glass · scroll-up vs scroll-down · cart drawer open with nav visible (test z-index + blur layering together, since both use glass).

---

## 9. Component library

Build each once as a schema-driven Shopify section/block (`sorella-` prefix, §15) and reuse — never re-implement per page.

| Component                        | Spec summary                                                                                                                                                                      | Used on                                            |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Adaptive Nav Dock**            | §8 — transparent → glass dock                                                                                                                                                     | All pages                                          |
| **Glass Hero Card**              | Large asymmetric glass panel over photo/video bg, `{gradient.hero-scrim}` for legibility, `{type.display-hero}` headline + Gold CTA, `{radius.xl}`                                | Homepage, campaigns, collection landing (optional) |
| **Bento Cell (Category)**        | Photographic tile, single CTA, variable span (1×1…2×2), `{radius.lg}`, gold hover border                                                                                          | Homepage collections, mega-menu                    |
| **Bento Cell (Trust/Stat)**      | Small glass card, icon + short claim ("Free 5ml over 1,100 LE", "Made fresh in Egypt"), `{radius.lg}`                                                                             | Homepage hero trio, brand story                    |
| **Product Card (Catalog)**       | **Solid** Parchment/Ink card (no blur), image, name `{type.headline}`, price `{type.price}` in Gold, quick-add; **gold hover border** (`{color.gold-40}`) + `{shadow.card-hover}` | Collection grids                                   |
| **Product Card (Sold Out)**      | Same shell at ~55% opacity, desaturated image, Mist **"Sold out" pill** replacing the CTA (never color-only)                                                                      | Collection grids                                   |
| **Product Card (Quick-Add SKU)** | Compact variant for impulse items (musks, 5ml testers) — smaller footprint, price emphasized                                                                                      | Musks/testers, bundle builder, cart upsell         |
| **Notes Pyramid Widget**         | 3-tier mini-diagram or stacked mini-cards (top / heart / base) — NEW content                                                                                                      | Product page                                       |
| **"Inspired By" Tag**            | Small pill, `{color.gold-40}` border, `{color.gold-15}` fill, `{type.caption}`, `{radius.pill}`                                                                                   | Product card, product page                         |
| **Testimonial Glass Card**       | Structured review — name, verified badge, date, quote, star rating in Gold, `{radius.lg}`                                                                                         | Homepage reviews, PDP reviews tab                  |
| **Brand-Story Block**            | Full-bleed alternating glass panel over photography, Parchment text, `{type.display-lg}`                                                                                          | About page, homepage (single instance)             |
| **Sticky Filter/Sort Bar**       | Glass bar sticky under nav; blur does **not** cascade into the grid below                                                                                                         | Collection pages                                   |
| **Mega-Menu Panel**              | Wide glass dropdown, bento category tiles, independent width from dock                                                                                                            | Nav (desktop)                                      |
| **Mobile Nav Drawer**            | Full-height glass panel, slide-in                                                                                                                                                 | Nav (mobile)                                       |
| **Cart Drawer**                  | Glass side panel, compact line-item cards, subtotal, upsell slot, `{radius.xl}`                                                                                                   | All pages                                          |
| **Newsletter/Offer Card**        | Glass card or modal, replaces the current unstyled popup                                                                                                                          | Homepage, exit-intent (optional)                   |
| **Seasonal Campaign Cell**       | Schema-driven bento cell — swap art/copy/link without a code deploy                                                                                                               | Homepage, collection landing                       |

---

## 10. Breakpoints & responsive

| Name             | Width       | Key changes                                                                                                  |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| Small phone      | ≤ 419px     | Single-column; nav docked = full-width bar; hero drops to `{type.display-md}` (32px); section padding → 40px |
| Phone            | 420–640px   | Single-column stack; product renders scale to 80% of tile; catalog grid = 1–2 col                            |
| Large phone      | 641–735px   | Section padding tightens 80px → 48px; fine-print wraps                                                       |
| Tablet portrait  | 736–833px   | Nav collapses to hamburger + glass drawer; bento → single/2-col stack                                        |
| Tablet landscape | 834–1023px  | Nav expands; bento 12→8 col; catalog 3-col                                                                   |
| Small desktop    | 1024–1068px | Full layout; hero `{type.display-lg}`; catalog 3–4 col                                                       |
| Desktop          | 1069–1440px | Full bento; catalog 4–5 col; content max 1440px                                                              |
| Wide desktop     | ≥ 1441px    | Content locks at 1440px; margins absorb extra width                                                          |

**Structural breakpoints that matter for build:** 1440 (content lock) · 1068 (desktop shrink) · 833 (nav → hamburger; bento collapse) · 640 (phone single-column) · 419 (small-phone type drop).

**Image behavior:** responsive `srcset`/`sizes` with breakpoint-matched crops; hero art direction may switch to a taller crop on mobile; product renders keep 1:1 / 4:3 aspect, only scale changes; lazy-load by default, hero loads eagerly; CDN-optimized WebP.

---

## 11. Touch targets & interaction states

### 11.1 Touch targets

- **Minimum 44 × 44px** for all primary interactive elements. Primary CTA ~44 × 120px (pill radius makes the hit area generous). Icon controls exactly 44 × 44px.
- Nav dock utility icons may sit slightly tighter on desktop (precision pointer actions); the mobile hamburger + drawer replaces them ≤ 833px.

### 11.2 Interaction states (system-wide)

| State                    | Treatment                                                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Hover — button**       | Gold CTA: subtle brightness lift + `{shadow.card-hover}`. Ghost/text: Gold underline or `{color.gold-15}` wash.                  |
| **Hover — product card** | Gold border (`{color.gold-40}`) fades in + card lifts with `{shadow.card-hover}`; quick-add reveals.                             |
| **Active / press**       | `transform: scale(0.97)` on every button — the system-wide micro-interaction.                                                    |
| **Focus (keyboard)**     | 2px Gold focus ring, 2px offset (`outline: 2px solid {color.gold}; outline-offset: 2px`) — visible on every interactive element. |
| **Disabled / sold-out**  | Mist text/border, reduced opacity, labeled state (never color-only).                                                             |
| **Loading**              | Skeleton in `{color.mist-25}` on the component's own radius; no layout shift.                                                    |

---

## 12. Motion & animation

- **Nav dock condense/expand:** 250–350ms ease-out, all properties on one timing function (§8.2).
- **Button press:** `scale(0.97)`, ~120ms.
- **Hover reveals (card border, quick-add):** 150–200ms ease-out.
- **Drawers (cart, mobile nav):** slide-in 300ms ease-out, backdrop scrim fades with it.
- **Never animate `blur` alone** — it's the most GPU-expensive property to transition on low-end devices. Animate `background`/`opacity`/`transform` together; if frame drops appear, cross-fade a pre-blurred layer instead.
- **Respect `prefers-reduced-motion`:** disable transforms/parallax, keep opacity fades, make the nav state change instantaneous (no morph).

---

## 13. Accessibility guardrails

- **Gold on Parchment fails AA** for body text — Gold is for large text, icons, borders, and solid-fill buttons only (§2.6).
- **Nav transparent state** always carries a text-shadow safety net; verify ≥4.5:1 effective contrast against the lightest and darkest hero frames.
- **State is never color-only** — sold-out uses a labeled Mist pill; errors pair color with an icon + text.
- **Docked glass:** confirm Ink-on-Parchment-glass passes AA (safe; it's the inverse of the risky case).
- **Focus visible everywhere** (§11.2) — Gold ring, 2px offset.
- **Reduced motion** honored (§12).

---

## 14. Voice & microcopy

Active-voice, specific, warm — never default Shopify system text.

- "Add to bag," not "Submit."
- "Sold out — notify me," not a bare grayed-out button.
- Empty cart / empty search / "added to bag" confirmations speak in the same plain, warm register as product copy.
- Content that must exist and doesn't today (author before templates finalize): **notes pyramids**, **"Inspired by [X]" framing** (pending §17 legal sign-off), **real brand story**, **structured review data**, **lifestyle photography**, **seasonal campaign copy**, **state microcopy**.

---

## 15. RTL & technical/Shopify guardrails

- **RTL/Arabic:** the store's customer base writes in Egyptian Arabic/Arabizi but the theme is English-only. Decide now (§17) whether the rebuild ships `dir="rtl"` support or stays English-UI/Arabic-content — this drives nav icon mirroring and bento grid mirroring logic. Build layout with logical properties (`margin-inline`, `padding-inline`, `inset-inline`) so RTL is a switch, not a rewrite.
- **Blur performance:** limit `backdrop-filter` to the §7.3 budget; 10–18px, never 30px+; product grid stays solid.
- **`@supports` fallback:** ship and test the solid-Ink fallback so no browser renders a foggy-gray box.
- **Section/schema architecture:** strict `sorella-`-prefixed section/block naming; **zero hardcoded copy** (schema-driven, so seasonal campaigns swap without a deploy); Playwright MCP visual QA per breakpoint before merge — the **nav dock needs a scroll-triggered QA pass**, not just a static screenshot.

---

## 16. Consolidated token reference (CSS custom properties)

```css
:root {
  /* Color — core */
  --color-ink: #1c1f24;
  --color-slate: #3a4452;
  --color-mist: #9aa3ad;
  --color-parchment: #f2eee7;
  --color-gold: #c79c5a;

  /* Color — derived */
  --color-ink-90: rgba(28, 31, 36, 0.9);
  --color-ink-70: rgba(28, 31, 36, 0.7);
  --color-ink-35: rgba(28, 31, 36, 0.35);
  --color-parchment-65: rgba(242, 238, 231, 0.65);
  --color-parchment-12: rgba(242, 238, 231, 0.12);
  --color-parchment-08: rgba(242, 238, 231, 0.08);
  --color-mist-25: rgba(154, 163, 173, 0.25);
  --color-mist-40: rgba(154, 163, 173, 0.4);
  --color-gold-15: rgba(199, 156, 90, 0.15);
  --color-gold-40: rgba(199, 156, 90, 0.4);

  /* Gradients */
  --gradient-surface: linear-gradient(
    160deg,
    var(--color-ink) 0%,
    var(--color-slate) 100%
  );
  --gradient-hero-scrim: linear-gradient(
    180deg,
    var(--color-ink-70) 0%,
    transparent 40%,
    var(--color-ink-70) 100%
  );
  --gradient-card-sheen: linear-gradient(
    135deg,
    var(--color-parchment-08) 0%,
    transparent 60%
  );

  /* Typography — families */
  --font-display: "Fraunces", "Canela", Georgia, "Times New Roman", serif;
  --font-body: "Inter", "General Sans", system-ui, -apple-system, sans-serif;

  /* Spacing (8px base) */
  --space-xxs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  --space-section: 80px;

  /* Radius */
  --radius-none: 0;
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 999px;
  --radius-full: 50%;

  /* Elevation */
  --shadow-glass: 0 8px 32px var(--color-ink-35);
  --shadow-dock: 0 8px 24px rgba(28, 31, 36, 0.25);
  --shadow-product: 0 5px 30px rgba(28, 31, 36, 0.22);
  --shadow-card-hover: 0 4px 20px rgba(28, 31, 36, 0.18);
  --border-hairline: 1px solid var(--color-mist-25);

  /* Glass / blur */
  --blur-panel: 14px;
  --blur-dock: 18px;

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-dock: 300ms;
  --dur-hover: 180ms;
  --dur-press: 120ms;
  --dur-drawer: 300ms;
}
```

Type-scale tokens (§3.2) map to utility classes/`font:` shorthands in the theme — size, weight, line-height, and tracking bundled per token so headings never drift from the scale.

---

## 17. Open questions (confirm before/early in Phase 0)

1. **Typography pair** — this doc commits to **Fraunces (display) + Inter (body)**. Approve, or swap to premium (Canela/Ogg + General Sans)? Affects every glass panel's padding/leading.
2. **Gold-fill CTA** — confirm §2.4: Gold solid fill with Ink text is approved for primary buttons.
3. **Nav scroll-hide** — hide-on-scroll-down / reveal-on-scroll-up (§8.4), or stay pinned once docked?
4. **RTL/Arabic** — in scope for this rebuild, or a later phase? Drives nav mirroring + bento mirroring.
5. **Lifestyle photography source** — client / AI-generated / stock? Current assets are product-on-white and won't support hero/brand-story cells.
6. **"Inspired by [designer fragrance]"** — legally/brand-safe to state explicitly on-site?
7. **Mega-menu vs. flat five-link nav** — for the docked state's link count.

---

## 18. Build phases (reference)

0. **Foundations** — tokens (§16), glass panel, adaptive nav dock (both states + transition), bento grid utilities, `@supports` fallback, base layout.
1. **Homepage** — hero bento, collections bento grid, seasonal cell, brand-story block, best-sellers row, reviews, newsletter.
2. **Collection & product** — catalog grid (non-bento), sticky filter/sort bar, PDP bento layout, notes pyramid, "inspired by" tag, sold-out state.
3. **Content & polish** — About story blocks, cart drawer, mobile nav drawer + mega-menu, mobile pass, Playwright QA across templates + both nav states, blur performance audit.


<!-- Design System -->
# Sorella — Art Direction

**Direction:** Glassmorphism × Bento Grid × Organic Blob Field
**Prepared for:** Ahmed Aboelsnoon · **Owner:** Sorella (sorella-eg.com) · **Platform:** Shopify
**Status:** Phase 0 foundation (authoritative) — supersedes `DesignSystem.md` v1 (Apple-derived) and folds in the Full Redesign Report in full.

> This is the single source of truth for how Sorella looks, moves, and is built. Three systems are fused on purpose, each doing a job the others can't:
>
> - **Bento** gives the page _structure_ — hierarchy, rhythm, a place for every piece of content.
> - **Glass** gives structure _depth_ — a small number of panels read as floating above the page.
> - **Blobs** give depth _atmosphere_ — the soft, warm, organic backdrop that the glass has something to refract in the first place. Without blobs, the glass panels are just blurry boxes; without bento, the blobs have no grid to float over; without glass, the blobs are just decoration.
>
> Nothing here is decorative for its own sake. Every glass panel, every blob, every span in the grid is there to carry hierarchy or content. If a design instinct is "this would look cool," check it against the rules below before shipping it.

---

## 0. How to use this document

- **Design in tokens, not values.** Reference `{color.gold}`, `{type.display-lg}`, `{space.lg}`, `{blob.a}` — never raw hex/px in component code. §17 is the only place values live.
- **Every surface is one of four things:** a solid Ink/Parchment section, a bento cell, a glass panel, or a blob. Know which one you're building before you style it — each has its own rulebook (§5, §7, §8).
- **Glass is a budget.** Blur is expensive and, overused, reads as noise. §8.4 lists exactly where it's allowed.
- **Blobs are a budget too.** They are the _environment_, not confetti. §7.5 caps how many are visible at once.
- **Gold is the only accent.** One accent, used with restraint, is what makes a luxury palette feel intentional (§2.4).

---

## 1. Brand foundation & principles

Sorella is a refined Egyptian fragrance house. The design language should feel **editorial, quiet, and expensive** — a printed lookbook that happens to float, not a SaaS dashboard. Four ideas govern every decision:

1. **Atmosphere over ornament.** Depth comes from three sources working together: photography, a single layer of frosted glass, and soft organic blob light behind it. Never gradients-as-decoration, drop-shadow stacks, or a second accent color.
2. **Editorial pace.** Body copy runs at 17px with generous leading; headlines are set in a high-contrast serif with tight tracking. The page should feel _read_, not _scanned_ — even with organic shapes drifting behind it, the reading experience stays calm.
3. **Bento for curation, grid for catalog.** Marketing surfaces (homepage, campaigns, mega-menu) use an asymmetric **bento** layout to create hierarchy. High-count catalog pages (32+ SKUs) use a **uniform grid** for scannability. Never mix the two purposes.
4. **Organic, not decorative.** Blobs exist to give glass something to sit above and to soften the bento grid's right angles at the edges of the composition. They are never load-bearing for content, never behind body-text-only zones without a scrim, and never so numerous the page feels busy.

### 1.1 Do

- Use **`{color.gold}`** for every interactive/attention signal — CTAs, price, active nav state, "Inspired by" borders, cart badge — and nothing else.
- Set headlines in the **display serif** with negative tracking for the editorial, high-contrast cadence.
- Run body copy at **`{type.body}` (17px)**, not 16px.
- Reserve **glass** for the nav dock, hero card, brand-story panels, cart drawer, and mega-menu (§8.4).
- Reserve **blobs** for backdrop atmosphere behind glass zones and as accent shapes at section seams — 1–3 visible per viewport, never more (§7.5).
- Create rhythm by **alternating Ink and Parchment surfaces** full-bleed — the color change is the divider, no border needed.
- Use **bento spans** to signal importance on curated surfaces; keep catalog grids uniform.
- Let a blob's curve **echo** the corner radius of the glass panel nearest it — organic and geometric should rhyme, not clash.

### 1.2 Don't

- Don't introduce a second accent. Every "click me" is Gold.
- Don't use Gold as a large decorative **background fill**, or as **small body text on Parchment** — it fails AA (§2.6, §13).
- Don't use decorative CSS gradients as a substitute for photography; gradients exist only as glass backdrops, hero scrims, and blob fills.
- Don't cascade blur into dense grids — product catalog cards stay **solid** for performance and legibility.
- Don't set body copy in the serif — serif is display-only.
- Don't mix radii grammars — use the scale in §6 and nothing in between.
- Don't rely on color alone for state (sold-out uses a labeled pill, not just a gray-out).
- Don't scatter blobs evenly like wallpaper (bubbles-in-a-lava-lamp reads as a template default) — cluster them with intent at 2–3 anchor zones per page (§7.3).
- Don't let a blob cross behind small body text without a scrim — organic backgrounds are for headlines, glass panels, and negative space, not paragraphs.
- Don't animate blur or a blob's path simultaneously with page scroll on low-end devices — pick one motion channel at a time (§7.6, §12).

---

## 2. Color system

### 2.1 Core palette

| Token               | Hex       | Name           |
| ------------------- | --------- | -------------- |
| `{color.ink}`       | `#1C1F24` | Ink (charcoal) |
| `{color.slate}`     | `#3A4452` | Slate          |
| `{color.mist}`      | `#9AA3AD` | Mist           |
| `{color.parchment}` | `#F2EEE7` | Parchment      |
| `{color.gold}`      | `#C79C5A` | Gold           |

Sorella's palette is deliberately **muted luxury**, not the electric-blue/magenta backdrop glassmorphism usually leans on. The "vibrant backdrop the glass bleeds through" requirement (see brief) is met here by **warm, low-saturation blob blooms in gold, slate, and a rare rose-amber** — never by importing a foreign neon accent. This is a considered adaptation, not a shortcut: a fragrance house's glass should refract candlelight, not a nightclub.

### 2.2 Role mapping

| Role                                                                          | Token               | Notes                                         |
| ----------------------------------------------------------------------------- | ------------------- | --------------------------------------------- |
| Page background (dark mode)                                                   | `{color.ink}`       | Default site surface                          |
| Secondary/layered background, gradient stop                                   | `{color.slate}`     | Section fills, glass gradient base, blob fill |
| Text on light surfaces / dark section fills                                   | `{color.ink}`       | Primary reading color on Parchment            |
| Text on dark surfaces / light glass                                           | `{color.parchment}` | Primary reading color on Ink                  |
| Secondary text, borders, dividers, disabled/sold-out                          | `{color.mist}`      | Never a primary text color for long copy      |
| Accent — CTA fill, price, active state, icon accents, tag borders, cart badge | `{color.gold}`      | Accent only; see §2.4                         |

### 2.3 Derived tints & alphas

| Token                  | Value                    | Use                                                 |
| ---------------------- | ------------------------ | --------------------------------------------------- |
| `{color.ink-90}`       | `rgba(28,31,36,0.90)`    | Glass solid fallback; heavy scrim                   |
| `{color.ink-70}`       | `rgba(28,31,36,0.70)`    | Hero scrim over photography/blobs (text legibility) |
| `{color.ink-35}`       | `rgba(28,31,36,0.35)`    | Glass panel shadow color                            |
| `{color.parchment-65}` | `rgba(242,238,231,0.65)` | Nav dock glass fill (scrolled)                      |
| `{color.parchment-12}` | `rgba(242,238,231,0.12)` | Glass panel fill on dark backgrounds                |
| `{color.parchment-08}` | `rgba(242,238,231,0.08)` | Subtle glass fill / hairline highlight              |
| `{color.mist-25}`      | `rgba(154,163,173,0.25)` | Glass & hairline borders                            |
| `{color.mist-40}`      | `rgba(154,163,173,0.40)` | Dividers on light surfaces                          |
| `{color.gold-15}`      | `rgba(199,156,90,0.15)`  | Gold hover wash, tag fill                           |
| `{color.gold-40}`      | `rgba(199,156,90,0.40)`  | Gold hover border (product card)                    |
| `{color.black-pure}`   | `#000000`                | Reserved; not used as a surface                     |

### 2.4 Gold usage rule

- ✅ **Gold as a solid CTA button fill** with **Ink text** — allowed. Button labels are large/bold and pass AA (§2.6).
- ✅ **Gold as border, price text, active-state indicator, icon, small pill border** — allowed.
- ✅ **Gold as a thin underline / focus ring** — allowed.
- ✅ **Gold as one soft blob bloom**, always at low opacity behind glass, never as a hard-edged fill (§7.4).
- ❌ **Gold as a large decorative section/background fill** — not allowed.
- ❌ **Gold as small body text on Parchment** — not allowed (contrast failure).

### 2.5 Gradients, scrims & blob fills

Gradients are **functional only** — never decorative wallpaper on their own. In this system they serve three jobs: solid-section backdrops, hero legibility scrims, and blob fills (the blob _is_ the gradient's canvas).

| Token                   | Value                                                                                       | Use                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `{gradient.surface}`    | `linear-gradient(160deg, {color.ink} 0%, {color.slate} 100%)`                               | Dark section backdrop behind glass when no photo is present               |
| `{gradient.hero-scrim}` | `linear-gradient(180deg, {color.ink-70} 0%, transparent 40%, {color.ink-70} 100%)`          | Over hero photography/blobs so nav + headline stay legible top and bottom |
| `{gradient.card-sheen}` | `linear-gradient(135deg, {color.parchment-08} 0%, transparent 60%)`                         | Optional 1-pass glass sheen highlight (top-left)                          |
| `{gradient.blob-gold}`  | `radial-gradient(circle at 30% 30%, rgba(199,156,90,0.55) 0%, rgba(199,156,90,0.05) 70%)`   | Primary blob bloom — hero, brand story                                    |
| `{gradient.blob-slate}` | `radial-gradient(circle at 65% 40%, rgba(58,68,82,0.65) 0%, rgba(58,68,82,0.05) 70%)`       | Secondary/cooling blob, balances gold warmth                              |
| `{gradient.blob-rose}`  | `radial-gradient(circle at 40% 60%, rgba(199,140,120,0.35) 0%, rgba(199,140,120,0.04) 70%)` | Rare third bloom — seasonal/campaign moments only                         |

### 2.6 Contrast-verified text pairings

| Foreground          | Background                                     | Ratio                 | Cleared for                                                            |
| ------------------- | ---------------------------------------------- | --------------------- | ---------------------------------------------------------------------- |
| `{color.parchment}` | `{color.ink}`                                  | ~13:1                 | All text                                                               |
| `{color.ink}`       | `{color.parchment}`                            | ~13:1                 | All text                                                               |
| `{color.ink}`       | `{color.parchment-65}` glass                   | ~AA+                  | Nav dock text (scrolled) — safe                                        |
| `{color.parchment}` | `{color.parchment-12}` glass over Ink          | passes (large)        | Headlines/large text on dark glass                                     |
| `{color.gold}`      | `{color.ink}`                                  | ~4.7:1                | **Large text & UI only**; borderline for small body — prefer ≥18px/600 |
| `{color.ink}`       | `{color.gold}` (button fill)                   | ~4.5:1                | Button labels ≥16px/600                                                |
| `{color.gold}`      | `{color.parchment}`                            | ~1.9:1                | ❌ **Fails** — large text/icons/borders only, never body               |
| `{color.mist}`      | `{color.ink}`                                  | ~4.6:1                | Secondary text ≥16px; not for fine print                               |
| `{color.parchment}` | blob at ≤55% opacity + `{gradient.hero-scrim}` | AA (verify per frame) | Headlines over blob fields — scrim is mandatory, not optional          |

**Rules that follow:** Gold is never small body text. Mist is never fine print. Any text sitting over a blob (with or without glass) always carries either the hero scrim or a glass tint layer underneath it — a bare blob is never a text background (§13).

---

## 3. Typography

### 3.1 Type families

| Role                     | Family                  | Stack                                                           | Notes                                                                                                         |
| ------------------------ | ----------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Display / Headings**   | **Fraunces** (variable) | `"Fraunces", "Canela", Georgia, "Times New Roman", serif`       | High optical contrast; optical-size + soft/wonky axes. Premium alternative: **Canela** or **Ogg**.            |
| **Body / UI**            | **Inter** (variable)    | `"Inter", "General Sans", system-ui, -apple-system, sans-serif` | Neutral grotesk; tall x-height reads well at 17px and inside glass/over blobs. Alternative: **General Sans**. |
| **Numeric (price/spec)** | Inter, tabular          | `font-variant-numeric: tabular-nums`                            | Prices, quantities, spec sheets align in columns.                                                             |

**OpenType:** enable `tabular-nums` on prices and cart math. On Fraunces, use the optical-size axis so large display sizes get the high-contrast cut and smaller sizes stay sturdy.

### 3.2 Type scale

| Token                   | Family         | Size | Weight | Line Height | Tracking           | Use                                               |
| ----------------------- | -------------- | ---- | ------ | ----------- | ------------------ | ------------------------------------------------- |
| `{type.display-hero}`   | Serif          | 60px | 400    | 1.05        | -0.5px             | Homepage hero headline                            |
| `{type.display-lg}`     | Serif          | 44px | 400    | 1.08        | -0.4px             | Section heads, brand-story titles                 |
| `{type.display-md}`     | Serif          | 32px | 500    | 1.15        | -0.3px             | Product name (PDP), bento tile titles             |
| `{type.headline}`       | Serif          | 24px | 500    | 1.2         | -0.2px             | Card headlines, subsection heads                  |
| `{type.title}`          | Sans           | 21px | 600    | 1.24        | -0.15px            | Sub-nav category, tagline, prominent UI titles    |
| `{type.lead}`           | Sans           | 20px | 300    | 1.5         | 0                  | Airy lead paragraphs (rare light weight)          |
| `{type.body-lg}`        | Sans           | 18px | 400    | 1.5         | -0.2px             | Emphasized paragraph / intro copy                 |
| `{type.body}`           | Sans           | 17px | 400    | 1.47        | -0.2px             | **Default paragraph**                             |
| `{type.body-strong}`    | Sans           | 17px | 600    | 1.35        | -0.2px             | Inline strong emphasis                            |
| `{type.body-sm}`        | Sans           | 15px | 400    | 1.45        | -0.1px             | Dense copy, secondary descriptions                |
| `{type.caption}`        | Sans           | 14px | 400    | 1.43        | -0.1px             | Captions, button text, filter labels              |
| `{type.caption-strong}` | Sans           | 14px | 600    | 1.3         | -0.1px             | Emphasized captions, active filter                |
| `{type.price}`          | Sans (tabular) | 17px | 600    | 1.2         | 0                  | Product price (Gold on light / Parchment on dark) |
| `{type.eyebrow}`        | Sans           | 12px | 600    | 1.0         | +1.2px (uppercase) | Gold overline above headlines                     |
| `{type.nav-link}`       | Sans           | 15px | 500    | 1.0         | -0.1px             | Nav dock links                                    |
| `{type.fine-print}`     | Sans           | 12px | 400    | 1.4         | 0                  | Footer body, fine print                           |
| `{type.micro-legal}`    | Sans           | 10px | 400    | 1.3         | 0                  | Micro legal disclaimers                           |

### 3.3 Weight ladder

- **Serif (display):** 300 (light, rare/atmospheric) · 400 (regular, default display) · 500 (semibold display).
- **Sans (body/UI):** 300 (rare lead) · 400 (body) · 500 (nav/labels) · 600 (strong/price/buttons) · 700 (reserved, sparing).

### 3.4 Principles

- **Negative tracking at display sizes.** Never applied below 14px.
- **Body at 17px, leading 1.47.** Don't tighten below 1.47.
- **Serif is display-only.**
- **Gold eyebrows** introduce sections; the tracked uppercase device is the signature luxury cue.
- **Headlines over blob fields** always sit on the highest-contrast part of the composition — position the blob's densest color mass _behind_ the negative space beside the headline, not directly behind the letterforms, and back it with `{gradient.hero-scrim}` regardless.

---

## 4. Spacing & layout

### 4.1 Spacing scale

Base unit **8px**. Sub-base values (2, 4, 6) for tight typographic nudges; structural layout snaps to 8/16/24/32.

| Token             | Value | Use                                    |
| ----------------- | ----- | -------------------------------------- |
| `{space.xxs}`     | 4px   | Icon/label gaps, tight nudges          |
| `{space.xs}`      | 8px   | Compact internal padding               |
| `{space.sm}`      | 12px  | Chip padding, small gaps               |
| `{space.md}`      | 16px  | Default component padding, grid gutter |
| `{space.lg}`      | 24px  | Card padding, comfortable gaps         |
| `{space.xl}`      | 32px  | Bento gap, large internal padding      |
| `{space.xxl}`     | 48px  | Between stacked blocks                 |
| `{space.section}` | 80px  | Section vertical padding (desktop)     |

**Button padding:** 12–14px vertical, 20–28px horizontal. **Card padding:** `{space.lg}` (24px). **Section padding:** `{space.section}` (80px desktop), tightening to 48px on large-phone and below.

### 4.2 Grid & container

| Context                                        | Max width                                               | Columns                                 | Gutter              |
| ---------------------------------------------- | ------------------------------------------------------- | --------------------------------------- | ------------------- |
| Text-heavy (brand story, about)                | ~820px                                                  | 1 (centered)                            | —                   |
| Bento (homepage, campaigns)                    | 1280px                                                  | 12-col base, variable spans             | `{space.xl}` (32px) |
| Catalog grid (collection)                      | 1440px                                                  | `repeat(auto-fill, minmax(240px, 1fr))` | `{space.lg}` (24px) |
| Full-bleed (hero, brand-story bg, blob canvas) | 100vw                                                   | —                                       | 0                   |
| Wide desktop lock                              | Content locks at **1440px**; margins absorb extra width |                                         |                     |

### 4.3 Whitespace philosophy

Whitespace is the product's pedestal — and it's also the blob field's stage. Hero and brand-story blocks open with generous air (≥64px above the headline, 48–64px below); this is the same negative space where blobs are allowed to breathe without ever crowding the type. Product renders are never crowded — nearest content sits ≥40px away. **The footer is the deliberate exception**: dense, no blobs, no glass, so the full information architecture is scannable at a glance.

---

## 5. Bento grid system

Bento is reserved for **curated/marketing surfaces** (homepage collections, mega-menu, campaign landings). Catalog pages do **not** use bento.

- **Base:** CSS grid, 12 columns on desktop, gap `{space.xl}` (32px).
- **Cell spans:** `1×1`, `2×1` (wide), `1×2` (tall), `2×2` (feature). Use span to signal importance.
- **Cap:** ≤ 9 primary bento cells in the homepage above-to-fold zone.
- **Responsive collapse:** 12-col → 8-col (tablet) → stacked single column (phone). Feature cells (`2×2`) drop to full-width first.
- **Seasonal cell:** one schema-driven, swappable bento cell (art/copy/link change without a code deploy).
- **Blob-bento relationship:** at most **one** bento cell per fold hosts a background blob (the hero cell, or the seasonal feature cell). Every other cell is a solid or glass surface with no blob behind it — this is what keeps the grid legible instead of turning the whole homepage into a lava lamp (§7.3).

```
Homepage bento (above the fold) — ASCII wireframe

┌───────────────────────────────────┬────────────┐
│  HERO — glass card, 2×2            │  Trust 1×1 │
│  blob bloom behind (gold+slate)    ├────────────┤
│  {type.display-hero} + Gold CTA    │  Trust 1×1 │
└───────────────────────────────────┴────────────┘
┌───────────┬───────────┬───────────────┬─────────┐
│ For Her   │ For Him   │ Unisex — tall │ Bundles │
│  1×1      │  1×1      │  1×2, solid   │  1×1    │
└───────────┴───────────┴───────────────┴─────────┘
┌─────────────────────────────────────────────────┐
│  Seasonal campaign — 2×1, solid or subtle glass  │
└─────────────────────────────────────────────────┘
```

---

## 6. Border radius scale

| Token             | Value                               | Use                                                                                            |
| ----------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| `{radius.none}`   | 0px                                 | Full-bleed hero/brand-story imagery, edge-to-edge sections                                     |
| `{radius.xs}`     | 6px                                 | Inline chips, small tags                                                                       |
| `{radius.sm}`     | 10px                                | Inline card imagery, small buttons, input fields                                               |
| `{radius.md}`     | 14px                                | Compact glass elements, quick-add buttons                                                      |
| `{radius.lg}`     | 20px                                | **Glass panels, bento cells, product cards** (system default)                                  |
| `{radius.xl}`     | 28px                                | Large hero glass card, cart drawer corners                                                     |
| `{radius.pill}`   | 999px                               | Primary Gold CTA, filter chips, "Inspired by" tag, scrolled nav dock                           |
| `{radius.full}`   | 50%                                 | Circular icon controls, avatars, cart badge                                                    |
| `{radius.blob-a}` | `62% 38% 55% 45% / 45% 55% 45% 55%` | Blob shape A — the "primary bloom" silhouette                                                  |
| `{radius.blob-b}` | `40% 60% 65% 35% / 55% 40% 60% 45%` | Blob shape B — the "secondary bloom" silhouette, used to avoid two identical blobs in one view |

Don't mix radii grammars: `{radius.lg}` for panels/cards, `{radius.pill}` for actions/chips, `{radius.md}` for compact glass, `{radius.blob-*}` only for the dedicated blob layer (§7) — and nothing arbitrary in between.

---

## 7. The Blob System (organic shapes)

Blobs are the third structural layer of this design: **bento gives the grid, glass gives the panels, blobs give the light.** They are what makes the glass in §8 have something worth refracting, and what softens the bento grid's right angles at the seams between sections.

### 7.1 Philosophy

- **Blobs are environment, not content.** They never carry text on their own, never act as a button hit-area, and never sit directly under body copy without a scrim.
- **Warmth over neon.** Where generic glassmorphism reaches for electric blue/magenta backdrops, Sorella's blobs are built from the brand palette only — gold, slate, and a rare rose-amber (§2.5). This is the brand's "vibrant backdrop," reinterpreted as candlelight instead of a nightclub.
- **Two shapes, not twenty.** `{radius.blob-a}` and `{radius.blob-b}` (§6) are the only two base silhouettes in the system. Consistency here reads as intentional; a different blob shape on every section reads as generated/templated.
- **Blobs rhyme with glass.** A blob's dominant curve direction should echo the corner radius of the glass panel nearest it, so the organic and geometric layers feel like one composition, not two unrelated effects stacked together.

### 7.2 Construction techniques

Three techniques cover every use case in this system — pick the cheapest one that achieves the shape.

**A. Border-radius blobs (default, cheapest).** For container-based blobs — the background bloom behind a hero glass card, a trust-cell backdrop — use asymmetric `border-radius` percentages, not `clip-path`. This is a single CSS property, animates cheaply, and is enough for 90% of the system's needs.

```css
.blob {
  position: absolute;
  width: clamp(320px, 40vw, 640px);
  aspect-ratio: 1 / 1;
  border-radius: 62% 38% 55% 45% / 45% 55% 45% 55%; /* {radius.blob-a} */
  filter: blur(2px); /* soft edge only — NOT the glass blur, see §7.4 */
  pointer-events: none;
}
```

**B. `clip-path` blobs (precision cases only).** Reserved for the rare instance where a blob needs a hard, precisely-authored silhouette that `border-radius` can't express — e.g. a signature illustrative shape for a seasonal campaign hero. Author coordinates once, store as a token (`{clip.campaign-ramadan}` etc.), and never hand-tune per breakpoint — scale the whole path via a wrapping `<svg viewBox>` instead so the organic integrity holds at every size.

**C. SVG blob layer (for multi-color blooms).** When a single bloom needs a soft multi-stop gradient (`{gradient.blob-gold}` blending into `{gradient.blob-slate}` at an edge), build it as an inline SVG with `<radialGradient>` fills rather than stacking multiple CSS `border-radius` divs — one SVG paints in one layer instead of three, which is cheaper to composite.

```html
<svg class="blob-field" viewBox="0 0 800 800" aria-hidden="true">
  <defs>
    <radialGradient id="blobGold" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#C79C5A" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#C79C5A" stop-opacity="0.02" />
    </radialGradient>
    <radialGradient id="blobSlate" cx="65%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#3A4452" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#3A4452" stop-opacity="0.02" />
    </radialGradient>
  </defs>
  <ellipse cx="260" cy="240" rx="320" ry="280" fill="url(#blobGold)" />
  <ellipse cx="520" cy="380" rx="300" ry="260" fill="url(#blobSlate)" />
</svg>
```

### 7.3 Placement rules — where blobs are allowed

Blobs are permitted **only** in these anchor zones, and at the stated maximum per zone:

| Zone                                   | Max concurrent blobs                      | Notes                                                                      |
| -------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------- |
| Homepage hero (behind Glass Hero Card) | 2 (one gold, one slate)                   | The system's signature moment — see §9 for full spec                       |
| Brand-story panels                     | 1 per panel                               | Alternates gold/slate/rose across the four panels so no two in a row match |
| Seasonal/campaign bento cell           | 1                                         | Swaps with the campaign; part of the schema-driven content (§10)           |
| Mega-menu panel background             | 1, low opacity (≤20%)                     | Must not compete with category tile photography                            |
| Newsletter/offer card                  | 1, small, corner-anchored                 | Never centered behind the form fields                                      |
| Cart drawer                            | 0                                         | Cart is a utility surface — solid glass only, no atmosphere                |
| Product catalog grid                   | 0                                         | Solid cards only — performance budget (§8.4) is spent elsewhere            |
| Product page (PDP)                     | 1, behind the price/notes glass card only | Never behind the product photography itself                                |
| Footer                                 | 0                                         | Dense, utilitarian, no atmosphere                                          |

**Rule of thumb:** if a zone doesn't already have a glass panel in it, it almost certainly shouldn't have a blob either — the two layers are meant to appear together.

### 7.4 Blob-as-backdrop spec (the standard pattern)

This is the pairing used in the hero, brand-story, and campaign cell — a blob field sits in a `position: absolute` layer behind a glass panel, with the panel's own blur doing double duty by softening the blob edges further.

```css
.blob-scene {
  position: relative;
  overflow: hidden; /* blobs never bleed past their section */
  background: var(--gradient-surface);
}

.blob-scene__field {
  position: absolute;
  inset: 0;
  z-index: 0;
  transform: translateZ(0); /* GPU layer hint */
}

.blob-scene__glass-card {
  position: relative;
  z-index: 1; /* glass panel sits above the blob field */
  /* .glass-panel spec, §8.4 */
}
```

- The blob field is a **separate stacking layer** from the glass panel — never paint a blob directly as a glass panel's own `background`, or the two effects fight over the same blur budget.
- Blob edges get a light `filter: blur(2–4px)` of their own — soft-edged, not razor-cut — but this is a cheap small-radius blur, not the 14–18px `backdrop-filter` budget spent on glass (§8.4). Keep the two blur systems mentally and technically separate.
- On the hero specifically: the gold blob sits upper-left (rhymes with `{gradient.card-sheen}`'s light source), the slate blob sits lower-right, overlapping slightly at the panel's edge so the composition feels like one continuous light source rather than two unrelated shapes.

### 7.5 Blob-as-card (occasional, high-impact use)

Rarely — for a seasonal campaign tile or a single standout trust card — the blob shape itself can _be_ the card, not just its backdrop. When this pattern is used:

- The blob card sits **above** its neighbors visually (a slight negative-margin overlap into the adjacent bento cell is allowed here, and only here, per the "blobs bleed into one another" technique) — this is the one place in the system where bento's strict grid gutters are intentionally broken, and it should be used no more than once per page.
- Content inside a blob card stays in the shape's **center mass** (the roundest, most stable area) — icon/number up top, one line of `{type.caption-strong}` below. Never run body-length copy inside a blob card; the irregular edges make wrapped text feel cramped.
- Shadow follows the blob's curve: use a soft, diffused `box-shadow` (borrow `{shadow.glass}`'s color/opacity, not its spread) rather than a rectangular drop shadow, so the shadow doesn't visually "square off" the organic shape.
- On hover: `transform: scale(1.03)` with the shape unchanged — never squash/stretch the blob on interaction, only scale it uniformly.

### 7.6 Motion

- **Ambient drift (default):** background blobs may slowly morph their `border-radius` values (e.g. `62% 38% 55% 45%` → `48% 52% 40% 60%` and back) on an 8–14s ease-in-out loop. This is the _only_ place continuous animation runs on the page — it should read as barely-perceptible, like a candle flame's edge, never as an obvious "the blob is pulsing" effect.
- **Hover (blob cards only):** `transform: scale(1.03)`, 180ms ease-out — matches the system's standard hover timing (§12).
- **Respect `prefers-reduced-motion`:** disable the ambient drift entirely; blobs render as static shapes. Never substitute a different animation — just stop.
- **Never combine** blob-path animation with `backdrop-filter` animation in the same frame budget. If a glass panel is transitioning (e.g. the nav dock condensing), any blob behind it stays static for that transition's duration.

### 7.7 Performance guardrails

- **Cap: 2 blobs visible in the viewport at any scroll position**, system-wide, regardless of how many exist in the DOM above/below the fold.
- Prefer technique **A (`border-radius`)** by default; only reach for **B (`clip-path`)** or **C (`SVG gradient`)** when the visual specifically requires it (§7.2).
- Always add `transform: translateZ(0)` (or `will-change: transform` used sparingly, removed after the animation settles) to blob layers to force GPU compositing, matching the same guidance given for glass panels (§8.5).
- Blob edge blur stays at **2–4px** — this is a cosmetic softening, not a `backdrop-filter` effect, and costs far less. Do not use blob layers as an excuse to add a third independent blur budget beyond what §8.4 already allows for glass.
- On the lowest device tier (per the mobile performance note in §8.5), blobs may render as **static pre-rendered gradient PNGs/WebP** behind the glass instead of live SVG/CSS shapes — visually identical, zero runtime compositing cost.

---

## 8. Elevation, glass & depth

### 8.1 Depth philosophy

Elevation comes from **four** sources, in priority order:

1. **Surface-color change** — alternating Ink and Parchment full-bleed sections. The color change is the divider; no border, no shadow needed.
2. **Blob atmosphere** — the organic light field that gives a section somewhere for glass to "float" over (§7). Present only in the anchor zones listed in §7.3.
3. **Frosted glass** — a single translucent, blurred layer that reads as "floating over content." Used sparingly (§8.4).
4. **One product shadow** — a soft shadow under product renders resting on a surface, to give the bottle weight. Never on cards, buttons, or text.

### 8.2 The layering order (bottom to top)

Every blob+glass scene follows the same stack, so panels never look pasted on:

```
z-index 0   Section background (Ink/Parchment solid or {gradient.surface})
z-index 0   Blob field (§7) — if this zone is on the §7.3 allow-list
z-index 1   Glass panel(s) (§8.4) — content lives here
z-index 2   Foreground product photography / floating UI (nav dock, cart badge)
```

### 8.3 Shadow & glass tokens

| Token                 | Value                             | Use                                                         |
| --------------------- | --------------------------------- | ----------------------------------------------------------- |
| `{shadow.glass}`      | `0 8px 32px {color.ink-35}`       | Glass panels, hero card, brand-story cards                  |
| `{shadow.dock}`       | `0 8px 24px rgba(28,31,36,0.25)`  | Scrolled nav dock                                           |
| `{shadow.product}`    | `0 5px 30px rgba(28,31,36,0.22)`  | Product renders on a surface                                |
| `{shadow.card-hover}` | `0 4px 20px rgba(28,31,36,0.18)`  | Solid product card lift on hover                            |
| `{shadow.blob-card}`  | `0 12px 40px rgba(28,31,36,0.28)` | Blob-as-card only (§7.5) — softer spread, follows the curve |
| `{border.hairline}`   | `1px solid {color.mist-25}`       | Glass borders, sub-nav separator                            |

### 8.4 Glass panel spec & blur budget

Blur is a **budget**. It is allowed only on: **nav dock · hero card · brand-story panels · cart drawer · mega-menu**. The product catalog grid stays **solid** — for performance across 32+ SKU pages (heavy mid-range Android base in Egypt) and to avoid visual noise. Use **10–18px** blur, never 30px+. On mobile, start as low as **6px** if frame drops appear in testing (see §8.5).

```css
/* Standard glass panel — dark-mode default (light tint over Ink), sits above a blob field per §8.2 */
.glass-panel {
  position: relative;
  z-index: 1;
  background: rgba(242, 238, 231, 0.12); /* {color.parchment-12} */
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(154, 163, 173, 0.25); /* {color.mist-25} */
  border-radius: 20px; /* {radius.lg} */
  box-shadow: 0 8px 32px rgba(28, 31, 36, 0.35); /* {shadow.glass} */
  transform: translateZ(0); /* GPU layer hint */
}

/* Progressive-enhancement fallback: no blur support → solid Ink, no fog */
@supports not (
  (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
) {
  .glass-panel {
    background: rgba(28, 31, 36, 0.9);
  } /* {color.ink-90} */
}
```

Every glass surface must be QA'd with the `@supports` fallback forced on, so no browser ever ships a flat foggy-gray box.

### 8.5 Performance discipline (glass + blob combined)

- **Limit simultaneous `backdrop-filter` elements** to what's on screen at once — typically the nav dock plus one hero/brand-story panel, never more.
- **Never animate `backdrop-filter` alone.** If a glass panel must transition (the nav dock condensing, §9), animate `background`, `transform`, and `color` together on one timing function; treat blur changes as the most expensive part of that transition and test on a mid-range Android device before shipping.
- **Blob layers and glass layers are separate GPU layers** (§7.7, §8.4) — both get `translateZ(0)`, but never merge a blob's blur into a glass panel's `backdrop-filter` call.
- **Static fallback path:** on detected low-end devices, both blobs and glass may downgrade together — blobs become pre-rendered images (§7.7), glass falls back to the solid-ink `@supports` block (§8.4) — so the two systems degrade in lockstep rather than one surviving and the other not.

---

## 9. The Adaptive Nav Dock (signature interaction)

The nav is the first thing a visitor experiences and the anchor interaction of the rebuild. It has **two scroll-driven states**, and it sits at the top of the one place in the system where blob, glass, and bento all appear together (the hero).

### 9.1 State A — Top of page (transparent)

- Full-width, no background, no border, no shadow — intentionally "invisible" so the hero — blob field and all — reads full-bleed underneath it.
- Logo, links, and icons rendered in **Parchment** with a **soft dark text-shadow** (`0 1px 3px {color.ink-70}`) so they stay legible over both the photography and the gold/slate blob bloom behind the hero.
- Taller/roomier height (**88px**).
- No blur.

### 9.2 State B — Scrolled (glass dock)

- **Trigger:** tie to the hero's bottom edge (roughly 80–120px), not a hardcoded pixel.
- **Condenses** into a docked bar: shorter (**56–64px**), and narrower than a typical full-width sticky nav — a centered, inset capsule with `max-width: 920px`, ≥16–24px from the viewport edge, floating `12–16px` below the top.
- **Glass treatment** (persistent single element — blur is always justified here regardless of the §8.4 budget; no blob sits behind the dock itself, only behind the hero content it floats over):

```css
.nav-dock {
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%) translateZ(0);
  max-width: 920px;
  width: calc(100% - 32px);
  height: 60px;
  border-radius: 999px; /* {radius.pill} */
  background: rgba(242, 238, 231, 0.65); /* {color.parchment-65} */
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(154, 163, 173, 0.25); /* {color.mist-25} */
  box-shadow: 0 8px 24px rgba(28, 31, 36, 0.25); /* {shadow.dock} */
  color: #1c1f24;
  transition:
    background 300ms ease-out,
    backdrop-filter 300ms ease-out,
    max-width 300ms ease-out,
    height 300ms ease-out,
    top 300ms ease-out,
    border-radius 300ms ease-out,
    color 300ms ease-out;
}

.nav-dock--top {
  /* State A */
  top: 0;
  max-width: 100%;
  width: 100%;
  height: 88px;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-color: transparent;
  box-shadow: none;
  color: #f2eee7;
  text-shadow: 0 1px 3px rgba(28, 31, 36, 0.7);
}
```

- **Transition:** animate `background`, `backdrop-filter`, `width/max-width`, `height`, `top`, `border-radius`, and `color` together on one 250–350ms ease-out — never an instant snap.
- **Color flip** (Parchment → Ink) times to the background fill's midpoint so there's no moment of low contrast.

### 9.3 Structure & content

| Zone   | Content                                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Left   | Logo — compact icon mark in the docked state; full wordmark allowed in the transparent top state if room                                                      |
| Center | Primary links: **For Her / For Him / Unisex / Perfume Oil / Bundles** — collapse to a **"Shop" mega-menu trigger** if the dock can't fit all five comfortably |
| Right  | Search icon · account icon · cart icon (with item-count **badge in Gold**)                                                                                    |

The mega-menu drops as its own wide/full-width glass panel (independent of the dock's compact footprint), with a single low-opacity blob behind its bento category tiles (§7.3).

### 9.4 Scroll behavior

- Docked nav **stays visible on scroll-up**, **hides on scroll-down** past a threshold. _(Confirm with client — §18.)_

### 9.5 Mobile

- Same two-state logic, but the docked state becomes a **full-width** glass bar. A persistent nav element is the one justified exception to limiting mobile blur (and the one nav-adjacent zone where a blob is never placed, keeping mobile compositing cost low).
- Hamburger opens a **full-height glass drawer** (§10), not a dropdown.

### 9.6 States to design & QA

Transparent over light photo · transparent over dark/gradient/blob backdrop · docked glass · scroll-up vs scroll-down · cart drawer open with nav visible (test z-index + blur layering together, since both use glass).

---

## 10. Component library

Build each once as a schema-driven Shopify section/block (`sorella-` prefix, §16) and reuse — never re-implement per page.

| Component                        | Spec summary                                                                                                                                     | Blob?                 | Used on                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | -------------------------------------------------- |
| **Adaptive Nav Dock**            | §9 — transparent → glass dock                                                                                                                    | No                    | All pages                                          |
| **Glass Hero Card**              | Large asymmetric glass panel over photo/video bg + blob field, `{gradient.hero-scrim}`, `{type.display-hero}` headline + Gold CTA, `{radius.xl}` | Yes (2, §7.3)         | Homepage, campaigns, collection landing (optional) |
| **Bento Cell (Category)**        | Photographic tile, single CTA, variable span (1×1…2×2), `{radius.lg}`, gold hover border                                                         | No                    | Homepage collections, mega-menu                    |
| **Bento Cell (Trust/Stat)**      | Small glass card, icon + short claim, `{radius.lg}`                                                                                              | No (default)          | Homepage hero trio, brand story                    |
| **Blob Feature Card**            | Organic-silhouette card per §7.5, center-mass content only, negative-margin overlap allowed                                                      | Yes (is the blob)     | One per page max — seasonal or hero trust moment   |
| **Product Card (Catalog)**       | **Solid** Parchment/Ink card (no blur, no blob), image, name `{type.headline}`, price `{type.price}` in Gold, quick-add; gold hover border       | No                    | Collection grids                                   |
| **Product Card (Sold Out)**      | Same shell at ~55% opacity, desaturated image, Mist "Sold out" pill                                                                              | No                    | Collection grids                                   |
| **Product Card (Quick-Add SKU)** | Compact variant for impulse items                                                                                                                | No                    | Musks/testers, bundle builder, cart upsell         |
| **Notes Pyramid Widget**         | 3-tier mini-diagram or stacked mini-cards (top/heart/base)                                                                                       | No                    | Product page                                       |
| **"Inspired By" Tag**            | Small pill, `{color.gold-40}` border, `{color.gold-15}` fill, `{radius.pill}`                                                                    | No                    | Product card, product page                         |
| **Testimonial Glass Card**       | Structured review — name, verified badge, date, quote, star rating in Gold, `{radius.lg}`                                                        | No                    | Homepage reviews, PDP reviews tab                  |
| **Brand-Story Block**            | Full-bleed alternating glass panel over photography + single blob, Parchment text, `{type.display-lg}`                                           | Yes (1, §7.3)         | About page, homepage (single instance)             |
| **Sticky Filter/Sort Bar**       | Glass bar sticky under nav; no blob, blur does **not** cascade into the grid below                                                               | No                    | Collection pages                                   |
| **Mega-Menu Panel**              | Wide glass dropdown, bento category tiles, low-opacity blob behind                                                                               | Yes (1, ≤20% opacity) | Nav (desktop)                                      |
| **Mobile Nav Drawer**            | Full-height glass panel, slide-in                                                                                                                | No                    | Nav (mobile)                                       |
| **Cart Drawer**                  | Glass side panel, compact line-item cards, subtotal, upsell slot, `{radius.xl}`                                                                  | No (§7.3)             | All pages                                          |
| **Newsletter/Offer Card**        | Glass card or modal, corner-anchored blob                                                                                                        | Yes (1, small)        | Homepage, exit-intent (optional)                   |
| **Seasonal Campaign Cell**       | Schema-driven bento cell, art/copy/link swap without deploy                                                                                      | Yes (1)               | Homepage, collection landing                       |

---

## 11. Breakpoints & responsive

| Name             | Width       | Key changes                                                                                                                                 |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Small phone      | ≤ 419px     | Single-column; nav docked = full-width bar; hero drops to `{type.display-md}` (32px); section padding → 40px; blobs render as static images |
| Phone            | 420–640px   | Single-column stack; product renders scale to 80% of tile; catalog grid = 1–2 col; blob field scales via `clamp()`, no distortion           |
| Large phone      | 641–735px   | Section padding tightens 80px → 48px; fine-print wraps                                                                                      |
| Tablet portrait  | 736–833px   | Nav collapses to hamburger + glass drawer; bento → single/2-col stack                                                                       |
| Tablet landscape | 834–1023px  | Nav expands; bento 12→8 col; catalog 3-col                                                                                                  |
| Small desktop    | 1024–1068px | Full layout; hero `{type.display-lg}`; catalog 3–4 col                                                                                      |
| Desktop          | 1069–1440px | Full bento; catalog 4–5 col; content max 1440px                                                                                             |
| Wide desktop     | ≥ 1441px    | Content locks at 1440px; margins absorb extra width                                                                                         |

**Structural breakpoints that matter for build:** 1440 (content lock) · 1068 (desktop shrink) · 833 (nav → hamburger; bento collapse) · 640 (phone single-column) · 419 (small-phone type drop, blob → static image swap).

**Blob scaling rule:** blob dimensions are always set with `clamp(min, vw-based-preferred, max)`, never a fixed px value, so the organic silhouette scales proportionally instead of distorting at odd viewport widths (per the blob responsiveness guidance).

**Image behavior:** responsive `srcset`/`sizes` with breakpoint-matched crops; hero art direction may switch to a taller crop on mobile; product renders keep 1:1 / 4:3 aspect; lazy-load by default, hero loads eagerly; CDN-optimized WebP.

---

## 12. Touch targets & interaction states

### 12.1 Touch targets

- **Minimum 44 × 44px** for all primary interactive elements. Primary CTA ~44 × 120px. Icon controls exactly 44 × 44px.
- Nav dock utility icons may sit slightly tighter on desktop; the mobile hamburger + drawer replaces them ≤ 833px.

### 12.2 Interaction states (system-wide)

| State                    | Treatment                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Hover — button**       | Gold CTA: subtle brightness lift + `{shadow.card-hover}`. Ghost/text: Gold underline or `{color.gold-15}` wash. |
| **Hover — product card** | Gold border (`{color.gold-40}`) fades in + card lifts with `{shadow.card-hover}`; quick-add reveals.            |
| **Hover — blob card**    | `transform: scale(1.03)`, shape unchanged, `{shadow.blob-card}` deepens slightly (§7.5).                        |
| **Active / press**       | `transform: scale(0.97)` on every button.                                                                       |
| **Focus (keyboard)**     | 2px Gold focus ring, 2px offset (`outline: 2px solid {color.gold}; outline-offset: 2px`).                       |
| **Disabled / sold-out**  | Mist text/border, reduced opacity, labeled state (never color-only).                                            |
| **Loading**              | Skeleton in `{color.mist-25}` on the component's own radius; no layout shift.                                   |

---

## 13. Accessibility guardrails

- **Gold on Parchment fails AA** for body text — Gold is for large text, icons, borders, and solid-fill buttons only (§2.6).
- **Nav transparent state** always carries a text-shadow safety net; verify ≥4.5:1 effective contrast against the lightest and darkest hero frames (photography _and_ blob field).
- **No body text sits on a bare blob.** Every blob-adjacent headline is backed by `{gradient.hero-scrim}` or a glass tint layer — never the blob's raw gradient alone (§2.6, §7.3).
- **State is never color-only** — sold-out uses a labeled Mist pill; errors pair color with an icon + text.
- **Docked glass:** confirm Ink-on-Parchment-glass passes AA.
- **Focus visible everywhere** (§12.2) — Gold ring, 2px offset.
- **Reduced motion** honored: disables blob ambient drift (§7.6) and nav morph animation alike (§14).
- **Blobs are `aria-hidden="true"` / `pointer-events: none`** — they are decorative atmosphere, never announced to assistive tech and never intercepting clicks meant for content above them.

---

## 14. Motion & animation

- **Nav dock condense/expand:** 250–350ms ease-out, all properties on one timing function (§9.2).
- **Button press:** `scale(0.97)`, ~120ms.
- **Hover reveals (card border, quick-add, blob card scale):** 150–200ms ease-out.
- **Drawers (cart, mobile nav):** slide-in 300ms ease-out, backdrop scrim fades with it.
- **Blob ambient drift:** 8–14s ease-in-out loop, `border-radius` values only (§7.6) — the one continuous/looping animation in the system.
- **Never animate `blur` alone** — the most GPU-expensive property to transition on low-end devices. Animate `background`/`opacity`/`transform` together; cross-fade a pre-blurred layer if frame drops appear.
- **Never run a blob-path animation and a `backdrop-filter` transition in the same frame window** (§7.6, §8.5) — stagger them.
- **Respect `prefers-reduced-motion`:** disable transforms/parallax/blob drift, keep opacity fades, make the nav state change instantaneous (no morph).

---

## 15. Voice & microcopy

Active-voice, specific, warm — never default Shopify system text.

- "Add to bag," not "Submit."
- "Sold out — notify me," not a bare grayed-out button.
- Empty cart / empty search / "added to bag" confirmations speak in the same plain, warm register as product copy.
- Content that must exist and doesn't today (author before templates finalize): **notes pyramids**, **"Inspired by [X]" framing** (pending §18 legal sign-off), **real brand story**, **structured review data**, **lifestyle photography**, **seasonal campaign copy**, **state microcopy**.

---

## 16. RTL & technical/Shopify guardrails

- **RTL/Arabic:** decide (§18) whether the rebuild ships `dir="rtl"` support or stays English-UI/Arabic-content — this drives nav icon mirroring and bento grid mirroring logic. Blob positions (e.g. "gold blob upper-left") must be authored as logical (`inset-inline-start`) rather than physical (`left`) so they mirror automatically. Build layout with logical properties throughout so RTL is a switch, not a rewrite.
- **Blur performance:** limit `backdrop-filter` to the §8.4 budget; 10–18px, never 30px+; product grid stays solid.
- **Blob performance:** limit to 2 concurrent visible blobs system-wide (§7.7); static-image fallback on low-end devices.
- **`@supports` fallback:** ship and test the solid-Ink fallback so no browser renders a foggy-gray box.
- **Section/schema architecture:** strict `sorella-`-prefixed section/block naming; **zero hardcoded copy** (schema-driven, so seasonal campaigns — including their blob/color variant — swap without a deploy); Playwright MCP visual QA per breakpoint before merge — the **nav dock needs a scroll-triggered QA pass**, and the **hero blob field needs a QA pass with `prefers-reduced-motion` forced on**, not just static screenshots.

---

## 17. Consolidated token reference (CSS custom properties)

```css
:root {
  /* Color — core */
  --color-ink: #1c1f24;
  --color-slate: #3a4452;
  --color-mist: #9aa3ad;
  --color-parchment: #f2eee7;
  --color-gold: #c79c5a;

  /* Color — derived */
  --color-ink-90: rgba(28, 31, 36, 0.9);
  --color-ink-70: rgba(28, 31, 36, 0.7);
  --color-ink-35: rgba(28, 31, 36, 0.35);
  --color-parchment-65: rgba(242, 238, 231, 0.65);
  --color-parchment-12: rgba(242, 238, 231, 0.12);
  --color-parchment-08: rgba(242, 238, 231, 0.08);
  --color-mist-25: rgba(154, 163, 173, 0.25);
  --color-mist-40: rgba(154, 163, 173, 0.4);
  --color-gold-15: rgba(199, 156, 90, 0.15);
  --color-gold-40: rgba(199, 156, 90, 0.4);

  /* Gradients & blob fills */
  --gradient-surface: linear-gradient(
    160deg,
    var(--color-ink) 0%,
    var(--color-slate) 100%
  );
  --gradient-hero-scrim: linear-gradient(
    180deg,
    var(--color-ink-70) 0%,
    transparent 40%,
    var(--color-ink-70) 100%
  );
  --gradient-card-sheen: linear-gradient(
    135deg,
    var(--color-parchment-08) 0%,
    transparent 60%
  );
  --gradient-blob-gold: radial-gradient(
    circle at 30% 30%,
    rgba(199, 156, 90, 0.55) 0%,
    rgba(199, 156, 90, 0.05) 70%
  );
  --gradient-blob-slate: radial-gradient(
    circle at 65% 40%,
    rgba(58, 68, 82, 0.65) 0%,
    rgba(58, 68, 82, 0.05) 70%
  );
  --gradient-blob-rose: radial-gradient(
    circle at 40% 60%,
    rgba(199, 140, 120, 0.35) 0%,
    rgba(199, 140, 120, 0.04) 70%
  );

  /* Typography — families */
  --font-display: "Fraunces", "Canela", Georgia, "Times New Roman", serif;
  --font-body: "Inter", "General Sans", system-ui, -apple-system, sans-serif;

  /* Spacing (8px base) */
  --space-xxs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  --space-section: 80px;

  /* Radius */
  --radius-none: 0;
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 999px;
  --radius-full: 50%;
  --radius-blob-a: 62% 38% 55% 45% / 45% 55% 45% 55%;
  --radius-blob-b: 40% 60% 65% 35% / 55% 40% 60% 45%;

  /* Elevation */
  --shadow-glass: 0 8px 32px var(--color-ink-35);
  --shadow-dock: 0 8px 24px rgba(28, 31, 36, 0.25);
  --shadow-product: 0 5px 30px rgba(28, 31, 36, 0.22);
  --shadow-card-hover: 0 4px 20px rgba(28, 31, 36, 0.18);
  --shadow-blob-card: 0 12px 40px rgba(28, 31, 36, 0.28);
  --border-hairline: 1px solid var(--color-mist-25);

  /* Glass / blur */
  --blur-panel: 14px;
  --blur-dock: 18px;
  --blur-blob-edge: 3px;

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-dock: 300ms;
  --dur-hover: 180ms;
  --dur-press: 120ms;
  --dur-drawer: 300ms;
  --dur-blob-drift: 11000ms;
}
```

Type-scale tokens (§3.2) map to utility classes/`font:` shorthands in the theme — size, weight, line-height, and tracking bundled per token so headings never drift from the scale.

---

## 18. Open questions (confirm before/early in Phase 0)

1. **Typography pair** — this doc commits to **Fraunces (display) + Inter (body)**. Approve, or swap to premium (Canela/Ogg + General Sans)? Affects every glass panel's padding/leading and blob-field composition.
2. **Gold-fill CTA** — confirm §2.4: Gold solid fill with Ink text is approved for primary buttons.
3. **Nav scroll-hide** — hide-on-scroll-down / reveal-on-scroll-up (§9.4), or stay pinned once docked?
4. **RTL/Arabic** — in scope for this rebuild, or a later phase? Drives nav mirroring, bento mirroring, and blob logical-positioning.
5. **Lifestyle photography source** — client / AI-generated / stock? Current assets are product-on-white and won't support hero/brand-story cells or the blob-field pairing.
6. **"Inspired by [designer fragrance]"** — legally/brand-safe to state explicitly on-site?
7. **Mega-menu vs. flat five-link nav** — for the docked state's link count.
8. **Blob motion tolerance** — confirm the 8–14s ambient drift (§7.6) reads as "alive" rather than "distracting" once built; this is the one net-new motion pattern versus the original design system and should get an early client look before Phase 1 locks it in.

---

## 19. Build phases (reference)

0. **Foundations** — tokens (§17), glass panel, blob layer (both CSS and SVG techniques), adaptive nav dock (both states + transition), bento grid utilities, `@supports` fallback, base layout.
1. **Homepage** — hero bento with blob field + glass card, collections bento grid, seasonal cell (with its own blob variant), brand-story block, best-sellers row, reviews, newsletter.
2. **Collection & product** — catalog grid (non-bento, no blob), sticky filter/sort bar, PDP bento layout with single price-card blob, notes pyramid, "inspired by" tag, sold-out state.
3. **Content & polish** — About story blocks (alternating blob hues), cart drawer, mobile nav drawer + mega-menu, mobile pass (static blob fallback), Playwright QA across templates + both nav states + `prefers-reduced-motion`, blur/blob performance audit on a representative mid-range Android device.


<!-- ArtDirection.md.md -->
# Sorella (sorella-eg.com) — Full Redesign Report

**Glassmorphism × Bento Grid Direction | Prepared for: Ahmed Aboelsnoon**
**Date:** July 1, 2026

---

## 1. Executive Summary

Sorella is a live Shopify perfume store running a generic out-of-the-box theme ("Wema Solutions"): a broken/unstyled hero loop, a flat six-tile collection grid, default review app blocks, and a bare-bones product page. There is no visual identity beyond the logo.

This report defines the full rebuild in the **glassmorphism + bento grid** direction, on the charcoal/gold/parchment palette (`#1C1F24`, `#3A4452`, `#9AA3AD`, `#F2EEE7`, `#C79C5A`). It covers:

- The **navigation system** — a transparent-to-glass adaptive header (detailed spec in §2), which is the first thing a visitor experiences and sets the tone for the whole site.
- **Content strategy** — what needs to exist that doesn't today (notes pyramids, brand story, structured reviews).
- **Reusable component library** — every glass/bento building block, defined once and re-used across templates.
- **Page-by-page layout and structure** — homepage, collection, product, about, cart.
- **Design system and technical guardrails** — carried over and refined from the original audit.

Architecturally this mirrors the pattern already proven on the GRO Hair project, so the component library, glass system, and QA workflow are largely reusable with palette and content swaps.

---

## 2. Navigation System — Adaptive Glass Dock

This is the signature interaction of the rebuild, so it gets its own section before anything else.

### 2.1 Behavior

The nav has **two states**, driven by scroll position:

**State A — Top of page (transparent)**

- Full-width, no background, no border, no shadow.
- Sits directly over the hero imagery/gradient — logo, links, and icons rendered in Parchment (`#F2EEE7`) with a soft dark text-shadow so they stay legible over variable hero content.
- No blur, no glass — this state is intentionally "invisible" so the hero reads as full-bleed.
- Height: taller/roomier than the scrolled state (e.g. 88px) to feel like an opening title card, not a utility bar.

**State B — On scroll (glass dock)**

- Triggers once the user scrolls past the hero (roughly 80–120px, or past the fold — tie the trigger to the hero's bottom edge rather than a fixed pixel value so it stays correct across different hero heights).
- Condenses into a **docked bar**: shorter height (56–64px), and — per the brief — **narrower than a typical full-width sticky nav**. Instead of spanning edge-to-edge, it becomes a centered, inset capsule/bar with margin on both sides (e.g. `max-width: 920px` on desktop, centered, with `16–24px` from the viewport edge at minimum), floating slightly below the top of the viewport (`top: 12–16px`) rather than flush against it.
- Applies the glass panel treatment: Parchment-tinted translucent fill, blur, thin Mist border, soft ink shadow (see §6.2 for the exact spec) — this is the one place blur is always justified regardless of the "limit blur usage" guardrail, since it's a single persistent element, not a repeated grid.
- Rounded pill/rounded-rect shape (`border-radius: 999px` or a large `28–32px` radius) reinforces that it's a floating dock, not a bar — visually distinct from the edge-to-edge transparent state above it.
- Transition between states is a smooth eased animation on `background`, `backdrop-filter`, `width/max-width`, `top`, and `border-radius` together (250–350ms, ease-out) — never an instant snap; the nav should feel like it "condenses" into the dock rather than swapping.
- Text/icon color flips from Parchment (state A, for dark hero backgrounds) to Ink (`#1C1F24`, state B, for legibility on the light glass fill) at the same transition speed, timed to the background fill's midpoint so there's no moment of low contrast.

### 2.2 Structure & Content

| Zone   | Content                                                                                                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Left   | Logo mark (compact icon-only version for the docked state; full wordmark allowed in the transparent top state if there's room)                                                           |
| Center | Primary links: **For Her / For Him / Unisex / Perfume Oil / Bundles** — collapse to a "Shop" mega-menu trigger below a set breakpoint if the docked width can't fit all five comfortably |
| Right  | Search icon, account icon, cart icon (with item-count badge in Gold)                                                                                                                     |

Because the docked bar is intentionally narrower than the content grid below it, the mega-menu (when a "Shop" trigger is used) should **not** be width-locked to the nav bar — it drops down as its own full-width or wide glass panel, independent of the dock's compact footprint, so it has room for the bento-style category tiles described in §4.

### 2.3 Mobile Behavior

- Same two-state logic, but the docked state on mobile becomes a full-width (not inset) glass bar — the "narrower than usual" treatment is a desktop refinement; on small viewports, edge-to-edge is more usable and matches the guardrail against mobile blur overuse being the only exception that stays justified for a persistent nav element.
- Hamburger menu opens a full-height glass drawer (see component library, §4) rather than a dropdown.

### 2.4 States to Design For

- Transparent top state, light content behind it (photography) — verify text-shadow keeps 4.5:1+ effective contrast.
- Transparent top state, dark/gradient content behind it — same check.
- Docked glass state — confirm Ink-on-Parchment-glass contrast passes AA (this should be safe; it's the inverse of the risky Gold-on-Parchment case flagged in §6.3).
- Scroll-up vs. scroll-down: recommend the docked nav **stays visible on scroll-up** and **hides on scroll-down** past a threshold, so it doesn't compete for space while someone is reading a product description, but reappears the moment they want to navigate.
- Cart drawer open with nav visible — z-index and blur layering need to be tested together since both use glass.

---

## 3. Content Strategy — What Needs to Exist

The current site's biggest gap is content, not styling. Before any template is final, the following need to be authored or sourced:

1. **Notes pyramid** (top / heart / base notes) per product — does not exist today; this is the single most-expected piece of content in the fragrance category and the biggest trust gap versus competitors like Dossier.
2. **"Inspired by [X]" framing** per SKU, pending the legal/brand-safety confirmation in §8 — customer reviews already describe products this way informally ("zay el original bezabt"), so the brand voice already implies it; making it official copy just formalizes it.
3. **Real brand story** — sourcing, Egypt-made angle, oils-vs-alcohol claim if applicable, any cruelty-free/non-toxic claim. Today "About Sorella" is a bare link with no content surfaced anywhere.
4. **Structured review data** — reviewer name, verified-purchase badge, date, and a per-review card, replacing the current single run-on paragraph of concatenated quotes.
5. **Lifestyle photography** — bottle-in-hand, bottle-with-ingredients, environmental shots — current assets are flat product-on-white only, which won't support hero or brand-story bento cells.
6. **Seasonal/campaign copy** — since the seasonal bento cell (Ramadan Specials today) is meant to be schema-driven and swappable, each campaign needs its own short headline/subhead/CTA copy prepared ahead of the swap date, not written ad hoc.
7. **Microcopy for state changes** — sold-out label, "added to bag" cart confirmation, empty cart/search states — none of this exists in a branded voice today; it should be written in plain, active-voice language consistent with the rest of the site (see §6.4 tone note).

---

## 4. Reusable Component Library

Defining these once, independent of any single page, is what makes Phase 0 valuable — every later phase just assembles these.

| Component                        | Description                                                                                            | Used on                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **Adaptive Nav Dock**            | Transparent → glass dock header, per §2                                                                | All pages                                                   |
| **Glass Hero Card**              | Large asymmetric glass panel over gradient/photo background, headline + CTA                            | Homepage, collection landing (optional), seasonal campaigns |
| **Bento Cell (Category)**        | Photographic tile with a single CTA, variable span (1×1, 1×2, 2×1, 2×2)                                | Homepage collections grid, mega-menu                        |
| **Bento Cell (Trust/Stat)**      | Small glass card, icon + short claim (e.g. "Free 5ml over 1,100 LE," "Made fresh in Egypt")            | Homepage hero trio, brand-story page                        |
| **Product Card (Catalog)**       | Solid parchment/ink card, gold hover border, no blur — image, name, price, quick-add                   | Collection grids (32+ SKU pages)                            |
| **Product Card (Sold Out)**      | Same shell, ~55% opacity, desaturated image, Mist "Sold out" pill replacing the CTA                    | Collection grids                                            |
| **Product Card (Quick-Add SKU)** | Compact variant for low-price impulse items (musks, 5ml testers) — smaller footprint, price emphasized | Musks/testers collections, bundle builder                   |
| **Notes Pyramid Widget**         | 3-tier mini-diagram or stacked mini-cards (top/heart/base)                                             | Product page (new)                                          |
| **"Inspired By" Tag**            | Small gold-bordered pill under the product name                                                        | Product card, product page                                  |
| **Testimonial Glass Card**       | Structured review — name, verified badge, date, quote, star rating                                     | Homepage reviews section, product page reviews tab          |
| **Brand-Story Block**            | Full-bleed alternating glass panel, photographic background, parchment text                            | About page, homepage (single instance)                      |
| **Sticky Filter/Sort Bar**       | Glass bar, sticky under the nav, no blur cascading into the grid below it                              | Collection pages                                            |
| **Mega-Menu Panel**              | Wide glass dropdown, bento-style category tiles, independent width from the nav dock                   | Nav                                                         |
| **Mobile Nav Drawer**            | Full-height glass panel, slide-in                                                                      | Nav (mobile)                                                |
| **Cart Drawer**                  | Glass side panel, line items, subtotal, upsell slot                                                    | All pages                                                   |
| **Newsletter/Offer Card**        | Glass card or modal, replaces the current unstyled popup                                               | Homepage, exit-intent (optional)                            |
| **Seasonal Campaign Cell**       | Schema-driven bento cell, swappable art/copy/link without a code deploy                                | Homepage, collection landing                                |

Each component should be built once as a schema-driven Shopify section/block (per the `sorella-` naming convention in §7) and reused rather than re-implemented per page.

---

## 5. Page-by-Page Layout & Structure

### 5.1 Homepage

```
[ Adaptive Nav Dock — transparent over hero, docks on scroll ]

[ HERO — 2/3 wide glass card, lifestyle/video bg, headline + CTA ]
                                          [ Free-5ml-offer trust card — 1/3 ]
                                          [ "Made in Egypt" trust card — 1/3 ]

[ For Her ]  [ For Him ]  [ Unisex — tall, spans 2 rows ]  [ Bundles ]
[ Seasonal campaign cell — schema-driven, swappable ]

[ Brand-story block — full width glass, parchment text on photographic bg ]

[ Best sellers — dense uniform bento row, 4–6 product cards, hover quick-add ]

[ Reviews — 3-up testimonial glass cards ]

[ Newsletter/offer card ]
[ Footer ]
```

- Cap at ≤9 primary bento cells above the fold-to-fold zone, per the original brief's guardrail.
- Seasonal cell is the swappable "trending drop" — Ramadan Specials today, Valentine's/other campaigns later — without a code deploy.

### 5.2 Collection Page (e.g. For Her — 32 products)

```
[ Adaptive Nav Dock ]
[ Sticky glass filter/sort bar ]
[ Uniform product grid — repeat(auto-fill, minmax(240px, 1fr)) ]
  - Solid cards, gold hover border, no blur
  - Sold-out cards demoted per §4 spec
[ Pagination / load more ]
```

- Deliberately **not** bento — a 32-SKU catalog needs scannability over hierarchy; bento is reserved for curated/marketing surfaces (homepage, campaigns).

### 5.3 Product Page (e.g. Bordeaux)

```
[ Adaptive Nav Dock ]
[ Large image cell — ~55% width ]   [ Price/variant glass card ]
                                     [ Notes pyramid widget — NEW ]
                                     [ "Inspired by" tag, if applicable ]
                                     [ Shipping/guarantee glass card ]
[ Structured reviews — testimonial glass cards ]
[ Related/complete-the-set row ]
```

### 5.4 About Page

```
[ Adaptive Nav Dock ]
[ Brand-story block 1 — origin ]
[ Brand-story block 2 — sourcing/quality claim ]
[ Brand-story block 3 — Egypt-made angle ]
[ Brand-story block 4 — sustainability/cruelty-free, if applicable ]
```

- Alternating full-bleed panels, mirroring Dossier's "High Standards & Non-Toxic" pattern — currently this page is a bare link with no homepage presence at all.

### 5.5 Cart / Checkout Entry

- Glass drawer, not a full page — line items as compact cards, subtotal, an upsell slot for quick-add SKUs (musks/testers) since those already have a distinct compact card component.

---

## 6. Design System

### 6.1 Color Role Mapping

| Token      | Hex       | Role                                                                                                         |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| Base / Ink | `#1C1F24` | Page background, dark section fills, text on light glass                                                     |
| Slate      | `#3A4452` | Secondary background layer, gradient stop                                                                    |
| Mist       | `#9AA3AD` | Borders, dividers, disabled/sold-out state, secondary text                                                   |
| Parchment  | `#F2EEE7` | Light glass tint base, text on dark glass                                                                    |
| Gold       | `#C79C5A` | CTAs, price, active nav state, icon accents, "inspired by" tag border — accent only, never a fill background |

### 6.2 Glass Panel Spec

```css
.glass-panel {
  background: rgba(242, 238, 231, 0.1); /* Parchment tint, dark mode default */
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(154, 163, 173, 0.25); /* Mist border */
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(28, 31, 36, 0.35);
}

@supports not (backdrop-filter: blur(1px)) {
  .glass-panel {
    background: rgba(28, 31, 36, 0.85); /* fallback: solid ink, no blur */
  }
}

/* Nav dock — narrower, higher blur priority, own radius */
.nav-dock {
  max-width: 920px;
  margin: 12px auto 0;
  border-radius: 999px;
  background: rgba(242, 238, 231, 0.65);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(154, 163, 173, 0.25);
  box-shadow: 0 8px 24px rgba(28, 31, 36, 0.25);
  transition:
    background 300ms ease-out,
    backdrop-filter 300ms ease-out,
    max-width 300ms ease-out,
    top 300ms ease-out,
    border-radius 300ms ease-out;
}

.nav-dock--top {
  max-width: 100%;
  margin-top: 0;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-color: transparent;
  box-shadow: none;
}
```

- Reserve blur for: nav dock, hero card, brand-story cards, cart drawer, mega-menu panel.
- Product grid stays unblurred — solid cards with a gold hover border, both for performance across 32+ SKU pages and to avoid visual noise.

### 6.3 Contrast & Accessibility Guardrails

- Gold on Parchment glass is likely to fail WCAG AA for body text — reserve Gold for large text, icons, borders, and solid-fill buttons, never small body copy on light glass.
- Nav transparent-state text needs a text-shadow safety net over variable hero imagery; test against the lightest and darkest expected hero frames.
- Sold-out state uses a Mist pill rather than overprinting the CTA, so it doesn't rely on color alone to communicate unavailability.

### 6.4 Typography

Palette and moodboard call for a refined serif or high-contrast display face for headlines (luxury/editorial cue) paired with a clean grotesk for body/UI, since thin serifs lose contrast inside blurred glass. Suggest a display serif for H1/H2 product and brand names, and a neutral sans (Inter/General Sans–class) for prices, filters, and cart UI. This needs confirming before Phase 0, since it affects every glass panel's padding/line-height spec above.

### 6.5 Voice & Microcopy

Keep copy active-voice and specific rather than generic: "Add to bag," not "Submit"; "Sold out — notify me," not a bare grayed-out button. Sold-out, empty-cart, and confirmation states should speak in the same plain, warm register as product copy, not default Shopify system text.

---

## 7. Technical Risks & Guardrails

| Risk                                                                                    | Mitigation                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `backdrop-filter` performance on mobile (heavy mid-range Android install base in Egypt) | Limit blur to nav dock, hero, cart drawer, mega-menu, brand-story sections. Product grid stays unblurred. Use 10–18px blur, not 30px+.                                                                                                                                                                                                               |
| Nav dock transition jank                                                                | Animate `background`, `backdrop-filter`, `max-width`, `top`, `border-radius` together on one timing function; avoid animating `blur` alone, which is the most GPU-expensive property to transition on low-end devices — consider cross-fading a pre-blurred layer if frame drops appear in testing.                                                  |
| Text contrast on translucent gold/parchment combos                                      | Per §6.3 — Gold reserved for large text/icons/solid buttons only.                                                                                                                                                                                                                                                                                    |
| RTL/Arabic readiness                                                                    | Theme is English-only despite an Arabic-speaking customer base (reviews are already in Egyptian Arabic/Arabizi). Decide now whether the rebuild adds `dir="rtl"` support or stays English-UI/Arabic-content — this affects the nav dock's icon mirroring and the whole bento grid's mirroring logic.                                                 |
| `@supports` fallback                                                                    | Confirm target browser list (checkout traffic is mobile-heavy). Safari iOS has full `backdrop-filter` support, but the solid-ink fallback must be tested so no browser ships a flat foggy-gray box.                                                                                                                                                  |
| Section/schema architecture                                                             | Following the GRO pattern already proven on this account: strict `sorella-` prefixed section/block naming, zero hardcoded copy (schema-driven, so seasonal campaigns swap without a deploy), Playwright MCP visual QA pass per breakpoint before merge — nav dock states specifically need a scroll-triggered QA pass, not just a static screenshot. |

---

## 8. Recommended Build Phases

1. **Phase 0 — Foundations:** design tokens (color/type/spacing), glass panel component, adaptive nav dock (both states + transition), bento grid CSS utilities, `@supports` fallback, base layout.
2. **Phase 1 — Homepage:** hero bento block, collections bento grid, seasonal campaign cell, brand-story block, best-sellers row, reviews block, newsletter card.
3. **Phase 2 — Collection & Product templates:** catalog grid (non-bento, per §5.2), sticky filter/sort bar, product page bento layout, notes pyramid widget, "inspired by" tag, sold-out state treatment.
4. **Phase 3 — Content pages & polish:** About page story blocks, cart drawer, mobile nav drawer + mega-menu, mobile breakpoint pass, Playwright visual QA across all templates and both nav states, performance audit of blur usage.

---

## 9. Open Questions for Client/Scope-Lock

- Confirm typography pair before Phase 0 (affects every glass panel spec above).
- Confirm the nav dock's scroll-hide behavior (hide on scroll-down / reveal on scroll-up) is desired, or if it should simply stay pinned once docked.
- Confirm whether Arabic/RTL is in scope for this rebuild or a future phase.
- Confirm source of new lifestyle photography (client-provided vs. AI-generated vs. stock) — current assets are product-on-white only and won't support the hero/brand-story cells as designed.
- Confirm if "inspired by [designer fragrance]" positioning is legally/brand-safe to state explicitly on-site.
- Confirm the mega-menu vs. flat five-link nav decision for the docked state's link count.

---

_This report builds directly on the initial gap-analysis audit of sorella-eg.com, incorporating the client-specified adaptive nav-dock behavior (transparent at top, glass and narrower on scroll) as the anchor interaction for the rebuild. No theme source code was accessible at time of writing; findings are based on rendered content/markup review, not a code-level audit._


<!-- Full Redesign Report.md -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;400;500;600;700&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface": "#0a1420",
                        "mist": "#9AA3AD",
                        "inverse-primary": "#5c5e64",
                        "on-primary-fixed-variant": "#44474c",
                        "ink-90": "rgba(28, 31, 36, 0.90)",
                        "on-secondary-fixed-variant": "#484742",
                        "on-error": "#690005",
                        "surface-dim": "#0a1420",
                        "on-background": "#d9e3f5",
                        "gold-40": "rgba(199, 156, 90, 0.40)",
                        "on-surface": "#d9e3f5",
                        "secondary-container": "#484742",
                        "surface-container": "#16202d",
                        "surface-container-low": "#121c29",
                        "on-tertiary": "#442c00",
                        "inverse-surface": "#d9e3f5",
                        "secondary-fixed": "#e6e2db",
                        "outline-variant": "#45474b",
                        "tertiary-fixed": "#ffddaf",
                        "primary-container": "#1c1f24",
                        "on-error-container": "#ffdad6",
                        "primary": "#c4c6cd",
                        "on-tertiary-fixed-variant": "#604104",
                        "error-container": "#93000a",
                        "secondary": "#c9c6c0",
                        "gold-15": "rgba(199, 156, 90, 0.15)",
                        "on-secondary-fixed": "#1c1c18",
                        "ink-35": "rgba(28, 31, 36, 0.35)",
                        "on-secondary-container": "#b8b5ae",
                        "secondary-fixed-dim": "#c9c6c0",
                        "parchment-65": "rgba(242, 238, 231, 0.65)",
                        "parchment-12": "rgba(242, 238, 231, 0.12)",
                        "on-secondary": "#31302c",
                        "ink-70": "rgba(28, 31, 36, 0.70)",
                        "primary-fixed-dim": "#c4c6cd",
                        "surface-container-highest": "#2b3543",
                        "primary-fixed": "#e1e2e9",
                        "inverse-on-surface": "#27313e",
                        "surface-bright": "#303a48",
                        "on-tertiary-fixed": "#281800",
                        "surface-container-lowest": "#050f1b",
                        "surface-variant": "#2b3543",
                        "tertiary-container": "#2c1b00",
                        "outline": "#909095",
                        "background": "#0a1420",
                        "tertiary-fixed-dim": "#edbf79",
                        "error": "#ffb4ab",
                        "on-tertiary-container": "#a77f40",
                        "on-surface-variant": "#c6c6cb",
                        "tertiary": "#c79c5a",
                        "on-primary": "#2e3036",
                        "surface-tint": "#c4c6cd",
                        "mist-25": "rgba(154, 163, 173, 0.25)",
                        "on-primary-fixed": "#191c21",
                        "on-primary-container": "#84868d",
                        "surface-container-high": "#212b38",
                        "ink": "#1C1F24",
                        "gold": "#C79C5A",
                        "parchment": "#F2EEE7"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px",
                        "blob": "42% 58% 70% 30% / 45% 45% 55% 55%"
                    },
                    "spacing": {
                        "lg": "24px",
                        "text-max": "820px",
                        "xxs": "4px",
                        "xxl": "48px",
                        "md": "16px",
                        "container-max": "1440px",
                        "xs": "8px",
                        "section-mobile": "48px",
                        "section-desktop": "80px",
                        "bento-max": "1280px",
                        "xl": "32px"
                    },
                    "fontFamily": {
                        "title": ["Inter"],
                        "display": ["Fraunces"],
                        "body": ["Inter"],
                        "eyebrow": ["Inter"]
                    },
                    "fontSize": {
                        "title": ["21px", {"lineHeight": "1.24", "letterSpacing": "-0.15px", "fontWeight": "600"}],
                        "eyebrow": ["12px", {"lineHeight": "1.0", "letterSpacing": "1.2px", "fontWeight": "600"}],
                        "display-lg": ["44px", {"lineHeight": "1.08", "letterSpacing": "-0.04em", "fontWeight": "400"}],
                        "display-hero": ["60px", {"lineHeight": "1.05", "letterSpacing": "-0.05em", "fontWeight": "400"}],
                        "display-hero-mobile": ["32px", {"lineHeight": "1.1", "letterSpacing": "-0.03em", "fontWeight": "400"}],
                        "lead": ["20px", {"lineHeight": "1.5", "letterSpacing": "0px", "fontWeight": "300"}],
                        "headline": ["24px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                        "display-md": ["32px", {"lineHeight": "1.15", "letterSpacing": "-0.03em", "fontWeight": "500"}],
                        "body": ["17px", {"lineHeight": "1.47", "letterSpacing": "-0.2px", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        .glass-panel {
            background: rgba(242, 238, 231, 0.12);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(154, 163, 173, 0.25);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }
        .organic-blob {
            position: absolute;
            filter: blur(80px);
            z-index: 0;
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            animation: drift 18s ease-in-out infinite alternate;
        }
        @keyframes drift {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
            50% { transform: translate(30px, -40px) scale(1.1) rotate(5deg); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            100% { transform: translate(-20px, 20px) scale(0.95) rotate(-5deg); border-radius: 30% 70% 40% 60% / 30% 60% 40% 70%; }
        }
        .blob-gold { background: radial-gradient(circle, rgba(199, 156, 90, 0.25) 0%, transparent 70%); }
        .blob-slate { background: radial-gradient(circle, rgba(154, 163, 173, 0.15) 0%, transparent 70%); }
        
        .nav-capsule {
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-scrolled {
            max-width: 920px;
            margin: 16px auto;
            border-radius: 9999px;
            background: rgba(242, 238, 231, 0.9);
            backdrop-filter: blur(18px);
            padding: 8px 32px;
            color: #1C1F24 !important;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        .nav-scrolled a, .nav-scrolled .material-symbols-outlined {
            color: #1C1F24 !important;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-background text-on-surface font-body selection:bg-gold selection:text-ink">
<!-- Adaptive Nav Dock -->
<header class="fixed top-0 w-full z-50 transition-all duration-500 ease-in-out bg-transparent px-lg pt-md" id="top-nav">
<div class="max-w-container-max mx-auto flex justify-between items-center nav-capsule">
<a class="font-display text-display-md tracking-[0.2em] uppercase text-parchment drop-shadow-lg" href="/">Sorella</a>
<nav class="hidden md:flex items-center space-x-xl font-eyebrow text-eyebrow uppercase tracking-widest text-parchment/80">
<a class="hover:text-gold transition-colors duration-300 border-b border-transparent hover:border-gold pb-1" href="#">Essences</a>
<a class="hover:text-gold transition-colors duration-300" href="#">Collections</a>
<a class="hover:text-gold transition-colors duration-300" href="#">Rituals</a>
<a class="hover:text-gold transition-colors duration-300" href="#">Heritage</a>
</nav>
<div class="flex items-center space-x-md text-parchment">
<button class="p-xs hover:text-gold transition-colors"><span class="material-symbols-outlined">shopping_bag</span></button>
<button class="p-xs hover:text-gold transition-colors"><span class="material-symbols-outlined">person</span></button>
</div>
</div>
</header>
<main class="relative overflow-hidden">
<!-- 1. Hero Section -->
<section class="relative min-h-screen flex items-center pt-section-desktop overflow-hidden bg-cover bg-center bg-no-repeat" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzPeyoDO90AlPFfu2D4jd38Dt6Y0RurJjW28eoh-bOO14uJb6lW_Nqac_aeV-b5MvJt2QoZWZqasIEDDLudqY7j4_NbQ5z0HllMch7ihnX0GDDJMGUqbk3yex1h-AkhFfUR4Dh3U9UzfLyJB_2RsM0Ft5QxXYd3OGI7hDlowL3N02V83oDiiPoZovgqbpb1AMf1m97eREjcDufG56O5YAqTuDzfYp0KiNepRLedz2p-MtWOOpJQZRz1LLgkLuAlO64Mm61CsZNLpM");'>
<!-- Background Blobs -->
<div class="absolute inset-0 z-10 pointer-events-none">
<div class="organic-blob blob-gold w-[700px] h-[700px] -top-[10%] -left-[10%]"></div>
<div class="organic-blob blob-slate w-[600px] h-[600px] top-[40%] right-[-5%]"></div>
<div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none"></div>
</div>
<div class="max-w-bento-max mx-auto px-lg z-20 w-full grid grid-cols-12 gap-xl items-stretch">
<!-- Hero Card -->
<div class="col-span-12 lg:col-span-8 glass-panel rounded-xl p-xl md:p-xxl flex flex-col justify-center min-h-[550px] relative overflow-hidden group">
<span class="font-eyebrow text-eyebrow text-gold uppercase tracking-[0.3em] mb-md block">Egyptian Modern Apothecary</span>
<h1 class="font-display text-display-hero-mobile md:text-display-hero text-parchment mb-xl leading-[0.95] tracking-tighter">
                    Sorella — From our <br/><span class="italic text-gold">bond</span> to your senses.
                </h1>
<p class="font-lead text-lead text-parchment/70 max-w-[580px] mb-xxl">
                    Crafted with the legacy of ancient Nile botanical mastery and a contemporary vision for olfactory art.
                </p>
<div class="flex flex-wrap gap-md">
<a class="bg-gold text-ink font-title text-body px-xl py-md rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gold/10" href="#">
                        Shop the Collection
                    </a>
<a class="border border-parchment/20 text-parchment font-title text-body px-xl py-md rounded-full backdrop-blur-sm transition-all hover:bg-parchment-12" href="#">
                        Explore Rituals
                    </a>
</div>
</div>
<!-- Trust Trio -->
<div class="col-span-12 lg:col-span-4 flex flex-col gap-lg">
<div class="glass-panel rounded-xl p-lg flex flex-col justify-between h-full group">
<span class="material-symbols-outlined text-gold text-[32px] group-hover:scale-110 transition-transform">auto_awesome</span>
<div>
<h3 class="font-title text-title text-parchment">Free 5ml offer</h3>
<p class="font-body text-parchment/60 mt-xs">Discovery included with every full bottle.</p>
</div>
</div>
<div class="glass-panel rounded-xl p-lg flex flex-col justify-between h-full group">
<span class="material-symbols-outlined text-gold text-[32px] group-hover:scale-110 transition-transform">history_edu</span>
<div>
<h3 class="font-title text-title text-parchment">Made in Egypt</h3>
<p class="font-body text-parchment/60 mt-xs">Sourced from the banks of the Nile.</p>
</div>
</div>
<div class="glass-panel rounded-xl p-lg flex flex-col justify-between h-full group">
<span class="material-symbols-outlined text-gold text-[32px] group-hover:scale-110 transition-transform">local_shipping</span>
<div>
<h3 class="font-title text-title text-parchment">Express Delivery</h3>
<p class="font-body text-parchment/60 mt-xs">Fragile-grade shipping nationwide.</p>
</div>
</div>
</div>
</div>
</section>
<!-- 2. Curated Collections -->
<section class="max-w-bento-max mx-auto px-lg py-section-desktop">
<div class="mb-xl">
<span class="font-eyebrow text-gold tracking-widest uppercase mb-xs block">Discovery</span>
<h2 class="font-display text-display-md text-parchment">Curated Collections</h2>
</div>
<div class="grid grid-cols-12 auto-rows-[300px] lg:auto-rows-[350px] gap-xl">
<!-- For Her -->
<div class="col-span-12 md:col-span-6 lg:col-span-6 glass-panel rounded-xl relative overflow-hidden group">
<div class="absolute inset-0 z-0 group-hover:scale-110 transition-transform duration-1000 bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDANq0hQM_hU3O320hlQLdUwcPAuAsIKU2PP0_gQirROGmJX_BXd3S3esjg_7fv3XdZuh3QR16fLv0EtKPaamdgn-Mans2He_Q7LXGeYXR_qHE3nPMg7PKsbeGUAtI_OsB0CIyTzDtMW4FW181vBpCE9vhhyOFsUKQangy_iW5YVu6Q7ZvarZiHEm77-RbTRqeN7CiHu-XVvtH59LgNFNB4gP1hdED3v83KnNWr_4ebkoR08ttuKzmEnNb-kB2SfmAWisljoeVOlLI");'></div>
<div class="absolute inset-0 bg-ink/60 group-hover:bg-ink/40 transition-colors"></div>
<div class="relative z-10 p-xl h-full flex flex-col justify-end">
<h3 class="font-display text-display-md text-parchment mb-xs">For Her</h3>
<a class="font-eyebrow text-gold uppercase tracking-widest flex items-center gap-xs" href="#">Explore <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
</div>
</div>
<!-- Unisex -->
<div class="col-span-12 md:col-span-6 lg:col-span-3 row-span-2 glass-panel rounded-xl flex flex-col overflow-hidden group">
<div class="h-1/2 overflow-hidden relative">
<div class="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYrtUk7QIsCQeIlLl_4_Ejq_Nu90DBAqvrWY_C7qTFSt7kFH4AXFg87YlMsTdDDndSZ8soJQIW3HCcD6buCzhwUbHLula2j57WlUknqwdNTHfKI04MhMDOCIUp33zmrDzpvNghKVWw3N5XJEUJCGdBESdT4ypAfK4dWrnIwQNETVWtI-cNFlalh7XQVdHrRJVQnhFr4xVr_s6vfUOHY7O9Fu5JXzMWYGAwPiTkgKiKzZ128SlqhoQfF4g-Xqp5Ax42r_BMf6jaahc");'></div>
</div>
<div class="p-xl bg-ink/40 flex-grow flex flex-col justify-center">
<span class="font-eyebrow text-gold uppercase tracking-widest text-[10px] mb-xs">Versatile Essences</span>
<h3 class="font-display text-headline text-parchment mb-md">Unisex Scents</h3>
<p class="font-body text-parchment/60 mb-lg text-sm">Fragrances that focus purely on the chemistry of the soul.</p>
<button class="w-full py-md border border-gold/40 text-gold rounded-full font-title text-sm hover:bg-gold hover:text-ink transition-all">View All</button>
</div>
</div>
<!-- For Him -->
<div class="col-span-12 md:col-span-6 lg:col-span-3 glass-panel rounded-xl relative overflow-hidden group">
<div class="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB07SdpCn7Qk5WTN-SFWD8mecs7HATdhspAv44LpaEUBIFpaBgpvu6lITiWp-XU5Ie0sOJNUTIy71qBDNfIxhyAfy4pkigVR0qZ8BH9UsolAPMCb15HJICYIMU3knANUCqz58r2pTaDgB4Yq-e2_wrNI1Zxo1aW7KZAN6TtYoey9j1b9o8UB7V_PENq-PsZJR-kZWLWuDr0OXb6hJK-7M2OxOJRWqJO-5oBji9J7CFhWpM_1g8epUNedyQh8fnr6ZT9OSUsOjLeFxo");'></div>
<div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/30 transition-colors"></div>
<div class="relative z-10 p-lg h-full flex flex-col justify-end">
<h3 class="font-display text-headline text-parchment">For Him</h3>
</div>
</div>
<!-- Seasonal Campaign -->
<div class="col-span-12 md:col-span-6 lg:col-span-6 glass-panel rounded-xl relative overflow-hidden group flex items-center">
<div class="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJGkIe-4rQYkd6wMAdEhJxZ2vZBoXonaVtUo0T_Ff4hOVbmn8uuJW9K-kQ7tpm4ZB6u8-EK6B61RJBFovASTXP_21hU-bFkTa98t6z_Iu-h7tctz4iWTzsLyhCPDhqZ7y4V-eFDzJcX71w_OI7QfHLY8KEFeMx4dny5HYopVhVUhZss4pgavZ5dI5D8RaL8KNXc2A2ipAytdjMqBvIP0QCINhTIsu96c54V1_KcHW6zHHzbtKYvFjupuzpmNy-_NMFeT2zQRY963I");'></div>
<div class="absolute inset-0 bg-ink/70 backdrop-blur-[1px]"></div>
<div class="relative z-10 p-xl md:p-xxl">
<span class="bg-gold text-ink px-md py-1 rounded-full font-eyebrow text-[10px] mb-md inline-block uppercase tracking-widest">Seasonal Campaign</span>
<h3 class="font-display text-display-md text-parchment mb-md">Ramadan Specials</h3>
<p class="font-body text-parchment/60 max-w-[400px] mb-xl">Limited edition Ouds and festive pairings for the holy month.</p>
<a class="text-gold font-title border-b border-gold/40 pb-1 hover:border-gold transition-all" href="#">Shop Exclusive Offers</a>
</div>
</div>
<!-- Bundles -->
<div class="col-span-12 md:col-span-6 lg:col-span-3 glass-panel rounded-xl relative overflow-hidden group">
<div class="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMSjgaY-epR6b0Vnt20UeTK0HtF-hNeO1kWTbgMjWz-gpu4oLdxLrzfANRMHe0XhzT9uZn6sFq9te8DX9l2kl3j7Zmux9Fu60pSMKOHUgOBjg526VYsh4D6EfPbdueOwXpt1MfEbXoLlX4WFkR8R5GlFQBwyN_3O9Qck5bCE96GqNrSdOMu4SZfUgk2o1CqBZyCMKLAvKDrEt5IV7hTTTP_BL_Ron_uCxw5_WUUFxwbbu2DIQfN54jp7IOwL16tbV7sgStpqiHiys");'></div>
<div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/30 transition-colors"></div>
<div class="relative z-10 p-lg h-full flex flex-col justify-end">
<h3 class="font-display text-headline text-parchment">Gift Bundles</h3>
</div>
</div>
</div>
</section>
<!-- 3. Olfactory Architecture -->
<section class="relative py-section-desktop px-lg overflow-hidden bg-surface-container-lowest">
<div class="absolute inset-0 z-0 pointer-events-none">
<div class="organic-blob blob-slate w-[800px] h-[800px] -bottom-[20%] -left-[10%] opacity-20"></div>
</div>
<div class="max-w-bento-max mx-auto relative z-10">
<div class="text-center mb-xxl">
<span class="font-eyebrow text-gold uppercase tracking-[0.4em] mb-md block">Complexity</span>
<h2 class="font-display text-display-md md:text-display-lg text-parchment">Olfactory Architecture</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-xl relative">
<!-- Vertical Line Connector (Desktop) -->
<div class="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gold/20 -translate-y-1/2 z-0"></div>
<!-- Top Notes -->
<div class="glass-panel p-xl rounded-xl text-center relative z-10 hover:-translate-y-2 transition-transform duration-500">
<div class="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-lg">
<span class="font-display text-xl text-gold">01</span>
</div>
<h3 class="font-display text-headline text-parchment mb-md">The Opening</h3>
<p class="font-eyebrow text-gold uppercase text-[10px] tracking-widest mb-md">Top Notes</p>
<p class="font-body text-parchment/60 text-sm leading-relaxed">The immediate impression. Volatile citrus and light herbals that awaken the senses for the first 15 minutes.</p>
</div>
<!-- Heart Notes -->
<div class="glass-panel p-xl rounded-xl text-center relative z-10 hover:-translate-y-2 transition-transform duration-500 border-gold/40">
<div class="w-16 h-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto mb-lg">
<span class="font-display text-xl text-gold">02</span>
</div>
<h3 class="font-display text-headline text-parchment mb-md">The Soul</h3>
<p class="font-eyebrow text-gold uppercase text-[10px] tracking-widest mb-md">Heart Notes</p>
<p class="font-body text-parchment/60 text-sm leading-relaxed">The true character of the fragrance. Rich florals and spices that emerge as the top notes fade, lasting for hours.</p>
</div>
<!-- Base Notes -->
<div class="glass-panel p-xl rounded-xl text-center relative z-10 hover:-translate-y-2 transition-transform duration-500">
<div class="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-lg">
<span class="font-display text-xl text-gold">03</span>
</div>
<h3 class="font-display text-headline text-parchment mb-md">The Anchor</h3>
<p class="font-eyebrow text-gold uppercase text-[10px] tracking-widest mb-md">Base Notes</p>
<p class="font-body text-parchment/60 text-sm leading-relaxed">The final depth. Heavy resins, musks, and woods that bind to the skin, creating a lingering trail of memory.</p>
</div>
</div>
</div>
</section>
<!-- 4. Best Sellers Section -->
<section class="max-w-bento-max mx-auto px-lg py-section-desktop">
<div class="flex justify-between items-end mb-xl">
<div>
<span class="font-eyebrow text-gold uppercase tracking-widest mb-xs block">Essentials</span>
<h2 class="font-display text-display-md text-parchment">The Best Sellers</h2>
</div>
<a class="font-title text-parchment/60 hover:text-gold transition-colors border-b border-parchment/10 text-sm" href="#">View All Scents</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
<!-- Product Card 1 -->
<div class="bg-surface-container rounded-xl p-md border border-parchment/5 hover:border-gold/40 transition-all group cursor-pointer">
<div class="aspect-[3/4] rounded-lg overflow-hidden bg-ink mb-md relative">
<div class="absolute inset-0 group-hover:scale-110 transition-transform duration-1000 bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBmzWt2vbjkFFblDYRcR2TBm4EsuioUSGeNnURu3rNPlBHq9e0bVer0oZC7SJvN73rmRXPLMPrffDyHM1m5uSz6G480PJilYCLHHu0u5VNCrgi9d_xrLtta6BLu25zGARlFueyo8GmxO25Tvmjojz4hk0c3bzUlwUXZJaUc-DM6eleLX_rfkLxl7RfYJwpspUqlhea9FO1HDF48hVTdau4ImciW9iJtyFf7gfsdmVJq2uefZnoqr-CW6z50Ayeaa4DxlBGazNTvg6k");'></div>
<button class="absolute bottom-md left-1/2 -translate-x-1/2 w-[85%] bg-parchment text-ink py-md rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all font-title text-sm">Quick Add</button>
</div>
<div class="flex justify-between items-start">
<div>
<h3 class="font-title text-parchment">Baklava</h3>
<p class="font-eyebrow text-parchment/40 uppercase text-[9px] mt-xs">Honey, Pistachio, Phyllo</p>
</div>
<span class="font-title text-gold text-sm">1,250 EGP</span>
</div>
</div>
<!-- Product Card 2 -->
<div class="bg-surface-container rounded-xl p-md border border-parchment/5 hover:border-gold/40 transition-all group cursor-pointer">
<div class="aspect-[3/4] rounded-lg overflow-hidden bg-ink mb-md relative">
<div class="absolute inset-0 group-hover:scale-110 transition-transform duration-1000 bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCUfPD2jlk3DM3NRqYblPxEX_-Kcbeww4TrHIyds1WBAP36hj4J4coXPPCFJDp7FLOT3IEPmjr3r5UpaT0A0mWg_7oGabnCbi-BodHs7qkbe_ozmud35pYNsJmeJveh-_QnCC2txcgSg7yOFI_g3xKQkDl59iGOemCEIg_umpleU1ZK2fQjnnvnE8INpWYlN83VHNgx8Al_LiAKZO-RzXdZ49OEPteAoY48UORWBevP0LH4l-Gw8JcXMdmWjY0Cu8BOJn_Sr0EqMDY");'></div>
<button class="absolute bottom-md left-1/2 -translate-x-1/2 w-[85%] bg-parchment text-ink py-md rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all font-title text-sm">Quick Add</button>
</div>
<div class="flex justify-between items-start">
<div>
<h3 class="font-title text-parchment">Bordeaux</h3>
<p class="font-eyebrow text-parchment/40 uppercase text-[9px] mt-xs">Plum, Oak, Red Wine</p>
</div>
<span class="font-title text-gold text-sm">1,450 EGP</span>
</div>
</div>
<!-- Product Card 3 -->
<div class="bg-surface-container rounded-xl p-md border border-parchment/5 hover:border-gold/40 transition-all group cursor-pointer">
<div class="aspect-[3/4] rounded-lg overflow-hidden bg-ink mb-md relative">
<div class="absolute inset-0 group-hover:scale-110 transition-transform duration-1000 bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAq4Pk9CIEVnc_ti6Rapz-IqqW-9KTaHaZNSd4PNI0kGNgDlxNTlGLd0y2vvUNsjsadQcD9sKibrF1hPU1j3mQoGb8YLuCuYWfbG3wkdzv0goauLeALGw89a7Xbu88eq7r0CKR3EQ-cpUv9wDFmnsY1kf84nZVVFdS-WdwjESK3U5a2ZMPyxaYUEZioXqo727J909gpvmd2Es-1rfU_WNA66LjZcR1Jr7_nY_JajDdJtJfioQEEbREgSf-tyBr-7cNivaa5wUqT4UU");'></div>
<button class="absolute bottom-md left-1/2 -translate-x-1/2 w-[85%] bg-parchment text-ink py-md rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all font-title text-sm">Quick Add</button>
</div>
<div class="flex justify-between items-start">
<div>
<h3 class="font-title text-parchment">Oasis</h3>
<p class="font-eyebrow text-parchment/40 uppercase text-[9px] mt-xs">Sea Salt, Lotus, Air</p>
</div>
<span class="font-title text-gold text-sm">1,100 EGP</span>
</div>
</div>
<!-- Product Card 4 -->
<div class="bg-surface-container rounded-xl p-md border border-parchment/5 hover:border-gold/40 transition-all group cursor-pointer">
<div class="aspect-[3/4] rounded-lg overflow-hidden bg-ink mb-md relative">
<div class="absolute inset-0 group-hover:scale-110 transition-transform duration-1000 bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnT0muZx82fQWDa-uVyUn5sS9hGtwrpA4Dc-Q2ERTobAx6rGw55k7x6XLcp91WfWIhSiODv1SRbEevAiI7pDiHJIjUmLrOWDyf6x8031pz3OdatpF0Qylmbub6MP2NAtZ0aLxD8_kJZ-YQUF6soHRdNXt4QnDnrKK1BQqwcpefDfeuwxBWAsxTnO3aGTHi3yc_UG5ES9zGDKc6AEWJEtWuPZFPiqP7xFQ_1zFLKabQnFjbOX3W6nYjNPDK1xTy8EGttnmGXujl-Kg");'></div>
<button class="absolute bottom-md left-1/2 -translate-x-1/2 w-[85%] bg-parchment text-ink py-md rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all font-title text-sm">Quick Add</button>
</div>
<div class="flex justify-between items-start">
<div>
<h3 class="font-title text-parchment">Giza</h3>
<p class="font-eyebrow text-parchment/40 uppercase text-[9px] mt-xs">Amber, Musk, Saffron</p>
</div>
<span class="font-title text-gold text-sm">1,600 EGP</span>
</div>
</div>
</div>
</section>
<!-- 5. Explore Our Essences -->
<section class="relative py-section-desktop px-lg overflow-hidden bg-background">
<div class="absolute inset-0 z-0 pointer-events-none">
<div class="organic-blob blob-gold w-[500px] h-[500px] top-0 -left-[10%] opacity-20"></div>
</div>
<div class="max-w-bento-max mx-auto relative z-10">
<div class="text-center mb-xl">
<span class="font-eyebrow text-gold uppercase tracking-[0.4em] mb-md block">The Collection</span>
<h2 class="font-display text-display-md md:text-display-lg text-parchment">Explore Our Essences</h2>
</div>
<div class="grid grid-cols-12 gap-lg">
<div class="col-span-12 lg:col-span-4 glass-panel rounded-xl overflow-hidden group min-h-[450px] flex flex-col">
<div class="h-2/3 relative overflow-hidden">
<img alt="For Her" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDANq0hQM_hU3O320hlQLdUwcPAuAsIKU2PP0_gQirROGmJX_BXd3S3esjg_7fv3XdZuh3QR16fLv0EtKPaamdgn-Mans2He_Q7LXGeYXR_qHE3nPMg7PKsbeGUAtI_OsB0CIyTzDtMW4FW181vBpCE9vhhyOFsUKQangy_iW5YVu6Q7ZvarZiHEm77-RbTRqeN7CiHu-XVvtH59LgNFNB4gP1hdED3v83KnNWr_4ebkoR08ttuKzmEnNb-kB2SfmAWisljoeVOlLI"/>
<div class="absolute inset-0 bg-ink/20"></div>
</div>
<div class="p-xl flex-grow flex flex-col justify-between">
<div>
<h3 class="font-display text-headline text-parchment mb-xs">Essence for Her</h3>
<p class="font-body text-sm text-parchment/60">Delicate florals and ancient resins crafted for the feminine spirit.</p>
</div>
<a class="mt-lg font-eyebrow text-gold uppercase tracking-widest text-[10px] flex items-center gap-xs hover:gap-md transition-all" href="#">Shop Her Ritual <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
</div>
</div>
<div class="col-span-12 lg:col-span-4 glass-panel rounded-xl overflow-hidden group min-h-[450px] flex flex-col">
<div class="h-2/3 relative overflow-hidden">
<img alt="For Him" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB07SdpCn7Qk5WTN-SFWD8mecs7HATdhspAv44LpaEUBIFpaBgpvu6lITiWp-XU5Ie0sOJNUTIy71qBDNfIxhyAfy4pkigVR0qZ8BH9UsolAPMCb15HJICYIMU3knANUCqz58r2pTaDgB4Yq-e2_wrNI1Zxo1aW7KZAN6TtYoey9j1b9o8UB7V_PENq-PsZJR-kZWLWuDr0OXb6hJK-7M2OxOJRWqJO-5oBji9J7CFhWpM_1g8epUNedyQh8fnr6ZT9OSUsOjLeFxo"/>
<div class="absolute inset-0 bg-ink/20"></div>
</div>
<div class="p-xl flex-grow flex flex-col justify-between">
<div>
<h3 class="font-display text-headline text-parchment mb-xs">Spirit for Him</h3>
<p class="font-body text-sm text-parchment/60">Bold woods and desert spices for the modern explorer.</p>
</div>
<a class="mt-lg font-eyebrow text-gold uppercase tracking-widest text-[10px] flex items-center gap-xs hover:gap-md transition-all" href="#">Shop His Ritual <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
</div>
</div>
<div class="col-span-12 lg:col-span-4 glass-panel rounded-xl overflow-hidden group min-h-[450px] flex flex-col">
<div class="h-2/3 relative overflow-hidden">
<img alt="Unisex" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYrtUk7QIsCQeIlLl_4_Ejq_Nu90DBAqvrWY_C7qTFSt7kFH4AXFg87YlMsTdDDndSZ8soJQIW3HCcD6buCzhwUbHLula2j57WlUknqwdNTHfKI04MhMDOCIUp33zmrDzpvNghKVWw3N5XJEUJCGdBESdT4ypAfK4dWrnIwQNETVWtI-cNFlalh7XQVdHrRJVQnhFr4xVr_s6vfUOHY7O9Fu5JXzMWYGAwPiTkgKiKzZ128SlqhoQfF4g-Xqp5Ax42r_BMf6jaahc"/>
<div class="absolute inset-0 bg-ink/20"></div>
</div>
<div class="p-xl flex-grow flex flex-col justify-between">
<div>
<h3 class="font-display text-headline text-parchment mb-xs">The Unisex Ritual</h3>
<p class="font-body text-sm text-parchment/60">Transcendent blends that defy boundaries and celebrate the soul.</p>
</div>
<a class="mt-lg font-eyebrow text-gold uppercase tracking-widest text-[10px] flex items-center gap-xs hover:gap-md transition-all" href="#">Shop All <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
</div>
</div>
</div>
</div>
</section>
<!-- 6. The Art of Inspiration -->
<!-- (Section placeholder - content from original was merged or repeated; keeping structural integrity) -->
<!-- 7. Voices of Sorella -->
<!-- (Section placeholder - content from original was merged or repeated; keeping structural integrity) -->
<!-- 8. Newsletter -->
<section class="relative py-section-desktop px-lg overflow-hidden bg-background">
<div class="absolute inset-0 z-0 pointer-events-none">
<div class="organic-blob blob-gold w-[600px] h-[600px] top-[20%] -right-[10%] opacity-20"></div>
<div class="organic-blob blob-slate w-[400px] h-[400px] bottom-0 -left-[5%] opacity-15"></div>
</div>
<div class="max-w-bento-max mx-auto relative z-10">
<div class="grid grid-cols-12 gap-lg">
<!-- Main Feature Card -->
<div class="col-span-12 lg:col-span-8 glass-panel rounded-xl p-xl md:p-xxl flex flex-col justify-center min-h-[400px] group">
<span class="font-eyebrow text-gold uppercase tracking-[0.3em] mb-md block">Art Direction</span>
<h2 class="font-display text-display-md md:text-display-lg text-parchment mb-xl leading-tight">The Art of <br/><span class="italic text-gold">Inspiration</span></h2>
<p class="font-lead text-lead text-parchment/70 max-w-[580px] mb-lg">
          We recreate the world's most iconic, high-end fragrances with Egyptian botanical mastery. Experience the same olfactory complexity and longevity of luxury houses, crafted with local soul.
        </p>
<div class="flex items-center gap-xs text-gold font-title">
<span class="material-symbols-outlined">auto_fix</span>
<span class="text-sm uppercase tracking-widest">Masterfully Reimagined</span>
</div>
</div>
<!-- Side Bento Column -->
<div class="col-span-12 lg:col-span-4 flex flex-col gap-lg">
<!-- Accessible Luxury -->
<div class="glass-panel rounded-xl p-lg flex flex-col justify-between h-full group hover:border-gold/30 transition-colors">
<div class="flex justify-between items-start mb-md">
<span class="material-symbols-outlined text-gold text-[32px]">diamond</span>
</div>
<div>
<h3 class="font-title text-title text-parchment mb-xs">Accessible Luxury</h3>
<p class="font-body text-sm text-parchment/60">Premium quality without the prestige markup. High-end scents for every day.</p>
</div>
</div>
<!-- Signature Accuracy -->
<div class="glass-panel rounded-xl p-lg flex flex-col justify-between h-full group hover:border-gold/30 transition-colors">
<div class="flex justify-between items-start mb-md">
<span class="material-symbols-outlined text-gold text-[32px]">verified</span>
</div>
<div>
<h3 class="font-title text-title text-parchment mb-xs">Signature Accuracy</h3>
<p class="font-body text-sm text-parchment/60">99% profile matching using the finest Nile-sourced oils and resins.</p>
</div>
</div>
</div>
</div>
</div>
</section><section class="max-w-bento-max mx-auto px-lg py-section-desktop relative">
<div class="organic-blob blob-gold w-[250px] h-[250px] -bottom-10 -right-10 opacity-30"></div>
<div class="glass-panel p-xl md:p-xxl rounded-xl flex flex-col md:flex-row items-center justify-between gap-xl relative z-10">
<div class="max-w-[500px]">
<h2 class="font-display text-display-md mb-md text-parchment">The Fragrant Letter</h2>
<p class="font-body text-parchment/60">Join our inner circle for early access to releases, seasonal rituals, and artisanal stories.</p>
</div>
<form class="w-full md:w-auto flex flex-col sm:flex-row gap-md">
<input class="bg-ink/60 border border-parchment/10 rounded-full px-xl py-md focus:border-gold focus:ring-0 outline-none text-parchment w-full sm:w-[320px] transition-all" placeholder="Email Address" type="email"/>
<button class="bg-gold text-ink font-title px-xl py-md rounded-full hover:scale-105 transition-transform" type="submit">Subscribe</button>
</form>
</div>
</section>
</main>
<!-- 9. Footer -->
<footer class="w-full mt-section-desktop border-t border-parchment/5 bg-ink text-parchment">
<div class="grid grid-cols-12 gap-xl px-lg py-xxl max-w-bento-max mx-auto">
<div class="col-span-12 lg:col-span-4">
<a class="font-display text-display-md text-gold tracking-widest uppercase block mb-xl" href="/">Sorella</a>
<p class="font-body text-parchment/50 max-w-[320px] text-sm leading-relaxed">Modern Egyptian perfumery rooted in history, bottled for the contemporary soul. Crafted in the heart of Cairo.</p>
</div>
<div class="col-span-6 md:col-span-3 lg:col-span-2">
<h4 class="font-eyebrow text-gold uppercase tracking-widest text-[10px] mb-xl">Shop</h4>
<ul class="space-y-md font-body text-sm text-parchment/70">
<li><a class="hover:text-gold transition-colors" href="#">All Scents</a></li>
<li><a class="hover:text-gold transition-colors" href="#">For Her</a></li>
<li><a class="hover:text-gold transition-colors" href="#">For Him</a></li>
<li><a class="hover:text-gold transition-colors" href="#">Unisex</a></li>
</ul>
</div>
<div class="col-span-6 md:col-span-3 lg:col-span-2">
<h4 class="font-eyebrow text-gold uppercase tracking-widest text-[10px] mb-xl">Brand</h4>
<ul class="space-y-md font-body text-sm text-parchment/70">
<li><a class="hover:text-gold transition-colors" href="#">Our Story</a></li>
<li><a class="hover:text-gold transition-colors" href="#">The Nile Legacy</a></li>
<li><a class="hover:text-gold transition-colors" href="#">Sustainability</a></li>
<li><a class="hover:text-gold transition-colors" href="#">Careers</a></li>
</ul>
</div>
<div class="col-span-12 md:col-span-6 lg:col-span-4">
<h4 class="font-eyebrow text-gold uppercase tracking-widest text-[10px] mb-xl">Customer Care</h4>
<ul class="space-y-md font-body text-sm text-parchment/70">
<li><a class="hover:text-gold transition-colors" href="#">Shipping &amp; Returns</a></li>
<li><a class="hover:text-gold transition-colors" href="#">Privacy Policy</a></li>
<li><a class="hover:text-gold transition-colors" href="#">Track Your Order</a></li>
<li class="pt-lg flex gap-md">
<a class="w-10 h-10 rounded-full border border-parchment/10 flex items-center justify-center hover:bg-gold hover:text-ink transition-all" href="#"><span class="material-symbols-outlined text-[18px]">public</span></a>
<a class="w-10 h-10 rounded-full border border-parchment/10 flex items-center justify-center hover:bg-gold hover:text-ink transition-all" href="#"><span class="material-symbols-outlined text-[18px]">alternate_email</span></a>
</li>
</ul>
</div>
<div class="col-span-12 border-t border-parchment/5 pt-xl mt-xl flex flex-col md:flex-row justify-between items-center gap-md text-[11px] text-parchment/40 uppercase tracking-widest">
<p>© 2024 Sorella Fragrance House. Proudly Egyptian.</p>
<div class="flex gap-xl">
<span>English</span>
<span>Egypt (EGP)</span>
</div>
</div>
</div>
</footer>
<script>
    // Adaptive Nav Dock Logic
    const nav = document.getElementById('top-nav');
    const navContainer = nav.querySelector('.nav-capsule');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navContainer.classList.add('nav-scrolled');
            nav.classList.add('py-0');
            nav.classList.remove('pt-md');
        } else {
            navContainer.classList.remove('nav-scrolled');
            nav.classList.remove('py-0');
            nav.classList.add('pt-md');
        }
    });

    // Reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-panel, .bg-surface-container').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out');
        revealObserver.observe(el);
    });
</script>
</body></html>

<!-- Sorella Homepage — Art of Inspiration Added -->
<!DOCTYPE html><html class="dark" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Sorella | Signature Essence</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,700&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "inverse-on-surface": "#27313e",
                    "on-secondary": "#31302c",
                    "on-primary": "#2e3036",
                    "background": "#0a1420",
                    "ink-90": "rgba(28, 31, 36, 0.90)",
                    "surface-container-high": "#212b38",
                    "secondary-fixed": "#e6e2db",
                    "surface-container": "#16202d",
                    "surface-container-low": "#121c29",
                    "primary": "#c4c6cd",
                    "on-secondary-container": "#b8b5ae",
                    "outline": "#909095",
                    "on-tertiary-fixed": "#281800",
                    "on-primary-fixed-variant": "#44474c",
                    "surface-container-lowest": "#050f1b",
                    "on-tertiary-container": "#a77f40",
                    "error": "#ffb4ab",
                    "gold-40": "rgba(199, 156, 90, 0.40)",
                    "primary-fixed-dim": "#c4c6cd",
                    "tertiary-fixed-dim": "#edbf79",
                    "gold-15": "rgba(199, 156, 90, 0.15)",
                    "on-surface": "#d9e3f5",
                    "on-background": "#d9e3f5",
                    "secondary-container": "#484742",
                    "tertiary-container": "#2c1b00",
                    "surface-tint": "#c4c6cd",
                    "outline-variant": "#45474b",
                    "primary-fixed": "#e1e2e9",
                    "on-error-container": "#ffdad6",
                    "secondary-fixed-dim": "#c9c6c0",
                    "on-secondary-fixed-variant": "#484742",
                    "surface-variant": "#2b3543",
                    "primary-container": "#1c1f24",
                    "on-tertiary-fixed-variant": "#604104",
                    "mist": "#9AA3AD",
                    "surface-container-highest": "#2b3543",
                    "parchment-12": "rgba(242, 238, 231, 0.12)",
                    "on-error": "#690005",
                    "error-container": "#93000a",
                    "on-tertiary": "#442c00",
                    "mist-25": "rgba(154, 163, 173, 0.25)",
                    "ink-70": "rgba(28, 31, 36, 0.70)",
                    "surface-dim": "#0a1420",
                    "on-primary-container": "#84868d",
                    "secondary": "#c9c6c0",
                    "parchment-65": "rgba(242, 238, 231, 0.65)",
                    "surface-bright": "#303a48",
                    "ink-35": "rgba(28, 31, 36, 0.35)",
                    "on-surface-variant": "#c6c6cb",
                    "surface": "#0a1420",
                    "tertiary-fixed": "#ffddaf",
                    "on-primary-fixed": "#191c21",
                    "tertiary": "#edbf79",
                    "on-secondary-fixed": "#1c1c18",
                    "inverse-surface": "#d9e3f5",
                    "inverse-primary": "#5c5e64"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "12px",
                    "full": "9999px"
            },
            "spacing": {
                    "xxl": "48px",
                    "section-desktop": "80px",
                    "xs": "8px",
                    "text-max": "820px",
                    "xl": "32px",
                    "md": "16px",
                    "section-mobile": "48px",
                    "xxs": "4px",
                    "bento-max": "1280px",
                    "lg": "24px",
                    "container-max": "1440px"
            },
            "fontFamily": {
                    "headline": ["Fraunces"],
                    "display-hero": ["Fraunces"],
                    "display-md": ["Fraunces"],
                    "price": ["Inter"],
                    "lead": ["Inter"],
                    "eyebrow": ["Inter"],
                    "display-lg": ["Fraunces"],
                    "display-hero-mobile": ["Fraunces"],
                    "title": ["Inter"],
                    "body": ["Inter"]
            },
            "fontSize": {
                    "headline": ["24px", {"lineHeight": "1.2", "letterSpacing": "-0.2px", "fontWeight": "500"}],
                    "display-hero": ["60px", {"lineHeight": "1.05", "letterSpacing": "-0.5px", "fontWeight": "400"}],
                    "display-md": ["32px", {"lineHeight": "1.15", "letterSpacing": "-0.3px", "fontWeight": "500"}],
                    "price": ["17px", {"lineHeight": "1.2", "letterSpacing": "0px", "fontWeight": "600"}],
                    "lead": ["20px", {"lineHeight": "1.5", "letterSpacing": "0px", "fontWeight": "300"}],
                    "eyebrow": ["12px", {"lineHeight": "1.0", "letterSpacing": "1.2px", "fontWeight": "600"}],
                    "display-lg": ["44px", {"lineHeight": "1.08", "letterSpacing": "-0.4px", "fontWeight": "400"}],
                    "display-hero-mobile": ["32px", {"lineHeight": "1.1", "letterSpacing": "-0.3px", "fontWeight": "400"}],
                    "title": ["21px", {"lineHeight": "1.24", "letterSpacing": "-0.15px", "fontWeight": "600"}],
                    "body": ["17px", {"lineHeight": "1.47", "letterSpacing": "-0.2px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #0a1420;
            color: #d9e3f5;
            -webkit-font-smoothing: antialiased;
        }
        .glass-panel {
            background: rgba(22, 32, 45, 0.45);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(154, 163, 173, 0.25);
        }
        .glass-dock {
            background: rgba(28, 31, 36, 0.70);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            box-shadow: 0 8px 32px 0 rgba(28, 31, 36, 0.35);
        }
        .organic-blob {
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(199, 156, 90, 0.08) 0%, rgba(10, 20, 32, 0) 70%);
            filter: blur(80px);
            border-radius: 50%;
            z-index: -1;
            animation: float 20s infinite alternate cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(100px, 50px) scale(1.1); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .evolution-line {
            background: linear-gradient(to bottom, transparent, #edbf79 10%, #edbf79 90%, transparent);
        }
        
        h1, h2, h3, .font-headline {
            letter-spacing: -0.025em;
        }
    </style>
</head>
<body class="font-body selection:bg-tertiary selection:text-on-tertiary">
<!-- Global Background Elements -->
<div class="fixed inset-0 overflow-hidden pointer-events-none">
<div class="organic-blob top-[-10%] right-[-5%]" style="animation-delay: -2s;"></div>
<div class="organic-blob bottom-[-10%] left-[-5%]" style="animation-delay: -5s;"></div>
<div class="organic-blob top-[40%] left-[-10%] opacity-50" style="width: 400px; height: 400px; animation-delay: -8s;"></div>
</div>
<!-- Navigation -->
<nav class="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[920px] px-md">
<div class="glass-dock rounded-full px-lg py-md flex items-center justify-between border border-mist-25">
<div class="flex items-center gap-xl">
<span class="font-display-md text-display-md text-tertiary tracking-widest uppercase">Sorella</span>
<div class="hidden md:flex items-center gap-lg">
<a class="font-eyebrow text-eyebrow text-on-surface-variant hover:text-tertiary transition-colors duration-300" href="#">Essences</a>
<a class="font-eyebrow text-eyebrow text-on-surface hover:text-tertiary transition-colors duration-300 border-b border-on-surface pb-1" href="#">Collections</a>
<a class="font-eyebrow text-eyebrow text-on-surface-variant hover:text-tertiary transition-colors duration-300" href="#">Rituals</a>
</div>
</div>
<div class="flex items-center gap-md">
<button class="p-xs text-on-surface hover:text-tertiary transition-colors">
<span class="material-symbols-outlined">search</span>
</button>
<button class="p-xs text-on-surface hover:text-tertiary transition-colors relative">
<span class="material-symbols-outlined">shopping_bag</span>
<span class="absolute top-1 right-1 w-2 h-2 bg-tertiary rounded-full"></span>
</button>
<button class="md:hidden p-xs text-on-surface">
<span class="material-symbols-outlined">menu</span>
</button>
</div>
</div>
</nav>
<!-- Main Content -->
<main class="relative pt-32 pb-xxl max-w-container-max mx-auto px-lg">
<div class="flex flex-col lg:flex-row gap-xl items-start">
<!-- Product Gallery -->
<section class="w-full lg:w-[55%] space-y-md">
<div class="relative aspect-[4/5] rounded-xl overflow-hidden group">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv1JsorT1xnBnVj8cSm9mH_x2RBjaMHqLM26l9GiSDo5kHuJfS3A0TBiFisld1nT4QqsmwlEOt76afcOMbGly5vEWeY_iKVO7Iil3zTL7IXanWP18bws-_XEYYHAoKIMby4quipB2E33BwUivy97LhdqTfWj2EZ9xK_2s5SycWfD5ywu5hbORYVM87oHgU1FX7FVpghjwgRJmdM09XnGR_JdA2eybpLgRCqFypIiyV0N9GgfKTEdE4HBa9wek5ihtZSMOiq8_XWQM">
<div class="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none"></div>
<button class="absolute bottom-6 right-6 glass-panel p-md rounded-full text-on-surface hover:bg-gold-15 transition-colors">
<span class="material-symbols-outlined">zoom_in</span>
</button>
</div>
<div class="grid grid-cols-4 gap-md">
<div class="aspect-square rounded-lg overflow-hidden border border-mist-25 hover:border-tertiary transition-colors cursor-pointer group">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH3invrPqGbk6lyavR5BiT3hE5S-X60y0WxC2abWs3JaTP4n2ETKWkb2yvKO-W3NL6wI13yOn-rE6p6Yy2Wd--qWy1-p0jIwcdP_0tQZ9xtGyccuyrle9EVjd-L84ckyrMdCPTNlS-O6sim9g1Mh0W6twQhnTR3L9-jV9IRW8i9FkyeyeisMCQi7BabXiG2LdI9-PCwCEIVN6O4XQRyBIdquA-o9Ey0bGD7b7h-tjYUqtyVRthNKtlrj379fHuCLI6-RTj2vSlLlw">
</div>
<div class="aspect-square rounded-lg overflow-hidden border border-mist-25 hover:border-tertiary transition-colors cursor-pointer group">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjMHHOAID8KXx_oBA1c0YrGXsb8QgW7KUVFXjsSmYV8UjVRdwAEKNA82BNN9yyH97Dz9XXz_LD12QradHc55aR-AyPW_fSS5AnZ6bXBSdMlg3nuWaRwP2lPeyjjVROqvF2Hy10ubVFVVUHFvMSnkDPoIcHtYP1T87YRwH6RkhOHvn186kQO9qj_0S9l3bWwjbVq6jMj37ezIBHuu1jLNNsyJWlEbTGgC138uQbgXBlPC-xlBSDyqUcmb1-bHO_gIXOFS1au0nwy1Y">
</div>
<div class="aspect-square rounded-lg overflow-hidden border border-mist-25 hover:border-tertiary transition-colors cursor-pointer group">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAArjMJvIM73WHZAdNt8eCxdRLp0A0QMpMe1wFkwrRHthcu6Hk1uzz4Xx1pqYDOyPjX_2FZ5xenUzJw2fPhoW9r5M5iIZ8XpO26l3qRJjl7w6yMKu1Ac3SVyFtwRxTIWmSkkOdqzqeC9HkT64IomkwlCpG2TXUQQ5idIi0VKAzBtMmUTpIpAQ-LzLrvkyo0hRF_glikuFELVzHmmjn1fe_1sFh6joXL4CutJyu5V670wkwtdbbA0hpKmjavL6N5FlcZovpu5c7TfvQ">
</div>
<div class="relative aspect-square rounded-lg overflow-hidden border border-mist-25 flex items-center justify-center bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors">
<span class="font-eyebrow text-eyebrow text-tertiary">+3 Views</span>
</div>
</div>
<!-- Olfactory Ingredients Drawer -->
<div class="glass-panel p-lg rounded-xl mt-xl border-gold-40/30">
<div class="flex items-center justify-between mb-md">
<span class="font-eyebrow text-eyebrow text-tertiary uppercase tracking-widest">Olfactory Ingredients</span>
<span class="material-symbols-outlined text-tertiary">science</span>
</div>
<div class="grid grid-cols-2 md:grid-cols-3 gap-lg">
<div class="space-y-xs">
<p class="font-title text-[14px] text-on-surface">Blue Lotus</p>
<p class="font-body text-[12px] text-on-surface-variant">Sourced from the banks of the Nile at dawn.</p>
</div>
<div class="space-y-xs">
<p class="font-title text-[14px] text-on-surface">Rare Jasmine</p>
<p class="font-body text-[12px] text-on-surface-variant">Premium Egyptian jasmine, hand-picked for purity.</p>
</div>
<div class="space-y-xs">
<p class="font-title text-[14px] text-on-surface">Sandalwood Oil</p>
<p class="font-body text-[12px] text-on-surface-variant">Sustainable Mysore-inspired aged resin essence.</p>
</div>
</div>
</div>
</section>
<!-- Product Info Card (Glass Bento) -->
<section class="w-full lg:w-[45%] sticky top-32">
<div class="glass-panel p-xl rounded-xl space-y-xl shadow-xl shadow-ink-35 h-full flex flex-col">
<!-- Scent Profile -->
<div class="space-y-xs">
<div class="flex items-center gap-md">
<span class="bg-gold-15 text-tertiary px-md py-1 rounded-full font-eyebrow text-[10px] uppercase tracking-widest border border-gold-40">Inspired by Giza</span>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-tertiary" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="font-body text-[14px] text-on-surface">4.9 (124 Reviews)</span>
</div>
</div>
<h1 class="font-display-lg text-display-lg text-on-surface leading-tight">Lotus of the Nile</h1>
<div class="bg-parchment-12 p-md rounded-lg border-l-2 border-tertiary">
<p class="font-body text-[16px] text-on-surface leading-relaxed italic">"A deep, aqueous floral that captures the silence of the dawn over the ancient riverbanks."</p>
</div>
</div>
<!-- Pricing -->
<div class="flex items-baseline justify-between pt-xs">
<div class="flex items-baseline gap-md">
<span class="font-display-md text-display-md text-tertiary tracking-tight">EGP 4,200</span>
<span class="font-body text-body text-on-surface-variant line-through opacity-50">EGP 5,800</span>
</div>
<span class="font-eyebrow text-[10px] text-tertiary uppercase tracking-widest">In Stock</span>
</div>
<!-- Variants Selection -->
<div class="space-y-md">
<div class="flex justify-between items-center">
<span class="font-eyebrow text-eyebrow text-on-surface">Volume Selection</span>
<button class="font-eyebrow text-eyebrow text-tertiary underline underline-offset-4 decoration-gold-40">Sizing Guide</button>
</div>
<div class="flex gap-md">
<button class="flex-1 py-md rounded-lg border-2 border-tertiary bg-gold-15 text-tertiary transition-all duration-300">
<span class="block font-title text-[18px]">100ml</span>
<span class="block font-eyebrow text-[10px] opacity-70">Signature Size</span>
</button>
<button class="flex-1 py-md rounded-lg border border-mist-25 hover:border-tertiary transition-all duration-300 group">
<span class="block font-title text-[18px] text-on-surface group-hover:text-tertiary">50ml</span>
<span class="block font-eyebrow text-[10px] text-on-surface-variant">Discovery Size</span>
</button>
</div>
</div>
<!-- CTA Area -->
<div class="space-y-md">
<button class="w-full py-xl rounded-full bg-tertiary text-on-tertiary-fixed font-title text-title flex items-center justify-center gap-md hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-tertiary/10">
<span class="material-symbols-outlined">shopping_bag</span>
                            Add to Bag
                        </button>
<div class="p-lg rounded-xl bg-surface-container-high border border-gold-40/20 flex items-center justify-between group cursor-pointer hover:bg-surface-container-highest transition-colors">
<div class="flex items-center gap-md">
<span class="material-symbols-outlined text-tertiary">redeem</span>
<div class="flex flex-col">
<span class="font-title text-[15px] text-on-surface">Complimentary Discovery Set</span>
<span class="font-body text-[12px] text-on-surface-variant">Included with every Signature 100ml bottle</span>
</div>
</div>
<span class="material-symbols-outlined text-tertiary group-hover:translate-x-1 transition-transform">chevron_right</span>
</div>
</div>
<!-- Quick Claims -->
<div class="grid grid-cols-2 gap-md pt-xl border-t border-mist-25">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined text-[20px]">local_shipping</span>
</div>
<div class="flex flex-col">
<span class="font-eyebrow text-[11px] text-on-surface">Egyptian Shipping</span>
<span class="font-body text-[13px] text-on-surface-variant">3-5 Business Days</span>
</div>
</div>
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined text-[20px]">verified</span>
</div>
<div class="flex flex-col">
<span class="font-eyebrow text-[11px] text-on-surface">House Guarantee</span>
<span class="font-body text-[13px] text-on-surface-variant">Authenticated Item</span>
</div>
</div>
</div><div class="pt-xl space-y-md">
<div class="flex flex-wrap gap-md">
<div class="flex items-center gap-xs bg-parchment-12 px-md py-1 rounded-full border border-mist-25">
<span class="material-symbols-outlined text-[14px] text-tertiary">eco</span>
<span class="font-eyebrow text-[10px] text-on-surface uppercase">Vegan &amp; Cruelty-Free</span>
</div>
<div class="flex items-center gap-xs bg-parchment-12 px-md py-1 rounded-full border border-mist-25">
<span class="material-symbols-outlined text-[14px] text-tertiary">handshake</span>
<span class="font-eyebrow text-[10px] text-on-surface uppercase">Ethically Sourced</span>
</div>
</div>
<p class="font-body text-[12px] text-on-surface-variant leading-relaxed">
    Our Blue Lotus is harvested using traditional methods that support local Egyptian farming communities, ensuring a sustainable future for the Nile's botanical heritage.
  </p>
</div>
</div>
</section>
</div>
<!-- Notes Pyramid Widget Section -->
<section class="mt-section-desktop max-w-bento-max mx-auto px-lg"><div class="text-center mb-xxl space-y-md"><span class="font-eyebrow text-eyebrow text-tertiary uppercase tracking-[3px]">Olfactory Architecture</span><h2 class="font-display-md text-display-md text-on-surface">The Notes Pyramid</h2></div><div class="mx-auto space-y-xl"><div class="relative flex flex-col items-center gap-xl">
  <!-- Background Pyramid Shape -->
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div class="w-0 h-0 border-l-[400px] border-l-transparent border-r-[400px] border-r-transparent border-b-[800px] border-b-gold-40/5 blur-2xl"></div>
  </div>

  <!-- Tier 1: Top Notes (Narrowest) -->
  <div class="relative group w-full max-w-[400px] z-10">
    <div class="absolute inset-0 bg-tertiary/5 blur-3xl rounded-full -z-10 scale-110 transition-transform duration-700 group-hover:scale-125"></div>
    <div class="glass-panel rounded-3xl p-xl border border-mist-25 flex flex-col items-center text-center gap-md hover:bg-gold-15 transition-colors duration-500">
      <div class="flex-shrink-0 w-16 h-16 rounded-full bg-gold-15 flex items-center justify-center text-tertiary">
        <span class="material-symbols-outlined text-display-md">light_mode</span>
      </div>
      <div class="space-y-xs">
        <span class="font-eyebrow text-[10px] text-tertiary uppercase tracking-widest">Top Notes • The Opening</span>
        <h3 class="font-headline text-headline text-on-surface">Blue Lotus &amp; Sea Mist</h3>
        <p class="font-body text-[14px] text-on-surface-variant leading-relaxed">The initial encounter. Volatile, bright, and immediate, capturing the first breath of dawn over the Nile.</p>
      </div>
    </div>
  </div>

  <!-- Tier 2: Heart Notes (Medium) -->
  <div class="relative group w-full max-w-[600px] z-10">
    <div class="absolute inset-0 bg-mist/5 blur-3xl rounded-full -z-10 scale-110 transition-transform duration-700 group-hover:scale-125"></div>
    <div class="glass-panel rounded-3xl p-xl md:p-xxl border border-mist-25 flex flex-col md:flex-row items-center gap-lg hover:bg-gold-15 transition-colors duration-500">
      <div class="flex-shrink-0 w-16 h-16 rounded-full bg-mist-25 flex items-center justify-center text-on-surface">
        <span class="material-symbols-outlined text-display-md">favorite</span>
      </div>
      <div class="flex-1 text-center md:text-left space-y-xs">
        <span class="font-eyebrow text-[10px] text-tertiary uppercase tracking-widest">Heart Notes • The Soul</span>
        <h3 class="font-headline text-display-md text-on-surface">Wild Papyrus &amp; Damask Rose</h3>
        <p class="font-body text-[14px] text-on-surface-variant leading-relaxed">The soul of the fragrance. Developing over four hours into a sophisticated, genderless floral core.</p>
      </div>
    </div>
  </div>

  <!-- Tier 3: Base Notes (Widest) -->
  <div class="relative group w-full max-w-[800px] z-10">
    <div class="absolute inset-0 bg-tertiary-container/20 blur-3xl rounded-full -z-10 scale-110 transition-transform duration-700 group-hover:scale-125"></div>
    <div class="glass-panel rounded-3xl p-xl md:p-xxl border border-mist-25 flex flex-col md:flex-row items-center gap-lg hover:bg-gold-15 transition-colors duration-500">
      <div class="flex-shrink-0 w-16 h-16 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary">
        <span class="material-symbols-outlined text-display-md">anchor</span>
      </div>
      <div class="flex-1 text-center md:text-left space-y-xs">
        <span class="font-eyebrow text-[10px] text-tertiary uppercase tracking-widest">Base Notes • The Anchor</span>
        <h3 class="font-headline text-display-md text-on-surface">Sandalwood, Myrrh &amp; Liquid Amber</h3>
        <p class="font-body text-[14px] text-on-surface-variant leading-relaxed">The lingering memory. Deep, resinous, and grounded, providing a warm skin-like glow for over twelve hours.</p>
      </div>
    </div>
  </div>
</div></div></section>
<!-- Scent Evolution Narrative -->
<section class="mt-section-desktop max-w-bento-max mx-auto px-lg">
<div class="glass-panel rounded-3xl p-xl md:p-xxl flex flex-col md:flex-row gap-xl items-center relative overflow-hidden">
<div class="md:w-1/2 space-y-lg relative z-10">
<span class="font-eyebrow text-eyebrow text-tertiary uppercase tracking-widest">The Sensory Narrative</span>
<h2 class="font-display-md text-display-md text-on-surface leading-tight">The Evolution of Lotus</h2>
<div class="space-y-xl relative">
<!-- Evolution Timeline -->
<div class="absolute left-[7px] top-4 bottom-4 w-[2px] evolution-line"></div>
<!-- Opening -->
<div class="flex gap-lg relative">
<div class="w-4 h-4 rounded-full bg-tertiary mt-2 ring-4 ring-gold-15"></div>
<div class="flex-1">
<h4 class="font-title text-[18px] text-on-surface mb-xs">The Opening: First Breath</h4>
<p class="font-body text-on-surface-variant leading-relaxed">The fragrance starts with a crisp, aqueous burst of Blue Lotus. It is cool and ethereal, like the mist rising from the Nile before the sun crests the horizon.</p>
</div>
</div>
<!-- Heart -->
<div class="flex gap-lg relative">
<div class="w-4 h-4 rounded-full bg-tertiary mt-2 ring-4 ring-gold-15"></div>
<div class="flex-1">
<h4 class="font-title text-[18px] text-on-surface mb-xs">The Heart: The Sacred Garden</h4>
<p class="font-body text-on-surface-variant leading-relaxed">After thirty minutes, the floral heart unfurls. Wild Papyrus adds a dry, green texture that grounds the delicate Damask Rose, creating a sophisticated, genderless floral core.</p>
</div>
</div>
<!-- Dry Down -->
<div class="flex gap-lg relative">
<div class="w-4 h-4 rounded-full bg-tertiary mt-2 ring-4 ring-gold-15"></div>
<div class="flex-1">
<h4 class="font-title text-[18px] text-on-surface mb-xs">The Dry Down: Eternal Anchor</h4>
<p class="font-body text-on-surface-variant leading-relaxed">Hours later, the fragrance settles into its foundation. Liquid Amber and Myrrh provide a warm, skin-like glow that lingers for over twelve hours on the skin.</p>
</div>
</div>
</div>
</div>
<div class="md:w-1/2 relative">
<div class="aspect-square rounded-2xl overflow-hidden border border-mist-25 shadow-2xl">
<img class="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0H7sM8pbUUtCPEOEwQ2--6m98jqFRSExR7U9Sok83JP0YqwjfDCcMOdlqc5UuSaJqWU1MOyf53S-BbNCEfZMf2KJxfZBYr_yrjIlrBU37NJj4E8Hes6zEZ8VhopM_RTrBHT2R6aFcZA3PoPOGde5rXzjm_7qqCVP8Eff5hHNEKPPzNrC8YHQKZztKazul_BgeJMiUyfaoTOQX97-5BuNfwgsY-376mVVCmy7WW_enHuRJLe9q9lMQrImByrZLpXgBh-QrS4sbQj0">
</div>
<!-- Organic Accent -->
<div class="absolute -bottom-10 -right-10 w-40 h-40 bg-tertiary/10 blur-3xl rounded-full"></div>
</div>
</div>
</section>
<!-- Reviews Section -->
<section class="mt-section-desktop px-lg">
<div class="flex flex-col md:flex-row justify-between items-end mb-xxl gap-md">
<div class="space-y-md">
<span class="font-eyebrow text-eyebrow text-tertiary uppercase tracking-widest">Shared Experiences</span>
<h2 class="font-display-md text-display-md text-on-surface">The Verity of Sorella</h2>
</div>
<button class="font-eyebrow text-eyebrow text-on-surface border-b border-on-surface pb-1 flex items-center gap-xs group">
                    View All Reviews 
                    <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
<!-- Review Cards -->
<div class="glass-panel p-xl rounded-xl space-y-md border-mist-25 hover:border-tertiary/40 transition-all duration-500 group">
<div class="flex justify-between items-start">
<div class="flex gap-0.5">
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
</div>
<span class="material-symbols-outlined text-tertiary/40">verified</span>
</div>
<p class="font-body text-body text-on-surface leading-relaxed italic">"It feels like walking through a private garden in Cairo at midnight. The sillage is incredible without being overpowering."</p>
<div class="flex items-center gap-md pt-md">
<div class="w-10 h-10 rounded-full bg-surface-container-high border border-mist-25 overflow-hidden">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0H7sM8pbUUtCPEOEwQ2--6m98jqFRSExR7U9Sok83JP0YqwjfDCcMOdlqc5UuSaJqWU1MOyf53S-BbNCEfZMf2KJxfZBYr_yrjIlrBU37NJj4E8Hes6zEZ8VhopM_RTrBHT2R6aFcZA3PoPOGde5rXzjm_7qqCVP8Eff5hHNEKPPzNrC8YHQKZztKazul_BgeJMiUyfaoTOQX97-5BuNfwgsY-376mVVCmy7WW_enHuRJLe9q9lMQrImByrZLpXgBh-QrS4sbQj0">
</div>
<div>
<p class="font-title text-[15px] text-on-surface">Amira H.</p>
<p class="font-eyebrow text-[10px] text-on-surface-variant uppercase">Verified Essence Holder</p>
</div>
</div>
</div>
<div class="glass-panel p-xl rounded-xl space-y-md border-mist-25 hover:border-tertiary/40 transition-all duration-500 mt-md md:mt-0">
<div class="flex justify-between items-start">
<div class="flex gap-0.5">
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star_half</span>
</div>
<span class="material-symbols-outlined text-tertiary/40">verified</span>
</div>
<p class="font-body text-body text-on-surface leading-relaxed italic">"The bottle itself is a work of art. The papyrus note is so unique, I've never smelled anything like it in commercial luxury."</p>
<div class="flex items-center gap-md pt-md">
<div class="w-10 h-10 rounded-full bg-surface-container-high border border-mist-25 overflow-hidden">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4yuRK67xm7pC4zlT0zIgb1hrnE7_krf-7leBbm4CnfnJwujzEuMyqQwxzHksZ6SiaxWjuCHhvvyRa_nMyp7MkoF6B5Uh_TasE2lD-TKRKoYPH4puSpJ4kzUTb0QKYmDtaSxS4Ffn5GQ0lOXN0zDYFFqNwBs171ns-fpunzdxeGok_9Egr9oegD-UGOucJwrdTtWVqC4Rko-lDD9WnD_KWYhY40LLCzbA-h5_H1_uBJFDjVqHMSjaiJrdKYizsVPcvipraE3KXJhg">
</div>
<div>
<p class="font-title text-[15px] text-on-surface">Julian M.</p>
<p class="font-eyebrow text-[10px] text-on-surface-variant uppercase">Signature Collector</p>
</div>
</div>
</div>
<div class="glass-panel p-xl rounded-xl space-y-md border-mist-25 hover:border-tertiary/40 transition-all duration-500 mt-md md:mt-0">
<div class="flex justify-between items-start">
<div class="flex gap-0.5">
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
<span class="material-symbols-outlined text-tertiary text-[18px]" style="font-variation-settings: &quot;FILL&quot; 1;">star</span>
</div>
<span class="material-symbols-outlined text-tertiary/40">verified</span>
</div>
<p class="font-body text-body text-on-surface leading-relaxed italic">"A masterpiece of Egyptian perfumery. It stays on my scarf for days. Truly exceptional craft."</p>
<div class="flex items-center gap-md pt-md">
<div class="w-10 h-10 rounded-full bg-surface-container-high border border-mist-25 overflow-hidden">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLlgKu_FHIVK85Pd5jRfMThWh91bYIE9aMG44UrxyRYRfqUAmKQpYwgz3FL_sJPr9bvq5fVfZ_zwXYNqDt78ZvLjJLnUexAuQRisWQKQFmxHKf9mgb_AadiKH2jJ3UuEuYZ-_XfefO5zhIUa19s2iAU2LNF7ww5RP7nn8tP-QXrSgh0p3wSPfuyXpX1zPZCBmBQYdLcYNMFEEnsHnfsKYqUcxjyt2zB5UmcBvS1MLOQxM1QjT8ELGyPp5Vwmr8mi4byqHvWzIefw0">
</div>
<div>
<p class="font-title text-[15px] text-on-surface">Layla K.</p>
<p class="font-eyebrow text-[10px] text-on-surface-variant uppercase">Essence Holder</p>
</div>
</div>
</div>
</div>
</section>
<!-- Related Products -->
<section class="mt-section-desktop px-lg">
<div class="text-center mb-xxl space-y-md">
<span class="font-eyebrow text-eyebrow text-tertiary uppercase tracking-widest">The Full Ritual</span>
<h2 class="font-display-md text-display-md text-on-surface">Complete the Set</h2>
</div>
<div class="flex gap-lg overflow-x-auto pb-lg hide-scrollbar snap-x">
<div class="min-w-[280px] flex-shrink-0 snap-start group">
<div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container mb-md">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-L8qYIsFNB9iYODAGS8IC4RY7B60ZM4w_fL2E9PXObsLErCV-SoA8n8k82OFkSpJqdLKsfbffRTmd6m6ORkfqh8LXdS96_qaS4NfGKXXan0haNJza6FTIoyoGDMvsD0EYB-UVphLm2uSuOAVjq_2gNOy3J2JrIfK41Rj58tfRotPwnERuiHdxVy9AWl8m92HQRqzb6XPes7AKcQIlioBk_mNRAPWnP7wAbSxTW_B0GzioeWOjYh-iDVUnFU7HZj3GzPfyPYn0pis">
<button class="absolute bottom-4 right-4 w-10 h-10 rounded-full glass-dock flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-on-surface text-[20px]">add</span>
</button>
</div>
<p class="font-eyebrow text-[10px] text-tertiary uppercase tracking-widest mb-1">Body Essence</p>
<h3 class="font-title text-[18px] text-on-surface">Silk of the Nile</h3>
<p class="font-body text-[15px] text-on-surface-variant">EGP 1,800</p>
</div>
<div class="min-w-[280px] flex-shrink-0 snap-start group">
<div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container mb-md">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqAQ8x_2SNYUs_iKatLSOt1-DJ8NAVLce4A1fafW9K-6vN-diFQj8ZHOt0kShB5B8e7zIe-rw1RGInNd0qLBsBMtvlS6OvXoK56GjXEfXkQNqN8QSWfWOJFdAVgWMEFUInu8Psck8E-yBMArDg8kqxzSPcE3uR7KLmEjMgOPD-KPFQlEhttWgGtYlrexWdtFu_p_TeLMl-12muqdk-rBwqKTGSgAXmZavL8_AnkTf5h-WqMWIW56mkDcqso6uRGm1OFJhHoJqGl_s">
<button class="absolute bottom-4 right-4 w-10 h-10 rounded-full glass-dock flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-on-surface text-[20px]">add</span>
</button>
</div>
<p class="font-eyebrow text-[10px] text-tertiary uppercase tracking-widest mb-1">Ritual Tool</p>
<h3 class="font-title text-[18px] text-on-surface">Temple Burner</h3>
<p class="font-body text-[15px] text-on-surface-variant">EGP 2,400</p>
</div>
<div class="min-w-[280px] flex-shrink-0 snap-start group">
<div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container mb-md">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaS_ZVn1-9sibXLu9W57wr6O3sgY9UxZnlu3oYxBYq3IlescJ_hW0GUM_oVthIol7QR-u4EulDmlSF0jEu56oU3kFaOPRlXpfVqzvA0hYaF86dJ_7o1WKGAJmGpZUpskEGboIE9RJi_mNujZ6D7v_sCgEFZlUnBfhLVHKOBjrG0Nw--1lZ3bYdyr4sdlqJ0VuBlKI-HfWkvXnp0tUCgRDKiC_48LHXCwsUi2z2xvpbdZN4gNrFS1_VOt71dG78JC6vF9uRZILHUJA">
<button class="absolute bottom-4 right-4 w-10 h-10 rounded-full glass-dock flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-on-surface text-[20px]">add</span>
</button>
</div>
<p class="font-eyebrow text-[10px] text-tertiary uppercase tracking-widest mb-1">Travel</p>
<h3 class="font-title text-[18px] text-on-surface">Nomad Leather Case</h3>
<p class="font-body text-[15px] text-on-surface-variant">EGP 1,200</p>
</div>
</div>
</section>
</main>
<!-- Footer -->
<!-- The Perfect Layer Section -->
<section class="mt-section-desktop max-w-bento-max mx-auto px-lg">
<div class="glass-panel rounded-3xl p-xl md:p-xxl border-gold-40/20 overflow-hidden relative">
<div class="relative z-10 flex flex-col md:flex-row items-center gap-xl">
<div class="md:w-1/2 space-y-md">
<span class="font-eyebrow text-eyebrow text-tertiary uppercase tracking-widest">The Perfect Layer</span>
<h2 class="font-display-md text-display-md text-on-surface">Create Your Signature Ritual</h2>
<p class="font-body text-on-surface-variant leading-relaxed">Enhance the aqueous depth of Lotus of the Nile by layering it with our <strong>Desert Oud</strong>. The smoky resinous base of the Oud anchors the ethereal floral notes, creating a scent that is uniquely yours.</p>
<button class="mt-md px-xl py-md rounded-full border border-tertiary text-tertiary font-title hover:bg-tertiary hover:text-on-tertiary-fixed transition-all duration-300">
          Explore Layering Guide
        </button>
</div>
<div class="md:w-1/2 flex items-center justify-center gap-md">
<div class="w-40 aspect-[3/4] rounded-xl overflow-hidden border border-mist-25 rotate-[-6deg] shadow-2xl">
<img alt="Lotus of the Nile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv1JsorT1xnBnVj8cSm9mH_x2RBjaMHqLM26l9GiSDo5kHuJfS3A0TBiFisld1nT4QqsmwlEOt76afcOMbGly5vEWeY_iKVO7Iil3zTL7IXanWP18bws-_XEYYHAoKIMby4quipB2E33BwUivy97LhdqTfWj2EZ9xK_2s5SycWfD5ywu5hbORYVM87oHgU1FX7FVpghjwgRJmdM09XnGR_JdA2eybpLgRCqFypIiyV0N9GgfKTEdE4HBa9wek5ihtZSMOiq8_XWQM">
</div>
<span class="material-symbols-outlined text-tertiary text-display-md">add</span>
<div class="w-40 aspect-[3/4] rounded-xl overflow-hidden border border-mist-25 rotate-[6deg] shadow-2xl">
<img alt="Desert Oud" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-L8qYIsFNB9iYODAGS8IC4RY7B60ZM4w_fL2E9PXObsLErCV-SoA8n8k82OFkSpJqdLKsfbffRTmd6m6ORkfqh8LXdS96_qaS4NfGKXXan0haNJza6FTIoyoGDMvsD0EYB-UVphLm2uSuOAVjq_2gNOy3J2JrIfK41Rj58tfRotPwnERuiHdxVy9AWl8m92HQRqzb6XPes7AKcQIlioBk_mNRAPWnP7wAbSxTW_B0GzioeWOjYh-iDVUnFU7HZj3GzPfyPYn0pis">
</div>
</div>
</div>
<div class="absolute top-[-20%] right-[-10%] w-64 h-64 bg-tertiary/5 blur-3xl rounded-full"></div>
</div>
</section>
<!-- Fragrance Family Section -->
<section class="mt-section-desktop px-lg">
<div class="text-center mb-xxl space-y-md">
<span class="font-eyebrow text-eyebrow text-tertiary uppercase tracking-widest">Olfactory Kinship</span>
<h2 class="font-display-md text-display-md text-on-surface">From the Same Family</h2>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-lg max-w-bento-max mx-auto">
<div class="group cursor-pointer">
<div class="aspect-square rounded-2xl overflow-hidden bg-surface-container mb-md border border-mist-25 group-hover:border-tertiary transition-all">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH3invrPqGbk6lyavR5BiT3hE5S-X60y0WxC2abWs3JaTP4n2ETKWkb2yvKO-W3NL6wI13yOn-rE6p6Yy2Wd--qWy1-p0jIwcdP_0tQZ9xtGyccuyrle9EVjd-L84ckyrMdCPTNlS-O6sim9g1Mh0W6twQhnTR3L9-jV9IRW8i9FkyeyeisMCQi7BabXiG2LdI9-PCwCEIVN6O4XQRyBIdquA-o9Ey0bGD7b7h-tjYUqtyVRthNKtlrj379fHuCLI6-RTj2vSlLlw">
</div>
<h3 class="font-title text-[16px] text-on-surface group-hover:text-tertiary transition-colors">Papyrus Reed</h3>
<p class="font-eyebrow text-[10px] text-on-surface-variant uppercase tracking-widest">Green Floral</p>
</div>
<div class="group cursor-pointer">
<div class="aspect-square rounded-2xl overflow-hidden bg-surface-container mb-md border border-mist-25 group-hover:border-tertiary transition-all">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjMHHOAID8KXx_oBA1c0YrGXsb8QgW7KUVFXjsSmYV8UjVRdwAEKNA82BNN9yyH97Dz9XXz_LD12QradHc55aR-AyPW_fSS5AnZ6bXBSdMlg3nuWaRwP2lPeyjjVROqvF2Hy10ubVFVVUHFvMSnkDPoIcHtYP1T87YRwH6RkhOHvn186kQO9qj_0S9l3bWwjbVq6jMj37ezIBHuu1jLNNsyJWlEbTGgC138uQbgXBlPC-xlBSDyqUcmb1-bHO_gIXOFS1au0nwy1Y">
</div>
<h3 class="font-title text-[16px] text-on-surface group-hover:text-tertiary transition-colors">Midnight Jasmine</h3>
<p class="font-eyebrow text-[10px] text-on-surface-variant uppercase tracking-widest">White Floral</p>
</div>
<div class="group cursor-pointer">
<div class="aspect-square rounded-2xl overflow-hidden bg-surface-container mb-md border border-mist-25 group-hover:border-tertiary transition-all">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAArjMJvIM73WHZAdNt8eCxdRLp0A0QMpMe1wFkwrRHthcu6Hk1uzz4Xx1pqYDOyPjX_2FZ5xenUzJw2fPhoW9r5M5iIZ8XpO26l3qRJjl7w6yMKu1Ac3SVyFtwRxTIWmSkkOdqzqeC9HkT64IomkwlCpG2TXUQQ5idIi0VKAzBtMmUTpIpAQ-LzLrvkyo0hRF_glikuFELVzHmmjn1fe_1sFh6joXL4CutJyu5V670wkwtdbbA0hpKmjavL6N5FlcZovpu5c7TfvQ">
</div>
<h3 class="font-title text-[16px] text-on-surface group-hover:text-tertiary transition-colors">Nile Lily</h3>
<p class="font-eyebrow text-[10px] text-on-surface-variant uppercase tracking-widest">Aqueous Floral</p>
</div>
<div class="group cursor-pointer">
<div class="aspect-square rounded-2xl overflow-hidden bg-surface-container mb-md border border-mist-25 group-hover:border-tertiary transition-all">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0H7sM8pbUUtCPEOEwQ2--6m98jqFRSExR7U9Sok83JP0YqwjfDCcMOdlqc5UuSaJqWU1MOyf53S-BbNCEfZMf2KJxfZBYr_yrjIlrBU37NJj4E8Hes6zEZ8VhopM_RTrBHT2R6aFcZA3PoPOGde5rXzjm_7qqCVP8Eff5hHNEKPPzNrC8YHQKZztKazul_BgeJMiUyfaoTOQX97-5BuNfwgsY-376mVVCmy7WW_enHuRJLe9q9lMQrImByrZLpXgBh-QrS4sbQj0">
</div>
<h3 class="font-title text-[16px] text-on-surface group-hover:text-tertiary transition-colors">Sacred Rose</h3>
<p class="font-eyebrow text-[10px] text-on-surface-variant uppercase tracking-widest">Spicy Floral</p>
</div>
</div>
</section><footer class="w-full rounded-t-[40px] mt-section-desktop border-t border-mist-25 bg-surface-container-low">
<div class="grid grid-cols-1 md:grid-cols-12 gap-xl px-lg py-xxl max-w-bento-max mx-auto">
<div class="md:col-span-4 space-y-md">
<span class="font-display-md text-display-md text-tertiary tracking-widest uppercase">Sorella</span>
<p class="font-body text-body text-on-surface-variant max-w-[320px]">Curating the olfactory soul of the Orient. Every essence is a journey through time, captured in glass.</p>
<div class="flex gap-lg pt-md">
<a class="text-on-surface-variant hover:text-tertiary transition-colors" href="#"><span class="material-symbols-outlined">public</span></a>
<a class="text-on-surface-variant hover:text-tertiary transition-colors" href="#"><span class="material-symbols-outlined">share</span></a>
<a class="text-on-surface-variant hover:text-tertiary transition-colors" href="#"><span class="material-symbols-outlined">mail</span></a>
</div>
</div>
<div class="md:col-span-2 space-y-md">
<span class="font-eyebrow text-eyebrow text-on-surface uppercase tracking-widest">Collections</span>
<ul class="space-y-md">
<li class=""><a class="font-body text-body text-on-surface-variant hover:text-tertiary transition-colors" href="#">The Nile Series</a></li>
<li class=""><a class="font-body text-body text-on-surface-variant hover:text-tertiary transition-colors" href="#">Desert Oud</a></li>
<li class=""><a class="font-body text-body text-on-surface-variant hover:text-tertiary transition-colors" href="#">Ancient Oils</a></li>
</ul>
</div>
<div class="md:col-span-2 space-y-md">
<span class="font-eyebrow text-eyebrow text-on-surface uppercase tracking-widest">Maison</span>
<ul class="space-y-md">
<li class=""><a class="font-body text-body text-on-surface-variant hover:text-tertiary transition-colors" href="#">Our Heritage</a></li>
<li class=""><a class="font-body text-body text-on-surface-variant hover:text-tertiary transition-colors" href="#">Craftsmanship</a></li>
<li class=""><a class="font-body text-body text-on-surface-variant hover:text-tertiary transition-colors" href="#">Fragrance Finder</a></li>
</ul>
</div>
<div class="md:col-span-4 space-y-md">
<span class="font-eyebrow text-eyebrow text-on-surface uppercase tracking-widest">Join the Circle</span>
<p class="font-body text-[14px] text-on-surface-variant">Experience early access to private reserves and olfactory events.</p>
<form class="flex gap-0 group">
<input class="flex-1 bg-surface-container border border-mist-25 rounded-l-lg px-md py-xs text-on-surface focus:ring-1 focus:ring-tertiary focus:border-tertiary outline-none transition-all" placeholder="Your essence..." type="email">
<button class="bg-tertiary text-on-tertiary-fixed px-md py-xs rounded-r-lg font-eyebrow text-[10px] uppercase tracking-widest hover:bg-tertiary-fixed transition-colors">Subscribe</button>
</form>
</div>
</div>
<div class="border-t border-mist-25 py-lg px-lg max-w-bento-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
<p class="font-eyebrow text-[11px] text-on-surface-variant opacity-60">© 2024 Sorella Fragrance House. Crafted in Egypt.</p>
<div class="flex gap-lg">
<a class="font-eyebrow text-[11px] text-on-surface-variant hover:text-tertiary transition-colors uppercase tracking-widest" href="#">Sustainability</a>
<a class="font-eyebrow text-[11px] text-on-surface-variant hover:text-tertiary transition-colors uppercase tracking-widest" href="#">Shipping</a>
<a class="font-eyebrow text-[11px] text-on-surface-variant hover:text-tertiary transition-colors uppercase tracking-widest" href="#">Privacy</a>
</div>
</div>
</footer>
<script>
        // Micro-interactions and variant selection
        document.querySelectorAll('section button.rounded-lg').forEach(btn => {
            btn.addEventListener('click', function() {
                this.parentElement.querySelectorAll('button').forEach(b => {
                    b.classList.remove('border-2', 'border-tertiary', 'bg-gold-15', 'text-tertiary');
                    b.classList.add('border', 'border-mist-25');
                    const label = b.querySelector('span:first-child');
                    if(label) label.classList.remove('text-tertiary');
                });
                this.classList.add('border-2', 'border-tertiary', 'bg-gold-15', 'text-tertiary');
                this.classList.remove('border', 'border-mist-25');
                const label = this.querySelector('span:first-child');
                if(label) label.classList.add('text-tertiary');
            });
        });

        // Simple cart feedback
        const addToBagBtn = document.querySelector('button.bg-tertiary');
        addToBagBtn.addEventListener('click', () => {
            const originalText = addToBagBtn.innerHTML;
            addToBagBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Adding...';
            setTimeout(() => {
                addToBagBtn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> In Bag';
                setTimeout(() => {
                    addToBagBtn.innerHTML = originalText;
                }, 2000);
            }, 800);
        });
    </script>




</body></html>