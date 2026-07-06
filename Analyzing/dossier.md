# Dossier — Store Analysis

**URL:** https://dossier.co/ · **Analyzed:** 2026-07-05 · **Method:** full catalog scrape (via backing store `13scents.myshopify.com`) + hands-on desktop/mobile browser walkthrough

---

## 1. Overview & Positioning

Dossier is a DTC fragrance brand selling "designer dupes" at mass-market prices, built on a **headless Shopify stack** (Hydrogen/Remix storefront on Oxygen, behind Cloudflare; the backing store is `13scents.myshopify.com`). The homepage is ~744 KB of fully server-side-rendered HTML — product cards, prices, and reviews are all in the initial payload for fast LCP and SEO.

- **Positioning:** "Made in France perfumes, fair-prices" / "Premium quality, not pricing" / "Fragrance for the 99%." Brand line: "THE PERFUME HOUSE FOR THE NEXT GENERATION — Premium-quality French fragrances. No excessive markups. Crafted with heart, not ego."
- **Two product lines:**
  - **Dossier Impressions** — designer-inspired dupes. The dupe target is literally stored in the product vendor field ("Inspired by MFK's Baccarat Rouge 540"), with ~130 distinct "Inspired by" vendors covering Chanel, Tom Ford (12+), Le Labo, Creed, Byredo, Kilian, YSL, Dior, etc.
  - **Dossier Originals** — 40 house scents, including celebrity collaborations (the mgk Collection / Machine Gun Kelly, Lauren, Allyiah).
- **Target customer:** shoppers who love designer fragrances but not designer prices — the entire site is built around the search intent "[designer fragrance] dupe."
- **Catalog:** 206 published products / 402 variants, USD. Product types: 71 unisex, 53 women, 26 men perfumes, plus candles, diffusers, duo/trio sets, and helper SKUs. 217 collection URLs in the sitemap.
- **Price range:** core 50 ml EDP at **$29 / $32 / $39 / $49** tiers (median variant price $39); 100 ml at $79; 11 ml travel at $10; free 3 ml samples; candles $39–54; sets up to $179; max SKU $377. All fragrances at 18% concentration (parfum-level), crafted in Grasse, France.
- **Retail proof:** NYC boutiques (Nolita + Queens), Walmart retail rollout (Jan 11, 2026 per PDP FAQ), a mobile app, and IRL pop-up events.

---

## 2. Core Selling Points

1. **Designer quality at 1/10 the price — anchored everywhere.** The single strongest device on the site: the PDP shows "Inspired by MFK's Baccarat Rouge 540 — Retail price $665" directly next to Dossier's $49/$79 price. The Details copy repeats the anchor ("$325 for 2.4oz… safely excludes it from impulse-buy territory"). Every collection card, homepage carousel card, and even cart line items carry the "Inspired by X's Y" line.
2. **Made in France / clean credentials.** "Crafted in Grasse, France — the perfume capital of the world," Vegan / Cruelty-free / Clean ingredients badges, full INCI list, PETA logo in footer, "HIGH STANDARDS & NON-TOXIC" homepage block. This is the counterweight to the "cheap dupe" perception.
3. **Dossier+ membership as the value ladder's apex.** $39.90/month (first trial month $3.95) converted to store credit; announcement bars sell "Up to 30% OFF + FREE shipping + FREE perfume + free 3ml samples." Member pricing is displayed on every product card and PDP ($71.10 vs $79).
4. **Risk reversal instead of paid sampling.** Free 3 ml sample line item in the cart, "FREE SAMPLE SHEET" floating pill (opens a "get up to 50% off" modal), free exchange (1x per order for everyone), 30-day window, $99 Discovery Set (10×3 ml) in recommendations.
5. **Social proof at extreme scale.** 4.3★ / 13,288 Okendo reviews on the hero SKU (Ambery Saffron), shown on homepage cards, collection cards, and the PDP; "over 6 million bottles sold worldwide" claim in the PDP gallery infographic.
6. **Fragrance expertise as merchandising.** Scent pyramids with explainer microcopy, scent-family taxonomy (warm/flowery/fresh/earthy…), "Best Layered With" curated pairings, a 7-step Scent Quiz, and an AI Scent Finder chat ("Alnée").

---

## 3. Homepage Structure & Conversion Flow

Section-by-section (desktop, top to bottom):

