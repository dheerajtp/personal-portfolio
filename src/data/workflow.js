export const workflow = {
  intro: 'Claude Code and agent skills are part of how I plan, build and review. Every change moves through the same six steps, and nothing ships without review. I even built a tool to watch my agents work: Agent Office, in the case studies above.',
  steps: [
    {
      icon: 'doc',
      title: 'Understand',
      text: 'Turn the requirement into a written spec with acceptance checks.',
      tags: ['Spec', 'Acceptance criteria'],
      highlight: false,
    },
    {
      icon: 'search',
      title: 'Investigate',
      text: 'Read the real repository first and reuse what already exists.',
      tags: ['Repo survey', 'Reuse over rewrite'],
      highlight: false,
    },
    {
      icon: 'check',
      title: 'Approve',
      text: 'Agree the scope before any file changes. The plan is the contract.',
      tags: ['Approval gate'],
      highlight: false,
    },
    {
      icon: 'code',
      title: 'Build',
      text: 'Implement only the approved scope, in small slices that can run in parallel.',
      tags: ['Claude Code', 'Agent skills', 'Small slices'],
      highlight: false,
    },
    {
      icon: 'shield',
      title: 'Code review',
      text: 'AI reviews the diff for bugs, security issues and standards before I do. Then I read every change myself, and nothing merges until both passes are clean.',
      tags: ['AI diff review', 'Security check', 'Standards check', 'Human review'],
      highlight: true,
    },
    {
      icon: 'circleCheck',
      title: 'Verify',
      text: 'Run tests, lint and a real browser check, then ship.',
      tags: ['Tests', 'Lint', 'Browser check'],
      highlight: false,
    },
  ],
};
