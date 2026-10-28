# SectionHeading

Section heading: a numbered mono eyebrow in `signal` with a short `line-strong` rule, over a one-line headline in `text`.

The eyebrow labels the section ("03 PIPELINE"); the intro is the real headline (`section-headline`, max 30ch). On the site the number comes from a CSS counter; here pass `num`. The section closes with a `line` rule at `space-104` padding (`space-72` on mobile). Consumer supplies `title`, and optionally `num`, `intro` and an `id` for `aria-labelledby`.

Hand-written from `src/index.css` (`.section h2`, `.section .page-intro`).
