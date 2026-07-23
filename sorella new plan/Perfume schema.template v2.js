/**
 * SORELLA — Perfume Product Data Template (v2)
 * ----------------------------------------
 * One object like this = one SKU (one bottle size line belongs inside `sizes`,
 * NOT as a separate product — see 2.5).
 *
 * Fields marked REQUIRED must be filled before a product can go live.
 * Fields marked CALCULATED are derived by the backend — never entered manually.
 * Fields marked LOCKED must only use values from `CANONICAL_TAGS` below —
 * never free text, or the filters/quiz/recommendation engine will silently break.
 *
 * v2 changelog vs original template:
 * - CANONICAL_TAGS fully synced with "Sorella canonical tags" doc (expanded season,
 *   timeOfDay, occasion, mood, sillage, sourceType, genderPositioning, stockStatus lists)
 * - Added `concentration` tag category (was missing entirely) + new field identity.concentration
 * - Added `fragranceFamily` tag category (standardized against the Fragrance Wheel)
 * - identity.fragranceFamily is now LOCKED to CANONICAL_TAGS.fragranceFamily instead of free text
 *   (this was a conflict between the v1 template and the canonical tags doc — now resolved)
 */

// ---------------------------------------------------------------------------
// Canonical Tag Dictionary (locked, shared across all products)
// Source of truth: "Sorella canonical tags" doc
// ---------------------------------------------------------------------------
const CANONICAL_TAGS = {

  season: [
    "Summer", "Winter", "Spring", "Autumn", "Spring/Autumn", "All-Season",
  ],

  timeOfDay: [
    "Day", "Evening", "Night", "Day-to-Night",
  ],

  occasion: [
    "Formal", "Casual", "Office", "Date Night", "Special Occasion",
    "Wedding", "Everyday", "Party/Night Out", "Travel", "Gym/Active",
  ],

  mood: [
    "Confident", "Warm", "Fresh", "Calming", "Seductive", "Energizing",
    "Elegant", "Nocturnal", "Romantic", "Playful", "Mysterious",
    "Sophisticated", "Bold", "Comforting", "Clean", "Sensual",
  ],

  sillage: [
    "Intimate", "Moderate", "Strong", "Enormous",
  ],

  olfactiveRole: [
    "Top", "Heart", "Base",
  ],

  sourceType: [
    "Natural", "Synthetic", "Nature-Identical",
  ],

  genderPositioning: [
    "Masculine", "Masculine-Leaning", "Feminine", "Feminine-Leaning", "Unisex",
  ],

  stockStatus: [
    "In Stock", "Low Stock", "Sold Out", "Pre-Order", "Coming Soon", "Backorder",
  ],

  // v2: NEW — was missing from original template. Drives price tier + longevity expectations.
  concentration: [
    "Parfum/Extrait", "Eau de Parfum (EDP)", "Eau de Toilette (EDT)",
    "Eau de Cologne (EDC)", "Eau Fraiche",
  ],

  // v2: NEW — standardized against the Fragrance Wheel. Was previously free text.
  fragranceFamily: [
    "Floral", "Soft Floral", "Floral Oriental", "Soft Oriental", "Oriental",
    "Woody Oriental", "Wood", "Mossy Woods", "Dry Woods", "Citrus", "Green",
    "Water/Aquatic", "Fruity", "Aromatic Fougere", "Gourmand", "Chypre",
    "Leather", "Spicy", "Powdery", "Aldehydic",
  ],
};

