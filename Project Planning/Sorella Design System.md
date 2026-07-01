# Sorella — Design System

**Direction:** Glassmorphism × Bento Grid · Charcoal / Gold / Parchment
**Prepared for:** Ahmed Aboelsnoon · **Owner:** Sorella (sorella-eg.com) · **Platform:** Shopify
**Last updated:** July 1, 2026 · **Status:** Phase 0 foundation (authoritative)

> This is the single source of truth for Sorella's visual language. It supersedes the earlier `DesignSystem.md`, which documented an Apple.com-derived system on the wrong accent/typeface. That file's *rigor* — tokenized scales, tight display tracking, context-specific line-heights, breakpoints, touch targets, whitespace philosophy — is carried forward here and re-tuned for a luxury fragrance brand built on glass and bento. Everything here is expressed as tokens so it drops straight into Shopify sections and CSS custom properties (see §16).

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
2. **Editorial pace.** Body copy runs at 17px with generous leading; headlines are set in a high-contrast serif with tight tracking. The page should feel *read*, not *scanned*.
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

| Token | Hex | Name |
|---|---|---|
| `{color.ink}` | `#1C1F24` | Ink (charcoal) |
| `{color.slate}` | `#3A4452` | Slate |
| `{color.mist}` | `#9AA3AD` | Mist |
| `{color.parchment}` | `#F2EEE7` | Parchment |
| `{color.gold}` | `#C79C5A` | Gold |

### 2.2 Role mapping

| Role | Token | Notes |
|---|---|---|
| Page background (dark mode) | `{color.ink}` | Default site surface |
| Secondary/layered background, gradient stop | `{color.slate}` | Section fills, glass gradient base |
| Text on light surfaces / dark section fills | `{color.ink}` | Primary reading color on Parchment |
| Text on dark surfaces / light glass | `{color.parchment}` | Primary reading color on Ink |
| Secondary text, borders, dividers, disabled/sold-out | `{color.mist}` | Never a primary text color for long copy |
| Accent — CTA fill, price, active state, icon accents, tag borders, cart badge | `{color.gold}` | Accent only; see §2.4 |

### 2.3 Derived tints & alphas

These are the working values behind glass, borders, scrims, and hovers. Defined once here, referenced everywhere.

| Token | Value | Use |
|---|---|---|
| `{color.ink-90}` | `rgba(28,31,36,0.90)` | Glass solid fallback; heavy scrim |
| `{color.ink-70}` | `rgba(28,31,36,0.70)` | Hero scrim over photography (text legibility) |
| `{color.ink-35}` | `rgba(28,31,36,0.35)` | Glass panel shadow color |
| `{color.parchment-65}` | `rgba(242,238,231,0.65)` | Nav dock glass fill (scrolled) |
| `{color.parchment-12}` | `rgba(242,238,231,0.12)` | Glass panel fill on dark backgrounds |
| `{color.parchment-08}` | `rgba(242,238,231,0.08)` | Subtle glass fill / hairline highlight |
| `{color.mist-25}` | `rgba(154,163,173,0.25)` | Glass & hairline borders |
| `{color.mist-40}` | `rgba(154,163,173,0.40)` | Dividers on light surfaces |
| `{color.gold-15}` | `rgba(199,156,90,0.15)` | Gold hover wash, tag fill |
| `{color.gold-40}` | `rgba(199,156,90,0.40)` | Gold hover border (product card) |
| `{color.black-pure}` | `#000000` | Reserved; not used as a surface (Ink is the darkest surface) |

### 2.4 Gold usage rule (reconciled)

The redesign report says two things that read as conflicting — "accent only, never a fill background" (§6.1) and "solid-fill buttons" (§6.3). The reconciliation:

- ✅ **Gold as a solid CTA button fill** with **Ink text** — allowed. Button labels are large/bold and pass AA (§2.6).
- ✅ **Gold as border, price text, active-state indicator, icon, small pill border** — allowed.
- ✅ **Gold as a thin underline / focus ring** — allowed.
- ❌ **Gold as a large decorative section/background fill** — not allowed (turns the accent into a theme color and cheapens it).
- ❌ **Gold as small body text on Parchment** — not allowed (contrast failure).

### 2.5 Gradients & scrims

Gradients are **functional only** — never decorative wallpaper.

