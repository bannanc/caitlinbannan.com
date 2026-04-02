# Caitlin Bannan Website — Data Structures

## Gig JSON format

One file per year in `src/_data/gigs/YYYY.json`.

```json
{
  "year": 2026,
  "gigs": [
    {
      "date": "2026-05-16",
      "series": "Corvallis Folklore Society",
      "series_url": "https://corvallisfolklore.org/home/contradancing/",
      "location": "Corvallis, OR",
      "band": "Band Name",
      "band_url": "https://bandwebsite.com",
      "band_members": "Musician One (fiddle), Musician Two (piano)",
      "program": {
        "break_after": 5,
        "notes": "Optional note about the night, e.g. split the night with another caller.",
        "dances": [
          {
            "title": "Dance Title",
            "author": "Choreographer Name"
          },
          {
            "title": "On the Third Hand",
            "author": "Caitlin Bannan",
            "slug": "on_the_third_hand"
          },
          {
            "title": "Train Delay",
            "author": "Maia McCormick",
            "video": "https://youtu.be/VIDEO_ID"
          }
        ]
      }
    }
  ]
}
```

**Field notes:**
- `series_url` — links to the dance organization's website (not a venue)
- `band` — band name only. Omit if no named band.
- `band_url` — optional link to band's website
- `band_members` — individual musicians with instruments in parentheses. Use `band_members` (not `band_member` — watch for this typo)
- `program.break_after` — the break appears AFTER dance number N
- `program.notes` — free text note about the night, shown in italic below the program
- `dance.slug` — only present on Caitlin's own dances. Must match the choreography JSON filename exactly (e.g. `on_the_third_hand` for `on_the_third_hand.json`)
- `dance.video` — full YouTube URL for a video of that specific dance
- If `band === "TBA"` the template treats it as no band and shows "Band TBA"

**Band display logic:**
- Named band + members → band name in rose-blush on separate line, members in dimmed linen below
- No band name, only musicians → musicians shown directly in rose-blush
- Band name only, no members → just the band name in rose-blush
- No band info → "Band TBA" in very muted text

---

## Choreography JSON format

One file per dance in `src/_data/choreography/dance_name.json`. The filename (minus `.json`) becomes the slug.

```json
{
  "title": "On the Third Hand",
  "formation": "Duple Minor - Improper",
  "progression": "Single Progression",
  "date": "2023-08-20",
  "author": "Caitlin Bannan",
  "figures": [
    {
      "section": "A1",
      "moves": [
        "In long lines, go forward and back",
        "Robins left hand chain to partner"
      ]
    },
    {
      "section": "A2",
      "moves": [
        "Robins pass left full hey"
      ]
    }
  ],
  "notes": [
    "First note about the dance.",
    "Second note, e.g. inspiration or composition context."
  ],
  "videos": [
    {
      "label": "Lake City Contra Dance (2025)",
      "url": "https://youtu.be/VIDEO_ID"
    }
  ]
}
```

**Field notes:**
- `date` — creation date, used to sort by most recent on the homepage teaser. Required.
- `author` — always "Caitlin Bannan" since this is her choreography page
- `figures` — array of sections (A1, A2, B1, B2 etc.), each with an array of moves
- `notes` — array of strings. First note is used as preview text on the homepage teaser (truncated to 100 chars)
- `videos` — array of videos. Label is shown as link text. If multiple videos, label is shown; if only one, just "Watch video ↗"

---

## Home JSON format

`src/_data/home.json`

```json
{
  "title": "Caitlin Bannan",
  "image": "src/assets/img/hero-dance.jpg",
  "image_alt": "Caitlin Bannan calling a contra dance",
  "body": "Calling lively, welcoming contra dances across the Pacific Northwest and beyond.",
  "videos": [
    {
      "youtube_id": "VIDEO_ID",
      "title": "Dance Title by Choreographer",
      "event": "Lake City Contra Dance, August 21, 2025"
    }
  ]
}
```

**Note on videos:** YouTube embed permissions are disabled on these videos, so the site uses thumbnail images instead. Thumbnail URL is auto-generated from youtube_id: `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`. Clicking opens YouTube in a new tab.

---

## About JSON format

`src/_data/about.json`

```json
{
  "image": "src/assets/img/about-photo.jpg",
  "image_alt": "Caitlin Bannan calling a contra dance"
}
```

If `image` is empty string, the photo area is hidden gracefully — the bio text fills the space.

---

## Gigs data processing

`src/_data/gigs.js` loads all year JSON files, combines them, and exports:
- `gigs.upcoming` — future gigs sorted ascending by date
- `gigs.previous` — past gigs sorted descending by date (most recent first)

The split is based on today's date. Dates are parsed as UTC (`T00:00:00Z`) to avoid timezone issues.

---

## Choreography data processing

`src/_data/choreography.js` loads all JSON files from `src/_data/choreography/`, adds a `slug` property from the filename, and sorts alphabetically by title.

The homepage sorts by `date` descending using the custom `sortByDate` Eleventy filter to show the two most recent dances.

---

## Current dances

As of the last update, there are three choreography JSON files:
- `on_the_third_hand.json` — slug: `on_the_third_hand`
- `zig_it_right.json` — slug: `zig_it_right`
- `rofl_in_hey.json` — slug: `rofl_in_hey` (not yet called publicly)
