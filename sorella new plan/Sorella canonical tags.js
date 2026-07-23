/**
 * SORELLA — Tag Descriptions (extends CANONICAL_TAGS)
 * ----------------------------------------------------------------
 * Each entry adds a client-facing `description` + a `slug` to every
 * tag in the canonical dictionary, so each tag can power its own
 * page: /pages/tag/{slug} — a short brief up top, then a grid of
 * every product carrying that tag.
 *
 * Voice: Sorella brand voice — the slightly-older sister who always
 * smells incredible. ~70% warm/playful, ~30% premium. Kept short on
 * purpose (1–2 sentences) — this is landing-page intro copy, not a
 * blog post.
 *
 * NOT included: `stockStatus`. That's inventory state (In Stock, Low
 * Stock...), not a content tag — no one lands on a "Low Stock" page.
 * If you want a "Coming Soon" teaser page later, that's a one-off,
 * not part of this dictionary.
 *
 * `olfactiveRole` and `sourceType` are included with brief copy even
 * though they may not get full landing pages yet — attribute tooltips
 * on the PDP are a likely first use, full pages can follow later.
 *
 * Structure: TAG_DESCRIPTIONS.<category>.<exact original tag string>
 * = { slug, description }. Keys match CANONICAL_TAGS values exactly
 * so you can merge/zip the two objects directly.
 */

