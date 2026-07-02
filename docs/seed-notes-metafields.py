#!/usr/bin/env python3
"""Seed sorella.* notes metafields on live products.

Values come from docs/metafields-setup.md §2 (extracted from the live product
descriptions). Definitions already exist (created 2026-07-02). Run:

    SHOPIFY_ADMIN_TOKEN=shpat_xxx SHOPIFY_STORE=xn4105-tf.myshopify.com \\
        python3 docs/seed-notes-metafields.py

The token/store are read from the environment (or the repo-root .env, which is
gitignored) — never hardcode credentials in this file.
`sorella.inspired_by` is intentionally NOT set — pending legal sign-off.
"""
import json, os, urllib.request

def _load_env():
    """Populate os.environ from a .env file at the repo root if present."""
    here = os.path.dirname(os.path.abspath(__file__))
    env_path = os.path.join(here, os.pardir, '.env')
    if not os.path.exists(env_path):
        return
    for line in open(env_path):
        if ':' in line and 'Admin Access Token' in line:
            os.environ.setdefault('SHOPIFY_ADMIN_TOKEN', line.split(':')[-1].strip())
        elif line.lower().startswith('store domain'):
            os.environ.setdefault('SHOPIFY_STORE', line.split(':', 1)[-1].strip())

_load_env()
TOKEN = os.environ.get('SHOPIFY_ADMIN_TOKEN')
STORE = os.environ.get('SHOPIFY_STORE', 'xn4105-tf.myshopify.com')
if not TOKEN:
    raise SystemExit('Set SHOPIFY_ADMIN_TOKEN (or add it to the repo-root .env) before running.')
URL = f'https://{STORE}/admin/api/2024-10/graphql.json'

def gql(q, v=None):
    req = urllib.request.Request(URL, json.dumps({'query': q, 'variables': v or {}}).encode(),
                                 {'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json'})
    return json.load(urllib.request.urlopen(req))

NOTES = {
 'midnight-muse': ('Hibiscus, Rose', 'Spices, Leather', 'Vanilla, Musk, Amber'),
 'classy-v': ('Vanilla Orchid, Jasmine', 'Brown Sugar, Tonka Bean', 'Amber, Musk, Patchouli'),
 'tan-line': ('Rosemary, Coconut Water, Sea Breeze Accord', 'Tiare Flower, Ylang-Ylang, Jasmine', 'Vanilla, White Musk, Driftwood'),
 'tropi-kiss': ('Sparkling Lychee, Blackcurrant, Italian Lemon', 'Rose Damascena, Peony, Magnolia', 'Sugared Amber, Musk, Vanilla'),
 'wifey': ('Sparkling Champagne, White Freesia, Blackcurrant', 'Nectarine, Pink Praline, Jasmine, Rose Damascena, Orange Blossom', 'Sugared Musk, Sandalwood, Oakmoss, Amber Woods, Vanilla Absolute'),
 'wifey-perfume-oil': ('Sparkling Champagne, White Freesia, Blackcurrant', 'Nectarine, Pink Praline, Jasmine, Rose Damascena, Orange Blossom', 'Sugared Musk, Sandalwood, Oakmoss, Amber Woods, Vanilla Absolute'),
 'velvet-santal': ('Sugar cane', 'Vanilla, Tonka beans', 'Amber, Oud'),
 'arabian-lace': ('Liquor', 'Plum', 'Oud'),
 'silk-skin': ('Fig, Cassis', 'Water Lily, Iris, Jasmine', 'Sandalwood, Vanilla, Patchouli, Soft Musk'),
 'عود-leila': ('Roses', 'Leather', 'Oud, Sandalwood'),
}

MUT = 'mutation set($mf: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $mf) { metafields { key } userErrors { field message } } }'

for handle, (top, heart, base) in NOTES.items():
    r = gql('query($h: String!){ productByHandle(handle: $h){ id title } }', {'h': handle})
    prod = r['data']['productByHandle']
    if not prod:
        print(f'MISSING product: {handle}')
        continue
    summary = ' · '.join(x.strip() for x in base.split(',')[:3])
    mfs = [{'ownerId': prod['id'], 'namespace': 'sorella', 'key': k, 'type': 'single_line_text_field', 'value': v}
           for k, v in [('notes_top', top), ('notes_heart', heart), ('notes_base', base), ('notes_summary', summary)]]
    res = gql(MUT, {'mf': mfs})['data']['metafieldsSet']
    print(f"{handle}: {'OK' if not res['userErrors'] else res['userErrors']} ({prod['title']})")
