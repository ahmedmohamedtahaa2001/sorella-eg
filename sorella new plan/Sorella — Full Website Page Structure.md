---

# Sorella — Full Website Page Structure

A complete sitemap of every page required to build the storefront, based on the Sorella Canonical Tags, Perfume Schema v2, and Data Audit. Each page lists its purpose, key components, and the data it draws from.

---

## 1. Core Shopping Pages

### 1.1 Homepage (`/`)

**Purpose:** Conversion engine — state the USP, build trust, personalize instantly.
**Sections:**

1. Hero — headline (core promise), subhead, dual CTA (Quiz / Shop Bestsellers)
2. USP strip — Honest Dupes, Feeling-not-just-notes, Layering-Ready, Longevity/Sillage transparency
3. **Weather-based recommendation section** — dynamic, pulls `season`/`fragranceFamily` tags matched to live weather/location, with manual season override
4. Fragrance Finder Quiz teaser
5. Bestsellers / Editor's picks carousel (with mini performance meters)
6. Dupe transparency spotlight (2-3 "Inspired By" products, similarity % shown)
7. Layering / "build your signature scent" visual section
8. Bundles / gifting carousel
9. Trust/brand snippet (short version of brand story)
10. Email capture / quiz-linked signup
11. Footer

### 1.2 Shop / All Products (`/shop`)

**Purpose:** Full catalog browse with faceted filtering.
**Components:**

- Filter sidebar: Season, Time of Day, Occasion, Mood, Fragrance Family, Gender Positioning, Concentration, Sillage, Price range
- Sort: Bestselling, Price, Newest
- Product grid (hero image, name, family, starting price, quick mood tags)
- Pagination / infinite scroll

### 1.3 Category / Collection Pages (`/collections/{slug}`)

**Purpose:** Curated groupings outside the tag system — e.g. New Arrivals, Bestsellers, Editor's Picks, Sale.
**Components:** Same grid as Shop, filtered to a manually curated or rule-based product set.

### 1.4 Product Detail Page — PDP (`/product/{sku-slug}`)

**Purpose:** The primary conversion unit. Every field maps to a schema field from the Perfume Schema v2.
**Sections (in order):**

1. Gallery — hero shot, lifestyle shot, person-wearing-it (x2), size comparison, texture/detail, ingredient close-ups
2. Product name, fragrance family, concentration, gender positioning
3. Value proposition (1-2 sentence emotional hook)
4. Price + size selector (30/50/100ml) with cost-per-spray and savings-vs-smallest-size calculated inline
5. Stock status per size
6. Add to cart / Buy now
7. **Olfactory Journey** — Top / Heart / Base notes, each ingredient paired with its mood
8. Overall mood tags (clickable → tag pages)
9. Full ingredient list + olfactive role + source type + allergen/sensitivity flags
10. Performance meters — longevity bar, sillage bar, best-worn-on-skin-type note
11. Brand story (80-150 words)
12. **Dupe / Inspired-By block** (if applicable) — inspired-by reference, similarity %, shared ingredients, deliberate differences, comparison-table asset
13. **Layering partners** — "Pairs beautifully with X" cards
14. Bundle membership callout (if part of a bundle)
15. "You May Also Like" — ingredient-DNA-based recommendations
16. Reviews (if in scope)
17. SEO meta title/description (not visible to user, but required per SKU)

### 1.5 Search Results (`/search?q=`)

**Purpose:** Query-matched product results with same filter/sort options as Shop.

---

## 2. Tag / Discovery Pages

### 2.1 Tag Hub (`/tags`)

**Purpose:** Central browse-all-tags page, organized by category tabs (Season, Time of Day, Occasion, Mood, Sillage, Concentration, Fragrance Family, Gender Positioning).
**Components:** Category tabs, tag chips/cards per category, each linking to its individual tag page.

### 2.2 Individual Tag Pages (`/tag/{slug}`)

**Purpose:** One page per canonical tag — SEO-friendly, content-rich, filtered product destination.
**Components:**

- Short client-facing brief (the `description` field, 1-2 sentences, Sorella brand voice)
- Product grid of every SKU carrying that tag
- Breadcrumb back to Tag Hub / parent category

**Full list of tag pages required:**

| Category | Tag pages |
| --- | --- |
| Season | Summer, Winter, Spring, Autumn, Spring/Autumn, All-Season |
| Time of Day | Day, Evening, Night, Day-to-Night |
| Occasion | Formal, Casual, Office, Date Night, Special Occasion, Wedding, Everyday, Party/Night Out, Travel, Gym/Active |
| Mood | Confident, Warm, Fresh, Calming, Seductive, Energizing, Elegant, Nocturnal, Romantic, Playful, Mysterious, Sophisticated, Bold, Comforting, Clean, Sensual |
| Sillage | Intimate, Moderate, Strong, Enormous |
| Concentration | Parfum/Extrait, Eau de Parfum (EDP), Eau de Toilette (EDT), Eau de Cologne (EDC), Eau Fraiche |
| Fragrance Family | Floral, Soft Floral, Floral Oriental, Soft Oriental, Oriental, Woody Oriental, Wood, Mossy Woods, Dry Woods, Citrus, Green, Water/Aquatic, Fruity, Aromatic Fougere, Gourmand, Chypre, Leather, Spicy, Powdery, Aldehydic |
| Gender Positioning | Masculine, Masculine-Leaning, Feminine, Feminine-Leaning, Unisex |

