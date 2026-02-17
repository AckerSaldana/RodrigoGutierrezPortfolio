# Rodrigo Gutiérrez Peña — Portfolio Layout Plan V2

### _"The site should feel like opening a precision-machined box — every edge intentional, every gap considered, every reveal earned."_

---

## I. Design Philosophy — The Doctrine

This is not a portfolio. It is a **directed experience** — a slow-burn cinematic walk through the mind of an engineer who thinks in tolerances and builds in ambition. The inspiration draws from the editorial restraint of Swiss print design (Josef Müller-Brockmann), the scroll storytelling of Awwwards SOTY winners like _Don't Board Me_ and _Opal Tadpole_, and the raw textural presence of sites like Stefan Vitasović's 2025 portfolio.

**Three governing rules:**

1. **Earned complexity** — Every animation must feel like it exists for a reason. If you can remove it and nothing is lost, it was decoration. If you remove it and something breaks, it was design.
2. **Tension and release** — The site alternates between extreme stillness (typography on void) and controlled eruptions of visual energy (full-bleed imagery, horizontal scroll). The rhythm is cinematic: wide shot → close-up → wide shot.
3. **Material honesty** — No fake 3D, no particle backgrounds, no abstract blobs. Textures come from real materials: film grain, paper fiber noise, the weight of metal type. This is an engineer's site — it should feel _built_, not rendered.

---

## II. Sensory Layer — What Makes It Not Feel Empty

The difference between "minimalist" and "empty" is **texture**. Here's how we load the page with presence without adding visual clutter:

### A. Film Grain Overlay (Global)

A full-viewport SVG noise texture overlay at ~3-4% opacity, animated on a 0.15s loop (shifting the `baseFrequency` attribute very slightly). This creates a barely perceptible organic shimmer — like 35mm film stock — that makes the dark background feel alive rather than digital. The grain is applied via an SVG `<feTurbulence>` filter composed with `<feColorMatrix>` for contrast, rendered as a fixed-position pseudo-element with `pointer-events: none`.

```css
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
}
```

This single layer transforms every dark surface from "CSS black" to "analog-photographed black." It's the difference between a $20 template and a $20,000 agency site.

### B. Cursor Ecosystem

Not just one custom cursor — a **system** of cursor states that communicate interaction language:

| Context                              | Cursor State                                                                          | Behavior                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Default (body)                       | Small hollow circle (12px), 1px off-white stroke                                      | Follows mouse with `gsap.quickTo()`, elastic easing |
| Hovering project media               | Circle expands to 80px, fills with `VIEW` text in `new-astro` 400 uppercase 0.6rem    | Scale animation over 0.3s with `power3.out`         |
| Hovering links/buttons               | Circle shrinks to 6px solid dot, magnetic pull toward element center                  | Uses `Math.atan2()` for directional magnetism       |
| Hovering the email CTA               | Circle morphs into a horizontal arrow (→) using SVG path animation                    | Arrow points in the direction of mouse movement     |
| Dragging (horizontal scroll section) | Circle becomes a horizontal double-arrow `⟷`                                          | Communicates drag affordance                        |
| During scroll (active)               | Circle compresses vertically, becomes an oval — like it's feeling the scroll velocity | Responds to `ScrollTrigger.getVelocity()`           |

The cursor is hidden on mobile via `@media (pointer: coarse)`.

### C. Micro-Typography Animations

Text doesn't just "appear." Every text element earns its entry:

- **Headlines** (700 weight, uppercase): Characters split with GSAP SplitText, staggered from bottom with `y: 110%, rotationX: -90` and `clipPath: inset(0 0 100% 0)`. Each character rotates up into place. Stagger: 0.03s.
- **Body text** (400 weight): Lines reveal with a wipe — each line has a moving `clip-path: polygon()` that sweeps left-to-right, staggered per line at 0.08s.
- **Captions/Tags** (0.75rem, uppercase): Fade in with `opacity: 0 → 1` and `letter-spacing: 0.5em → 0.15em` — the tracking tightens as it materializes, like a camera racking focus.
- **Numbers** (project indices, dates): Use GSAP ScrambleText — characters cycle through random glyphs for 0.4s before settling on the correct character. Gives a technical, "decoding" personality.