| Token | Value | Use |
|---|---|---|
| `{gradient.surface}` | `linear-gradient(160deg, {color.ink} 0%, {color.slate} 100%)` | Dark section backdrop behind glass when no photo is present |
| `{gradient.hero-scrim}` | `linear-gradient(180deg, {color.ink-70} 0%, transparent 40%, {color.ink-70} 100%)` | Over hero photography so nav + headline stay legible top and bottom |
| `{gradient.card-sheen}` | `linear-gradient(135deg, {color.parchment-08} 0%, transparent 60%)` | Optional 1-pass glass sheen highlight (top-left) |

### 2.6 Contrast-verified text pairings

Only these combinations are cleared for the stated use. (Ratios approximate; re-verify final renders.)

| Foreground | Background | Ratio | Cleared for |
|---|---|---|---|
| `{color.parchment}` | `{color.ink}` | ~13:1 | All text |
| `{color.ink}` | `{color.parchment}` | ~13:1 | All text |
| `{color.ink}` | `{color.parchment-65}` glass | ~AA+ | Nav dock text (scrolled) — safe |
| `{color.parchment}` | `{color.parchment-12}` glass over Ink | passes (large) | Headlines/large text on dark glass |
| `{color.gold}` | `{color.ink}` | ~4.7:1 | **Large text & UI only**; borderline for small body — prefer ≥18px/600 |
| `{color.ink}` | `{color.gold}` (button fill) | ~4.5:1 | Button labels ≥16px/600 |
| `{color.gold}` | `{color.parchment}` | ~1.9:1 | ❌ **Fails** — large text/icons/borders only, never body |
| `{color.mist}` | `{color.ink}` | ~4.6:1 | Secondary text ≥16px; not for fine print |

**Rules that follow:** Gold is never small body text. Mist is never fine print. Nav transparent-state text always carries a text-shadow safety net (§8.1).

---

## 3. Typography

### 3.1 Type families (decision — confirm with client, §17)

The report left the pairing open (§6.4). Decision for Phase 0: a **high-contrast display serif** for headings + a **neutral grotesk** for body/UI. Rationale: the serif delivers the luxury/editorial cue the moodboard calls for; the grotesk stays legible at small sizes and inside blurred glass, where thin serif strokes disappear.

| Role | Family | Stack | Notes |
|---|---|---|---|
| **Display / Headings** | **Fraunces** (variable) | `"Fraunces", "Canela", Georgia, "Times New Roman", serif` | High optical contrast; supports optical-size + soft/wonky axes. Free (Google Fonts). Premium alternative: **Canela** or **Ogg**. |
| **Body / UI** | **Inter** (variable) | `"Inter", "General Sans", system-ui, -apple-system, sans-serif` | Neutral grotesk; tall x-height reads well at 17px and inside glass. Free. Alternative: **General Sans**. |
| **Numeric (price/spec)** | Inter, tabular | `font-variant-numeric: tabular-nums` | Prices, quantities, spec sheets align in columns. |

**OpenType:** enable `tabular-nums` on prices and cart math. On Fraunces, use the optical-size axis so large display sizes get the high-contrast cut and smaller sizes stay sturdy. Eyebrows/overlines use tracked uppercase (§3.4).

### 3.2 Type scale

Serif tokens = display family; sans tokens = body/UI family. Line-heights are **context-specific** (tight for display, editorial for body) — this is intentional, not a default.