const TAG_DESCRIPTIONS = {

  // ---------------------------------------------------------------
  // Season
  // ---------------------------------------------------------------
  season: {
    "Summer": {
      slug: "summer",
      description: "Light, fresh, and built to survive Cairo heat without wilting. These are the bottles that live on your desk from May to September.",
    },
    "Winter": {
      slug: "winter",
      description: "Rich, warm, and a little more serious — the scents that come out when the temperature drops and you want to feel wrapped up.",
    },
    "Spring": {
      slug: "spring",
      description: "Soft, blooming, in-between weather scents. Not too heavy, not too light — the fragrance equivalent of finally opening the windows.",
    },
    "Autumn": {
      slug: "autumn",
      description: "Warmer than spring, cozier than summer. The scents that show up right when the year starts winding down.",
    },
    "Spring/Autumn": {
      slug: "spring-autumn",
      description: "The transitional-weather picks — versatile enough to carry you through the in-between months without feeling out of place.",
    },
    "All-Season": {
      slug: "all-season",
      description: "No weather bias, no excuses. These wear well whether it's 40°C or sweater season — the one-bottle-does-it-all category.",
    },
  },

  // ---------------------------------------------------------------
  // Time of Day
  // ---------------------------------------------------------------
  timeOfDay: {
    "Day": {
      slug: "day",
      description: "Bright, clean, office-safe. The scents that show up to work, run errands, and don't announce themselves from across the room.",
    },
    "Evening": {
      slug: "evening",
      description: "A little richer, a little more confident — for the hours after the sun goes down and the plans get better.",
    },
    "Night": {
      slug: "night",
      description: "Deep, dark, and unapologetic. These are the scents you save for when you actually want to be noticed.",
    },
    "Day-to-Night": {
      slug: "day-to-night",
      description: "One bottle, two personalities — quiet enough for daytime, enough presence to carry you straight into the evening.",
    },
  },

  // ---------------------------------------------------------------
  // Occasion
  // ---------------------------------------------------------------
  occasion: {
    "Formal": {
      slug: "formal",
      description: "For the days that call for your best behavior — interviews, ceremonies, rooms full of people you're trying to impress.",
    },
    "Casual": {
      slug: "casual",
      description: "Easygoing, low-effort, everyday-good. The scent equivalent of your favorite jeans.",
    },
    "Office": {
      slug: "office",
      description: "Professional but never boring — projects just enough to be memorable without taking over the meeting room.",
    },
    "Date Night": {
      slug: "date-night",
      description: "The ones with a little extra intention behind them. Not trying too hard — just enough to be the thing they remember.",
    },
    "Special Occasion": {
      slug: "special-occasion",
      description: "Save these for the nights that actually matter. Bigger presence, longer memory, worth the moment.",
    },
    "Wedding": {
      slug: "wedding",
      description: "Soft, celebratory, photograph-worthy scents for the biggest day on the calendar — yours or someone else's.",
    },
    "Everyday": {
      slug: "everyday",
      description: "The reliable ones. No occasion required — just the scent you reach for without thinking twice.",
    },
    "Party/Night Out": {
      slug: "party-night-out",
      description: "Loud, fun, and made to be worn in a crowd. These are built to survive a long night and still smell good at 2am.",
    },
    "Travel": {
      slug: "travel",
      description: "Easy to pack, easier to wear — versatile scents that keep up whether you're on a plane or exploring a new city.",
    },
    "Gym/Active": {
      slug: "gym-active",
      description: "Clean, light, and built to layer under sweat, not fight it. For the days that start with movement.",
    },
  },

  // ---------------------------------------------------------------
  // Mood
  // ---------------------------------------------------------------
  mood: {
    "Confident": {
      slug: "confident",
      description: "Scents with a bit of swagger — the kind that make you stand a little straighter the moment you put them on.",
    },
    "Warm": {
      slug: "warm",
      description: "Cozy, enveloping, hug-in-a-bottle scents. The ones that feel like coming home.",
    },
    "Fresh": {
      slug: "fresh",
      description: "Clean, crisp, just-showered energy. Simple, and exactly as good as that sounds.",
    },
    "Calming": {
      slug: "calming",
      description: "Soft and grounding — the scents you reach for on the days you need to slow down for a second.",
    },
    "Seductive": {
      slug: "seductive",
      description: "Deliberately alluring. These don't ask to be noticed — they make sure of it.",
    },
    "Energizing": {
      slug: "energizing",
      description: "Bright and sharp — the scent version of your first coffee of the day.",
    },
    "Elegant": {
      slug: "elegant",
      description: "Refined without trying too hard. Understated, polished, quietly expensive-smelling.",
    },
    "Nocturnal": {
      slug: "nocturnal",
      description: "Dark, moody, made for after dark. These are at their best when the lights are low.",
    },
    "Romantic": {
      slug: "romantic",
      description: "Soft, tender, a little dreamy — the scents that feel like a love letter in bottle form.",
    },
    "Playful": {
      slug: "playful",
      description: "Fun, a little unexpected, never too serious. For the days you don't want to overthink it.",
    },
    "Mysterious": {
      slug: "mysterious",
      description: "Layered and a little hard to place — the scents people keep asking you about.",
    },
    "Sophisticated": {
      slug: "sophisticated",
      description: "Composed and grown-up. The kind of scent that suggests you know exactly what you're doing.",
    },
    "Bold": {
      slug: "bold",
      description: "Not for the shy. Big, unmissable, fully committed to being the main character.",
    },
    "Comforting": {
      slug: "comforting",
      description: "Familiar and reassuring — the scent equivalent of your favorite blanket.",
    },
    "Clean": {
      slug: "clean",
      description: "Simple, soap-and-skin honest. Nothing complicated, just genuinely good.",
    },
    "Sensual": {
      slug: "sensual",
      description: "Rich, close-to-skin, intimate. Made to be noticed by whoever's standing closest.",
    },
  },

  // ---------------------------------------------------------------
  // Sillage
  // ---------------------------------------------------------------
  sillage: {
    "Intimate": {
      slug: "intimate",
      description: "Stays close to the skin — the kind only someone hugging you gets to enjoy.",
    },
    "Moderate": {
      slug: "moderate",
      description: "Noticeable without taking over the room. The everyday-safe projection level.",
    },
    "Strong": {
      slug: "strong",
      description: "Fills the room and lingers. A little goes a long way — wear accordingly.",
    },
    "Enormous": {
      slug: "enormous",
      description: "Walks in before you do. For the scents that are less 'wearing perfume' and more 'making an entrance.'",
    },
  },

  // ---------------------------------------------------------------
  // Olfactive Role (attribute copy — tooltip/PDP use for now)
  // ---------------------------------------------------------------
  olfactiveRole: {
    "Top": {
      slug: "top",
      description: "The first impression — what you smell in the opening minutes before the fragrance settles in.",
    },
    "Heart": {
      slug: "heart",
      description: "The core of the fragrance, once the top notes fade — this is the scent's real personality.",
    },
    "Base": {
      slug: "base",
      description: "What's left hours later — the notes that give a fragrance its lasting power.",
    },
  },

  // ---------------------------------------------------------------
  // Source Type (attribute copy — tooltip/PDP use for now)
  // ---------------------------------------------------------------
  sourceType: {
    "Natural": {
      slug: "natural",
      description: "Sourced directly from plants, resins, or other raw materials — nothing synthesized in a lab.",
    },
    "Synthetic": {
      slug: "synthetic",
      description: "Lab-created for precision and consistency — often the only way to get certain notes at all.",
    },
    "Nature-Identical": {
      slug: "nature-identical",
      description: "Built in a lab to be molecule-for-molecule the same as its natural counterpart — same scent, more consistent supply.",
    },
  },

  // ---------------------------------------------------------------
  // Gender Positioning
  // ---------------------------------------------------------------
  genderPositioning: {
    "Masculine": {
      slug: "masculine",
      description: "Built with a traditionally masculine profile — sharp, woody, grounded.",
    },
    "Masculine-Leaning": {
      slug: "masculine-leaning",
      description: "Mostly masculine in character, with enough softness that it's not strictly one-note.",
    },
    "Feminine": {
      slug: "feminine",
      description: "Built with a traditionally feminine profile — soft, floral, or sweet at its core.",
    },
    "Feminine-Leaning": {
      slug: "feminine-leaning",
      description: "Mostly feminine in character, with enough edge that it doesn't stay in one lane.",
    },
    "Unisex": {
      slug: "unisex",
      description: "No gender rules here — built to be worn by whoever it smells good on.",
    },
  },

  // ---------------------------------------------------------------
  // Concentration
  // ---------------------------------------------------------------
  concentration: {
    "Parfum/Extrait": {
      slug: "parfum-extrait",
      description: "The highest concentration of fragrance oil — maximum richness, maximum longevity. A little truly goes a long way.",
    },
    "Eau de Parfum (EDP)": {
      slug: "edp",
      description: "The sweet spot for most people — strong enough to last all day without needing constant reapplication.",
    },
    "Eau de Toilette (EDT)": {
      slug: "edt",
      description: "Lighter than EDP, easier to layer, great for daytime wear or hot climates.",
    },
    "Eau de Cologne (EDC)": {
      slug: "edc",
      description: "Light and fresh with lower oil concentration — built for quick refreshes rather than all-day wear.",
    },
    "Eau Fraiche": {
      slug: "eau-fraiche",
      description: "The lightest concentration of all — mostly water with a whisper of fragrance oil. Barely-there, on purpose.",
    },
  },

  // ---------------------------------------------------------------
  // Fragrance Family
  // ---------------------------------------------------------------
  fragranceFamily: {
    "Floral": {
      slug: "floral",
      description: "Built around flowers, full stop — jasmine, rose, tuberose, and everything in between.",
    },
    "Soft Floral": {
      slug: "soft-floral",
      description: "Florals blurred with powdery or musky undertones — gentler and less sharp than a straight floral.",
    },
    "Floral Oriental": {
      slug: "floral-oriental",
      description: "Flowers meet warm spice and resin — soft on top, richer as it settles.",
    },
    "Soft Oriental": {
      slug: "soft-oriental",
      description: "Warm and spiced, but eased back — less intense than a full oriental, still unmistakably rich.",
    },
    "Oriental": {
      slug: "oriental",
      description: "Warm, spiced, resinous — think amber, vanilla, incense. Big personality, built to last.",
    },
    "Woody Oriental": {
      slug: "woody-oriental",
      description: "Oriental warmth grounded by dry, woody depth — spice with a backbone.",
    },
    "Wood": {
      slug: "wood",
      description: "Sandalwood, cedar, vetiver — grounded, earthy, and built to anchor a fragrance.",
    },
    "Mossy Woods": {
      slug: "mossy-woods",
      description: "Woody notes deepened with oakmoss and earth — damp forest floor, in the best way.",
    },
    "Dry Woods": {
      slug: "dry-woods",
      description: "Warm, dry, almost smoky wood notes — think sun-baked cedar rather than damp forest.",
    },
    "Citrus": {
      slug: "citrus",
      description: "Bright, zesty, unmistakably fresh — bergamot, lemon, orange peel doing all the work.",
    },
    "Green": {
      slug: "green",
      description: "Crushed leaves, cut grass, snapped stems — the scent of the outdoors, not the garden.",
    },
    "Water/Aquatic": {
      slug: "water-aquatic",
      description: "Clean, airy, ocean-adjacent notes — the closest a bottle gets to bottling fresh air.",
    },
    "Fruity": {
      slug: "fruity",
      description: "Juicy, sweet, unmistakably fruit-forward — think peach, berry, or fig taking center stage.",
    },
    "Aromatic Fougere": {
      slug: "aromatic-fougere",
      description: "The classic barbershop backbone — lavender, coumarin, and herbs, sharp and familiar.",
    },
    "Gourmand": {
      slug: "gourmand",
      description: "Sweet enough to taste — vanilla, caramel, chocolate, and other things that smell edible.",
    },
    "Chypre": {
      slug: "chypre",
      description: "Bergamot up top, oakmoss and patchouli underneath — a classic, mossy-warm structure.",
    },
    "Leather": {
      slug: "leather",
      description: "Smoky, rugged, a little rebellious — the scent of a worn-in leather jacket.",
    },
    "Spicy": {
      slug: "spicy",
      description: "Cinnamon, clove, pepper, cardamom — the notes that add heat and edge to a fragrance.",
    },
    "Powdery": {
      slug: "powdery",
      description: "Soft, blurred, almost cosmetic in feel — the scent of fresh talc and iris.",
    },
    "Aldehydic": {
      slug: "aldehydic",
      description: "Sparkling, almost metallic freshness up top — the effervescent lift in classic-style perfumery.",
    },
  },

};

module.exports = { TAG_DESCRIPTIONS };