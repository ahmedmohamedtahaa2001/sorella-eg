---
name: shopify-multi-agent-workflow
description: >
  Full multi-agent orchestration framework for ANY Shopify theme development task.
  Use this skill whenever a user presents a Shopify task — building sections, editing layouts,
  adding features, fixing bugs, migrating themes, or managing store content — and you need
  a structured, quality-controlled execution plan with multiple specialized agents.
  ALWAYS trigger this skill when: the user says "do this shopify task", pastes client requirements
  for a Shopify store, asks to build/edit/fix anything in a Shopify theme, or provides a task
  description in brackets like [task here]. Also trigger when the user mentions schema-based
  approach, pixel-perfect cloning, Liquid sections, metafields, JSON templates, or Claude Code
  multi-agent loops for Shopify. This skill must be used even for partial tasks — the agent
  structure prevents implementation mistakes that only appear at QA time.
  Core constraint enforced by ALL agents: ZERO hardcoded values — every text string, color,
  spacing, URL, and option MUST be a schema setting or metafield.
---

# Shopify Multi-Agent Workflow Skill

Orchestrates a full team of specialized agents to plan, implement, test, check, and verify
any Shopify theme task — from a single section to a full theme build.

**Core Law (never broken by any agent):**
> 🚫 NO hardcoded values. Every piece of content, color, image, text, or URL that a merchant
> might want to change MUST be a `schema` setting (sections/blocks) or a metafield.
> This is non-negotiable. If an agent produces hardcoded values, QA agents MUST flag it.

---

## 🎯 Strict Development Rules (apply to EVERY agent, EVERY subtask)

1. **NO HARDCODED CONTENT** — Every heading, paragraph, image, video, and CTA button must be
   mapped directly to a robust, fully editable `{% schema %}` block so it is 100% manageable
   via the Shopify Theme Customizer.
2. **NATIVE LIQUID & FUNCTIONALITY** — Write clean Liquid files (`.liquid`), synced with
   responsive CSS/JS. Never output static HTML/CSS mockups pretending to be sections.
3. **REAL DYNAMICS** — All product grids, collections, cart drawers, and toggles must be
   genuinely dynamic using Shopify loops (e.g., `{% for product in collection.products %}`)
   and the Shopify AJAX API where needed for functions like Add to Cart. No fake/static
   product cards.
4. **SCAFFOLD INTEGRATION** — Work directly on top of the existing downloaded repository
   scaffold. Maintain Shopify Theme Check linting compliance (**0 offenses**) at all times.

---

## How to Use This Skill

1. **Read the task** the user provided
2. **Run Phase 0** — Codebase Analysis (do this yourself before spawning agents)
3. **Generate the Agent Plan** using the templates in this skill
4. **Output the full plan** as a structured document the user can hand to Claude Code

