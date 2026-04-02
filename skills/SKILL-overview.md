# Caitlin Bannan Website — Design System

## Project overview
Personal website for Caitlin Bannan, a contra dance caller based in Seattle, WA. Built with Eleventy (11ty) static site generator, SCSS, and Nunjucks templates. Deployed on Netlify.

The site serves two primary audiences:
1. **Dance organizers** looking to book a caller (primary goal)
2. **Contra dance callers** researching program flow and repertoire (secondary but important)

---

## Site structure

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | `/` | Hero + upcoming gigs + videos + choreography teaser + booking strip |
| Gigs | `/gigs/` | Upcoming gigs only, card-based |
| Past Programs | `/gigs/previous/` | Archive of past gigs with full programs |
| Choreography | `/choreography/` | Index list + full notation cards for original dances |
| About | `/about/` | Bio + contact form |

---

## Overall aesthetic
Warm, community-oriented, handcrafted folk-arts feel. Not corporate. Not a developer portfolio. Thinks like a well-designed folk arts festival program — distinctive, inviting, and clearly human.

The design alternates warm (rose blush) and neutral (off-white) sections throughout every page, creating rhythm without requiring decorative elements.

---

## Typography
- **Body/UI font:** InterVariable (already loaded, no import needed)
- **Heading font:** Georgia (system font, no import needed)
- **Base font size:** 62.5% on html, then rem units (1.8rem = ~18px body text)
- **Font weights:** 400 regular, 500 medium only — never 600 or 700

---

## Page structure rules

Every page follows this shell:
1. **Nav** — always navy background
2. **Page header** — always rose blush background with eyebrow + title
3. **Body sections** — alternate rose blush / off-white
4. **Footer** — always navy background

The nav and footer bookend every page with the same navy color — this is intentional and should never be changed.

Interior page headers always use:
```html
<div class="page-header">
  <div class="page-header__inner">
    <p class="page-header__eyebrow">Section name</p>
    <h1 class="page-header__title">Page title</h1>
    <p class="page-header__subtitle">Optional subtitle</p>
  </div>
</div>
```

---

## Key data files

- `src/_data/home.json` — hero image, body text, featured videos
- `src/_data/about.json` — about page photo path
- `src/_data/gigs.js` — loads all gig JSON files, splits into upcoming/previous
- `src/_data/gigs/YYYY.json` — one file per year of gigs
- `src/_data/choreography.js` — loads all choreography JSON files
- `src/_data/choreography/*.json` — one file per dance

---

## Custom Eleventy filters (in .eleventy.js)

- `limit(n)` — returns first N items from array (use instead of `slice`)
- `sortByDate` — sorts array by `date` field, newest first
- `date(format)` — formats ISO date string using Luxon
- `markdown` — renders markdown string to HTML
- `svg` — inlines SVG file content

---

## SCSS file structure

```
src/assets/scss/
  main.scss              ← imports everything
  global/
    variables.scss       ← all CSS custom properties
    base-styles.scss     ← reset, typography, buttons, forms
  layouts/
    home.scss            ← homepage-specific styles
  components/
    site-header.scss     ← nav
    site-footer.scss     ← footer
    drawer.scss          ← mobile nav drawer
  pages/
    gigs.scss            ← gigs + archive styles
    about.scss           ← about/contact page styles
    choreography.scss    ← choreography page styles
  third-party/
    normalize.scss       ← CSS reset
```
