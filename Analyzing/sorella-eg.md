# Sorella (Egypt) — Store Analysis

**URL:** https://sorella-eg.com/ · **Platform:** Shopify (1s9kbd-53.myshopify.com) · **Theme:** Shrine v1.3.0 (paid CRO theme) · **Currency:** EGP · **Built by:** agency "Wema solutions"
**Analyzed:** 2026-07-05 (full catalog scrape + live desktop/mobile browser walkthrough)

> Note: the live site intermittently returns Shopify 503 error pages (~every other request needed 1–2 retries during scraping). This is origin instability, not bot-blocking, and is a real availability/revenue issue independent of everything below.

---

## 1. Overview & Positioning

Sorella ("sister" in Italian) is a two-sister Egyptian fragrance brand — "We're two sisters… bring people closer together through the power of scent" (About page) — with the tagline **"From our bond to your senses."** It sells original gourmand/dessert/beachy feminine scents with heavy Egyptian-local flavor: perfumes literally named **بسبوسه (Basbousa)** ("smells like basbousa, the Ramadan dessert we all love"), **ذهب (Dahab)**, and **عود Leila**, alongside Wifey, Sundae, Fluffy Mallow, Salted Vanilla, Coco Kiss, Baklava, Bordeaux, and Tan Line. Copy is vibe-driven ("hot girl on vacation energy").

- **Audience:** young Egyptian women — testimonials are in Franco-Arabic ("btesbat awiii", "fedlet sabta tool el yoom"), socials are Instagram + TikTok (@sorella.fragrances).
- **Not marketed as dupes**, though at least one customer quote treats a scent that way ("Bordeaux zay el original bezabt" — "exactly like the original"). The site never uses inspired-by framing.
- **Catalog:** 93 published products (collections/all claims 107). The same scent is sold in up to 4 formats as *separate products*, not variants:
  - EDP sprays: 50ml = **850 EGP**, 30ml = **640 EGP**
  - 5ml testers = **80–90 EGP** (27-product tester collection)
  - Perfume oils 8ml = **380 EGP** (premium oils 400–480)
  - Musks 6ml = **300 EGP** (10 scents: Powder, Ocean, Berries, Watermelon, etc.)
- **Price range:** 80–2,890 EGP; median variant price 640 EGP. Bundles run 900–2,890 EGP.
- **Data hygiene is poor:** 89 of 93 products have 0–1 image; duplicate products (two "Sweet oud perfume oil" at 380 vs 480); handles like `untitled-feb24_15-41` (Oud Royale) and `pineapple-musk-🍍`; mixed "50 ML"/"50ml" variant labels; empty `product_type` on every product; duplicate collections (perfume-oil 19 vs perfume-oils 17) and empty ones (the-most-loved 0, new-fragrances 0).

## 2. Core Selling Points

