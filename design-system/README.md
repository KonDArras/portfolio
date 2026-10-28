# Schematic

The visual language of Christos Karagiannis's portfolio, a DevOps and cloud engineer's site that reads like infrastructure: a dark blueprint grid, glass panels, terminals that type themselves out, and status lights that say the system is up.

Extracted from `src/index.css` and the React components in `kondarras/portfolio`. Every value here is the one the site ships.

## Principles

1. **Read like a system, not a brochure.** Sections are framed as ops artifacts: a deploy terminal ("In practice"), a monitoring dashboard ("Stack"), a history log ("Pipeline"). Reach for these metaphors before you reach for a generic card.
2. **Dark, warm, green.** One theme only. The ground is `bg` (#0a120e), a near-black forest green. Text is `text` (#f4f1e6), a warm off-white, never pure white.
3. **Square and hairlined.** No rounded cards. Structure comes from 1px `line` rules and from panels set in a grid whose `line` background shows through 1px gaps. Only circles get radius (`radius-round`).
4. **Motion that means something.** Pulses mean live, typing means in progress, count-ups mean measured. Everything respects `prefers-reduced-motion`.

## Content fundamentals

- **Voice:** first person, plain and specific. "I design and ship cloud infrastructure for financial services and EU-funded projects." No hype words.
- **Ops vocabulary, lightly:** "All systems operational — 4 services monitored", "Nothing deployed to this page yet.", "Runs oldest to newest — the top line is where things stand today." One wink per section, not a costume.
- **Headings are labels:** single words or short phrases in sentence case ("In practice", "Stack", "Background").
- **Intros are one line** in `text-dim`, max 60ch.
- **Em dashes** join a label to its detail: "Company — Role".

## Color

| Token | Role |
| --- | --- |
| `bg` | Page ground. Also the ink on `live` fills. |
| `panel-glass` | Translucent panel fill, always with `blur(16px) saturate(160%)`. |
| `line` | Every hairline, grid gap and outline border. |
| `text` / `text-dim` | Primary and secondary text. |
| `live` | The accent and the "up" state: links, active nav, live dots, numbers, focus rings. |
| `signal` | Structure: section labels, the role line, the terminal prompt. |
| `amber` | Rare warmth: link hover, one terminal dot. |

Rules:
- `live` is the only color that fills a control (active FilterPill, hovered CV button). Its ink is `bg`.
- `signal` labels structure; it never marks state.
- All text colors pass 4.5:1 on `bg` and on `panel` (lowest: `signal` at 7.1:1 on `panel`).
- **Known gap:** `line` is 2.47:1 on `bg`. It's fine for dividers but under the 3:1 a control border needs (FilterPill, Tags, the CK mark). Hover and active states switch to `live` or `signal`. Raise `line` if those controls need to stand on their border alone.

## Type

Two Google-hosted families, loaded in `index.html`:

- **Space Grotesk** (`display`), 400/500/600/700: the name, the role, body and card titles.
- **IBM Plex Mono** (`mono`), 400/500: everything that's data or chrome, including section labels, nav, tags, dates, numbers and terminal text.

The html root is 18px, so the source's rem values come out larger than usual (1rem = 18px). The styles list the computed px values. Body line height is 1.55; terminal text is 1.7. The name is the only large type (`hero-name`, up to 90px, weight 700, -0.02em tracking). Section headings stay small (`section-label`, mono 18.9px, in `signal`).

## Layout and spacing

- **Blueprint grid:** a fixed 48px (`space-48`) line grid behind everything at 16% opacity. It drifts slowly and a soft radial mask follows the pointer.
- **Page:** content max `content-max` (1180px), inset `gutter-left` (190px) on desktop to clear the fixed rail nav, and 24px under 760px.
- **Sections:** `space-72` vertical padding, closed by a `line` rule.
- **Panels:** 22–26px padding (`space-24`), set in a grid with 1px `line` gaps and a `line` outline.
- Gaps step through 8 / 10 / 14 / 20 / 28 / 40 / 48.

## Surfaces and depth

Glass, not shadow. Panels are `panel-glass` with backdrop blur, a `glass-edge` 1px border and `shadow-glass` (a 1px top highlight). The terminal is the one surface that lifts off the page (`shadow-terminal`). On hover a panel gets a 180px `live-tint` spotlight that follows the cursor, and a `live` border.

## Motion

Kept in code, not tokens:
- **Entrance:** hero blocks `rise` 10px over 0.6s `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 90ms.
- **Reveal:** sections fade and rise 18px over 0.55s as they scroll in.
- **Live pulse:** 2.4s ring on live dots; 3.4s ring on the portrait.
- **Caret:** 1s stepped blink.
- **Page change:** a View Transition. The new page wipes in as a circle from the clicked link over 1.05s.

All of it switches off under `prefers-reduced-motion: reduce`.

## Iconography

Line icons only: 20px box, 1.4 stroke, round caps, inked in `live`. Five exist (Icons group), all for hobbies. There is no logo. The mark is the monogram **CK** set in IBM Plex Mono inside a 30px `line` circle (TopNav). The portrait carries two `live` corner ticks, the one decorative flourish.

## Components

Twelve, written by hand from the site's JSX and CSS (namespace `Schematic`). They're React 18 function components styled by `components/bundle.css`: SectionHeading, Panel (and Panel.Grid), Tags, FilterPill, StatusDot, Meter, Stat, LinkRow, TopNav, Terminal, HobbyChip, EmptyState.

## Not synced

- **Fonts:** Google-hosted, so there are no font files; `components/bundle.css` imports them from Google Fonts.
- **Page-level pieces left out as components:** the grid backdrop, rail nav, portrait (with tilt and ticks), hero layout, side labels and the view-transition router. Their styles are described above.
- **Animation:** the typewriter, sequential typing, count-up, meter fill and breathe are site behavior. Components render the settled state (Terminal takes a `typing` line).
- **Profile photo and CV PDF:** personal files, not brand assets.
