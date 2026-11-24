import { profile } from '../../data/profile.js'

export default function StatList() {
  return (
    <dl className="stat">
      {profile.stats.map((s) => (
        <div key={s.label}>
          <dd>{s.value}</dd>
          <dt>{s.label}</dt>
        </div>
      ))}
    </dl>
  )
}
