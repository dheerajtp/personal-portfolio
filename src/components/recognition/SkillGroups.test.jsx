import { expect, it } from 'vitest'
import { render } from '@testing-library/react'
import SkillGroups from './SkillGroups.jsx'
import { skills } from '../../data/skills.js'

it('renders four groups', () => {
  const { container } = render(<SkillGroups groups={skills} />)
  expect(container.querySelectorAll('.sk > div')).toHaveLength(4)
})
