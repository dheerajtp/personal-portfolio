import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import CommandPalette from './CommandPalette.jsx'
import { useCommandPalette } from './useCommandPalette.js'

const run = vi.fn()
const commands = [
  { id: 'a', label: 'About', hint: 'Go to', run: vi.fn() },
  { id: 'b', label: 'Copy email', hint: 'Action', run },
]

function Harness() {
  const p = useCommandPalette()
  return (
    <div data-testid="root">
      <button onClick={p.show}>Search</button>
      <CommandPalette open={p.open} onClose={p.hide} commands={commands} />
    </div>
  )
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('CommandPalette', () => {
  it('opens on Ctrl+K in a portal, filters, runs on Enter', () => {
    render(<Harness />)
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })
    const dialog = screen.getByRole('dialog', { name: 'Search' })
    expect(screen.getByTestId('root')).not.toContainElement(dialog)
    expect(document.body).toContainElement(dialog)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'copy' } })
    expect(screen.queryByText('About')).toBeNull()
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(run).toHaveBeenCalledOnce()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('Esc closes and focus returns to the opener', () => {
    render(<Harness />)
    const btn = screen.getByText('Search')
    btn.focus()
    fireEvent.click(btn)
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(btn).toHaveFocus()
  })
})
