# 01/03 — Identity sections: side column, About, Experience, Contact

Plan folder: [`00-README.md`](00-README.md) · Model: Sonnet · Prerequisites: 01/01, 01/02 · Parallel with: 01/04, 01/05 (disjoint component folders; each owns its own stub-replacing section files)

## Decisions you need
P2 (tokens), P4 (layout), P7 (logos, avatar), P9 (confidentiality), P10 (experience), P13 (contact) — run `cd docs/plans/01-portfolio && grep -E '^\| (P2|P4|P7|P9|P10|P13) ' 00-README.md`.

## Read first
- `docs/plans/01-portfolio/design/reference.html`: CSS lines 33–77 (side/nav/stat/item/date styles) and 78–150 (avatar, availability, logos, company strip, now pills), markup lines 209–234 (side, About, Experience) and 289–296 (Contact).
- `src/data/profile.js`, `experience.js`, `companyProjects.js` (written by slice 02; export names are in `02-content-data.md`).
- `src/components/common/{SectionHeading,ChipList,Icon,Placeholder}.jsx`, `src/assets/logos/index.js` (slice 01).

## Scope (files you own)
`src/sections/AboutSection.jsx`, `ExperienceSection.jsx`, `ContactSection.jsx`; `src/components/side/**`; `src/components/about/**`; `src/components/experience/**`; `src/components/contact/**`; each folder's own `.css` files; tests beside the components.

## Tasks
1. **Side column** (`src/components/side/`, overwrite the stub). `SideColumn.jsx` takes props `{ activeId = null, onSearch, onCopyEmail, clock = '' }` and composes: `Avatar.jsx` (88px gradient ring with "DT" and a small "photo soon" caption in DEV only; if `src/assets/photo.jpg` exists later it will swap in, so accept an optional `photo` prop), `AvailabilityBadge.jsx` (green dot + `profile.availability`), the `h1` "Dheeraj" + gradient "T.P", `h2` title, tagline paragraph (max 30ch), `SideNav.jsx` (8 links `#about #experience #cases #projects #lead #workflow #recognition #contact`; label text from reference; link gets class `on` when its id equals `activeId`; hidden below 860px), `SideActions.jsx` ("Download resume" as `<a href={profile.resume} download>`; "Search" button with `<kbd>Ctrl K</kbd>` that calls `onSearch`), `SideLinks.jsx` (GitHub, LinkedIn as external links `rel="noopener noreferrer"`, an email `<button>` calling `onCopyEmail`, and the `clock` string). Column is `position: sticky; top: 24px` above 860px.
2. **About** (`AboutSection.jsx` + `src/components/about/`): `SectionHeading`, the three paragraphs from `profile.about`, `CompanyStrip.jsx` (two logo chips with name, role, period, logos from `logoImages`, `alt="<name> logo"`), `NowList.jsx` (pills), `StatList.jsx` (value in secondary colour + label). No repo count (P9).
3. **Experience** (`ExperienceSection.jsx` + `src/components/experience/`): `RoleItem.jsx` (date column, logo tile 44px, title, location, summary, `ChipList`) for each of `experience`; a second heading "Company projects" and `CompanyProjectItem.jsx` for each of `companyProjects` (label column, title, summary, chips). Items lift on hover (`translateY` none; background `--g50`, title turns primary), disabled under reduced motion. Flight Booking shows no link.
4. **Contact** (`ContactSection.jsx` + `src/components/contact/ContactLinks.jsx`): intro line "Open to new roles and projects. The quickest way to reach me is email.", a `Copy dheerajtp6338@gmail.com` button (prop `onCopy`, default no-op) plus a `mailto:` link, then phone, GitHub and LinkedIn links, and the footer `© 2026 Dheeraj T.P · Calicut, Kerala`. No form (P13).
5. **Responsive and a11y.** Single `h1` on the page (side column). Landmarks: `aside` for side, `nav aria-label="Sections"`. All interactive items keyboard reachable, visible focus. Under 860px items stack to one column.
6. **Tests.** `SideNav.test.jsx` (active class follows `activeId`), `SideColumn.test.jsx` (resume link href and `download` attribute, search and copy callbacks fire), `StatList.test.jsx` (renders exactly the three stats, no "repos" text), `RoleItem.test.jsx` (logo alt text present).

## Done when
- The four sections render real data in light and dark, side column is sticky on desktop and stacks at ≤860px, no horizontal scroll at 360px.
- Tests above pass; `npm run lint`, `npm test`, `npm run build` pass. Existing slice 01 tests stay green.
- Experience shows both logos and no Flight Booking link. Append `## Result`.

## Result
- Wrote `src/components/side/{Avatar,AvailabilityBadge,SideNav,SideActions,SideLinks,SideColumn}.jsx` + `side.css`; `about/{CompanyStrip,NowList,StatList}.jsx` + `about.css`; `experience/{RoleItem,CompanyProjectItem}.jsx` + `experience.css`; `contact/ContactLinks.jsx` + `contact.css`; replaced `AboutSection`, `ExperienceSection`, `ContactSection`. Tests: SideNav, SideColumn, StatList, RoleItem.
- `npm run lint`, `npm test` (11 files, 22 tests), `npm run build`: PASS. Visual check in a browser not done.
- `SideColumn` is still rendered by App without props (App wiring of activeId/search/copy/clock is for a later slice); `ContactSection` takes `onCopy`.
- Shared classes `.lg`, `.item`, `.date`, `.jh` live in about.css / experience.css (loaded globally via section imports).
