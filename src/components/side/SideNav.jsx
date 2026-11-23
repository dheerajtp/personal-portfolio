const links = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['cases', 'Case studies'],
  ['projects', 'Projects'],
  ['lead', 'Leadership'],
  ['workflow', 'AI workflow'],
  ['recognition', 'Recognition'],
  ['contact', 'Contact'],
]

export default function SideNav({ activeId = null }) {
  return (
    <nav className="nav" aria-label="Sections">
      {links.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={id === activeId ? 'on' : undefined}>
          {label}
        </a>
      ))}
    </nav>
  )
}
