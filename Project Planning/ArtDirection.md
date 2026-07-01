# Sorella — Art Direction

**Direction:** Glassmorphism × Bento Grid × Organic Blob Field
**Prepared for:** Ahmed Aboelsnoon · **Owner:** Sorella (sorella-eg.com) · **Platform:** Shopify
**Status:** Phase 0 foundation (authoritative) — supersedes `DesignSystem.md` v1 (Apple-derived) and folds in the Full Redesign Report in full.

> This is the single source of truth for how Sorella looks, moves, and is built. Three systems are fused on purpose, each doing a job the others can't:
> - **Bento** gives the page *structure* — hierarchy, rhythm, a place for every piece of content.
> - **Glass** gives structure *depth* — a small number of panels read as floating above the page.
> - **Blobs** give depth *atmosphere* — the soft, warm, organic backdrop that the glass has something to refract in the first place. Without blobs, the glass panels are just blurry boxes; without bento, the blobs have no grid to float over; without glass, the blobs are just decoration.
>
> Nothing here is decorative for its own sake. Every glass panel, every blob, every span in the grid is there to carry hierarchy or content. If a design instinct is "this would look cool," check it against the rules below before shipping it.

---

## 0. How to use this document

- **Design in tokens, not values.** Reference `{color.gold}`, `{type.display-lg}`, `{space.lg}`, `{blob.a}` — never raw hex/px in component code. §17 is the only place values live.
- **Every surface is one of four things:** a solid Ink/Parchment section, a bento cell, a glass panel, or a blob. Know which one you're building before you style it — each has its own rulebook (§5, §7, §8).
- **Glass is a budget.** Blur is expensive and, overused, reads as noise. §8.4 lists exactly where it's allowed.
- **Blobs are a budget too.** They are the *environment*, not confetti. §7.5 caps how many are visible at once.
- **Gold is the only accent.** One accent, used with restraint, is what makes a luxury palette feel intentional (§2.4).

---

## 1. Brand foundation & principles

Sorella is a refined Egyptian fragrance house. The design language should feel **editorial, quiet, and expensive** — a printed lookbook that happens to float, not a SaaS dashboard. Four ideas govern every decision:

1. **Atmosphere over ornament.** Depth comes from three sources working together: photography, a single layer of frosted glass, and soft organic blob light behind it. Never gradients-as-decoration, drop-shadow stacks, or a second accent color.
2. **Editorial pace.** Body copy runs at 17px with generous leading; headlines are set in a high-contrast serif with tight tracking. The page should feel *read*, not *scanned* — even with organic shapes drifting behind it, the reading experience stays calm.
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

| Token | Hex | Name |
|---|---|---|
| `{color.ink}` | `#1C1F24` | Ink (charcoal) |
| `{color.slate}` | `#3A4452` | Slate |
| `{color.mist}` | `#9AA3AD` | Mist |
| `{color.parchment}` | `#F2EEE7` | Parchment |
| `{color.gold}` | `#C79C5A` | Gold |

Sorella's palette is deliberately **muted luxury**, not the electric-blue/magenta backdrop glassmorphism usually leans on. The "vibrant backdrop the glass bleeds through" requirement (see brief) is met here by **warm, low-saturation blob blooms in gold, slate, and a rare rose-amber** — never by importing a foreign neon accent. This is a considered adaptation, not a shortcut: a fragrance house's glass should refract candlelight, not a nightclub.

### 2.2 Role mapping

| Role | Token | Notes |
|---|---|---|
| Page background (dark mode) | `{color.ink}` | Default site surface |
| Secondary/layered background, gradient stop | `{color.slate}` | Section fills, glass gradient base, blob fill |
| Text on light surfaces / dark section fills | `{color.ink}` | Primary reading color on Parchment |
| Text on dark surfaces / light glass | `{color.parchment}` | Primary reading color on Ink |
| Secondary text, borders, dividers, disabled/sold-out | `{color.mist}` | Never a primary text color for long copy |
| Accent — CTA fill, price, active state, icon accents, tag borders, cart badge | `{color.gold}` | Accent only; see §2.4 |

