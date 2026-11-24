import { useState } from 'react'
import ChipList from '../common/ChipList.jsx'
import Placeholder from '../common/Placeholder.jsx'
import ProjectMedia from './ProjectMedia.jsx'
import './projects.css'

export default function ProjectCard({ project, featured }) {
  const [open, setOpen] = useState(false)
  const detId = `${project.id}-det`
  return (
    <article className={`proj${featured ? ' feat' : ''}`}>
      <ProjectMedia project={project} />
      <div className="pb">
        <div className="meta">
          {project.year && (
            <>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span>{project.language}</span>
          {project.live && <span className="live">Live</span>}
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <ChipList items={[project.language, ...project.tags]} />
        {open && (
          <div className="det" id={detId}>
            <div>
              <b>Overview</b>
              {project.summary}
            </div>
            <div>
              <b>My role</b>
              <Placeholder>Solo build, design and deployment.</Placeholder>
            </div>
            <div>
              <b>Highlights</b>
              <Placeholder>Two or three results or technical decisions.</Placeholder>
            </div>
            {project.stack && (
              <div>
                <b>Stack</b>
                {project.stack}
              </div>
            )}
          </div>
        )}
        <div className="links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              Live site ↗
            </a>
          )}
          {project.repo && (
            <a href={`https://github.com/dheerajtp/${project.repo}`} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          )}
          <button type="button" className="tog" aria-expanded={open} aria-controls={open ? detId : undefined} onClick={() => setOpen(!open)}>
            View details
          </button>
        </div>
      </div>
    </article>
  )
}
