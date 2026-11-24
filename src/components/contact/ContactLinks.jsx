import { profile } from '../../data/profile.js'

export default function ContactLinks() {
  return (
    <p className="contact-links">
      {profile.phone} ·{' '}
      <a href={profile.github} target="_blank" rel="noopener noreferrer">
        github.com/{profile.githubUser}
      </a>{' '}
      ·{' '}
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        {profile.linkedin.replace('https://', '')}
      </a>
    </p>
  )
}
