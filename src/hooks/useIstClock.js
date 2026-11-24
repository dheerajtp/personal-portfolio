import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'

const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit' })
const now = () => `Calicut · ${fmt.format(new Date())} IST`

export function useIstClock() {
  const [clock, setClock] = useState(now)
  useEffect(() => {
    const id = setInterval(() => setClock(now()), 30000)
    return () => clearInterval(id)
  }, [])
  return clock
}
