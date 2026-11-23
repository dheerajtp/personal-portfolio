import SiteLayout from '../layout/SiteLayout.jsx'
import SideColumn from '../side/SideColumn.jsx'
import AboutSection from '../../sections/AboutSection.jsx'
import ExperienceSection from '../../sections/ExperienceSection.jsx'
import CaseStudiesSection from '../../sections/CaseStudiesSection.jsx'
import ProjectsSection from '../../sections/ProjectsSection.jsx'
import LeadershipSection from '../../sections/LeadershipSection.jsx'
import WorkflowSection from '../../sections/WorkflowSection.jsx'
import RecognitionSection from '../../sections/RecognitionSection.jsx'
import ContactSection from '../../sections/ContactSection.jsx'
import CommandPalette from './CommandPalette.jsx'
import { useCommandPalette } from './useCommandPalette.js'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import { useIstClock } from '../../hooks/useIstClock.js'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard.js'
import { usePaletteCommands } from '../../hooks/usePaletteCommands.js'
import { profile } from '../../data/profile.js'

export default function PageShell() {
  const palette = useCommandPalette()
  const activeId = useActiveSection()
  const clock = useIstClock()
  const copy = useCopyToClipboard()
  const copyEmail = () => copy(profile.email)
  const commands = usePaletteCommands(copyEmail)

  return (
    <>
      <SiteLayout side={<SideColumn activeId={activeId} onSearch={palette.show} onCopyEmail={copyEmail} clock={clock} />}>
        <AboutSection />
        <ExperienceSection />
        <CaseStudiesSection />
        <ProjectsSection />
        <LeadershipSection />
        <WorkflowSection />
        <RecognitionSection />
        <ContactSection onCopy={copyEmail} />
      </SiteLayout>
      <CommandPalette open={palette.open} onClose={palette.hide} commands={commands} />
    </>
  )
}
