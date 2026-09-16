# Christos Karagiannis — Portfolio

Personal portfolio site: DevOps/Cloud engineering background, AWS-focused. Built as a static React + Vite app, meant to be deployed straight to an S3 bucket behind CloudFront — no server, no API.

## Stack

- **React 18 + Vite** — no router library; a small hash-based router (`src/router.js`) handles the three pages, using the native [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) for page swaps where the browser supports it.
- **Plain CSS** (`src/index.css`) — no framework. Dark "blueprint/schematic" theme, glassmorphic panels, CSS Grid, native scroll/intersection APIs for the reveal and scroll-spy effects.
- **Google Fonts**: Space Grotesk (display/body) and IBM Plex Mono (labels/data).

## Structure

```
index.html            Vite entry
src/
  main.jsx            React root
  App.jsx              Shell: top nav, grid backdrop, routed page, footer
  router.js            Hash-based routing + view-transition navigation
  data.js              All site content (skills, experience, guides, terminal script)
  hooks.js             Shared hooks: reveal-on-scroll, spotlight, typewriter, count-up, scroll-spy
  index.css            All styles
  pages/               Home, Projects, Guides
  components/          Portrait, Terminal, TopNav, GridBackdrop, icons
public/
  profile.jpg          Hero photo (falls back to a monogram if missing)
```

## Local development

```
npm install
npm run dev
```

Serves at `http://localhost:5173` with hot reload.

## Build

```
npm run build
```

Outputs static files to `dist/`. `vite.config.js` sets `base: "./"` so asset paths are relative — the build works from any path, not just the domain root.

## Deploying to S3 + CloudFront

1. `npm run build`
2. Sync `dist/` to your S3 bucket (e.g. `aws s3 sync dist/ s3://your-bucket --delete`)
3. Set the bucket's static website hosting (or the CloudFront origin) to use `index.html` as the default root object
4. Point a CloudFront distribution at the bucket and invalidate the cache after each deploy

Routing is hash-based (`#/`, `#/projects`, `#/guides`), so no CloudFront error-document rewrite rules are needed for client-side routing to work.

## Content

Everything text/data-driven lives in `src/data.js` — skills, work history, guides, and the terminal demo script. Update there rather than in the page components.
