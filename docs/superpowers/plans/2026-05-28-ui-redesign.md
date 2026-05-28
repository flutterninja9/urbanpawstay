# UI Redesign — Forest & Bone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Forest & Bone palette redesign across styles.css, index.html, and script.js to fix critical AI-default patterns while preserving HTML structure, SEO, and conversion flows.

**Architecture:** All changes are confined to the three source files. No new dependencies, no framework changes. Tasks are ordered by impact — palette first (everything inherits from it), then typography, then structural HTML changes, then JS interactions.

**Tech Stack:** Vanilla HTML5, CSS custom properties, vanilla JS. No build step — changes take effect on browser refresh.

---

## File Map

| File | What changes |
|---|---|
| `styles.css` | CSS vars (palette), font var, text-wrap, features grid, noise overlay, FAQ styles, eyebrow CSS removal, fade-up stagger removal |
| `index.html` | Font link swap, scroll-hint removal, 5 eyebrow divs removed, features HTML restructure, FAQ button wrappers |
| `script.js` | FAQ accordion function, fade-up class cleanup |
| `.gitignore` | Add `.superpowers/` |

---

## Task 1: .gitignore + Palette Variables

**Files:**
- Create: `.gitignore`
- Modify: `styles.css` lines 9–33 (`:root` block)

- [ ] **Step 1: Create .gitignore**

```
.superpowers/
```

- [ ] **Step 2: Update CSS custom properties in `:root`**

In `styles.css`, replace the entire `:root` block (lines 9–33) with:

```css
:root {
  --beige: #F3EFE5;
  --beige-dark: #EAE5D8;
  --beige-mid: #E2DBCC;
  --charcoal: #1A2E1A;
  --charcoal-light: #2C4A2C;
  --sage: #7A9E9F;
  --sage-dark: #658485;
  --sage-light: #A8C4C5;
  --white: #FFFFFF;
  --text-muted: #6B7A6B;

  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Outfit', -apple-system, sans-serif;

  --radius: 16px;
  --radius-sm: 10px;
  --radius-lg: 24px;

  --shadow-sm: 0 2px 12px rgba(26,46,26,0.06);
  --shadow-md: 0 8px 32px rgba(26,46,26,0.10);
  --shadow-lg: 0 20px 60px rgba(26,46,26,0.12);

  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

- [ ] **Step 3: Verify in browser**

Open `index.html` in a browser (or refresh). The page background should shift from warm beige to a slightly cooler bone tone. All text should appear in dark forest green instead of charcoal grey. The sage accent should look the same.

- [ ] **Step 4: Commit**

```bash
git add .gitignore styles.css
git commit -m "Swap CSS palette to Forest & Bone"
```

---

## Task 2: Body Font Swap + text-wrap Balance

**Files:**
- Modify: `index.html` line 89 (Google Fonts link)
- Modify: `styles.css` — headline selectors

- [ ] **Step 1: Replace the Google Fonts link in `index.html`**

Find this line (around line 89):
```html
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

Replace with:
```html
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Add `text-wrap: balance` to headline selectors in `styles.css`**

Find `.hero__headline` (around line 249) and add one property:
```css
.hero__headline {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--charcoal);
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
```

Find `.section-title` (around line 155) and add:
```css
.section-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--charcoal);
  margin-bottom: 16px;
  text-wrap: balance;
}
```

Find `.trust__headline` (around line 362) and add:
```css
.trust__headline {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
```

Find `.cta-final h2` (around line 732) and add:
```css
.cta-final h2 {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--charcoal);
  margin-bottom: 16px;
  text-wrap: balance;
}
```

- [ ] **Step 3: Verify in browser**

Refresh. All body text (nav, paragraphs, buttons, cards) should now render in Outfit — slightly rounder, warmer feel than Inter. Headlines should be unchanged (still Playfair Display).

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Swap body font to Outfit, add text-wrap balance to headlines"
```

---

## Task 3: Remove Hero Scroll Hint

**Files:**
- Modify: `index.html` lines 138–140 (scroll hint element)
- Modify: `styles.css` — `.hero__scroll-hint` block and `@keyframes scrollLine`

- [ ] **Step 1: Remove the scroll hint element from `index.html`**

