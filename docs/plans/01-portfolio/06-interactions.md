# 01/06 — Interactions: palette, toast, copy, scroll-spy, clock

Plan folder: [`00-README.md`](00-README.md) · Model: Sonnet · Prerequisites: 01/03, 01/04, 01/05 · Parallel with: none (makes small named edits to files owned by 01/03 and 01/01)

## Decisions you need
P3 (theme), P12 (interactions), P13 (contact), P15 (quality), P16 (tests) — run `cd docs/plans/01-portfolio && grep -E '^\| (P3|P12|P13|P15|P16) ' 00-README.md`.

## Read first
- `docs/plans/01-portfolio/design/reference.html`: CSS lines 148–200 (`#pal`, `kbd`, `#toast`), JS lines 398–420 (`CMD`, `drawPal`, `openPal`, `run`, key handling, `copy`, `toast`, IST clock `tick`, IntersectionObserver).
- `src/App.jsx`, `src/components/side/SideColumn.jsx` (props `activeId`, `onSearch`, `onCopyEmail`, `clock`), `src/components/contact/ContactLinks.jsx` (prop `onCopy`), `src/hooks/useTheme.js`, `src/data/profile.js`.

## Scope (files you own)
`src/components/palette/**`, `src/components/toast/**`, `src/hooks/useActiveSection.js`, `useCopyToClipboard.js`, `useIstClock.js`, `usePaletteCommands.js`, tests beside them. **Small named edits** (only these): in `src/App.jsx` wrap the tree in `ToastProvider`, mount `<CommandPalette/>`, pass `activeId`, `onSearch`, `onCopyEmail`, `clock` to `SideColumn`; in `src/sections/ContactSection.jsx` pass `onCopy` to `ContactLinks`. Touch nothing else in those files.

## Tasks
1. **Toast** (`src/components/toast/`): `ToastProvider.jsx` (context + one live region `role="status"`, message visible 1600ms, new message replaces old, timer cleared on unmount), `useToast.js` (`const toast = useToast(); toast('Email copied')`).
2. **`useCopyToClipboard.js`**: `copy(text)` tries `navigator.clipboard.writeText`; on rejection or missing API, falls back to a temporary `<textarea>` + `document.execCommand('copy')`; if that also fails, shows the address itself in the toast so the visitor can copy by hand. Returns a boolean. Toast "Email copied" on success.
3. **`useActiveSection.js`**: `IntersectionObserver` with `rootMargin: '-30% 0px -60% 0px'` over the eight section ids; returns the active id; disconnects on unmount; returns `null` when `IntersectionObserver` is missing.
4. **`useIstClock.js`**: returns `Calicut · HH:MM IST` using `Intl.DateTimeFormat('en-GB', { timeZone: profile.timezone, hour:'2-digit', minute:'2-digit' })`, updates every 30s, interval cleared on unmount.
5. **Palette** (`src/components/palette/`): `useCommandPalette.js` (open state, global `keydown` for Ctrl/Cmd+K with `preventDefault`, listener removed on unmount), `usePaletteCommands.js` (8 section commands that `scrollIntoView({ behavior })` where `behavior` is `'auto'` when `matchMedia('(prefers-reduced-motion: reduce)').matches`, else `'smooth'`; plus Copy email, Toggle light/dark theme via `useTheme().toggle`, Download resume via a temporary anchor click on `profile.resume`), `CommandPalette.jsx` (renders through `createPortal` into `document.body`; `role="dialog"`, `aria-modal="true"`, `aria-label="Search"`; autofocus input; filtered `ul` with `aria-activedescendant`; ArrowUp/Down, Enter runs, Esc closes; backdrop click closes; focus returns to the element that opened it; body scroll not locked), `CommandItem.jsx`.
6. **Wire-up** exactly as in Scope. Toggle-theme from the palette and the corner button stay in sync (same `useTheme` store).
7. **Tests.** `CommandPalette.test.jsx` (Ctrl+K opens, typing filters, Enter runs the command, Esc closes and focus returns, renders under `document.body` not inside the app root), `useCopyToClipboard.test.jsx` (clipboard success; clipboard rejects → fallback; both fail → toast shows the address), `useActiveSection.test.jsx` (mock `IntersectionObserver`), `ToastProvider.test.jsx` (message auto-hides, replaced by newer message), `useIstClock.test.jsx` (fake timers: updates, interval cleared).

## Done when
- Ctrl/Cmd+K and the Search button open the palette; every command works; Esc restores focus; nav highlight follows scroll; email copy toasts; clock ticks; with reduced motion on, section jumps do not animate.
- Tests pass; `npm run lint`, `npm test`, `npm run build` pass; slices 01–05 tests stay green. Append `## Result`.

## Result
Added toast (ToastContext.js, ToastProvider.jsx, useToast.js, toast.css), palette (CommandPalette, CommandItem, useCommandPalette, PageShell, palette.css), hooks useCopyToClipboard/useActiveSection/useIstClock/usePaletteCommands, 5 test files. App.jsx now = ToastProvider > PageShell (PageShell holds the hooks and the page tree, because App cannot call useToast inside its own provider; it lives in src/components/palette/PageShell.jsx). ContactSection NOT edited: its CTA button already uses `onCopy`; ContactLinks has no onCopy prop. PageShell passes `onCopy` to ContactSection.
Checks: npm run lint PASS; npm test PASS (20 files, 42 tests); npm run build PASS.
Not checked in a real browser (reduced-motion, scroll-spy visually).
