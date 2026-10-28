# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Personal portfolio site for Christos Karagiannis (DevOps & Cloud Engineer). Static React 18 + Vite app, deployed to S3 behind CloudFront. No server, no API.

## Commands

- `npm install`: install dependencies
- `npm run dev`: dev server at http://localhost:5173
- `npm run build`: static build to `dist/` (`base: "./"`, so paths are relative)
- `npm run preview`: serve the built `dist/`

There are no tests or linters configured.

## Architecture

- `src/main.jsx`: React root. `src/App.jsx`: shell (top nav, grid backdrop, routed page, footer).
- `src/router.js`: hash-based routing (`#/`, `#/projects`, `#/guides`) with View Transitions for page swaps. No router library.
- `src/pages/`: Home, Projects, Guides. `src/components/`: Portrait, Terminal, TopNav, GridBackdrop, icons.
- `src/data.js`: all site content (skills, experience, guides, terminal script). Edit content here, not in components.
- `src/hooks.js`: shared hooks (reveal-on-scroll, spotlight, typewriter, count-up, scroll-spy, sequential typing).
- `src/index.css`: all styles, plain CSS with custom properties on `:root`. No framework.

## Design system (`design-system/`)

"Schematic", extracted from `src/index.css` and the components. Start with `design-system/README.md` (the brand book). `tokens.json` holds every color, type style, spacing, radius and shadow value; `components/` has hand-written React versions of the site's UI pieces with `bundle.css`. The live version is the Design System artifact at https://claude.ai/artifact/WEiRSKh1S9UCgG1MaXYmRo.

When changing styles, reuse the existing tokens (`--bg`, `--line`, `--line-strong`, `--live`, `--signal`, …) and keep `design-system/tokens.json` in sync with `src/index.css`. `--line` (2.47:1 on `--bg`) is for dividers only; borders on controls use `--line-strong`.

## Subagents (`.claude/agents/`)

`orchestrator` routes non-trivial work and always sandwiches it between `senior-dev` (plan + trim) and `reviewer` (verdict), with `token-manager` as a lean-usage pass. There are no domain specialists yet — add one per area (e.g. design, content) once the site has real structure to specialize around.
