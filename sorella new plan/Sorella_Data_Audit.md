# SORELLA — Fragrance Data & Merchandising Audit

> A full data-architecture brief for the storefront rebuild — why it works, what data we need, and in what format.
> 

> Prepared for the Sorella team · July 2026
> 

## Executive Summary

The current storefront sells perfume the way a hardware store sells screws: name, size, price. That works for commodities; it does not work for fragrance, which is a purchase driven almost entirely by feeling, memory, and trust — not specification.

This audit lays out a complete data model for Sorella's catalog that treats every perfume as a **Sensory Experience** with a story, a mood, an occasion, and a set of relationships to other products (layering partners, ingredient siblings, bundle mates, and — where relevant — the international fragrance it is inspired by).

Below, each idea is explained in plain terms: what problem it solves, why it moves the needle commercially (conversion, average order value, trust, returns), and exactly what data and images we need from the brand to build it. The goal of this document is to walk away with everything required to start development without a single follow-up round of "what do you mean by that."

---

## 1. Why This Data Model Wins — Idea by Idea

- 1.1 The Olfactory Journey (First / Second / Third Impression)
    
    Instead of one generic scent description, each perfume is broken into three acts: **Top Notes** (the first 15 minutes), **Heart Notes** (the true character, once it settles), and **Base Notes** (the dry-down that lasts into the evening and clings to clothing).
    
    This mirrors how perfumers themselves talk about scent, so it reads as expertise rather than marketing copy — and it answers the single biggest online-shopping anxiety: *"what will this actually smell like on me, over time?"* It also gives us three separate content hooks per product instead of one, which is more surface area for SEO and social captions.
    
- 1.2 Ingredients Mapped to Feeling, Not Just Named
    
    Listing "bergamot, oud, vanilla" means nothing to 90% of shoppers. Pairing each ingredient with the mood it produces (calming, energizing, confidence-boosting, seductive) turns a chemistry list into a decision-making tool. This is what lets us build the Fragrance Finder quiz and the ingredient-based recommendation engine described below — it's the same underlying field, reused three different ways.
    
- 1.3 Dupe Transparency ("Inspired By")
    
    A large share of Sorella's buyers are already searching for affordable alternatives to expensive designer perfumes. Hiding that fact doesn't stop them from knowing it — it just makes them distrust the brand once they find out elsewhere (a review, a TikTok, a friend).
    
    Stating it openly, with an honest similarity percentage and a short note on what was changed and why, converts a potentially damaging comparison into the brand's biggest trust asset. The customer's core question is always *"how close is this really,"* and answering it removes the last-mile hesitation before checkout.
    
- 1.4 Layering Engine
    
    Perfume layering (combining two scents to create a signature blend) is a strong existing behavior among fragrance enthusiasts. Surfacing "this pairs beautifully with X" turns a single-item browse into a two-item cart, and it differentiates Sorella from any competitor that only sells items in isolation.
    
- 1.5 Ingredient-Based "You May Also Like"
    
    Category-based recommendations ("more from Eau de Parfum") are lazy and often wrong — a woody-amber lover doesn't want "more florals" just because they're in the same collection. Matching on shared ingredient DNA produces recommendations that actually fit the customer's demonstrated taste, which lifts click-through on related products and reduces bounce.
    
- 1.6 Size & Price Matrix Built for Upsell
    
    Presenting 30ml / 50ml / 100ml side by side, with the price gap deliberately narrow between the middle and large size, nudges customers toward the bigger bottle without any pressure tactic — the math simply favors it. This is standard high-margin retail pricing psychology, applied properly to fragrance for the first time on this site.
    
- 1.7 Bundling Architecture
    
    Bundles (a full bottle + a travel size, or two perfumes designed to be worn together) raise average order value and give Sorella a way to move slower-selling SKUs by pairing them with bestsellers. Bundles also make excellent gifting products, which matters heavily around seasonal peaks.
    
- 1.8 Occasion & Season Tagging
    
    Not every scent works at every time. Tagging each fragrance by season (summer/winter), time of day (day/evening), and setting (formal/casual) lets customers filter by their actual context instead of scrolling the entire catalog. This shortens the path to purchase and reduces decision fatigue — a major cause of cart abandonment in fragrance specifically, where choice overload is worse than in most categories.
    
- 1.9 Fragrance Finder Quiz
    
    Because online shoppers cannot smell the product, a short 3–4 question quiz (occasion, scent family preference, intensity preference) replaces the in-store sales assistant. It personalizes the experience, generates a qualified shortlist instead of an overwhelming grid, and produces first-party preference data Sorella can reuse for email marketing and retargeting.
    
