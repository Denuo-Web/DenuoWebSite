import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const intakeChecklist = [
  'Who this is for and the main user or stakeholder problem.',
  'What already exists (codebase, tools, or current manual workflow).',
  'Any deadlines, compliance requirements, or budget limits.',
]

const startPaths = [
  {
    title: 'See delivery evidence',
    summary: 'Review comparable projects and outcomes first.',
    to: '/work',
  },
  {
    title: 'Review service packages',
    summary: 'Pick the package closest to your immediate need.',
    to: '/services',
  },
  {
    title: 'Understand the process',
    summary: 'See how scope, build, and handoff are run.',
    to: '/process',
  },
]

const ContactPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const { contact } = content

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
      <Flex direction="column" gap="6">
        <Card size="4" variant="surface">
          <Flex direction="column" gap="3">
            <Text color="indigo" size="1" weight="medium">
              Contact
            </Text>
            <Heading size="8">{contact.headline}</Heading>
            <Text size="4" color="gray">
              {contact.subhead}
            </Text>
            <Flex gap="2" wrap="wrap">
              <Button asChild size="3">
                <a href={`mailto:${contact.email}`}>Email {contact.email}</a>
              </Button>
              <Button asChild size="3" variant="soft">
                <Link to="/process">Review process first</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="intake-checklist-heading">
            <Card size="3">
              <Flex direction="column" gap="3">
                <Heading id="intake-checklist-heading" size="6">
                  Include this in your first message
                </Heading>
                <Box asChild pl="3" m="0">
                  <ul>
                    {intakeChecklist.map((item) => (
                      <li key={item}>
                        <Text color="gray">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </Box>
                {contact.note && (
                  <Text size="2" color="gray">
                    {contact.note}
                  </Text>
                )}
              </Flex>
            </Card>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="start-paths-heading">
            <Flex direction="column" gap="3">
              <Heading id="start-paths-heading" size="6">
                Choose your starting path
              </Heading>
              <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                {startPaths.map((path) => (
                  <Card key={path.to} asChild variant="surface" size="3">
                    <Link to={path.to}>
                      <Flex direction="column" gap="2">
                        <Heading size="4">{path.title}</Heading>
                        <Text color="gray">{path.summary}</Text>
                      </Flex>
                    </Link>
                  </Card>
                ))}
              </Grid>
            </Flex>
          </section>
        </Box>

        <Card size="4" variant="surface">
          <Flex direction={{ initial: 'column', sm: 'row' }} justify="between" gap="4">
            <Flex direction="column" gap="2">
              <Heading size="6">Response expectation</Heading>
              <Text color="gray">
                I reply within one business day with either clarifying questions or a proposed first-step scope.
              </Text>
            </Flex>
            <Flex direction="column" gap="2" align={{ initial: 'start', sm: 'end' }}>
              <Button asChild>
                <a href={`mailto:${contact.email}`}>Start via email</a>
              </Button>
              <Button asChild variant="soft">
                <Link to="/work">View case studies</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </MarketingShell>
  )
}

export default ContactPage
