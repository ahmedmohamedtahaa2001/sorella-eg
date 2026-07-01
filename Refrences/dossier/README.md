# Dossier — Website Content Archive (Design Inspiration Reference)

Full content extraction of **https://dossier.co/** — used as **design & content inspiration** for the Sorella redesign. Dossier is a US perfume brand selling affordable "impressions" (dupes) of designer fragrances, made in France.

- **Source:** https://dossier.co/  (headless Shopify storefront)
- **Extracted:** 2026-07-01
- **Products:** 192 · **Collections:** 217 · **Pages:** 70 · **Images:** 186 · **Design screenshots:** 5

> Extraction method: data comes from server-rendered HTML — JSON-LD `Product` schema (names, "inspired-by" brand, all sizes/prices/SKUs) plus the full rendered editorial copy (scent family, top/heart/base notes, ingredients, brand story). The `.json` API is not exposed on this headless storefront.

## Why this is useful for the Sorella redesign
- **Product page depth:** each fragrance has scent family, note pyramid (top/heart/base), ingredients, concentration, intensity, gender, and a long editorial story.
- **Positioning language:** the "Inspired by [designer]" framing, member vs. guest pricing, size tiers, and set/bundle structures.
- **IA / navigation:** rich taxonomy — by gender, by scent family, by theme (`sbt-*`), by inspiration brand (`inspired-by-*`), collections/originals/impressions.
- **Editorial pages:** scent-family explainers, layering guides, quiz, sustainability, about.

## Folder Structure
```
Refrences/dossier/
├── README.md                  ← this index
├── _site-meta/                sitemap.xml, robots.txt, url lists, JSON indexes, image manifest
├── _design-reference/screenshots/   full-page renders of key page types
├── products/<handle>/         product.json (JSON-LD+meta) · product.md (readable) · images/
├── collections/<handle>/      collection.json · collection.md (copy + product handles) · images/
└── pages/<handle>/            page.json · page.md (editorial text)
```

## Design Reference Screenshots  (`_design-reference/screenshots/`)
- `homepage-full.jpeg`
- `product-ambery-saffron-full.jpeg`
- `collection-women-full.jpeg`
- `page-scent-families-full.jpeg`
- `page-about-us-full.jpeg`

## Products — "Inspired by" Mapping

192 products. Each links to its full breakdown (notes, prices, story).

