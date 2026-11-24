import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import ToastProvider from './ToastProvider.jsx'
import { useToast } from './useToast.js'

function Fire() {
  const toast = useToast()
  return (
    <>
      <button onClick={() => toast('one')}>1</button>
      <button onClick={() => toast('two')}>2</button>
    </>
  )
}

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('ToastProvider', () => {
  it('auto-hides and is replaced by a newer message', () => {
    vi.useFakeTimers()
    render(
      <ToastProvider>
        <Fire />
      </ToastProvider>,
    )
    const status = screen.getByRole('status')
    act(() => screen.getByText('1').click())
    expect(status).toHaveTextContent('one')
    act(() => vi.advanceTimersByTime(1000))
    act(() => screen.getByText('2').click())
    expect(status).toHaveTextContent('two')
    act(() => vi.advanceTimersByTime(1000))
    expect(status).toHaveTextContent('two')
    act(() => vi.advanceTimersByTime(700))
    expect(status).toBeEmptyDOMElement()
  })
})
