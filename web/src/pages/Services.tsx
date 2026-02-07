import { Badge, Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const ServicesPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const { services, differentiators, work } = content
  const packages = work.servicePackages.slice(0, 4)

  const findLinkedCaseStudy = (packageTitle: string) =>
    work.caseStudies.find(
      (caseStudy) =>
        caseStudy.servicePackage?.title?.trim().toLowerCase() === packageTitle.trim().toLowerCase()
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
              Services
            </Text>
            <Heading size="8">Service packages built for teams that need shipped outcomes.</Heading>
            <Text size="4" color="gray">
              Each package combines planning, implementation, and handoff so founders, nonprofits, and research teams
              can move from backlog to production with fewer blockers.
            </Text>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <Link to="/contact">Start a package discussion</Link>
              </Button>
              <Button asChild variant="soft">
                <Link to="/work">View related case studies</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="package-cards-heading">
            <Flex direction="column" gap="3">
              <Heading id="package-cards-heading" size="6">
                Packages and deliverables
              </Heading>
              <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="3">
                {packages.map((servicePackage) => {
                  const linkedCaseStudy = findLinkedCaseStudy(servicePackage.title)
                  const link = linkedCaseStudy ? `/work/${linkedCaseStudy.slug}` : '/contact'

                  return (
                    <Card key={servicePackage.title} asChild size="3" variant="surface">
                      <Link to={link}>
                        <Flex direction="column" gap="2">
                          <Badge variant="soft">{linkedCaseStudy ? 'Related case study' : 'New engagement'}</Badge>
                          <Heading size="4">{servicePackage.title}</Heading>
                          <Text color="gray">{servicePackage.summary}</Text>
                          {servicePackage.timeline && (
                            <Text size="2" color="gray">
                              Timeline: {servicePackage.timeline}
                            </Text>
                          )}
                          <Box asChild pl="3" m="0">
                            <ul>
                              {servicePackage.outcomes.slice(0, 3).map((outcome) => (
                                <li key={outcome}>
                                  <Text size="2">{outcome}</Text>
                                </li>
                              ))}
                            </ul>
                          </Box>
                          <Text size="2" color="gray">
                            {linkedCaseStudy ? `See: ${linkedCaseStudy.name}` : 'Discuss this package with your context'}
                          </Text>
                        </Flex>
                      </Link>
                    </Card>
                  )
                })}
              </Grid>
            </Flex>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="delivery-pillars-heading">
            <Flex direction="column" gap="3">
              <Flex align="center" justify="between" wrap="wrap" gap="2">
                <Heading id="delivery-pillars-heading" size="6">
                  Delivery pillars
                </Heading>
                <Button asChild variant="ghost" size="2">
                  <Link to="/process">How delivery works</Link>
                </Button>
              </Flex>
              <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                {services.slice(0, 3).map((service) => (
                  <Card key={service.title} asChild size="3" variant="surface">
                    <Link to="/process">
                      <Flex direction="column" gap="2">
                        <Badge variant="soft">{service.badge ?? 'Delivery area'}</Badge>
                        <Heading size="4">{service.title}</Heading>
                        <Text color="gray">{service.summary}</Text>
                        <Box asChild pl="3" m="0">
                          <ul>
                            {service.bullets.slice(0, 3).map((bullet) => (
                              <li key={bullet}>
                                <Text size="2">{bullet}</Text>
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

        <Card size="4">
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" justify="between">
            <Flex direction="column" gap="2">
              <Heading size="6">Choosing the right package</Heading>
              <Text color="gray">
                Most teams start with a narrow scope, ship one measurable outcome, then expand with the same
                architecture and delivery rhythm.
              </Text>
              <Flex gap="2" wrap="wrap">
                {differentiators.slice(0, 4).map((item) => (
                  <Badge key={item} variant="soft">
                    {item}
                  </Badge>
                ))}
              </Flex>
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

export default ServicesPage