| Token | Family | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|---|
| `{type.display-hero}` | Serif | 60px | 400 | 1.05 | -0.5px | Homepage hero headline |
| `{type.display-lg}` | Serif | 44px | 400 | 1.08 | -0.4px | Section heads, brand-story titles |
| `{type.display-md}` | Serif | 32px | 500 | 1.15 | -0.3px | Product name (PDP), bento tile titles |
| `{type.headline}` | Serif | 24px | 500 | 1.2 | -0.2px | Card headlines, subsection heads |
| `{type.title}` | Sans | 21px | 600 | 1.24 | -0.15px | Sub-nav category, tagline, prominent UI titles |
| `{type.lead}` | Sans | 20px | 300 | 1.5 | 0 | Airy lead paragraphs (rare light weight — atmospheric) |
| `{type.body-lg}` | Sans | 18px | 400 | 1.5 | -0.2px | Emphasized paragraph / intro copy |
| `{type.body}` | Sans | 17px | 400 | 1.47 | -0.2px | **Default paragraph** (17px, not 16px) |
| `{type.body-strong}` | Sans | 17px | 600 | 1.35 | -0.2px | Inline strong emphasis |
| `{type.body-sm}` | Sans | 15px | 400 | 1.45 | -0.1px | Dense copy, secondary descriptions |
| `{type.caption}` | Sans | 14px | 400 | 1.43 | -0.1px | Captions, button text, filter labels |
| `{type.caption-strong}` | Sans | 14px | 600 | 1.3 | -0.1px | Emphasized captions, active filter |
| `{type.price}` | Sans (tabular) | 17px | 600 | 1.2 | 0 | Product price (Gold on light / Parchment on dark) |
| `{type.eyebrow}` | Sans | 12px | 600 | 1.0 | +1.2px (uppercase) | Gold overline above headlines — the luxury cue |
| `{type.nav-link}` | Sans | 15px | 500 | 1.0 | -0.1px | Nav dock links |
| `{type.fine-print}` | Sans | 12px | 400 | 1.4 | 0 | Footer body, fine print |
| `{type.micro-legal}` | Sans | 10px | 400 | 1.3 | 0 | Micro legal disclaimers |

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

| Token | Value | Use |
|---|---|---|
| `{space.xxs}` | 4px | Icon/label gaps, tight nudges |
| `{space.xs}` | 8px | Compact internal padding |
| `{space.sm}` | 12px | Chip padding, small gaps |
| `{space.md}` | 16px | Default component padding, grid gutter |
| `{space.lg}` | 24px | Card padding, comfortable gaps |
| `{space.xl}` | 32px | Bento gap, large internal padding |
| `{space.xxl}` | 48px | Between stacked blocks |
| `{space.section}` | 80px | Section vertical padding (desktop) |

**Button padding:** 12–14px vertical, 20–28px horizontal (larger than the Apple baseline — glass CTAs need more presence). **Card padding:** `{space.lg}` (24px). **Section padding:** `{space.section}` (80px desktop), tightening to 48px on large-phone and below.

### 4.2 Grid & container

| Context | Max width | Columns | Gutter |
|---|---|---|---|
| Text-heavy (brand story, about) | ~820px | 1 (centered) | — |
| Bento (homepage, campaigns) | 1280px | 12-col base, variable spans | `{space.xl}` (32px) |
| Catalog grid (collection) | 1440px | `repeat(auto-fill, minmax(240px, 1fr))` | `{space.lg}` (24px) |
| Full-bleed (hero, brand-story bg) | 100vw | — | 0 |
| Wide desktop lock | Content locks at **1440px**; margins absorb extra width | | |

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

| Token | Value | Use |
|---|---|---|
| `{radius.none}` | 0px | Full-bleed hero/brand-story imagery, edge-to-edge sections |
| `{radius.xs}` | 6px | Inline chips, small tags |
| `{radius.sm}` | 10px | Inline card imagery, small buttons, input fields |
| `{radius.md}` | 14px | Compact glass elements, quick-add buttons |
| `{radius.lg}` | 20px | **Glass panels, bento cells, product cards** (system default) |
| `{radius.xl}` | 28px | Large hero glass card, cart drawer corners |
| `{radius.pill}` | 999px | Primary Gold CTA, filter chips, "Inspired by" tag, scrolled nav dock |
| `{radius.full}` | 50% | Circular icon controls, avatars, cart badge |

Don't mix radii grammars: `{radius.lg}` for panels/cards, `{radius.pill}` for actions/chips, `{radius.md}` for compact glass, and nothing arbitrary in between.

---

## 7. Elevation, glass & depth

### 7.1 Depth philosophy

Elevation comes from **three** sources, in priority order:

1. **Surface-color change** — alternating Ink and Parchment full-bleed sections. The color change is the divider; no border, no shadow needed.
2. **Frosted glass** — a single translucent, blurred layer that reads as "floating over content." Used sparingly (§7.3).
3. **One product shadow** — a soft shadow under product renders resting on a surface, to give the bottle weight. Never on cards, buttons, or text.

### 7.2 Shadow & glass tokens

