# Personal Portfolio

React-only, frontend-only personal portfolio website (plain JavaScript, no TypeScript, no backend).

## Required Reading

Before project work, read:

1. `.ai/README.md`
2. `.ai/PROJECT_CONTEXT.md`
3. `.ai/ENGINEERING_RULES.md`
4. `.ai/WORKFLOW.md`
5. `.ai/DECISIONS.md`
6. `rules/frontend/CLAUDE_FRONTEND.md`

## Rule Precedence

1. Actual repository behavior
2. Explicit user requirements
3. `.ai/` rules and workflow
4. `rules/frontend/CLAUDE_FRONTEND.md`
5. General conventions

## Operating Behavior

- Inspect the repository before proposing changes; never invent files, components, or behavior.
- Reuse existing code; prefer the smallest correct change.
- Do not add a backend or database unless the user explicitly asks.
- Never expose secrets.
- Follow the approval gate in `.ai/WORKFLOW.md`: no changes before explicit approval; after approval, implement only the approved scope, verify, and review the diff.
