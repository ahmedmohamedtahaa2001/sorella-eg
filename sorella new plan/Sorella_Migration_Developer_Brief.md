# Sorella v2 Migration — Developer Executive Brief

## 1. The 5 most dangerous conflicts (silent corruption if migrated as-is)

1. **Tester → parent name/copy collapse.** In `/data`, all 26 testers had "tester" stripped from their names, so 21 testers now share a byte-identical `name.en` AND `copy.hook` with their full-size parent. Migrating `name.en`/`copy.hook` straight through makes the 5ml tester and the 50ml bottle indistinguishable in cart, search, and order emails — a refund generator. **Fix:** source `productName` from the raw Shopify title, re-derive testers as `"<Parent> Tester"`, and give each tester its own hook.
2. **Handle→identity mismatch on the flagship.** `coco-kiss` points at the 8ml LE 380 oil; `coco-kiss-perfume` points at the 50ml LE 850 EDP. Any redirect/URL map built naively from handles sends flagship traffic to the cheap oil. Also `sweet-oud-perfume-oil` vs `-1` are two live products with an identical title. **Fix:** hand-audit the handle→SKU map; do not auto-derive.
3. **`type`/`family` mapped to LOCKED fields.** `type` (EDP|perfume_oil|musk|tester) is not a legal `concentration`; `family` (45 scent-slug values like "baklava") is not a `fragranceFamily`. A naive map yields 45 one-product filter buckets and drops 27 oil/musk products out of the concentration filter. **Fix:** never map these fields; collect concentration + fragranceFamily fresh. **The STANDARD itself must be extended** — add `Perfume Oil / Attar` and `Musk Oil` to `CANONICAL_TAGS.concentration` (31% of catalog + the brand's عطّار identity has no legal value today).
4. **Invented notes read as product claims.** 43–49 of 87 have zero note text in their raw Shopify body; 4 (candy-musk, lavender-musk, musk-flora, baklava-tester) have a literally 0-char source yet carry 5–7 fully specified AI notes. Bestseller Baklava's entire pyramid is fabricated. Publishing `notes[]` under an "Ingredients" heading ships composition claims the brand never made. **Fix:** treat all `notes`/`impressions`/`copy`/`seo`/`scent_world`/`house` as unverified (per README, 16-agent AI workflow) — owner sign-off gate before any of it renders as fact.
5. **Casing + script fracture the recommendation engine.** 256 note strings collapse to 191 by case (58 collision groups: Amber/amber, Vanilla×24 vs vanilla×14); "عود" is Arabic on 4 products vs Latin "Oud" on 13. `relatedByIngredientPool` and dupe `sharedIngredients` join on these strings and will **silently return nothing** where spellings disagree. **Fix:** case-fold + canonical-material map + transliterate before building any ingredient index. Never trust the raw string as a join key.

Bonus trap: `house="original"/confidence="high"` is asserted on all 87 while brand lore documents a "Renditions" line — the dupe section (2.4) is un-buildable and the positioning data actively contradicts strategy.

## 2. Schema coverage: covered vs unverified vs absent

~53 leaf fields across the template. Bucketed:

| Bucket | Share | Fields |
|---|---|---|
| **Covered & trustworthy** (real Shopify/brand data, mechanical migrate) | **~13%** (~7) | `sizes.size`, `sizes.price`, `currency` (implicit LE), stock boolean→`stockStatus`, handle, 1 hero image URL, bundle/collection membership graph |
| **Present but UNVERIFIED** (AI-generated; migrate only behind owner review) | **~32%** (~17) | `productName`*, note ingredient arrays (→topNotes/heart/base `.ingredient`), `impressions`, `valueProposition`/`brandStory` (copy.*), `seo.*`, `longevity`, `occasion` (free text, 129 values), `olfactiveRole` (opening→Top etc.) |
| **Absent — 0/87** (fill from scratch) | **~55%** (~29) | `sku`, `fragranceFamily`, `concentration` (legal value), `genderPositioning` (47/87 blank), **all** `.mood` pairs, `overallMoodTags`, `ingredients[]` full list + `effect`/`sourceType`/`allergenFlag`, **all** `dupe.*`, `estimatedSpraysPerBottle`, `sillage`, `season`, `timeOfDay`, `quizAnswerMapping`, structured `layeringPartners`, `altText`, and every image except hero (lifestyle, 2× personWearingIt, 3–5 ingredientCloseUps, sizeComparison, textureDetail) |

**Reasoning:** Only price/size/stock/handle/hero trace to hard Shopify export data. The large "unverified" band is populated 87/87 but was authored by an AI workflow the brand never approved — it is a review liability, not an asset. The majority absent band is why this is a data-collection project, not a migration script. **Net: only ~13% is safe to migrate untouched; the notes-pyramid "looks done" but is the single biggest trap.**

## 3. P0 — minimum the owner MUST supply before one PDP can go live

Per product (the flagship set first, not all 87):
1. **Official product name** (size/format/"tester" stripped out; Arabic + English transliteration where relevant).
2. **SKU** — one per size incl. tester (their stock-sheet codes if any exist; else we generate a pattern).
3. **Concentration** — remap to canonical (confirm the 34 inferred "EDP"; extend list for oil/musk).
4. **fragranceFamily** — one value from the locked 20.
5. **Real top/heart/base notes** — confirm or replace, especially the ~15 zero-grounding products.
6. **A `.mood` word (locked-16) per note** + **3–5 overallMoodTags** — nothing customer-facing filters/quiz works without this.
7. **valueProposition** — confirm/rewrite the AI hook (kill the 52 duplicates).
8. **allergenFlag** per material, priority the **27 neat oil/musk skin-contact SKUs** + bergamot/cinnamon/tonka/oakmoss carriers (safety/returns gate).
9. **sillage** + **longevityHours** confirm (2.6 required, sillage 0/87).

Everything else (brandStory, full `ingredients[]` supplier sheets, sourceType, dupe, non-hero photography) is P1/P2 — page renders without it.

## 4. Auto-derive / compute — do NOT bother the owner

- `sizes.costPerSpray`, `savingsVsSmallestSize`, `performance.replenishmentEstimate` — CALCULATED once `estimatedSpraysPerBottle` is supplied (formula in schema).
- `stockStatus` — map existing `available` boolean → `In Stock`/`Sold Out` (Low Stock needs inventory thresholds later).
- `relationships.bundleMembership` + `relatedByIngredientPool` seed — from existing bundle/collection graph and `family` grouping, **after** SKUs exist and ingredient strings are canonicalized.
- `olfactiveRole` — mechanical `opening→Top / soul→Heart / anchor→Base` (but flag Amberlux-style inversions for review).
- `season`/`timeOfDay` **candidate** values — derivable from `scent_world` + occasion phrases as a *pre-fill for owner confirmation*, never as final.
- Ingredient **canonicalization** (case-fold, script-normalize عود→Oud, strip 28 non-ingredient abstractions) — pure tooling.
- SKU **generation** — if owner has no codes, auto-generate `SOR-<CONC>-<nnn>[-size]`.
- `seo.metaTitle`/`metaDescription` length trimming (3 titles >60, 1 meta >155) — mechanical.
- currency = `EGP` constant.

## 5. Smartest collection order — batched tabs, not 87×40 cells

Sequence gated so each tab unlocks the next; never expose empty computed columns.

- **Tab 0 — Identity spine (owner, ~2 hrs).** One row per *scent* (not per SKU) — ~45 rows. Columns: official name (EN/AR), concentration, fragranceFamily, genderPositioning. Resolves the 4 tri-gender conflicts + 2 placeholder handles here. → unlocks SKU generation + all filters.
- **Tab 1 — SKU & pricing (mostly pre-filled).** One row per SKU (~93). Price/size/stock pre-populated from Shopify; owner only supplies/confirms stock codes + `estimatedSpraysPerBottle` per reference size. → unlocks all CALCULATED fields.
- **Tab 2 — Notes & mood (owner, the big one).** One row per scent. Pre-fill AI notes greyed as "confirm or replace"; hard-require a locked-16 mood beside each note + 3–5 overallMoodTags. Dropdown-locked mood columns (no free text). Flag the ~15 zero-grounding products in red.
- **Tab 3 — Safety (owner, fast).** Per scent: allergen Yes/No + one note line; pre-flag the bergamot/cinnamon/tonka/oakmoss + 27 neat-oil rows. Ship-blocking, so keep it short and separate.
- **Tab 4 — Voice (owner, async).** valueProposition (confirm/edit) + brandStory. Not launch-blocking; can trail.
- **Tab 5 — Photography brief (internal → shoot).** Auto-generated from Tabs 0/2 ingredient lists; owner not touched.
- **Tab 6 — Full ingredients / supplier sheets (owner, HIGH effort, P2).** Separate ask; degrade gracefully to "headline notes only" if sheets unobtainable.

Rule: testers are **rows that inherit**, shown collapsed under their parent — owner answers the parent once.

## 6. Traps the sheet must guard against

- **Free-text drift:** every LOCKED field (mood, concentration, family, gender, sillage, season, olfactiveRole, sourceType, stockStatus) must be a **dropdown validated against `CANONICAL_TAGS`** — reject on entry, not on import. `occasion`'s 129-value mess is the cautionary tale.
- **Casing:** normalize ingredient names to a canonical-material dictionary on save; show the owner the canonical form. Never store both "Amber" and "amber".
- **Tester inheritance:** testers must be **child rows keyed to a parent SKU**, auto-inheriting notes/mood/concentration but carrying their own name + hook. Guard against re-collapsing names onto the parent.
- **Bundles ≠ products:** a bundle has **no single formula** — suppress `ingredients[]`/single note pyramid on bundles (beach-dessert-layering falsely carries one today); render its 3 contents separately.
- **Arabic naming:** dual-field (Arabic script + Latin transliteration); never let Arabic sit in the English field (5 products do now); transliterate عود→Oud in ingredient joins.
- **Placeholder SKUs/handles:** block `untitled-*` handles and null `size_ml` (amberlux, citrus-rush, cupid-s-hunt, hercules) from going live; require resolution in Tab 0/1.
- **Same-scent-different-juice:** 15 families have contradictory pyramids across formats (velvet-santal has 3). Don't auto-copy notes across a family — force a per-format "SAME / different" answer; only tester→parent copy is safe.
- **Unverified→fact laundering:** anything AI-generated (`notes`, `copy`, `seo`, `sourceType` "real/pure" language already live in 6 products + 1 indexed meta description) must render behind an explicit `approved:true` flag, or it publishes as brand truth.

Files of record: STANDARD `/ahmed-taha-dev/sorella/sorella new plan/Perfume schema.template v2.js`, canonical vocab `/ahmed-taha-dev/sorella/sorella new plan/Sorella canonical tags.js`, current data model `/ahmed-taha-dev/sorella/current website/data/README.md`, raw source of truth `/ahmed-taha-dev/sorella/current website/products/<handle>/product.json`.