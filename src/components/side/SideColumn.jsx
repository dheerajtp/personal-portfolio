import { profile } from '../../data/profile.js'
import Avatar from './Avatar.jsx'
import AvailabilityBadge from './AvailabilityBadge.jsx'
import SideNav from './SideNav.jsx'
import SideActions from './SideActions.jsx'
import SideLinks from './SideLinks.jsx'
import defaultPhoto from '../../assets/photo.jpg'
import './side.css'

export default function SideColumn({ activeId = null, onSearch, onCopyEmail, clock = '', photo = defaultPhoto }) {
  return (
    <aside className="side">
      <div>
        <div className="who">
          <Avatar photo={photo} />
          <AvailabilityBadge />
        </div>
        <h1>
          Dheeraj <span>T.P</span>
        </h1>
        <h2>{profile.title}</h2>
        <p className="tagline">{profile.tagline}</p>
        <SideNav activeId={activeId} />
        <SideActions onSearch={onSearch} />
      </div>
      <SideLinks onCopyEmail={onCopyEmail} clock={clock} />
    </aside>
  )
}
