# Party-Up Brand Book

**Party-Up.be** — No Nonsense Feestverhuur  
*Power Up BV · Party & event rental for private and small professional events (10–100 guests) in Belgium*

---

## 1. Brand essence

### Mission & positioning
- **Tagline (NL):** *No Nonsense Feestverhuur*
- **Tagline (EN):** *No Nonsense Party Rental!*
- **Tone of voice:** Practical, reliable, clear. No fluff, no surprises.
- **Promise:** No storage, no maintenance, no hassle — reliable party equipment you pick up and return yourself.

### Target audience
- Private individuals organising parties
- Small businesses (events for 10–100 guests)
- Belgian market (Dutch primary; French possible for expansion)

---

## 2. Color system

### Primary palette — Red
Used for **accent, focus states, and brand gradient (start)**. Conveys energy and confidence.

| Token    | Hex       | Usage |
|----------|-----------|--------|
| primary-50  | `#fef2f2` | Light backgrounds, hover tints |
| primary-100 | `#fee2e2` | Soft backgrounds |
| primary-200 | `#fecaca` | Borders, disabled states |
| primary-300 | `#fca5a5` | Decorative |
| primary-400 | `#f87171` | Secondary accents |
| **primary-500** | `#ef4444` | **Primary red (base)** |
| **primary-600** | `#dc2626` | **Focus rings, links, gradient start** |
| primary-700 | `#b91c1c` | Hover on primary-600 |
| primary-800 | `#991b1b` | Dark accents |
| primary-900 | `#7f1d1d` | Darkest red |

**CSS / Tailwind:** Use `primary-*` (from `tailwind.config.ts`).

---

### Secondary palette — Blue
Used for **primary actions (CTAs), navigation, links, and trust**. Main interactive color across the site.

| Token     | Hex       | Usage |
|-----------|-----------|--------|
| secondary-50  | `#f0f9ff` | Light backgrounds (e.g. blue-50 in UI) |
| secondary-100 | `#e0f2fe` | Nav active background (blue-50/100) |
| secondary-200 | `#bae6fd` | Decorative (e.g. hero blur) |
| secondary-400 | `#38bdf8` | Decorative blurs |
| **secondary-500** | `#0ea5e9` | **Base blue** |
| **secondary-600** | `#0284c7` | **Buttons, links, cart badge, gradient end** |
| secondary-700 | `#0369a1` | Hover on buttons (blue-700) |

**In components:** The app often uses Tailwind’s `blue-600` / `blue-700`; these align with `secondary-600` / `secondary-700`.

---