- 1.10 Longevity & Sillage Meters
    
    The two most common questions any perfume customer has — "how long does it last" and "does it project strongly or stay close to skin" — are usually buried in reviews, if answered at all. Simple visual meters on the product page (a longevity bar showing hours, a sillage bar showing projection strength) answer both instantly, reduce support questions, and reduce returns caused by mismatched expectations.
    
- 1.11 Cost-Per-Wear / Value Indicator
    
    Customers often under-value the larger bottle because the sticker price feels bigger, even when it's the better deal per spray. A small calculated line under the price ("the 100ml saves you 35% and costs less than X per spray") reframes the decision around value instead of raw price — a proven lever for trading customers up in size without discounting the brand.
    
- 1.12 Smaller-Size Recommendation for Uncertain Buyers
    
    There is no free sample program in this model. Instead, when a customer shows hesitation (spends time comparing, arrives from a "dupe" search, or answers the quiz with low confidence), the smallest available bottle size for that SKU is surfaced as the safer first purchase — with the size/price matrix from 1.6 making the upgrade path to a larger bottle obvious later. This achieves the same risk-reduction goal as sampling without giving away product margin.
    
- 1.13 Weather-Based Recommendations
    
    Scent preference shifts strongly with weather — lighter and fresher in heat, warmer and deeper in cold. Adjusting the homepage banner and featured picks based on the customer's current season (or live local weather) keeps the storefront feeling current and relevant every time someone visits, rather than static.
    
- 1.14 Dupe vs. Original Comparison Table
    
    For customers actively comparing Sorella's version against the designer original, a clear side-by-side (shared ingredients, similarity percentage, and the specific, deliberate change made) turns curiosity into confidence. This is the deepest layer of the transparency strategy in 1.3, aimed at the most price-conscious, most research-driven segment of the audience.
    
- 1.15 Canonical Tag Dictionary
    
    Mood, occasion, and season tags only work as filters and quiz logic if they come from a fixed, locked list rather than free text. Without this, five different people entering data will tag the same idea inconsistently — "Evening" vs "Night" vs "Nighttime" — and the filters, quiz, and recommendation engine will silently miss products that should have matched. This is a one-time setup cost that prevents an invisible, hard-to-diagnose bug later.
    
- 1.16 Replenishment Signal
    
    Since the data model already captures longevity (hours per wear) and bottle size (total sprays), we can calculate roughly when a customer is likely to run out and trigger a reorder reminder email around that date. This turns the longevity meter — currently just a product-page fact — into a retention and repeat-purchase tool at effectively no extra data-entry cost.
    
- 1.17 Allergen / Sensitivity Disclosure
    
    A short, honest "contains" flag for ingredients known to cause skin sensitivity (certain citrus oils, some musks) protects customers and reduces returns caused by reactions. It also reinforces the same trust the dupe-transparency strategy is built on — Sorella becomes the brand that tells customers what they need to know before they buy, not after.
    
- 1.18 SEO & Alt-Text Fields
    
    Meta titles, meta descriptions, and image alt-text are cheap to capture per product now and expensive to retrofit across a full live catalog later. Building these fields into the schema from day one means every new product launches search-ready instead of needing a second pass.
    

---

## 2. Complete Product Data Schema

Every field below should exist for every SKU in the catalog. Fields marked with **\*** are required before a product can go live; the rest can be filled in progressively but should exist as empty fields in the structure from day one.

- 2.1 Identity & Positioning
    
    
    | Field | What it captures | Format | Example |
    | --- | --- | --- | --- |
    | Product Name* | Official name as it will appear on the storefront | Text | Velvet Amber Nights |
    | SKU / Internal Code* | Unique identifier for inventory and orders | Text/Code | SOR-EDP-014 |
    | Fragrance Family* | Primary olfactive category | Single select | Oriental Woody |
    | Value Proposition* | One sentence on what the perfume gives the wearer emotionally (confidence, allure, calm, presence) | Short text (1–2 sentences) | "The scent you wear when you want to be remembered, not just noticed." |
    | Brand Story / Positioning | Longer narrative — who this was made for and why | Paragraph (80–150 words) | — |
    | Gender Positioning | Intended audience framing | Single select | Unisex / Feminine-leaning / Masculine-leaning |
