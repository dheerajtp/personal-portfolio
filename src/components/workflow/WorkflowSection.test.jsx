import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import WorkflowSection from '../../sections/WorkflowSection.jsx'

it('renders six steps, highlights Code review, links to #cases', () => {
  const { container } = render(<WorkflowSection />)
  expect(container.querySelectorAll('.fs')).toHaveLength(6)
  expect(screen.getByText('Code review').closest('.fs')).toHaveClass('rv')
  expect(container.querySelectorAll('.rv')).toHaveLength(1)
  expect(screen.getByRole('link', { name: 'Agent Office' })).toHaveAttribute('href', '#cases')
})
