export default function EducationItem({ period, duration, title, school }) {
  return (
    <div className="ed">
      <div className="y">
        {period}
        <small>{duration}</small>
      </div>
      <div className="dot" />
      <div>
        <h3>{title}</h3>
        <p>{school}</p>
      </div>
    </div>
  )
}
