export default function SectionHeading({ id, children }) {
  return (
    <h2 className="eyebrow" id={id}>
      {children}
    </h2>
  )
}