// ---------------------------------------------------------------------------
// Product template
// ---------------------------------------------------------------------------
const perfumeProductTemplate = {

  // 2.1 — Identity & Positioning
  identity: {
    productName: "",          // REQUIRED — string, e.g. "Velvet Amber Nights"
    sku: "",                  // REQUIRED — string, e.g. "SOR-EDP-014"
    fragranceFamily: "",      // REQUIRED — v2: now LOCKED to CANONICAL_TAGS.fragranceFamily (was free text in v1)
    concentration: "",        // v2: NEW — REQUIRED, LOCKED to CANONICAL_TAGS.concentration, e.g. "Eau de Parfum (EDP)"
    genderPositioning: "",    // LOCKED — CANONICAL_TAGS.genderPositioning
    valueProposition: "",     // REQUIRED — 1-2 sentences, the feeling it sells
    brandStory: "",           // 80-150 words — who it's for, why it exists
  },

  // 2.2 — The Olfactory Journey
  olfactoryJourney: {
    topNotes: [
      // REQUIRED — each ingredient paired with the mood it creates
      // { ingredient: "Bergamot", mood: "Energizing" },
    ],
    heartNotes: [
      // { ingredient: "Jasmine", mood: "Sensual" },
    ],
    baseNotes: [
      // { ingredient: "Amber", mood: "Warm" },
    ],
    overallMoodTags: [], // 3-5 values, LOCKED to CANONICAL_TAGS.mood
  },

  // 2.3 — Ingredients & Effects (full list, not just headline notes)
  ingredients: [
    // {
    //   name: "Cedarwood",              // REQUIRED
    //   olfactiveRole: "Base",          // LOCKED — CANONICAL_TAGS.olfactiveRole
    //   effect: "Grounding, woody warmth", // REQUIRED
    //   sourceType: "Natural",          // LOCKED — CANONICAL_TAGS.sourceType
    //   allergenFlag: {
    //     flag: false,                  // REQUIRED — true/false
    //     note: "",                     // required if flag is true
    //   },
    // },
  ],

  // 2.4 — Dupe / Inspired-By Data (omit entire object if not applicable)
  dupe: {
    inspiredBy: "",             // e.g. "Tom Ford Tobacco Vanille"
    similarityPercentage: null, // number 0-100, e.g. 92
    sharedIngredients: [],      // e.g. ["Tobacco", "Vanilla", "Spice"]
    deliberateDifferences: "",  // what was changed on purpose, and why
  },

  // 2.5 — Sizes, Pricing & Upsell Data (one entry per bottle size)
  sizes: [
    // {
    //   size: "50ml",                  // REQUIRED
    //   price: 950,                    // REQUIRED — number
    //   currency: "EGP",
    //   costPerSpray: null,            // CALCULATED — price / estimatedSprays
    //   savingsVsSmallestSize: null,   // CALCULATED — percentage
    //   stockStatus: "In Stock",       // REQUIRED — LOCKED CANONICAL_TAGS.stockStatus
    // },
  ],

  // 2.6 — Performance Meters
  performance: {
    longevityHours: "",           // REQUIRED — e.g. "7-8 hours"
    sillage: "",                  // REQUIRED — LOCKED CANONICAL_TAGS.sillage
    bestWornOnSkinTypeNote: "",   // optional
    estimatedSpraysPerBottle: null, // REQUIRED — number, e.g. 200 (per reference size)
    replenishmentEstimate: null,    // CALCULATED — e.g. "~6 weeks"
  },

  // 2.7 — Occasion, Season & Discovery Tags (all LOCKED, all multi-select)
  tags: {
    season: [],       // subset of CANONICAL_TAGS.season
    timeOfDay: [],     // subset of CANONICAL_TAGS.timeOfDay
    occasion: [],      // subset of CANONICAL_TAGS.occasion
    quizAnswerMapping: [], // e.g. ["Woody", "Confident", "Strong"]
  },

  // 2.8 — Relationship Data
  relationships: {
    layeringPartners: [
      // { sku: "SOR-EDP-021", note: "Pairs for a brighter daytime version" },
    ],
    bundleMembership: [], // e.g. ["Date Night Duo", "Travel Starter Set"]
    relatedByIngredientPool: [], // e.g. ["SOR-EDP-009", "SOR-EDP-017"]
  },

  // 2.9 — SEO & Metadata
  seo: {
    metaTitle: "",        // REQUIRED — ≤60 characters
    metaDescription: "",  // REQUIRED — ≤155 characters
  },

  // Required images (section 3) — store as URLs/asset IDs once shot
  images: {
    hero: "",                 // 1 image — bottle on-brand background
    lifestyle: "",             // 1 image — mood/scene shot
    personWearingIt: [],       // REQUIRED — exactly 2 images
    ingredientCloseUps: [],    // 3-5 images, one per key ingredient
    sizeComparison: "",        // 1 image — all sizes together
    textureDetail: "",         // 1 image — cap/glass/box detail
    bundleShot: "",            // only if part of a bundle
    comparisonAsset: "",       // only if `dupe` is filled in
    altText: {
      // key = image field name above, value = alt text string
      // hero: "Sorella Velvet Amber Nights 50ml bottle on parchment background",
    },
  },
};

module.exports = { CANONICAL_TAGS, perfumeProductTemplate };