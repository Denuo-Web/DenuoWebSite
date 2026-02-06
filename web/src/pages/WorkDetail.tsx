import { Badge, Button, Callout, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Link, useParams } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const WorkDetailPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const { slug = '' } = useParams()
  const caseStudy = content.work.caseStudies.find((item) => item.slug === slug)

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
        <Flex>
          <Button asChild variant="ghost">
            <Link to="/work">Back to work</Link>
          </Button>
        </Flex>
        {!caseStudy && (
          <Callout.Root color="amber">
            <Callout.Text>Case study not found. It may have been renamed in Firestore.</Callout.Text>
          </Callout.Root>
        )}
        {caseStudy && (
          <Card size="4" variant="surface">
            <Flex direction="column" gap="3">
              <Flex align="center" justify="between" wrap="wrap" gap="2">
                <Heading size="8">{caseStudy.name}</Heading>
                {caseStudy.status && <Badge variant="soft">{caseStudy.status}</Badge>}
              </Flex>
              <Text size="4">{caseStudy.summary}</Text>
              <Text color="gray">{caseStudy.impact}</Text>
              <Heading size="5">Challenge</Heading>
              <Text>{caseStudy.challenge}</Text>
              <Heading size="5">Solution</Heading>
              <Text>{caseStudy.solution}</Text>
              {caseStudy.outcomes.length > 0 && (
                <Flex direction="column" gap="1">
                  <Heading size="5">Outcomes</Heading>
                  <Flex direction="column" gap="1">
                    {caseStudy.outcomes.map((outcome) => (
                      <Text key={outcome} color="gray">
                        - {outcome}
                      </Text>
                    ))}
                  </Flex>
                </Flex>
              )}
              <Flex gap="2" wrap="wrap">
                {caseStudy.stack.map((tech) => (
                  <Badge key={tech} variant="soft">
                    {tech}
                  </Badge>
                ))}
              </Flex>
              <Flex gap="2" wrap="wrap">
                {caseStudy.liveUrl && (
                  <Button asChild>
                    <a href={caseStudy.liveUrl} target="_blank" rel="noreferrer">
                      Visit project
                    </a>
                  </Button>
                )}
                {caseStudy.repositoryUrl && (
                  <Button asChild variant="soft">
                    <a href={caseStudy.repositoryUrl} target="_blank" rel="noreferrer">
                      View repository
                    </a>
                  </Button>
                )}
                <Button asChild variant="soft">
                  <Link to="/contact">Discuss a similar build</Link>
                </Button>
              </Flex>
            </Flex>
          </Card>
        )}
      </Flex>
    </MarketingShell>
  )
}

export default WorkDetailPage
