import SectionHeading from '../components/common/SectionHeading.jsx'
import RoleItem from '../components/experience/RoleItem.jsx'
import CompanyProjectItem from '../components/experience/CompanyProjectItem.jsx'
import { experience } from '../data/experience.js'
import { companyProjects } from '../data/companyProjects.js'
import '../components/experience/experience.css'

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-h">
      <SectionHeading id="experience-h">Experience</SectionHeading>
      {experience.map((r) => (
        <RoleItem key={r.id} role={r} />
      ))}
      <SectionHeading id="company-projects-h">Company projects</SectionHeading>
      {companyProjects.map((p) => (
        <CompanyProjectItem key={p.id} project={p} />
      ))}
    </section>
  )
}