- 2.2 The Olfactory Journey
    
    
    | Field | What it captures | Format | Example |
    | --- | --- | --- | --- |
    | Top Notes (First Impression)* | Ingredients present in the opening 15 minutes, plus the feeling they create | List of ingredient + mood tag pairs | Bergamot (energizing), Pink Pepper (bold) |
    | Heart Notes (Second Impression)* | The core character once it settles | List of ingredient + mood tag pairs | Jasmine (sensual), Iris (elegant) |
    | Base Notes (Third Impression)* | The dry-down that lasts and lingers on fabric | List of ingredient + mood tag pairs | Amber (warm), Sandalwood (grounding), Musk (intimate) |
    | Overall Mood Tags | 3–5 mood words summarizing the whole scent | Tag list | Confident, Warm, Nocturnal |
- 2.3 Ingredients & Effects (Full List)
    
    
    | Field | What it captures | Format | Example |
    | --- | --- | --- | --- |
    | Ingredient Name* | Every raw ingredient used, not just headline notes | Text | Cedarwood |
    | Olfactive Role | Which layer it belongs to | Single select | Base |
    | Emotional/Physical Effect* | The mood or association tied to this ingredient | Short text | Grounding, woody warmth |
    | Natural or Synthetic | Sourcing transparency | Single select | Natural extract |
    | Allergen / Sensitivity Flag* | Known skin-sensitivity risk, disclosed honestly | Yes/No + short note | Yes — contains citrus oil, may cause sun sensitivity |
- 2.4 Dupe / Inspired-By Data (where applicable)
    
    
    | Field | What it captures | Format | Example |
    | --- | --- | --- | --- |
    | Inspired-By Reference | The designer perfume this SKU is positioned against, if any | Text | Inspired by Tom Ford Tobacco Vanille |
    | Similarity Percentage | Honest estimate of scent similarity | Percentage | 92% |
    | Shared Ingredients | What overlaps between the two | List | Tobacco leaf, vanilla, spice |
    | Deliberate Differences | What was intentionally changed and why (longevity, skin-safety, regional preference, cost) | Short paragraph | Reduced spice sharpness for warmer climate wear; added extra amber for longer dry-down |
- 2.5 Sizes, Pricing & Upsell Data
    
    
    | Field | What it captures | Format | Example |
    | --- | --- | --- | --- |
    | Size Variant* | Each bottle size sold | 30ml / 50ml / 100ml etc. | 50ml |
    | Price per Size* | Retail price for that size | Currency | EGP 950 |
    | Cost-per-Spray / per-ml (calculated) | Used to power the value-indicator messaging | Calculated field | EGP 1.9 per spray |
    | Savings vs. Smallest Size (calculated) | Percentage saved by buying the larger size | Calculated % | 35% savings on 100ml vs 30ml |
    | Stock Status per Size* | Needed to avoid selling out silently | In stock / Low / Sold out | In stock |
- 2.6 Performance Meters
    
    
    | Field | What it captures | Format | Example |
    | --- | --- | --- | --- |
    | Longevity Rating* | How many hours the scent lasts on skin | Scale (e.g. 1–10 or hour range) | 7–8 hours |
    | Sillage / Projection Rating* | How far the scent projects from the skin | Scale: Intimate / Moderate / Strong | Strong |
    | Best Worn On Skin Type Notes (optional) | If longevity varies noticeably by skin type | Short note | — |
    | Estimated Sprays per Bottle* | Used to calculate replenishment timing | Number | ~200 sprays (50ml) |
    | Replenishment Estimate (calculated) | Projected run-out date based on sprays/bottle and typical wear frequency, used to trigger reorder emails | Calculated date/interval | Reorder reminder at ~6 weeks |
- 2.7 Occasion, Season & Discovery Tags
    
    
    | Field | What it captures | Format | Example |
    | --- | --- | --- | --- |
    | Season Tag* | When the scent performs best | Multi-select | Winter, Evening |
    | Time of Day Tag* | Day vs evening positioning | Multi-select | Evening |
    | Occasion Tag* | Setting it suits | Multi-select | Formal, Date Night |
    | Quiz Answer Mapping | Which quiz answers should surface this product (scent family, mood, intensity) | Tag mapping | Woody + Confident + Strong |
- 2.8 Relationship Data (Layering, Bundles, Recommendations)
    
    
    | Field | What it captures | Format | Example |
    | --- | --- | --- | --- |
    | Layering Partners | Other SKUs this pairs well with, and the resulting effect | List of product refs + short note | Pairs with Citrus Bloom for a brighter daytime version |
    | Bundle Membership | Which existing or new bundles include this SKU | List of bundle names | "Date Night Duo", "Travel Starter Set" |
    | Related-by-Ingredient Pool | Shared key ingredients used to drive You May Also Like | Auto-derived from ingredient list, or manually curated overrides | Shares Amber + Sandalwood with 'Golden Hour' |
