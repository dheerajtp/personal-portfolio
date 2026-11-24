import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import ProjectCard from './ProjectCard.jsx'

const base = { id: 'x', name: 'Demo', language: 'JavaScript', year: 2026, summary: 'S', stack: 'Stk', live: null, repo: null, image: null, tags: ['Web'] }

afterEach(cleanup)

describe('ProjectCard', () => {
  it('omits GitHub link and Live marker, shows placeholder', () => {
    render(<ProjectCard project={base} />)
    expect(screen.queryByText(/GitHub/)).toBeNull()
    expect(screen.queryByText('Live')).toBeNull()
    expect(screen.getByRole('img', { name: /Placeholder preview for Demo/ })).toBeInTheDocument()
  })

  it('shows links and toggles details', () => {
    render(<ProjectCard project={{ ...base, live: 'https://e.com', repo: 'demo' }} />)
    expect(screen.getByText('Live')).toBeInTheDocument()
    expect(screen.getByText('GitHub ↗')).toHaveAttribute('href', 'https://github.com/dheerajtp/demo')
    const t = screen.getByRole('button', { name: 'View details' })
    expect(screen.queryByText('Stk')).toBeNull()
    fireEvent.click(t)
    expect(t).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Stk')).toBeInTheDocument()
  })
})
