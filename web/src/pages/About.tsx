import { Badge, Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const AboutPage = ({
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
        <Card size="4" variant="surface">
          <Flex direction="column" gap="3">
            <Text color="indigo" size="1" weight="medium">
              {content.hero.eyebrow}
            </Text>
            <Heading size="8">{copy.nav.about}</Heading>
            <Text size="4">{content.hero.subtitle}</Text>
            <Badge color="indigo">{content.hero.badge}</Badge>
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="2">
            <Heading size="6">Why teams choose Denuo Web</Heading>
            <Box asChild pl="3" m="0">
              <ul>
                {content.differentiators.map((item) => (
                  <li key={item}>
                    <Text>{item}</Text>
                  </li>
                ))}
              </ul>
            </Box>
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="6">Engagement options</Heading>
            <Grid columns={{ initial: '1', sm: '3' }} gap="3">
              {content.process.map((step, idx) => (
                <Card key={`${step.title}-${idx}`} variant="surface">
                  <Flex direction="column" gap="2">
                    <Heading size="4">{step.title}</Heading>
                    <Text color="gray">{step.detail}</Text>
                    <Text size="2">{step.outcome}</Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Flex>
        </Card>
      </Flex>
    </MarketingShell>
  )
}

export default AboutPage