Find and delete these 3 lines (around line 138):
```html
    <div class="hero__scroll-hint">
      <span></span>
    </div>
```

- [ ] **Step 2: Remove scroll hint CSS from `styles.css`**

Find and delete the `.hero__scroll-hint` block and its keyframe (around lines 312–332):
```css
.hero__scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.4;
}
.hero__scroll-hint span {
  display: block;
  width: 1.5px;
  height: 48px;
  background: var(--charcoal);
  margin: 0 auto;
  animation: scrollLine 2s ease-in-out infinite;
}
@keyframes scrollLine {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
```

- [ ] **Step 3: Verify in browser**

Refresh and scroll to the hero. The animated vertical line at the bottom of the hero should be gone. The hero should breathe naturally into the next section.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Remove hero scroll cue"
```

---

## Task 4: Eyebrow Cull (8 → 3)

Keep eyebrows on: Hero, Features ("Why Choose Us"), Pricing ("Pricing").
Remove from: Trust, Space, How It Works, Reviews, FAQ.

**Files:**
- Modify: `index.html` — remove 5 `section-tag` / `trust__tag` divs
- Modify: `styles.css` — remove `.trust__tag` rule (no longer used)

- [ ] **Step 1: Remove Trust eyebrow from `index.html`**

Find and delete this line (inside the trust section, around line 146):
```html
      <div class="trust__tag fade-up">Our Philosophy</div>
```

- [ ] **Step 2: Remove Space eyebrow from `index.html`**

Find and delete this line (inside the space section-header, around line 173):
```html
        <div class="section-tag">Our Space</div>
```

- [ ] **Step 3: Remove How It Works eyebrow from `index.html`**

Find and delete this line (inside the how section-header, around line 281):
```html
        <div class="section-tag">Process</div>
```

- [ ] **Step 4: Remove Reviews eyebrow from `index.html`**

Find and delete this line (inside the testimonials section-header, around line 332):
```html
        <div class="section-tag">Reviews</div>
```

- [ ] **Step 5: Remove FAQ eyebrow from `index.html`**

Find and delete this line (inside the faq section-header, around line 410):
```html
        <div class="section-tag">FAQ</div>
```

- [ ] **Step 6: Remove `.trust__tag` CSS from `styles.css`**

Find and delete the `.trust__tag` rule (around lines 354–362):
```css
.trust__tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sage-light);
  background: rgba(122,158,159,0.2);
  padding: 6px 16px;
  border-radius: 50px;
  margin-bottom: 24px;
}
```

- [ ] **Step 7: Verify in browser**

Scroll through the page. Only 3 section tags should be visible: the hero eyebrow, the Features "Why Choose Us" tag, and the Pricing tag. All other sections should lead directly with their headline.

- [ ] **Step 8: Commit**

```bash
git add index.html styles.css
git commit -m "Cut section eyebrows from 8 to 3"
```

---

## Task 5: Trust Section Theme Fix

**Files:**
- Modify: `styles.css` — `.trust` background color

- [ ] **Step 1: Update `.trust` background**

Find the `.trust` rule (around line 344):
```css
.trust {
  padding: 100px 0;
  background: var(--charcoal);
  color: var(--white);
}
```

The `var(--charcoal)` now resolves to `#1A2E1A` (forest green) from Task 1, so this is **already correct** — the variable swap in Task 1 handles this automatically.

However, verify the visual result in the browser. The dark section should now feel like it belongs to the same color family as the rest of the page (deep forest green vs. the bone background), rather than a jarring neutral grey.

- [ ] **Step 2: Verify in browser**

