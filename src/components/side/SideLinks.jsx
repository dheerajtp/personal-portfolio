import { profile } from '../../data/profile.js'

export default function SideLinks({ onCopyEmail, clock = '' }) {
  return (
    <div className="soc">
      <a href={profile.github} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <button className="cp" type="button" onClick={onCopyEmail}>
        {profile.email}
      </button>
      {clock && <span className="clock">{clock}</span>}
    </div>
  )
}
