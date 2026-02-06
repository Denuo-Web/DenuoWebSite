import { Badge, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import { HeroSection } from '../components/marketing/sections'
import type { MarketingPageProps } from './marketingPageProps'

const LandingPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const { hero, services, differentiators, projects, process, contact } = content
  const previews = [
    {
      to: '/services',
      title: copy.nav.services,
      summary: services[0]?.summary ?? '',
      badge: services[0]?.badge ?? copy.sections.servicesKicker,
    },
    {
      to: '/work',
      title: copy.nav.work,
      summary: projects[0]?.impact ?? '',
      badge: projects[0]?.status ?? copy.sections.projectsKicker,
    },
    {
      to: '/process',
      title: copy.nav.process,
      summary: process[0]?.outcome ?? '',
      badge: copy.sections.processKicker,
    },
  ]

  return (
    <MarketingShell
      onOpenThemePanel={onOpenThemePanel}
      language={language}
      onToggleLanguage={onToggleLanguage}
      copy={copy}
      contactEmail={contact.email}
      loading={loading}
      error={error}
    >
      <Flex direction="column" gap="6">
        <HeroSection hero={hero} />

        <Card size="3" variant="surface">
          <Flex direction="column" gap="3">
            <Heading size="6">Choose your path</Heading>
            <Text color="gray">
              Browse the full details by section, then reach out when you want implementation guidance and a clear
              execution plan.
            </Text>
            <Grid columns={{ initial: '1', sm: '3' }} gap="3">
              {previews.map((preview) => (
                <Card key={preview.to} variant="surface">
                  <Flex direction="column" gap="2">
                    <Badge variant="soft">{preview.badge}</Badge>
                    <Heading size="5">{preview.title}</Heading>
                    <Text color="gray">{preview.summary}</Text>
                    <Button asChild size="2" variant="soft">
                      <Link to={preview.to}>Open</Link>
                    </Button>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="6">{copy.nav.about}</Heading>
            <Text color="gray">{differentiators.join(' ')}</Text>
            <Button asChild variant="ghost">
              <Link to="/about">Read more</Link>
            </Button>
          </Flex>
        </Card>

        <Card size="4" variant="surface">
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="3" justify="between" align="center">
            <Flex direction="column" gap="1">
              <Text color="indigo" size="1" weight="medium">
                {copy.sections.contactKicker}
              </Text>
              <Heading size="6">{contact.headline}</Heading>
              <Text color="gray">{contact.subhead}</Text>
            </Flex>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <Link to="/contact">{copy.nav.contact}</Link>
              </Button>
              <Button asChild variant="soft">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </MarketingShell>
  )
}

export default LandingPage
