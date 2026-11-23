# 01/08 — Acceptance

Plan folder: [`00-README.md`](00-README.md) · Model: Opus (checks and review) + Haiku (evidence files, DEPLOY.md) · Prerequisites: 01/07 · Parallel with: none

## Decisions you need
All of them for verification. Read the acceptance checklist in `00-README.md` (section `## Acceptance checklist`) and these rows: P9 (confidentiality), P11 (activity strip), P15 (quality), P17 (hosting) — run `cd docs/plans/01-portfolio && grep -E '^\| (P9|P11|P15|P17) ' 00-README.md`.

## Read first
- `docs/plans/01-portfolio/00-README.md` (Status, Acceptance checklist, Open items).
- Each earlier slice's `## Result` section (headings only unless something failed).
- `git status` and `git diff --stat`.

## Scope (files you own)
`docs/plans/01-portfolio/evidence/**`, `docs/plans/01-portfolio/00-README.md` (tick Status and Acceptance boxes only), `DEPLOY.md`. You may fix defects found, but each fix is a minimal, named edit listed in `## Result`; larger problems go back as a new slice.

## Tasks
0. **Pre-acceptance fixes (small, named edits; list each in `## Result`).** (a) **Photo.** `src/assets/logos/dheeraj.jpeg` is the user's photo (1200×1600, face centred near x 555, y 780). Make the avatar use it: `sips -c 700 700 --cropOffset 430 205 src/assets/logos/dheeraj.jpeg --out /tmp/photo-crop.jpg && sips -s format jpeg -s formatOptions 82 --resampleWidth 480 /tmp/photo-crop.jpg --out src/assets/photo.jpg` (check the result by viewing it; adjust the offset if the head is cut off; file under 60KB). Import `src/assets/photo.jpg` in `src/components/side/SideColumn.jsx`, pass it as the `photo` prop of `Avatar.jsx` (alt "Dheeraj T.P", explicit width/height 88, rendered round inside the gradient ring, `object-fit: cover`), and hide the DEV-only "photo soon" caption when a photo is present. Keep the monogram as fallback when `photo` is falsy and add a test for both. Do not delete or edit the original file and do not import it. (b) **Contrast.** Lighthouse flagged `color-contrast` on dark-theme `button[aria-pressed="true"]` (white text on `#8080ff`, 3.25:1). Find the rule (language filter chips in `src/components/projects/projects.css`, possibly shared styles) and give pressed state a text colour that reaches at least 4.5:1 in both themes using tokens, no hard-coded one-theme colours. (c) Re-run Lighthouse on a temp copy of `dist` with `__SITE_URL__` replaced by `http://127.0.0.1:4190` (never edit the real files); Accessibility must be at least 98 and SEO 100; record the four scores in `evidence/lighthouse.txt`.
1. **Run the gates.** `npm ci`, `npm run lint`, `npm test`, `npm run build`. Save the last lines of each into `evidence/gates.txt`.
2. **Visual evidence (Opus).** Serve `npm run preview` and capture full-page screenshots with headless Chrome at 1440×900 and 390×844, light and dark (set theme by writing `localStorage.theme` via a small query-less script or by capturing with `--force-dark-mode` for dark), into `evidence/desktop-light.png`, `desktop-dark.png`, `mobile-light.png`, `mobile-dark.png`. Read each image and list defects (overlap, clipped text, unreadable contrast, horizontal scroll). Fix or report.
3. **Interaction check.** With a scripted headless run or the dev server, confirm: palette opens with Ctrl+K and closes with Esc; resume link responds `200` with `application/pdf` (`curl -sI http://localhost:4173/Dheeraj-TP-Resume.pdf`); nav highlight changes on scroll; case study cards expand. Record pass/fail per item in `evidence/interactions.md`.
4. **Confidentiality and content greps (P9).** None of these may match in `src public index.html docs/plans/01-portfolio/*.md`: `grep -rniE 'public repos|repos\b.*[0-9]{2}|http://' src public index.html --exclude-dir=assets --exclude='*.test.*'` (the XL logo SVG contains XML namespace `http://` strings, and tests contain fixtures); every `github.com/dheerajtp/<repo>` URL found in `src` or `index.html` must have `<repo>` in `formula-one, money-flow, event-log, Ambient-Music, Piik-Alternative, Claude-Session`; no project counts ("projects delivered", "clients served" with digits); the Flight Booking URL appears only in `src/data/caseStudies.js` and the case-study component output, not in `experience`/`companyProjects` data. Report matches verbatim.
5. **Images stored (P7).** `grep -rnE 'https?://[^"\x27 ]+\.(png|jpe?g|webp|svg|gif)' src index.html` must return nothing except `og:image` tokens; every `src/assets` image is imported or referenced by key.
6. **Diff review (P15).** `git status` and `git diff` (plus untracked list): only intended files, no secrets, no debug logging, no TypeScript, no stray `lighthouse.json`, `.DS_Store` or `dist/`. One JSX component per file: `npx eslint --rule '{"react/no-multi-comp":"error"}' src` is clean.
7. **`DEPLOY.md` (Haiku).** Steps for the user: create the GitHub remote and push; create a Vercel project (framework Vite, build `npm run build`, output `dist`); after the URL is known replace `__SITE_URL__` in `index.html`, `public/robots.txt`, `public/sitemap.xml` and set `SITE_URL` in `src/data/profile.js`; re-run Lighthouse; add the photo; list the Open items from `00-README.md`.
8. **Close out.** Tick every Status line and every Acceptance box that is proven, with the evidence file name next to it; anything not proven stays unticked with a one-line reason.

## Done when
- Every acceptance row in `00-README.md` is ticked with evidence, or listed as not proven with a reason.
- `npm run lint`, `npm test`, `npm run build` pass on a clean install.
- `evidence/` contains gates, four screenshots and the interaction record. Append `## Result` (summary, fixes made, open items).
