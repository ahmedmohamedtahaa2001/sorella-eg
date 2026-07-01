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

| Zone | Content |
|---|---|
| Left | Logo mark (compact icon-only version for the docked state; full wordmark allowed in the transparent top state if there's room) |
| Center | Primary links: **For Her / For Him / Unisex / Perfume Oil / Bundles** — collapse to a "Shop" mega-menu trigger below a set breakpoint if the docked width can't fit all five comfortably |
| Right | Search icon, account icon, cart icon (with item-count badge in Gold) |

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

| Component | Description | Used on |
|---|---|---|
| **Adaptive Nav Dock** | Transparent → glass dock header, per §2 | All pages |
| **Glass Hero Card** | Large asymmetric glass panel over gradient/photo background, headline + CTA | Homepage, collection landing (optional), seasonal campaigns |
| **Bento Cell (Category)** | Photographic tile with a single CTA, variable span (1×1, 1×2, 2×1, 2×2) | Homepage collections grid, mega-menu |
| **Bento Cell (Trust/Stat)** | Small glass card, icon + short claim (e.g. "Free 5ml over 1,100 LE," "Made fresh in Egypt") | Homepage hero trio, brand-story page |
| **Product Card (Catalog)** | Solid parchment/ink card, gold hover border, no blur — image, name, price, quick-add | Collection grids (32+ SKU pages) |
| **Product Card (Sold Out)** | Same shell, ~55% opacity, desaturated image, Mist "Sold out" pill replacing the CTA | Collection grids |
| **Product Card (Quick-Add SKU)** | Compact variant for low-price impulse items (musks, 5ml testers) — smaller footprint, price emphasized | Musks/testers collections, bundle builder |
| **Notes Pyramid Widget** | 3-tier mini-diagram or stacked mini-cards (top/heart/base) | Product page (new) |
| **"Inspired By" Tag** | Small gold-bordered pill under the product name | Product card, product page |
| **Testimonial Glass Card** | Structured review — name, verified badge, date, quote, star rating | Homepage reviews section, product page reviews tab |
| **Brand-Story Block** | Full-bleed alternating glass panel, photographic background, parchment text | About page, homepage (single instance) |
| **Sticky Filter/Sort Bar** | Glass bar, sticky under the nav, no blur cascading into the grid below it | Collection pages |
| **Mega-Menu Panel** | Wide glass dropdown, bento-style category tiles, independent width from the nav dock | Nav |
| **Mobile Nav Drawer** | Full-height glass panel, slide-in | Nav (mobile) |
| **Cart Drawer** | Glass side panel, line items, subtotal, upsell slot | All pages |
| **Newsletter/Offer Card** | Glass card or modal, replaces the current unstyled popup | Homepage, exit-intent (optional) |
| **Seasonal Campaign Cell** | Schema-driven bento cell, swappable art/copy/link without a code deploy | Homepage, collection landing |

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

| Token | Hex | Role |
|---|---|---|
| Base / Ink | `#1C1F24` | Page background, dark section fills, text on light glass |
| Slate | `#3A4452` | Secondary background layer, gradient stop |
| Mist | `#9AA3AD` | Borders, dividers, disabled/sold-out state, secondary text |
| Parchment | `#F2EEE7` | Light glass tint base, text on dark glass |
| Gold | `#C79C5A` | CTAs, price, active nav state, icon accents, "inspired by" tag border — accent only, never a fill background |

### 6.2 Glass Panel Spec

```css
.glass-panel {
  background: rgba(242, 238, 231, 0.10); /* Parchment tint, dark mode default */
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
  transition: background 300ms ease-out, backdrop-filter 300ms ease-out,
              max-width 300ms ease-out, top 300ms ease-out, border-radius 300ms ease-out;
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

| Risk | Mitigation |
|---|---|
| `backdrop-filter` performance on mobile (heavy mid-range Android install base in Egypt) | Limit blur to nav dock, hero, cart drawer, mega-menu, brand-story sections. Product grid stays unblurred. Use 10–18px blur, not 30px+. |
| Nav dock transition jank | Animate `background`, `backdrop-filter`, `max-width`, `top`, `border-radius` together on one timing function; avoid animating `blur` alone, which is the most GPU-expensive property to transition on low-end devices — consider cross-fading a pre-blurred layer if frame drops appear in testing. |
| Text contrast on translucent gold/parchment combos | Per §6.3 — Gold reserved for large text/icons/solid buttons only. |
| RTL/Arabic readiness | Theme is English-only despite an Arabic-speaking customer base (reviews are already in Egyptian Arabic/Arabizi). Decide now whether the rebuild adds `dir="rtl"` support or stays English-UI/Arabic-content — this affects the nav dock's icon mirroring and the whole bento grid's mirroring logic. |
| `@supports` fallback | Confirm target browser list (checkout traffic is mobile-heavy). Safari iOS has full `backdrop-filter` support, but the solid-ink fallback must be tested so no browser ships a flat foggy-gray box. |
| Section/schema architecture | Following the GRO pattern already proven on this account: strict `sorella-` prefixed section/block naming, zero hardcoded copy (schema-driven, so seasonal campaigns swap without a deploy), Playwright MCP visual QA pass per breakpoint before merge — nav dock states specifically need a scroll-triggered QA pass, not just a static screenshot. |

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

*This report builds directly on the initial gap-analysis audit of sorella-eg.com, incorporating the client-specified adaptive nav-dock behavior (transparent at top, glass and narrower on scroll) as the anchor interaction for the rebuild. No theme source code was accessible at time of writing; findings are based on rendered content/markup review, not a code-level audit.*