### D. Ambient Motion

Two layers of almost imperceptible motion that prevent the site from feeling static even when no one is scrolling:

1. **Parallax depth on idle** — The grain overlay, any visible images, and large typography respond to mouse position at different intensities (grain: 2px, images: 8px, text: 4px). Not a 3D tilt — just subtle `translate3d` shifts. Like breathing.
2. **Slow pulse on accent lines** — The 1px horizontal rules and accent-copper elements have a very slow opacity oscillation (`opacity: 0.6 → 1.0` over 4s, ease `sine.inOut`, repeat infinite, yoyo). The site feels _warm_, like there's a heartbeat.

---

## III. Color & Type — The Discipline

### Palette (Expanded)

```
--bg-primary:       #0A0A0A    /* Deep void — not pure black, has warmth */
--bg-elevated:      #111111    /* Subtle card/section differentiation */
--bg-hover:         #1A1A1A    /* Hover states for archive items */
--text-primary:     #E8E4DF    /* Warm off-white — never pure white */
--text-secondary:   #8A8580    /* Muted, for timestamps and meta */
--text-tertiary:    #5A5550    /* Ghost text, very recessive */
--accent-copper:    #C47A3A    /* The only chromatic color on the site */
--accent-copper-dim:#C47A3A66  /* 40% opacity variant for subtle uses */
--rule-color:       #2A2520    /* Hairline rules — visible but quiet */
```

**The copper rule**: Accent copper appears in no more than **7 instances** on the entire site. Every use is intentional:

1. Scroll progress line
2. Active timeline marker
3. Email hover fill
4. Social icon hover states
5. Language proficiency bar fills
6. One project number outline (the strongest project)
7. The period in "RODRIGO GUTIÉRREZ PEÑA." (the hero punctuation dot)

That's it. Scarcity creates value.

### Typography System — `new-astro` Mastery

```css
@import url("https://use.typekit.net/zio4qom.css");

:root {
  --font: "new-astro", sans-serif;
  --w-regular: 400;
  --w-bold: 700;
}
```

| Role                         | Weight | Size                                | Tracking | Case     | Line-Height | Opacity | Notes                                                    |
| ---------------------------- | ------ | ----------------------------------- | -------- | -------- | ----------- | ------- | -------------------------------------------------------- |
| Hero name                    | 700    | `clamp(10vw, 15vw, 18vw)`           | -0.04em  | Upper    | 0.85        | 1.0     | Two lines. Tight. Monumental.                            |
| Section index (01, 02…)      | 700    | `clamp(6vw, 8vw, 10vw)`             | +0.05em  | Upper    | 1.0         | 0.08    | Background ghost number, nearly invisible                |
| Section title                | 700    | `clamp(2rem, 4vw, 5vw)`             | +0.08em  | Upper    | 1.0         | 1.0     | Main section headers                                     |
| Project title / H2           | 700    | `clamp(1.5rem, 3vw, 4rem)`          | +0.06em  | Upper    | 1.05        | 1.0     | Used in case studies                                     |
| Intro statement / Pull quote | 700    | `clamp(1.25rem, 2vw, 2rem)`         | +0.01em  | Sentence | 1.4         | 1.0     | Italic via `font-style: oblique 8deg`                    |
| Body text                    | 400    | `clamp(0.95rem, 1.05rem, 1.125rem)` | +0.005em | Sentence | 1.65        | 0.9     | Main readable text                                       |
| Tags / Captions / Meta       | 400    | `clamp(0.65rem, 0.75rem, 0.8rem)`   | +0.15em  | Upper    | 1.3         | 0.5     | Dates, locations, tech stacks                            |
| Nav / Progress labels        | 400    | 0.7rem                              | +0.2em   | Upper    | 1.0         | 0.4     | Side navigation items                                    |
| Project number (outline)     | 700    | `clamp(5rem, 8vw, 10vw)`            | -0.02em  | —        | 1.0         | 1.0     | `-webkit-text-stroke: 1px var(--accent-copper)`, no fill |

