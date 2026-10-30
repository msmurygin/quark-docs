# Task cards

One A5 page per RF process, data-driven.

## Rebuild

```bash
cd docs-obsidian/user-guide/cards
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node build.mjs      # all cards -> dist/
node build.mjs --check                                         # data rules only, no browser
node build.mjs --only R1,K2 --debug                            # a few cards; failing ones go to dist/_debug/
node build.mjs --lang ru                                       # dist/ru/ (see "Add a language")
```

Outputs: `dist/<id>.png` (2x), `dist/<id>.pdf` (A5), `dist/all-cards.pdf` (one page per card, ordered by area), `dist/manifest.json` (used by the site). Playwright is read from `/opt/node22/lib/node_modules` (override with `PLAYWRIGHT_MODULES_DIR`).

The build FAILS and names the card when: a step has more than 8 words, there are more than 9 steps, there are not 3 to 5 problems, a key used in the text is not in `keys[]`, an image is missing or a crop/highlight is outside it, text is under 11 px, text is cut, content does not fit the page, or a card spills to a second PDF page. Step text starts at 15 px and shrinks (down to 12 px) only when needed; the build warns below 14 px.

## Add a card

Append an object to `cards.en.json`:

| Field | Meaning |
|---|---|
| `id` | `R1`, `K2` ... unique |
| `title`, `area` | area is one of `cards.config.json` `areaOrder` (label in `ui.<lang>.json`) |
| `needs[]` | the "You need" line |
| `steps[]` | `{text, keys[], note?}`. `text` max 8 words. `[F8]` draws a keycap, `**To Loc**` is a screen label in bold. `keys[]` lists every `[..]` used in text and note |
| `loop` | `{afterStep, text}`: the tinted "go back" line |
| `screens[]` | 2 to 4 of `{image, crop, badge, highlight, caption?}`. `image` is a file in `assets/screens/`. `crop` is `{y0,y1}` (or `{top,height}`) in source pixels, or a list of such bands that are stacked. `badge` is the step number, or a range such as `"4-6"` when one screen covers several steps. `highlight` is `{x,y,w,h}` (or a list, or `null`) in source pixels of the full image |
| `problems[]` | 3 to 5 of `{if, do}`: the most common ones, plain words |
| `codes[]` | screen codes for the footer |

Source screens are 780 x 1560. Menu row n starts near y = 80 + 86 (n-1) and is 84 high; form fields start at y = 134 when there is a sub-header, else 80; the footer buttons are y 1462-1560. To use a better screenshot, change only the `image` name (re-measure crop and highlight if the screen differs). Images with a numbered teal badge burned in (the capture session numbers badges per image, not per card step) must NOT be used as they are: their numbers would clash with the card's step numbers. Use the clean copy `raw/<same name>.png` (set `image` to `raw/rf-receive-asn-line.png`) and let the card draw the yellow highlight and the step badge. Images without a copy in `raw/` carry no burned-in badge.
Crop tips: a band `[{y0:0,y1:80},{y0:338,y1:944}]` stacks the header and the rows you need; add `{y0:1462,y1:1560}` to keep the footer keys (a highlight on a footer key: `{x,y:1464,w,h:96}`, width = 780 / number of buttons). Rows are 86 px apart; with a sub-header the first field is at y = 134.

Reference cards (like Z1) use `"layout": "reference"` with `sections` (`keys` rows and `messages` rows).

## Add a language

1. Copy `cards.en.json` to `cards.ru.json`. Keep `id`; translate `title`, `needs`, `steps[].text/note`, `loop.text`, `problems`, `screens[].caption`, `sections`. The number of steps and problems must match English, otherwise the English text is used and a warning is printed. Keycaps stay as `[F8]`.
2. Copy `ui.en.json` to `ui.ru.json` (interface words, area labels; optional `maxWordsPerStep`).
3. `node build.mjs --lang ru` writes `dist/ru/`. The template is not touched.

## Print

A5, margins none (borderless), scale 100% (not "fit to page"), colour on, then laminate. In the PDF viewer choose "Actual size". Use `all-cards.pdf` for a full set.

## QA on a real terminal (before release)

For each card, with the operator role in a test warehouse:

- [ ] Do every step in order. Each key and field name matches the terminal (menu numbers can differ: see the note in `operator/00-README.md`).
- [ ] The screenshot highlight is on the field or key the step names.
- [ ] Provoke each "If something goes wrong" problem; message wording and advice match.
- [ ] Loops (More SKUs, More stops) and optional steps behave as written.
- [ ] A supervisor completes every supervisor step.
- [ ] Print one card at A5 / 100%: readable at arm's length, nothing cut off.
- [ ] Record date, terminal software version and tester in the pull request.

## Screens still generic

Every card has 2 to 4 real screens. These steps still have no screen of their own (the card shows the neighbouring screen or none), because the capture session has no clean image or the card has no room (4 screens max):

- R1 steps 1-2, 5, 8; R2/R3/R4/R5/R7 steps 1-2 (Receiving menu rows) - menu rows are only in `raw/rf-receive-asn-menu.png` (used on R6).
- R6 steps 2-5: only the first capture screen, the complete screen and the resume list exist; the Esc-then-Y stop question was not captured.
- R5 step 5: the Adjust screen (`raw/RCADJ02.png`) exists but has no room on the card.
- C1 step 3: the Work Area screen (`raw/rf-count-area.png`) exists but has no room.
- K1 step 9: Pick Result (`rf-pick-done.png`) shows `Picked 0` after a full pick of 60 (capture log, product bug 7), so it is not used until fixed. Steps 3 and 5: no room.
- K2 steps 2, 4, 6, 8: Area, Carrier, Carrier Ready and the item/box scans exist (`rf-area-*.png`) but have no room; serial picks and lot confirmation on a pick were not captured (capture log, known gaps).
- K3 step 7: the supervisor sign-in for a pallet of another operator was not captured.
- A1 step 2: Station (`raw/rf-pack-station.png`) has no room.
- L1 steps 1-2 share one screen; step 6 is the hint line of the Main Menu.
- R4, R3, R2: Done screens beyond the ones shown have no room.

## Site

`docs-site` copies `dist/` at build time (`npm run gen:cards`, part of `npm run build`); it never runs Playwright. `dist/` is git-ignored: rebuild before `npm run build` in `docs-site` (the site copies whatever is in `dist/`).
