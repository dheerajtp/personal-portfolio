import SectionHeading from '../components/common/SectionHeading.jsx'
import ContactLinks from '../components/contact/ContactLinks.jsx'
import { profile } from '../data/profile.js'
import '../components/contact/contact.css'

export default function ContactSection({ onCopy = () => {} }) {
  return (
    <section id="contact" aria-labelledby="contact-h">
      <SectionHeading id="contact-h">Contact</SectionHeading>
      <p>Open to new roles and projects. The quickest way to reach me is email.</p>
      <div className="contact-actions">
        <button className="cta" type="button" onClick={onCopy}>
          Copy {profile.email}
        </button>
        <a className="contact-links" href={`mailto:${profile.email}`}>
          <span>Email me</span>
        </a>
      </div>
      <ContactLinks />
      <footer className="foot">© 2026 Dheeraj T.P · Calicut, Kerala</footer>
    </section>
  )
}
