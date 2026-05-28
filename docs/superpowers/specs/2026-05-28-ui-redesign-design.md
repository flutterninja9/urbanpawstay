# Urban Paw Stay — UI Redesign Spec
**Date:** 2026-05-28
**Mode:** Redesign Overhaul (preserve HTML/SEO, update visuals)
**Palette chosen:** B — Forest & Bone
**Dials:** DESIGN_VARIANCE: 8 / MOTION_INTENSITY: 6 / VISUAL_DENSITY: 3

---

## Overview

Targeted CSS/JS upgrade to fix critical AI-default patterns identified in the design audit. The HTML structure, SEO metadata, schema, and conversion flows are untouched. All changes live in `styles.css` and `script.js`.

**Audit summary:** 3 critical issues, 5 major issues resolved. 6 existing strengths preserved (split hero, semantic HTML, real copy, single accent, skip nav/focus styles, pricing layout).

---

## 1. Palette

Replace the banned beige+charcoal premium-consumer default with the Forest & Bone palette.

| Token | Old value | New value | Role |
|---|---|---|---|
| `--beige` (renamed `--bone`) | `#F5F1ED` | `#F3EFE5` | Page background |
| `--beige-dark` (renamed `--bone-dark`) | `#EDE8E2` | `#EAE5D8` | Alternate section bg |
| `--beige-mid` (renamed `--bone-mid`) | `#E8E2DA` | `#E2DBCC` | Borders, dividers |
| `--charcoal` (renamed `--forest`) | `#2E2E2E` | `#1A2E1A` | Primary text, dark section bg |
| `--charcoal-light` (renamed `--forest-light`) | `#4A4A4A` | `#2C4A2C` | Secondary text |
| `--text-muted` | `#767676` | `#6B7A6B` | Muted text (green-tinted) |
| `--sage` | `#7A9E9F` | `#7A9E9F` | Accent — unchanged |
| `--sage-dark` | `#658485` | `#658485` | Accent dark — unchanged |
| `--sage-light` | `#A8C4C5` | `#A8C4C5` | Accent light — unchanged |

All `rgba(46,46,46,...)` shadow tints updated to `rgba(26,46,26,...)` to match the forest hue.

---

## 2. Typography

- **Body font:** `'Inter'` → `'Outfit'` (weights 300, 400, 500, 600)
- Update Google Fonts `<link>` in `index.html`: replace Inter with Outfit
- Update `--font-body` CSS variable
- Add `text-wrap: balance` to: `.hero__headline`, `.section-title`, `.trust__headline`, `.cta-final h2`

---

## 3. Hero — Remove Scroll Cue

Remove `.hero__scroll-hint` element from `index.html` and all associated CSS (`.hero__scroll-hint`, `.hero__scroll-hint span`, `@keyframes scrollLine`).

---

## 4. Eyebrow Cull — 8 to 3

The `section-tag` / eyebrow pattern appears on every section. Maximum allowed: 3 (one per 3 sections).

**Keep eyebrows on:**
- Hero (`hero__eyebrow`) — "Dwarka's Cage-Free Pet Homestay"
- Features section-tag — "Why Choose Us"
- Pricing section-tag — "Pricing"

**Remove `section-tag` divs from:**
- Trust section (`trust__tag`) — headline "Not a kennel. Not a crowded boarding." stands alone
- Space section — "Our Space" tag removed
- How It Works section — "Process" tag removed
- Testimonials section — "Reviews" tag removed
- FAQ section — "FAQ" tag removed

---

## 5. Trust Section — Theme Consistency

Change `.trust` background from `var(--charcoal)` to `var(--forest)` (`#1A2E1A`). The dark section now uses the same color family as the rest of the page (forest green family) instead of a jarring neutral charcoal. All white/muted text colors inside `.trust` stay as-is.

---

## 6. Features Grid — Asymmetric Bento

Replace the 3-column equal grid (`repeat(3, 1fr)`) with an asymmetric bento layout.

**New structure (HTML change in features section):**

6 features arranged with no empty cells:

```
[ Limited Capacity — full width, sage-tint bg, horizontal (icon left + content right) ]
[ Home Env. ]  [ Daily Care — forest-green accent bg (#1A2E1A tint)  ]
[ Updates   ]  [ Nutritious Meals                                     ]
[ Genuine Care — full width, bone-mid bg, subtle                      ]
```

CSS: `.features__grid` uses `grid-template-columns: 1fr 1fr`. Cards 1 and 6 use `grid-column: 1 / -1`. Card 3 gets class `feature-card--accent` for the forest-green tint background.

**CSS:** Update `.features__grid` to use `grid-template-columns: 1fr 1fr` with specific items using `grid-column: 1 / -1`. Add variant classes for the wide and accented cards.

---

## 7. Grain Noise Overlay

Add a fixed noise texture to break digital flatness.

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,..."); /* SVG feTurbulence noise */
}
```

The overlay sits below the WhatsApp float (`z-index: 999`) and all interactive elements. `pointer-events: none` ensures no click interference.

---

## 8. FAQ Accordion

Add JS-powered accordion to `.faq__list`. Each `.faq__item` becomes toggleable.

**Behavior:**
- Click `.faq__q` to expand/collapse its `.faq__a`
- Smooth height transition using `max-height` animation (0 → auto via measured scrollHeight)
- One item open at a time (clicking a new item closes the previously open one)
- Visual indicator: `+` rotates to `×` on the question

**HTML change:** Wrap each `.faq__q` in a `<button>` for accessibility. Add `aria-expanded` attribute.

**CSS:** `.faq__a` defaults to `max-height: 0; overflow: hidden` with transition. `.faq__item.open .faq__a` sets `max-height` to the measured height.

---

## 9. Fade-Up Trim

Reduce the number of elements that independently animate on scroll. Motion should signal section entrances, not individual card animations.

**Keep fade-up on:**
- `.hero__content`, `.hero__visual` (staggered — these are fine)
- `.trust__inner`
- `.section-header` (the heading block per section)
- `.pricing__inner`
- `.cta-final__inner`
- `.reviews__grid` (the grid as a whole)
- `.how__steps` (the steps block as a whole)
- `.space__gallery`, `.gallery__more`

**Remove `fade-up` class from:**
- Individual `.feature-card` elements (the grid enters as one)
- Individual `.step` elements
- `.faq__list`
- `.space__instagram`

---

## 10. Preserved (No Changes)

- All HTML structure, anchor IDs, nav labels (SEO safe)
- Schema markup, OG tags, canonical, meta description
- WhatsApp CTA links and floating button
- Hero layout (split-screen, image on right)
- Pricing layout (asymmetric text + card)
- Gallery layout
- Accessibility: skip nav, focus styles, reduced-motion query, alt text
- All copy / testimonials / FAQ content

---

## Files Changed

| File | Type of change |
|---|---|
| `styles.css` | Palette vars, font, hero, trust, features grid, noise overlay, FAQ styles, eyebrow removal, text-wrap |
| `script.js` | FAQ accordion JS, fade-up class cleanup |
| `index.html` | Font link swap (Inter → Outfit), scroll-hint removal, eyebrow tag removals, features HTML restructure, FAQ button wrappers |

---

## Out of Scope

- Nav section links / scroll-spy active state (separate feature, adds JS complexity)
- Testimonials layout redesign (not critical enough to risk breaking the conversion section)
- New images or photography
- Dark mode
