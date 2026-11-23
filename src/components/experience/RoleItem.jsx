import ChipList from '../common/ChipList.jsx'
import { logoImages } from '../../assets/logos/index.js'

export default function RoleItem({ role }) {
  return (
    <article className="item">
      <div className="date">{role.period}</div>
      <div>
        <div className="jh">
          <img className="lg" src={logoImages[role.logo]} alt={`${role.company} logo`} width="44" height="44" />
          <div>
            <h3>
              {role.title} · {role.company}
            </h3>
            <div className="sub">{role.location}</div>
          </div>
        </div>
        <p>{role.summary}</p>
        <ChipList items={role.chips} />
      </div>
    </article>
  )
}
