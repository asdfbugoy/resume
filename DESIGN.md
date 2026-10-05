# Design plan — factorio.com homepage recreation

Verified against the live site on 2026-10-05 (`factorio.com/` + `/static/css/main.css`).
Where this plan and the live site differ, the live site wins.

## Layout concept (one sentence)

A factory-floor dashboard: a dense 4-column grid of dark, bevelled "machine" panels
(#313031 with 4px #2e2623 borders and lighter #414040 insets) on a warm near-black
brown background (#201810), tied together by bold cream Titillium Web headings,
light-blue links, and green/amber chamfered action buttons.

```
+---------------------------------------------------------------+
| TOP BAR (translucent)  sites left / login·signup right         |
+---------------------------------------------------------------+
| HEADER   [ FACTRIO logo 400px ]     [Game][Space Age][Blog][Support]
+---------------------------------------------------------------+
| [ TRAILER: Space Age  ]  [ TRAILER: Factorio ]   (panels2 50/50) |
+---------------------------------------------------------------+
| ABOUT THE GAME (2x2)  | LATEST RELEASES | BUY buttons (5)      |
| ABOUT (cont., media 2x)| RECENT BLOG (2 posts) | (blog spans 2) |
| ARTWORK (2 col)        | FEATURED MODS (3 tiles) | (mods 2col)  |
| SAID ABOUT US quote (3col)           | COMMUNITY social slots   |
+---------------------------------------------------------------+
| FOOTER  links + copyright + rocket                            |
+---------------------------------------------------------------+
```

Desktop ≥901px: 4-col grid (`1fr` x4, 16px gap). ≤900px: trailers and grid stack
to one column (matches live breakpoints at 900/750/450px).

## Palette tokens (from live main.css)

| token            | value        | role                                    |
|------------------|--------------|-----------------------------------------|
| `--bg`           | `#201810`    | page background (live body; spec's #201815 rounded from shadow tones) |
| `--bg-deep`      | `#0f0d0c`    | deepest shadow / inset outlines          |
| `--panel`        | `#313031`    | panel surface                            |
| `--panel-light`  | `#414040`    | lighter panel / inset surface            |
| `--panel-border` | `#2e2623`    | panel 4px border                         |
| `--inset`        | `rgba(36,35,36,.5)` | recessed inset fill                  |
| `--inset-bg`     | `#242324`    | inset background                         |
| `--text`         | `#ebe6e4`    | body text                                |
| `--heading`      | `#ffe6c0`    | headings, highlighted text               |
| `--muted`        | `#a6a6a6`    | secondary text (`#8e8e8e` darker steps)  |
| `--link`         | `#7dcaed`    | links (hover `#9ad1ea`)                  |
| `--btn-gray`     | `#8e8e8e`    | nav buttons (hover amber `#e39827`)      |
| `--green`        | `#5eb663`    | action buttons (hover `#92e897`)         |
| `--green-dark`   | `#002b02`    | disabled/dark green                      |
| `--olive`        | `#3f5024`    | pressed green                            |
| `--amber`        | `#ffa200`    | accents (hover `#e39827`)                |
| `--red-dark`     | `#642323`    | rare dark-red accent                     |

## Type roles

Titillium Web, self-hosted via `next/font/google` (weights 400/600/900).

- Headings: `h1-h5` weight 900, `#ffe6c0`, line-height 1.25. `h2` = 120%, `h3` = 116%.
- Body: 100%, line-height 1.25, `--text`.
- Small meta (posted-by, footer): 80-92%.

## Principles

1. **Bevels, not borders.** Every surface is a bevelled panel: dark fill, 4px dark
   border, layered box-shadows (top highlight / bottom shadow). Buttons are chamfered
   slabs that lift (brightness + glow) on hover and depress on :active.
2. **Neutral canvas, scarce color.** Brown-black neutrals dominate; green = act,
   amber = attention/hover, light blue = navigate.
3. **Dense, zoned.** 16px gutters; each zone is a titled panel; long-form lives in
   insets; trailing meta rows sit in thin inset footers with a square icon button.
4. **Placeholders read as media.** Media slots are dark gradient/pattern blocks with
   an inset shadow; the trailer placeholder carries a play glyph + caption.
5. **Accessible baseline.** Semantic landmarks (header/nav/main/section/footer/
   blockquote/dl); keyboard-operable dropdowns via :focus-within; visible focus
   rings; `prefers-reduced-motion` disables transitions/animations.
