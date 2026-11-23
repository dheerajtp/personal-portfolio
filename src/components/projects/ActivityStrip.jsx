import useRecentPushes from '../../hooks/useRecentPushes.js'
import './projects.css'

const fmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function ActivityStrip() {
  const pushes = useRecentPushes()
  if (!pushes.length) return null
  return (
    <div className="act" aria-label="Recent GitHub activity">
      <p className="tag">Recent GitHub activity</p>
      {pushes.map((p) => (
        <div key={p.name}>
          <b>{p.name}</b>
          <span>{fmt.format(new Date(p.pushedAt))}</span>
        </div>
      ))}
    </div>
  )
}