You do NOT execute the task — you generate the orchestration plan. The plan is what gets
handed to Claude Code (or the user's multi-agent environment).

---

## Phase 0 — Task Intake & Codebase Analysis (YOU do this, not an agent)

Before writing a single agent instruction, answer these questions:

### 0A. Task Decomposition
Break the task into **subtasks**. A subtask is a unit of work that:
- Has a clear, verifiable output (a file changed, a section created, a feature working)
- Can be done by one agent without depending on another in-progress subtask
- Takes ≤ 2 hours of focused work

Write subtasks as: `ST-01: [verb] [what] → [expected output file/result]`

### 0B. Codebase Audit Checklist
Before writing agent instructions, run (or instruct the Leader to run):
```bash
# Theme structure
ls -la sections/ snippets/ blocks/ assets/ config/ locales/ templates/ layout/

# Schema baseline — understand existing settings
cat config/settings_schema.json | python3 -m json.tool | head -100

# JSON templates (OS 2.0 check)
ls templates/*.json | head -20

# Existing section naming pattern (enforce consistency)
ls sections/ | sed 's/-[^-]*$//' | sort -u

# Hardcoded value scan (run BEFORE and AFTER implementation)
grep -rn --include="*.liquid" \
  -E '(rgba?\([0-9]|#[0-9a-fA-F]{3,6}|font-size:\s*[0-9]|"[A-Z][a-z]{4,}")' \
  sections/ snippets/ blocks/ \
  | grep -v "{{.*settings\|schema\|t }}" | head -30

# Asset naming pattern
ls assets/ | grep -E "\.(css|js)$" | head -20

# Check for Playwright/visual QA setup
ls -la .playwright* playwright* tests/ 2>/dev/null || echo "No Playwright found"
```

### 0C. Reference URL / Design Spec
If the user provided a reference URL (e.g., vegamour.com) or screenshots:
- Note the URL for the Codebase Agent and Visual QA Agent
- Do NOT hardcode pixel values — extract them as schema defaults

### 0D. Decide Agent Count
Read `agents/agent-roster.md` for the full roster and when to add/remove agents.

---

## Phase 1 — Generate the Agent Plan

Once Phase 0 is done, produce the plan using this structure:

```
# SHOPIFY TASK: [Task Name]
# Generated: [date]
# Schema-based: YES (hardcoded values = BLOCKED)

## AGENT ROSTER
[list agents with IDs and roles]

## SUBTASK MAP
[ST-01 through ST-NN with owner agent]

## AGENT BRIEFS
[one brief per agent — see templates/]

## EXECUTION ORDER
[dependency graph: which agents block which]

## QA GATES
[what must pass before each phase advances]
```

Use the templates in `templates/` to write each agent brief.

---

## Phase 2 — Execution Order Rules

Always follow this order. Never skip a gate.

```
LEADER starts
    ↓
CODEBASE AGENT (analysis, no changes)
    ↓ [Gate 0: analysis approved by Leader]
IMPLEMENTATION AGENTS (parallel if no deps)
    ↓ [Gate 1: each subtask self-verified]
SUBTASK QA TRIAD per subtask:
    Subtask Tester → Subtask Checker → Subtask Verifier
    ↓ [Gate 2: subtask QA all PASS]
INTEGRATION AGENT (assemble all subtasks)
    ↓ [Gate 3: no Liquid errors, JSON valid]
FINAL QA TRIAD:
    Final Tester → Final Checker → Final Verifier
    ↓ [Gate 4: all PASS]
LEADER writes completion report
```

---

## Phase 3 — Schema-Based Enforcement Rules

Every agent must know and enforce these rules:

### Section Schema Rules
```liquid
{% schema %}
{
  "name": "Section Name",       ← merchant-facing name, Title Case
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default Text Here"   ← ALWAYS provide defaults
    }
  ],
  "blocks": [...],              ← use blocks for repeating items (never hardcode count)
  "presets": [
    {
      "name": "Section Name",
      "blocks": [...]           ← provide starter blocks in presets
    }
  ]
}
{% endschema %}
```

### What MUST be a setting (never hardcode):
| Content Type | Setting Type |
|---|---|
| Any text string | `text` or `richtext` or `inline_richtext` |
| Any image | `image_picker` |
| Any color | `color` |
| Any URL / link | `url` |
| Any number (count, size, duration) | `range` or `number` |
| Show/hide toggles | `checkbox` |
| Layout choices | `select` |
| Videos | `video` or `video_url` |
| Product references | `product` |
| Collection references | `collection` |

### What CAN be hardcoded (structural only):
- HTML element types (`<div>`, `<h2>`, `<button>`)
- CSS class names that map to the theme's design system
- Liquid logic operators and control flow
- Asset references for JS/CSS files that are not merchant-editable

### 📐 Mandatory "Layout & Spacing" Schema Group (EVERY section)

Every section schema MUST include a **"Layout & Spacing"** settings group with these IDs
(all `range` inputs; defaults taken from the Playwright audit of the reference site):

```
Desktop:  padding_top, padding_bottom, padding_left, padding_right,
          margin_top, margin_bottom, section_max_width, item_gap
Mobile:   mobile_padding_top, mobile_padding_bottom, mobile_padding_horizontal
```

Wire them into the section's scoped CSS via `{{ section.id }}` so each instance is
independently tunable:

```liquid
{% style %}
  #shopify-section-{{ section.id }} .section-inner {
    padding: {{ section.settings.padding_top }}px {{ section.settings.padding_right }}px
             {{ section.settings.padding_bottom }}px {{ section.settings.padding_left }}px;
    margin-top: {{ section.settings.margin_top }}px;
    margin-bottom: {{ section.settings.margin_bottom }}px;
    max-width: {{ section.settings.section_max_width }}px;
    gap: {{ section.settings.item_gap }}px;
  }
  @media (max-width: 749px) {
    #shopify-section-{{ section.id }} .section-inner {
      padding-top: {{ section.settings.mobile_padding_top }}px;
      padding-bottom: {{ section.settings.mobile_padding_bottom }}px;
      padding-left: {{ section.settings.mobile_padding_horizontal }}px;
      padding-right: {{ section.settings.mobile_padding_horizontal }}px;
    }
  }
{% endstyle %}
```

### 🎛️ Full Customizer Control Matrix

EVERYTHING visual must be admin-controllable from the Theme Customizer. Per section
(and per block where it applies), expose settings for ALL of the following:

| Category | What must be controllable | Setting types |
|---|---|---|
| **Typography** | Font family, font weight, font size, line height, letter spacing — per text element (heading, subheading, body, button) | `font_picker`, `range` (size/weight/line-height), `select` |
| **Text color** | Every text element's color (+ hover state for links/buttons) | `color` |
| **Media** | Image OR video choice per slot; separate media per breakpoint: large / medium / small screens (`image_desktop`, `image_tablet`, `image_mobile`); alt text; focal point; aspect ratio; object-fit | `image_picker`, `video`, `video_url`, `select`, `text` |
| **Spacing** | Padding, margins, gaps, inner spacing — desktop AND mobile (see Layout & Spacing group above) | `range` |
| **Borders** | Border width, border color, border radius (per card/button/image/container) | `range`, `color` |
| **Layout** | Grid vs flexbox choice and its properties: columns per breakpoint (desktop/tablet/mobile), direction, alignment, justification, wrap, order/reverse | `select`, `range`, `checkbox` |
| **Icons** | Icon choice (select from library or custom image upload), icon size, icon color, icon stroke width, icon position, show/hide | `select`, `image_picker`, `range`, `color`, `checkbox` |
| **Content** | Every heading, paragraph, label, badge, CTA text + CTA link | `text`, `inline_richtext`, `richtext`, `url` |
| **Backgrounds** | Background color/gradient, background image/video, overlay color + opacity | `color`, `color_background`, `image_picker`, `range` |

Responsive media pattern (large / medium / small screens):

```liquid
{% if section.settings.media_type == 'video' and section.settings.video != blank %}
  {{ section.settings.video | video_tag: autoplay: true, loop: true, muted: true, controls: false }}
{% else %}
  <picture>
    {% if section.settings.image_mobile != blank %}
      <source media="(max-width: 749px)" srcset="{{ section.settings.image_mobile | image_url: width: 750 }}">
    {% endif %}
    {% if section.settings.image_tablet != blank %}
      <source media="(max-width: 989px)" srcset="{{ section.settings.image_tablet | image_url: width: 1100 }}">
    {% endif %}
    {{ section.settings.image_desktop | image_url: width: 2000 | image_tag: loading: 'lazy', alt: section.settings.image_alt }}
  </picture>
{% endif %}
```

QA agents MUST fail any section where a visual property from this matrix is fixed in CSS
with no corresponding schema setting.

---

## Reference Files

- `agents/agent-roster.md` — Full agent roster with trigger conditions
- `agents/leader-agent.md` — Leader agent full brief template
- `agents/implementation-agent.md` — Implementation agent brief template
- `agents/subtask-qa-triad.md` — Tester + Checker + Verifier brief templates
- `agents/final-qa-triad.md` — Final QA Tester + Checker + Verifier templates
- `agents/codebase-agent.md` — Codebase analysis agent brief
- `agents/integration-agent.md` — Integration agent brief
- `templates/agent-plan-output.md` — Full plan output template
- `references/shopify-schema-patterns.md` — Schema patterns library
- `references/liquid-conventions.md` — Liquid coding conventions
- `references/qa-assertions.md` — Standard QA assertion checklist