1. **Free 5ml perfume over 1,100 LE** — the store's core offer. Communicated in the sitewide announcement bar ("Get A Free 5ml perfume for orders over 1,100LE") and, far more effectively, in the cart drawer (progress bar + gift picker, see §5). It's the only offer messaging anywhere above the cart.
2. **The sister-founder story / Egyptian identity** — carried by the brand name, the marquee tagline, the About page, Arabic product names (بسبوسه, ذهب), and Franco-Arabic testimonial copy. Emotionally strong, but it never intersects with a purchase path (the About story isn't on the homepage or PDPs).
3. **Original local gourmand scents at accessible prices** — implied by the naming and 640–850 EGP pricing, but nowhere stated explicitly. There is no "why Sorella" section, no press, no UGC.
4. **Longevity/performance** — claimed only by customers, in the testimonial carousel ("it lasted on el lebs for 3 days", "fedlet sabta tool el yoom"). The site itself makes no longevity claims on PDPs.
5. **10% off first order** — theme-native email-capture promo popup that reveals a discount code (present in scraped homepage markup; the live walkthrough saw no popup fire, so its live status is unverified).
6. **Cheap trial path (85 EGP testers)** — exists as a full 27-product collection but is never framed as risk-reversal, and is never linked from full-size PDPs.

The pattern: Sorella's real selling points (bond story, performance, dupe-adjacent quality, cheap trial) live in customers' mouths and buried collections — the site's own surfaces barely articulate any of them.

## 3. Homepage Structure & Conversion Flow

The live homepage `<main>` contains only **three sections** (total body height ~2,631px):

| # | Section | Conversion job | Verdict |
|---|---------|----------------|---------|
| 0 | Announcement bar: "Get A Free 5ml perfume for orders over 1,100LE" | Offer/threshold seeding | Works — the single strongest line on the page. Static text, not a link, no rotation. |
| 0b | Header: Home, Products ▾, Collections ▾, Bundles, About Sorella, Contact; centered logo; Search/Log in/Cart | Wayfinding | Fine; dropdowns cover For Her/For Him/Unisex/Perfume oil/Musks/5 ML Testers + seasonal collections. |
| 1 | Text marquee "hero" (~224px): scrolling "Sorella / From our bond to your senses" | Brand hook | Fails as a hero: no imagery, no CTA, no product. A visitor lands on a scrolling line of text. |
| 2 | "Collections" grid (~1,177px): 6 image cards — Bundles, Perfume oil, Ramadan Specials, For Her, For Him, Unisex | Segmentation/navigation | Reasonable job, but it's the *only* path forward, and "Ramadan Specials" is still featured in July (stale seasonal content). |
| 3 | Testimonial carousel (~549px): "Our customers tell it better than we do!", "Excellent 5 / 5" badge, 5 unique Franco-Arabic quotes looped | Social proof | Authentic voice, but only 5 quotes repeated to fill the carousel, and the **"View All" link has an empty href — dead link.** |
| — | Footer: menu + policies, newsletter "Subscribe to our e-Mail List!" (no incentive), IG/TikTok | Capture/trust | Footer-only email capture, no incentive stated. No payment icons or trust badges. |

**The core flow problem: zero products are shoppable from the homepage.** No featured/bestseller carousel, no bundle merchandising, no hero CTA, no education, no urgency, no press/UGC. The ordering (brand → segment → proof) would be defensible *if* a product section existed between segmentation and proof; as-is, every visitor is forced through a collection page to see a single product. The homepage also has **no meta description** (title is literally "Home – Sorella") and throws **3 JS console errors** on load.

Notably, the repo's working theme contains richer sections (bento collections, feature trio, product carousel, quick-buy modal) that are **not deployed** — the live site is drastically thinner than what's already built.

## 4. Product Page Anatomy

Audited on /products/baklava (a bestseller named in testimonials), cross-checked against best-sellers, salted-vanilla, wifey, bordeaux PDPs:

- **Gallery:** one product image, list-style gallery with "Open media 1 in modal" zoom. No lifestyle shots, no video, no notes infographic. This is catalog-wide: 96% of products have a single photo.
- **Rating/stars:** none. No review stars or count anywhere on the PDP; JSON-LD has price/availability but **no aggregateRating** (so no stars in Google results either).
- **Price anchoring:** "Regular price LE 850.00" — no compare-at strike-through on regular PDPs, no "inspired by X" framing. The anchoring psychology customers already apply themselves ("Bordeaux zay el original bezabt") is left entirely on the table.
- **Variants:** Size radio pills 50ml (LE 850, default) / 30ml (LE 640). Price updates on selection and the URL rewrites to `?variant=`.
- **Samples as risk reversal:** absent. "Baklava tester" (LE 85) exists as a separate product with its own PDP (currently sold out) — **no cross-link from the parent PDP.** Given the no-returns policy (§8), the tester is the store's only real risk-reversal mechanism, and it's invisible at the decision point.
- **Subscriptions:** none (no selling plans in PDP markup).
- **Cross-sells:** none — no "pairs well with", no frequently-bought-together, no related/recently-viewed. Shrine's cart-upsell and quantity-break features are present in the theme but unused.
- **Scent education:** on Baklava, two persona lines ("A playful, carefree spirit…", "Perfect for casual day outings, brunch with friends, or a relaxed date"). No top/heart/base notes, no longevity/sillage, no ingredients, no accordions. (Some scraped PDPs have longer "What you'll smell / Notes / Vibe / When to wear" descriptions — the format is inconsistent.)
- **Sticky ATC:** yes — Shrine `.sticky-atc--after-scroll` bar (mini title + price + Add to cart), verified working on desktop and mobile 390x844. **Caveat/bug:** in one observed state the sticky bar showed LE 850 while the URL variant was 30ml/LE 640 — it may not track the selected variant.
- **Delivery estimate widget:** icon + "Ships from 5 to 8 days in Egypt". Honest, but slow, and stated with zero mitigation (no "free gift", no tracking promise, no packaging story next to it).
- **Buy area:** quantity stepper (shows "(1 in cart)" after add), "Add to cart" + "Buy it now" dynamic checkout.
- **Below the fold:** one empty custom section + the same 5-quote sitewide testimonial carousel reused on every PDP.

Psychology scorecard: sticky ATC ✓, delivery expectation-setting ✓ (unmitigated), everything else — anchoring, social proof, risk reversal, sampling, scent education, cross-sell — missing at the exact moment of decision.

## 5. Bundles, Offers & Pricing Strategy

**Bundles are the only place on the entire site with real price anchoring.** They are plain Shopify products with compare-at prices (no bundle app, no builder, no component customization):

| Bundle | Price | Compare-at | Badge | Contents/story |
|---|---|---|---|---|
| Best sellers | 2,890 | 3,400 | SAVE 15% | Fluffy Mallow + Sundae + Classy V + Wifey, all 50ml |
| Trio obsession | 2,167.50 | 2,550 | SAVE 15% | Vanille + Fluffy Mallow + Sundae 50ml ("for the vanilla girls") |
| Perfume rotation pack | 1,920 | 2,560 | SAVE 25% | 4x 30ml |
| Beach dessert layering | 1,589 | 1,870 | SAVE 15% | Sundae 50ml + Coco Kiss 30ml + Coco Kiss oil ("buy 3 get 1") |
| Viral vanilla combo | 1,445 | 1,700 | SAVE 15% | Sundae + Salted Vanilla, sold on a layering story ("Wear them on their own or layer them together") |
| The musk obsession bundle | 900 | 1,200 | SAVE 25% | 4x 6ml musks, "buy 3 get 1" |

Collection cards show sale price + struck compare-at + SAVE badge; bundle PDPs repeat the anchor with a "SAVE 15%" pill and sell the layering narrative. **Every bundle clears the 1,100 LE free-gift threshold, stacking incentives** — good design, even if likely accidental.

**The free-gift mechanic is the store's best CRO asset.** In the cart drawer: a progress bar ("Add 460 EGP to get a FREE 5ml perfume" — math verified: 640 + 460 = 1,100) plus an 8-option tester carousel (Fluffy Mallow, Velvet santal, Salted vanilla, She's bold, Coco kiss, Donna, Vanille, Cherry cream) with per-item "Add Free Gift" buttons **disabled until the threshold is met**. It visualizes the reward and lets the shopper pre-choose it — a genuine AOV motivator. The threshold is also well-tuned: one 50ml (850) + one tester (85) doesn't cross it, but a second small item does; it nudges 640–850 carts toward a second product.

