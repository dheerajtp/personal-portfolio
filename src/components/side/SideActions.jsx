import { profile } from '../../data/profile.js'

export default function SideActions({ onSearch }) {
  return (
    <div className="side-actions">
      <a className="btn2" href={profile.resume} download>
        Download resume
      </a>
      <button className="btn2" type="button" onClick={onSearch}>
        Search <kbd>Ctrl K</kbd>
      </button>
    </div>
  )
}
