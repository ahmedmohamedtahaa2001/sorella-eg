     # Sorella — Page Templates, Sections & Components

     **Scope:** Distinct **templates** (one template renders many URLs) + the **reusable sections and components** they assemble from. Not per-product or per-collection instances.
     **Based on:** the crawled `current website/` archive (93 products, 23 collections, 3 content pages, 5 policies, 1 empty blog) + `Full Redesign Report.md`, `Sorella Design System.md`, and the build model in `Skills/MultiAgentsWorkFlow.md`.
     **Date:** July 1, 2026

     ---

     ## 0. Reading this report

     This is a Shopify (OS 2.0) build. Work is layered, and each layer maps to the multi-agent workflow:

     ```
     LAYOUT (theme.liquid)  → global chrome, present on every page
     └─ TEMPLATE (*.json) → assembles sections; one template renders many URLs
          └─ SECTION (sorella-*.liquid) → a schema-driven, reusable block of UI  ← 1 section = 1 subtask (ST-xx)
               └─ COMPONENT (snippet/block) → a reusable atom rendered inside sections
     ```

     Two rules from `Skills/MultiAgentsWorkFlow.md` govern everything below:

     1. **Build once, reuse everywhere.** A section or component is authored a single time, QA'd through the triad once, then reused across templates. That reuse is exactly what makes the agent decomposition efficient — the section/component registries in §2 **are** the subtask map.
     2. **Zero hardcoded values.** Every text, color, image, URL, count, and toggle is a `schema` setting or metafield. Product-specific data (notes, "inspired by", reviews) comes from **metafields**, not hardcoded copy.

     Because it's Shopify, you don't build 120 pages. The archive collapses to a small set of templates:

     | Content in archive | Live URLs | Templates needed |
     |---|---|---|
     | Products | 93 | **1** product template |
     | Collections | 23 | **1** collection template |
     | Policies | 5 | **1** policy template |
     | Content pages (About, Contact) | 2 | 2 |
     | Blog (empty today) | 1 | 2 (list + article) |
     | Homepage | 1 | 1 |

     ---

     ## 1. Summary — the template list

     **16 templates.** "New?" flags what does not exist on the live site today.

     | # | Template | Shopify file | Serves | New? | Phase |
     |---|---|---|---|---|---|
     | 1 | **Homepage** | `index.json` | 1 URL | Redesign | 1 |
     | 2 | **Collection** | `collection.json` | 23 collections | Redesign | 2 |
     | 3 | **Product** | `product.json` | 93 products | Redesign | 2 |
     | 4 | **Cart** | `cart.json` + drawer | 1 URL | Redesign | 3 |
     | 5 | **About Us** | `page.about.json` | 1 URL | Redesign + content | 3 |
     | 6 | **Contact** | `page.contact.json` | 1 URL | Redesign | 3 |
     | 7 | **Policy / Legal** | `page.policy.json` | 5 policies | Restyle | 3 |
     | 8 | **Search results** | `search.json` | 1 URL | New | 3 |
     | 9 | **404 / Not found** | `404.json` | 1 URL | Restyle | 3 |
     | 10 | **Blog listing** | `blog.json` | 1 URL | New content | 4 (optional) |
     | 11 | **Blog article** | `article.json` | n articles | New content | 4 (optional) |
     | 12 | **FAQ** | `page.faq.json` | 1 URL | **New (recommended)** | 3 |
     | 13 | **Account** (login/register/dashboard) | `customers/*` | 4–5 URLs | New/restyle | 4 |
     | 14 | **Password / Coming-soon** | `password.json` | 1 URL | Optional | 4 |
     | 15 | **Gift card** | `gift_card.json` | n cards | Restyle | 4 (optional) |
     | 16 | **Collections index** (all collections) | `list-collections.json` | 1 URL | Optional | 2 (optional) |

     ---

     ## 2. Architecture — reusable sections & components

     This is the reuse layer. Everything here is built **once** and shared. Naming follows the `sorella-` convention required by the workflow.

     ### 2.1 Global chrome (LAYOUT — every page, built in Phase 0)

     Present on all templates via `layout/theme.liquid`; not part of any single template.

     | Section | Key schema settings | Blocks / components | Notes |
     |---|---|---|---|
     | `sorella-announcement-bar` | message, link, show/hide, colors | — | *"Free 5ml for orders over 1,100 LE."* |
     | `sorella-header` (adaptive nav dock) | logo (full + icon), menu, transparent-top toggle, dock max-width, scroll-hide toggle | `sorella-menu-tile` (mega-menu bento tiles), `sorella-icon` | Two states (§8 of design system); mega-menu + mobile drawer live here |
     | `sorella-mobile-drawer` | menu, socials | `sorella-icon` | Full-height glass drawer (mobile) |
     | `sorella-footer` | columns, socials, newsletter toggle, policy links | `footer-column`, `sorella-newsletter-form`, `sorella-icon` | The one deliberately dense area |
     | `sorella-cart-drawer` | free-gift threshold, upsell collection, empty-state copy | `sorella-cart-line-item`, `sorella-button`, `sorella-price` | Glass side panel + `/cart` fallback |

     ### 2.2 Reusable content sections (SECTION layer — shared across templates)

     Each row = one subtask (ST-xx). "Used on" drives reuse.

     | Section | Purpose | Key schema settings | Blocks | Used on |
     |---|---|---|---|---|
     | `sorella-hero` | Glass hero card over media | heading, subheading, media (image/video), CTA, scrim toggle | — | Homepage, Collection (opt), Campaign |
     | `sorella-bento-collections` | Curated category bento grid | heading, gap | `sorella-bento-cell` (collection ref, span, image, CTA) | Homepage, Mega-menu |
     | `sorella-trust-bar` | Trust/stat trio | layout | `sorella-trust-cell` (icon, claim) | Homepage, About |
     | `sorella-seasonal-campaign` | Swappable campaign cell | image, copy, link, active-date | — | Homepage, Collection landing |
     | `sorella-brand-story` | Alternating glass story panels | — | `story-panel` (image, heading, richtext, side) | About, Homepage (1×) |
     | `sorella-product-carousel` | Product row/rail | heading, source collection, count, layout | renders `sorella-product-card` | Homepage (best-sellers), Product (related) |
     | `sorella-testimonials` | Structured reviews | heading, source (metafield/app) | `sorella-testimonial-card` | Homepage, Product |
     | `sorella-newsletter` | Email capture | heading, richtext | `sorella-newsletter-form` | Homepage, Blog, Pages |
     | `sorella-collection-header` | Collection title/cover | show description/cover | — | Collection |
     | `sorella-filter-sort-bar` | Sticky glass filters | filter groups, sort options | `sorella-icon` | Collection, Search |
     | `sorella-collection-grid` | Uniform product grid | columns, per-page, pagination style | renders `sorella-product-card`, `sorella-pagination` | Collection, Search |
     | `sorella-product-gallery` | PDP media | zoom, thumbs | — | Product |
     | `sorella-product-info` | Price/variant/add-to-cart card | trust text, show inspired-by | `sorella-variant-selector`, `sorella-quantity-selector`, `sorella-price`, `sorella-button`, `sorella-inspired-by-tag` | Product |
     | `sorella-notes-pyramid` | Top/heart/base notes (**new**) | source metafield | `sorella-note-tier` | Product |
     | `sorella-product-accordion` | Details / shipping / ingredients | — | `sorella-accordion-item` | Product, FAQ (shares component) |
     | `sorella-page-header` | Generic eyebrow + heading | eyebrow, heading, media | — | About, Contact, Policy, FAQ, Search, 404 |
     | `sorella-rich-text` | Generic reading column | richtext, width | — | Policy, About, any page |
     | `sorella-contact-form` | Contact fields | field toggles, success copy | `sorella-form-field`, `sorella-button` | Contact |
     | `sorella-faq` | Glass accordion Q&A | heading | `sorella-accordion-item` | FAQ, Product (reuse) |
     | `sorella-blog-posts` | Article preview grid | source blog, count | `article-card` (reuses `sorella-glass-panel`) | Blog listing |
     | `sorella-article` | Article body | show author/date/share | — | Blog article |
     | `sorella-empty-state` | Branded empty/no-results | heading, copy, CTA | `sorella-button` | Search, empty Collection, Cart |
     | `sorella-account-forms` | Login/register/account forms | labels | `sorella-form-field`, `sorella-button` | Account |

     ### 2.3 Reusable components (COMPONENT layer — snippets/blocks, built once)

     Atoms rendered inside sections. All map to `Sorella Design System.md` §9.

     | Component | Variants / params | Rendered inside |
     |---|---|---|
     | `sorella-glass-panel` | variant: card / hero / dock; blur level; radius | base wrapper for most sections |
     | `sorella-button` | primary (gold fill) / ghost / text; size | hero, product-info, cart, forms |
     | `sorella-product-card` | **default / sold-out / quick-add** | collection-grid, product-carousel, cart upsell |
     | `sorella-bento-cell` | span 1×1 / 2×1 / 1×2 / 2×2 | bento-collections, mega-menu |
     | `sorella-trust-cell` | icon + claim | trust-bar |
     | `sorella-testimonial-card` | name, verified badge, date, rating, quote | testimonials |
     | `sorella-note-tier` | top / heart / base | notes-pyramid |
     | `sorella-inspired-by-tag` | gold-bordered pill | product-card, product-info |
     | `sorella-price` | regular / sale / from | product-card, product-info, cart |
     | `sorella-badge` | cart-count (gold) / "Sold out" pill | header, product-card |
     | `sorella-star-rating` | value out of 5 | testimonial-card, product-info |
     | `sorella-variant-selector` | swatch / dropdown | product-info |
     | `sorella-quantity-selector` | — | product-info, cart |
     | `sorella-cart-line-item` | — | cart-drawer, cart page |
     | `sorella-form-field` | text / email / tel / textarea | contact, account, newsletter |
     | `sorella-accordion-item` | Q/A or label/content | faq, product-accordion |
     | `sorella-pagination` | numbered / load-more | collection-grid, blog, search |
     | `sorella-menu-tile` | mega-menu bento tile | header |
     | `sorella-newsletter-form` | inline / stacked | footer, newsletter, about |
     | `sorella-icon` | icon set (search, bag, account, social, etc.) | everywhere |

     ### 2.4 Reusability at a glance

     The high-leverage units (build these first, they repay across the most templates):

     - **`sorella-product-card`** → collection grid, best-sellers, related, search, cart upsell (5 contexts, 3 variants).
     - **`sorella-glass-panel`** + **`sorella-button`** → nearly every section.
     - **`sorella-product-carousel`** → best-sellers *and* related products (same section, different source setting).
     - **`sorella-collection-grid`** → Collection *and* Search results (same section).
     - **`sorella-accordion-item`** → FAQ *and* product details.
     - **`sorella-page-header`** + **`sorella-rich-text`** → About, Contact, Policy, FAQ, 404, Search.

     ---

     ## 3. Core commerce templates

     ### 3.1 Homepage — `index.json`
     **Serves:** `/` · **Source:** `homepage/`, `homepage-full.jpeg` · Full showcase, only page using full **bento** (`Full Redesign Report.md` §5.1).

     **Assembled from sections:** `sorella-hero` → `sorella-trust-bar` → `sorella-bento-collections` → `sorella-seasonal-campaign` → `sorella-brand-story` → `sorella-product-carousel` (best-sellers) → `sorella-testimonials` → `sorella-newsletter`.
     **Key components:** `sorella-bento-cell`, `sorella-trust-cell`, `sorella-product-card`, `sorella-testimonial-card`, `sorella-button`.

     Live homepage bento entries to reproduce: Bundles · Perfume Oil · For Her · For Him · Unisex (tall span) · Ramadan (seasonal). **Content gaps:** lifestyle photography, structured review data, brand-story copy.

     ### 3.2 Collection — `collection.json`
     **Serves:** all 23 collections · **Source:** `collections/*`, `collection-for-her-full.jpeg` · **Not bento** — scannability first (`Full Redesign Report.md` §5.2).

     **Assembled from sections:** `sorella-collection-header` → `sorella-filter-sort-bar` → `sorella-collection-grid` (→ `sorella-empty-state` when 0 products).
     **Key components:** `sorella-product-card` (default / **sold-out** / quick-add), `sorella-pagination`, `sorella-price`, `sorella-badge`.

     Must handle real states from the archive: **large** — All (93), Perfume Sprays (77), For Her (34), Free Gift 5ML (27), Testers (26); **small** — Unisex (4), Bundles (6); **empty** — `5ml-offer-perfumes`, `main-collection`, `mother-s-day-bundles`, `new-fragrances`, `the-most-loved`.

     > **Cleanup (merchandising, not a build task):** 23 collections with duplicates (`perfume-oil`/`perfume-oils`, `5ml-perfumes`/`5ml-offer-perfumes`) and 5 empties — merge/retire before launch.

     ### 3.3 Product — `product.json`
     **Serves:** all 93 products · **Source:** `products/*`, `product-baklava-full.jpeg` · One template, conditional blocks for all 5 product shapes (`Full Redesign Report.md` §5.3).

     **Assembled from sections:** `sorella-product-gallery` + `sorella-product-info` → `sorella-notes-pyramid` (**new**) → `sorella-product-accordion` → `sorella-testimonials` → `sorella-product-carousel` (related).
     **Key components:** `sorella-variant-selector`, `sorella-price`, `sorella-inspired-by-tag` (**new**), `sorella-note-tier` (**new**), `sorella-button`, `sorella-star-rating`.

     Covers all shapes via schema/metafields, no extra template: spray 30/50ml (~850), oil (~380–480), musk (~300), 5ml tester (~80–90, price-forward), **bundle** (900–2,890 — adds a "what's inside" block; optional `product.bundle.json` only if it diverges heavily). **Content gaps:** notes + "inspired by" metafield data per SKU, lifestyle imagery.

     ### 3.4 Cart — `cart.json` + `sorella-cart-drawer`
     **Serves:** `/cart` · Glass side drawer primary, full-page fallback (`Full Redesign Report.md` §5.5).
     **Components:** `sorella-cart-line-item`, `sorella-quantity-selector`, free-5ml progress indicator, upsell slot (`sorella-product-card` quick-add), `sorella-empty-state`.

     ---

     ## 4. Content pages

     ### 4.1 About Us — `page.about.json`
     **Serves:** `/pages/about-us` · **Source:** `pages/about-us/` (real copy exists — two-sisters origin, "Why Sorella?", "Fragrance With a Story").
     **Assembled from:** `sorella-page-header` → `sorella-brand-story` (alternating panels) → `sorella-trust-bar` → `sorella-newsletter`.

     ### 4.2 Contact — `page.contact.json`
     **Serves:** `/pages/contact` · **Source:** `pages/contact/` (Name, Email\*, Phone, Comment).
     **Assembled from:** `sorella-page-header` → `sorella-contact-form` (+ socials, shipping-time note).

     ### 4.3 Policy / Legal — `page.policy.json`
     **Serves:** 5 policies · **Source:** `pages/policies/` · One template.
     **Assembled from:** `sorella-page-header` → `sorella-rich-text` (~820px reading column, readability first — no glass/bento).

     ### 4.4 FAQ — `page.faq.json` — **New, recommended**
     Shipping (5–8 days), free-5ml offer, oils-vs-spray, testers — recurring buyer questions.
     **Assembled from:** `sorella-page-header` → `sorella-faq` (reuses `sorella-accordion-item`) → `sorella-newsletter`.

     ---

     ## 5. Blog (content-dependent)
     Live blog exists but is **empty**. Build only if content will be published.
     ### 5.1 Blog listing — `blog.json` → `sorella-page-header` + `sorella-blog-posts`.
     ### 5.2 Blog article — `article.json` → `sorella-article` + `sorella-product-carousel` (related) + `sorella-newsletter`.
     > Defer both if no editorial calendar — don't ship empty templates.

     ---

     ## 6. System & utility templates

     ### 6.1 Search — `search.json` — **New** → `sorella-page-header` + `sorella-filter-sort-bar` + `sorella-collection-grid` + `sorella-empty-state`. (Predictive search lives in `sorella-header`.)
     ### 6.2 404 — `404.json` → `sorella-page-header` + `sorella-empty-state` (CTA to shop/best-sellers).
     ### 6.3 Password / Coming-soon — `password.json` — optional; reuse `sorella-hero`.
     ### 6.4 Gift card — `gift_card.json` — optional; restyle default to palette.
     ### 6.5 Collections index — `list-collections.json` — optional "Shop all" hub → `sorella-bento-collections`. Skip if mega-menu covers discovery.

     ---

     ## 7. Customer / account templates — `customers/*`
     **Serves:** login, register, account, order, addresses, reset/activate.
     **Assembled from:** `sorella-account-forms` (reuses `sorella-form-field`, `sorella-button`, `sorella-glass-panel`). Low design-novelty — batch in one Phase-4 pass. Skip if guest-checkout only (§9).

     ---

     ## 8. Build order (maps to `Full Redesign Report.md` §8 and the workflow's execution gates)

     - **Phase 0 — Foundations:** design tokens + the whole **component layer** (§2.3) + **global chrome** (§2.1). *No page templates yet — every section below depends on these, so they're the first subtasks and the first QA gate.*
     - **Phase 1:** the marketing section layer (§2.2) → **Homepage** (#1).
     - **Phase 2:** `sorella-collection-*` + `sorella-product-*` sections → **Collection** (#2), **Product** (#3), (opt. Collections index #16).
     - **Phase 3:** **Cart** (#4), **About** (#5), **Contact** (#6), **Policy** (#7), **Search** (#8), **404** (#9), **FAQ** (#12).
     - **Phase 4:** **Blog** (#10, #11), **Account** (#13), **Password** (#14), **Gift card** (#15).

     Per `Skills/MultiAgentsWorkFlow.md`: each section/component is a subtask (`ST-xx`) → implemented → Subtask QA triad (Tester → Checker → Verifier) → Integration into the template → Final QA triad. **Gate: zero hardcoded values** scanned before and after each subtask.

     ---

     ## 9. Decisions to confirm
     1. **Accounts in scope?** — build `customers/*` (#13) or guest-checkout only?
     2. **Blog?** — editorial plan, or defer #10/#11?
     3. **Bundle layout** — one product template + bundle block, or separate `product.bundle.json`?
     4. **Collection cleanup** — merge/retire the 5 empty + duplicated collections before launch?
     5. **Collections index (#16)** — needed, or mega-menu covers it?
     6. **Gift cards / password page** — needed at all?
     7. **Reviews source** — native metafields, or a review app feeding `sorella-testimonials`?

     ---

     ## 10. What this report deliberately excludes
     Per the brief (templates + reusable units, not repeated instances):
     - 93 product pages → **Product template (#3)**.
     - 23 collection pages → **Collection template (#2)**.
     - 5 policy pages → **Policy template (#7)**.
     - Future seasonal campaigns → **`sorella-seasonal-campaign`** section, schema-driven, no new build.