**Key discipline**: Hierarchy is created through **seven variables, one family**: weight (400/700), size (0.65rem–18vw), tracking (-0.04em–+0.2em), case (upper/sentence), line-height (0.85–1.65), opacity (0.08–1.0), and stroke vs fill. Zero font variety. Maximum typographic range.

---

## IV. Navigation & Orientation System

### A. Side Navigation (Desktop)

A vertical stack of thin labels fixed to the right edge of the viewport, 24px from the edge:

```
01  INTRO
02  WORK
03  ARCHIVE
04  TIMELINE
05  ABOUT
06  CONTACT
```

Set in `new-astro` 400, 0.7rem, uppercase, `letter-spacing: 0.2em`, `opacity: 0.3`. The currently active section label shifts to `opacity: 1.0` and receives a small 12px copper dash to its left that slides in via GSAP. On hover, inactive labels shift to `opacity: 0.6`.

The labels rotate 90° clockwise (`writing-mode: vertical-rl; transform: rotate(180deg)`) so they read bottom-to-top, like a book spine. Clicking any label smooth-scrolls to the section via Lenis.

### B. Scroll Progress Line

A 1px horizontal line at the very top of the viewport, fixed position. Starts at `width: 0`, reaching `width: 100%` as the user scrolls to the bottom. Color: `var(--accent-copper)`. Uses `ScrollTrigger.create()` with `onUpdate` to set `scaleX` based on scroll progress.

Below this line, a tiny label in `new-astro` 400 at 0.6rem shows the current section name, right-aligned. It updates via `ScrollTrigger` callbacks.

### C. Time Signature (Top-Left)

A fixed element in the top-left corner showing the local time in Saltillo, MX, updating every second:

```
SAL · 14:32:07 CST
```

Set in `new-astro` 400, 0.7rem, uppercase, `letter-spacing: 0.15em`, `opacity: 0.3`. This subtle detail communicates "this person exists in a real place and time" — it anchors the entire abstract experience to a human.

---

## V. Page Structure — The Sequence

---

### PRELOADER — The Counter

Before anything loads, a centered counter on pure `#0A0A0A`:

```
000 → 100
```

Set in `new-astro` 700, `clamp(3rem, 5vw, 6rem)`, no leading zeros once it passes 9. The number counts up at a non-linear rate (slow at start, fast through middle, slow at end — use a custom GSAP ease). No loading bar, no spinner, no logo.

At 100, the number holds for 0.3s, then the entire screen splits vertically from center — two halves slide away (left half slides left, right half slides right) via `clip-path` animation, revealing Section 01 underneath. The split reveals the hero name already in position, not animating in — it was always there. The preloader was the curtain.

**Loading technique**: During the counter, preload all hero-viewport assets, the `new-astro` font (critical), and the grain SVG. Use `document.fonts.ready` to ensure type is loaded before the curtain opens.

---

### 01 — THE OPENING (Hero)

**Duration**: 100vh + 50vh scroll distance for parallax effects.

Full viewport. Near-total emptiness. Rodrigo's name dominates:

```
RODRIGO
GUTIÉRREZ
```

Two lines. `new-astro` 700. Size: `clamp(10vw, 15vw, 18vw)`. Uppercase. Tracking: `-0.04em`. Line-height: `0.85`. Positioned at roughly the bottom-third of the viewport (not centered — asymmetric positioning, like a title card in a Kubrick film).

Below the name, a single metadata line:

```
MECHATRONICS ENGINEER · SALTILLO, MX · MMXXV
```

In `new-astro` 400, 0.75rem, uppercase, `letter-spacing: 0.15em`, `opacity: 0.5`. The use of Roman numerals for the year adds an archival, timeless quality.

**Scroll behavior**: As the user scrolls:

- Each letter of the name parallaxes at a slightly different `y` speed (variance: ±15%), creating a subtle wave dissolution. Controlled via `SplitText` + individual `ScrollTrigger` scrubs.
- The metadata line fades out faster than the name (`opacity: 0` by 30% scroll).
- The background shifts from `#0A0A0A` to `#111111` at the transition to Section 02 — a near-imperceptible lift, like dawn.

**No images. No animation on load. No particles. No 3D.** The authority of the page comes entirely from the scale and confidence of the typography against nothing. This is the hardest thing to get right because there's nowhere to hide — and that's the point.

