import SectionHeading from '../components/common/SectionHeading.jsx'
import AwardCard from '../components/recognition/AwardCard.jsx'
import EducationTimeline from '../components/recognition/EducationTimeline.jsx'
import SkillGroups from '../components/recognition/SkillGroups.jsx'
import { awards } from '../data/awards.js'
import { education } from '../data/education.js'
import { skills } from '../data/skills.js'
import '../components/recognition/recognition.css'

export default function RecognitionSection() {
  return (
    <section id="recognition" aria-labelledby="recognition-h">
      <SectionHeading id="recognition-h">Recognition</SectionHeading>
      <div className="aws">
        {awards.map((a) => (
          <AwardCard key={a.id} {...a} />
        ))}
      </div>
      <h2 className="eyebrow rec-sub">Education</h2>
      <EducationTimeline items={education} />
      <h2 className="eyebrow rec-sub">Skills</h2>
      <SkillGroups groups={skills} />
    </section>
  )
}
