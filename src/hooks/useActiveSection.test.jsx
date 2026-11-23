import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, renderHook } from '@testing-library/react'
import { useActiveSection } from './useActiveSection.js'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
})

describe('useActiveSection', () => {
  it('tracks the intersecting section and disconnects', () => {
    document.body.innerHTML = '<section id="about"></section><section id="contact"></section>'
    let cb
    const disconnect = vi.fn()
    const opts = vi.fn()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(c, o) {
          cb = c
          opts(o)
        }
        observe() {}
        disconnect = disconnect
      },
    )
    const { result, unmount } = renderHook(() => useActiveSection())
    expect(result.current).toBeNull()
    expect(opts).toHaveBeenCalledWith({ rootMargin: '-30% 0px -60% 0px' })
    act(() => cb([{ isIntersecting: true, target: document.getElementById('contact') }]))
    expect(result.current).toBe('contact')
    unmount()
    expect(disconnect).toHaveBeenCalled()
  })

  it('returns null without IntersectionObserver', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const { result } = renderHook(() => useActiveSection())
    expect(result.current).toBeNull()
  })
})