---

### 02 — THE INTRO STRIP

**Duration**: ~40vh, enters from below as user scrolls.

A horizontal band that divides the viewport into a magazine-style spread. The background shifts to `#111111` — one shade lighter than the hero, creating a subtle layer.

**Left column (55%)** — The Personal Statement:

A pull-quote that's the only moment of intimate, human-scale text at display size on the entire site:

> _I engineer systems that move, perceive, and respond — from wildfire drones that protect forests to robotic grippers that think with their hands. I believe the best machines are the ones you forget are machines._

Set in `new-astro` 700 italic (via `font-style: oblique 8deg`), `clamp(1.25rem, 2vw, 2rem)`, sentence case, `line-height: 1.4`. Warm. Personal. First person. This is the "I'm a real human" moment.

The text reveals line by line on scroll, each line wiping in from left via `clip-path` with a 0.12s stagger.

**Right column (45%)** — The Data Strip:

Four items stacked vertically, each with a label and a thin line:

```
ES ——————————— NATIVE
EN ——————————— FLUENT
DE ——————————— PROFESSIONAL
FR ——————————— CONVERSATIONAL
```

Labels in `new-astro` 400, 0.75rem, uppercase, `letter-spacing: 0.15em`. The dashes are 1px `var(--rule-color)` lines that fill from left to right as they enter view — the fill color is `var(--accent-copper)`. Fill distance corresponds to proficiency (ES: 100%, EN: 95%, DE: 75%, FR: 45%).

Below the languages, a small cluster of additional data points in the same tag style:

```
TEUTLÁN → ESSLINGEN → SALTILLO
TEC DE MONTERREY · STEINBEIS · CINVESTAV
```

These animate with the ScrambleText effect — characters decode from random glyphs.

---

### 03 — SELECTED WORK (The Core — 65% of the Page)

This section is the reason anyone visits. It's structured as a sequence of immersive case studies, each occupying one or more viewport heights. No cards. No grid. No thumbnails. Every project is a **moment**.

#### Section Entry

Before the first project, a single line appears centered:

```
SELECTED WORK · 2021—2025
```

In `new-astro` 400, 0.85rem, uppercase, `letter-spacing: 0.2em`, `opacity: 0.5`. It types in via the ScrambleText effect. Below it, the ghost section number:

```
03
```

In `new-astro` 700, `8vw`, `opacity: 0.06`, positioned behind the upcoming content. It scrolls at 0.5x speed (parallax).

---

#### Project Layouts — Three Formats in Sequence

**FORMAT A — "The Full Bleed"**

The project image/render bleeds to fill the entire viewport as a CSS background (`background-size: cover; background-position: center`). On top of it, a dark vignette gradient (`radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.85) 100%)`) ensures text readability.

Content positioned at the bottom-left, 8% from edges:

- Project title in `new-astro` 700, `clamp(2rem, 4vw, 5rem)`, uppercase
- One-line description in `new-astro` 400, `1rem`, `opacity: 0.8`
- Date + tags along the right edge, rotated 90° vertically, in caption style

**Scroll behavior**: The image slowly zooms (`scale: 1.0 → 1.08`) over the scroll duration — a Ken Burns effect. The title characters stagger in from the bottom as the section enters view. On scroll exit, the entire section's opacity drops to 0 while the next section overlaps via z-index stacking.

**Image reveal technique**: The image doesn't just appear — it reveals via an animated `clip-path: inset()`. On scroll entry, the image starts as `clip-path: inset(15%)` and opens to `clip-path: inset(0%)` over the first 30% of the section scroll. This creates a "curtain opening" on the image.

---

**FORMAT B — "The Split"**

Viewport divides into two columns: text (40%) | image (60%).

**Left column (text):**

- Project number in outlined copper numerals: `new-astro` 700, `clamp(5rem, 8vw, 10vw)`, `-webkit-text-stroke: 1px var(--accent-copper)`, `color: transparent`. The number sits at the top.
- Title below: `new-astro` 700, uppercase, `clamp(1.5rem, 2.5vw, 3rem)`
- 2–3 line description: `new-astro` 400, 1rem, `line-height: 1.6`
- Date + location at bottom in caption style

