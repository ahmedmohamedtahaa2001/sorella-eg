---

# Sorella — Reusable Component Audit

**Purpose:** Full inventory of every reusable Shopify snippet/section needed to build the storefront, cross-referenced against the Page Structure (29 templates), Schema v2, Data Audit, and Design System docs. Each component lists **where it's reused** so build priority is obvious — the components with the widest reuse footprint should be built and locked (7–10 CSS vars each, per the Design System's tag-chip/gold/ink-paper rules) before any page template is assembled.

Not included here: page-level layout wrappers (those are templates, not reusable components) or the SEO meta fields (not a visual component).

---

## 1. Global / Site Chrome

*Appears on every single page — build and lock these first.*

| Component | Description | Reused In |
| --- | --- | --- |
| **Announcement bar** | Top-of-site rotating strip (shipping threshold, promo, dupe-transparency USP line) | Every page (global) |
| **Header / Nav** | Logo, primary nav, search trigger, account icon, cart icon w/ count | Every page (global) |
| **Mega menu / nav dropdown** | Category-tabbed dropdown surfacing tag categories (Season, Mood, Occasion, etc.) under Shop | Header, on every page |
| **Footer** | Nav links, newsletter signup, social, legal links | Every page (global) |
| **Breadcrumb** | Ink-paper trail back to parent category | PDP, Tag pages, Collection pages, Bundle detail, Tag Hub |
| **CTA button — primary** (`button-primary`, gold pill) | Add to Bag, Take the Quiz, Checkout, Place Order | Homepage hero, PDP, Quiz, Cart, Checkout, Bundle detail |
| **CTA button — secondary** (`button-secondary`, outline pill) | Retake Quiz, View Details, Save for Later | PDP, Quiz Results, Wishlist, Cart |
| **Toast / inline notification** | "Added to bag," "Saved to wishlist," form errors | Global — PDP, Cart, Wishlist, Checkout, Forms |
| **Modal / overlay** | Quick view, size guide, quiz overlay | Shop grid, PDP, Quiz |
| **Newsletter / email capture block** | Signup form, often quiz-linked | Homepage, Footer, Quiz Results |

---

## 2. Tag System (the design system's core reusable atom)

| Component | Description | Reused In |
| --- | --- | --- |
| **Tag chip** | The single component allowed to carry color — 12% tint + full-hue dot, keyed 1:1 to `CANONICAL_TAGS` | Product card, PDP (mood tags, olfactory journey, filters), Filter sidebar, Quiz answer buttons, Tag Hub, Individual tag pages (header chip), Comparison table (shared ingredients) |
| **Mood-tag ingredient chip** | Variant of tag chip used inside note lists (ingredient + mood pairing) | Olfactory Journey block, PDP ingredient table |
| **Tag Hub category tabs** | Tabbed switcher between Season/Mood/Occasion/etc. | Tag Hub page |

---

## 3. Product Discovery & Browse

| Component | Description | Reused In |
| --- | --- | --- |
| **Product card** | Hero image, name, family, price, up to 3 tag chips | Shop, Collections, Individual tag pages, Search results, Homepage (Bestsellers carousel, Dupe spotlight), PDP ("You May Also Like"), Wishlist, Quiz Results, Bundle detail (contents) |
| **Product grid / carousel container** | Responsive 4→2→1 grid or horizontal-scroll carousel wrapper | Shop, Collections, Tag pages, Homepage sections, PDP related products, Bundle index |
| **Filter sidebar** | Multi-facet filters (Season, Time of Day, Occasion, Mood, Family, Gender, Concentration, Sillage, Price) | Shop, Individual tag pages, Search results |
| **Sort dropdown** | Bestselling / Price / Newest | Shop, Tag pages, Collections, Search results |
| **Pagination / load more** | Page controls or infinite scroll trigger | Shop, Tag pages, Collections, Search results |
| **Stock status badge** | Uses semantic colors (In Stock/Low/Sold Out/etc.), not tag palette | Product card, PDP, Cart line item |
| **Wishlist toggle (heart icon)** | Save/unsave state | Product card, PDP |
| **Empty state** | No results / empty cart / empty wishlist illustration + CTA | Search, Cart, Wishlist, 404 |

---

## 4. Product Detail Page (PDP) Components