*(Note: `olfactiveRole` and `sourceType` remain tooltip/PDP-only attributes per the tags doc — no dedicated landing pages for now. `stockStatus` is never a content tag/page.)*

### 2.3 Dupe / "Inspired By" Index (`/inspired-by`)

**Purpose:** Central listing of every SKU positioned as a dupe, for the price-conscious/research-driven shopper segment.
**Components:** Grid of dupe SKUs with designer reference name + similarity % shown on each card.

### 2.4 Dupe Comparison View

**Purpose:** Side-by-side visual (shared ingredients, similarity %, deliberate differences) — lives as a PDP section (see 1.4.12) rather than a separate URL, unless a standalone comparison page is wanted for SEO (`/compare/{sku-slug}`).

---

## 3. Interactive Tools

### 3.1 Fragrance Finder Quiz (`/quiz`)

**Purpose:** Replaces the in-store sales assistant. 3-4 question flow (occasion, scent family preference, intensity preference).
**Components:** Progress indicator, single-question-per-screen flow, back navigation.

### 3.2 Quiz Results (`/quiz/results`)

**Purpose:** Personalized shortlist based on quiz answers, mapped via `quizAnswerMapping` tag field.
**Components:** 3-5 matched products, "retake quiz" option, email capture to save results.

---

## 4. Bundles & Upsell

### 4.1 Bundles Index (`/bundles`)

**Purpose:** Browse all bundle sets (e.g. Date Night Duo, Travel Starter Set).
**Components:** Bundle cards showing contents thumbnail, combined price, savings %.

### 4.2 Bundle Detail Page (`/bundle/{slug}`)

**Purpose:** Full bundle contents, combined price, individual SKU links, bundle shot image.

---

## 5. Cart & Checkout

### 5.1 Cart (`/cart`)

**Purpose:** Review selected items, adjust quantity/size, see savings/cost-per-spray reminders.

### 5.2 Checkout (`/checkout`)

**Purpose:** Shipping details → payment → review → place order. Multi-step or single-page depending on dev preference.

### 5.3 Order Confirmation (`/order-confirmation/{order-id}`)

**Purpose:** Order summary, estimated delivery, account creation prompt if guest checkout.

---

## 6. Account

### 6.1 Login / Register (`/login`, `/register`)

### 6.2 Account Dashboard (`/account`)

**Purpose:** Overview — recent orders, saved items, running-low reminders.

### 6.3 Order History (`/account/orders`)

### 6.4 Wishlist / Saved Items (`/account/wishlist`)

### 6.5 Replenishment Reminders view (`/account/reminders`)

**Purpose:** Surfaces the calculated `replenishmentEstimate` per past purchase — "You're likely running low on Velvet Amber Nights."

---

## 7. Brand & Trust

### 7.1 About / Brand Story (`/about`)

**Purpose:** Full brand narrative, mission, founding story.

### 7.2 Ingredients Philosophy (`/ingredients-philosophy`)

**Purpose:** General policy on natural vs. synthetic vs. nature-identical sourcing — distinct from per-product ingredient lists.

### 7.3 Allergen / Sensitivity Info (`/safety-and-sensitivity`)

**Purpose:** General disclosure policy — how Sorella flags sensitizers, what "contains" flags mean site-wide.

### 7.4 FAQ (`/faq`)

### 7.5 Shipping & Returns (`/shipping-returns`)

### 7.6 Contact (`/contact`)

### 7.7 Terms of Service (`/terms`)

### 7.8 Privacy Policy (`/privacy`)

---

## 8. Utility Pages

### 8.1 404 — Page Not Found

### 8.2 XML Sitemap (`/sitemap.xml`)

**Purpose:** SEO crawlability — auto-generated, includes all tag pages, PDPs, collections.

---

## Page Count Summary

| Section | Distinct page types | Notes |
| --- | --- | --- |
| Core Shopping | 5 | PDP is templated, repeats per SKU |
| Tag / Discovery | 2 templates + ~58 individual tag pages | Tag pages are templated, repeat per tag |
| Interactive Tools | 2 |  |
| Bundles | 2 templates | Bundle detail repeats per bundle |
| Cart & Checkout | 3 |  |
| Account | 5 |  |
| Brand & Trust | 8 |  |
| Utility | 2 |  |

**Total unique page templates: ~29**, with tag pages (~58), PDPs (1 per SKU), and bundle pages (1 per bundle) generated dynamically from templates rather than built individually.

---

## Open Questions for the Sorella Team

1. Should the **Tag Hub** be one page with category tabs, or should each category (season, mood, etc.) get its own index page?
2. Should **Bundles** be a top-level nav item, or nested under Shop?
3. Is a **"Coming Soon" teaser page** in scope now, or deferred (explicitly excluded from the tag dictionary per the canonical tags doc)?
4. Is a **Blog/Journal** wanted for SEO content marketing, or will organic search rely entirely on tag pages + PDPs?
5. Should the **Dupe Comparison** get its own standalone URL for SEO purposes, or stay as a PDP section only?