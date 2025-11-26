import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Kbd,
  Link as RadixLink,
  Separator,
  Text,
  Tooltip,
} from '@radix-ui/themes'
import { ArrowRightIcon, GlobeIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'

import type { Language, UiCopy } from '../i18n/uiCopy'
import type { SiteContent } from '../types'

interface Props {
  content: SiteContent
  loading: boolean
  error: string | null
  onOpenThemePanel: () => void
  language: Language
  onToggleLanguage: () => void
  copy: UiCopy
}

const LandingPage = ({ content, loading, error, onOpenThemePanel, language, onToggleLanguage, copy }: Props) => {
  const { hero, stats, services, differentiators, projects, process, contact } = content

  return (
    <Container size="4" px="5" py="6">
      <Flex direction="column" gap="6">
      <Card size="3" variant="surface">
        <Flex align="center" justify="between" wrap="wrap" gap="4">
          <Heading size="6">Denuo Web</Heading>
          <Flex gap="3" align="center" wrap="wrap">
            <RadixLink href="#services" weight="medium">
              {copy.nav.services}
            </RadixLink>
            <RadixLink href="#projects" weight="medium">
              {copy.nav.work}
            </RadixLink>
            <RadixLink href="#process" weight="medium">
              {copy.nav.process}
            </RadixLink>
            <RadixLink href="#contact" weight="medium">
              {copy.nav.contact}
            </RadixLink>
            <Button asChild variant="soft" size="1">
              <Link to="/admin">{copy.nav.admin}</Link>
            </Button>
          </Flex>
          <Flex gap="2" ml="auto">
            <Tooltip content={copy.nav.themeToggle}>
              <IconButton variant="soft" onClick={onOpenThemePanel} aria-label={copy.nav.themeToggle}>
                <Kbd>t</Kbd>
              </IconButton>
            </Tooltip>
            <Tooltip content={copy.nav.languageToggle}>
              <Button variant="soft" onClick={onToggleLanguage} aria-label={copy.nav.languageToggle} size="2">
                <GlobeIcon />
                <Text ml="2">{language === 'en' ? 'EN' : '日本'}</Text>
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
      </Card>

      {loading && (
        <Callout.Root color="jade">
          <Callout.Text>Syncing live content…</Callout.Text>
        </Callout.Root>
      )}
      {error && (
        <Callout.Root color="ruby">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Box asChild id="top">
        <section>
        <Box>
          <Text size="1" color="green" weight="medium" mb="1" as="p">
            {hero.eyebrow}
          </Text>
          <Heading size="9" mb="2">
            {hero.title}
          </Heading>
          <Text size="4" color="gray" mb="4" as="p">
            {hero.subtitle}
          </Text>
          <Flex gap="3" wrap="wrap" mb="4">
            <Button size="3" asChild>
              <RadixLink href="#contact">
                {hero.primaryCta} <ArrowRightIcon />
              </RadixLink>
            </Button>
            <Button size="3" variant="ghost" asChild>
              <RadixLink href="#projects">{hero.secondaryCta}</RadixLink>
            </Button>
          </Flex>
          <Flex align="center" gap="3" wrap="wrap" mb="4">
            <Badge color="jade">{hero.badge}</Badge>
          </Flex>
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="3">
            {stats.map((stat) => (
              <Card key={stat.label} size="3" variant="surface">
                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    {stat.label}
                  </Text>
                  <Heading size="5">{stat.value}</Heading>
                  {stat.helper && (
                    <Text size="2" color="gray">
                      {stat.helper}
                    </Text>
                  )}
                </Flex>
              </Card>
            ))}
          </Grid>
        </Box>
        </section>
      </Box>

      <Separator my="4" />

      <Box asChild id="services">
        <section>
        <Text color="green" size="1" weight="medium">
          {copy.sections.servicesKicker}
        </Text>
          <Heading size="7" my="1">
            {copy.sections.servicesTitle}
          </Heading>
          <Text color="gray" size="3" mb="4">
            {copy.sections.servicesLead}
          </Text>
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3">
            {services.map((service) => (
              <Card key={service.title} size="3" variant="surface">
                <Flex direction="column" gap="2">
                  <Badge color="jade" variant="soft">
                    {service.badge}
                  </Badge>
                  <Heading size="5">{service.title}</Heading>
                <Text color="gray">{service.summary}</Text>
                <Box asChild pl="3" m="0">
                  <ul>
                    {service.bullets.map((item) => (
                      <li key={item}>
                        <Text>{item}</Text>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Flex>
            </Card>
          ))}
        </Grid>
        <Flex gap="2" wrap="wrap" mt="3">
          {differentiators.map((item) => (
            <Badge key={item} variant="soft">
              {item}
            </Badge>
          ))}
        </Flex>
        </section>
      </Box>

      <Separator my="4" />

      <Box asChild id="projects">
        <section>
        <Text color="green" size="1" weight="medium">
          {copy.sections.projectsKicker}
        </Text>
          <Heading size="7" my="1">
            {copy.sections.projectsTitle}
          </Heading>
          <Text color="gray" size="3" mb="4">
            {copy.sections.projectsLead}
          </Text>
          <Grid columns={{ initial: '1', sm: '2' }} gap="3">
            {projects.map((project) => (
              <Card key={project.name} size="3" variant="surface">
                <Flex direction="column" gap="2">
                  <Badge variant="soft">{project.status}</Badge>
                  <Flex align="center" justify="between" gap="3">
                    <Heading size="5">{project.name}</Heading>
                    {project.link && (
                    <Button asChild variant="ghost" size="1">
                      <a href={project.link} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </Button>
                  )}
                </Flex>
                <Text>{project.summary}</Text>
                <Text color="gray">{project.impact}</Text>
                <Flex gap="2" wrap="wrap">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="soft">
                      {tech}
                    </Badge>
                  ))}
                </Flex>
              </Flex>
            </Card>
          ))}
        </Grid>
        </section>
      </Box>

      <Separator my="4" />

      <Box asChild id="process">
        <section>
        <Text color="green" size="1" weight="medium">
          {copy.sections.processKicker}
        </Text>
        <Heading size="7" my="1">
          {copy.sections.processTitle}
        </Heading>
        <Text color="gray" size="3" mb="4">
          {copy.sections.processLead}
        </Text>
        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3">
          {process.map((step, idx) => (
            <Card key={step.title + idx} size="3">
              <Flex direction="column" gap="2">
                <Text weight="medium" color="green">
                  0{idx + 1}
                </Text>
                <Heading size="5">{step.title}</Heading>
                <Text>{step.detail}</Text>
                <Text color="gray">Outcome: {step.outcome}</Text>
              </Flex>
            </Card>
          ))}
        </Grid>
        </section>
      </Box>

      <Separator my="4" />

      <Box asChild id="contact">
        <section>
        <Card size="4" variant="surface">
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" justify="between" align="center">
            <Box>
              <Text color="green" size="1" weight="medium">
                {copy.sections.contactKicker}
              </Text>
              <Heading size="7" my="1">
                {contact.headline}
              </Heading>
              <Text color="gray" size="3" mb="3">
                {contact.subhead}
              </Text>
              <Flex gap="2" wrap="wrap" mb="2">
                <Badge variant="soft">Email: {contact.email}</Badge>
                <Badge variant="soft">Phone: {contact.phone}</Badge>
              </Flex>
              {contact.note && (
                <Text color="gray" size="2">
                  {contact.note}
                </Text>
              )}
            </Box>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <a href={`mailto:${contact.email}`}>Email Jaron</a>
              </Button>
              {contact.calendly && (
                <Button asChild variant="ghost">
                  <a href={contact.calendly} target="_blank" rel="noreferrer">
                    Book a 30-min call
                  </a>
                </Button>
              )}
            </Flex>
          </Flex>
        </Card>
        </section>
      </Box>

      <Separator my="4" />

      <Box asChild>
        <footer>
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Box>
              <Flex align="center" gap="2">
                <Text weight="bold">Denuo Web, LLC</Text>
              </Flex>
              <Text color="gray" size="2">
                {copy.sections.footerLine}
              </Text>
            </Box>
            <Flex gap="3" wrap="wrap">
              <RadixLink href="mailto:jaron@rosenau.info">jaron@rosenau.info</RadixLink>
              <RadixLink href="tel:+19202920431">+1 (920) 292-0431</RadixLink>
              <Link to="/admin">{copy.nav.admin}</Link>
            </Flex>
          </Flex>
        </footer>
      </Box>
      </Flex>
    </Container>
  )
}

export default LandingPage