Scroll to the "Not a kennel" section. It should appear in deep forest green (#1A2E1A) — still dark for contrast, but now in the same green family as the overall palette. Compare with the old charcoal (#2E2E2E) — the new version should feel more intentional, less copy-pasted.

No code change needed for this task — the palette variable swap in Task 1 already handles it. This step is verification only.

---

## Task 6: Features Bento Grid

Replace the 3-equal-column grid with an asymmetric bento: 1 wide hero card + 2×2 grid + 1 wide closing card.

**Files:**
- Modify: `index.html` — features grid HTML (around lines 242–274)
- Modify: `styles.css` — `.features__grid` and feature card variants (around lines 482–516)

- [ ] **Step 1: Replace features grid HTML in `index.html`**

Find the entire `<div class="features__grid">` block and replace it with:

```html
      <div class="features__grid">
        <div class="feature-card feature-card--wide feature-card--sage">
          <div class="feature-card__icon">🏡</div>
          <div>
            <h3>Limited Capacity</h3>
            <p>We host only a few pets at a time to ensure personal attention and a stress-free environment.</p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">🔓</div>
          <h3>Home Environment</h3>
          <p>No cages. Just a calm, familiar space your pet can relax in, roam freely, and feel at home.</p>
        </div>
        <div class="feature-card feature-card--accent">
          <div class="feature-card__icon">🌿</div>
          <h3>Daily Care &amp; Activity</h3>
          <p>Walks, playtime, rest — a balanced routine tailored for a happy and healthy stay.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">📱</div>
          <h3>Regular Updates</h3>
          <p>Photos and updates sent directly to you on WhatsApp so you're always at ease.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">🍽️</div>
          <h3>Nutritious Meals</h3>
          <p>Your pet's regular food and feeding schedule maintained just like at home.</p>
        </div>
        <div class="feature-card feature-card--wide feature-card--subtle">
          <div class="feature-card__icon">❤️</div>
          <div>
            <h3>Genuine Care</h3>
            <p>We treat every pet as our own — with love, patience, and undivided attention.</p>
          </div>
        </div>
      </div>
```

- [ ] **Step 2: Replace `.features__grid` and add variant rules in `styles.css`**

Find the `.features__grid` rule (around line 484) and replace it:
```css
.features__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

Find the `.feature-card` rule (around line 490) and add variant rules directly after the existing `.feature-card:hover` block:
```css
/* Wide cards — span both columns */
.feature-card--wide {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 36px 40px;
}

.feature-card--wide .feature-card__icon {
  font-size: 2.8rem;
  margin-bottom: 0;
  flex-shrink: 0;
}

/* Sage-tinted hero card */
.feature-card--sage {
  background: rgba(122,158,159,0.1);
  border: 1px solid rgba(122,158,159,0.25);
}

/* Forest-accented card */
.feature-card--accent {
  background: rgba(26,46,26,0.05);
  border: 1px solid rgba(26,46,26,0.1);
}

/* Subtle closing wide card */
.feature-card--subtle {
  background: var(--beige-mid);
  box-shadow: none;
}
```

- [ ] **Step 3: Remove old stagger CSS in `styles.css`**

Find and delete these 6 lines (around lines 91–96):
```css
.features__grid .fade-up:nth-child(1) { transition-delay: 0s; }
.features__grid .fade-up:nth-child(2) { transition-delay: 0.08s; }
.features__grid .fade-up:nth-child(3) { transition-delay: 0.16s; }
.features__grid .fade-up:nth-child(4) { transition-delay: 0.24s; }
.features__grid .fade-up:nth-child(5) { transition-delay: 0.32s; }
.features__grid .fade-up:nth-child(6) { transition-delay: 0.40s; }
```

- [ ] **Step 4: Update responsive breakpoint for features in `styles.css`**

Find the `@media (max-width: 1024px)` block. Update the features line:
```css
@media (max-width: 1024px) {
  .features__grid { grid-template-columns: 1fr; }
  .feature-card--wide { flex-direction: column; text-align: center; gap: 16px; padding: 28px 24px; }
  /* keep other existing rules */
}
```

Also add to `@media (max-width: 768px)`:
```css
  .feature-card--wide { padding: 24px 20px; }
```

- [ ] **Step 5: Verify in browser**

Scroll to the Features section. You should see:
- Row 1: one wide sage-tinted card with icon left + text right ("Limited Capacity")
- Row 2: two normal cards side-by-side (Home Environment / Daily Care with forest tint)
- Row 3: two normal cards side-by-side (Regular Updates / Nutritious Meals)
- Row 4: one wide subtle card with icon left + text right ("Genuine Care")

No empty cells. Resize to tablet — should collapse to single column with wide cards stacking icon above text.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css
git commit -m "Redesign features grid to asymmetric bento layout"
```

---

## Task 7: Grain Noise Overlay

**Files:**
- Modify: `styles.css` — add `body::after` near the end of the base styles

- [ ] **Step 1: Add noise overlay CSS to `styles.css`**

Add the following rule directly after the `body { ... }` block (around line 67):

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
```

- [ ] **Step 2: Verify in browser**

The noise effect is very subtle — 3% opacity. To check it's working: temporarily set `opacity: 0.3` in DevTools, then restore to `0.03`. You should see a faint grain texture layered uniformly over the page. At 0.03 it reads as a slight depth on the flat backgrounds rather than visible grain.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "Add subtle grain noise overlay to break flat surfaces"
```

---

## Task 8: FAQ Accordion

**Files:**
- Modify: `index.html` — wrap FAQ questions in `<button>` elements, add answer wrappers
- Modify: `styles.css` — accordion CSS for `.faq__q`, `.faq__a-wrap`, `.faq__icon`
- Modify: `script.js` — add `initFAQ()` function

- [ ] **Step 1: Restructure FAQ HTML in `index.html`**

Find the entire `<div class="faq__list fade-up">` block (around lines 414–436) and replace it with:

```html
      <div class="faq__list">
        <div class="faq__item">
          <button class="faq__q" aria-expanded="false">
            Is Urban Paw Stay completely cage-free?
            <span class="faq__icon" aria-hidden="true">+</span>
          </button>
          <div class="faq__a-wrap" aria-hidden="true">
            <p class="faq__a">Yes. Your pet roams freely in a home environment at all times — no cages, no kennels, no stress.</p>
          </div>
        </div>
        <div class="faq__item">
          <button class="faq__q" aria-expanded="false">
            Where are you located?
            <span class="faq__icon" aria-hidden="true">+</span>
          </button>
          <div class="faq__a-wrap" aria-hidden="true">
            <p class="faq__a">We are based in Dwarka, Delhi and serve pet parents across Dwarka Sector 10, Sector 12, Janakpuri, Uttam Nagar, and nearby areas.</p>
          </div>
        </div>
        <div class="faq__item">
          <button class="faq__q" aria-expanded="false">
            What pets do you accept?
            <span class="faq__icon" aria-hidden="true">+</span>
          </button>
          <div class="faq__a-wrap" aria-hidden="true">
            <p class="faq__a">We currently board dogs of all breeds and sizes. Message us on WhatsApp to discuss your pet's specific needs.</p>
          </div>
        </div>
        <div class="faq__item">
          <button class="faq__q" aria-expanded="false">
            How do I book a stay?
            <span class="faq__icon" aria-hidden="true">+</span>
          </button>
          <div class="faq__a-wrap" aria-hidden="true">
            <p class="faq__a">Simply message us on WhatsApp with your pet's details and preferred dates. We'll confirm availability and guide you through everything.</p>
          </div>
        </div>
        <div class="faq__item">
          <button class="faq__q" aria-expanded="false">
            Do you send updates during the stay?
            <span class="faq__icon" aria-hidden="true">+</span>
          </button>
          <div class="faq__a-wrap" aria-hidden="true">
            <p class="faq__a">Yes — we send daily photos and updates directly to you on WhatsApp so you're always at ease.</p>
          </div>
        </div>
      </div>
```

- [ ] **Step 2: Replace FAQ CSS in `styles.css`**

Find the `/* --- FAQ --- */` block at the bottom of `styles.css` (around line 862) and replace it entirely with:

```css
/* --- FAQ --- */
.faq { padding: 80px 0; background: var(--beige); }
.faq__list { max-width: 680px; margin: 0 auto; }
.faq__item { border-bottom: 1px solid var(--beige-mid); }
.faq__item:last-child { border-bottom: none; }

.faq__q {
  all: unset;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--charcoal);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 22px 0;
  gap: 16px;
  transition: color var(--transition);
}
.faq__q:hover { color: var(--sage-dark); }
.faq__q:focus-visible {
  outline: 2px solid var(--sage-dark);
  outline-offset: 3px;
  border-radius: 4px;
}

.faq__icon {
  font-size: 1.4rem;
  font-weight: 300;
  color: var(--sage);
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color var(--transition);
  line-height: 1;
}
.faq__item.open .faq__icon {
  transform: rotate(45deg);
  color: var(--sage-dark);
}

.faq__a-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq__a {
  color: var(--charcoal-light);
  font-size: 0.95rem;
  line-height: 1.7;
  padding-bottom: 20px;
}
```

- [ ] **Step 3: Add `initFAQ()` to `script.js`**

Open `script.js`. Add the following function at the end of the file, then call it from the existing `DOMContentLoaded` listener (or add one if not present):

```javascript
function initFAQ() {
  const items = document.querySelectorAll('.faq__item');
  items.forEach(item => {
    const btn = item.querySelector('.faq__q');
    const wrap = item.querySelector('.faq__a-wrap');
    if (!btn || !wrap) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items
      items.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.faq__q');
        const w = i.querySelector('.faq__a-wrap');
        if (b) b.setAttribute('aria-expanded', 'false');
        if (w) { w.style.maxHeight = null; w.setAttribute('aria-hidden', 'true'); }
      });

      // Open the clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        wrap.style.maxHeight = wrap.scrollHeight + 'px';
        wrap.setAttribute('aria-hidden', 'false');
      }
    });
  });
}
```

The existing `script.js` has no `DOMContentLoaded` wrapper — it runs at the end of `<body>` so the DOM is already ready. Simply add a call at the very end of the file:

```javascript
initFAQ();
```

- [ ] **Step 4: Verify in browser**

Scroll to the FAQ section. All answers should be hidden by default. Clicking a question should smoothly expand its answer and rotate the `+` to `×`. Clicking another question should close the first and open the new one. Clicking an open question should close it. Tab navigation should work — focus ring should appear on the button.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js
git commit -m "Add FAQ accordion with smooth expand/collapse"
```

---

## Task 9: Fade-Up Trim

Remove `fade-up` from individual child elements inside feature cards, the FAQ list, and the Instagram link. These sub-elements should render immediately once their parent section is visible.

**Files:**
- Modify: `index.html` — remove `fade-up` from 6 `.feature-card` elements, `.faq__list`, `.space__instagram`

- [ ] **Step 1: Remove `fade-up` from feature cards in `index.html`**

The features grid HTML (from Task 6) should not have `fade-up` on individual `.feature-card` elements — if they were included in Task 6's HTML, confirm they are absent. The Task 6 HTML above does NOT include `fade-up` on any `.feature-card`, so this is already done if Task 6 was completed.

If any `.feature-card` still has `fade-up`, remove it.

- [ ] **Step 2: Remove `fade-up` from `.space__instagram` in `index.html`**

Find (around line 220):
```html
      <div class="space__instagram fade-up">
```
Change to:
```html
      <div class="space__instagram">
```

- [ ] **Step 3: Verify in browser**

Scroll through features and space sections. The features bento should appear as a single unit when it enters the viewport. The Instagram link below the gallery should be immediately visible when the gallery is visible.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Trim fade-up to section-level entrances only"
```

---

## Task 10: Final Review Pass

- [ ] **Step 1: Full page scroll — visual check**

Open the page and scroll from top to bottom. Verify:
- [ ] Palette is consistently Forest & Bone throughout (no stray beige/charcoal values)
- [ ] Body text is in Outfit (not Inter)
- [ ] Only 3 eyebrow tags visible: Hero, Features, Pricing
- [ ] Trust section is forest green (not neutral charcoal)
- [ ] Features bento shows 6 cards in asymmetric layout with no empty cells
- [ ] FAQ is interactive accordion (all closed by default)
- [ ] No scroll cue at hero bottom
- [ ] Subtle noise texture visible when inspecting background (test at 0.3 opacity in DevTools then restore)

- [ ] **Step 2: Mobile check**

Open DevTools, toggle to mobile viewport (375px width). Verify:
- [ ] Features bento collapses to single column, wide cards show icon above text
- [ ] FAQ accordion works on touch
- [ ] No horizontal overflow

- [ ] **Step 3: Reduced motion check**

In DevTools > Rendering, enable "Emulate CSS media feature prefers-reduced-motion". Verify fade-up animations are disabled and FAQ accordion transitions are instant.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "UI redesign complete — Forest & Bone palette, bento features, FAQ accordion"
```
