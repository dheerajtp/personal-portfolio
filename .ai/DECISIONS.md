# Architecture & Engineering Decisions

Record durable decisions. Format: `## YYYY-MM-DD — Title` with Decision / Reason / Impact.

---

## 2026-11-23 — React only

### Decision
Portfolio is a frontend-only React app in plain JavaScript. No backend, database, or Supabase.

### Reason
Personal portfolio needs no server.

### Impact
Do not add backend/DB code or rules unless the user explicitly asks.

---

## 2026-11-24 — Stack and dependencies

### Decision
React 19 + Vite, plain JavaScript, plain CSS, no router, no UI kit or animation/icon library. Allowed dependencies are a fixed short list (React, Vite, Inter font, ESLint plugins, Vitest and Testing Library).

### Reason
A static single-page site needs nothing more.

### Impact
Any other dependency needs user approval. ESLint enforces one JSX component per file.

## 2026-11-24 — Featured projects are one explicit list

### Decision
`src/data/projects.js` is the only source of featured projects; file order is display order and the first entry is the wide card. No in-site picker.

### Reason
Keeps the site static and content curated.

### Impact
Add or remove projects by editing that file. GitHub is only queried for repos in that list.

## 2026-11-24 — Confidentiality

### Decision
No project counts, client names or client logos on the site. The featured list is an allow-list; code never enumerates GitHub repos beyond it.

### Reason
Client and employer confidentiality.

### Impact
Review new content against this before adding it.