| # | Section | Conversion job |
|---|---|---|
| 1 | **Video hero — launch tease.** "COMING SOON — The Vanilla Fragrances You Never Saw Coming" + countdown timer + email input + **NOTIFY ME**; secondary "Shop ALL" link | Pre-launch list building off hype (celebrity-collab tease). Deliberately spends the top slot on email capture, not revenue |
| 2 | **Event invite.** "YOU'RE INVITED — Vanilla Expressions Pop-up," July 10 2026, The Grove LA, free scarf with vanilla purchase, "MARK YOUR CALENDAR" | Omnichannel proof + urgency/exclusivity |
| 3 | **"Our latest drops" carousel.** 6 cards, each with "Inspired by [Brand]'s [Fragrance]" line and a direct **ADD TO CART $32/$39/$49** button on the card | Newness + one-click conversion straight from the homepage |
| 4 | **Two-tile split.** "Dossier Impressions — Designer-inspired" vs "Dossier Originals — Exclusive fragrances" | Educates the two product lines, segments shoppers |
| 5 | **Shop-by-gender strip.** Women / Men / Unisex | Navigation shortcut |
| 6 | **"Featured perfumes crafted in France" carousel.** Bestsellers with star ratings + review counts on the card (Ambery Saffron 4.3★ 13,288 · $49; Ambery Vanilla 4.6★ 8,551 · $29; Floral Marshmallow 4.3★ 6,995 · $39) + ADD TO CART | Bestseller conversion backed by five-figure social proof |
| 7 | **Brand-story slider.** "THE PERFUME HOUSE FOR THE NEXT GENERATION" / "HIGH STANDARDS & NON-TOXIC" | Trust: Made-in-France, clean, anti-markup |
| 8 | **SEO link list.** ~18 "Inspired by [Baccarat Rouge 540 / Black Opium / Aventus…]" text links to PDPs | Captures "X dupe" search traffic — their primary acquisition channel |
| 9 | **Floating pill.** "FREE SAMPLE SHEET" (aria: "Open discount modal - Get up to 50% off") | Persistent offer/lead-capture re-entry point |
| 10 | **Footer.** Retailer logos, email capture, app download badges, PETA logo, quiz/AI-finder/scent-family links | Trust + retention channels |

**Why the ordering works:** it runs hype → instant purchase → education → bestsellers-with-proof → trust → SEO. Two full product carousels with on-card ADD TO CART mean a returning shopper can convert without ever leaving the homepage. The trade-off: the most valuable slot (hero) is currently a non-buyable launch tease — a deliberate list-building strategy, but a raw conversion sacrifice, made worse on mobile where the hero email field is hidden entirely.

Note: the announcement bar (Dossier+ offers) appears on PDP/collection pages, not the homepage itself.

---

## 4. Product Page Anatomy

Reference PDP: `/products/ambery-saffron` (bestseller, 13,288 reviews). Title tag is pure dupe-SEO: "Baccarat Rouge 540 Dupe Perfume inspired by MFK : Ambery Saffron."

**Above the fold:**
- **Announcement bar** rotating: "Free 3ml samples with Dossier+" / "Dossier+ Member: Up to 30% OFF + FREE shipping + FREE perfume."
- **Gallery:** vertical thumbnail stack, 7 slides — 3 bottle shots, an **infographic slide** (free returns with Dossier+, made in Grasse, "over 6 million bottles sold worldwide," long-lasting, up to 30% off for members), more bottle shots, 1 lifestyle shot. "Unisex" + "Bestseller" badges overlaid.
- **Title + rating:** H1, then 4.3★ "13,288" anchor-linked to #reviews.
- **Triple-stacked price anchoring** (the psychological core):
  1. Dual pricing: "members: $71.10" (Dossier+ logo) vs "Guest: $79" — makes the membership discount visible on every product.
  2. "Inspired by MFK's Baccarat Rouge 540" callout.
  3. "Retail price 665" — the designer original's price as the reference point. $79 vs $665 makes the purchase feel like a 90% saving rather than a $79 spend.
- **Size selector:** "50mL $49" / "100ml $79 [Best Value]." The URL auto-canonicalizes to `?Size=100ml`, defaulting shoppers to the larger $79 size.
- "Crafted in France" + "Scent Family: warm" chips near a single black "Add to Cart" pill.
- **No sticky add-to-cart bar on desktop or mobile** — verified at 2,000–2,500 px scroll. A significant gap given the page length (SEO essay + 13k reviews).

