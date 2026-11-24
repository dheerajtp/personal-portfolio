import { useState } from 'react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import ActivityStrip from '../components/projects/ActivityStrip.jsx'
import LanguageFilter from '../components/projects/LanguageFilter.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import { projects } from '../data/projects.js'

const languages = [...new Set(projects.map((p) => p.language))]

export default function ProjectsSection() {
  const [lang, setLang] = useState('All')
  const visible = projects.filter((p) => lang === 'All' || p.language === lang)
  return (
    <section id="projects" aria-labelledby="projects-h">
      <SectionHeading id="projects-h">
        Projects <span className="n">({visible.length})</span>
      </SectionHeading>
      <ActivityStrip />
      <LanguageFilter languages={languages} value={lang} onChange={setLang} />
      <div className="grid2">
        {visible.map((p, i) => (
          <ProjectCard key={p.id} project={p} featured={i === 0 && visible.length > 1} />
        ))}
      </div>
    </section>
  )
}
