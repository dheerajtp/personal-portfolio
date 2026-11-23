# Personal Portfolio

Single-page portfolio for Dheeraj T.P: about, experience, case studies, featured projects, leadership, recognition and contact. React 19 + Vite, plain JavaScript, no backend.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the build locally (port 4173) |
| `npm run lint` | ESLint (one JSX component per file is enforced) |
| `npm test` | Vitest |

## Folder map

- `src/data/` content as plain JS
- `src/sections/` page sections
- `src/components/` UI pieces, grouped by section
- `src/hooks/` shared hooks
- `src/styles/` CSS files and design tokens
- `src/assets/` project screenshots, logos, (later) the photo
- `public/` resume, favicon, `og.png`, `robots.txt`, `sitemap.xml`

## Edit content

| File | Controls |
| --- | --- |
| `src/data/profile.js` | Name, title, contact, about, stats, `SITE_URL` |
| `src/data/experience.js` | Experience timeline |
| `src/data/projects.js` | Featured projects (order = display order) |
| `src/data/caseStudies.js` | Case studies |
| `src/data/companyProjects.js` | Company projects |
| `src/data/skills.js` | Skills |
| `src/data/education.js` | Education |
| `src/data/awards.js` | Recognition |
| `src/data/leadership.js` | Leadership |
| `src/data/workflow.js` | Workflow |

## Add a project

1. Add an entry to `src/data/projects.js`.
2. Drop a JPG (150KB or less) in `src/assets/projects/` and register its key in `src/assets/projects/index.js`.

Without an image the generated placeholder card is used.

## Add the photo

Save it as `src/assets/photo.jpg`.

## Site URL

`index.html`, `public/robots.txt` and `public/sitemap.xml` contain the token `__SITE_URL__`. Replace it with the deployed origin (no trailing slash) at deploy time, for example `sed -i '' 's#__SITE_URL__#https://example.vercel.app#g' dist/index.html dist/robots.txt dist/sitemap.xml`. Also set `SITE_URL` in `src/data/profile.js`.
