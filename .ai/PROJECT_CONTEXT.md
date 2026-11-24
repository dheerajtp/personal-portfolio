# Project Context

Personal portfolio website. Stable, verified facts only; the repository is the source of truth.

## Stack

- React 19 + Vite, plain JavaScript (`.jsx`/`.js`), no TypeScript, frontend only, no backend/database, no router.
- Plain CSS with variables (`src/styles/tokens.css`); `@fontsource/inter`.
- ESLint (`react/no-multi-comp`), Vitest + Testing Library (jsdom).

## Commands

`npm run dev`, `build`, `preview`, `lint`, `test`.

## Structure

- `src/data/` content, `src/sections/` sections, `src/components/` UI, `src/hooks/`, `src/styles/`, `src/assets/` images.
- `public/` resume, favicon, og.png, robots.txt, sitemap.xml. `__SITE_URL__` token in `index.html`, `robots.txt`, `sitemap.xml` is replaced at deploy.
- Static deploy on Vercel (`dist`).
