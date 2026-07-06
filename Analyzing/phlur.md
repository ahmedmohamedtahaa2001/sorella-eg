# PHLUR — Store Analysis

> **Data provenance & limitations:** phlur.com is fully Cloudflare-challenge-walled for automated access (HTTP 403 on every path, including `/products.json`; the JS challenge loops with no Turnstile checkbox to click). A live browser walkthrough was therefore impossible — zero live observations exist. Everything below was reconstructed from **Wayback Machine snapshots (Jan–Jun 2026; homepage 2026-06-18, PDPs May–Jun 2026)**, so it is structurally complete but ~2–4 weeks stale. Anything that could not be verified from archives is explicitly marked *(unverified)*. Runtime behaviors (cart drawer animation, mobile layout, page speed) were not observed.

---

## 1. Overview & Positioning

- **What it is:** A Shopify (Online Store 2.0, custom theme) DTC perfume brand. Meta title: *"Phlur - Modern Fine Fragrance Brand"*; meta description promises "mindfully formulated, responsibly sourced and meticulously crafted fragrances by world-class perfumers."
- **Brand angle:** Original, emotion-named scents — **Missing Person, Father Figure, Vanilla Skin, Not Your Baby, Lost Cause, Cherry Stem, Honey Moon** — explicitly *not* designer dupes. Copy is sensory/romantic (Missing Person "evokes the lingering scent of your lover's skin… white musk… jasmine… orange blossom").
- **Homepage brand statement:** *"Modern fragrances inspired by memories and feelings — those intimately personal and universally shared."*
- **Who it targets:** TikTok-era fine-fragrance buyers (the body-mist line — Vanilla Skin, Beach Skin, Cashmere Skin — is described as a big TikTok-driven line; there's even a "Viral Scents" trio), plus celebrity-campaign reach via a **Suni Lee "Icons with an icon" hero**. Ships to US-48 + Canada only (USD/CAD, EN/FR).
- **Catalog size:** ~**160 product handles** across ~**38 collections**. Each hero scent is a franchise of ~14 SKUs (EDP in 3 sizes, body mist + travel mist, lotion, wash, oil, hand cream, candle, deodorant, fragrance oil, duet, ornament).
- **Price range:** $32 travel EDP → $99 50mL EDP → $139 100mL (heroes only); body mists $39/$26 travel; oils and candles $45; body care ~$20–38; sets $39–78; a $50/yr paid membership.

## 2. Core Selling Points

1. **"Fine fragrance without the risk" — the $20-credit Discovery Set.** The 8×2mL sampler ($39) carries a **$20 credit toward a full-size bottle**, communicated three ways: a "**$20 CREDIT**" badge on product cards site-wide, a homepage image-with-text section ("There's More to Discover…"), and a **1-2-3 explainer on the PDP** ("1 Purchase → 2 Explore: Mix, match, layer… → 3 Receive Your Credit: an email will be sent after purchase"). Net cost of trying 8 scents: $19. This is the site's risk-reversal engine — there is **no scent quiz anywhere** (0 "quiz" mentions) and no money-back scent guarantee; the credit-back sampler does both jobs.
2. **Original emotional scents, not dupes.** Communicated via the naming itself, sensory PDP copy, and the homepage rich-text brand statement with an "About Us" link.
3. **Perfumery education as a trust moat.** Dedicated pages: `/pages/ingredients`, `/pages/raw-materials`, `/pages/perfumery-terms`, `/pages/olfactive-families`, plus a full glossary blog (`/blogs/perfumery-dictionary`, "Perfumery Index Blog"). Ingredient-transparency imagery and olfactive-family links appear on PDPs.
4. **Membership as the loyalty value prop.** "MEMBERS GET MORE — Over $200 worth of gifts and savings — JOIN NOW" full-width homepage banner; $50/yr Inveterate membership with itemized values (see §5). Pushed in the header nav ("Membership"), homepage banner, and inside the cart drawer.
5. **Layering as the multi-buy narrative.** "Layer It With" PDP widget, "Build Your Custom Trio — Pick three scents to layer – and save $10" featured card inside the nav drawer, copy like "Layer it or love it alone – Cherry Stem, your way."
6. **Review-backed credibility:** 2,127 reviews on Missing Person 50mL alone, surfaced in JSON-LD for search rich snippets.

## 3. Homepage Structure & Conversion Flow

Section order (from Shopify section IDs, snapshot 2026-06-18):

| # | Section | Conversion job |
|---|---|---|
| 1 | **Announcement bar** — "New: Endless Summer Duo →" | Newness/launch messaging, *not* a discount — protects premium positioning while still creating urgency to look. Links straight to the duo PDP. |
| 2 | **Header** — Shop / About / Membership / Search; search pre-seeded with "Popular Searches": Missing Person, Vanilla Skin, Father Figure, Beach Skin | Routes new visitors to proven hero SKUs before they type a character; puts Membership at top-nav level. |
| 3 | **Collection pill sub-nav** — Shop All · Best Sellers · Perfume · Body Mist · Body Care · Gifts & Sets · Custom Trio | One-tap category routing above the fold; note Custom Trio (a bundle) gets equal billing with categories. |
| 4 | **Full-width hero** — Suni Lee "Icons with an icon", CTA "SHOP NOW" | Aspiration/credibility via celebrity, single clear CTA. |
| 5 | **Featured collection: "Best Sellers"** — carousel with quick-add "Add" buttons; mixes duos/sets/hero EDPs | Social-proof-by-curation; quick-add shortens path to cart; seeding sets into the bestseller row raises the average ticket of the first click. |
| 6 | **Rich text** — brand statement + "About Us" link | Brand trust beat between two commercial blocks. |
| 7 | **Full-width banner: "MEMBERS GET MORE — Over $200 worth of gifts and savings — JOIN NOW"** | Sells the $50/yr membership mid-funnel with a 4× value anchor. |
| 8 | **Featured collection: "Wear What's True" (Shop Perfume)** — all 50mL EDPs at $99 | Core-category shelf with uniform pricing (easy comparison, no price anxiety). |
| 9 | **Collection list: "Featured Collections"** — Perfume, Body Mist | Category routing for scrollers who skipped the pills. |
| 10 | **Image with text: Discovery Set** — "eight-piece sample collection – with $20 credit towards your next full size fragrance. SHOP NOW." | Catches undecided visitors at the bottom with the low-risk entry offer. |
| 11 | **Footer** — deep education links, Klaviyo "Sign up for 10% off your first order" | Email capture + long-tail trust content. |

**Why the ordering works:** it alternates commerce → trust → commerce (hero → bestsellers → brand statement → membership → category shelves → risk-reversal offer), and it bookends the page with the two strongest conversion levers for a scent brand sold sight-unsmelled: proven bestsellers at the top for the confident, and the $20-credit sampler at the bottom for the hesitant. The one debatable choice: the membership banner (section 7) appears before a first-time visitor has any reason to want repeat-purchase economics.

## 4. Product Page Anatomy

Based on three archived PDPs (Missing Person 50mL, Fragrance Discovery Set, Membership). *Sticky ATC, gallery behavior, and variant-picker UX could not be observed (live walkthrough blocked) — omitted.*

- **Price ladder as anchoring:** each scent exists at $32 (9.5mL) / $99 (50mL) / $139 (100mL, heroes only). The travel size at ~32% of the 50mL price is a low-commitment entry; the 100mL makes the $99 bottle read as the sensible middle choice (classic good-better-best framing).
- **Risk reversal (Discovery Set PDP):** "8 x 2mL Samples — Get $20 off a full size fragrance" with the 1-2-3 redemption explainer, full "In This Set" contents list (Rose Whip, Cherry Stem, Missing Person, Afterglow, Vanilla Skin, Honey Moon…), and 4.7★ / 1,209 reviews. This PDP is the funnel's quiz-replacement.
- **Reviews with category-specific attributes:** Okendo widget (33 refs per PDP) with **"Longevity" and "Projection" attribute sliders** (Intimate→Moderate→…) — review data answers the exact objections of buying perfume online. JSON-LD Product markup carries 4.4★ / 2,127 reviews for rich snippets.
- **Scent education on-page:** Scent Notes section, Notes/Ingredients accordions, olfactive-family link, ingredient-transparency imagery — reduces the "what does it smell like?" gap.
- **Cross-sell:** Rebuy "**Layer It With**" widget (Rebuy appears 672–719 times per page; widget IDs 145589, 145779, 172608, 232786/7, 235996, 285433 across PDP, cart, and collection `_rdiscovery-widget` placements).
- **No subscribe-and-save anywhere:** every sampled product has `requires_selling_plan:false`, `selling_plan_groups:[]`. The only selling plan on the whole site is the annual Inveterate membership — a deliberate choice to sell loyalty as a paid product instead of discounted subscriptions.
- **Membership pushed at PDP level:** the Discovery Set snapshot contained a "JOIN MEMBERSHIP TO PURCHASE" string near add-to-bag (a member-gated purchase path). *(Exact UI treatment unverified.)*
- **SEO-tuned titles:** benefit-keyword PDP titles, e.g. "Missing Person Perfume - Full Size Fragrance", "Perfume Discovery Set - Eight-Piece Sample Set".
- **Cross-sell keying via tags:** `Fragrance_<Name>` tags tie the ~14-SKU franchise together; other tags: `label-new`, `discount-applies`, `lto`, `show-product-in-reviews`.

## 5. Bundles, Offers & Pricing Strategy

Bundles are PHLUR's single biggest CRO lever — nearly every scent has set variants:

| Offer | Structure | Price mechanics |
|---|---|---|
| **Fragrance Duets** | per-scent 2-packs (`*-duet` handles for nearly every scent) | franchise attach |
| **Hair & Body Mist Duos** | 2 full-size mists (Endless Summer, Vanilla & Cream, Velvet Berry) | **$68, compare-at $78** — visible strike-through anchoring |
| **Travel Trios** | 3 minis; themed: Island Escape, Viral Scents, Sunshine Scents, Call Me Daddy | $68 compare $78 |
| **Custom Trio (build-your-own)** | Rebuy Bundle Builder, "Pick three scents to layer – and **save $10**" | choice + discount |
| **Mini Perfume Coffret** | 4×7mL | **$59**, tagged `lto` (limited-time offer) |
| **Discovery Set** | 8×2mL | **$39 + $20 credit back** (net $19) → feeds $99 bottle purchases |
| **Membership** | $50/yr (Inveterate) | itemized "$200+ value": 4 free seasonal travel sizes ($116), 10% cashback ($40), free US shipping ($32), free sample every order ($24), exclusives + early access |
| **Farewell Sale** | ~40 discontinued SKUs, top-level nav item | up to 40% off (50mL $99→$60, mists $39→$25–28, travels $32→$20, candles $45→$27), strictly **final sale** with a dedicated `/pages/sale-fine-print` |

Why it works for AOV and conversion:

- **Every bundle shows its savings explicitly** — compare-at strike-throughs ($78→$68) or a named amount ("save $10"), never vague "bundle & save."
- **"Layering" gives a product-logic reason to buy 2–3 items**, so multi-unit orders feel like usage advice, not upselling.
- **The Discovery Set converts hesitation into a committed second purchase** (the $20 credit only pays off on a full-size order).
- **Clearance is quarantined into a branded "Farewell Sale"** with final-sale terms — urgency without training customers to wait for sitewide discounts. The announcement bar meanwhile carries only launch news ("New: Endless Summer Duo").
- **The cart drawer itself is a revenue surface:** Rebuy Smart Cart with a **free-shipping progress bar** ("Progress to free shipping: X%"), in-cart cross-sells, and an **in-cart membership ad** that a custom `isInveterateSubscriber()` check hides for existing members. *(Free-shipping threshold number lives in Rebuy config, not HTML — unverified; historically ~$75+.)*

## 6. Reviews & Social Proof

- **Platform:** Okendo (no Yotpo/Judge.me/Loox/Stamped found).
- **Volume:** Missing Person 50mL: **4.4★ / 2,127 reviews** (distribution 1,633×5★, 138×4★, 100×3★, 66×2★, 190×1★; ~43,900 review words). Discovery Set: **4.7★ / 1,209**. Membership: 4.9★ / 47.
- **Display:** on-PDP Okendo widget with "Write a Review" and category-specific **attribute sliders (Longevity, Projection)**; **JSON-LD rich snippets** put stars + counts into Google results. A `show-product-in-reviews` tag and a dedicated reviews page exist in the sitemap.
- **Elsewhere in the funnel:** a "Best Sellers" homepage carousel and BEST SELLER card labels do social-proof-by-curation; the Suni Lee celebrity hero does credibility at the top of the funnel. *(Photo reviews, review filters, and card-level star display could not be verified from archives.)*

## 7. Navigation, UX & Mobile

- **Merchandised mega-nav / slide-out "shop-nav-drawer":** Shop All / Best Sellers / **By Scent (olfactive family)** — Gourmand, Fruity, Floral, Woody, Musk, Amber, Solar, each its own collection URL — plus by franchise (Vanilla Skin, Missing Person, Father Figure). Each drawer panel contains **featured product cards with one-line benefit copy** ("Discovery Set: New Scents — Sample the collection with $20 toward your first fragrance"; "Build Your Custom Trio — …save $10"). The nav itself sells, not just routes.
- **"Farewell Sale" as a top-level nav item** — clearance gets discovery without polluting core collections.
- **Search pre-seeded** with the four hero scents as "Popular Searches."
- **Product cards:** labels NEW / BEST SELLER / $20 CREDIT (and LAST CHANCE per the scrape's card-label list); quick-add buttons on cards.
- **Footer as trust architecture:** Track Your Order, Shipping & Returns, Sale Terms, plus the entire education stack (Ingredients, Raw Materials, Perfumery Terminology, Olfactive Families, Perfumery Index Blog). Notably **no trust-badge/seal row** — trust is carried by reviews and policy links.
- **Payments:** Shop Pay accelerated checkout; **no BNPL** (no Klarna/Afterpay/Sezzle strings).
- **Stack:** Rebuy (cart/upsell), Okendo (reviews), Inveterate (membership), Klaviyo + Attentive (email/SMS), Elevar + GA4 (analytics), Cloudflare (bot protection).
- **Mobile:** *not assessable — the live walkthrough (including the planned 390×844 pass) was blocked by Cloudflare, and archives don't capture responsive behavior.*

## 8. Weak Points

Grounded in the archived data only (no live speed/UX observations possible):

1. **No guided scent discovery for text-first shoppers.** Zero quiz anywhere. The Discovery Set is a great substitute, but it costs $39 and takes shipping days; a visitor who won't spend $39 to "find their scent" has no free 60-second path to a recommendation. Competitors' quizzes double as zero-cost email capture.
2. **The $39 sampler still carries friction vs. free-sample models,** and the $20 credit arrives by **email after purchase** — a redemption step that will leak (unclaimed/lost credits), and the set appears **final sale**, so the risk reversal is one-directional.
3. **No BNPL at a $99–139 price point.** For a young, TikTok-driven audience, no Klarna/Afterpay on a $99 bottle is a plausible conversion leak (only Shop Pay accelerated checkout found).
4. **No subscribe-and-save at all.** The $50/yr membership is clever, but it demands an upfront commitment decision; there is no low-friction replenishment path for the consumable body-care/mist lines (`selling_plan_groups` empty on every sampled product).
5. **Shipping is narrow and paid by default:** UPS SurePost **$8**, contiguous US + Canada only, no PO boxes/APO/FPO, no international — the free-shipping threshold isn't even stated in HTML (Rebuy runtime config), so shoppers can't see the target until they open the cart.
6. **Returns exclude everything discounted:** 30-day any-reason returns apply to regular-price items only; the entire Farewell Sale (~40 SKUs at up to 40% off) and the Discovery Set are final sale — the risk-reversal story collapses exactly where price-sensitive shoppers enter.
7. **Membership banner placement is early for cold traffic** (homepage section 7, and a "JOIN MEMBERSHIP TO PURCHASE" gate string on the Discovery Set PDP) — asking for a $50/yr relationship before the first bottle is bought.
8. **Announcement bar carries only one message** (launch news); the 10%-off email offer is buried in the footer and the free-shipping story is invisible until cart — the highest bar on the site does no acquisition work.
9. **~700 Rebuy references per page** suggests heavy third-party JS weight; *(page-speed impact unverified — live testing blocked)*.
10. **Aggressive Cloudflare bot-walling of even `/products.json`** — operationally it also blocks legitimate integrations/crawlers that rely on storefront JSON; the only verified live observation of this project.

## 9. Key Takeaways

Tactics most worth stealing for Sorella:

1. **Discovery Set with purchase credit as the quiz-replacement risk reversal:** $39 for 8×2mL with a $20 credit, badged "$20 CREDIT" on cards site-wide, with a 1-2-3 redemption explainer on the PDP. Net-$19 sampling that pre-commits the buyer to a full-size purchase.
2. **Three-tier size ladder on every scent** ($32 travel → $99 50mL → $139 100mL): a low-risk entry point, a value-anchored hero size, and an upgrade path — travel ≈ 32% of the 50mL price.
3. **Bundles with explicit, visible savings everywhere:** per-scent Duets, $68-vs-$78 compare-at duos/trios, a build-your-own "save $10" Custom Trio (Rebuy Bundle Builder) — all narrated through "layering" so multi-unit buying feels like fragrance advice.
4. **The cart drawer as a revenue surface:** free-shipping progress bar + cross-sells + a membership ad that hides itself for existing members (`isInveterateSubscriber()`).
5. **Paid membership instead of subscriptions:** $50/yr sold as a product with an itemized "$200+ value" table ($116 + $40 + $32 + $24 + exclusives) — loyalty as a profit center rather than margin-eroding subscribe-and-save.
6. **Reviews engineered for the category:** Okendo attribute sliders for **Longevity and Projection** plus thousands of reviews pushed into JSON-LD rich snippets — answering the online-perfume objection directly.
7. **Merchandised navigation:** shop by olfactive family AND by scent franchise, with featured offer cards and benefit copy inside the nav drawer itself; search pre-seeded with hero-scent "Popular Searches."
8. **Brand-safe urgency:** launch news (not discounts) in the announcement bar; clearance quarantined into a final-sale "Farewell Sale" nav item — up to 40% off without cheapening the core $99 line.
