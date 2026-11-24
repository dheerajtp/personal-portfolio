import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatList from './StatList.jsx'

it('renders exactly three stats and no repo count', () => {
  const { container } = render(<StatList />)
  expect(container.querySelectorAll('dd')).toHaveLength(3)
  expect(screen.queryByText(/repos/i)).toBeNull()
})
