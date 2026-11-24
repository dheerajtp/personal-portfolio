import { projectImages } from '../../assets/projects/index.js'
import ProjectPlaceholder from './ProjectPlaceholder.jsx'

export default function ProjectMedia({ project }) {
  const src = project.image && projectImages[project.image]
  return (
    <div className="shot">
      {src ? (
        <img src={src} alt={`Screenshot of ${project.name}`} width="1000" height="625" loading="lazy" />
      ) : (
        <ProjectPlaceholder name={project.name} live={project.live} mobile={project.language === 'React Native'} />
      )}
    </div>
  )
}
