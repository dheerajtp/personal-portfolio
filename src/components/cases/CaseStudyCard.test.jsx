import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import CaseStudyCard from './CaseStudyCard.jsx'

const study = { id: 'a', tag: 'T', title: 'Title', summary: 'Sum', image: 'fairobuy', context: 'Ctx', role: 'Rl', stack: 'Stk', did: ['One'] }

afterEach(cleanup)

describe('CaseStudyCard', () => {
  it('expands and collapses, omitting empty blocks', () => {
    render(<CaseStudyCard study={study} />)
    const b = screen.getByRole('button', { name: 'Read case study' })
    expect(b).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Ctx')).toBeNull()
    fireEvent.click(b)
    expect(screen.getByRole('button', { name: 'Hide case study' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Ctx')).toBeInTheDocument()
    expect(screen.queryByText('Challenges')).toBeNull()
    expect(screen.queryByText('Outcome')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Hide case study' }))
    expect(screen.queryByText('Ctx')).toBeNull()
  })

  it('shows Live product link only with link', () => {
    const { rerender } = render(<CaseStudyCard study={study} />)
    expect(screen.queryByText('Live product ↗')).toBeNull()
    rerender(<CaseStudyCard study={{ ...study, link: 'https://x.com/' }} />)
    expect(screen.getByText('Live product ↗')).toHaveAttribute('href', 'https://x.com/')
  })
})
