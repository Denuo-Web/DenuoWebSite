import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const deliverySteps = [
  {
    title: '1. Scope alignment',
    detail:
      'We map objectives, risks, dependencies, and constraints with the people who own timeline and budget decisions.',
    output: 'Output: scoped target, architecture boundaries, and delivery checkpoints.',
  },
  {
    title: '2. Technical design',
    detail:
      'Data models, API boundaries, and environment strategy are defined before implementation to reduce rework.',
    output: 'Output: implementation plan with explicit tradeoffs and sequencing.',
  },
  {
    title: '3. Build and review',
    detail:
      'Work ships in production-grade increments with weekly reviews, issue tracking, and scope adjustments as needed.',
    output: 'Output: tested features and documented operational expectations.',
  },
  {
    title: '4. Launch and handoff',
    detail:
      'Deployment, monitoring, and handoff artifacts are finalized so your team can sustain and extend the product.',
    output: 'Output: release checklist, runbook, and prioritized next-step backlog.',
  },
]

const kickoffChecklist = [
  'Current product state or process gaps to address first.',
  'Decision owners and how quickly approvals can happen.',
  'Deadlines tied to grants, launches, or stakeholder commitments.',
]

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
      <Flex direction="column" gap="6">
        <Card size="4" variant="surface">
          <Flex direction="column" gap="3">
            <Text color="indigo" size="1" weight="medium">
              Process
            </Text>
            <Heading size="8">A delivery process built to reduce risk and keep momentum.</Heading>
            <Text size="4" color="gray">
              Teams get a clear working cadence, explicit ownership, and practical handoff artifacts from planning
              through launch.
            </Text>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <Link to="/contact">Start planning</Link>
              </Button>
              <Button asChild variant="soft">
                <Link to="/services">Review packages</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="delivery-steps-heading">
            <Flex direction="column" gap="3">
              <Heading id="delivery-steps-heading" size="6">
                Four-step delivery sequence
              </Heading>
              <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="3">
                {deliverySteps.map((step) => (
                  <Card key={step.title} size="3" variant="surface">
                    <Flex direction="column" gap="2">
                      <Heading size="4">{step.title}</Heading>
                      <Text color="gray">{step.detail}</Text>
                      <Text size="2" color="gray">
                        {step.output}
                      </Text>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            </Flex>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="engagement-options-heading">
            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" justify="between" wrap="wrap" gap="2">
                  <Heading id="engagement-options-heading" size="6">
                    Engagement options currently offered
                  </Heading>
                  <Button asChild variant="ghost" size="2">
                    <Link to="/services">{copy.nav.services}</Link>
                  </Button>
                </Flex>
                <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                  {content.process.map((offer, index) => (
                    <Card key={`${offer.title}-${index}`} asChild variant="surface" size="2">
                      <Link to="/services">
                        <Flex direction="column" gap="2">
                          <Heading size="3">{offer.title}</Heading>
                          <Text size="2" color="gray">
                            {offer.detail || 'Scope and stack details shared during planning.'}
                          </Text>
                          <Text size="2" color="gray">
                            {offer.outcome}
                          </Text>
                        </Flex>
                      </Link>
                    </Card>
                  ))}
                </Grid>
              </Flex>
            </Card>
          </section>
        </Box>

        <Card size="4">
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" justify="between">
            <Flex direction="column" gap="2">
              <Heading size="6">Before kickoff, send this intake context</Heading>
              <Box asChild pl="3" m="0">
                <ul>
                  {kickoffChecklist.map((item) => (
                    <li key={item}>
                      <Text color="gray">{item}</Text>
                    </li>
                  ))}
                </ul>
              </Box>
            </Flex>
            <Flex direction="column" gap="2" align={{ initial: 'start', sm: 'end' }}>
              <Button asChild>
                <Link to="/contact">{copy.nav.contact}</Link>
              </Button>
              <Button asChild variant="soft">
                <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </MarketingShell>
  )
}

export default ProcessPage
