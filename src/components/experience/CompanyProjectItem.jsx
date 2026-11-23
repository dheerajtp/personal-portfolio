import ChipList from '../common/ChipList.jsx'

export default function CompanyProjectItem({ project }) {
  return (
    <article className="item">
      <div className="date">{project.label}</div>
      <div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <ChipList items={project.chips} />
      </div>
    </article>
  )
}