| Token | Value | Use |
|---|---|---|
| `{shadow.glass}` | `0 8px 32px {color.ink-35}` | Glass panels, hero card, brand-story cards |
| `{shadow.dock}` | `0 8px 24px rgba(28,31,36,0.25)` | Scrolled nav dock |
| `{shadow.product}` | `0 5px 30px rgba(28,31,36,0.22)` | Product renders on a surface (the only "product" shadow) |
| `{shadow.card-hover}` | `0 4px 20px rgba(28,31,36,0.18)` | Solid product card lift on hover (subtle) |
| `{border.hairline}` | `1px solid {color.mist-25}` | Glass borders, sub-nav separator |

### 7.3 Glass panel spec & blur budget

Blur is a **budget**. It is allowed only on: **nav dock · hero card · brand-story panels · cart drawer · mega-menu**. The product catalog grid stays **solid** — for performance across 32+ SKU pages (heavy mid-range Android base in Egypt) and to avoid visual noise. Use **10–18px** blur, never 30px+.

```css
/* Standard glass panel — dark-mode default (light tint over Ink) */
.glass-panel {
  background: rgba(242, 238, 231, 0.12);          /* {color.parchment-12} */
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(154, 163, 173, 0.25);    /* {color.mist-25} */
  border-radius: 20px;                            /* {radius.lg} */
  box-shadow: 0 8px 32px rgba(28, 31, 36, 0.35);  /* {shadow.glass} */
}

/* Progressive-enhancement fallback: no blur support → solid Ink, no fog */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass-panel { background: rgba(28, 31, 36, 0.90); }  /* {color.ink-90} */
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
  position: fixed; top: 12px; left: 50%; transform: translateX(-50%);
  max-width: 920px; width: calc(100% - 32px);
  height: 60px; border-radius: 999px;              /* {radius.pill} */
  background: rgba(242, 238, 231, 0.65);           /* {color.parchment-65} */
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(154, 163, 173, 0.25);     /* {color.mist-25} */
  box-shadow: 0 8px 24px rgba(28, 31, 36, 0.25);   /* {shadow.dock} */
  color: #1C1F24;                                   /* Ink text on light glass */
  transition: background 300ms ease-out, backdrop-filter 300ms ease-out,
              max-width 300ms ease-out, height 300ms ease-out,
              top 300ms ease-out, border-radius 300ms ease-out, color 300ms ease-out;
}

.nav-dock--top {                                    /* State A */
  top: 0; max-width: 100%; width: 100%; height: 88px;
  border-radius: 0; background: transparent;
  backdrop-filter: none; -webkit-backdrop-filter: none;
  border-color: transparent; box-shadow: none;
  color: #F2EEE7;                                   /* Parchment text over hero */
  text-shadow: 0 1px 3px rgba(28, 31, 36, 0.70);
}
```

- **Transition:** animate `background`, `backdrop-filter`, `width/max-width`, `height`, `top`, `border-radius`, and `color` **together** on one 250–350ms ease-out — never an instant snap. The dock should feel like it *condenses*.
- **Color flip** (Parchment → Ink) times to the background fill's midpoint so there's no moment of low contrast.
- Contrast check: Ink-on-Parchment-glass passes AA comfortably (the inverse of the risky Gold-on-Parchment case).

### 8.3 Structure & content

| Zone | Content |
|---|---|
| Left | Logo — compact icon mark in the docked state; full wordmark allowed in the transparent top state if room |
| Center | Primary links: **For Her / For Him / Unisex / Perfume Oil / Bundles** — collapse to a **"Shop" mega-menu trigger** if the dock can't fit all five comfortably |
| Right | Search icon · account icon · cart icon (with item-count **badge in Gold**) |