**Accordions (Scent Notes expanded by default):**
- *Scent Notes:* "This perfume is: Warm, a whiff of wealth"; main notes with ingredient images; top/heart/base pyramid with explainer microcopy ("The first notes you smell" / "The notes that linger all day"); full INCI; Vegan / Cruelty-free / Clean badges. Scent education reduces the buy-without-smelling anxiety.
- *About:* scent description, "Scent Intensity: Significant," "Concentration: 18%."
- *Shipping:* free with 2+ items; $3.95 standard under 2 items; $19 express 2-day.
- *Returns:* free exchange 1x/order for all; D+ members get 1 free return; non-members pay a $3.99/bottle return fee; 30 days.
- *FAQs:* longevity claim ("just like designer fragrances, in some cases even longer"), Walmart retail rollout, scent-quiz link.
- *Details:* ~800-word SEO essay telling the designer original's story, repeating the price anchor, with the legal hedge "We are not associated or affiliated with the brands mentioned here in any way."
- *Best Layered With:* 3 curated pairings labeled "Mutually Elevating" / "Complementary" / "Unlikely Pairings," **each with its own Add to Cart** — cross-sell reframed as perfumer expertise.

**Below:** "You Might Love" recommendations (4 cards with dual member/guest pricing, including the $99 Discovery Set), then the Okendo review widget, then the SEO "Inspired by" link list and the floating FREE SAMPLE SHEET pill.

**Subscriptions:** there is no classic product subscription. Instead, the Dossier+ membership is woven into every price display, gallery infographic, announcement bar, and the cart — it functions as the subscription/LTV engine.

**Sampling:** no purchasable sample on the PDP itself; sampling is handled via the free 3 ml Dossier+ sample, the free-sample-sheet modal, the $10 11 ml travel size, and the Discovery Set in recommendations.

---

## 5. Bundles, Offers & Pricing Strategy

**Price architecture** (from full variant data): $39 ×68 variants, $32 ×53, $49 ×50, $29 ×22, $38 ×15. The ladder of commitment:

> free 3 ml sample → $10 11 ml travel → $29–49 50 ml → $79 100 ml → $69–179 sets → $39.90/mo membership

**Bundles/sets:**
- Duos $32–78 ("Mutual Chemistry." $78, "Springtime Sweetness Duo" $32); Trios $117–127 ("Universal Crowd Pleasers." $127); mini trios $29 ("Big Scent Energy").
- **Discovery Set 10×3 ml $99** (10+6 version $179); Originals Trial Set $69; Advent Calendar $49.
- 2×50 ml variants directly on PDPs with bundle discount baked in.
- Helper SKUs: shipping protection $2.00–2.14, gift note $2.95, engraved cap $9, mystery perfume $49.

**Discount machinery:**
- **Sitewide 10% strikethrough** — nearly every variant carries compare-at logic ($49 → $44.10), and the discounted price ships in JSON-LD, so even Google results show the "deal."
- **Free shipping engineered as an AOV lever:** free only with 2+ items (~$70+ tiers), otherwise $3.95. The cart shows "ALMOST THERE! ADD #quantity TO UNLOCK FREE SHIPPING!" gamification.
- **Quantity-discount ladder in the cart drawer** (replacing a plain free-shipping bar): −10% at 1 item, free shipping at 2, −20% + gift at 3, −25% at 4, −30% at 5 — "only with Dossier+." It simultaneously drives multi-item orders AND membership sign-ups.
- **The cart drawer is a 3-step funnel:** "1 Your cart" (line item with dual pricing + free 3 ml sample slot) → "2 Pick the Way You Shop" (a **Membership vs Pay-as-Guest comparison table** — "Buy more, save more — Up to 30% OFF," "10% off always," "Free returns," "Your cart total: $71.10 vs $79" — with **membership pre-selected** and fine print "By selecting Dossier+, you are signing up for a recurring membership of $39.90/month (First trial month $3.95)… To opt out, select 'Pay as Guest'") → "3 Order Summary." The checkout button ("GO TO CHECKOUT $71.10") shows the member price with an animated odometer effect.
- **Cart cross-sell rail:** "You might like to add" — 5 cards with one-tap "ADD - $29/$39/$49."

