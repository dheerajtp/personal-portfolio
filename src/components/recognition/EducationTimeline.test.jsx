import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import EducationTimeline from './EducationTimeline.jsx'
import { education } from '../../data/education.js'

it('renders two items, newest first', () => {
  const { container } = render(<EducationTimeline items={education} />)
  const years = [...container.querySelectorAll('.y')].map((n) => n.textContent)
  expect(years).toHaveLength(2)
  expect(years[0]).toContain('2017')
  expect(years[1]).toContain('2014')
})
