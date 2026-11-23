import { useEffect, useState } from 'react'

export const SECTION_IDS = ['about', 'experience', 'cases', 'projects', 'lead', 'workflow', 'recognition', 'contact']

export function useActiveSection(ids = SECTION_IDS) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}
