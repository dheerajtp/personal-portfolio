import { useState } from 'react'
import { projectImages } from '../../assets/projects/index.js'
import CaseStudyBody from './CaseStudyBody.jsx'
import './cases.css'

export default function CaseStudyCard({ study }) {
  const [open, setOpen] = useState(false)
  const bodyId = `${study.id}-body`
  return (
    <article className="cs">
      <div className="hd">
        <div className="vis">
          <img src={projectImages[study.image]} alt={`Screenshot of ${study.title}`} width="1000" height="625" loading="lazy" />
        </div>
        <div className="tx">
          <span className="tag">{study.tag}</span>
          <h3>{study.title}</h3>
          <p>{study.summary}</p>
          <div className="links">
            <button type="button" className="tog" aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen(!open)}>
              {open ? 'Hide case study' : 'Read case study'}
            </button>
            {study.link && (
              <a href={study.link} target="_blank" rel="noopener noreferrer">
                Live product ↗
              </a>
            )}
          </div>
        </div>
      </div>
      {open && <CaseStudyBody study={study} id={bodyId} />}
    </article>
  )
}