### Semantic colors
- **Success / Add to cart:** Green — `green-600` (#16a34a), hover `green-700`. Used for “In winkelwagen”, add-to-cart buttons, success states.
- **Error / Unavailable:** Red — `red-600` for unavailable stock or errors.
- **Warning / Focus:** Primary red `primary-600` for focus outlines (accessibility).

---

### Neutrals (text & UI)
- **Primary text:** `gray-900` — `rgb(17, 24, 39)` — headings and body (via `--foreground-rgb`).
- **Secondary text:** `gray-600`, `gray-700` — descriptions, captions.
- **Muted text:** `gray-500` — labels, hints.
- **Backgrounds:** `white`, `gray-50`, `gray-100` for sections and cards.
- **Footer / dark UI:** `gray-900` background, `gray-300` text, `gray-800` borders.

---

### Gradient
- **Brand gradient (text/visual):** `linear-gradient(135deg, #dc2626 0%, #0284c7 100%)`  
  - Start: primary-600 | End: secondary-600  
  - Use for hero headline treatment (e.g. “No Nonsense Feestverhuur”) or marketing accents.  
- **Hero headline (current):** White with soft yellow tint: `from-white via-yellow-100 to-white` (animated).

---

## 3. Typography

### Font family
- **Primary:** **Inter** (Google Fonts), Latin subset, `display: swap`.
- **Usage:** All UI text, headings, and body copy.

### Scale & usage

| Element     | Class / size     | Weight   | Color     | Use case |
|------------|------------------|----------|-----------|----------|
| Hero H1    | text-5xl–7xl     | bold     | white     | Home hero headline |
| Page title | text-4xl         | bold     | gray-900  | Main page heading (e.g. Catalogus, Prijzen) |
| Section H2 | text-4xl         | bold     | gray-900  | Section titles |
| H3         | text-2xl–3xl     | bold/semibold | gray-900 | Subsections, card titles |
| H4         | text-xl          | semibold | gray-900  | Card titles, form sections |
| Body large | text-lg          | normal   | gray-600 / gray-900 | Intro paragraphs |
| Body       | text-base (default) | normal | gray-900 / gray-600 | Body copy |
| Small      | text-sm          | normal/medium | gray-600 / gray-500 | Captions, meta, footer |
| Micro      | text-xs          | medium/semibold | gray-500 / white | Badges, labels, uppercase labels |

### Line height & spacing
- Headings: default Tailwind line height; add `mb-4` or `mb-6` for spacing below.
- Body: default; use `max-w-2xl` for long-form readability where appropriate.

---

## 4. Logo & assets

### Logo files
- **Full logo (horizontal):** `/logo-full.png` — header, light backgrounds. Height ~56px (h-14) in header.
- **Icon / mark:** `/logo-icon.png` — footer, favicon, compact use. Rendered with transparent background; avoid checkerboard (see `globals.css` for overrides).

### Usage
- Minimum clear space around logo; do not stretch or rotate.
- On dark (e.g. hero): ensure sufficient contrast (e.g. white/light version if available).
- Favicon: `/favicon.png` (also used as Apple touch icon).

---

## 5. UI elements

### Buttons

| Type        | Style | Example classes |
|-------------|--------|------------------|
| **Primary CTA** | Solid blue | `bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium/semibold px-4 py-2` (or py-3 / px-6 for larger) |
| **Secondary (outline)** | Border + transparent | `border-2 border-white/50 text-white rounded-lg hover:bg-white hover:text-blue-600` (hero) |
| **Secondary (light)** | White bg, blue text | `bg-white text-blue-600 rounded-lg hover:bg-white/90` (header CTA when scrolled) |
| **Success / cart** | Green | `bg-green-600 text-white hover:bg-green-700 rounded-lg border-2 border-transparent hover:border-green-400` |
| **Ghost / tertiary** | Gray | `bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200` (e.g. category pills) |

**Common behaviour:** `transition-colors` or `transition-all`, `active:scale-95` where appropriate. Optional `shadow-lg shadow-blue-600/25` for primary CTA emphasis.

### Border radius
- **Standard:** `rounded-lg` (8px) — cards, buttons, inputs.
- **Pills / filters:** `rounded-full` — category chips, badges.
- **Large blocks:** `rounded-xl` — mobile CTA, dialogs.

### Shadows
- **Cards:** `shadow-md` default, `hover:shadow-lg` on interactive cards.
- **Header (scrolled):** `shadow-lg`.
- **Modals / overlay panels:** `shadow-2xl`.
- **Hero CTA:** `shadow-2xl`, optional `hover:shadow-3xl`.

### Spacing & layout
- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Section padding:** e.g. `py-20`, `pt-28 pb-20` (above fold sections account for fixed header).
- **Grid gaps:** `gap-4`, `gap-6`, `gap-8` for grids; `space-y-2` to `space-y-6` for stacks.

---

## 6. Motion & animation

### Principles
- Subtle and purposeful; support feedback and hierarchy, not distraction.
- Prefer CSS-only (no JS) for hero and page load.

### Keyframes (from `globals.css`)
- **fadeInUp** — Hero and section content (opacity + translateY).
- **fadeIn** — Simple fade-in.
- **slideDown** — Header on load.
- **scaleIn** — Modals, cart badge pop.
- **float / floatAlt** — Decorative blurs (hero).
- **bounce** — Scroll indicator, subtle emphasis.
- **gradient** — Background position shift for hero headline.
- **pulse-glow** — Optional red glow (primary-600).
- **shimmer** — Optional loading/skeleton accent.
- **cart-add-pop** — Cart icon when a new item is added.

### Class usage
- Hero content: `animate-hero-content`, `animate-hero-content-delay-1` … `delay-4`.
- Header: `animate-header-slide`.
- Cards/CTAs: `hover:scale-105` where appropriate.
- Focus: always visible focus ring (primary-600, 2px, 2px offset).

---

## 7. Accessibility

- **Focus:** `*:focus-visible` — 2px solid `primary-600` (#dc2626), 2px offset. Do not remove.
- **Contrast:** Body text on white meets WCAG AA; gray-600 on white for secondary text.
- **Language:** Root `lang="nl"`; switch to appropriate lang for French content if added.

---

## 8. Voice & copy

- **Headlines:** Short, benefit-led (e.g. “Organiseer je perfecte feest zonder gedoe”).
- **Body:** Direct and reassuring (e.g. “Geen opslag, geen onderhoud, geen verrassingen.”).
- **CTAs:** Action-oriented — “Reserveer Nu”, “Bekijk Catalogus”, “Bekijk alle producten”.
- **Legal/footer:** Formal where required; keep navigation labels simple (Catalogus, Prijzen, FAQ, Contact, etc.).

---

## 9. Technical reference

### Tailwind
- **Config:** `tailwind.config.ts` — `theme.extend.colors.primary` and `theme.extend.colors.secondary` (full scales).
- **Global CSS:** `app/globals.css` — variables, animations, `.text-gradient`, `.glass`, focus, scrollbar-hide, logo background overrides.

### CSS variables
```css
--foreground-rgb: 17, 24, 39;   /* gray-900 */
--background-rgb: 255, 255, 255;
```

### Text gradient utility
```css
.text-gradient {
  background: linear-gradient(135deg, #dc2626 0%, #0284c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

*Document version: 1.0 · Party-Up.be · Power Up BV · Last updated: February 2025*
