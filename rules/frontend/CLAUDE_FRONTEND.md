# React Frontend Engineering Rules

These rules apply to this React portfolio (frontend only, no backend).

## JavaScript Only — NON-NEGOTIABLE

All frontend code is plain JavaScript (`.jsx` / `.js`). Do not use TypeScript: no `.ts` / `.tsx` files, `tsconfig.json`, `typescript` or `@types/*` packages, type annotations, interfaces, or generics. This applies even when a skill, template, or library example uses TypeScript.

If a language choice is ever unclear, ask before scaffolding.

## 1. Repository First

Before changing UI code, inspect the existing routing, page structure, components, hooks, state management, validation, styling, assets, and tests relevant to the request.

Never invent an existing component, hook, route, API, store, utility, design token, or behavior.

## 2. Minimal Correct Change

Implement the smallest change that satisfies the requirement. Do not perform unrelated refactors, redesigns, dependency replacements, or architecture migrations.

Reuse existing components, hooks, utilities, styles, data-access functions, notifications, loading states, and error handling whenever appropriate.

## 3. ONE JSX-RENDERING COMPONENT PER FILE — NON-NEGOTIABLE

A React file MUST NOT contain multiple independent JSX-rendering component/view functions.

Do not bypass this rule with functions such as `renderHeader()`, `renderTable()`, `renderForm()`, or similar helpers when those helpers return JSX and represent independent UI sections.

Use one primary React component/view per file. If a section becomes an independent component, place it in its own file.

Small non-JSX helpers are allowed.

## 4. Confirmation Modals

Use a React Portal for confirmation modals so they render outside the normal component stacking context.

A confirmation is required before:
- logout when the product flow requires confirmation
- delete
- bulk delete
- delete all
- remove all
- clear all
- other irreversible destructive actions

Reuse the existing confirmation/modal system when one exists.

## 5. State and Async Behavior

Handle loading, success, empty, error, retry, cancellation, and stale-response/race conditions where applicable.

Prevent duplicate submissions and accidental repeated destructive actions.

Clean up subscriptions, timers, event listeners, and realtime connections.

Do not leave state updates running after an operation has become irrelevant or a component has unmounted.

## 6. Forms and Validation

Validate user input before submission for good UX, but frontend validation is never a security boundary.

Display field-level and request-level errors using existing project patterns.

Preserve entered values when safe and useful after validation failures.

## 7. Accessibility

Use semantic HTML, keyboard-accessible interactions, labels, accessible names, focus management, and appropriate ARIA only when necessary.

Dialogs must manage focus correctly.

Do not rely on color alone to communicate state.

## 8. Security

Prevent XSS and unsafe HTML rendering. Sanitize or safely render any untrusted HTML.

Never put secrets, private keys, or tokens in frontend code.

Treat Vite/client environment variables as public.

## 9. Responsive UI

Inspect existing breakpoints and layout conventions. Preserve responsive behavior and test the requested flow at relevant viewport sizes.

Do not redesign the whole page for a focused change.

## 10. Performance

Avoid unnecessary rerenders, duplicate network requests, oversized dependencies, unbounded lists, and repeated expensive computations.

Use pagination, virtualization, memoization, lazy loading, or caching only when justified by the actual repository and workload.

## 11. Testing

For changed UI behavior, verify normal, loading, empty, error, success, navigation, validation, responsive behavior, and browser-console behavior as applicable.

Add or update automated tests when the repository has an established testing setup and the change warrants coverage.

## 12. Final Review

Before completion:
- inspect `git status`
- inspect the relevant diff
- remove debug code/logging
- verify no secrets were added
- verify no unrelated files changed
- verify no accidental redesign or dependency change was introduced