| Product | Inspired by | Prices (USD, member) | Folder |
|---|---|---|---|
| Advent Calendar | Dossier Perfumes | 44.1, 132.3 | [products/advent-calendar-2025](products/advent-calendar-2025/product.md) |
| Advent calendar | Dossier Perfumes | 44.1 | [products/advent-calendar-retail](products/advent-calendar-retail/product.md) |
| Airy Linens | Dossier Originals | 44.1 | [products/airy-linens](products/airy-linens/product.md) |
| All-time Bestsellers. | Dossier Perfumes | 105.3, 114.3 | [products/all-time-bestsellers](products/all-time-bestsellers/product.md) |
| Ambery Cedarwood | Mugler's Alien | 28.8 | [products/ambery-cedarwood](products/ambery-cedarwood/product.md) |
| Ambery Cherry | Tom Ford's Lost Cherry | 44.1, 142.2, 88.2, 132.3 | [products/ambery-cherry](products/ambery-cherry/product.md) |
| Ambery Cherry Room Diffuser | Tom Ford's Lost Cherry Perfume | 34.2 | [products/ambery-cherry-diffuser](products/ambery-cherry-diffuser/product.md) |
| Ambery Jasmine | Valentino’s Donna Born In Roma | 35.1, 53.1, 106.2, 169.2 | [products/ambery-jasmine](products/ambery-jasmine/product.md) |
| Ambery Lavender | Armani's Armani Code | 28.8 | [products/ambery-lavender](products/ambery-lavender/product.md) |
| Ambery Mint | Versace's Eros | 26.1, 26.1 | [products/ambery-mint](products/ambery-mint/product.md) |
| Ambery Neroli | Prada’s Paradoxe | 28.8 | [products/ambery-neroli](products/ambery-neroli/product.md) |
| Ambery Oakwood | By Kilian’s Angels’ Share | 44.1 | [products/ambery-oakwood](products/ambery-oakwood/product.md) |
| Ambery Peach | Tom Ford's Bitter Peach | 44.1 | [products/ambery-peach](products/ambery-peach/product.md) |
| Ambery Rose | Parfums de Marly’s Delina | 44.1 | [products/ambery-rose](products/ambery-rose/product.md) |
| Ambery Saffron | MFK's Baccarat Rouge 540 | 44.1, 71.1, 44.1, 142.2 | [products/ambery-saffron](products/ambery-saffron/product.md) |
| Ambery Saffron Room Diffuser | MFK's Baccarat Rouge 540 | 34.2, 34.2, 34.2, 34.2 | [products/ambery-saffron-room-diffuser](products/ambery-saffron-room-diffuser/product.md) |
| Ambery Sage | Tom Ford's Fucking Fabulous | 44.1 | [products/ambery-sage](products/ambery-sage/product.md) |
| Ambery Vanilla | YSL's Black Opium | 26.1, 44.1, 88.2, 52.2 | [products/ambery-vanilla](products/ambery-vanilla/product.md) |
| Ambery Vanilla Candle | YSL’s Black Opium Perfume | 35.1, 48.6, 35.1, 48.6 | [products/ambery-vanilla-candle](products/ambery-vanilla-candle/product.md) |
| Ambery Vanilla Room Diffuser | YSL's Black Opium Perfume | 34.2 | [products/ambery-vanilla-diffuser](products/ambery-vanilla-diffuser/product.md) |
| Ambery Vetiver | Byredo's Bal d'Afrique | 44.1 | [products/ambery-vetiver](products/ambery-vetiver/product.md) |
| Aquatic Coconut | Maison Margiela's Replica Beach Walk | 28.8, 0 | [products/aquatic-coconut](products/aquatic-coconut/product.md) |
| Aquatic Lime | Armani's Acqua Di Gio | 26.1, 26.1 | [products/aquatic-lime](products/aquatic-lime/product.md) |
| Aquatic Peony | Armani's Acqua Di Gioia | 28.8 | [products/aquatic-peony](products/aquatic-peony/product.md) |
| Aquatic Vanilla | Juliette Has A Gun's Vanilla Vibes | 28.8, 44.1, 88.2 | [products/aquatic-vanilla](products/aquatic-vanilla/product.md) |
| Aromatic Bergamot | YSL’s MYSLF | 28.8 | [products/aromatic-bergamot](products/aromatic-bergamot/product.md) |
| Aromatic Ginger | Louis Vuitton's L'Immensité | 44.1 | [products/aromatic-ginger](products/aromatic-ginger/product.md) |
| Aromatic Pineapple | YSL’s Y | 26.1, 44.1, 159.3, 26.1 | [products/aromatic-pineapple](products/aromatic-pineapple/product.md) |
| Aromatic Sage | Valentino's Born in Roma Uomo | 28.8 | [products/aromatic-sage](products/aromatic-sage/product.md) |
| Aromatic Star Anise | Dior's Sauvage | 26.1, 44.1, 0 | [products/aromatic-star-anise](products/aromatic-star-anise/product.md) |
| Aromatic Star Anise (Extreme) | Dior's Sauvage | 35.1, 96.3 | [products/aromatic-star-anise-extreme](products/aromatic-star-anise-extreme/product.md) |
| Aromatic Star Anise Candle | Dior's Sauvage Perfume | 35.1, 48.6 | [products/aromatic-star-anise-candle](products/aromatic-star-anise-candle/product.md) |
| Aromatic Watermelon | Ralph Lauren's Polo Blue | 28.8 | [products/aromatic-watermelon](products/aromatic-watermelon/product.md) |
| Autumn Rendezvous | Dossier Originals | 35.1 | [products/autumn-rendezvous](products/autumn-rendezvous/product.md) |
| Better Days | Dossier Originals | 44.1 | [products/better-days](products/better-days/product.md) |
| Better Together | Dossier Perfumes | 66.6 | [products/better-together](products/better-together/product.md) |
| Big Scent Energy | Dossier Perfumes | 26.1 | [products/big-scent-energy-trio-set](products/big-scent-energy-trio-set/product.md) |
| Black Shadow | Dossier Originals | 35.1 | [products/black-shadow](products/black-shadow/product.md) |
| Black Shadow (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/black-shadow-3ml](products/black-shadow-3ml/product.md) |
| Blooming For You | Dossier Originals | 35.1, 0 | [products/blooming-for-you](products/blooming-for-you/product.md) |
| Blue Breeze | Dossier Originals | 35.1 | [products/blue-breeze](products/blue-breeze/product.md) |
| Bubbly Spritz & Bitters | Dossier Originals | 35.1 | [products/bubbly-spritz-bitters](products/bubbly-spritz-bitters/product.md) |
| Bubbly Spritz Bitters (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/bubbly-spritz-bitters-3ml](products/bubbly-spritz-bitters-3ml/product.md) |
| Call Me Vanilla | Dossier Originals | 35.1, 0 | [products/call-me-vanilla](products/call-me-vanilla/product.md) |
| Caramelized Lavender & Hazelnut | Dossier Originals | 35.1 | [products/caramelized-lavender-hazelnut](products/caramelized-lavender-hazelnut/product.md) |
| Caramelized Lavender Hazelnut (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/caramelized-lavender-hazelnut-3ml](products/caramelized-lavender-hazelnut-3ml/product.md) |
| Chasing the Sun | Dossier Originals | 35.1, 35.1, 0 | [products/chasing-the-sun](products/chasing-the-sun/product.md) |
| Chasing The Sun (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/chasing-the-sun-3ml](products/chasing-the-sun-3ml/product.md) |
| Citrus Ginger | Chanel's Bleu de Chanel | 26.1, 0, 26.1 | [products/citrus-ginger](products/citrus-ginger/product.md) |
| Citrus Green Apple | Dolce & Gabbana's Light Blue Women | 28.8 | [products/citrus-green-apple](products/citrus-green-apple/product.md) |
| Citrus Marine | Dolce & Gabbana's Light Blue Men | 26.1, 26.1 | [products/citrus-marine](products/citrus-marine/product.md) |
| Citrus Matcha | Le Labo's Thé Matcha 26 | 44.1 | [products/citrus-matcha](products/citrus-matcha/product.md) |
| Citrus Neroli | Tom Ford's Neroli Portofino | 44.1 | [products/citrus-neroli](products/citrus-neroli/product.md) |
| Citrus Peony | Dior's Miss Dior Blooming Bouquet | 28.8 | [products/citrus-peony](products/citrus-peony/product.md) |
| Citrus Tea | Le Labo Fragrances' Thé Noir 29 | 44.1 | [products/citrus-tea](products/citrus-tea/product.md) |
| D+ Mystery Perfume | Dossier Samples | 44.1 | [products/d-mystery-perfume](products/d-mystery-perfume/product.md) |
| Daily Bliss Duo | Dossier Perfumes | 28.8 | [products/daily-bliss-duo](products/daily-bliss-duo/product.md) |
| Discovery Set | Dossier Perfumes | 89.1, 161.1, 339.3 | [products/discovery-set](products/discovery-set/product.md) |
| Dulce Flor | Dossier Originals | 44.1 | [products/dulce-flor](products/dulce-flor/product.md) |
| Fiery Leather & Rhubarb | Dossier Originals | 35.1 | [products/fiery-leather-rhubarb](products/fiery-leather-rhubarb/product.md) |
| Floral Aldehydes | Chanel's N°5 | 28.8 | [products/floral-aldehydes](products/floral-aldehydes/product.md) |
| Floral Berries | Jo Malone's Peony & Blush Suede | 28.8 | [products/floral-berries](products/floral-berries/product.md) |
| Floral Grapefruit | Chanel's Chance Eau Tendre | 28.8 | [products/floral-grapefruit](products/floral-grapefruit/product.md) |
| Floral Honeysuckle | Gucci's Bloom | 35.1, 35.1 | [products/floral-honeysuckle](products/floral-honeysuckle/product.md) |
| Floral Honeysuckle Room Diffuser | Gucci's Bloom Perfume | 34.2 | [products/floral-honeysuckle-diffuser](products/floral-honeysuckle-diffuser/product.md) |
| Floral Jasmine | Tom Ford's Jasmin Rouge | 44.1 | [products/floral-jasmine](products/floral-jasmine/product.md) |
| Floral Lavender | YSL's Libre | 26.1, 44.1, 0, 26.1 | [products/floral-lavender](products/floral-lavender/product.md) |
| Floral Marshmallow | By Kilian's Love, Don't Be Shy | 35.1, 53.1, 106.2, 72 | [products/floral-marshmallow](products/floral-marshmallow/product.md) |
| Floral Marshmallow Candle | By Kilian’s Love, Don’t Be Shy Perfume | 35.1, 48.6 | [products/floral-marshmallow-candle](products/floral-marshmallow-candle/product.md) |
| Floral Marshmallow Room Diffuser | By Kilian's Love, Don't Be Shy Perfume | 34.2 | [products/floral-marshmallow-diffuser](products/floral-marshmallow-diffuser/product.md) |
| Floral Musk | Lancome's Idole | 28.8 | [products/floral-musk](products/floral-musk/product.md) |
| Floral Pear | Jo Malone's English Pear and Freesia | 28.8 | [products/floral-pear](products/floral-pear/product.md) |
| Floral Peony | Chloe's Chloe | 28.8 | [products/floral-peony](products/floral-peony/product.md) |
| Floral Pink Pepper | Miss Dior Cherie (2017 version) | 28.8 | [products/floral-pink-pepper](products/floral-pink-pepper/product.md) |
| Floral Raspberry | Chanel's Chance Eau Splendide | 35.1 | [products/floral-raspberry](products/floral-raspberry/product.md) |
| Floral Rhubarb | Marc Jacobs' Perfect | 28.8 | [products/floral-rhubarb](products/floral-rhubarb/product.md) |
| Floral Rose | Le Labo Fragrances' Rose 31 | 44.1 | [products/floral-rose](products/floral-rose/product.md) |
| Floral Rose Candle | Le Labo Fragrances' Rose 31 Perfume | 35.1, 48.6 | [products/floral-rose-candle](products/floral-rose-candle/product.md) |
| Floral Sandalwood | MFK's Amyris Femme | 44.1 | [products/floral-sandalwood](products/floral-sandalwood/product.md) |
| Floral Violet | Marc Jacobs' Daisy | 28.8 | [products/floral-violet](products/floral-violet/product.md) |
| Floral Ylang Ylang | Chanel's Gabrielle | 28.8 | [products/floral-ylang-ylang](products/floral-ylang-ylang/product.md) |
| Fougere Bergamot | Versace's Dylan Blue | 28.8 | [products/fougere-bergamot](products/fougere-bergamot/product.md) |
| Fougere Lavender | Prada's Luna Rossa Carbon | 28.8 | [products/fougere-lavender](products/fougere-lavender/product.md) |
| Fougere Oud | Tom Ford's Oud Wood | 44.1, 117 | [products/fougere-oud](products/fougere-oud/product.md) |
| Fougere Pink Pepper | Gucci’s Guilty | 26.1, 26.1 | [products/fougere-pink-pepper](products/fougere-pink-pepper/product.md) |
| Free the Musk | Dossier Originals | 35.1 | [products/free-the-musk](products/free-the-musk/product.md) |
| Free The Musk (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/free-the-musk-3ml](products/free-the-musk-3ml/product.md) |
| Fresh Margarita & Lime | Dossier Originals | 35.1, 0 | [products/fresh-margarita-lime](products/fresh-margarita-lime/product.md) |
| From the Heart | Dossier Perfumes | 66.6 | [products/from-the-heart](products/from-the-heart/product.md) |
| Fruits of Love | Dossier Originals | 35.1 | [products/fruits-of-love](products/fruits-of-love/product.md) |
| Fruits Of Love (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/fruits-of-love-3ml](products/fruits-of-love-3ml/product.md) |
| Fruity Almond | Carolina Herrera’s Good Girl | 26.1, 44.1, 70.2, 88.2 | [products/fruity-almond](products/fruity-almond/product.md) |
| Fruity Brown Sugar | YSL's Mon Paris | 26.1, 52.2, 78.3, 44.1 | [products/fruity-brown-sugar](products/fruity-brown-sugar/product.md) |
| Fruity Gardenia | Gucci’s Flora Gorgeous Gardenia | 28.8 | [products/fruity-gardenia](products/fruity-gardenia/product.md) |
| Fruity Honey | Jo Malone's Nectarine Blossom & Honey | 28.8 | [products/fruity-honey](products/fruity-honey/product.md) |
| Fruity Jasmine | Dior's J’Adore | 26.1, 26.1 | [products/fruity-jasmine](products/fruity-jasmine/product.md) |
| Fruity Magnolia | Versace's Bright Crystal | 28.8 | [products/fruity-magnolia](products/fruity-magnolia/product.md) |
| Fruity Neroli | Armani's My Way | 26.1 | [products/fruity-neroli](products/fruity-neroli/product.md) |
| Fruity Oakmoss | Creed's Aventus For Her | 44.1 | [products/fruity-oakmoss](products/fruity-oakmoss/product.md) |
| Fruity Orange | Clinique's Happy | 28.8 | [products/fruity-orange](products/fruity-orange/product.md) |
| Fruity Peony | Giorgio Armani’s Prive Pivoine Suzhou | 28.8 | [products/fruity-peony](products/fruity-peony/product.md) |
| Fruity Vanilla | Burberry's Goddess | 35.1 | [products/fruity-vanilla](products/fruity-vanilla/product.md) |
| Fruity Violet | Burberry’s Her | 28.8, 57.6 | [products/fruity-violet](products/fruity-violet/product.md) |
| Ginger & Grapefruit Zing | Dossier Originals | 35.1 | [products/ginger-grapefruit-zing](products/ginger-grapefruit-zing/product.md) |
| Glow On The Go | Dossier Perfumes | 26.1 | [products/glow-on-the-go-trio-set](products/glow-on-the-go-trio-set/product.md) |
| Golden Rum & Amber | Dossier Originals | 35.1, 35.1, 35.1, 35.1 | [products/golden-rum-amber](products/golden-rum-amber/product.md) |
| Golden Rum Amber (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/golden-rum-amber-3ml](products/golden-rum-amber-3ml/product.md) |
| Gourmand Caramel | Rare Beauty's Rare | 28.8 | [products/gourmand-caramel](products/gourmand-caramel/product.md) |
| Gourmand Orange Blossom | Lancome's La Vie Est Belle | 26.1 | [products/gourmand-orange-blossom](products/gourmand-orange-blossom/product.md) |
| Gourmand Patchouli | Mugler's Angel | 28.8 | [products/gourmand-patchouli](products/gourmand-patchouli/product.md) |
| Gourmand Strawberry | Juliette has a Gun's Miami Shake | 28.8 | [products/gourmand-strawberry](products/gourmand-strawberry/product.md) |
| Gourmand Vanilla | Tom Ford’s Vanilla Sex | 44.1 | [products/gourmand-vanilla](products/gourmand-vanilla/product.md) |
| Gourmand White Flowers | Viktor&Rolf's Flowerbomb | 26.1, 44.1, 52.2 | [products/gourmand-white-flowers](products/gourmand-white-flowers/product.md) |
| Gourmand White Flowers (Extreme) | Viktor&Rolf's Flowerbomb | 35.1 | [products/gourmand-white-flowers-extreme](products/gourmand-white-flowers-extreme/product.md) |
| Gourmand White Flowers Room Diffuser | Viktor&Rolf's Flowerbomb Perfume | 34.2 | [products/gourmand-white-flowers-diffuser](products/gourmand-white-flowers-diffuser/product.md) |
| Green Fig | Dossier Byredo's Space Rage Travx | 35.1 | [products/green-fig](products/green-fig/product.md) |
| Green Lush | Dossier Originals | 35.1, 0 | [products/green-lush](products/green-lush/product.md) |
| Green Verbena | Creed's Green Irish Tweed | 48.6 | [products/green-verbena](products/green-verbena/product.md) |
| It Factor | Dossier Originals | 44.1, 90, 56.7 | [products/it-factor](products/it-factor/product.md) |
| Lost Americana | Dossier Originals | 44.1, 88.2 | [products/lost-americana](products/lost-americana/product.md) |
| Lost Americana (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/lost-americana-3ml](products/lost-americana-3ml/product.md) |
| Milky White | Dossier Originals | 35.1 | [products/milky-white](products/milky-white/product.md) |
| Musky Buttercream | Glossier's You Rêve | 28.8 | [products/musky-buttercream](products/musky-buttercream/product.md) |
| Musky Gaiac | Le Labo Fragrances' Gaïac 10 | 44.1 | [products/musky-gaiac](products/musky-gaiac/product.md) |
| Musky Green Tea | Creed's Silver Mountain Water | 44.1 | [products/musky-green-tea](products/musky-green-tea/product.md) |
| Musky Musk | Juliette has a Gun's Not a Perfume | 28.8, 44.1, 88.2, 169.2 | [products/musky-musk](products/musky-musk/product.md) |
| Musky Oakmoss | Creed's Aventus | 44.1, 44.1, 44.1 | [products/musky-oakmoss](products/musky-oakmoss/product.md) |
| Musky Rose | Narciso Rodriguez's For Her | 28.8 | [products/musky-rose](products/musky-rose/product.md) |
| Musky Sandalwood | Phlur's Missing Person | 28.8 | [products/musky-sandalwood](products/musky-sandalwood/product.md) |
| Musky Violet | Byredo’s Mojave Ghost | 44.1 | [products/musky-violet](products/musky-violet/product.md) |
| Mutual Chemistry. | Dossier Perfumes | 70.2 | [products/mutual-chemistry](products/mutual-chemistry/product.md) |
| Nace De Ti | Dossier Originals | 44.1 | [products/nace-de-ti](products/nace-de-ti/product.md) |
| Navidium Shipping Protection | _(no dedicated page — sample/utility)_ |  | [products/navidium-shipping-protection](products/navidium-shipping-protection/product.md) |
| Neroli Romance | Dossier Originals | 35.1, 0 | [products/neroli-romance](products/neroli-romance/product.md) |
| Neroli Romance (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/neroli-romance-3ml](products/neroli-romance-3ml/product.md) |
| Of The Hour | Dossier Originals | 44.1, 44.1, 88.2 | [products/of-the-hour](products/of-the-hour/product.md) |
| Orange Glow | Dossier Originals | 35.1 | [products/orange-glow](products/orange-glow/product.md) |
| Orchid & Sandalwood at Dusk | Dossier Originals | 35.1, 0 | [products/orchid-sandalwood-at-dusk](products/orchid-sandalwood-at-dusk/product.md) |
| Orchid Sandalwood At Dusk (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/orchid-sandalwood-at-dusk-3ml](products/orchid-sandalwood-at-dusk-3ml/product.md) |
| Originals Trial Set | Dossier Originals | 62.1 | [products/originals-trial-set](products/originals-trial-set/product.md) |
| Oud & Rose on Fire | Dossier Originals | 35.1, 35.1, 35.1, 35.1 | [products/oud-rose-on-fire](products/oud-rose-on-fire/product.md) |
| Oud Rose On Fire (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/oud-rose-on-fire-3ml](products/oud-rose-on-fire-3ml/product.md) |
| Pink Blossom | Dossier Originals | 35.1 | [products/pink-blossom](products/pink-blossom/product.md) |
| Powdery Coconut | Tom Ford's Soleil Blanc | 44.1 | [products/powdery-coconut](products/powdery-coconut/product.md) |
| Powdery Hawthorn | Tom Ford's Metallique | 28.8 | [products/powdery-hawthorn](products/powdery-hawthorn/product.md) |
| Powdery Jasmine | Viktor&Rolf’s Good Fortune | 28.8 | [products/powdery-jasmine](products/powdery-jasmine/product.md) |
| Powdery Orange Flower | Valentino's Voce Viva | 28.8 | [products/powdery-orange-flower](products/powdery-orange-flower/product.md) |
| Powdery Peach | Jimmy Choo's I Want Choo | 28.8 | [products/powdery-peach](products/powdery-peach/product.md) |
| Powdery Tobacco | Tom Ford's Tobacco Vanille | 35.1 | [products/powdery-tobacco](products/powdery-tobacco/product.md) |
| Powdery Vanilla | Phlur’s Vanilla Skin | 28.8 | [products/powdery-vanilla](products/powdery-vanilla/product.md) |
| Rose & Basil Bliss | Dossier Originals | 35.1, 0 | [products/rose-basil-bliss](products/rose-basil-bliss/product.md) |
| Rose Basil Bliss (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/rose-basil-bliss-3ml](products/rose-basil-bliss-3ml/product.md) |
| Sage & Black Tea Renew | Dossier Originals | 35.1, 35.1, 35.1, 0 | [products/sage-black-tea-renew](products/sage-black-tea-renew/product.md) |
| Slice of Heaven | Dossier Originals | 35.1, 35.1, 35.1, 35.1 | [products/slice-of-heaven](products/slice-of-heaven/product.md) |
| Slice Of Heaven (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/slice-of-heaven-3ml](products/slice-of-heaven-3ml/product.md) |
| Smoky Mezcal & Cucumber | Dossier Originals | 35.1 | [products/smoky-mezcal-cucumber](products/smoky-mezcal-cucumber/product.md) |
| Spicy Mimosa | Jo Malone's Mimosa & Cardamom | 28.8 | [products/spicy-mimosa](products/spicy-mimosa/product.md) |
| Spicy Orchid | Tom Ford's Black Orchid | 44.1 | [products/spicy-orchid](products/spicy-orchid/product.md) |
| Spicy Star Anise | Dior’s Sauvage Elixir | 35.1, 96.3 | [products/spicy-star-anise](products/spicy-star-anise/product.md) |
| Spicy Vanilla | Tom Ford's Noir | 35.1 | [products/spicy-vanilla](products/spicy-vanilla/product.md) |
| Spicy Vetiver | Hermes' Terre d'Hermes | 28.8 | [products/spicy-vetiver](products/spicy-vetiver/product.md) |
| Spring Fling | Dossier Originals | 35.1 | [products/spring-fling](products/spring-fling/product.md) |
| Springtime Sweetness Duo | Dossier Perfumes | 28.8 | [products/springtime-sweetness-duo](products/springtime-sweetness-duo/product.md) |
| Summer Crush | Dossier Originals | 35.1 | [products/summer-crush](products/summer-crush/product.md) |
| Summer Crush (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/summer-crush-3ml](products/summer-crush-3ml/product.md) |
| Sunny Vetiver & Neroli | Dossier Originals | 35.1 | [products/sunny-vetiver-neroli](products/sunny-vetiver-neroli/product.md) |
| Tantalizing Red | Dossier Originals | 35.1, 0 | [products/tantalizing-red](products/tantalizing-red/product.md) |
| Universal Crowd Pleasers. | Dossier Perfumes | 114.3 | [products/universal-crowd-pleasers](products/universal-crowd-pleasers/product.md) |
| Vip Membership | _(no dedicated page — sample/utility)_ |  | [products/vip-membership](products/vip-membership/product.md) |
| Winter Kiss | Dossier Originals | 35.1 | [products/winter-kiss](products/winter-kiss/product.md) |
| Woody Basil | YSL's L'Homme | 26.1, 26.1 | [products/woody-basil](products/woody-basil/product.md) |
| Woody Chestnut | Maison Margiela's Replica By the Fireplace | 28.8 | [products/woody-chestnut](products/woody-chestnut/product.md) |
| Woody Coriander | Dolce & Gabbana's The One | 28.8 | [products/woody-coriander](products/woody-coriander/product.md) |
| Woody Freesia | Armani's Sì | 28.8 | [products/woody-freesia](products/woody-freesia/product.md) |
| Woody Geranium | Montblanc's Legend | 26.1, 26.1 | [products/woody-geranium](products/woody-geranium/product.md) |
| Woody Ginger | Tom Ford's Tom Ford for Men | 28.8 | [products/woody-ginger](products/woody-ginger/product.md) |
| Woody Green Apple | Paco Rabanne's One Million | 26.1, 26.1 | [products/woody-green-apple](products/woody-green-apple/product.md) |
| Woody Hyacinth | Chanel's Chance | 28.8 | [products/woody-hyacinth](products/woody-hyacinth/product.md) |
| Woody Lychee | Louis Vuitton’s Attrape-Rêves | 44.1 | [products/woody-lychee](products/woody-lychee/product.md) |
| Woody Oakmoss | Chanel's Coco Mademoiselle | 28.8, 44.1, 28.8 | [products/woody-oakmoss](products/woody-oakmoss/product.md) |
| Woody Raspberry | Paco Rabanne's Lady Million | 28.8 | [products/woody-raspberry](products/woody-raspberry/product.md) |
| Woody Rum | By Kilian's Straight to Heaven | 38.7 | [products/woody-rum](products/woody-rum/product.md) |
| Woody Sage | Jo Malone's Wood Sage & Sea Salt | 26.1, 44.1, 0 | [products/woody-sage](products/woody-sage/product.md) |
| Woody Sage (Extreme) | Jo Malone's Wood Sage & Sea Salt | 35.1, 0 | [products/woody-sage-extreme](products/woody-sage-extreme/product.md) |
| Woody Sage Room Diffuser | Jo Malone's Wood Sage & Sea Salt | 34.2 | [products/woody-sage-room-diffuser](products/woody-sage-room-diffuser/product.md) |
| Woody Sandalwood | Le Labo Fragrances' Santal 33 | 44.1, 71.1, 142.2, 44.1 | [products/woody-sandalwood](products/woody-sandalwood/product.md) |
| Woody Sandalwood Room Diffuser | Le Labo's Santal 33 Perfume | 34.2 | [products/woody-sandalwood-diffuser](products/woody-sandalwood-diffuser/product.md) |
| Woody Tobacco | Maison Margiela's Replica Jazz Club | 35.1 | [products/woody-tobacco](products/woody-tobacco/product.md) |
| Woody Vanilla | Kayali's Vanilla 28 | 28.8 | [products/woody-vanilla](products/woody-vanilla/product.md) |
| Yellow Daze | Dossier Originals | 35.1, 0 | [products/yellow-daze](products/yellow-daze/product.md) |
| Zest for Life | Dossier Originals | 35.1 | [products/zest-for-life](products/zest-for-life/product.md) |
| Zest For Life (3ml sample) | _(no dedicated page — sample/utility)_ |  | [products/zest-for-life-3ml](products/zest-for-life-3ml/product.md) |

