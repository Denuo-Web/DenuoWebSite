import { Badge, Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const WorkPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const { work, contact } = content
  const packageTitles = Array.from(
    new Set(
      work.caseStudies
        .map((caseStudy) => caseStudy.servicePackage?.title?.trim())
        .filter((title): title is string => Boolean(title))
    )
  )

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
              Work
            </Text>
            <Heading size="8">Case studies focused on delivery outcomes, not demos.</Heading>
            <Text size="4" color="gray">
              Each project includes the context, challenge, implementation choices, and operational result so you can
              assess fit before starting your own engagement.
            </Text>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <Link to="/contact">Discuss a similar project</Link>
              </Button>
              <Button asChild variant="soft">
                <Link to="/services">See service packages</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="case-study-grid-heading">
            <Flex direction="column" gap="3">
              <Heading id="case-study-grid-heading" size="6">
                Recent case studies
              </Heading>
              <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3">
                {work.caseStudies.map((caseStudy) => (
                  <Card key={caseStudy.slug} asChild size="3" variant="surface">
                    <Link to={`/work/${caseStudy.slug}`}>
                      <Flex direction="column" gap="2">
                        <Flex gap="2" wrap="wrap">
                          {caseStudy.status && <Badge variant="soft">{caseStudy.status}</Badge>}
                          {caseStudy.servicePackage?.title && <Badge color="indigo">{caseStudy.servicePackage.title}</Badge>}
                        </Flex>
                        <Heading size="4">{caseStudy.name}</Heading>
                        <Text color="gray">{caseStudy.summary}</Text>
                        <Text size="2" color="gray">
                          {caseStudy.impact}
                        </Text>
                        <Box asChild pl="3" m="0">
                          <ul>
                            {caseStudy.outcomes.slice(0, 2).map((outcome) => (
                              <li key={outcome}>
                                <Text size="2">{outcome}</Text>
                              </li>
                            ))}
                          </ul>
                        </Box>
                        <Text size="2" color="gray">
                          Open case study details
                        </Text>
                      </Flex>
                    </Link>
                  </Card>
                ))}
              </Grid>
            </Flex>
          </section>
        </Box>

        {packageTitles.length > 0 && (
          <Box asChild>
            <section aria-labelledby="engagement-package-links-heading">
              <Card size="3">
                <Flex direction="column" gap="3">
                  <Flex align="center" justify="between" wrap="wrap" gap="2">
                    <Heading id="engagement-package-links-heading" size="6">
                      Engagement packages used in these projects
                    </Heading>
                    <Button asChild variant="ghost" size="2">
                      <Link to="/services">Open services</Link>
                    </Button>
                  </Flex>
                  <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3">
                    {packageTitles.map((title) => (
                      <Card key={title} asChild variant="surface" size="2">
                        <Link to="/services">
                          <Flex direction="column" gap="2">
                            <Heading size="3">{title}</Heading>
                            <Text size="2" color="gray">
                              See package deliverables and where it fits.
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
        )}

        <Card size="4">
          <Flex direction={{ initial: 'column', sm: 'row' }} justify="between" gap="4">
            <Flex direction="column" gap="2">
              <Heading size="6">Need this level of execution for your team?</Heading>
              <Text color="gray">
                Send your current constraints and timeline. You&apos;ll get a scoped recommendation and first-step plan.
              </Text>
              <Badge variant="soft">Email: {contact.email}</Badge>
            </Flex>
            <Flex direction="column" gap="2" align={{ initial: 'start', sm: 'end' }}>
              <Button asChild>
                <Link to="/contact">{copy.nav.contact}</Link>
              </Button>
              <Button asChild variant="soft">
                <Link to="/process">{copy.nav.process}</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </MarketingShell>
  )
}

export default WorkPage
