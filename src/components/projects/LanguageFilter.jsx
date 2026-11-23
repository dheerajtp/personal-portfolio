export default function LanguageFilter({ languages, value, onChange }) {
  if (languages.length < 2) return null
  return (
    <div className="pf">
      {['All', ...languages].map((l) => (
        <button type="button" key={l} aria-pressed={l === value} onClick={() => onChange(l)}>
          {l}
        </button>
      ))}
    </div>
  )
}
