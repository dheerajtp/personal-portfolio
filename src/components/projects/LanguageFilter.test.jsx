import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LanguageFilter from './LanguageFilter.jsx'

afterEach(cleanup)

describe('LanguageFilter', () => {
  it('shows All plus languages and reports clicks', () => {
    const onChange = vi.fn()
    render(<LanguageFilter languages={['A', 'B']} value="All" onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'B' }))
    expect(onChange).toHaveBeenCalledWith('B')
  })

  it('hides with one language', () => {
    const { container } = render(<LanguageFilter languages={['A']} value="All" onChange={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })
})