## Collections

217 collection/landing pages. Grouped by prefix:

### inspired-by-* (1)
[inspired-by-tom-ford](collections/inspired-by-tom-ford/collection.md)

### sbt-* (shop by theme) (160)
[sbt-after-christmas-perfume-sales](collections/sbt-after-christmas-perfume-sales/collection.md), [sbt-aldehydes-perfume](collections/sbt-aldehydes-perfume/collection.md), [sbt-almond-perfume](collections/sbt-almond-perfume/collection.md), [sbt-amber-perfume](collections/sbt-amber-perfume/collection.md), [sbt-authentic-perfumes](collections/sbt-authentic-perfumes/collection.md), [sbt-basil-perfume](collections/sbt-basil-perfume/collection.md), [sbt-bergamot-perfume](collections/sbt-bergamot-perfume/collection.md), [sbt-berries-perfume](collections/sbt-berries-perfume/collection.md), [sbt-best-event-perfumes](collections/sbt-best-event-perfumes/collection.md), [sbt-best-light-perfumes](collections/sbt-best-light-perfumes/collection.md), [sbt-best-offers](collections/sbt-best-offers/collection.md), [sbt-best-scents](collections/sbt-best-scents/collection.md), [sbt-birthday](collections/sbt-birthday/collection.md), [sbt-birthday-gifts-for-her](collections/sbt-birthday-gifts-for-her/collection.md), [sbt-birthday-gifts-for-him](collections/sbt-birthday-gifts-for-him/collection.md), [sbt-black-friday](collections/sbt-black-friday/collection.md), [sbt-black-friday-candle](collections/sbt-black-friday-candle/collection.md), [sbt-black-friday-gift-for-her](collections/sbt-black-friday-gift-for-her/collection.md), [sbt-black-friday-gift-for-him](collections/sbt-black-friday-gift-for-him/collection.md), [sbt-black-friday-men-perfume](collections/sbt-black-friday-men-perfume/collection.md), [sbt-black-pepper-perfume](collections/sbt-black-pepper-perfume/collection.md), [sbt-blackcurrant-perfume](collections/sbt-blackcurrant-perfume/collection.md), [sbt-cardamom-perfume](collections/sbt-cardamom-perfume/collection.md), [sbt-cedarwood-perfume](collections/sbt-cedarwood-perfume/collection.md), [sbt-cetalox-perfume](collections/sbt-cetalox-perfume/collection.md), [sbt-cheap-birthday-gifts-for-dad](collections/sbt-cheap-birthday-gifts-for-dad/collection.md), [sbt-cheap-birthday-gifts-for-her-or-for-wife](collections/sbt-cheap-birthday-gifts-for-her-or-for-wife/collection.md), [sbt-cheap-birthday-gifts-for-him](collections/sbt-cheap-birthday-gifts-for-him/collection.md), [sbt-cheap-gifts-for-mothers-day](collections/sbt-cheap-gifts-for-mothers-day/collection.md), [sbt-cheap-mom-birthday-gifts](collections/sbt-cheap-mom-birthday-gifts/collection.md), [sbt-cheap-valentines-day-gifts-for-her](collections/sbt-cheap-valentines-day-gifts-for-her/collection.md), [sbt-cheap-valentines-day-gifts-for-him](collections/sbt-cheap-valentines-day-gifts-for-him/collection.md), [sbt-cherry-almond-perfume](collections/sbt-cherry-almond-perfume/collection.md), [sbt-cherry-perfume](collections/sbt-cherry-perfume/collection.md), [sbt-cherry-vanilla-perfume](collections/sbt-cherry-vanilla-perfume/collection.md), [sbt-christmas-colognes](collections/sbt-christmas-colognes/collection.md), [sbt-christmas-perfume-gift-set](collections/sbt-christmas-perfume-gift-set/collection.md), [sbt-christmas-perfumes](collections/sbt-christmas-perfumes/collection.md), [sbt-cinnamon-perfume](collections/sbt-cinnamon-perfume/collection.md), [sbt-classic-fragrances](collections/sbt-classic-fragrances/collection.md), [sbt-cocoa-perfume](collections/sbt-cocoa-perfume/collection.md), [sbt-coconut-perfume](collections/sbt-coconut-perfume/collection.md), [sbt-coffee-perfume](collections/sbt-coffee-perfume/collection.md), [sbt-cologne-for-dads](collections/sbt-cologne-for-dads/collection.md), [sbt-coriander-perfume](collections/sbt-coriander-perfume/collection.md), [sbt-cyber-monday](collections/sbt-cyber-monday/collection.md), [sbt-cyber-monday-candle](collections/sbt-cyber-monday-candle/collection.md), [sbt-cyber-monday-gift-set](collections/sbt-cyber-monday-gift-set/collection.md), [sbt-dark-perfume](collections/sbt-dark-perfume/collection.md), [sbt-elegant-perfume](collections/sbt-elegant-perfume/collection.md), [sbt-everyday-perfumes](collections/sbt-everyday-perfumes/collection.md), [sbt-fall-perfumes](collections/sbt-fall-perfumes/collection.md), [sbt-fathers-day-candle](collections/sbt-fathers-day-candle/collection.md), [sbt-fathers-day-gift-set](collections/sbt-fathers-day-gift-set/collection.md), [sbt-fathers-day-gifts-cheap](collections/sbt-fathers-day-gifts-cheap/collection.md), [sbt-fig-perfume](collections/sbt-fig-perfume/collection.md), [sbt-freesia-perfume](collections/sbt-freesia-perfume/collection.md), [sbt-fresh-fruity-perfume](collections/sbt-fresh-fruity-perfume/collection.md), [sbt-fruity-perfumes](collections/sbt-fruity-perfumes/collection.md), [sbt-fun-perfumes](collections/sbt-fun-perfumes/collection.md), [sbt-gardenia-perfume](collections/sbt-gardenia-perfume/collection.md), [sbt-geranium-perfume](collections/sbt-geranium-perfume/collection.md), [sbt-ginger-perfume](collections/sbt-ginger-perfume/collection.md), [sbt-grapefruit-perfume](collections/sbt-grapefruit-perfume/collection.md), [sbt-green-apple-perfume](collections/sbt-green-apple-perfume/collection.md), [sbt-green-perfume](collections/sbt-green-perfume/collection.md), [sbt-green-tea-perfume](collections/sbt-green-tea-perfume/collection.md), [sbt-hawthorn-perfume](collections/sbt-hawthorn-perfume/collection.md), [sbt-honey-perfume](collections/sbt-honey-perfume/collection.md), [sbt-honeysuckle-perfume](collections/sbt-honeysuckle-perfume/collection.md), [sbt-hyacinth-perfume](collections/sbt-hyacinth-perfume/collection.md), [sbt-hypo-allergenic-perfume](collections/sbt-hypo-allergenic-perfume/collection.md), [sbt-incense-perfume](collections/sbt-incense-perfume/collection.md), [sbt-irresistible-perfumes](collections/sbt-irresistible-perfumes/collection.md), [sbt-jasmine-perfume](collections/sbt-jasmine-perfume/collection.md), [sbt-jasmine-vanilla-perfume](collections/sbt-jasmine-vanilla-perfume/collection.md), [sbt-lavender-perfume](collections/sbt-lavender-perfume/collection.md), [sbt-lemon-perfume](collections/sbt-lemon-perfume/collection.md), [sbt-light-perfumes](collections/sbt-light-perfumes/collection.md), [sbt-lily-perfume](collections/sbt-lily-perfume/collection.md), [sbt-lime-perfume](collections/sbt-lime-perfume/collection.md), [sbt-luxury-perfume](collections/sbt-luxury-perfume/collection.md), [sbt-lychee-perfume](collections/sbt-lychee-perfume/collection.md), [sbt-magnolia-perfume](collections/sbt-magnolia-perfume/collection.md), [sbt-maison-margiela-replica-perfume](collections/sbt-maison-margiela-replica-perfume/collection.md), [sbt-mint-perfume](collections/sbt-mint-perfume/collection.md), [sbt-modern-perfumes](collections/sbt-modern-perfumes/collection.md), [sbt-mothers-day-fragrance](collections/sbt-mothers-day-fragrance/collection.md), [sbt-musk-perfume](collections/sbt-musk-perfume/collection.md), [sbt-musk-perfumes](collections/sbt-musk-perfumes/collection.md), [sbt-musky-perfume](collections/sbt-musky-perfume/collection.md), [sbt-mysterious-perfume](collections/sbt-mysterious-perfume/collection.md), [sbt-narcissus-perfume](collections/sbt-narcissus-perfume/collection.md), [sbt-neroli-perfume](collections/sbt-neroli-perfume/collection.md), [sbt-new-fragrance](collections/sbt-new-fragrance/collection.md), [sbt-night-perfume](collections/sbt-night-perfume/collection.md), [sbt-orange-blossom-perfume](collections/sbt-orange-blossom-perfume/collection.md), [sbt-orange-perfume](collections/sbt-orange-perfume/collection.md), [sbt-orchid-perfume](collections/sbt-orchid-perfume/collection.md), [sbt-orris-perfume](collections/sbt-orris-perfume/collection.md), [sbt-oud-perfume](collections/sbt-oud-perfume/collection.md), [sbt-patchouli-perfume](collections/sbt-patchouli-perfume/collection.md), [sbt-peach-perfume](collections/sbt-peach-perfume/collection.md), [sbt-pear-perfume](collections/sbt-pear-perfume/collection.md), [sbt-peony-perfume](collections/sbt-peony-perfume/collection.md), [sbt-peppermint-perfume](collections/sbt-peppermint-perfume/collection.md), [sbt-perfume-for-allergies](collections/sbt-perfume-for-allergies/collection.md), [sbt-perfume-for-mom](collections/sbt-perfume-for-mom/collection.md), [sbt-perfume-for-sensitive-noses](collections/sbt-perfume-for-sensitive-noses/collection.md), [sbt-perfume-gift-sets-black-friday](collections/sbt-perfume-gift-sets-black-friday/collection.md), [sbt-perfume-sample-set](collections/sbt-perfume-sample-set/collection.md), [sbt-perfumes-for-women-black-friday](collections/sbt-perfumes-for-women-black-friday/collection.md), [sbt-perfumes-for-work](collections/sbt-perfumes-for-work/collection.md), [sbt-perfumes-original](collections/sbt-perfumes-original/collection.md), [sbt-perfumes-under-30](collections/sbt-perfumes-under-30/collection.md), [sbt-perfumes-under-50](collections/sbt-perfumes-under-50/collection.md), [sbt-perfumes-with-grapefruit-scent](collections/sbt-perfumes-with-grapefruit-scent/collection.md), [sbt-pineapple-perfume](collections/sbt-pineapple-perfume/collection.md), [sbt-pink-pepper-perfume](collections/sbt-pink-pepper-perfume/collection.md), [sbt-pistachio-perfume](collections/sbt-pistachio-perfume/collection.md), [sbt-pomegranate-perfume](collections/sbt-pomegranate-perfume/collection.md), [sbt-powder-scent-perfume](collections/sbt-powder-scent-perfume/collection.md), [sbt-powdery-perfumes](collections/sbt-powdery-perfumes/collection.md), [sbt-quality-perfume](collections/sbt-quality-perfume/collection.md), [sbt-raspberry-perfume](collections/sbt-raspberry-perfume/collection.md), [sbt-retro-perfume](collections/sbt-retro-perfume/collection.md), [sbt-rich-perfume](collections/sbt-rich-perfume/collection.md), [sbt-romantic-colognes](collections/sbt-romantic-colognes/collection.md), [sbt-romantic-fragrances](collections/sbt-romantic-fragrances/collection.md), [sbt-rose-perfume](collections/sbt-rose-perfume/collection.md), [sbt-saffron-perfume](collections/sbt-saffron-perfume/collection.md), [sbt-sage-perfume](collections/sbt-sage-perfume/collection.md), [sbt-sandalwood-perfume](collections/sbt-sandalwood-perfume/collection.md), [sbt-seductive-perfumes](collections/sbt-seductive-perfumes/collection.md), [sbt-shop-by-theme](collections/sbt-shop-by-theme/collection.md), [sbt-spring-fragrance](collections/sbt-spring-fragrance/collection.md), [sbt-strawberry-perfume](collections/sbt-strawberry-perfume/collection.md), [sbt-strong-perfumes](collections/sbt-strong-perfumes/collection.md), [sbt-summer-fragrances](collections/sbt-summer-fragrances/collection.md), [sbt-summer-perfume](collections/sbt-summer-perfume/collection.md), [sbt-sweet-perfume](collections/sbt-sweet-perfume/collection.md), [sbt-sweet-smelling-perfumes](collections/sbt-sweet-smelling-perfumes/collection.md), [sbt-timeless-perfume](collections/sbt-timeless-perfume/collection.md), [sbt-tobacco-perfume](collections/sbt-tobacco-perfume/collection.md), [sbt-tonka-bean-perfume](collections/sbt-tonka-bean-perfume/collection.md), [sbt-tuberose-perfume](collections/sbt-tuberose-perfume/collection.md), [sbt-unique-perfumes](collections/sbt-unique-perfumes/collection.md), [sbt-valentines-day-perfume-gift-sets](collections/sbt-valentines-day-perfume-gift-sets/collection.md), [sbt-vanilla-perfume](collections/sbt-vanilla-perfume/collection.md), [sbt-vegan-perfumes](collections/sbt-vegan-perfumes/collection.md), [sbt-verbena-perfume](collections/sbt-verbena-perfume/collection.md), [sbt-very-romantic-perfume](collections/sbt-very-romantic-perfume/collection.md), [sbt-vetiver-perfume](collections/sbt-vetiver-perfume/collection.md), [sbt-warm-fragrance](collections/sbt-warm-fragrance/collection.md), [sbt-watermelon-perfume](collections/sbt-watermelon-perfume/collection.md), [sbt-wedding-perfumes](collections/sbt-wedding-perfumes/collection.md), [sbt-white-flowers-perfume](collections/sbt-white-flowers-perfume/collection.md), [sbt-winter-perfumes](collections/sbt-winter-perfumes/collection.md), [sbt-ylang-ylang-perfume](collections/sbt-ylang-ylang-perfume/collection.md), [sbt-yuzu-perfume](collections/sbt-yuzu-perfume/collection.md)

