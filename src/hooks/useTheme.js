import { useSyncExternalStore } from 'react'

const KEY = 'theme'
const root = () => document.documentElement
const query = () => window.matchMedia?.('(prefers-color-scheme: dark)')

export function initTheme() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') root().setAttribute('data-theme', saved)
  } catch {
    // storage unavailable: fall back to system theme
  }
}

function getTheme() {
  const attr = root().getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  return query()?.matches ? 'dark' : 'light'
}

function subscribe(cb) {
  const observer = new MutationObserver(cb)
  observer.observe(root(), { attributes: true, attributeFilter: ['data-theme'] })
  const mq = query()
  mq?.addEventListener('change', cb)
  return () => {
    observer.disconnect()
    mq?.removeEventListener('change', cb)
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme)
  const toggle = () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark'
    root().setAttribute('data-theme', next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // not persisted
    }
  }
  return { theme, toggle }
}
