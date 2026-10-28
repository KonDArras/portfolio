# Panel

Glass panel: translucent `panel-glass` over a blur, with a cursor-tracked `live-tint` spotlight and a `live` border on hover.

Panels never float alone: set them in `Panel.Grid`, whose `line` background shows through 1px gaps as hairline dividers. Square corners (`radius-none`). Pass `spotlight={false}` for static content. Consumer supplies the content; `title` renders an h3.

Hand-written from `src/index.css` (`.panel`, `.spotlight`, `.panels`) and `useSpotlight` in `src/hooks.js`.
