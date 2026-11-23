import { profile } from '../../data/profile.js'
import { logoImages } from '../../assets/logos/index.js'

export default function CompanyStrip() {
  return (
    <div className="co">
      {profile.companies.map((c) => (
        <div key={c.id}>
          <img className="lg" src={logoImages[c.logo]} alt={`${c.name} logo`} width="36" height="36" />
          <span>
            <b>{c.name}</b>
            {c.role} · {c.period}
          </span>
        </div>
      ))}
    </div>
  )
}
