import { profile } from '../../data/profile.js'

export default function AvailabilityBadge() {
  return <span className="avail">{profile.availability}</span>
}
