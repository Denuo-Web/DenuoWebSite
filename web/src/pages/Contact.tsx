import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

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
  const contactCopy = copy.pages.contact

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
              {contactCopy.eyebrow}
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
                <Link to="/process">{contactCopy.heroSecondaryCta}</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="intake-checklist-heading">
            <Card size="3">
              <Flex direction="column" gap="3">
                <Heading id="intake-checklist-heading" size="6">
                  {contactCopy.checklistHeading}
                </Heading>
                <Box asChild pl="3" m="0">
                  <ul>
                    {contactCopy.checklist.map((item) => (
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
                {contactCopy.startPathsHeading}
              </Heading>
              <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                {contactCopy.startPaths.map((path) => (
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
              <Heading size="6">{contactCopy.responseHeading}</Heading>
              <Text color="gray">{contactCopy.responseBody}</Text>
            </Flex>
            <Flex direction="column" gap="2" align={{ initial: 'start', sm: 'end' }}>
              <Button asChild>
                <a href={`mailto:${contact.email}`}>{contactCopy.finalPrimaryCta}</a>
              </Button>
              <Button asChild variant="soft">
                <Link to="/work">{contactCopy.finalSecondaryCta}</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </MarketingShell>
  )
}

export default ContactPage