### sets/bundles (8)
[ambery-vanilla-set](collections/ambery-vanilla-set/collection.md), [floral-marshmallow-set](collections/floral-marshmallow-set/collection.md), [for-everyone-set](collections/for-everyone-set/collection.md), [for-her-set](collections/for-her-set/collection.md), [for-him-set](collections/for-him-set/collection.md), [shop-sets](collections/shop-sets/collection.md), [the-genderless-set](collections/the-genderless-set/collection.md), [woody-sandalwood-set](collections/woody-sandalwood-set/collection.md)

### core & other (48)
[4th-of-july](collections/4th-of-july/collection.md), [all](collections/all/collection.md), [all-perfumes](collections/all-perfumes/collection.md), [ambery-passion-layering-combo](collections/ambery-passion-layering-combo/collection.md), [best-men](collections/best-men/collection.md), [best-women](collections/best-women/collection.md), [bestseller](collections/bestseller/collection.md), [bestseller-perfumes](collections/bestseller-perfumes/collection.md), [candles](collections/candles/collection.md), [cute-sweet-layering-combo](collections/cute-sweet-layering-combo/collection.md), [diffusers](collections/diffusers/collection.md), [dossier-home](collections/dossier-home/collection.md), [dossier-originals](collections/dossier-originals/collection.md), [fathers-day](collections/fathers-day/collection.md), [gc-affordable-women-s-perfume](collections/gc-affordable-women-s-perfume/collection.md), [gc-clean-scent-perfume](collections/gc-clean-scent-perfume/collection.md), [gc-designer-perfume-for-women](collections/gc-designer-perfume-for-women/collection.md), [gc-fancy-cologne](collections/gc-fancy-cologne/collection.md), [gc-floral-perfumes-for-women](collections/gc-floral-perfumes-for-women/collection.md), [gc-french-perfume-for-men](collections/gc-french-perfume-for-men/collection.md), [gc-french-perfumes-for-women](collections/gc-french-perfumes-for-women/collection.md), [gc-fresh-perfumes-for-women](collections/gc-fresh-perfumes-for-women/collection.md), [gc-fruity-women-s-perfumes](collections/gc-fruity-women-s-perfumes/collection.md), [gc-high-end-perfumes](collections/gc-high-end-perfumes/collection.md), [gc-light-perfume-for-women](collections/gc-light-perfume-for-women/collection.md), [gc-strong-perfume-for-women](collections/gc-strong-perfume-for-women/collection.md), [gc-sweet-women-s-perfume](collections/gc-sweet-women-s-perfume/collection.md), [girls-perfumes](collections/girls-perfumes/collection.md), [high-end-cologne](collections/high-end-cologne/collection.md), [long-lasting-women-s-perfumes](collections/long-lasting-women-s-perfumes/collection.md), [mature-perfume](collections/mature-perfume/collection.md), [memorial-day](collections/memorial-day/collection.md), [men](collections/men/collection.md), [mothersday](collections/mothersday/collection.md), [new-arrivals](collections/new-arrivals/collection.md), [new-candles](collections/new-candles/collection.md), [perfume-for-girlfriend](collections/perfume-for-girlfriend/collection.md), [perfumes](collections/perfumes/collection.md), [perfumes-for-teenage-girls](collections/perfumes-for-teenage-girls/collection.md), [quiz-you-may-also-like](collections/quiz-you-may-also-like/collection.md), [speakeasy](collections/speakeasy/collection.md), [spicy-strong-layering-combo](collections/spicy-strong-layering-combo/collection.md), [teenage-perfume](collections/teenage-perfume/collection.md), [the-genderless-collection](collections/the-genderless-collection/collection.md), [unisex](collections/unisex/collection.md), [unisex-bestseller-1](collections/unisex-bestseller-1/collection.md), [valentine-s-day](collections/valentine-s-day/collection.md), [women](collections/women/collection.md)