**Right column (image):**
A single powerful image, slightly oversized (105% width), bleeding off the right edge. The image enters with a **mask reveal** — a `clip-path: polygon()` wipe from left to right, scrubbed to scroll position. Behind the image, before it's revealed, a desaturated, heavily blurred ghost of the same image sits at 5% opacity — creating a "shadow" that hints at what's coming.

**Parallax split**: The text column scrolls at normal speed. The image column scrolls at 0.85x speed. This separation gives the composition a subtle dimensional quality.

---

**FORMAT C — "The Horizontal Filmstrip"**

This is the **"wait, what just happened"** moment. A single section that breaks the vertical scroll entirely.

The container pins to the viewport via `ScrollTrigger` with `pin: true`. As the user continues scrolling vertically, the content moves **horizontally** — 3–5 project images/renders slide past like a filmstrip or contact sheet.

**Fixed left panel (30vw):**

- Project title: `new-astro` 700, uppercase
- Description: `new-astro` 400, 1rem
- A small `SCROLL →` indicator in caption style, pulsing gently

**Scrolling right panel (70vw → extends to ~250vw):**
Images arranged side by side with 4vw gaps. Each image has:

- A thin 1px `var(--rule-color)` border
- A caption below in `new-astro` 400, 0.7rem
- An index number in top-right corner

Between images, subtle 1px vertical rules with opacity 0.15 — like film frame separators.

**Entry/Exit**: On entering, the first image slides in with the clip-path wipe. On exiting (unpinning), the section compresses back to a single remaining image that then scrolls away normally. The transition out should feel like the "filmstrip retracting."

---

#### The Sequence (7 Projects)

| #   | Project                         | Format         | Rationale                                                                                                         |
| --- | ------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------- |
| 01  | **Team Romeo Wildfire Drone**   | A (Full Bleed) | Strongest visual impact — drone against fire/landscape. Leads with visceral energy.                               |
| 02  | **KUKA Gripper Design**         | B (Split)      | Technical CAD/renders work beautifully in the split — numbers and precision on left, industrial imagery on right. |
| 03  | **RGB-D Research at CINVESTAV** | C (Filmstrip)  | Depth maps, point clouds, and research imagery as a scrolling scientific contact sheet.                           |
| 04  | **3D Scanning Rig at Magna**    | A (Full Bleed) | Industrial environment — the scanning rig in the Magna facility, cinematic and atmospheric.                       |
| 05  | **Humanoid Motion Mimicry**     | B (Split)      | Sequential motion frames work in the split format. Outlined number in copper for visual accent.                   |
| 06  | **Self-Stabilizing Sphere**     | C (Filmstrip)  | Prototype iterations, testing footage stills, mechanism diagrams — perfect filmstrip content.                     |
| 07  | **Gravity Racer**               | A (Full Bleed) | End on something human and fun. The racer in motion, energy, joy. Close the loop.                                 |

**Between each project**: A 30vh "breathing room" — pure `#0A0A0A` with only the ghost section number visible at low opacity. This pacing prevents visual fatigue and makes each project arrival feel like an event.

---

### 04 — THE ARCHIVE

A controlled shift in energy. After the cinematic showcase, the archive is deliberately **restrained** — a text-only list that trusts the titles.

**Layout**: Full-width vertical stack. Each entry is a single row:

```
AUTOMATED PCB INSPECTION SYSTEM ·························· 2024
CNC TOOL PATH OPTIMIZER ·································· 2023
DELTA ROBOT PICK & PLACE ································· 2023
```

- Project name: `new-astro` 700, `clamp(1rem, 1.25rem, 1.5rem)`, uppercase, left-aligned
- Leader dots: Generated with CSS `background-image: radial-gradient(circle, var(--text-tertiary) 1px, transparent 1px)`, `background-size: 8px 2px`, filling the space between name and year
- Year: `new-astro` 400, `0.85rem`, `opacity: 0.4`, right-aligned

**Hover behavior**: On hover, the row shifts slightly right (+8px via `translateX`) and the background fills with a ghosted project image — massive, desaturated, at 6% opacity, `mix-blend-mode: lighten`. The image bleeds beyond the row's bounds, extending 150% height. This creates a "hallucination" of the project that appears and vanishes with the cursor.

