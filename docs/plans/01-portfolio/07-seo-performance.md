# 01/07 — SEO, sharing and performance

Plan folder: [`00-README.md`](00-README.md) · Model: Sonnet · Prerequisites: 01/06 · Parallel with: none

## Decisions you need
P7 (images), P14 (SEO), P15 (quality bars), P17 (hosting) — run `cd docs/plans/01-portfolio && grep -E '^\| (P7|P14|P15|P17) ' 00-README.md`.

## Read first
- `index.html` (slice 01 version), `src/data/profile.js` (`SITE_URL`, empty until known), `docs/plans/01-portfolio/design/reference.html` lines 197–207 and the "Search and sharing preview" markup (search for `class="share"`) for the card look.
- `.ai/PROJECT_CONTEXT.md`, `.ai/DECISIONS.md` (formats are in the files).

## Scope (files you own)
`index.html`, `public/og.png`, `public/robots.txt`, `public/sitemap.xml`, `public/favicon.svg`, `docs/plans/01-portfolio/design/og-card.html`, `README.md`, `.ai/PROJECT_CONTEXT.md`, `.ai/DECISIONS.md`.

## Tasks
1. **Meta in `index.html`.** Title and description exactly as P14, `<meta name="theme-color">` for light and dark (`media` attributes), `<link rel="icon" href="/favicon.svg">`, Open Graph (`og:type=website`, `og:title`, `og:description`, `og:image=/og.png`, `og:image:width=1200`, `og:image:height=630`, `og:image:alt`), Twitter `summary_large_image`. `og:url`, `canonical` and absolute image URLs use the token `__SITE_URL__` (replaced at deploy; documented in README and DEPLOY.md by slice 08). Add a tiny inline script that applies a saved `localStorage.theme` to `<html data-theme>` before first paint (try/catch).
2. **`favicon.svg`**: "DT" monogram on a primary-to-secondary gradient rounded square.
3. **`og-card.html` + `og.png`.** A static 1200×630 HTML card (gradient from primary to secondary, "Dheeraj T.P", "Full-Stack Developer and Team Lead", "Calicut · React · Node · Laravel", Inter via system fallback is acceptable). Capture once with headless Chrome: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1200,630 --screenshot=public/og.png file://$PWD/docs/plans/01-portfolio/design/og-card.html`. Verify with `sips -g pixelWidth -g pixelHeight public/og.png` (1200×630) and that the file is under 200KB.
4. **`robots.txt`** (`User-agent: *`, `Allow: /`, `Sitemap: __SITE_URL__/sitemap.xml`) and **`sitemap.xml`** with the single root URL `__SITE_URL__/`.
5. **Performance audit.** Check every image under `src/assets/projects/` is ≤150KB (re-encode with `sips -s formatOptions 75` if not), has width/height and `loading="lazy"` (fix in the owning component with a one-line named edit if missing; list the edit in `## Result`), and no component fetches or imports anything on first paint beyond what P11 describes. Run `npm run build` and record JS/CSS gzip sizes in `## Result`.
6. **Lighthouse.** `npm run build && npm run preview` then `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx lighthouse http://localhost:4173 --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --output=json --output-path=./lighthouse.json --chrome-flags="--headless=new"`. `npx` is a one-off run, not a dependency. Record the four scores in `## Result`; fix anything below 95 that is in your scope or report the exact failing audits. Delete `lighthouse.json` afterwards.
7. **Docs.** `README.md`: what the site is, `npm` scripts, folder map, "edit content" table (which `src/data/*.js` file controls which section), "add a project" (add an entry to `projects.js`, drop a JPG in `src/assets/projects/` and register its key), "add the photo" (`src/assets/photo.jpg`), and the `__SITE_URL__` replacement note. `.ai/PROJECT_CONTEXT.md`: real stack, commands, structure. `.ai/DECISIONS.md`: add dated entries for the P1, P6 and P9 decisions (Decision / Reason / Impact) without naming any excluded repo.

## Done when
- `og.png` is 1200×630; meta tags present; `__SITE_URL__` appears only in `index.html`, `robots.txt`, `sitemap.xml` and docs.
- Lighthouse mobile ≥ 95 in all four categories, or the failing audits are listed with reasons.
- `npm run lint`, `npm test`, `npm run build` pass; earlier slices' tests stay green. Append `## Result`.

## Result
Files: index.html, public/{favicon.svg,og.png,robots.txt,sitemap.xml}, docs/plans/01-portfolio/design/og-card.html, README.md, .ai/PROJECT_CONTEXT.md, .ai/DECISIONS.md.
- og.png 1200x630, 125KB. Chrome's direct capture was 212KB (over 200KB), so it was round-tripped through `sips` GIF to a 256-colour PNG (gradient looks fine).
- Image audit: all projects images <=130KB; all `<img>` have width/height; project/case images have `loading="lazy"` (logos/avatar are above the fold or tiny, left eager). No component edits needed.
- Build gzip: JS 81.17 kB, CSS 5.16 kB, index.html 0.74 kB.
- Lighthouse mobile (npx, one-off): Performance 100, Accessibility 96, Best Practices 100, SEO 85.
  - SEO 85: `robots-txt` and `canonical` fail only because `__SITE_URL__` is an unreplaced token; they pass once substituted at deploy.
  - Accessibility `color-contrast`: dark-theme `button[aria-pressed=true]` white on #8080ff (3.25:1, needs 4.5). It is a CSS token issue (dark `--primary` as a filled-button background) outside this slice's scope; fix in styles (e.g. dark text on the dark-primary fill or a darker fill).
- lint, test (20 files, 42 tests), build pass. lighthouse.json deleted, no dependency added.