## Pages

- [About us](pages/about-dossier-originals/page.md) — `about-dossier-originals`
- [About us](pages/about-room-diffusers/page.md) — `about-room-diffusers`
- [About us](pages/about-us/page.md) — `about-us`
- [ACCESSIBILITY AND EQUITABLE USE STATEMENT | Page](pages/accessibility-and-equitable-use-statement/page.md) — `accessibility-and-equitable-use-statement`
- [Dossier Rewards](pages/account/page.md) — `account`
- [Ambery family](pages/ambery-family/page.md) — `ambery-family`
- [Ambery Saffron | Page](pages/ambery-saffron/page.md) — `ambery-saffron`
- [Ambery Vanilla | Page](pages/ambery-vanilla/page.md) — `ambery-vanilla`
- [Apps | Dossier](pages/app/page.md) — `app`
- [Aquatic family](pages/aquatic-family/page.md) — `aquatic-family`
- [Aromatic family](pages/aromatic-family/page.md) — `aromatic-family`
- [All Perfumes](pages/bundle/page.md) — `bundle`
- [Bundles | Page](pages/bundles/page.md) — `bundles`
- [Cancel Membership Dossier Plus | Page](pages/cancel-dossier-plus/page.md) — `cancel-dossier-plus`
- [About us](pages/candles/page.md) — `candles`
- [Citrus family](pages/citrus-family/page.md) — `citrus-family`
- [Mix & Match | Page](pages/collection-bundles/page.md) — `collection-bundles`
- [Contact](pages/contact/page.md) — `contact`
- [Cookies declaration | Page](pages/cookies-declaration/page.md) — `cookies-declaration`
- [D+ survey | Page](pages/d-survey/page.md) — `d-survey`
- [Your Privacy Choices | Page](pages/data-sharing-opt-out/page.md) — `data-sharing-opt-out`
- [Do not sell](pages/do-not-sell/page.md) — `do-not-sell`
- [Drop Day | Page](pages/dossier-drop-day/page.md) — `dossier-drop-day`
- [Dossier originals | Page](pages/dossier-originals/page.md) — `dossier-originals`
- [Dossier Plus](pages/dossier-plus/page.md) — `dossier-plus`
- [DOSSIER Subscribe Page | Page](pages/dossier-subscribe-page/page.md) — `dossier-subscribe-page`
- [Select your exchange items | Page](pages/exchange-item-selection/page.md) — `exchange-item-selection`
- [Dossier FAQ](pages/faq/page.md) — `faq`
- [First Nolita Boutique](pages/first-popup-store/page.md) — `first-popup-store`
- [First popup store](pages/floral-family/page.md) — `floral-family`
- [Floral Marshmallow | Page](pages/floral-marshmallow/page.md) — `floral-marshmallow`
- [Floriental Family](pages/floriential-family/page.md) — `floriential-family`
- [Fortune Teller | Page](pages/fortune-teller/page.md) — `fortune-teller`
- [Fougere Family](pages/fougere-family/page.md) — `fougere-family`
- [Fruity Family](pages/fruity-family/page.md) — `fruity-family`
- [Gourmand Family](pages/gourmand-family/page.md) — `gourmand-family`
- [Green Family](pages/green-family/page.md) — `green-family`
- [Index - Dossier Perfumes](pages/index/page.md) — `index`
- [Mean Girls Quiz | Page](pages/mean-girls-quiz/page.md) — `mean-girls-quiz`
- [Dosier Monthly Mystery Perfume Giveaway](pages/monthly-mystery-perfume-giveaway/page.md) — `monthly-mystery-perfume-giveaway`
- [Musky Family](pages/musky-family/page.md) — `musky-family`
- [Dossier Perfumes | Made in France perfumes, fair-prices](pages/perfume-layering/page.md) — `perfume-layering`
- [Powdery Family](pages/powdery-family/page.md) — `powdery-family`
- [Privacy Policy | Page](pages/privacy-terms/page.md) — `privacy-terms`
- [Perfume Quiz : What Fragrance Should I Wear Quiz](pages/quiz/page.md) — `quiz`
- [Refer | Page](pages/refer/page.md) — `refer`
- [Refer a Friend | Dossier](pages/referral/page.md) — `referral`
- [Request a Perfume | Page](pages/request-a-perfume/page.md) — `request-a-perfume`
- [returngo | Page](pages/returngo/page.md) — `returngo`
- [Returns](pages/returns/page.md) — `returns`
- [Returns and Exchanges - test | Page](pages/returns-and-exchanges-test/page.md) — `returns-and-exchanges-test`
- [Dossier Perfumes Review ](pages/reviews/page.md) — `reviews`
- [Dossier Rewards](pages/rewards/page.md) — `rewards`
- [About us](pages/risk-free/page.md) — `risk-free`
- [S - test | Page](pages/s-test/page.md) — `s-test`
- [Dossier Perfumes | Made in France perfumes, fair-prices](pages/sample-sale-terms-conditions/page.md) — `sample-sale-terms-conditions`
- [Scent famillies](pages/scent-families/page.md) — `scent-families`
- [Shop along | Page](pages/shop-along/page.md) — `shop-along`
- [Speakeasy Teasing | Page](pages/speakeasy-teasing/page.md) — `speakeasy-teasing`
- [Spicy family](pages/spicy-family/page.md) — `spicy-family`
- [Dossier Perfumes at Walmart store: Find us at Walmart](pages/store-locator/page.md) — `store-locator`
- [Dossier | Made in France perfumes, fair-prices](pages/subscribers/page.md) — `subscribers`
- [About us](pages/sustainability/page.md) — `sustainability`
- [Dossier Perfumes | Made in France perfumes, fair-prices](pages/terms-conditions/page.md) — `terms-conditions`
- [Dossier Perfumes | Made in France perfumes, fair-prices](pages/terms-conditions-tbyb/page.md) — `terms-conditions-tbyb`
- [The Speakeasy Colleciton](pages/the-speakeasy-collection/page.md) — `the-speakeasy-collection`
- [Track your order | Page](pages/track-your-order/page.md) — `track-your-order`
- [Wellness Collection | Page](pages/wellness-collection-coming-soon/page.md) — `wellness-collection-coming-soon`
- [Woody family](pages/woody-family/page.md) — `woody-family`
- [Your Privacy Choices | Page](pages/your-privacy-choices/page.md) — `your-privacy-choices`

_Note: collection cover images are sparse (only ~11 of 217 set an og:image on dossier's side); the real visual asset library is the product bottle/lifestyle imagery under `products/*/images/`. 2 sitemap pages (`catch`, `ugcvideoshop`) return 400/500 and were skipped; 7 product sitemap entries are stale 404s._