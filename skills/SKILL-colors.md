# Caitlin Bannan Website — Color Palette

## The palette (4 colors + 2 neutrals)

| Name | Hex | CSS Variable | Role |
|------|-----|-------------|------|
| Navy | `#1A2E4A` | `--color-navy` | Nav, footer, primary CTA buttons, gig card backgrounds |
| Sage | `#4A7C6F` | `--color-sage` | Secondary actions, band names, city/location text on dark, your original dances in programs, eyebrow text on light backgrounds |
| Dusty Rose | `#C17A8A` | `--color-rose` | Contact me pill, date labels, event/org name on dark, video links, section eyebrows on dark |
| Rose Blush | `#EDD5DB` | `--color-rose-blush` | Hero background, page headers, alternating warm sections, band name text on dark |
| Off-white | `#F5F2EE` | `--color-off-white` | Body sections, card backgrounds, alternating neutral sections |
| Linen | `#E8E2D9` | `--color-linen` | Band member text on dark (with 0.6 opacity), general on-dark text |

## Supporting variables

```scss
--color-bg:             var(--color-white);      /* #ffffff — card interiors */
--color-bg-warm:        var(--color-rose-blush); /* hero, headers, warm sections */
--color-bg-neutral:     var(--color-off-white);  /* body sections */
--color-bg-dark:        var(--color-navy);       /* nav, footer */

--color-text:           var(--color-navy);
--color-text-secondary: #6a5a52;
--color-text-muted:     #9a8a80;
--color-text-on-dark:   var(--color-linen);
--color-text-on-dark-muted: #a0b4c8;

--color-link:           var(--color-sage);
--color-link-hover:     #2C5045;

--color-border:         #e0d8d0;
--color-border-warm:    #d4b8c0;
--color-border-dark:    rgba(255, 255, 255, 0.08);
```

---

## Color roles — strict rules

### Rose (`#C17A8A`) is used for:
- The "Contact me" nav pill button
- Date labels in gig cards (both upcoming and archive)
- Organization/event name in the archive gig header (on navy)
- Video links ("Watch video ↗") in programs and choreography
- Section eyebrow labels on dark backgrounds
- The hover state for rose elements is `#a5607a`

### Sage (`#4A7C6F`) is used for:
- Secondary CTA button ("See upcoming gigs")
- Band names in gig archive headers (on navy)
- Location/city text in gig archive headers (on navy)
- Your own original dances in program lists (linked, underlined)
- "See all →" links in section headers
- Eyebrow labels on light backgrounds
- The hover state for sage links is `#2C5045`

### Navy (`#1A2E4A`) is used for:
- Nav background
- Footer background
- Gig card backgrounds (upcoming cards on homepage and gigs page)
- Gig archive card header backgrounds
- Primary CTA button ("Book me for your event")
- Heading text throughout

### Rose Blush (`#EDD5DB`) is used for:
- Hero section background
- All page headers (the rose-blush block at the top of every interior page)
- Alternating warm sections on the homepage
- Band name text in gig archive headers (on navy)
- Never used as a button color

### Off-white (`#F5F2EE`) is used for:
- Body background
- Alternating neutral sections
- Form field backgrounds
- Card body areas on the choreography page

---

## What to avoid

- **Never introduce new colors** — all colors must come from the palette above
- **Never use teal, cyan, or blue** — these crept in during development and were removed
- **Never use pure white as a section background** — use off-white instead
- **Never use gradients** — flat colors only
- **Rose blush is never a button background** — it's only a section/header background
- **Sage on navy has poor contrast** — avoid using sage for important text on navy backgrounds (rose reads much better on navy)
- **The deep forest color (`#2C3A2E`) was removed** — do not reintroduce it

---

## Alternating section pattern

Every page body alternates between warm and neutral:

```
Nav (navy)
Page header (rose blush)
Section 1 (off-white)
Section 2 (rose blush)
Section 3 (off-white)
Section 4 (rose blush)
Footer (navy)
```

Homepage specifically:
```
Nav (navy)
Hero (rose blush)
Upcoming gigs (off-white)
Videos (rose blush)
Choreography teaser (off-white)
Booking strip (rose blush)
Footer (navy)
```

Warm sections (rose blush) use `--color-border-warm` (`#d4b8c0`) for borders.
Neutral sections use `--color-border` (`#e0d8d0`) for borders.
