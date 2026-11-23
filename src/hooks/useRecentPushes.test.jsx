import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useRecentPushes from './useRecentPushes.js'
import { projects } from '../data/projects.js'

const repos = projects.filter((p) => p.repo)
const ok = (pushed_at) => ({ ok: true, json: async () => ({ pushed_at }) })

beforeEach(() => {
  sessionStorage.clear()
  vi.restoreAllMocks()
})

describe('useRecentPushes', () => {
  it('sorts descending and caps at 4', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url) => ok(`2026-01-0${repos.findIndex((p) => url.endsWith(`/${p.repo}`)) + 1}T00:00:00Z`)))
    const { result } = renderHook(() => useRecentPushes())
    await waitFor(() => expect(result.current).toHaveLength(4))
    const dates = result.current.map((r) => r.pushedAt)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('drops only the failing repo', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url) => (url.endsWith(`/${repos[0].repo}`) ? { ok: false } : ok('2026-02-01T00:00:00Z'))))
    const { result } = renderHook(() => useRecentPushes())
    await waitFor(() => expect(result.current.length).toBeGreaterThan(0))
    expect(result.current.map((r) => r.name)).not.toContain(repos[0].name)
  })

  it('returns [] when all fail', async () => {
    const f = vi.fn(async () => {
      throw new Error('x')
    })
    vi.stubGlobal('fetch', f)
    const { result } = renderHook(() => useRecentPushes())
    await waitFor(() => expect(f).toHaveBeenCalledTimes(repos.length))
    expect(result.current).toEqual([])
  })

  it('uses the cache without requests', () => {
    sessionStorage.setItem('recent-pushes', JSON.stringify({ t: Date.now(), data: [{ name: 'A', pushedAt: '2026-01-01T00:00:00Z' }] }))
    const f = vi.fn()
    vi.stubGlobal('fetch', f)
    const { result } = renderHook(() => useRecentPushes())
    expect(result.current).toHaveLength(1)
    expect(f).not.toHaveBeenCalled()
  })

  it('aborts on unmount', () => {
    let signal
    vi.stubGlobal('fetch', vi.fn((url, opts) => {
      signal = opts.signal
      return new Promise(() => {})
    }))
    const { unmount } = renderHook(() => useRecentPushes())
    unmount()
    expect(signal.aborted).toBe(true)
  })
})