- 2.9 SEO & Metadata
    
    
    | Field | What it captures | Format | Example |
    | --- | --- | --- | --- |
    | Meta Title* | Search-engine page title | Text (≤60 characters) | Velvet Amber Nights - Oriental Woody EDP \ |
    | Meta Description* | Search-engine snippet | Text (≤155 characters) | A warm oriental woody scent built for evenings you want to be remembered. Shop 30/50/100ml. |
    | Image Alt-Text* | Accessibility + SEO text per image | Short text per image | Sorella Velvet Amber Nights 50ml bottle on parchment background |
- 2.10 Canonical Tag Dictionary (Locked Values)
    
    The fields below must be entered from this fixed list only — no free text — so the filters, quiz, and recommendation logic never silently miss a product due to inconsistent wording.
    
    | Tag Category | Locked Allowed Values |
    | --- | --- |
    | Season Tag | Summer, Winter, Spring/Autumn (Transitional), All-Season |
    | Time of Day Tag | Day, Evening, Day-to-Night |
    | Occasion Tag | Formal, Casual, Date Night, Office, Special Occasion |
    | Mood Tag | Confident, Warm, Fresh, Calming, Seductive, Energizing, Elegant, Nocturnal |
    
    New values can be added to this dictionary over time, but only as a deliberate decision — never entered ad hoc on a single product page.
    

---

## 3. Required Images Per Product

Fragrance is sold on feeling, so photography needs to do more work than a single product-on-white shot. For every SKU we need:

1. **Hero bottle shot** — clean, on-white or on-brand background, front-facing label fully legible. Used everywhere: catalog grid, product page header, search results.
2. **Lifestyle / mood shot** — the bottle styled in a scene that reflects its mood tags (e.g. warm evening tablescape for a nocturnal oriental, bright linen and citrus for a summer fresh scent). This is what sells the "feeling" from section 1.1.
3. **Person-wearing-it shots (2 images)** — a model applying or wearing the perfume, styled to match the mood tags (e.g. getting ready for an evening out for a nocturnal scent, bright outdoor moment for a fresh summer scent). These sell the emotional payoff directly and work well as quiz-result and social/ad creative.
4. **Ingredient close-ups** — 3–5 evocative images representing the top/heart/base note ingredients (a vanilla pod, raw amber resin, cedar shavings). These illustrate the Olfactory Journey section on the product page.
5. **Size comparison shot** — all available sizes photographed together to scale, supporting the size/price matrix.
6. **Texture / detail shot** — cap, glass, or box detail, for perceived-quality and zoom-in views.
7. **Bundle shot (where applicable)** — the full bundle contents styled together, if this SKU belongs to a bundle.
8. **Comparison-table asset (dupe SKUs only)** — a simple side-by-side graphic or icon set used to visualize the similarity percentage and shared ingredients from section 2.4.

> **Minimum spec:** 2000px on the longest side, consistent lighting/background style across the whole catalog so the grid feels unified, and a consistent aspect ratio (recommend 4:5 for product cards, 16:9 for lifestyle/banner use).
> 

---

## 4. What We Need From You to Start

To begin building immediately, please return the following for each existing SKU (a shared spreadsheet using the fields in Section 2 as columns is the fastest format for us to ingest):

1. Final product name, SKU code, and fragrance family for every item currently sold
2. Full top/heart/base note breakdown per perfume — even a rough first pass is fine, we can help refine the mood-word pairing
3. A complete ingredient list per perfume (not just headline notes) with natural/synthetic sourcing where known
4. For any perfume positioned as a dupe: the designer reference, and your honest estimate of similarity plus what was intentionally changed
5. All current sizes and prices per SKU
6. Any existing data or brand instinct on longevity and projection per perfume (we can also help structure a simple internal testing process if this doesn't exist yet)
7. Any known or intended layering pairings between existing perfumes
8. Any bundles you already sell or want to introduce
9. Any known skin-sensitivity concerns per perfume, even informal customer feedback you've already heard
10. Draft or approved copy for meta titles/descriptions per product, if you have brand guidelines for this — otherwise we can draft them for your review
11. Raw photography assets per the list in Section 3 (including the two person-wearing-it shots per product) — or confirmation that a photoshoot needs to be scheduled

Once this is in hand, we can populate the full schema in Section 2 and move straight into building the storefront components (product page, quiz, comparison tables, and recommendation logic) against real data rather than placeholders.