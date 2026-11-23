import Icon from '../common/Icon.jsx'

export default function LeadershipCard({ icon, title, text }) {
  return (
    <div>
      <Icon name={icon} size={26} />
      <b>{title}</b>
      <span>{text}</span>
    </div>
  )
}
