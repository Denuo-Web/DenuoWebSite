import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
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
  const processCopy = copy.pages.process

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
              {processCopy.eyebrow}
            </Text>
            <Heading size="8">{processCopy.heroTitle}</Heading>
            <Text size="4" color="gray">
              {processCopy.heroLead}
            </Text>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <Link to="/contact">{processCopy.heroPrimaryCta}</Link>
              </Button>
              <Button asChild variant="soft">
                <Link to="/services">{processCopy.heroSecondaryCta}</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="delivery-steps-heading">
            <Flex direction="column" gap="3">
              <Heading id="delivery-steps-heading" size="6">
                {processCopy.stepsHeading}
              </Heading>
              <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="3">
                {processCopy.steps.map((step) => (
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
                    {processCopy.optionsHeading}
                  </Heading>
                  <Button asChild variant="ghost" size="2">
                    <Link to="/services">{processCopy.optionsCta}</Link>
                  </Button>
                </Flex>
                <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                  {content.process.map((offer, index) => (
                    <Card key={`${offer.title}-${index}`} asChild variant="surface" size="2">
                      <Link to="/services">
                        <Flex direction="column" gap="2">
                          <Heading size="3">{offer.title}</Heading>
                          <Text size="2" color="gray">
                            {offer.detail || processCopy.optionsDetailFallback}
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
              <Heading size="6">{processCopy.kickoffHeading}</Heading>
              <Box asChild pl="3" m="0">
                <ul>
                  {processCopy.kickoffChecklist.map((item) => (
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
