import { Flex, Separator } from '@radix-ui/themes'

import MarketingShell from '../components/marketing/MarketingShell'
import {
  ContactSection,
  HeroSection,
  ProcessSection,
  ProjectsSection,
  ServicesSection,
  StatusMessages,
} from '../components/marketing/sections'
import type { Language, UiCopy } from '../i18n/uiCopy'
import type { SiteContent } from '../types'

interface Props {
  content: SiteContent
  loading: boolean
  error: string | null
  onOpenThemePanel: () => void
  language: Language
  onToggleLanguage: () => void
  copy: UiCopy
}

const LandingPage = ({ content, loading, error, onOpenThemePanel, language, onToggleLanguage, copy }: Props) => {
  const { hero, services, differentiators, projects, process, contact } = content

  return (
    <MarketingShell
      onOpenThemePanel={onOpenThemePanel}
      language={language}
      onToggleLanguage={onToggleLanguage}
      copy={copy}
      contactEmail={contact.email}
    >
      <Flex direction="column" gap="4">
        <StatusMessages loading={loading} error={error} />
        <HeroSection hero={hero} />

        <Separator my="4" />
        <ServicesSection services={services} differentiators={differentiators} copy={copy} />

        <Separator my="4" />
        <ProjectsSection projects={projects} copy={copy} />

        <Separator my="4" />
        <ProcessSection process={process} copy={copy} />

        <Separator my="4" />
        <ContactSection contact={contact} copy={copy} />
      </Flex>
    </MarketingShell>
  )
}

export default LandingPage