**Expand behavior**: Clicking a row expands it inline (no page navigation). The expansion uses a `clip-path: inset()` animation opening from the click point. Expanded state reveals:

- 2–3 line description in body text
- Tags in caption style
- One image if available, at 40% width
- A thin copper rule separating expanded content from the next item

---

### 05 — EXPERIENCE & EDUCATION (The Timeline)

**Not** a vertical timeline with dots. Instead, a spatial, scroll-driven cartography of Rodrigo's journey.

**The line**: A single 1px horizontal rule spanning 80% of the viewport width, centered vertically. Set in `var(--rule-color)`.

**The markers**: Five notches along the line, positioned chronologically. Each is a small vertical tick (8px tall) with a label above in `new-astro` 400, 0.7rem, uppercase:

```
2019          2020          2022          2023          2024
TEC DE MTY    STEINBEIS     CINVESTAV     MAGNA CIMS    FRC HOUSTON
SALTILLO      ESSLINGEN     SALTILLO      GUELPH        HOUSTON
```

Location names sit below the line in caption style, staggered so they don't collide.

**The traveler**: An 8px solid circle in `var(--accent-copper)` that slides along the line as the user scrolls through this section (scrubbed to ScrollTrigger). As it passes each marker, the marker "activates":

- The tick grows from 8px to 16px
- A text block expands below the line: 2–3 sentences about that experience in body text
- A thin copper hairline connects the marker to the expanded text

**The path**: Between markers, a thin dashed line (1px, `var(--text-tertiary)`, `stroke-dasharray: 4 8`) traces a route that isn't straight — it has slight organic curves (SVG path), like a real journey. The copper circle follows this path via GSAP `MotionPath`.

**Mobile behavior**: The timeline rotates 90° and becomes vertical. The copper circle travels downward. Markers activate on scroll-reveal instead of position-scrub.

---

### 06 — THE HUMAN SECTION

A tonal shift. After the precision of engineering work, this section is deliberately softer, warmer — like the moment in a documentary where the subject looks away from the camera and just talks.

**Layout**: Asymmetric two-column. Image (35%) | Text (50%), with 15% negative space on the right.

**Image**: A candid photograph — not a headshot. Something real: Rodrigo in a workshop, at a whiteboard, examining a prototype, or in the Esslingen streets. The image is:

- Black and white (desaturated via CSS `filter: grayscale(1) contrast(1.05)`)
- Slightly soft at the edges (a 20px feathered `mask-image` vignette)
- Positioned off-center, 10% from the left edge, 20% from the top
- Slightly tilted (1.5° via `transform: rotate(-1.5deg)`) — just enough to feel real, not staged

**Text (right side)**:

A name header first:

```
RODRIGO
```

In `new-astro` 700, 1.5rem, uppercase. Not massive — this isn't a headline, it's a quiet label.

Then, first-person prose in `new-astro` 400, `1.125rem`, sentence case, `line-height: 1.7`, `opacity: 0.9`:

> I grew up in Saltillo building things that moved before I knew what engineering was. I've studied in Mexico, worked in Germany, done research in Ontario, and competed in Houston. Somewhere along the way I started teaching German, mentoring FIRST Robotics kids, and reading about systems that don't exist yet.
>
> I think the best engineers are the ones who stayed curious about things that have nothing to do with engineering.

The text fades in line by line with the `clip-path` wipe, but slower than elsewhere on the site — 0.15s per line. The pacing communicates intimacy.

Below the text, a small cluster of "interests" in tag style, widely spaced:

```
ROBOTICS · LANGUAGE · TEACHING · TRAVEL · MAKING THINGS MOVE
```

---

### 07 — CONTACT (The Close)

Returns to the opening's emptiness. Full viewport. Near-nothing.

Center of the screen:

```
LET'S BUILD SOMETHING.
```

In `new-astro` 700, `clamp(1.5rem, 3vw, 4rem)`, uppercase, `letter-spacing: 0.08em`. This is the only "call-to-action" text on the site — and it's a statement, not a plea.

Below it, the email address:

```
RODRIGO@GUTIERREZPENA.COM
```

