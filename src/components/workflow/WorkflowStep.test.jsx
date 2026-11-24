import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import WorkflowStep from './WorkflowStep.jsx'

const base = { icon: 'doc', title: 'T', text: 'x', tags: ['a'] }

it('adds rv class only when highlighted', () => {
  const { container, rerender } = render(<WorkflowStep {...base} highlight={false} />)
  expect(container.firstChild).not.toHaveClass('rv')
  rerender(<WorkflowStep {...base} highlight />)
  expect(container.firstChild).toHaveClass('rv')
})
