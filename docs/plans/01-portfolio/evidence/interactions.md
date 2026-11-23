# Interaction checks

Run 2026-11-24 against `npm run preview` (http://localhost:4173/), production build.
Driven by headless Chrome over the DevTools protocol (key presses sent with
`Input.dispatchKeyEvent`, so the page receives real keydown/keyup events), viewport 1440×900.

| Check | Result | Evidence |
| --- | --- | --- |
| Ctrl+K opens palette (portal, focus on combobox) | PASS | `{"dialog":true,"inBody":true,"focus":"combobox"}` (dialog is outside `#root`) |
| Esc closes palette and restores focus | PASS | `{"dialog":false,"focus":"Search Ctrl K"}`; focus before open: `"Search Ctrl K"` |
| Cmd (Meta)+K opens palette | PASS | `true` |
| Nav highlight follows scroll | PASS (see note) | `about->#about, experience->#experience, cases->#cases, projects->#projects, lead->#lead, workflow->#workflow, recognition->#recognition, contact->#recognition` |
| Five case studies expand and collapse | PASS | 5 toggles, each `aria-expanded false/true`, body visible, then `false` again |
| Copy email shows a toast | PASS | `role=status` text `"Email copied"` |
| Resume link downloads the PDF | PASS | `<a href="/Dheeraj-TP-Resume.pdf" download>Download resume</a>`; `curl -sI http://localhost:4173/Dheeraj-TP-Resume.pdf` → `HTTP/1.1 200 OK`, `Content-Type: application/pdf`, `Content-Length: 114851` |
| Reduced motion disables smooth scroll | PASS | palette "Experience" command calls `scrollIntoView({behavior:"auto"})` under `prefers-reduced-motion: reduce`, `{behavior:"smooth"}` without it; CSS forces `transition:none` and `scroll-behavior:auto` under reduce |
| No horizontal scroll at 360 / 390 / 1440 | PASS | `scrollWidth == clientWidth` at 360 (360), 390 (390), 1440 (1440) |
| No console errors | PASS | Lighthouse Best Practices 100 (`errors-in-console` passes), see `lighthouse.txt` |

Note on the nav highlight: at 1440×900 the Contact section is the last, short
section, so it never reaches the scroll-spy band (30–40% from the top) and the
highlight stays on Recognition at the bottom of the page. Known issue, not fixed
here (it needs a change to `useActiveSection.js` or the page layout).

## MANUAL (cannot be proven headless)

1. Physical keyboard, Chrome, Firefox and Safari on macOS: open the site, press
   Cmd+K (Ctrl+K on Windows/Linux). The palette opens with the cursor in the input.
   Press Tab repeatedly: focus stays inside the palette. Press Esc: palette closes
   and focus is back on the element that had it.
2. Tab from the top of the page: every link and button shows a visible focus ring.
3. Click "Download resume" in Chrome, Firefox and Safari: a file named
   `Dheeraj-TP-Resume.pdf` is saved (not opened in a tab).
4. Click the email in the side column: the toast appears and the clipboard holds
   the email address (paste it somewhere).
5. On a real phone (iOS Safari, Android Chrome): scroll the full page sideways;
   nothing moves horizontally.
6. macOS System Settings → Accessibility → Display → Reduce motion on: use the
   palette to jump to a section; the page jumps instead of scrolling smoothly.