| Component | Description | Reused In |
| --- | --- | --- |
| **Image gallery / lightbox** | Hero, lifestyle, person-wearing-it (×2), size comparison, texture, ingredient close-ups | PDP only (primary), lighter version possibly in Quick View modal |
| **Size selector** | Circular swatches (30/50/100ml), gold ring on selected | PDP, Quick View modal, Cart line-item edit |
| **Price + cost-per-spray display** | Price, calculated cost-per-spray, savings-vs-smallest-size | PDP, Size selector, Cart |
| **Add to Cart (ATC) button** | Primary CTA variant with quantity/size validation | PDP, Product card quick-add, Cart upsell modules |
| **Olfactory Journey block** | Stacked Top/Heart/Base rows, ingredient chips in mood colors | PDP (primary use) |
| **Ingredient table** | Full ingredient list, olfactive role, source type, allergen flag | PDP, referenced (lighter) on Safety & Sensitivity page |
| **Longevity/Sillage meter** | Horizontal filled bar, sillage-ramp coloring | PDP (full), Product card (mini variant), Comparison table |
| **Dupe / Inspired-By block** | Inspired-by name, similarity %, shared ingredients, differences | PDP, Inspired-By Index cards, Homepage dupe spotlight |
| **Dupe comparison table** | Zebra-row side-by-side, gold similarity %, shared-ingredient chips | PDP §12 (primary), potential standalone `/compare/{slug}` page (open question) |
| **Layering partner card** | "Pairs with X" mini product reference + note | PDP, Homepage "build your signature scent" section |
| **Bundle membership callout** | Banner linking PDP to the bundle(s) it belongs to | PDP only |
| **Brand story block** | Short-form (80–150 words) | PDP; long-form variant reused on About page |
| **Value proposition banner** | 1–2 sentence emotional hook, Fraunces display type | PDP hero, Homepage hero |
| **Review box** | Rating summary + individual review cards (if in scope) | PDP only |

---

## 5. Bundles & Cart/Checkout

| Component | Description | Reused In |
| --- | --- | --- |
| **Bundle card** | Contents thumbnail, combined price, savings % | Bundles Index, Homepage bundles carousel |
| **Cart line item** | Product thumb, size selector, qty stepper, cost-per-spray reminder | Cart page, Cart drawer (if used in header) |
| **Cart drawer** | Slide-out mini cart | Header (global), triggered from ATC anywhere |
| **Cart/order summary** | Subtotal, savings, shipping estimate | Cart, Checkout, Order Confirmation |
| **Upsell / cross-sell module** | "Complete your set" — reuses product card + layering logic | Cart, Checkout, PDP |

---

## 6. Interactive Tools

| Component | Description | Reused In |
| --- | --- | --- |
| **Quiz card** | Single-question screen, tag-chip-styled answer buttons | Quiz flow |
| **Quiz progress indicator** | Step 1 of 4, etc. | Quiz flow |
| **Weather-based recommendation module** | Dynamic banner pulling season/family tags + manual override | Homepage only |

---

## 7. Account

| Component | Description | Reused In |
| --- | --- | --- |
| **Account sidebar/nav** | Dashboard, Orders, Wishlist, Reminders links | All `/account/*` pages |
| **Order history row** | Order #, date, status, total | Order History, Account Dashboard (recent orders) |
| **Replenishment reminder card** | "You're likely running low on X" + reorder CTA | Reminders page, Account Dashboard |

---

## 8. Trust & Content

| Component | Description | Reused In |
| --- | --- | --- |
| **USP strip** | Honest Dupes / Feeling-not-notes / Layering-Ready / Longevity transparency icons+text | Homepage, Footer, PDP (condensed) |
| **FAQ accordion** | Expand/collapse Q&A | FAQ page, possibly PDP mini-FAQ |
| **Allergen/safety disclosure block** | Sitewide policy explainer | Safety & Sensitivity page, referenced from PDP ingredient table |
| **Section heading** | Fraunces heading + optional Inter subtext, used to open any content band | Homepage sections, Tag pages, About, FAQ, every content page |

---

## Build Priority (by reuse footprint)

Highest-leverage components — the ones the user specifically called out (review box, ATC button, dupe referencing, header, announcement bar) all land in tier 1 or 2, confirming they're the right starting point:

1. **Tier 1 — global, appears on 100% of pages:** Announcement bar, Header/Nav, Footer, Tag chip, CTA button (primary/secondary), Toast
2. **Tier 2 — appears across 5+ template types:** Product card, Product grid/carousel, Breadcrumb, Stock status badge, Section heading, Modal
3. **Tier 3 — PDP-cluster, high emotional/conversion weight:** ATC button, Size selector, Olfactory Journey block, Longevity/Sillage meter, Dupe/Inspired-By block, Dupe comparison table, Layering partner card, Review box
4. **Tier 4 — single-flow or low-reuse:** Quiz card, Weather module, Replenishment reminder card, FAQ accordion, Bundle card

---

## Note

Every component above should draw its 7–10 CSS custom properties from the existing Design System tokens (ink/paper ladder, gold accent, semantic colors, tag palette, spacing scale, radii) rather than introducing new values — per the Design System's own rule that color is confined to the tag chip and gold accent only.  