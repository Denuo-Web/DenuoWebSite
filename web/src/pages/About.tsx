import { Badge, Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

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
  const aboutCopy = copy.pages.about
  const featuredCaseStudies = content.work.caseStudies.slice(0, 3)
  const offers = content.services.slice(0, 3)
  const offerBadgeLabel = language === 'ja' ? '提案' : 'Offer'

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
              {aboutCopy.eyebrow}
            </Text>
            <Heading size="8">{aboutCopy.heroTitle}</Heading>
            <Text size="4" color="gray">
              {aboutCopy.heroBody}
            </Text>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <Link to="/contact">{aboutCopy.heroPrimaryCta}</Link>
              </Button>
              <Button asChild variant="soft">
                <Link to="/work">{aboutCopy.heroSecondaryCta}</Link>
              </Button>
            </Flex>
            <Flex gap="2" wrap="wrap">
              {offers.map((offer) => (
                <Badge key={offer.title} variant="soft">
                  {offer.title}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="how-it-works-heading">
            <Card size="3">
              <Flex direction="column" gap="3">
                <Heading id="how-it-works-heading" size="6">
                  {aboutCopy.howHeading}
                </Heading>
                <Text color="gray">{aboutCopy.howBody}</Text>
                <Grid columns={{ initial: '1', sm: '2' }} gap="3">
                  {content.process.slice(0, 4).map((step) => (
                    <Card key={step.title} variant="surface" size="2">
                      <Flex direction="column" gap="2">
                        <Heading size="4">{step.title}</Heading>
                        <Text size="2" color="gray">
                          {step.detail}
                        </Text>
                        <Text size="2" color="gray">
                          {step.outcome}
                        </Text>
                      </Flex>
                    </Card>
                  ))}
                </Grid>
              </Flex>
            </Card>
          </section>
        </Box>

        {featuredCaseStudies.length > 0 && (
          <Box asChild>
            <section aria-labelledby="relevant-case-studies-heading">
              <Flex direction="column" gap="3">
                <Flex align="center" justify="between" wrap="wrap" gap="2">
                  <Heading id="relevant-case-studies-heading" size="6">
                    {aboutCopy.evidenceHeading}
                  </Heading>
                  <Button asChild variant="ghost" size="2">
                    <Link to="/work">{aboutCopy.evidenceCta}</Link>
                  </Button>
                </Flex>
                <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                  {featuredCaseStudies.map((caseStudy) => (
                    <Card key={caseStudy.slug} asChild variant="surface" size="3">
                      <Link to={`/work/${caseStudy.slug}`}>
                        <Flex direction="column" gap="2">
                          <Flex gap="2" wrap="wrap">
                            {caseStudy.status && <Badge variant="soft">{caseStudy.status}</Badge>}
                            {caseStudy.servicePackage?.title && (
                              <Badge color="indigo">{caseStudy.servicePackage.title}</Badge>
                            )}
                          </Flex>
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
        )}

        <Box asChild>
          <section aria-labelledby="three-offers-heading">
            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" justify="between" wrap="wrap" gap="2">
                  <Heading id="three-offers-heading" size="6">
                    {aboutCopy.optionsHeading}
                  </Heading>
                  <Button asChild variant="ghost" size="2">
                    <Link to="/services">{aboutCopy.optionsCta}</Link>
                  </Button>
                </Flex>
                <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                  {offers.map((offer) => (
                    <Card key={offer.title} asChild variant="surface" size="3">
                      <Link to="/services">
                        <Flex direction="column" gap="2">
                          <Badge variant="soft">{offerBadgeLabel}</Badge>
                          <Heading size="4">{offer.title}</Heading>
                          <Text color="gray">{offer.summary}</Text>
                          <Box asChild pl="3" m="0">
                            <ul>
                              {offer.bullets.slice(0, 3).map((bullet) => (
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
            </Card>
          </section>
        </Box>

        <Card size="4" variant="surface">
          <Flex direction={{ initial: 'column', sm: 'row' }} justify="between" gap="4">
            <Flex direction="column" gap="2">
              <Heading size="6">{aboutCopy.finalHeading}</Heading>
              <Text color="gray">{aboutCopy.finalBody}</Text>
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

export default AboutPage