### 2.3 Derived tints & alphas

| Token | Value | Use |
|---|---|---|
| `{color.ink-90}` | `rgba(28,31,36,0.90)` | Glass solid fallback; heavy scrim |
| `{color.ink-70}` | `rgba(28,31,36,0.70)` | Hero scrim over photography/blobs (text legibility) |
| `{color.ink-35}` | `rgba(28,31,36,0.35)` | Glass panel shadow color |
| `{color.parchment-65}` | `rgba(242,238,231,0.65)` | Nav dock glass fill (scrolled) |
| `{color.parchment-12}` | `rgba(242,238,231,0.12)` | Glass panel fill on dark backgrounds |
| `{color.parchment-08}` | `rgba(242,238,231,0.08)` | Subtle glass fill / hairline highlight |
| `{color.mist-25}` | `rgba(154,163,173,0.25)` | Glass & hairline borders |
| `{color.mist-40}` | `rgba(154,163,173,0.40)` | Dividers on light surfaces |
| `{color.gold-15}` | `rgba(199,156,90,0.15)` | Gold hover wash, tag fill |
| `{color.gold-40}` | `rgba(199,156,90,0.40)` | Gold hover border (product card) |
| `{color.black-pure}` | `#000000` | Reserved; not used as a surface |

### 2.4 Gold usage rule

- ✅ **Gold as a solid CTA button fill** with **Ink text** — allowed. Button labels are large/bold and pass AA (§2.6).
- ✅ **Gold as border, price text, active-state indicator, icon, small pill border** — allowed.
- ✅ **Gold as a thin underline / focus ring** — allowed.
- ✅ **Gold as one soft blob bloom**, always at low opacity behind glass, never as a hard-edged fill (§7.4).
- ❌ **Gold as a large decorative section/background fill** — not allowed.
- ❌ **Gold as small body text on Parchment** — not allowed (contrast failure).

### 2.5 Gradients, scrims & blob fills

