import { profile } from '../../data/profile.js'

export default function NowList() {
  return (
    <ul className="now">
      {profile.now.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  )
}