**Why it works:** every price on the site is framed three ways at once — against the designer original ($665), against the guest price (member $71.10 vs $79), and against the quantity ladder (buy more, save up to 30%). Urgency is entirely economic (tier ladder), not fake scarcity. The membership pre-selection is a huge AOV/LTV lever but a borderline dark pattern (see Weak Points).

---

## 6. Reviews & Social Proof

- **Platform: Okendo** (primary; 34–47 references per page, server-side rendered into the HTML — reviews are crawlable). Traces of Junip (legacy). Yotpo, Judge.me, Loox, Stamped: not found.
- **Volume on hero SKUs:** Ambery Saffron 4.3★ / **13,288** reviews; Ambery Vanilla 4.6★ / 8,551; Floral Marshmallow 4.3★ / 6,995; Woody Sandalwood 4.3★ / 4,868.
- **Widget features:** big "4.3" summary + "Based on 13,288 reviews," Reviews/Questions tabs (10 questions), Filters button, "Write a Review," sort dropdown including "Photos & Videos," "Verified Buyer" and "Verified by Shop app" badges, helpful votes, and **brand replies from "Dossier Perfumes"** (emoji-toned, same-day) on reviews.
- **Where social proof appears across the funnel:** star rating + review count on homepage carousel cards, on every collection card, under the PDP H1 (anchor-linked to #reviews), and "over 6 million bottles sold" in the PDP gallery infographic. Retail proof (Walmart, "Find us at these retailers" footer logos, NYC boutiques) and the PETA logo add institutional trust. There is also a dedicated Testimonials page in the footer.
- **Caveats:** default review sort is **"Highest Rating"** (flattering but arguably manipulative) and no star-distribution histogram is shown in the default view.

---

## 7. Navigation, UX & Mobile

**Header/nav (desktop):** fixed slim bar — logo, search, mega-menu, cart with count. Mega-menu: PERFUMES (Shop All / Impressions [100ML, Extreme Editions] / Originals with 13 named collections incl. celebrity collabs) · THE EDITS (Bestsellers, New Arrivals, Gift Sets) · SHOP BY GENDER · DISCOVER (Layering, six Scent Families) · BY THEME (Best Offers, Event Perfumes) · HOME SCENTS · **AI Scent Finder** (a tool as a top-level nav item) · ABOUT (Dossier+ Membership, Refer A Friend, Store Locator).

**Collection page** (`/collections/all-perfumes`, "162 Products"):
- Sub-nav tabs: All Perfumes / Impressions / Originals / Gift Sets / Home Scents / Bestsellers / New Arrivals.
- Toolbar: SORT & FILTER, predictive search ("Search scents, brands, ingredients"), and quick filters for **Gender, Scent family, Inspired-by Brands, Collections** — "Inspired-by Brands" as a filter dimension is uniquely dupe-native.
- **Inline promo cards inside the product grid** (first row): editorial "NEW" cards with "Shop Now" for launches.
- Card anatomy: image, gender badge, name, scent-family tag ("warm"/"flowery"), stars + review count, "Inspired by X's Y" line, dual member/guest pricing. Notably **no quick-add on collection cards** (unlike homepage carousels) — click-through required. Card links carry `?Size=100ml` presets.
- "Load more products" pagination.

**SEO surface:** 217 collections including 50+ `sbt-*` shop-by-theme SEO collections (sbt-wedding-perfumes, sbt-perfumes-for-work, sbt-strong-perfumes…), 13 scent-family education pages, dupe-keyword PDP titles, and 800-word designer-story essays per PDP. Live A/B test pages exist in the sitemap (s-test, returns-and-exchanges-test).

**Guided discovery:** 7-step Scent Quiz (searchable picker of ~90 designer fragrances → maps your favorite to its Dossier dupe → **email-gated results**: "Enter your email to discover you new favorite perfume" + "Generate results," no skip) and the AI Scent Finder chat with suggestion chips ("Smell like Tom Ford's Tobacco Vanille") with no email gate.

**Mobile (390×844):**
- Fixed 56 px top bar; hamburger opens a full-screen menu with **AI SCENT FINDER at top level**, a "Your benefits… with Dossier+" block, and app-download prompt.
- **Cart icon links to the /cart page instead of opening the drawer.**
- Hero email-capture input is hidden on mobile (only "Shop ALL" renders).
- The floating "FREE SAMPLE SHEET" pill is absent on mobile.
- **No sticky add-to-cart on the mobile PDP** (verified: zero fixed/sticky CTA containers at 2,500 px scroll) despite extremely long pages.

**Tech stack:** Klaviyo (email), Postscript (SMS), Subscribfy (membership), Consentmo CMP, GTM + Facebook + TikTok pixels, ReturnLogic + ReturnGO plus a custom exchange flow. Most CRO logic (cart funnel, progress bar) is custom-built in the headless storefront.

---

## 8. Weak Points

1. **No sticky add-to-cart anywhere** — desktop or mobile — despite PDPs that stack an 800-word SEO essay and 13k reviews. Once a shopper scrolls into the essay or reviews, the buy button is gone. This is the single most obvious conversion leak.
2. **Membership pre-selection is a dark-pattern risk.** The cart defaults to Dossier+ ($39.90/month recurring, disclosed in fine print: "To opt out, select 'Pay as Guest'"), and the checkout button shows the member price. Great short-term AOV; high chargeback/refund/trust risk and likely regulatory exposure.
3. **PDP defaults to the $79 100 ml size** (`?Size=100ml` auto-canonicalization, and collection card links carry the same preset) — maximizes AOV but raises the entry price against the brand's own "$29 fair price" promise.
4. **Review presentation is skewed:** default sort "Highest Rating," no star-distribution histogram. Sophisticated shoppers will notice.
5. **Quiz hard-gates results behind email with no skip** — captures leads but bounces high-intent shoppers who just want the recommendation.
6. **Mobile loses key elements:** hero email field hidden, floating FREE SAMPLE SHEET pill absent, cart icon goes to a full /cart page instead of the drawer (extra navigation step in the highest-intent moment).
7. **Script bloat:** 36 console errors on the homepage, 108 on the collection page (mostly tracking scripts); pages take several seconds to settle. Site functioned but feels heavy.
8. **Interruptive popup timing:** a timed "Love discovering new fragrances?" popup (CLAIM NOW / NO THANKS) fired ~90 s into the PDP session and blocked a first add-to-cart click.
9. **OOS product inside an upsell module:** one "Best Layered With" pairing (Ambery Vetiver) showed "Notify Me" — a dead end in a conversion slot.
10. **Hero slot spends prime real estate on a non-buyable product** (launch email capture). Deliberate, but a measurable conversion trade-off, especially with the email field missing on mobile.

---

## 9. Key Takeaways

1. **Triple-stack the price anchor.** Dossier never shows a price alone: designer retail ($665) vs guest price ($79) vs member price ($71.10) on every PDP and card. Anchoring is the conversion engine — build the comparison into the price display itself.
2. **Put ADD TO CART on homepage/carousel cards** with a one-line persuasion hook ("Inspired by X's Y" in their case; a scent-benefit line in Sorella's). Dossier converts directly from the homepage; collection cards without quick-add are their own inconsistency to avoid.
3. **Engineer free shipping as an AOV ladder, not a giveaway.** Free only at 2+ items ($3.95 otherwise) + a cart progress/discount ladder (−10% at 1 item up to −30% at 5) turns the cart drawer into an upsell machine with purely economic urgency.
4. **Reframe cross-sell as expertise.** "Best Layered With" with relationship labels ("Mutually Elevating" / "Complementary" / "Unlikely Pairings"), each with its own ATC, sells a second bottle as scent-craft rather than as an upsell. Fragrance-native and highly copyable.
5. **Risk reversal beats paid samples.** Free 3 ml sample in cart, free exchanges for everyone, a $10 travel size, and a Discovery Set cover the "can't smell it online" objection at every price point.
6. **Social proof must travel.** Review stars + counts (13,288!) appear on homepage cards, collection cards, and the PDP — SSR'd so they're also crawlable — plus brand replies to reviews. But display them honestly: skip Dossier's "Highest Rating" default sort and missing histogram.
7. **Add the sticky ATC Dossier is missing.** Long, content-rich PDPs (scent pyramid, essays, reviews) are great for SEO and education, but they demand a sticky add-to-cart bar — Dossier's absence of one on both desktop and mobile is their clearest fixable leak.
8. **Membership/loyalty can be the pricing layer** (member vs guest price on every card is powerful), but make enrollment an explicit opt-in — never a pre-selected recurring charge in cart fine print.
