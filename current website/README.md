# Sorella — Website Content Archive

Complete content extraction of **https://sorella-eg.com/** (Shopify storefront) — all product data, collections, page text, policies, images, and design-reference screenshots.

- **Source:** https://sorella-eg.com/
- **Extracted:** 2026-07-01
- **Products:** 93 · **Collections:** 23 · **Pages:** About Us, Contact, 5 policies · **Images:** 158

## Brand

Sorella is an Egyptian perfume brand founded by two sisters ("Sorella" = sister). Tagline: *"From our bond to your senses."* Products: perfume sprays (30ml/50ml), perfume oils, musks, testers (5ml), and bundles. Ships across Egypt (5–8 days).

### Contact & Social
- **Instagram:** https://www.instagram.com/sorella.fragrances
- **TikTok:** https://www.tiktok.com/@sorella.fragrances
- **Store:** https://sorella-eg.com/pages/contact
- Announcement bar: *"Get a free 5ml perfume for orders over 1,100 LE."*

## Folder Structure

```
current website/
├── README.md                  ← this index
├── _site-meta/                site inventory: sitemaps, robots.txt, agents.md, JSON indexes, image manifest
│   └── sitemaps/
├── _design-reference/         full-page screenshots of key page types (for redesign)
│   └── screenshots/
├── homepage/                  homepage text (content.md), raw.html, images/
├── products/                  one folder per product (93)
│   └── <handle>/              product.json (raw) · product.md (readable) · images/
├── collections/               one folder per collection (23)
│   └── <handle>/              collection.json · collection.md · images/
├── pages/
│   ├── about-us/  contact/    content.md · raw.html · images/
│   └── policies/              privacy, refund, shipping, terms, contact-information (.md)
└── blog/news/                 blog (currently empty on the live site)
```

Each item folder holds both the **raw JSON** (source of truth, all fields/variants/prices) and a **readable .md** (title, pricing table, description, image previews).

## Design Reference Screenshots
Full-page captures in `_design-reference/screenshots/`:
- `homepage-full.jpeg`
- `about-us-full.jpeg`
- `contact-full.jpeg`
- `product-baklava-full.jpeg`
- `collection-for-her-full.jpeg`

## Collections

| Collection | Handle | Products |
|---|---|---|
| [All](collections/all/collection.md) | `all` | 93 |
| [Perfume Sprays](collections/perfume-sprays/collection.md) | `perfume-sprays` | 77 |
| [For Her](collections/for-her/collection.md) | `for-her` | 34 |
| [Free Gift 5ML](collections/free-gift-5ml/collection.md) | `free-gift-5ml` | 27 |
| [5 ML Testers](collections/5-ml-testers/collection.md) | `5-ml-testers` | 26 |
| [Perfume oil](collections/perfume-oil/collection.md) | `perfume-oil` | 17 |
| [Perfume Oils](collections/perfume-oils/collection.md) | `perfume-oils` | 16 |
| [50ML Perfumes](collections/50ml-perfumes/collection.md) | `50ml-perfumes` | 15 |
| [Ramadan Specials](collections/ramadan-special/collection.md) | `ramadan-special` | 15 |
| [30ML Perfumes](collections/30ml-perfumes/collection.md) | `30ml-perfumes` | 14 |
| [Musks](collections/musks/collection.md) | `musks` | 14 |
| [For Him](collections/for-him/collection.md) | `for-him` | 8 |
| [5ML Perfumes](collections/5ml-perfumes/collection.md) | `5ml-perfumes` | 7 |
| [Bundles](collections/bundles/collection.md) | `bundles` | 6 |
| [Summer collection](collections/summer-collection/collection.md) | `summer-collection` | 6 |
| [Valentines Special Edition](collections/valentines/collection.md) | `valentines` | 5 |
| [Unisex](collections/unisex/collection.md) | `unisex` | 4 |
| [Home page](collections/frontpage/collection.md) | `frontpage` | 1 |
| [5ML Offer Perfumes](collections/5ml-offer-perfumes/collection.md) | `5ml-offer-perfumes` | 0 |
| [Main Collection](collections/main-collection/collection.md) | `main-collection` | 0 |
| [Mother’s Day Bundles](collections/mother-s-day-bundles/collection.md) | `mother-s-day-bundles` | 0 |
| [New Fragrances](collections/new-fragrances/collection.md) | `new-fragrances` | 0 |
| [The Most Loved](collections/the-most-loved/collection.md) | `the-most-loved` | 0 |

