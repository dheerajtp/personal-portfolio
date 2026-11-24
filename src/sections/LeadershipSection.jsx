import SectionHeading from '../components/common/SectionHeading.jsx'
import LeadershipCard from '../components/leadership/LeadershipCard.jsx'
import { leadership } from '../data/leadership.js'
import '../components/leadership/leadership.css'

export default function LeadershipSection() {
  return (
    <section id="lead" aria-labelledby="lead-h">
      <SectionHeading id="lead-h">How I lead</SectionHeading>
      <p>{leadership.intro}</p>
      <div className="lead4">
        {leadership.items.map((item) => (
          <LeadershipCard key={item.title} {...item} />
        ))}
      </div>
      <p className="note2">{leadership.note}</p>
    </section>
  )
}
