# Caitlin Bannan Website — Component Patterns

## Nav

Navy background. Logo "Caitlin Bannan" in linen text on the left. Nav links in muted blue-grey (`#a0b4c8`). Active link in off-white with a sage underline. "Contact me" pill button in dusty rose on the far right.

Nav does NOT include "Home" as a link item — just Gigs, Choreography, About, Contact me.

```html
<header class="site-header">
  <div class="site-header__container">
    <a class="site-header__logo" href="/">Caitlin Bannan</a>
    <nav class="site-header__nav">
      <ul class="site-header__items">
        <!-- nav links -->
        <li><a class="site-header__link site-header__link--cta" href="/about/">Contact me</a></li>
      </ul>
    </nav>
  </div>
</header>
```

---

## Footer

Navy background. "Caitlin Bannan" in linen on the left. "Contra dance caller · Seattle, WA" in dusty rose on the right. Simple, mirrors the nav.

```html
<footer class="site-footer">
  <div class="site-footer__container">
    <span class="site-footer__name">Caitlin Bannan</span>
    <span class="site-footer__location">Contra dance caller · Seattle, WA</span>
  </div>
</footer>
```

---

## Upcoming gig cards (homepage + gigs page)

Navy background cards. Three across on desktop, stacked on mobile.

Structure per card:
- Month/year in dusty rose, small caps
- Date in large off-white text
- Organization name as underlined aqua link (`#a8d4ca`) with ↗
- Location in muted blue-grey
- Band name in sage (if named band exists)
- Band members in muted blue-grey, italic (if available)
- "Band TBA" in very muted text if no band yet

Note: if `gig.band === "TBA"` treat as no band and show "Band TBA".

---

## Gig archive cards (past programs page)

Two-part card: navy header + white body.

**Header (navy background):**
- Date — dusty rose, small, top-left column
- Organization name — dusty rose, underlined, links to org website with ↗
- Location/city — sage color
- Band name — rose blush color (if named band, can be a link if `band_url` present)
- Band members — linen color at 0.6 opacity

**Body (white background):**
- Numbered dance list
- Each dance: number in muted grey, title in navy, author in muted smaller text, all inline
- Own dances (those with a `slug` field): title in sage, underlined, links to `/choreography/#slug`
- Video links: "Watch video ↗" in dusty rose, underlined, after author
- Break: full-width horizontal rule with "BREAK" centered in small caps
- Notes: italic muted text below the program, with a top border separator, indented to align with dance titles

**JSON fields for dances:**
- `title` — dance name (required)
- `author` — choreographer (required)
- `slug` — present only for Caitlin's own dances, matches choreography JSON filename
- `video` — YouTube URL for a video of that dance being called
- `band_url` — link to band's website (on the gig, not the dance)

---

## Choreography page

Two sections on one page:

**Index list (off-white background):**
- Each dance as one line: sage linked name → muted formation/progression → em dash → short description
- Clicking the name jumps to the card below via anchor link (`#slug`)

**Dance cards (white background):**
- Card header: off-white background, dance title in navy, formation/progression/author in muted text
- Card body: two columns
  - Left: Figures — section labels (A1, B1 etc.) in dusty rose inline with first move, subsequent moves indented below
  - Right: Notes — plain text notes, video link in dusty rose at bottom
- Border between columns: 0.5px `--color-border`

**Figure notation format:**
```
A1  First move
    Second move
A2  Only move
```
Section label is inline with first move, subsequent moves wrap/indent naturally.

---

## Homepage sections

**Hero:**
- Rose blush background
- Two-column grid on desktop: text left, photo right (4:3 ratio)
- Photo on mobile spans full width (16:9 ratio)
- Eyebrow: "Contra dance caller · Seattle, WA" in sage
- Name: large navy heading
- Description: secondary text color
- Two buttons: "Book me for your event" (navy filled) + "See upcoming gigs" (sage filled)

**Videos:**
- YouTube thumbnail images (not embeds — embed permissions are disabled on these videos)
- Thumbnail URL format: `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`
- Clicking opens YouTube in new tab
- Navy play button circle centered over thumbnail, turns rose on hover
- Caption: title in navy bold, event in muted text below on separate line
- Configured in `src/_data/home.json` under `videos` array with `youtube_id`, `title`, `event`

**Booking strip:**
- Rose blush background
- Two-column: text left ("Get in touch" eyebrow + description), "Contact me" navy button right

---

## About / Contact page

**Bio section:**
- Off-white background
- Two-column: photo left (3:4 ratio), text right
- Photo configured via `src/_data/about.json` — `image` field with path like `src/assets/img/about-photo.jpg`
- Role eyebrow: "Contra dance caller · Seattle, WA" in sage
- Bio paragraph: one paragraph only

**Approved bio text:**
> I'm a contra dance caller based in Seattle, WA, focused on creating evenings that are welcoming to newcomers and satisfying for experienced dancers. With experience organizing dance nights and weekends, I understand what it takes to bring a community together. I've called for family and community dances and love introducing this tradition to new audiences.

**Contact form:**
- White background
- Heading: "Contact me" (not "Book me" — welcoming to all visitors)
- Three fields: name, email, message
- Message placeholder: "Say hello, ask about availability, or just tell me about your dance..."
- Submit button: navy filled pill
- Uses Netlify Forms (`data-netlify="true"`) — do not replace with a different form solution
- No organization field — contra is a casual community

---

## Buttons

Three button styles:
```html
<a class="btn btn--navy">Primary action</a>   /* Book me, Contact me, Send message */
<a class="btn btn--sage">Secondary action</a>  /* See upcoming gigs */
<a class="btn btn--rose">Contact CTA</a>       /* Nav pill only */
```

All buttons use `border-radius: var(--border-radius-pill)` (20px — pill shape).

---

## Links in programs and choreography

- External links (org websites, band websites): underlined, open in new tab with `rel="noopener"`, no arrow except in specific contexts
- Organization names in archive: ↗ arrow suffix, rose color on dark header
- Own dances in programs: sage, underlined, link to `/choreography/#slug` (anchor on same page)
- Video links: "Watch video ↗" in rose, underlined

---

## Restrictions and decisions to never revisit

1. **No new colors** — palette is locked. Any new UI need must be solved with existing colors.
2. **No external font imports** — InterVariable and Georgia only.
3. **No embedded YouTube players** — thumbnails only, opens in new tab.
4. **No email address on the site** — contact form only (spam prevention).
5. **No "Home" in the nav** — logo serves as home link.
6. **No "archived" or "archive" language** — use "previous" or "past" for gig history.
7. **No links to external dance references** (Caller's Box, ContraDB) in programs — only Caitlin's own dances get links, pointing to her choreography page.
8. **No "Book me" in the nav** — use "Contact me" (less presumptuous, welcoming to all visitors).
9. **No `darken()` or `lighten()` SCSS functions** — deprecated in Dart Sass 3. Use hardcoded hex values instead.
10. **No `slice` filter in Nunjucks** — use the custom `limit` filter instead.
11. **Contact form uses Netlify Forms** — do not replace or restructure.
12. **Programs always fully expanded** — no expandable/collapsible program rows.
13. **Deep forest green (`#2C3A2E`) was removed** — do not reintroduce.
14. **Sage on navy has poor contrast** — avoid for important text on navy backgrounds.
