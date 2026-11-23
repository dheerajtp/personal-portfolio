# 01/04 — Work sections: Projects and Case studies

Plan folder: [`00-README.md`](00-README.md) · Model: Sonnet · Prerequisites: 01/01, 01/02 · Parallel with: 01/03, 01/05 (disjoint folders)

## Decisions you need
P6 (featured list), P7 (images), P8 (case studies), P9 (confidentiality), P11 (recent activity), P15 (quality) — run `cd docs/plans/01-portfolio && grep -E '^\| (P6|P7|P8|P9|P11|P15) ' 00-README.md`.

## Read first
- `docs/plans/01-portfolio/design/reference.html`: CSS lines 90–110 (project cards, shot, details, meta, grid2, feat) and 148–200 (case study card `.cs`, `.csb`, activity `.act`); JS `drawSite` line 348, `shot()` line 359 (placeholder SVG), `drawCS` line 392, click handlers after line 402; markup lines 235–245.
- `src/data/projects.js`, `caseStudies.js` (slice 02), `src/assets/projects/index.js` (`projectImages`), `src/components/common/{SectionHeading,ChipList,Placeholder}.jsx`.

## Scope (files you own)
`src/sections/ProjectsSection.jsx`, `src/sections/CaseStudiesSection.jsx`, `src/components/projects/**`, `src/components/cases/**`, `src/hooks/useRecentPushes.js`, their `.css` and tests.

## Tasks
1. **Case studies** (`src/components/cases/`). `CaseStudiesSection.jsx` lists `caseStudies` with intro "Five projects in more depth: two I shipped at work, and three I built myself." `CaseStudyCard.jsx` owns `open` state; header = image (`projectImages[image]`, `alt="Screenshot of <title>"`, explicit width/height 1000×625, `loading="lazy"`, `object-fit: cover; object-position: top`) beside tag, title, summary and a button "Read case study" / "Hide case study" (`aria-expanded`, `aria-controls`) plus a "Live product ↗" link when `link` exists. `CaseStudyBody.jsx` renders only the blocks that have content: Context, My role, Stack, What I did (list), Challenges (bold title + text), Outcome. Collapsed body is not in the accessibility tree.
2. **Projects** (`src/components/projects/`). `ProjectsSection.jsx` renders heading with live count `(n)`, `ActivityStrip.jsx`, `LanguageFilter.jsx` (chips: All + each distinct `language`, `aria-pressed`, hidden when only one language), then `ProjectCard.jsx` grid (2 columns, 1 under 860px). The first card of the visible list is the wide `feat` card. `ProjectMedia.jsx` shows the screenshot or `ProjectPlaceholder.jsx` (port of `shot()`: deterministic gradient from the name, browser-frame SVG, address text = live domain or `<name> · mobile app`; no fake claims) when `image` is null. Card: year · language · green "Live" marker (only if `live`), name, summary, tags, "View details" toggle revealing Overview (summary) and Stack; links "Live site ↗" (if `live`) and "GitHub ↗" (if `repo`, `https://github.com/dheerajtp/<repo>`), both `rel="noopener noreferrer"` and `target="_blank"`. Role and Highlights rows appear only through `Placeholder` (DEV only).
3. **`useRecentPushes.js`** (P11). For projects with a `repo`, fetch `https://api.github.com/repos/dheerajtp/<repo>` in parallel with an `AbortController`, read `pushed_at`, sort descending, return the 4 newest `{ name, pushedAt }`. `sessionStorage` cache key `recent-pushes`, 10 minutes, all storage access in try/catch. On any error, non-200 or abort return `[]` (hide strip). Abort on unmount.
4. **`ActivityStrip.jsx`** renders "Recent GitHub activity" rows `name · 23 Nov 2026` (`Intl.DateTimeFormat('en-GB', { day:'numeric', month:'short', year:'numeric' })`), or `null` when the hook returns nothing.
5. **Tests.** `useRecentPushes.test.jsx` (mock `fetch`: success sorts and caps at 4; one failure drops only that repo; all fail returns `[]`; cache hit makes no request; abort on unmount), `LanguageFilter.test.jsx`, `ProjectCard.test.jsx` (no GitHub link when `repo` is null; no Live marker when `live` is null; placeholder when `image` is null), `CaseStudyCard.test.jsx` (expand/collapse, `aria-expanded`, omitted empty blocks, Live product link only when `link`).

## Done when
- Eight projects render with seven real screenshots (Agent Office, History Shorts Planner, Pit Wall, Money Flow, Event Log, Ambient Music, Piik-lite) and the liftlog placeholder; filter works; five case studies expand and collapse.
- The Flight Booking link `https://flightbooking.wappss.com/` appears only inside its case study.
- Tests pass; `npm run lint`, `npm test`, `npm run build` pass; slice 01 tests stay green. Append `## Result`.

## Result
- Added: `src/sections/ProjectsSection.jsx`, `CaseStudiesSection.jsx` (rewritten); `src/components/projects/{ActivityStrip,LanguageFilter,ProjectCard,ProjectMedia,ProjectPlaceholder}.jsx` + `projects.css`; `src/components/cases/{CaseStudyCard,CaseStudyBody}.jsx` + `cases.css`; `src/hooks/useRecentPushes.js`; tests for the hook, LanguageFilter, ProjectCard, CaseStudyCard.
- `npm run lint` PASS, `npm test` PASS (15 files, 33 tests), `npm run build` PASS.
- Notes: `@testing-library/user-event` is not installed and RTL does not auto-cleanup here, so tests use `fireEvent` and `afterEach(cleanup)`. Details/case bodies are conditionally rendered (not in the a11y tree when collapsed). CSS is imported from the components (`projects.css` from ProjectCard/ActivityStrip, `cases.css` from CaseStudyCard); shared classes `.tag` is defined in both css files. Not visually checked in a browser.
- Flight Booking URL appears only in `src/data/caseStudies.js`.
