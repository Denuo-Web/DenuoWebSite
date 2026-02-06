import { Flex } from '@radix-ui/themes'

import MarketingShell from '../components/marketing/MarketingShell'
import { ProcessSection } from '../components/marketing/sections'
import type { MarketingPageProps } from './marketingPageProps'

const ProcessPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  return (
    <MarketingShell
      onOpenThemePanel={onOpenThemePanel}
      language={language}
      onToggleLanguage={onToggleLanguage}
      copy={copy}
      contactEmail={content.contact.email}
      loading={loading}
      error={error}
    >
      <Flex direction="column" gap="4">
        <ProcessSection process={content.process} copy={copy} />
      </Flex>
    </MarketingShell>
  )
}

export default ProcessPage
