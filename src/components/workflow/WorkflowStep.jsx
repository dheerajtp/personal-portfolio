import Icon from '../common/Icon.jsx'

export default function WorkflowStep({ icon, title, text, tags, highlight }) {
  return (
    <div className={highlight ? 'fs rv' : 'fs'}>
      <i>
        <Icon name={icon} />
      </i>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        <ul>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
