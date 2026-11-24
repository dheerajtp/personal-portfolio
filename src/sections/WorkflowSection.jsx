import SectionHeading from '../components/common/SectionHeading.jsx'
import WorkflowStep from '../components/workflow/WorkflowStep.jsx'
import { workflow } from '../data/workflow.js'
import '../components/workflow/workflow.css'

const LINK_TEXT = 'Agent Office'

export default function WorkflowSection() {
  const [before, after] = workflow.intro.split(LINK_TEXT)
  return (
    <section id="workflow" aria-labelledby="workflow-h">
      <SectionHeading id="workflow-h">AI-assisted workflow</SectionHeading>
      <p>
        {before}
        <a href="#cases">
          <em>{LINK_TEXT}</em>
        </a>
        {after}
      </p>
      <div className="flow">
        {workflow.steps.map((step) => (
          <WorkflowStep key={step.title} {...step} />
        ))}
      </div>
    </section>
  )
}
