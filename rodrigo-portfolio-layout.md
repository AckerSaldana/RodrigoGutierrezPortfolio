# Rodrigo Gutiérrez Peña — Portfolio Layout Plan

---

## Design Philosophy

A cinematic, scroll-driven narrative that treats engineering projects like case studies in a high-end design magazine. Dark, moody palette with surgical pops of accent color. Every section transition should feel like turning a page in a premium publication. No cards-in-a-grid. No generic hero with particles. This should feel like a **documentary about an engineer**, not a template.

---

## Color & Type Direction

### Palette

- Background: Near-black `#0A0A0A`
- Primary text: Warm off-white `#E8E4DF`
- Accent: Muted industrial copper/amber `#C47A3A` — used very sparingly (hover states, active indicators, one or two key moments)
- No gradients, no glows, no glassmorphism. Raw, confident, editorial.

### Typography — `new-astro` Only

Single font family, all hierarchy created through weight, size, tracking, and case.

```
<link rel="stylesheet" href="https://use.typekit.net/zio4qom.css">
font-family: "new-astro", sans-serif;
```

| Role                              | Weight | Size         | Treatment                                      |
|-----------------------------------|--------|--------------|-------------------------------------------------|
| Hero name                         | 700    | 12–18vw      | Uppercase, tight kerning (-0.03em)              |
| Section titles (01, 02, 03…)      | 700    | 8–10vw       | Uppercase, letter-spacing +0.05em               |
| Project titles / H2s              | 700    | 3–4rem       | Uppercase, letter-spacing +0.08em               |
| Body text / Descriptions          | 400    | 1–1.125rem   | Sentence case, line-height 1.6                  |
| UI / Tags / Dates / Captions      | 400    | 0.75rem      | Uppercase, letter-spacing +0.15em, opacity 0.6  |
| Pull quotes / Intro statement     | 700    | 1.5–2rem     | Sentence case, italic via CSS oblique            |
| Nav / Progress indicator labels   | 400    | 0.7rem       | Uppercase, letter-spacing +0.2em                |

The entire hierarchy lives in one family. The discipline of a single typeface forces the design to rely on **space, scale, and contrast** — which is exactly what makes award-winning minimalism work. The geometric angularity of new-astro carries an engineering precision that matches Rodrigo's identity.

---

## Page Structure (Single Continuous Scroll)

### 01 — THE OPENING (Hero)

Full viewport. Almost entirely empty. Rodrigo's name set enormous — split across two lines, `new-astro` 700 at ~15vw, tightly kerned, uppercase. Below it, a single line in small `new-astro` 400 uppercase with wide tracking:

```
MECHATRONICS ENGINEER · SALTILLO · MX
```

No image. No animation on load. The power is in the emptiness and the typography.

As the user scrolls, the name letters subtly parallax at different speeds, dissolving the rigidity. A thin horizontal rule animates from left to right across the viewport as a scroll progress indicator that persists throughout the entire site.

---

### 02 — THE INTRO STRIP

A horizontal band, ~30vh tall, that scrolls in from below.

- **Left side:** A short two-sentence philosophy statement in `new-astro` 700 at ~1.75rem, sentence case. This is the only moment on the site where text feels warm and personal at display size.
- **Right side:** Four small stacked items — the four languages (ES / EN / DE / FR) in `new-astro` 400 uppercase with proficiency bars that fill as they enter view. Bars are 1px tall lines, accent copper when filled.

Feels like a magazine pull-quote spread.

---

### 03 — SELECTED WORK (The Core — 60% of the Site)

This is where the wow lives. **Not a grid. Not cards.** A full-bleed editorial case study sequence where each project gets a dedicated viewport-height section.

#### Layout alternates between three formats:

**Format A — "The Fullbleed"**

Project image/render fills the entire viewport as a background. Project title overlays at the bottom-left in `new-astro` 700, uppercase, ~4vw. As user scrolls into the section, the image subtly zooms (very slow, 5% over the scroll duration). A brief one-liner description fades in below the title in `new-astro` 400. Tags sit as tiny uppercase text along the right edge, vertical, almost like margin notes — `new-astro` 400 at 0.7rem, 60% opacity.

**Format B — "The Split"**

Viewport splits 40/60.

- **Left (40%):** Stacked text — project number in large outlined copper numerals (`new-astro` 700, ~8vw, `-webkit-text-stroke` only, no fill), title in `new-astro` 700 uppercase, 2–3 line description in `new-astro` 400, date + location in small caps at 0.75rem.
- **Right (60%):** A single strong image, slightly oversized, bleeding off the right edge. On scroll, the image slides in with a mask-reveal (clip-path wipe left to right).

**Format C — "The Horizontal Scroll Moment"**

