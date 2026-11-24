import { profile } from '../data/profile.js'
import { useTheme } from './useTheme.js'

const SECTIONS = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['cases', 'Case studies'],
  ['projects', 'Projects'],
  ['lead', 'Leadership'],
  ['workflow', 'AI workflow'],
  ['recognition', 'Recognition'],
  ['contact', 'Contact'],
]

export function usePaletteCommands(copyEmail) {
  const { toggle } = useTheme()
  return [
    ...SECTIONS.map(([id, label]) => ({
      id,
      label,
      hint: 'Go to',
      run: () => {
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      },
    })),
    { id: 'copy', label: 'Copy email', hint: 'Action', run: copyEmail },
    { id: 'theme', label: 'Toggle light/dark theme', hint: 'Action', run: toggle },
    {
      id: 'resume',
      label: 'Download resume',
      hint: 'Action',
      run: () => {
        const a = document.createElement('a')
        a.href = profile.resume
        a.download = ''
        a.click()
      },
    },
  ]
}
