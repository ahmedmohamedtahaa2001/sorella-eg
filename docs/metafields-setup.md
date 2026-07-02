# Sorella — Merchant Setup Guide

Everything the theme reads from store data (metafields, menus, settings) but cannot
ship with defaults. Work through this before launch.

## 1. Product metafields the theme reads

Create these product metafield definitions in **Settings → Custom data → Products**.
All use the namespace `sorella`.

| Metafield key | Type | Used by | Notes |
| --- | --- | --- | --- |
| `sorella.notes_top` | Single line text | Notes Pyramid section (product page) | Comma-separated list, e.g. `Hibiscus, Rose` |
| `sorella.notes_heart` | Single line text | Notes Pyramid section | Comma-separated list |
| `sorella.notes_base` | Single line text | Notes Pyramid section | Comma-separated list |
| `sorella.notes_summary` | Single line text | Product cards | Short comma list shown under the title, e.g. `Vanilla · Musk · Amber` |
| `sorella.inspired_by` | Single line text | "Inspired by" tag on the product page | **LEAVE EMPTY pending legal sign-off.** A blank value hides the tag entirely. |

The Notes Pyramid section renders nothing when all three of `notes_top` /
`notes_heart` / `notes_base` are blank — no empty shell, so it is safe to fill
these in gradually.

## 2. Notes seeding map (from live product descriptions)

Values below were extracted from the current live product descriptions. Enter them
into the metafields above (product handle → tiers).

### Products with a published top/heart/base breakdown

| Product handle | Top | Heart | Base |
| --- | --- | --- | --- |
| `midnight-muse` | Hibiscus, Rose | Spices, Leather | Vanilla, Musk, Amber |
| `classy-v` | Vanilla Orchid, Jasmine | Brown Sugar, Tonka Bean | Amber, Musk, Patchouli |
| `tan-line` | Rosemary, Coconut Water, Sea Breeze Accord | Tiare Flower, Ylang-Ylang, Jasmine | Vanilla, White Musk, Driftwood |
| `tropi-kiss` | Sparkling Lychee, Blackcurrant, Italian Lemon | Rose Damascena, Peony, Magnolia | Sugared Amber, Musk, Vanilla |
| `wifey` / `wifey-perfume-oil` | Sparkling Champagne, White Freesia, Blackcurrant | Nectarine, Pink Praline, Jasmine, Rose Damascena, Orange Blossom | Sugared Musk, Sandalwood, Oakmoss, Amber Woods, Vanilla Absolute |

### Editorial splits for flat-note products

These products list notes without tiers on the live site; the split below is an
editorial suggestion so the pyramid still reads well.

| Product handle | Top | Heart | Base |
| --- | --- | --- | --- |
| `velvet-santal` | Sugar cane | Vanilla, Tonka beans | Amber, Oud |
| `arabian-lace` | Liquor | Plum | Oud |
| `silk-skin` | Fig, Cassis | Water Lily, Iris, Jasmine | Sandalwood, Vanilla, Patchouli, Soft Musk |
| `عود-leila` | Roses | Leather | Oud, Sandalwood |

## 3. Navigation menus to build

Build these in **Online Store → Navigation**. The theme reads menus by handle.

### `main-menu`

| Label | Link |
| --- | --- |
| For Her | For Her collection |
| For Him | For Him collection |
| Unisex | Unisex collection |
| Perfume Oil | `/collections/perfume-oil` — note the handle is `perfume-oil`, **NOT** `perfume-oils` |
| Bundles | Bundles collection |

### Footer menus

| Menu handle | Suggested contents |
| --- | --- |
| `footer-shop` | For Her, For Him, Unisex, Perfume Oil, Bundles, 5ml Testers |
| `footer-brand` | About us, Contact, FAQ |
| `footer-care` | Shipping policy, Refund policy, Privacy policy, Terms of service |

## 4. Launch checklist (theme settings — no defaults shipped)

Set these in the theme editor (**Customize → Theme settings**) before launch:

- [ ] **Logo** — upload the Sorella wordmark.
- [ ] **Logo mark** — the compact monogram used in tight spots (nav dock, favicon fallback).
- [ ] **Favicon** — currently 404s on the live site; upload a square mark.
- [ ] **Contact email** — used by the contact page and footer.
- [ ] **Social links** — Instagram and TikTok are pre-filled (`@sorella.fragrances`); add any others.

Also confirm the collections the templates reference exist with these handles:
`50ml-perfumes` (404 page carousel), `5-ml-testers` (cart-drawer upsell),
`free-gift-5ml` (FAQ link).
