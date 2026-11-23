import SectionHeading from '../components/common/SectionHeading.jsx'
import CaseStudyCard from '../components/cases/CaseStudyCard.jsx'
import { caseStudies } from '../data/caseStudies.js'

export default function CaseStudiesSection() {
  return (
    <section id="cases" aria-labelledby="cases-h">
      <SectionHeading id="cases-h">Case studies</SectionHeading>
      <p>Five projects in more depth: two I shipped at work, and three I built myself.</p>
      <div className="cs-list">
        {caseStudies.map((s) => (
          <CaseStudyCard key={s.id} study={s} />
        ))}
      </div>
    </section>
  )
}
