import { Badge, Button, Callout, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Link, useParams } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import { toProjectSlug } from '../lib/projectSlug'
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
  const project = content.projects.find((item) => toProjectSlug(item.name) === slug)

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
        {!project && (
          <Callout.Root color="amber">
            <Callout.Text>Project not found. It may have been renamed in the dashboard.</Callout.Text>
          </Callout.Root>
        )}
        {project && (
          <Card size="4" variant="surface">
            <Flex direction="column" gap="3">
              <Flex align="center" justify="between" wrap="wrap" gap="2">
                <Heading size="8">{project.name}</Heading>
                {project.status && <Badge variant="soft">{project.status}</Badge>}
              </Flex>
              <Text size="4">{project.summary}</Text>
              <Text color="gray">{project.impact}</Text>
              <Flex gap="2" wrap="wrap">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="soft">
                    {tech}
                  </Badge>
                ))}
              </Flex>
              <Flex gap="2" wrap="wrap">
                {project.link && (
                  <Button asChild>
                    <a href={project.link} target="_blank" rel="noreferrer">
                      Visit project
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
