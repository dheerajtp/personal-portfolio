import { afterEach, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Placeholder from '../components/common/Placeholder.jsx'

afterEach(() => vi.unstubAllEnvs())

it('renders in dev', () => {
  render(<Placeholder>todo</Placeholder>)
  expect(screen.getByText('todo')).toHaveClass('ph')
})

it('renders nothing when not dev', () => {
  vi.stubEnv('DEV', false)
  const { container } = render(<Placeholder>todo</Placeholder>)
  expect(container).toBeEmptyDOMElement()
})
