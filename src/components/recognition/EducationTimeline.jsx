import EducationItem from './EducationItem.jsx'

export default function EducationTimeline({ items }) {
  return (
    <div className="edu">
      {items.map((item) => (
        <EducationItem key={item.id} {...item} />
      ))}
    </div>
  )
}
