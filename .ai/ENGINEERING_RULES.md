# Engineering Rules

## 1. Repository Evidence First

Never claim a file, component, field, function, API response, or behavior exists unless it has been inspected.

If something cannot be verified, say:

`Not verified in the repository.`

Never hallucinate implementation details.

## 2. Minimal Correct Change

Prefer the smallest correct change.

Do not:
- Refactor unrelated code.
- Replace existing architecture unnecessarily.
- Introduce abstractions without need.
- Add dependencies without justification.
- Modify unrelated functionality.

## 3. Reuse Existing Architecture

Prefer existing:
- Components
- Hooks
- State management
- Validation
- Error handling
- Loading states
- Toasts
- Localization

Avoid duplicate business logic.

## 4. UI Safety

For UI changes:
- Inspect existing design patterns.
- Reuse existing components/styles.
- Match provided client screenshots when applicable.
- Preserve unrelated page functionality.
- Check responsive behavior.
- Preserve existing interactions.

Do not turn a focused request into a page-wide redesign.

## 5. Localization

When the project uses localization:
- Use translation keys.
- Do not hardcode user-facing strings unnecessarily.
- Add translations using the existing architecture.

## 6. Security

Never expose or log:
- Passwords
- Authentication tokens
- Payment credentials
- Bank details
- Private account information
- Other secrets

Do not commit secrets.

## 7. Testing

Validate both new behavior and existing behavior.

For UI, test:
- Normal flow
- Loading
- Error
- Success
- Existing navigation/interactions
- Responsive behavior
- Console errors

## 8. Final Diff Review

Before declaring implementation complete:

```text
git status
git diff
```

Confirm:
- Only relevant files changed.
- No debug code remains.
- No secrets were added.
- No unrelated refactor was introduced.
- No generated/temp files were accidentally committed.
