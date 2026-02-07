import { Badge, Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
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
  const { hero, contact, work } = content
  const landingCopy = copy.pages.landing
  const featuredCaseStudies = work.caseStudies.slice(0, 3)
  const servicePackageSnapshot = work.servicePackages.slice(0, 4)

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
        <Card size="4" variant="surface">
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="2">
              <Text color="indigo" size="1" weight="medium">
                {hero.eyebrow}
              </Text>
              <Heading size="8">{hero.title}</Heading>
              <Text size="4" color="gray">
                {hero.subtitle}
              </Text>
            </Flex>
            <Flex gap="3" wrap="wrap">
              <Button asChild size="3">
                <Link to="/work">{landingCopy.heroPrimaryCta}</Link>
              </Button>
              <Button asChild size="3" variant="soft">
                <Link to="/contact">{landingCopy.heroSecondaryCta}</Link>
              </Button>
            </Flex>
            <Flex gap="2" wrap="wrap">
              <Badge color="indigo">{hero.badge}</Badge>
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="credibility-heading">
            <Flex direction="column" gap="3">
              <Heading id="credibility-heading" size="6">
                {landingCopy.credibilityHeading}
              </Heading>
              <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                {landingCopy.credibilityBullets.map((item) => (
                  <Card key={item.title} variant="surface" size="3">
                    <Flex direction="column" gap="2">
                      <Heading size="4">{item.title}</Heading>
                      <Text color="gray">{item.detail}</Text>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            </Flex>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="featured-work-heading">
            <Flex direction="column" gap="3">
              <Flex align="center" justify="between" wrap="wrap" gap="2">
                <Heading id="featured-work-heading" size="6">
                  {landingCopy.featuredWorkHeading}
                </Heading>
                <Button asChild variant="ghost" size="2">
                  <Link to="/work">{landingCopy.featuredWorkCta}</Link>
                </Button>
              </Flex>
              <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                {featuredCaseStudies.map((caseStudy) => (
                  <Card key={caseStudy.slug} asChild size="3" variant="surface">
                    <Link to={`/work/${caseStudy.slug}`}>
                      <Flex direction="column" gap="2">
                        {caseStudy.status && <Badge variant="soft">{caseStudy.status}</Badge>}
                        <Heading size="4">{caseStudy.name}</Heading>
                        <Text color="gray">{caseStudy.summary}</Text>
                        <Text size="2" color="gray">
                          {caseStudy.impact}
                        </Text>
                      </Flex>
                    </Link>
                  </Card>
                ))}
              </Grid>
            </Flex>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="services-snapshot-heading">
            <Flex direction="column" gap="3">
              <Flex align="center" justify="between" wrap="wrap" gap="2">
                <Heading id="services-snapshot-heading" size="6">
                  {landingCopy.servicesSnapshotHeading}
                </Heading>
                <Button asChild variant="ghost" size="2">
                  <Link to="/services">{landingCopy.servicesSnapshotCta}</Link>
                </Button>
              </Flex>
              <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="3">
                {servicePackageSnapshot.map((pkg) => (
                  <Card key={pkg.title} asChild size="3" variant="surface">
                    <Link to="/services">
                      <Flex direction="column" gap="2">
                        <Heading size="4">{pkg.title}</Heading>
                        <Text color="gray">{pkg.summary}</Text>
                        <Box asChild pl="3" m="0">
                          <ul>
                            {pkg.outcomes.slice(0, 3).map((deliverable) => (
                              <li key={deliverable}>
                                <Text size="2">{deliverable}</Text>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      </Flex>
                    </Link>
                  </Card>
                ))}
              </Grid>
            </Flex>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="process-summary-heading">
            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" justify="between" wrap="wrap" gap="2">
                  <Heading id="process-summary-heading" size="6">
                    {landingCopy.processHeading}
                  </Heading>
                  <Button asChild variant="ghost" size="2">
                    <Link to="/process">{landingCopy.processCta}</Link>
                  </Button>
                </Flex>
                <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="3">
                  {landingCopy.processSummary.map((step) => (
                    <Card key={step.title} variant="surface" size="2">
                      <Flex direction="column" gap="2">
                        <Heading size="3">{step.title}</Heading>
                        <Text color="gray" size="2">
                          {step.detail}
                        </Text>
                      </Flex>
                    </Card>
                  ))}
                </Grid>
              </Flex>
            </Card>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="about-operator-heading">
            <Card size="3">
              <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" justify="between">
                <Flex direction="column" gap="2">
                  <Heading id="about-operator-heading" size="6">
                    {landingCopy.aboutHeading}
                  </Heading>
                  <Text color="gray">{landingCopy.aboutBody}</Text>
                </Flex>
                <Flex align="start">
                  <Button asChild variant="soft">
                    <Link to="/about">{landingCopy.aboutCta}</Link>
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="final-cta-heading">
            <Card size="4" variant="surface">
              <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" justify="between">
                <Flex direction="column" gap="2">
                  <Text color="indigo" size="1" weight="medium">
                    {copy.sections.contactKicker}
                  </Text>
                  <Heading id="final-cta-heading" size="6">
                    {contact.headline}
                  </Heading>
                  <Text color="gray">{contact.subhead}</Text>
                  <Text size="2" color="gray">
                    {landingCopy.intakeLabel}
                  </Text>
                  <Box asChild pl="3" m="0">
                    <ul>
                      {landingCopy.intakePrompts.map((prompt) => (
                        <li key={prompt}>
                          <Text size="2" color="gray">
                            {prompt}
                          </Text>
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
                <Flex direction="column" gap="2" align={{ initial: 'start', sm: 'end' }}>
                  <Button asChild size="3">
                    <Link to="/contact">{landingCopy.finalPrimaryCta}</Link>
                  </Button>
                  <Button asChild variant="soft">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </section>
        </Box>
      </Flex>
    </MarketingShell>
  )
}

export default LandingPage