Gaps: the threshold is invisible everywhere before the cart (no progress bar on PDPs, announcement bar is static text); no paid cross-sells in the drawer; no quantity breaks despite Shrine supporting them; seasonal offer collections (Ramadan 15, Valentines 5, Mother's Day 3) linger in nav out of season; the 10% first-order popup wasn't observed firing live.

## 6. Reviews & Social Proof

- **Platform: none.** No Judge.me, Loox, Okendo, Yotpo, or Stamped anywhere in the HTML. Star/rating strings in markup are theme CSS only.
- **Volume: 5.** The entirety of the site's social proof is one static Section Store testimonial section (`ss_testimonial_8`) with an "Excellent 5 / 5" badge and 5 unique Franco-Arabic quotes, auto-looped to look fuller, reused identically on the homepage and every PDP.
- **No photos, no filters, no star breakdown, no product-level attribution** — a quote praising Baklava appears on the Bordeaux PDP and vice versa.
- **Dead link:** the carousel's "View All" has an empty href.
- **SEO cost:** JSON-LD Product has no aggregateRating → no review stars in Google.
- **Funnel coverage:** proof appears only on homepage-bottom and PDP-bottom. Zero on collection cards, zero in cart, zero at checkout-adjacent moments.

The irony: the quotes themselves are excellent — authentic dialect, specific performance claims ("lasted on el lebs for 3 days"), even dupe validation — but the infrastructure to collect, scale, and place them doesn't exist.

## 7. Navigation, UX & Mobile

- **Menu:** Home, Products ▾ (For Her / For Him / Unisex / Perfume oil / Musks / 5 ML Testers), Collections ▾ (Valentines Special Edition / Ramadan Specials / Bundles), About Sorella, Contact. Clean format-and-gender segmentation; the flaw is content (stale seasonal items in July, no "Bestsellers"/"New" entries — those collections exist but are empty).
- **Collection page (For Her, 34 products, 2 pages):** filters limited to Availability + Price. **Sort defaults to "Alphabetically, A-Z"**, which buries bestsellers and surfaces "Arabian Lace" and "Baklava tester" first. Cards: image, title, price ("Regular price LE 850.00" / "From LE 640.00"), full-width "Add to cart" or "Choose options" (quick-buy), "Sold out" badge. **No stars, no Bestseller/New badges, no compare-at, no hover second image.** Testers (LE 80–85) are mixed into the grid, cluttering price scanning (though it does advertise the sampling path).
- **Site depth:** only 2 content pages exist (Contact, About); no FAQ, no blog articles, no quiz, no reviews page.
- **Mobile (390x844):** solid. Hamburger drawer with expandable Products/Collections, Log in inside the drawer, policies + socials at bottom. Announcement bar stays visible; cart badge persists; PDP sticky ATC appears after ~1,600px of scroll and keeps the CTA reachable; testimonial cards gain "View More" truncation. The homepage's no-purchase-path problem is identical on mobile.
- **No popups at all** live — no cookie banner, nothing to dismiss (pleasant), but also zero proactive email capture beyond the unincentivized footer form.

## 8. Weak Points

1. **Homepage sells nothing.** Zero shoppable products, a 224px text marquee for a hero, no CTA. Every visitor must route through a collection page to see a single product. (The richer homepage — bento collections, feature trio, product carousel — already exists in the repo and simply isn't deployed.)
2. **Intermittent 503s.** Roughly every other request during scraping hit a Shopify error page before succeeding on retry. This bleeds paid traffic (GA4, Meta, TikTok pixels are all firing) before CRO even matters.
3. **"We do not accept returns or exchanges"** — the refund policy in full. Combined with 1 photo per product, no reviews, no scent notes, and 5–8 day delivery, all purchase risk sits on a first-time customer buying an unsmelled 850 EGP fragrance.
4. **Zero review infrastructure** for a brand whose customers already write vivid testimonials. Five static quotes sitewide, a dead "View All" link, no aggregateRating in JSON-LD.
5. **Testers never cross-merchandised.** The 85 EGP tester — the natural answer to the no-returns problem — is a separate, unlinked product; several testers (Baklava, Fleur, Oud Royale, ذهب) are sold out anyway.
6. **Alphabetical default sort** on collections buries bestsellers behind "Arabian Lace" and tester SKUs; cards carry no badges, stars, or compare-at to guide choice.
7. **Sticky ATC variant-sync bug (observed once):** bar showed LE 850 while the selected variant was 30ml/LE 640 — risks wrong-price perception at the highest-intent moment. (Single observation; needs reproduction.)
8. **Unused theme firepower:** Shrine's cart upsells and quantity breaks sit idle; the cart drawer has no paid cross-sells, gift note, urgency, or shipping estimate; the free-gift threshold isn't visualized anywhere before the cart.
9. **Catalog/data mess:** duplicate products and collections, `untitled-feb24_15-41` handles, emoji handles, empty "the-most-loved"/"new-fragrances" collections, mixed variant labels, no product types or meaningful tags.
10. **Stale and thin content:** "Ramadan Specials" featured on the homepage in July; no meta description on the homepage; 3 JS console errors on load; no FAQ; footer-only email capture with no incentive; 5–8 day shipping stated with no reassurance framing.
11. **Dupe positioning unexploited (strategic call):** customers say "zay el original bezabt" — inspired-by anchoring ("if you love X, meet Bordeaux") is a proven conversion lever the brand hasn't decided on either way.

## 9. Key Takeaways

1. **Ship the homepage that already exists.** Deploy the built-but-undeployed bestseller carousel/feature sections so the homepage sells: hero with CTA → bestsellers → bundles → proof. Currently zero products are shoppable from the highest-traffic page.
2. **The cart-drawer free-gift picker is the model to copy everywhere.** A progress bar + pre-selectable reward ("Add 460 EGP to get a FREE 5ml perfume" + 8 "Add Free Gift" tester cards) is genuinely best-in-class mechanics; surface the same threshold on PDPs and make the announcement bar dynamic.
3. **Turn testers into risk reversal.** With a hard no-returns policy, the 85 EGP tester is the trust story — add a "Try it first for LE 85" block on every full-size PDP and reframe the returns page around it.
4. **Install a review app before spending another pound on ads.** Customers already produce quotable Franco-Arabic proof; product-level reviews with stars on PDPs, collection cards, and JSON-LD would compound across the whole funnel.
5. **Fix defaults and hygiene: sort collections by Best selling**, add Bestseller/New badges and compare-at to cards, retire Ramadan content in July, repair the dead "View All" link, clean `untitled-*` handles and duplicate products/collections.
6. **Use the bundle playbook on regular PDPs.** Bundles prove the team can do anchoring (struck compare-at + SAVE 15/25% badges + layering stories); regular PDPs have no anchor at all — and the "inspired by" angle customers volunteer is an untouched anchoring lever.
7. **Stabilize the origin.** Intermittent 503s on a store running GA4 + Meta + TikTok + Clarity pixels is paid traffic burning on error pages; fix before any CRO test can be trusted.

---

## How Sorella Compares to Dossier, Thomson Carter & PHLUR

### Comparison Table

| Dimension | Dossier | Thomson Carter | PHLUR | Sorella |
|---|---|---|---|---|
| **Positioning** | Designer dupes at 1/10 price; "Fragrance for the 99%"; Made in Grasse, France | Affordable British luxury; original compositions, explicitly anti-dupe; named perfumer persona | Modern fine fragrance; emotion-named original scents; TikTok-era audience + celebrity hero | Two-sister Egyptian brand; original local gourmand scents (Basbousa, Baklava); "From our bond to your senses" — but the story never reaches the purchase path |
| **Price strategy** | Triple-stacked anchor on every price: designer retail ($665) vs guest ($79) vs member ($71.10); sitewide 10% strikethrough; defaults PDP to $79 100ml | Full ladder as variants on one PDP (£5 sample → £15 10ml → £48 → £78); no strikethrough on solo EDPs — discounts quarantined to sets (20–56% off) | Good-better-best per scent ($32 → $99 → $139); explicit savings on every bundle ($78→$68, "save $10"); clearance quarantined to "Farewell Sale" | Flat pricing (850/640 EGP), no compare-at on regular PDPs; sizes and testers split into separate products; anchoring exists only on bundle PDPs (SAVE 15–25%) |
| **Bundles / AOV tactics** | Cart quantity-discount ladder (−10% at 1 → −30% at 5); free shipping only at 2+ items; "Best Layered With" cross-sell with own ATC; Discovery Set $99; membership pre-selected in cart | Free £29 body wash GWP with 100ml; per-scent "worlds" (EDP + wash + diffuser); PAIR IT WITH + MORE {SCENT} one-click adds; 2 free minis picked in cart; £7 gift box | Duets/Trios with visible savings; build-your-own Custom Trio (save $10); $39 Discovery Set with $20 credit back; Rebuy Smart Cart with progress bar + cross-sells + membership ad | 6 fixed bundles with compare-at + SAVE badges + layering stories; free 5ml gift over 1,100 LE with in-cart picker (best asset); no PDP cross-sells, no in-cart paid upsells, quantity breaks idle |
| **Reviews / social proof** | Okendo, 13,288 reviews on hero SKU; stars on homepage/collection/PDP cards, SSR'd + crawlable; brand replies; "6M bottles sold"; but "Highest Rating" default sort | Loox photo/video wall; store-wide "4.9 \| 4,403" strip on every PDP; press bar (GQ, Vogue); shoppable testimonials; but three conflicting figures (635 / 4,403 / 50,000) | Okendo, 2,127 reviews on Missing Person with Longevity/Projection sliders; JSON-LD rich snippets; celebrity hero (Suni Lee) | No review app at all; 5 static Franco-Arabic quotes looped sitewide; dead "View All" link; no stars on cards or PDPs; no aggregateRating in JSON-LD |
| **Quiz / discovery flow** | 7-step Scent Quiz (email-gated, no skip) + AI Scent Finder chat in top nav; scent-family collections | Octane AI 5-tap quiz, skippable email gate, fully shoppable results with ATC + ship-by urgency; promoted in nav, homepage, mid-grid | No quiz; $39 Discovery Set with $20 credit is the discovery mechanism; shop-by-olfactive-family nav | Nothing — no quiz, no discovery set, no scent-family browsing; 27-product tester collection exists but is never framed as a trial path |
| **Cart upsells** | 3-step drawer funnel: dual pricing + free 3ml sample slot → membership comparison table → summary; quantity ladder; "You might like to add" one-tap rail | 2-of-12 free-mini sample picker (best mechanic); £7 gift box; but no progress bar, no cross-sell carousel, confusing item count | Rebuy Smart Cart: free-shipping progress bar, in-cart cross-sells, self-hiding membership ad | Progress bar + 8-tester free-gift picker with disabled-until-threshold buttons (genuinely strong); no paid cross-sells, no gift note, no urgency |
| **Mobile UX** | Weak: no sticky ATC, hero email field hidden, sample pill absent, cart icon goes to /cart page | Strong: chip nav bar, sticky ATC bar, marquee announcement, sample picker works at 390px | Not assessable (Cloudflare-blocked; archives only) | Solid: sticky ATC (with one observed variant-sync bug), working drawer nav, cart badge persists — but same zero-product homepage as desktop |

### Biggest Gaps

Ranked by expected conversion/AOV impact — things all or most competitors do that Sorella doesn't:

1. **No shoppable homepage.** All three competitors put bestseller carousels with quick-add/ATC high on the homepage; Sorella's homepage sells zero products. → Deploy the already-built bestseller carousel, bento collections, and feature-trio sections with a real hero + CTA.
2. **No review infrastructure.** Dossier (13k reviews), Thomson Carter (4,403), and PHLUR (2,127 + Longevity/Projection sliders) put stars on every card and in JSON-LD; Sorella has 5 static quotes and a dead link. → Install Judge.me/Loox, seed it from existing customers, and surface stars on PDPs, collection cards, and rich snippets.
3. **No risk reversal at the decision point.** Competitors use free minis, £5/$39 samplers, free exchanges, or credit-back discovery sets; Sorella has a hard no-returns policy and an unlinked 85 EGP tester. → Add a "Try it first for LE 85" tester cross-link block on every full-size PDP and build a discovery set (5×5ml with credit toward a full size, PHLUR-style).
4. **No price anchoring on regular PDPs.** Dossier triple-stacks anchors; TC shows the full size ladder on one page; PHLUR uses good-better-best; Sorella shows a bare "LE 850". → Merge 50ml/30ml/tester into one PDP as a visible variant ladder, and add compare-at framing where honest (bundle-style).
5. **No PDP or in-cart cross-sells.** All three run "Layer It With"/"PAIR IT WITH"/"Best Layered With" one-click rows; Sorella's bundles already prove layering stories work, but PDPs and the cart drawer sell nothing extra. → Add a "Layers well with" row with one-tap add on PDPs and 2–3 paid cross-sell cards in the cart drawer (Shrine supports it).
6. **No guided discovery.** Dossier and TC run quizzes (TC's is fully shoppable); PHLUR has family browsing + a discovery set; Sorella has none. → Launch a 4–5 tap "Find your scent" quiz with skippable email gate and ATC on results (Thomson Carter's model).
7. **Threshold invisible before the cart.** Dossier gamifies its ladder in the drawer AND anchors offers sitewide; PHLUR shows a progress bar; Sorella's excellent 1,100 LE gift mechanic only appears once the cart is open. → Show "Add X EGP for a FREE 5ml perfume" progress on PDPs and make the announcement bar dynamic/linked.
8. **Bestsellers buried by defaults.** Competitors badge cards (BEST SELLER / NEW / $20 CREDIT) and merchandise bestseller collections; Sorella sorts A–Z with zero badges and empty "most-loved"/"new" collections. → Default sort to Best selling, add Bestseller/New badges, and populate the empty collections.

### What Sorella Already Does Well

- **The cart-drawer free-gift picker is genuinely best-in-class mechanics** — progress bar with exact remaining amount + 8 pre-selectable tester rewards with disabled-until-threshold buttons. Thomson Carter's sample picker is the only competitor equivalent, and TC lacks the progress bar entirely.
- **Sticky add-to-cart on desktop and mobile** — Dossier, at far greater scale, has none anywhere (its most obvious leak).
- **Bundle merchandising is competent:** compare-at strikethroughs, SAVE 15–25% badges, and layering narratives ("wear them on their own or layer them together") — the same playbook PHLUR runs; every bundle also clears the free-gift threshold, stacking incentives.
- **Authentic, differentiated brand voice:** the sister-founder story, Arabic product names (بسبوسه, ذهب), and vivid Franco-Arabic testimonials are proof material competitors would pay for — the raw asset is real, only the infrastructure is missing.
- **Honest, clean shopping experience:** no dark patterns (vs Dossier's pre-selected $39.90/mo membership), no popup spam, honest delivery estimates, and a solid mobile experience with no horizontal overflow.
- **Accessible price ladder in the catalog** (80 EGP testers → 300 EGP musks → 380 oils → 640–850 EDPs) — the rungs all exist; they just aren't connected into a merchandised trial-to-full-size funnel yet.
