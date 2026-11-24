import { useEffect, useState } from 'react'
import { projects } from '../data/projects.js'

const KEY = 'recent-pushes'
const TTL = 10 * 60 * 1000

function readCache() {
  try {
    const c = JSON.parse(sessionStorage.getItem(KEY))
    if (c && Date.now() - c.t < TTL && Array.isArray(c.data)) return c.data
  } catch {
    // storage unavailable or corrupt: fall through to network
  }
  return null
}

function writeCache(data) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), data }))
  } catch {
    // ignore
  }
}

async function pushedAt(project, signal) {
  try {
    const res = await fetch(`https://api.github.com/repos/dheerajtp/${project.repo}`, { signal })
    if (!res.ok) return null
    const json = await res.json()
    return json.pushed_at ? { name: project.name, pushedAt: json.pushed_at } : null
  } catch {
    return null
  }
}

export default function useRecentPushes() {
  const [pushes, setPushes] = useState(() => readCache() ?? [])

  useEffect(() => {
    if (readCache()) return undefined
    const ctrl = new AbortController()
    Promise.all(projects.filter((p) => p.repo).map((p) => pushedAt(p, ctrl.signal))).then((rows) => {
      if (ctrl.signal.aborted) return
      const data = rows
        .filter(Boolean)
        .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
        .slice(0, 4)
      if (!data.length) return
      writeCache(data)
      setPushes(data)
    })
    return () => ctrl.abort()
  }, [])

  return pushes
}
