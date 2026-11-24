import Icon from '../common/Icon.jsx'

export default function AwardCard({ icon, title, period }) {
  return (
    <div className="aw2">
      <Icon name={icon} size={34} />
      <b>{title}</b>
      <span>{period}</span>
    </div>
  )
}
