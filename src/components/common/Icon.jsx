import iconPaths from './iconPaths.js'

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {(iconPaths[name] ?? []).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
