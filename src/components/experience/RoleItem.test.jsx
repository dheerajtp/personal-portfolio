import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import RoleItem from './RoleItem.jsx'
import { experience } from '../../data/experience.js'

it('shows the company logo with alt text', () => {
  render(<RoleItem role={experience[0]} />)
  expect(screen.getByAltText(`${experience[0].company} logo`)).toBeInTheDocument()
})