Gradients are **functional only** — never decorative wallpaper on their own. In this system they serve three jobs: solid-section backdrops, hero legibility scrims, and blob fills (the blob *is* the gradient's canvas).

| Token | Value | Use |
|---|---|---|
| `{gradient.surface}` | `linear-gradient(160deg, {color.ink} 0%, {color.slate} 100%)` | Dark section backdrop behind glass when no photo is present |
| `{gradient.hero-scrim}` | `linear-gradient(180deg, {color.ink-70} 0%, transparent 40%, {color.ink-70} 100%)` | Over hero photography/blobs so nav + headline stay legible top and bottom |
| `{gradient.card-sheen}` | `linear-gradient(135deg, {color.parchment-08} 0%, transparent 60%)` | Optional 1-pass glass sheen highlight (top-left) |
| `{gradient.blob-gold}` | `radial-gradient(circle at 30% 30%, rgba(199,156,90,0.55) 0%, rgba(199,156,90,0.05) 70%)` | Primary blob bloom — hero, brand story |
| `{gradient.blob-slate}` | `radial-gradient(circle at 65% 40%, rgba(58,68,82,0.65) 0%, rgba(58,68,82,0.05) 70%)` | Secondary/cooling blob, balances gold warmth |
| `{gradient.blob-rose}` | `radial-gradient(circle at 40% 60%, rgba(199,140,120,0.35) 0%, rgba(199,140,120,0.04) 70%)` | Rare third bloom — seasonal/campaign moments only |

### 2.6 Contrast-verified text pairings

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
| `{color.parchment}` | blob at ≤55% opacity + `{gradient.hero-scrim}` | AA (verify per frame) | Headlines over blob fields — scrim is mandatory, not optional |

**Rules that follow:** Gold is never small body text. Mist is never fine print. Any text sitting over a blob (with or without glass) always carries either the hero scrim or a glass tint layer underneath it — a bare blob is never a text background (§13).

---

## 3. Typography

### 3.1 Type families

| Role | Family | Stack | Notes |
|---|---|---|---|
| **Display / Headings** | **Fraunces** (variable) | `"Fraunces", "Canela", Georgia, "Times New Roman", serif` | High optical contrast; optical-size + soft/wonky axes. Premium alternative: **Canela** or **Ogg**. |
| **Body / UI** | **Inter** (variable) | `"Inter", "General Sans", system-ui, -apple-system, sans-serif` | Neutral grotesk; tall x-height reads well at 17px and inside glass/over blobs. Alternative: **General Sans**. |
| **Numeric (price/spec)** | Inter, tabular | `font-variant-numeric: tabular-nums` | Prices, quantities, spec sheets align in columns. |

**OpenType:** enable `tabular-nums` on prices and cart math. On Fraunces, use the optical-size axis so large display sizes get the high-contrast cut and smaller sizes stay sturdy.

### 3.2 Type scale

| Token | Family | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|---|
| `{type.display-hero}` | Serif | 60px | 400 | 1.05 | -0.5px | Homepage hero headline |
| `{type.display-lg}` | Serif | 44px | 400 | 1.08 | -0.4px | Section heads, brand-story titles |
| `{type.display-md}` | Serif | 32px | 500 | 1.15 | -0.3px | Product name (PDP), bento tile titles |
| `{type.headline}` | Serif | 24px | 500 | 1.2 | -0.2px | Card headlines, subsection heads |
| `{type.title}` | Sans | 21px | 600 | 1.24 | -0.15px | Sub-nav category, tagline, prominent UI titles |
| `{type.lead}` | Sans | 20px | 300 | 1.5 | 0 | Airy lead paragraphs (rare light weight) |
| `{type.body-lg}` | Sans | 18px | 400 | 1.5 | -0.2px | Emphasized paragraph / intro copy |
| `{type.body}` | Sans | 17px | 400 | 1.47 | -0.2px | **Default paragraph** |
| `{type.body-strong}` | Sans | 17px | 600 | 1.35 | -0.2px | Inline strong emphasis |
| `{type.body-sm}` | Sans | 15px | 400 | 1.45 | -0.1px | Dense copy, secondary descriptions |
| `{type.caption}` | Sans | 14px | 400 | 1.43 | -0.1px | Captions, button text, filter labels |
| `{type.caption-strong}` | Sans | 14px | 600 | 1.3 | -0.1px | Emphasized captions, active filter |
| `{type.price}` | Sans (tabular) | 17px | 600 | 1.2 | 0 | Product price (Gold on light / Parchment on dark) |
| `{type.eyebrow}` | Sans | 12px | 600 | 1.0 | +1.2px (uppercase) | Gold overline above headlines |
| `{type.nav-link}` | Sans | 15px | 500 | 1.0 | -0.1px | Nav dock links |
| `{type.fine-print}` | Sans | 12px | 400 | 1.4 | 0 | Footer body, fine print |
| `{type.micro-legal}` | Sans | 10px | 400 | 1.3 | 0 | Micro legal disclaimers |

### 3.3 Weight ladder

- **Serif (display):** 300 (light, rare/atmospheric) · 400 (regular, default display) · 500 (semibold display).
- **Sans (body/UI):** 300 (rare lead) · 400 (body) · 500 (nav/labels) · 600 (strong/price/buttons) · 700 (reserved, sparing).

### 3.4 Principles

- **Negative tracking at display sizes.** Never applied below 14px.
- **Body at 17px, leading 1.47.** Don't tighten below 1.47.
- **Serif is display-only.**
- **Gold eyebrows** introduce sections; the tracked uppercase device is the signature luxury cue.
- **Headlines over blob fields** always sit on the highest-contrast part of the composition — position the blob's densest color mass *behind* the negative space beside the headline, not directly behind the letterforms, and back it with `{gradient.hero-scrim}` regardless.

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

**Button padding:** 12–14px vertical, 20–28px horizontal. **Card padding:** `{space.lg}` (24px). **Section padding:** `{space.section}` (80px desktop), tightening to 48px on large-phone and below.

### 4.2 Grid & container

| Context | Max width | Columns | Gutter |
|---|---|---|---|
| Text-heavy (brand story, about) | ~820px | 1 (centered) | — |
| Bento (homepage, campaigns) | 1280px | 12-col base, variable spans | `{space.xl}` (32px) |
| Catalog grid (collection) | 1440px | `repeat(auto-fill, minmax(240px, 1fr))` | `{space.lg}` (24px) |
| Full-bleed (hero, brand-story bg, blob canvas) | 100vw | — | 0 |
| Wide desktop lock | Content locks at **1440px**; margins absorb extra width | | |

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
| `{radius.blob-a}` | `62% 38% 55% 45% / 45% 55% 45% 55%` | Blob shape A — the "primary bloom" silhouette |
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
      <stop offset="0%" stop-color="#C79C5A" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#C79C5A" stop-opacity="0.02"/>
    </radialGradient>
    <radialGradient id="blobSlate" cx="65%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#3A4452" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#3A4452" stop-opacity="0.02"/>
    </radialGradient>
  </defs>
  <ellipse cx="260" cy="240" rx="320" ry="280" fill="url(#blobGold)"/>
  <ellipse cx="520" cy="380" rx="300" ry="260" fill="url(#blobSlate)"/>
</svg>
```

### 7.3 Placement rules — where blobs are allowed

Blobs are permitted **only** in these anchor zones, and at the stated maximum per zone:

| Zone | Max concurrent blobs | Notes |
|---|---|---|
| Homepage hero (behind Glass Hero Card) | 2 (one gold, one slate) | The system's signature moment — see §9 for full spec |
| Brand-story panels | 1 per panel | Alternates gold/slate/rose across the four panels so no two in a row match |
| Seasonal/campaign bento cell | 1 | Swaps with the campaign; part of the schema-driven content (§10) |
| Mega-menu panel background | 1, low opacity (≤20%) | Must not compete with category tile photography |
| Newsletter/offer card | 1, small, corner-anchored | Never centered behind the form fields |
| Cart drawer | 0 | Cart is a utility surface — solid glass only, no atmosphere |
| Product catalog grid | 0 | Solid cards only — performance budget (§8.4) is spent elsewhere |
| Product page (PDP) | 1, behind the price/notes glass card only | Never behind the product photography itself |
| Footer | 0 | Dense, utilitarian, no atmosphere |

**Rule of thumb:** if a zone doesn't already have a glass panel in it, it almost certainly shouldn't have a blob either — the two layers are meant to appear together.

### 7.4 Blob-as-backdrop spec (the standard pattern)

This is the pairing used in the hero, brand-story, and campaign cell — a blob field sits in a `position: absolute` layer behind a glass panel, with the panel's own blur doing double duty by softening the blob edges further.

```css
.blob-scene {
  position: relative;
  overflow: hidden;              /* blobs never bleed past their section */
  background: var(--gradient-surface);
}

.blob-scene__field {
  position: absolute;
  inset: 0;
  z-index: 0;
  transform: translateZ(0);      /* GPU layer hint */
}

.blob-scene__glass-card {
  position: relative;
  z-index: 1;                    /* glass panel sits above the blob field */
  /* .glass-panel spec, §8.4 */
}
```

- The blob field is a **separate stacking layer** from the glass panel — never paint a blob directly as a glass panel's own `background`, or the two effects fight over the same blur budget.
- Blob edges get a light `filter: blur(2–4px)` of their own — soft-edged, not razor-cut — but this is a cheap small-radius blur, not the 14–18px `backdrop-filter` budget spent on glass (§8.4). Keep the two blur systems mentally and technically separate.
- On the hero specifically: the gold blob sits upper-left (rhymes with `{gradient.card-sheen}`'s light source), the slate blob sits lower-right, overlapping slightly at the panel's edge so the composition feels like one continuous light source rather than two unrelated shapes.

### 7.5 Blob-as-card (occasional, high-impact use)

Rarely — for a seasonal campaign tile or a single standout trust card — the blob shape itself can *be* the card, not just its backdrop. When this pattern is used:

- The blob card sits **above** its neighbors visually (a slight negative-margin overlap into the adjacent bento cell is allowed here, and only here, per the "blobs bleed into one another" technique) — this is the one place in the system where bento's strict grid gutters are intentionally broken, and it should be used no more than once per page.
- Content inside a blob card stays in the shape's **center mass** (the roundest, most stable area) — icon/number up top, one line of `{type.caption-strong}` below. Never run body-length copy inside a blob card; the irregular edges make wrapped text feel cramped.
- Shadow follows the blob's curve: use a soft, diffused `box-shadow` (borrow `{shadow.glass}`'s color/opacity, not its spread) rather than a rectangular drop shadow, so the shadow doesn't visually "square off" the organic shape.
- On hover: `transform: scale(1.03)` with the shape unchanged — never squash/stretch the blob on interaction, only scale it uniformly.

### 7.6 Motion

- **Ambient drift (default):** background blobs may slowly morph their `border-radius` values (e.g. `62% 38% 55% 45%` → `48% 52% 40% 60%` and back) on an 8–14s ease-in-out loop. This is the *only* place continuous animation runs on the page — it should read as barely-perceptible, like a candle flame's edge, never as an obvious "the blob is pulsing" effect.
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

| Token | Value | Use |
|---|---|---|
| `{shadow.glass}` | `0 8px 32px {color.ink-35}` | Glass panels, hero card, brand-story cards |
| `{shadow.dock}` | `0 8px 24px rgba(28,31,36,0.25)` | Scrolled nav dock |
| `{shadow.product}` | `0 5px 30px rgba(28,31,36,0.22)` | Product renders on a surface |
| `{shadow.card-hover}` | `0 4px 20px rgba(28,31,36,0.18)` | Solid product card lift on hover |
| `{shadow.blob-card}` | `0 12px 40px rgba(28,31,36,0.28)` | Blob-as-card only (§7.5) — softer spread, follows the curve |
| `{border.hairline}` | `1px solid {color.mist-25}` | Glass borders, sub-nav separator |

### 8.4 Glass panel spec & blur budget

Blur is a **budget**. It is allowed only on: **nav dock · hero card · brand-story panels · cart drawer · mega-menu**. The product catalog grid stays **solid** — for performance across 32+ SKU pages (heavy mid-range Android base in Egypt) and to avoid visual noise. Use **10–18px** blur, never 30px+. On mobile, start as low as **6px** if frame drops appear in testing (see §8.5).

```css
/* Standard glass panel — dark-mode default (light tint over Ink), sits above a blob field per §8.2 */
.glass-panel {
  position: relative;
  z-index: 1;
  background: rgba(242, 238, 231, 0.12);          /* {color.parchment-12} */
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(154, 163, 173, 0.25);    /* {color.mist-25} */
  border-radius: 20px;                            /* {radius.lg} */
  box-shadow: 0 8px 32px rgba(28, 31, 36, 0.35);  /* {shadow.glass} */
  transform: translateZ(0);                       /* GPU layer hint */
}

/* Progressive-enhancement fallback: no blur support → solid Ink, no fog */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass-panel { background: rgba(28, 31, 36, 0.90); }  /* {color.ink-90} */
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
  position: fixed; top: 12px; left: 50%; transform: translateX(-50%) translateZ(0);
  max-width: 920px; width: calc(100% - 32px);
  height: 60px; border-radius: 999px;              /* {radius.pill} */
  background: rgba(242, 238, 231, 0.65);           /* {color.parchment-65} */
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(154, 163, 173, 0.25);     /* {color.mist-25} */
  box-shadow: 0 8px 24px rgba(28, 31, 36, 0.25);   /* {shadow.dock} */
  color: #1C1F24;
  transition: background 300ms ease-out, backdrop-filter 300ms ease-out,
              max-width 300ms ease-out, height 300ms ease-out,
              top 300ms ease-out, border-radius 300ms ease-out, color 300ms ease-out;
}