In `new-astro` 700, `clamp(1.2rem, 2.5vw, 3rem)`, uppercase, wrapped in a `mailto:` link. Default color: `var(--text-primary)`.

**Hover effect**: On hover, the text fills with `var(--accent-copper)` from left to right. This is done via a `background: linear-gradient()` clipped to text:

```css
a.email-link {
  background: linear-gradient(
    to right,
    var(--accent-copper) 50%,
    var(--text-primary) 50%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}
a.email-link:hover {
  background-position: 0 0;
}
```

Below the email, a horizontal row of social links — small icons (16px) in `var(--text-secondary)`, turning `var(--accent-copper)` on hover with a 0.3s transition. Spaced 32px apart. No branded colors — all monochrome.

**Final line**, positioned at the absolute bottom, 24px from the edge:

```
© MMXXV RODRIGO GUTIÉRREZ PEÑA
```

In `new-astro` 400, 0.7rem, uppercase, `letter-spacing: 0.2em`, `opacity: 0.3`.

The scroll progress line reaches 100%. That's the period on the sentence.

---

## VI. Interaction System — The Rules

### Scroll Philosophy

Every animation falls into one of two categories:

1. **Triggered** — Plays once when the element enters the viewport. Used for text reveals, image clip-path reveals, and one-time transitions. Uses `toggleActions: "play none none none"`.
2. **Scrubbed** — Linked 1:1 to scroll position. Used for the progress bar, parallax, horizontal scroll section, and timeline traveler. Uses `scrub: 1` for natural catch-up.

No looping animations. No autoplay. No animations that play without scroll engagement. The user controls the pace.

### Velocity Awareness

The site should respond to _how fast_ someone scrolls:

- **Fast scroll**: Text animations complete instantly (GSAP `duration` compressed). Image reveals jump to end state. The site respects urgency.
- **Slow scroll**: Full animation richness plays out. Staggered character reveals, slow zooms, gentle clip-path wipes. The site rewards patience.

Implemented via `ScrollTrigger.getVelocity()` passed as a multiplier to `gsap.to()` durations.

### Page Transitions (If Project Detail Pages Exist)

If any project opens to a dedicated detail view:

- A `clip-path: circle()` expansion from the exact click coordinates
- The circle grows from `0%` to `150vmax` over 0.6s
- Behind the expanding circle, the detail page content is already rendered
- Background color shifts from `#0A0A0A` to `#111111`
- Back navigation reverses the circle (collapse to click point)

No page reload. No route change unless using `history.pushState` for URL updates.

---

## VII. Responsive Architecture

### Mobile (< 768px)

- **Hero name**: Scales to `12vw`, still two lines, still commanding
- **Format A (Full Bleed)**: Works natively — image fills viewport, text at bottom
- **Format B (Split)**: Stacks vertically — image on top (60vh), text below (40vh). Image still has clip-path reveal.
- **Format C (Filmstrip)**: Converts to a **vertical swipe carousel** with snap points. Fixed text panel moves to the top (30vh), images scroll below with `scroll-snap-type: y mandatory`.
- **Timeline**: Rotates to vertical. Copper circle moves downward on scroll. Markers reveal sequentially.
- **Cursor system**: Entirely disabled. Touch affordances replace it.
- **Side navigation**: Collapses into a minimal bottom bar showing current section index: `03 / 07`

### Tablet (768px–1200px)

- Format B becomes 50/50 split instead of 40/60
- Type sizes scale via `clamp()` — all breakpoints are fluid, no hard jumps
- Timeline stays horizontal but marker labels shrink to abbreviations
- Side navigation moves to bottom-right corner

### All Breakpoints

- Single font family = zero font-loading layout shifts
- Grain overlay and ambient motion disabled if `prefers-reduced-motion: reduce`
- All `clamp()` values ensure smooth scaling without media query cliffs
- Images use `<picture>` with `srcset` for resolution-appropriate loading
- `loading="lazy"` on all images below the fold

---

## VIII. Performance & Technical Architecture

### Stack

