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
