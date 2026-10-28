# FilterPill

Filter toggle: a mono outline button that fills with `live` and switches to `bg` ink when active.

Render a row of them with one active, starting with 'All'. Hover moves the border to `signal`. The resting `line` border is under 3:1; the label text keeps it findable. Consumer owns state and passes `active` and `onClick`.

Hand-written from `src/pages/Guides.jsx` and `.filter-pill`.
