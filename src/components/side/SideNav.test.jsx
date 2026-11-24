import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import SideNav from './SideNav.jsx'

it('marks only the active link', () => {
  render(<SideNav activeId="projects" />)
  expect(screen.getAllByRole('link')).toHaveLength(8)
  expect(screen.getByRole('link', { name: 'Projects' })).toHaveClass('on')
  expect(screen.getByRole('link', { name: 'About' })).not.toHaveClass('on')
})
