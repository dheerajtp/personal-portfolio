import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, renderHook } from '@testing-library/react'
import { useIstClock } from './useIstClock.js'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('useIstClock', () => {
  it('updates every 30s and clears the interval', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T06:30:00Z'))
    const { result, unmount } = renderHook(() => useIstClock())
    expect(result.current).toBe('Calicut · 12:00 IST')
    act(() => vi.advanceTimersByTime(30000 * 2))
    expect(result.current).toBe('Calicut · 12:01 IST')
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
