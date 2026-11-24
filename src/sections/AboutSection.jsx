import SectionHeading from '../components/common/SectionHeading.jsx'
import CompanyStrip from '../components/about/CompanyStrip.jsx'
import NowList from '../components/about/NowList.jsx'
import StatList from '../components/about/StatList.jsx'
import { profile } from '../data/profile.js'
import '../components/about/about.css'

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-h">
      <SectionHeading id="about-h">About</SectionHeading>
      {profile.about.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <CompanyStrip />
      <NowList />
      <StatList />
    </section>
  )
}
