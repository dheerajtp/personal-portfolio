import { useCallback } from 'react'
import { useToast } from '../components/toast/useToast.js'

function legacyCopy(text) {
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style.position = 'fixed'
  el.style.opacity = '0'
  document.body.appendChild(el)
  el.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    el.remove()
  }
}

export function useCopyToClipboard() {
  const toast = useToast()
  return useCallback(
    async (text) => {
      let ok = false
      try {
        await navigator.clipboard.writeText(text)
        ok = true
      } catch {
        ok = legacyCopy(text)
      }
      toast(ok ? 'Email copied' : text)
      return ok
    },
    [toast],
  )
}
