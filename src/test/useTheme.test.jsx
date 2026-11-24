import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { initTheme, useTheme } from '../hooks/useTheme.js'

function Probe({ id }) {
  const { theme, toggle } = useTheme()
  return (
    <button data-testid={id} onClick={toggle}>
      {theme}
    </button>
  )
}

function mockSystem(dark) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: dark,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  mockSystem(false)
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('useTheme', () => {
  it('defaults to the system theme', () => {
    mockSystem(true)
    render(<Probe id="a" />)
    expect(screen.getByTestId('a')).toHaveTextContent('dark')
  })

  it('toggle flips the attribute and persists', async () => {
    render(<Probe id="a" />)
    await act(async () => screen.getByTestId('a').click())
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(screen.getByTestId('a')).toHaveTextContent('dark')
  })

  it('initTheme applies the saved theme', () => {
    localStorage.setItem('theme', 'dark')
    initTheme()
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('keeps two consumers in sync', async () => {
    render(
      <>
        <Probe id="a" />
        <Probe id="b" />
      </>,
    )
    await act(async () => screen.getByTestId('a').click())
    expect(screen.getByTestId('b')).toHaveTextContent('dark')
  })

  it('does not throw when storage fails', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('denied')
    })
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied')
    })
    expect(() => initTheme()).not.toThrow()
    render(<Probe id="a" />)
    await act(async () => screen.getByTestId('a').click())
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })
})
