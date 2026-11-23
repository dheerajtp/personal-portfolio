# 01/01 — Scaffold, design system and layout shell

Plan folder: [`00-README.md`](00-README.md) · Model: Sonnet · Prerequisites: none · Parallel with: 01/02 (disjoint files; 02 only writes `src/data/**`)

## Decisions you need
P1 (stack, deps, scripts), P2 (tokens), P3 (theme), P4 (layout), P7 (images, resume, avatar), P15 (quality bars), P16 (tests) — run `cd docs/plans/01-portfolio && grep -E '^\| (P1|P2|P3|P4|P7|P15|P16) ' 00-README.md`.

## Read first
- `docs/plans/01-portfolio/design/reference.html`: CSS lines 6–194 (tokens 6–16, base 17–77, polish and shared classes 78–194), markup lines 197–300 (page skeleton, `.site` grid, `.side`, `.main`, `#toast`).
- `rules/frontend/CLAUDE_FRONTEND.md` (rules 3, 7, 9) and `CLAUDE.md`.
- `Dheeraj's Resume.pdf` (repo root; copy only).

## Scope (files you own)
`package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `.gitignore`, `index.html`, `public/Dheeraj-TP-Resume.pdf`, `src/main.jsx`, `src/App.jsx`, `src/styles/**`, `src/components/layout/**`, `src/components/common/**`, `src/hooks/useTheme.js`, `src/assets/**`, `src/test/**`, and these **stubs that later slices overwrite whole**: `src/sections/{About,Experience,CaseStudies,Projects,Leadership,Workflow,Recognition,Contact}Section.jsx`, `src/components/side/SideColumn.jsx`.

## Tasks
1. **Tooling.** `package.json` (`"type": "module"`, private, scripts `dev`, `build`, `preview`, `lint`, `test` = `vitest run`). Install only the P1 dependencies (plus `@eslint/js` and `globals`). `vite.config.js` uses `defineConfig` from `vitest/config`, React plugin, test env `jsdom`, `setupFiles: ./src/test/setup.js` (imports `@testing-library/jest-dom/vitest`). `eslint.config.js` flat config: recommended JS, react, react-hooks, `react/no-multi-comp: ['error', { ignoreStateless: false }]`, `react/prop-types: off`, browser globals, ignore `dist`, `docs`.
2. **Housekeeping.** `.gitignore` (node_modules, dist, coverage, `.DS_Store`, `*.log`). `index.html`: `lang="en"`, charset, viewport, a temporary `<title>` (slice 07 finalises meta), `<div id="root">`, module script. `cp "Dheeraj's Resume.pdf" public/Dheeraj-TP-Resume.pdf` (keep the original).
3. **Styles.** `src/styles/tokens.css` = the light/dark token blocks (P2, same three-block pattern as reference lines 6–16, including `color-scheme`). `base.css` = reset, body, links, headings colours, `:focus-visible`, reduced-motion rule. `layout.css` = `.site`, `.side`, `.main`, `.eyebrow`, `@media (max-width:860px)` stacking. `shared.css` = `.chips`, `.chip`, `.links`, `.btn2`, `kbd`, `.empty`, `.ph` (dev-only placeholder look). `index.css` imports the four. Sections own their own CSS next to their components.
4. **Fonts.** `main.jsx` imports `@fontsource/inter` weights 400, 500, 600, 700 CSS, then `./styles/index.css`, calls `initTheme()` before `createRoot(...).render(<StrictMode><App/></StrictMode>)`.
5. **Theme.** `src/hooks/useTheme.js`: `initTheme()` reads `localStorage['theme']` (try/catch) and sets `data-theme` on `<html>` if saved; `useTheme()` returns `{ theme, toggle }` via `useSyncExternalStore` (subscribe to a `MutationObserver` on `data-theme` and to `matchMedia('(prefers-color-scheme: dark)')`), so every consumer stays in sync. `toggle` flips the effective theme, sets the attribute and saves it (try/catch).
6. **Common components (one per file, `src/components/common/`).** `ThemeToggle.jsx` (fixed top-right 40px round button, `aria-label="Switch to dark theme"/"Switch to light theme"`, sun/moon `Icon`), `Icon.jsx` (props `name`, `size`; renders one `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden>` from `iconPaths.js`), `iconPaths.js` (map name → array of `d` strings; names: `sun`, `moon`, `doc`, `search`, `check`, `code`, `shield`, `circleCheck`, `listCheck`, `down`, `message`, `trophy`, `star`, `medal`; copy path data from the reference markup lines 246–288, draw `sun`/`moon` in the same 24px stroke style), `Placeholder.jsx` (renders `<span class="ph">` only when `import.meta.env.DEV`, else `null`), `SectionHeading.jsx` (the `.eyebrow` line with trailing rule; props `id`, `children`), `ChipList.jsx` (props `items`).
7. **Layout.** `src/components/layout/SiteLayout.jsx`: `<ThemeToggle/>` + `.site` grid with `side` and `main` slots (props `side`, `children`), `<main className="main">`. `src/App.jsx`: `SiteLayout side={<SideColumn/>}` containing the eight section components in P4 order.
8. **Assets.** Copy `design/assets/{formula-one,money-flow,event-log,Ambient-Music,Piik-Alternative,Claude-Session,History-Shorts-Planner,flight-booking,fairobuy}.jpg` to `src/assets/projects/` and `logo-ioss.png`, `logo-xl.svg` to `src/assets/logos/` (as `ioss.png`, `xl.svg`). `src/assets/projects/index.js` exports `projectImages` (key = file base name, value = imported URL); `src/assets/logos/index.js` exports `logoImages = { ioss, xl }`.
9. **Stubs.** Each `*Section.jsx` renders `<section id="…"><SectionHeading …/></section>` with the ids and headings from P4 / reference (About, Experience, Case studies, Projects, How I lead, AI-assisted workflow, Recognition, Contact). `SideColumn.jsx` renders `<aside className="side"><h1>Dheeraj T.P</h1></aside>`.
10. **Tests (`src/test/`).** `useTheme.test.jsx`: defaults to system, toggle flips attribute and persists, two consumers stay in sync, storage failure does not throw. `Placeholder.test.jsx`: renders in dev, returns nothing when `import.meta.env.DEV` is stubbed false (`vi.stubEnv`).

## Done when
- `npm run lint`, `npm test`, `npm run build` pass; no `.ts`/`.tsx`/`tsconfig`/`typescript` anywhere.
- `npm run dev` shows the stacked stub sections with Inter, working theme toggle, no console errors.
- `grep -rn "no-multi-comp" eslint.config.js` matches; every `.jsx` file has one component.
- Root typecheck is not applicable (plain JS). Append `## Result`.

## Result
Done. Created tooling (package.json, vite.config.js, eslint.config.js, .gitignore, index.html), `public/Dheeraj-TP-Resume.pdf`, `src/{main.jsx,App.jsx}`, `src/styles/*`, `src/hooks/useTheme.js`, `src/components/{common,layout,side}`, `src/assets/{projects,logos}` (+index.js), eight section stubs, `src/test/*`.
- `npm run lint` PASS, `npm test` PASS (3 files, 14 tests; includes slice 02's data test), `npm run build` PASS. `npm run dev` not run in a browser.
- Deviations: eslint pinned to 9 (eslint-plugin-react does not support 10); `@testing-library/dom` added (peer of @testing-library/react). `iconPaths` has one extra name `list` (priorities icon); `listCheck` is the clear-tasks checkbox icon.
- Stub section ids: about, experience, cases, projects, lead, workflow, recognition, contact; headings use `SectionHeading` (an `h2.eyebrow` with `id="<id>-h"`, section `aria-labelledby`). `Placeholder` takes children. Theme toggle styles live in shared.css (`.theme-toggle`). Nav/.item/.proj etc. CSS is NOT in the shared styles; later slices own it next to components.