## Products

| Product | Handle | Price (EGP) | Images |
|---|---|---|---|
| [Amberlux](products/amberlux/product.md) | `amberlux` | 840.00 | 1 |
| [Arabian Lace](products/arabian-lace/product.md) | `arabian-lace` | 850.00 | 1 |
| [Arabian lace perfume oil](products/arabian-lace-perfume-oil/product.md) | `arabian-lace-perfume-oil` | 480.00 | 1 |
| [Arabian lace tester](products/arabian-lace-tester/product.md) | `arabian-lace-tester` | 85.00 | 1 |
| [Baklava](products/baklava/product.md) | `baklava` | 850.00 | 1 |
| [Baklava tester](products/baklava-tester/product.md) | `baklava-tester` | 85.00 | 1 |
| [Beach dessert layering](products/beach-dessert-layering/product.md) | `beach-dessert-layering` | 1589.00 | 1 |
| [Berries musk](products/berries-musk/product.md) | `berries-musk` | 300.00 | 1 |
| [Berries musk perfume](products/berries-musk-perfume/product.md) | `berries-musk-perfume` | 640.00 | 1 |
| [Best sellers](products/best-sellers/product.md) | `best-sellers` | 2890.00 | 1 |
| [Bordeaux](products/bordeaux/product.md) | `bordeaux` | 850.00 | 1 |
| [Bordeaux tester](products/bordeaux-tester/product.md) | `bordeaux-tester` | 85.00 | 1 |
| [Candy musk](products/candy-musk/product.md) | `candy-musk` | 300.00 | 1 |
| [Cherry Cream](products/cherry-cream/product.md) | `cherry-cream` | 850.00 | 1 |
| [Cherry cream tester](products/cherry-cream-tester/product.md) | `cherry-cream-tester` | 85.00 | 1 |
| [Choco drizzle perfume oil](products/choco-drizzle/product.md) | `choco-drizzle` | 380.00 | 1 |
| [Citrus Rush](products/citrus-rush/product.md) | `citrus-rush` | 850.00 | 1 |
| [Classy V.](products/classy-v/product.md) | `classy-v` | 850.00 | 1 |
| [Classy V. Tester](products/classy-v-tester/product.md) | `classy-v-tester` | 85.00 | 1 |
| [Coco kiss](products/coco-kiss-perfume/product.md) | `coco-kiss-perfume` | 850.00 | 1 |
| [Coco kiss perfume oil](products/coco-kiss/product.md) | `coco-kiss` | 380.00 | 1 |
| [Coco kiss tester](products/coco-kiss-tester/product.md) | `coco-kiss-tester` | 80.00 | 1 |
| [Cupid’s Hunt](products/cupid-s-hunt/product.md) | `cupid-s-hunt` | 850.00 | 1 |
| [Donna](products/donna/product.md) | `donna` | 850.00 | 1 |
| [Donna perfume oil](products/donna-perfume-oil/product.md) | `donna-perfume-oil` | 380.00 | 1 |
| [Donna tester](products/donna-tester/product.md) | `donna-tester` | 85.00 | 1 |
| [Espresso shot perfume oil](products/esspresso-shot/product.md) | `esspresso-shot` | 380.00 | 1 |
| [Fleur](products/fleur/product.md) | `fleur` | 850.00 | 1 |
| [Fleur tester](products/fleur-tester/product.md) | `fleur-tester` | 85.00 | 1 |
| [Fluffy Mallow](products/fluffy-mallow/product.md) | `fluffy-mallow` | 640.00 | 1 |
| [Fluffy mallow perfume oil](products/fluffy-mallow-1/product.md) | `fluffy-mallow-1` | 380.00 | 1 |
| [Fluffy Mallow tester](products/fluffy-mallow-tester/product.md) | `fluffy-mallow-tester` | 85.00 | 1 |
| [Hercules](products/hercules/product.md) | `hercules` | 850.00 | 1 |
| [Lavender musk](products/lavender-musk/product.md) | `lavender-musk` | 300.00 | 1 |
| [Midnight Muse](products/midnight-muse/product.md) | `midnight-muse` | 850.00 | 1 |
| [Midnight Muse tester](products/midnight-muse-tester/product.md) | `midnight-muse-tester` | 85.00 | 1 |
| [Musk flora](products/musk-flora/product.md) | `musk-flora` | 300.00 | 1 |
| [Mykonos](products/mykonos/product.md) | `mykonos` | 850.00 | 1 |
| [Mykonos tester](products/mykonos-tester/product.md) | `mykonos-tester` | 85.00 | 1 |
| [Ocean musk](products/ocean-musk/product.md) | `ocean-musk` | 300.00 | 1 |
| [Ocean musk perfume](products/ocean-musk-perfume/product.md) | `ocean-musk-perfume` | 640.00 | 1 |
| [Oud leila tester](products/oud-leila-tester/product.md) | `oud-leila-tester` | 85.00 | 1 |
| [Oud Royale](products/untitled-feb24_15-41/product.md) | `untitled-feb24_15-41` | 850.00 | 1 |
| [Oud Royale tester](products/oud-royale-tester/product.md) | `oud-royale-tester` | 85.00 | 1 |
| [Peach musk](products/peach-musk/product.md) | `peach-musk` | 300.00 | 1 |
| [Perfume rotation pack](products/perfume-rotation-pack/product.md) | `perfume-rotation-pack` | 1920.00 | 5 |
| [Pineapple musk 🍍](products/pineapple-musk-/product.md) | `pineapple-musk-🍍` | 300.00 | 1 |
| [Pomegranate musk](products/pomegranate-musk/product.md) | `pomegranate-musk` | 300.00 | 1 |
| [Powder musk](products/powder-musk/product.md) | `powder-musk` | 300.00 | 1 |
| [Powder musk perfume](products/powder-musk-perfume/product.md) | `powder-musk-perfume` | 640.00 | 1 |
| [Pumpkin spice perfume oil](products/pumkin-spice/product.md) | `pumkin-spice` | 380.00 | 1 |
| [Roselle](products/roselle/product.md) | `roselle` | 850.00 | 1 |
| [Roselle tester](products/roselle-tester/product.md) | `roselle-tester` | 85.00 | 1 |
| [Salted vanilla](products/salted-vanilla/product.md) | `salted-vanilla` | 850.00 | 1 |
| [Salted vanilla tester](products/salted-vanilla-tester/product.md) | `salted-vanilla-tester` | 85.00 | 1 |
| [She’s bold perfume](products/she-s-bold-perfume/product.md) | `she-s-bold-perfume` | 850.00 | 1 |
| [She’s bold perfume oil](products/she-s-bold-perfume-oil/product.md) | `she-s-bold-perfume-oil` | 380.00 | 1 |
| [She’s bold tester](products/she-s-bold-tester/product.md) | `she-s-bold-tester` | 85.00 | 1 |
| [Silk skin](products/silk-skin/product.md) | `silk-skin` | 640.00 | 1 |
| [Silk skin perfume oil](products/silk-skin-perfume-oil/product.md) | `silk-skin-perfume-oil` | 380.00 | 1 |
| [Silk skin tester](products/silk-skin-tester/product.md) | `silk-skin-tester` | 85.00 | 1 |
| [Summer skin](products/summer-skin/product.md) | `summer-skin` | 640.00 | 1 |
| [Summer skin perfume oil](products/summer-skin-perfume-oil/product.md) | `summer-skin-perfume-oil` | 380.00 | 1 |
| [Summer skin tester](products/summer-skin-tester/product.md) | `summer-skin-tester` | 85.00 | 1 |
| [Sundae perfume](products/sundae-perfume/product.md) | `sundae-perfume` | 640.00 | 1 |
| [Sundae perfume oil](products/sundae/product.md) | `sundae🍦` | 380.00 | 1 |
| [Sundae tester](products/sundae-tester/product.md) | `sundae-tester` | 90.00 | 1 |
| [Sweet oud perfume oil](products/sweet-oud-perfume-oil-1/product.md) | `sweet-oud-perfume-oil-1` | 400.00 | 1 |
| [Sweet oud perfume oil](products/sweet-oud-perfume-oil/product.md) | `sweet-oud-perfume-oil` | 380.00 | 2 |
| [Tan Line](products/tan-line/product.md) | `tan-line` | 850.00 | 1 |
| [Tan Line tester](products/tan-line-tester/product.md) | `tan-line-tester` | 85.00 | 1 |
| [Tester ذهب](products/tester-ذهب/product.md) | `tester-ذهب` | 80.00 | 1 |
| [The musk obsession bundle](products/the-musk-obsession-bundle/product.md) | `the-musk-obsession-bundle` | 900.00 | 1 |
| [Trio obsession](products/trio-obsession/product.md) | `trio-obsession` | 2167.50 | 4 |
| [Tropy Kiss](products/tropi-kiss/product.md) | `tropi-kiss` | 850.00 | 1 |
| [Tropy Kiss tester](products/tropy-kiss-tester/product.md) | `tropy-kiss-tester` | 85.00 | 1 |
| [Vanilla drizzle perfume oil](products/vanilla-drizzle-perfume-oil/product.md) | `vanilla-drizzle-perfume-oil` | 380.00 | 1 |
| [Vanille](products/vanille/product.md) | `vanille` | 850.00 | 1 |
| [Vanille tester](products/vanille-tester/product.md) | `vanille-tester` | 85.00 | 1 |
| [Velvet santal](products/velvet-santal/product.md) | `velvet-santal` | 850.00 | 1 |
| [Velvet santal perfume oil](products/velvet-santal-perfume-oil-1/product.md) | `velvet-santal-perfume-oil-1` | 480.00 | 1 |
| [Velvet Santal Roll-on](products/velvet-santal-perfume-oil/product.md) | `velvet-santal-perfume-oil` | 380.00 | 2 |
| [Velvet santal tester](products/velvet-santal-tester/product.md) | `velvet-santal-tester` | 85.00 | 1 |
| [Viral vanilla combo](products/viral-vanilla-combo/product.md) | `viral-vanilla-combo` | 1445.00 | 1 |
| [Watermelon musk](products/watermelon-musk/product.md) | `watermelon-musk` | 300.00 | 1 |
| [Watermelon musk perfume](products/watermelon-musk-perfume/product.md) | `watermelon-musk-perfume` | 640.00 | 1 |
| [Wifey](products/wifey/product.md) | `wifey` | 850.00 | 1 |
| [Wifey perfume oil](products/wifey-perfume-oil/product.md) | `wifey-perfume-oil` | 380.00 | 1 |
| [Wifey tester](products/wifey-tester/product.md) | `wifey-tester` | 85.00 | 1 |
| [بسبوسه](products/untitled-feb10_11-30/product.md) | `untitled-feb10_11-30` | 640.00 | 1 |
| [بسبوسه tester](products/بسبوسه-tester/product.md) | `بسبوسه-tester` | 85.00 | 1 |
| [ذهب](products/ذهب/product.md) | `ذهب` | 850.00 | 1 |
| [عود Leila](products/عود-leila/product.md) | `عود-leila` | 850.00 | 1 |
