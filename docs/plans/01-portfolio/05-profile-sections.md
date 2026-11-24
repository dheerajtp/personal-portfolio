# 01/05 — Profile sections: Leadership, AI workflow, Recognition

Plan folder: [`00-README.md`](00-README.md) · Model: Sonnet · Prerequisites: 01/01, 01/02 · Parallel with: 01/03, 01/04 (disjoint folders)

## Decisions you need
P2 (tokens), P4 (layout), P9 (confidentiality), P15 (quality) — run `cd docs/plans/01-portfolio && grep -E '^\| (P2|P4|P9|P15) ' 00-README.md`.

## Read first
- `docs/plans/01-portfolio/design/reference.html`: CSS lines 111–141 (workflow flow, awards, education, skills) and 148–200 (`lead4`, `note2`); markup lines 246–288.
- `src/data/leadership.js`, `workflow.js`, `awards.js`, `education.js`, `skills.js` (slice 02).
- `src/components/common/{SectionHeading,ChipList,Icon}.jsx` (slice 01).

## Scope (files you own)
`src/sections/LeadershipSection.jsx`, `WorkflowSection.jsx`, `RecognitionSection.jsx`; `src/components/leadership/**`, `src/components/workflow/**`, `src/components/recognition/**`; their `.css` and tests.

## Tasks
1. **Leadership** (`LeadershipSection.jsx`, `LeadershipCard.jsx`): heading "How I lead", intro paragraph, four cards (icon from `Icon`, title, text), and the confidentiality note as a left-bordered paragraph (`note2`). Cards use `repeat(auto-fit, minmax(210px, 1fr))`.
2. **AI workflow** (`WorkflowSection.jsx`, `WorkflowStep.jsx`): heading "AI-assisted workflow", intro (it links to the Agent Office case study with an in-page anchor `#cases`), six steps as a vertical timeline with a connector line (gradient primary → g200). The step with `highlight: true` (Code review) has the filled gradient icon tile and a bordered `--g50` panel. Tags render as small outlined pills. Connector line must not overlap the highlighted panel (see reference `.fs.rv`).
3. **Recognition** (`RecognitionSection.jsx`): three sub-blocks under headings "Recognition", "Education", "Skills". `AwardCard.jsx` (icon in secondary colour, title, uppercase period, soft circle decoration, hover lift disabled under reduced motion). `EducationTimeline.jsx` + `EducationItem.jsx` (years column right-aligned with duration caption, dot with ring, vertical rule, degree, institution). `SkillGroups.jsx` + `SkillGroup.jsx` (four bordered groups with `ChipList`).
4. **Responsive.** Education years column narrows to 70px under 860px. Nothing overflows at 360px.
5. **Tests.** `WorkflowStep.test.jsx` (highlight class only when `highlight`), `WorkflowSection.test.jsx` (six steps, the Code review step is highlighted, intro anchor points to `#cases`), `EducationTimeline.test.jsx` (two items in order, newest first), `SkillGroups.test.jsx` (four groups).

## Done when
- Leadership shows four cards with the note; Workflow shows six steps with Code review highlighted; Recognition shows three awards, a two-item education timeline and four skill groups, in light and dark.
- No project counts or client names appear in the rendered text (P9).
- Tests pass; `npm run lint`, `npm test`, `npm run build` pass; slice 01 tests stay green. Append `## Result`.

## Result
Added Leadership, Workflow and Recognition sections plus components (`src/components/{leadership,workflow,recognition}/**` with per-area CSS) and 4 tests. LeadershipSection overrides data icons by title (listCheck/list/down/message) to match the reference. Workflow intro link is made by splitting the intro on "Agent Office". Education/Skills sub-headings are extra `h2.eyebrow.rec-sub`. `npm run lint`, `npm test` (7 files, 18 tests), `npm run build`: all pass. Not checked in a browser (light/dark, 360px).