.nav-dock--top {                                    /* State A */
  top: 0; max-width: 100%; width: 100%; height: 88px;
  border-radius: 0; background: transparent;
  backdrop-filter: none; -webkit-backdrop-filter: none;
  border-color: transparent; box-shadow: none;
  color: #F2EEE7;
  text-shadow: 0 1px 3px rgba(28, 31, 36, 0.70);
}
```

- **Transition:** animate `background`, `backdrop-filter`, `width/max-width`, `height`, `top`, `border-radius`, and `color` together on one 250–350ms ease-out — never an instant snap.
- **Color flip** (Parchment → Ink) times to the background fill's midpoint so there's no moment of low contrast.

### 9.3 Structure & content

| Zone | Content |
|---|---|
| Left | Logo — compact icon mark in the docked state; full wordmark allowed in the transparent top state if room |
| Center | Primary links: **For Her / For Him / Unisex / Perfume Oil / Bundles** — collapse to a **"Shop" mega-menu trigger** if the dock can't fit all five comfortably |
| Right | Search icon · account icon · cart icon (with item-count **badge in Gold**) |

The mega-menu drops as its own wide/full-width glass panel (independent of the dock's compact footprint), with a single low-opacity blob behind its bento category tiles (§7.3).

### 9.4 Scroll behavior

- Docked nav **stays visible on scroll-up**, **hides on scroll-down** past a threshold. *(Confirm with client — §18.)*

### 9.5 Mobile

- Same two-state logic, but the docked state becomes a **full-width** glass bar. A persistent nav element is the one justified exception to limiting mobile blur (and the one nav-adjacent zone where a blob is never placed, keeping mobile compositing cost low).
- Hamburger opens a **full-height glass drawer** (§10), not a dropdown.

### 9.6 States to design & QA

Transparent over light photo · transparent over dark/gradient/blob backdrop · docked glass · scroll-up vs scroll-down · cart drawer open with nav visible (test z-index + blur layering together, since both use glass).

---

## 10. Component library

Build each once as a schema-driven Shopify section/block (`sorella-` prefix, §16) and reuse — never re-implement per page.

| Component | Spec summary | Blob? | Used on |
|---|---|---|---|
| **Adaptive Nav Dock** | §9 — transparent → glass dock | No | All pages |
| **Glass Hero Card** | Large asymmetric glass panel over photo/video bg + blob field, `{gradient.hero-scrim}`, `{type.display-hero}` headline + Gold CTA, `{radius.xl}` | Yes (2, §7.3) | Homepage, campaigns, collection landing (optional) |
| **Bento Cell (Category)** | Photographic tile, single CTA, variable span (1×1…2×2), `{radius.lg}`, gold hover border | No | Homepage collections, mega-menu |
| **Bento Cell (Trust/Stat)** | Small glass card, icon + short claim, `{radius.lg}` | No (default) | Homepage hero trio, brand story |
| **Blob Feature Card** | Organic-silhouette card per §7.5, center-mass content only, negative-margin overlap allowed | Yes (is the blob) | One per page max — seasonal or hero trust moment |
| **Product Card (Catalog)** | **Solid** Parchment/Ink card (no blur, no blob), image, name `{type.headline}`, price `{type.price}` in Gold, quick-add; gold hover border | No | Collection grids |
| **Product Card (Sold Out)** | Same shell at ~55% opacity, desaturated image, Mist "Sold out" pill | No | Collection grids |
| **Product Card (Quick-Add SKU)** | Compact variant for impulse items | No | Musks/testers, bundle builder, cart upsell |
| **Notes Pyramid Widget** | 3-tier mini-diagram or stacked mini-cards (top/heart/base) | No | Product page |
| **"Inspired By" Tag** | Small pill, `{color.gold-40}` border, `{color.gold-15}` fill, `{radius.pill}` | No | Product card, product page |
| **Testimonial Glass Card** | Structured review — name, verified badge, date, quote, star rating in Gold, `{radius.lg}` | No | Homepage reviews, PDP reviews tab |
| **Brand-Story Block** | Full-bleed alternating glass panel over photography + single blob, Parchment text, `{type.display-lg}` | Yes (1, §7.3) | About page, homepage (single instance) |
| **Sticky Filter/Sort Bar** | Glass bar sticky under nav; no blob, blur does **not** cascade into the grid below | No | Collection pages |
| **Mega-Menu Panel** | Wide glass dropdown, bento category tiles, low-opacity blob behind | Yes (1, ≤20% opacity) | Nav (desktop) |
| **Mobile Nav Drawer** | Full-height glass panel, slide-in | No | Nav (mobile) |
| **Cart Drawer** | Glass side panel, compact line-item cards, subtotal, upsell slot, `{radius.xl}` | No (§7.3) | All pages |
| **Newsletter/Offer Card** | Glass card or modal, corner-anchored blob | Yes (1, small) | Homepage, exit-intent (optional) |
| **Seasonal Campaign Cell** | Schema-driven bento cell, art/copy/link swap without deploy | Yes (1) | Homepage, collection landing |

---

## 11. Breakpoints & responsive

| Name | Width | Key changes |
|---|---|---|
| Small phone | ≤ 419px | Single-column; nav docked = full-width bar; hero drops to `{type.display-md}` (32px); section padding → 40px; blobs render as static images |
| Phone | 420–640px | Single-column stack; product renders scale to 80% of tile; catalog grid = 1–2 col; blob field scales via `clamp()`, no distortion |
| Large phone | 641–735px | Section padding tightens 80px → 48px; fine-print wraps |
| Tablet portrait | 736–833px | Nav collapses to hamburger + glass drawer; bento → single/2-col stack |
| Tablet landscape | 834–1023px | Nav expands; bento 12→8 col; catalog 3-col |
| Small desktop | 1024–1068px | Full layout; hero `{type.display-lg}`; catalog 3–4 col |
| Desktop | 1069–1440px | Full bento; catalog 4–5 col; content max 1440px |
| Wide desktop | ≥ 1441px | Content locks at 1440px; margins absorb extra width |

**Structural breakpoints that matter for build:** 1440 (content lock) · 1068 (desktop shrink) · 833 (nav → hamburger; bento collapse) · 640 (phone single-column) · 419 (small-phone type drop, blob → static image swap).

**Blob scaling rule:** blob dimensions are always set with `clamp(min, vw-based-preferred, max)`, never a fixed px value, so the organic silhouette scales proportionally instead of distorting at odd viewport widths (per the blob responsiveness guidance).

**Image behavior:** responsive `srcset`/`sizes` with breakpoint-matched crops; hero art direction may switch to a taller crop on mobile; product renders keep 1:1 / 4:3 aspect; lazy-load by default, hero loads eagerly; CDN-optimized WebP.

---

## 12. Touch targets & interaction states

### 12.1 Touch targets

- **Minimum 44 × 44px** for all primary interactive elements. Primary CTA ~44 × 120px. Icon controls exactly 44 × 44px.
- Nav dock utility icons may sit slightly tighter on desktop; the mobile hamburger + drawer replaces them ≤ 833px.

### 12.2 Interaction states (system-wide)

| State | Treatment |
|---|---|
| **Hover — button** | Gold CTA: subtle brightness lift + `{shadow.card-hover}`. Ghost/text: Gold underline or `{color.gold-15}` wash. |
| **Hover — product card** | Gold border (`{color.gold-40}`) fades in + card lifts with `{shadow.card-hover}`; quick-add reveals. |
| **Hover — blob card** | `transform: scale(1.03)`, shape unchanged, `{shadow.blob-card}` deepens slightly (§7.5). |
| **Active / press** | `transform: scale(0.97)` on every button. |
| **Focus (keyboard)** | 2px Gold focus ring, 2px offset (`outline: 2px solid {color.gold}; outline-offset: 2px`). |
| **Disabled / sold-out** | Mist text/border, reduced opacity, labeled state (never color-only). |
| **Loading** | Skeleton in `{color.mist-25}` on the component's own radius; no layout shift. |

---

## 13. Accessibility guardrails

- **Gold on Parchment fails AA** for body text — Gold is for large text, icons, borders, and solid-fill buttons only (§2.6).
- **Nav transparent state** always carries a text-shadow safety net; verify ≥4.5:1 effective contrast against the lightest and darkest hero frames (photography *and* blob field).
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

  /* Gradients & blob fills */
  --gradient-surface:    linear-gradient(160deg, var(--color-ink) 0%, var(--color-slate) 100%);
  --gradient-hero-scrim: linear-gradient(180deg, var(--color-ink-70) 0%, transparent 40%, var(--color-ink-70) 100%);
  --gradient-card-sheen: linear-gradient(135deg, var(--color-parchment-08) 0%, transparent 60%);
  --gradient-blob-gold:  radial-gradient(circle at 30% 30%, rgba(199,156,90,0.55) 0%, rgba(199,156,90,0.05) 70%);
  --gradient-blob-slate: radial-gradient(circle at 65% 40%, rgba(58,68,82,0.65) 0%, rgba(58,68,82,0.05) 70%);
  --gradient-blob-rose:  radial-gradient(circle at 40% 60%, rgba(199,140,120,0.35) 0%, rgba(199,140,120,0.04) 70%);

  /* Typography — families */
  --font-display: "Fraunces", "Canela", Georgia, "Times New Roman", serif;
  --font-body:    "Inter", "General Sans", system-ui, -apple-system, sans-serif;

  /* Spacing (8px base) */
  --space-xxs: 4px;  --space-xs: 8px;  --space-sm: 12px; --space-md: 16px;
  --space-lg: 24px;  --space-xl: 32px; --space-xxl: 48px; --space-section: 80px;

  /* Radius */
  --radius-none: 0;    --radius-xs: 6px;  --radius-sm: 10px; --radius-md: 14px;
  --radius-lg: 20px;   --radius-xl: 28px; --radius-pill: 999px; --radius-full: 50%;
  --radius-blob-a: 62% 38% 55% 45% / 45% 55% 45% 55%;
  --radius-blob-b: 40% 60% 65% 35% / 55% 40% 60% 45%;

  /* Elevation */
  --shadow-glass:      0 8px 32px var(--color-ink-35);
  --shadow-dock:       0 8px 24px rgba(28,31,36,0.25);
  --shadow-product:    0 5px 30px rgba(28,31,36,0.22);
  --shadow-card-hover: 0 4px 20px rgba(28,31,36,0.18);
  --shadow-blob-card:  0 12px 40px rgba(28,31,36,0.28);
  --border-hairline:   1px solid var(--color-mist-25);

  /* Glass / blur */
  --blur-panel: 14px;
  --blur-dock:  18px;
  --blur-blob-edge: 3px;

  /* Motion */
  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
  --dur-dock:      300ms;
  --dur-hover:     180ms;
  --dur-press:     120ms;
  --dur-drawer:    300ms;
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