# Sorella — Shopify Theme

Glassmorphism × Bento × Organic Blob Field. Built to the authoritative specs in
`Project Planning/ArtDirection.md`, `Sorella Design System.md`, `Full Redesign Report.md`,
and `Page Templates Report.md`, using the schema-driven, zero-hardcoded-values discipline
from `Skills/MultiAgentsWorkFlow.md`.

OS 2.0 theme. Every section is `sorella-`-prefixed; all merchant content is a schema
setting, block, or metafield — no hardcoded copy, colours, or counts.

## Structure

```
assets/     base.css (design tokens §17 + utilities), components.css, chrome.css, theme.js
config/     settings_schema.json, settings_data.json
layout/     theme.liquid, password.liquid
locales/    en.default.json (all UI strings)
sections/   27 sorella-* sections + header-group.json / footer-group.json
snippets/   24 sorella-* component atoms
templates/  index, collection, product, cart, search, 404, page, page.about,
            page.contact, page.faq, page.policy, blog, article, list-collections,
            gift_card, password, and customers/* (JSON where OS 2.0; liquid for
            account/gift-card pages) — the full Shopify required-template set.
blocks/     reserved for OS 2.0 theme blocks
```

The theme includes every template Shopify's Theme Check (`MissingTemplate`) requires,
so it uploads and validates as a complete theme.

## Design tokens
All tokens live once in `assets/base.css :root` (colour, type scale, spacing, radius,
elevation, blur, motion). Sections reference them via `var(--token)` and the utility
classes (`t-display-lg`, `surface-ink`, `glass-panel`, `bento`, `catalog-grid`, `btn`, …).
Never introduce raw hex/px for a token value.

## Merchant setup checklist

### 1. Navigation menus (Online Store → Navigation)
- **main-menu** — used by the header. Top-level items with sub-items become mega-menus.
  Suggested: For Her, For Him, Unisex, Perfume Oil, Bundles (+ children).
- **footer** — used by footer menu columns.

### 2. Metafields (Settings → Custom data → Products)
Namespace **`sorella`**. These power PDP content with zero hardcoding:
| Key | Type | Used by |
|---|---|---|
| `inspired_by` | Single line text | "Inspired by [X]" tag on card + PDP |
| `notes_top` | Single line text (comma list) | Notes pyramid — top tier |
| `notes_heart` | Single line text (comma list) | Notes pyramid — heart tier |
| `notes_base` | Single line text (comma list) | Notes pyramid — base tier |
| `rating` | Decimal | PDP star rating |
| `rating_count` | Integer | PDP rating count |

Sections that read these render *nothing* when the metafield is blank, so the theme
is safe before data is entered.

### 3. Pages & template assignment (Online Store → Pages)
- **About Us** → template `page.about`
- **Contact** → template `page.contact`
- **FAQ** → template `page.faq`  (create this page)
- **Policy pages** (or shop policies recreated as pages) → template `page.policy`
- Any other page → default `page`

### 4. Theme settings (Customize → Theme settings)
Logo (full + compact mark), favicon, social URLs (pre-filled), free-5ml threshold
(default 1,100 LE), card image ratio, cart drawer toggle, text direction (LTR/RTL-ready).

## Signature interaction — Adaptive Nav Dock
`sections/sorella-header.liquid` + `assets/chrome.css` + `assets/theme.js`.
Transparent full-width over the homepage hero → condenses into a centered glass pill on
scroll (IntersectionObserver on the hero sentinel, height-independent). Hides on
scroll-down, reveals on scroll-up. On templates with no hero it starts docked. Honors
`prefers-reduced-motion`. QA it with a scroll-triggered pass, not a static screenshot.

## Performance / a11y guardrails honored
- Blur budget: nav dock, hero, brand-story, cart drawer, mega-menu, PDP price card only;
  catalog grid stays solid. `@supports` fallback → solid Ink (force-test with `.force-no-blur`).
- Blobs: ≤2 visible, `aria-hidden`, `pointer-events:none`, static on reduced-motion,
  authored with logical `inset-inline` for RTL.
- Gold never used as small body text; sold-out uses a labelled Mist pill (never colour-only);
  Gold focus ring everywhere; 44px min touch targets.

## Phase 4 (now scaffolded for structural completeness)
Built as valid, styled templates so the theme is a complete Shopify project — enable/populate
as needed: **Blog** (`blog` + `article`), **Account** (`customers/*`), **Gift card**,
**Password/coming-soon**, **Collections index** (`list-collections`). Blog/account pages are
functional but depend on the merchant publishing content / enabling customer accounts.

## QA status
JSON templates + all `{% schema %}` blocks parse; every rendered snippet and every
templated section type resolves; no raw hex in markup or section stylesheets;
`sorella-` naming consistent across all 23 sections + 24 snippets.
```