One section breaks the vertical flow entirely. As the user scrolls down, this section locks (`position: sticky`) and instead scrolls **horizontally** through 3–4 project images/sketches side by side, like a filmstrip. The project title and description sit fixed on the left in `new-astro` 700 + 400 while the images slide past. This is the palate cleanser — the "wait, what just happened" moment.

#### Featured Project Sequence (6–7 projects):

1. **Team Romeo Wildfire Drone** → Format A (strongest visual, leads with impact)
2. **KUKA Gripper Design** → Format B
3. **RGB-D Research at CINVESTAV** → Format C (show depth maps/point clouds as filmstrip)
4. **3D Scanning Rig at Magna** → Format A
5. **Humanoid Motion Mimicry** → Format B
6. **Self-Stabilizing Sphere** → Format C
7. **Gravity Racer** → Format A (end on something fun and human)

---

### 04 — THE ARCHIVE

After the featured work, a minimal expandable list of all remaining projects.

- Vertical stack of project names in `new-astro` 700 at ~1.25rem, uppercase
- Year right-aligned in `new-astro` 400 at 0.85rem, 50% opacity
- On hover, a ghosted image of the project bleeds in behind the text (large, desaturated, 10% opacity)
- Clicking expands a compact detail panel inline — no page navigation
- Expanded state: description in `new-astro` 400, tags in small uppercase with wide tracking

This treats the secondary work with respect without competing with the main showcase.

---

### 05 — EXPERIENCE & EDUCATION (The Timeline)

Not a vertical timeline with dots and lines (overdone). Instead:

- A single horizontal 1px line across the viewport
- Key moments sit as small labeled notches along it: **Tec de Monterrey, Steinbeis Germany, Magna CIMS, CINVESTAV, FRC Houston**
- Labels in `new-astro` 400 uppercase, 0.7rem, wide tracking
- As the user scrolls, an accent-copper marker travels along the line
- Each notch, when active, reveals a short text block below the line in `new-astro` 400 body text

Clean, informative, not decorative.

---

### 06 — THE HUMAN SECTION

A short, personal moment.

- A candid photo (not a headshot — something real, maybe in a workshop or lab) positioned off-center, roughly 40% of viewport width
- Next to it, a few lines about who Rodrigo is beyond engineering: the languages, the mentoring, the teaching German, the time in Esslingen
- Written in first person, `new-astro` 400, 1.125rem, generous line-height (1.7). Sentence case. Casual, warm.
- His name above the text in `new-astro` 700, not huge — maybe 1.5rem. This isn't a headline moment, it's a quiet one.

This is the section that makes a recruiter **like** him, not just respect him.

---

### 07 — CONTACT (Closing)

Returns to the hero's emptiness.

- Email address set large and centered in `new-astro` 700, ~4vw, uppercase, as a `mailto:` link
- On hover, the copper accent color fills the text left-to-right (CSS `background-clip: text` animation)
- Below it, small social icons in off-white (not branded colors), turning copper on hover
- Final line at the very bottom: `© 2025 RODRIGO GUTIÉRREZ PEÑA` in `new-astro` 400, 0.7rem, 40% opacity

No footer menu. No "back to top." The scroll progress line hits 100% and that's the punctuation mark.

---

## Interaction Principles

- **Scroll-triggered, not autoplay.** Everything responds to user movement. Nothing plays without engagement.
- **Cursor:** Custom minimal crosshair cursor, switching to a small `VIEW` label (in `new-astro` 400 uppercase, 0.6rem) when hovering project images.
- **Page transitions:** If any project expands to a detail view, use a smooth `clip-path` circle expansion from the click point — no page reload.
- **Sound:** None. Let the visuals do the work.
- **Loading:** A simple centered counter (0–100) in `new-astro` 700. No loading bar, no spinner.

---

## Responsive Behavior

- **Mobile:** Format C (horizontal scroll) converts to a vertical swipe carousel. Format B (split) stacks vertically with image on top. Hero name scales down to ~12vw but keeps the same empty-space confidence. Timeline becomes vertical with scroll-reveal.
- **Tablet:** Format B goes 50/50 instead of 40/60. Type sizes scale proportionally via `clamp()`.
- **All breakpoints:** Single font family means no font-loading layout shifts. The design holds together because hierarchy is built on space and scale, not type variety.

---

## Tech Stack Suggestion

- **GSAP + ScrollTrigger** — all scroll-driven animations, pin sections, horizontal scroll lock
- **Lenis** — smooth scroll normalization
- **HTML/CSS/JS** — no framework needed for a portfolio this linear. Vanilla keeps it fast.
- **Barba.js** — only if project detail pages become separate routes (optional)

---

## Summary

The entire site speaks in one voice: `new-astro`. The geometric sans-serif carries engineering precision at display sizes and comfortable readability at body sizes. Hierarchy is created through **weight (400 vs 700), scale (0.7rem to 18vw), tracking (tight to wide), case (upper vs sentence), and opacity (40% to 100%)** — not through font variety. The restraint is the wow factor.
