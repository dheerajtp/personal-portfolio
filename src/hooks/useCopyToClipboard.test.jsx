import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, renderHook, act } from '@testing-library/react'
import ToastProvider from '../components/toast/ToastProvider.jsx'
import { useCopyToClipboard } from './useCopyToClipboard.js'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

async function copyWith(writeText, exec) {
  Object.assign(navigator, { clipboard: { writeText } })
  document.execCommand = exec
  const { result } = renderHook(() => useCopyToClipboard(), { wrapper: ToastProvider })
  let ok
  await act(async () => {
    ok = await result.current('a@b.c')
  })
  return ok
}

describe('useCopyToClipboard', () => {
  it('uses the clipboard API', async () => {
    const exec = vi.fn()
    expect(await copyWith(vi.fn().mockResolvedValue(), exec)).toBe(true)
    expect(exec).not.toHaveBeenCalled()
    expect(document.querySelector('[role=status]')).toHaveTextContent('Email copied')
  })
  it('falls back to execCommand when the clipboard rejects', async () => {
    const exec = vi.fn().mockReturnValue(true)
    expect(await copyWith(vi.fn().mockRejectedValue(new Error('x')), exec)).toBe(true)
    expect(exec).toHaveBeenCalledWith('copy')
  })
  it('shows the address when both fail', async () => {
    expect(await copyWith(vi.fn().mockRejectedValue(new Error('x')), vi.fn().mockReturnValue(false))).toBe(false)
    expect(document.querySelector('[role=status]')).toHaveTextContent('a@b.c')
  })
})