| Layer         | Tool                                                             | Why                                                    |
| ------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| Smooth scroll | **Lenis**                                                        | Native scroll feel, no jank, works with ScrollTrigger  |
| Animation     | **GSAP + ScrollTrigger + SplitText + ScrambleText + MotionPath** | Industry standard. Now free after Webflow acquisition. |
| Bundler       | **Vite**                                                         | Fast dev, optimal production builds, tree-shaking      |
| Hosting       | **Vercel or Netlify**                                            | Edge deployment, instant HTTPS, preview deploys        |
| Optional      | **Barba.js**                                                     | Only if project detail pages need route transitions    |

### Performance Budget

| Metric                   | Target                               |
| ------------------------ | ------------------------------------ |
| First Contentful Paint   | < 1.2s                               |
| Largest Contentful Paint | < 2.5s                               |
| Total Blocking Time      | < 200ms                              |
| Cumulative Layout Shift  | < 0.05                               |
| Total page weight        | < 3MB (images compressed, WebP/AVIF) |
| JavaScript bundle        | < 150KB gzipped                      |

### Critical Path

1. Inline critical CSS (above-fold styles)
2. Preload `new-astro` font files
3. Load grain SVG inline (no network request)
4. Defer all GSAP/ScrollTrigger until after `DOMContentLoaded`
5. Lazy-load all images below Section 01
6. Use `IntersectionObserver` as ScrollTrigger's lazy init

---

## IX. The Intangibles — What Makes It Win

1. **The restraint is the statement.** Every Awwwards winner in the minimalist category succeeds not because of what they added but because of what they refused to add. One font. One accent color. One typeface family. Zero gradients. Zero glassmorphism. Zero particles. The discipline IS the design.

2. **The transitions between sections.** The "space between" is as designed as the sections themselves. The 30vh breathing rooms, the background color micro-shifts, the ghost section numbers parallaxing in the void — these gaps are where the site develops its rhythm.

3. **The horizontal scroll section (Format C).** This is the "tell your friends about it" moment. When the scroll locks and content starts moving laterally, the user physically feels the site has a different intelligence. It's not a gimmick — it's a structural decision that creates variety without clutter.

4. **The cursor system.** Most portfolios use a custom circle cursor and call it a day. This system has six states that communicate real meaning. The magnetic pull toward links, the velocity-responsive deformation during scroll, the `VIEW` label on project hover — each state teaches the user something about the interface.

5. **The film grain.** It's invisible when you look at it. It's unmissable when it's removed. That 3.5% opacity noise layer is the difference between "dark background" and "atmosphere."

6. **The loading counter → curtain split.** The site begins with a performative reveal. The number counting, the pause at 100, the vertical split — this is a 3-second experience that establishes the site's temperament before any content appears.

7. **The single copper dot on "PEÑA."** Tiny. Unexpected. The only warm color in a monochrome hero. It humanizes the massive typography and draws the eye to the full name.

---

## X. Reference & Inspiration Map

| Technique                                | Inspired By                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| Film grain overlay                       | Stefan Vitasović Portfolio 2025 (LED + noise shader on WebGL textures) |
| Cursor state system                      | Obys Agency (magnetic pull), Lusion v3 (velocity awareness)            |
| Horizontal scroll filmstrip              | _Don't Board Me_ (Awwwards SOTY 2024), Crosswire scroll interactions   |
| Type-only hero with parallax dissolution | _Federico Pian / Folio23_, _Grégory Lallé '24_                         |
| Clip-path image reveals                  | _Opal Tadpole_ (Awwwards SOTY 2024 text reveal + media transitions)    |
| Ghost section numbers                    | _RossMason®_ (oversized semi-transparent index markers)                |
| ScrambleText decode effect               | _SALT AND PEPPER_ (Awwwards SOTD, coded reveal on technical data)      |
| Timeline as horizontal spatial path      | _Emotion Agency / Promo_ (scroll-driven spatial navigation)            |
| Single-font hierarchy                    | Josef Müller-Brockmann's Univers-only print systems                    |
| Preloader counter + curtain split        | _Noomo Labs_ (numerical loading + reveal choreography)                 |

---

_This document describes an intent. The magic is in the execution — in the 0.03s stagger between characters, in the exact moment the clip-path reaches the image's subject, in the weight of the copper against the void. Every millisecond and pixel are decisions._