The **mega-menu is not width-locked to the dock** — it drops as its own wide/full-width glass panel (independent of the dock's compact footprint) with room for bento-style category tiles.

### 8.4 Scroll behavior

- Docked nav **stays visible on scroll-up**, **hides on scroll-down** past a threshold — so it doesn't compete while reading a product description, but reappears the instant the user wants to navigate. *(Confirm with client — §17.)*

### 8.5 Mobile

- Same two-state logic, but the docked state becomes a **full-width** glass bar (the "narrower than usual" inset is a desktop refinement; edge-to-edge is more usable on small viewports). A persistent nav element is the one justified exception to limiting mobile blur.
- Hamburger opens a **full-height glass drawer** (§9), not a dropdown.

### 8.6 States to design & QA

Transparent over light photo · transparent over dark/gradient · docked glass · scroll-up vs scroll-down · cart drawer open with nav visible (test z-index + blur layering together, since both use glass).

---

## 9. Component library

Build each once as a schema-driven Shopify section/block (`sorella-` prefix, §15) and reuse — never re-implement per page.

| Component | Spec summary | Used on |
|---|---|---|
| **Adaptive Nav Dock** | §8 — transparent → glass dock | All pages |
| **Glass Hero Card** | Large asymmetric glass panel over photo/video bg, `{gradient.hero-scrim}` for legibility, `{type.display-hero}` headline + Gold CTA, `{radius.xl}` | Homepage, campaigns, collection landing (optional) |
| **Bento Cell (Category)** | Photographic tile, single CTA, variable span (1×1…2×2), `{radius.lg}`, gold hover border | Homepage collections, mega-menu |
| **Bento Cell (Trust/Stat)** | Small glass card, icon + short claim ("Free 5ml over 1,100 LE", "Made fresh in Egypt"), `{radius.lg}` | Homepage hero trio, brand story |
| **Product Card (Catalog)** | **Solid** Parchment/Ink card (no blur), image, name `{type.headline}`, price `{type.price}` in Gold, quick-add; **gold hover border** (`{color.gold-40}`) + `{shadow.card-hover}` | Collection grids |
| **Product Card (Sold Out)** | Same shell at ~55% opacity, desaturated image, Mist **"Sold out" pill** replacing the CTA (never color-only) | Collection grids |
| **Product Card (Quick-Add SKU)** | Compact variant for impulse items (musks, 5ml testers) — smaller footprint, price emphasized | Musks/testers, bundle builder, cart upsell |
| **Notes Pyramid Widget** | 3-tier mini-diagram or stacked mini-cards (top / heart / base) — NEW content | Product page |
| **"Inspired By" Tag** | Small pill, `{color.gold-40}` border, `{color.gold-15}` fill, `{type.caption}`, `{radius.pill}` | Product card, product page |
| **Testimonial Glass Card** | Structured review — name, verified badge, date, quote, star rating in Gold, `{radius.lg}` | Homepage reviews, PDP reviews tab |
| **Brand-Story Block** | Full-bleed alternating glass panel over photography, Parchment text, `{type.display-lg}` | About page, homepage (single instance) |
| **Sticky Filter/Sort Bar** | Glass bar sticky under nav; blur does **not** cascade into the grid below | Collection pages |
| **Mega-Menu Panel** | Wide glass dropdown, bento category tiles, independent width from dock | Nav (desktop) |
| **Mobile Nav Drawer** | Full-height glass panel, slide-in | Nav (mobile) |
| **Cart Drawer** | Glass side panel, compact line-item cards, subtotal, upsell slot, `{radius.xl}` | All pages |
| **Newsletter/Offer Card** | Glass card or modal, replaces the current unstyled popup | Homepage, exit-intent (optional) |
| **Seasonal Campaign Cell** | Schema-driven bento cell — swap art/copy/link without a code deploy | Homepage, collection landing |

---

## 10. Breakpoints & responsive

| Name | Width | Key changes |
|---|---|---|
| Small phone | ≤ 419px | Single-column; nav docked = full-width bar; hero drops to `{type.display-md}` (32px); section padding → 40px |
| Phone | 420–640px | Single-column stack; product renders scale to 80% of tile; catalog grid = 1–2 col |
| Large phone | 641–735px | Section padding tightens 80px → 48px; fine-print wraps |
| Tablet portrait | 736–833px | Nav collapses to hamburger + glass drawer; bento → single/2-col stack |
| Tablet landscape | 834–1023px | Nav expands; bento 12→8 col; catalog 3-col |
| Small desktop | 1024–1068px | Full layout; hero `{type.display-lg}`; catalog 3–4 col |
| Desktop | 1069–1440px | Full bento; catalog 4–5 col; content max 1440px |
| Wide desktop | ≥ 1441px | Content locks at 1440px; margins absorb extra width |

**Structural breakpoints that matter for build:** 1440 (content lock) · 1068 (desktop shrink) · 833 (nav → hamburger; bento collapse) · 640 (phone single-column) · 419 (small-phone type drop).

**Image behavior:** responsive `srcset`/`sizes` with breakpoint-matched crops; hero art direction may switch to a taller crop on mobile; product renders keep 1:1 / 4:3 aspect, only scale changes; lazy-load by default, hero loads eagerly; CDN-optimized WebP.

---

## 11. Touch targets & interaction states

### 11.1 Touch targets

- **Minimum 44 × 44px** for all primary interactive elements. Primary CTA ~44 × 120px (pill radius makes the hit area generous). Icon controls exactly 44 × 44px.
- Nav dock utility icons may sit slightly tighter on desktop (precision pointer actions); the mobile hamburger + drawer replaces them ≤ 833px.

### 11.2 Interaction states (system-wide)

| State | Treatment |
|---|---|
| **Hover — button** | Gold CTA: subtle brightness lift + `{shadow.card-hover}`. Ghost/text: Gold underline or `{color.gold-15}` wash. |
| **Hover — product card** | Gold border (`{color.gold-40}`) fades in + card lifts with `{shadow.card-hover}`; quick-add reveals. |
| **Active / press** | `transform: scale(0.97)` on every button — the system-wide micro-interaction. |
| **Focus (keyboard)** | 2px Gold focus ring, 2px offset (`outline: 2px solid {color.gold}; outline-offset: 2px`) — visible on every interactive element. |
| **Disabled / sold-out** | Mist text/border, reduced opacity, labeled state (never color-only). |
| **Loading** | Skeleton in `{color.mist-25}` on the component's own radius; no layout shift. |

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
  --color-ink:        #1C1F24;
  --color-slate:      #3A4452;
  --color-mist:       #9AA3AD;
  --color-parchment:  #F2EEE7;
  --color-gold:       #C79C5A;

  /* Color — derived */
  --color-ink-90:        rgba(28,31,36,0.90);
  --color-ink-70:        rgba(28,31,36,0.70);
  --color-ink-35:        rgba(28,31,36,0.35);
  --color-parchment-65:  rgba(242,238,231,0.65);
  --color-parchment-12:  rgba(242,238,231,0.12);
  --color-parchment-08:  rgba(242,238,231,0.08);
  --color-mist-25:       rgba(154,163,173,0.25);
  --color-mist-40:       rgba(154,163,173,0.40);
  --color-gold-15:       rgba(199,156,90,0.15);
  --color-gold-40:       rgba(199,156,90,0.40);

  /* Gradients */
  --gradient-surface:    linear-gradient(160deg, var(--color-ink) 0%, var(--color-slate) 100%);
  --gradient-hero-scrim: linear-gradient(180deg, var(--color-ink-70) 0%, transparent 40%, var(--color-ink-70) 100%);
  --gradient-card-sheen: linear-gradient(135deg, var(--color-parchment-08) 0%, transparent 60%);

  /* Typography — families */
  --font-display: "Fraunces", "Canela", Georgia, "Times New Roman", serif;
  --font-body:    "Inter", "General Sans", system-ui, -apple-system, sans-serif;

  /* Spacing (8px base) */
  --space-xxs: 4px;  --space-xs: 8px;  --space-sm: 12px; --space-md: 16px;
  --space-lg: 24px;  --space-xl: 32px; --space-xxl: 48px; --space-section: 80px;

  /* Radius */
  --radius-none: 0;    --radius-xs: 6px;  --radius-sm: 10px; --radius-md: 14px;
  --radius-lg: 20px;   --radius-xl: 28px; --radius-pill: 999px; --radius-full: 50%;

  /* Elevation */
  --shadow-glass:      0 8px 32px var(--color-ink-35);
  --shadow-dock:       0 8px 24px rgba(28,31,36,0.25);
  --shadow-product:    0 5px 30px rgba(28,31,36,0.22);
  --shadow-card-hover: 0 4px 20px rgba(28,31,36,0.18);
  --border-hairline:   1px solid var(--color-mist-25);

  /* Glass / blur */
  --blur-panel: 14px;
  --blur-dock:  18px;

  /* Motion */
  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
  --dur-dock:      300ms;
  --dur-hover:     180ms;
  --dur-press:     120ms;
  --dur-drawer:    300ms;
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
