import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Badge, Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import type { UiCopy } from '../../i18n/uiCopy'
import type { CaseStudy, ContactInfo, HeroContent, ProcessStep, Service } from '../../types'

interface HeroSectionProps {
  hero: HeroContent
}

interface ServicesSectionProps {
  services: Service[]
  differentiators: string[]
  copy: UiCopy
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[]
  copy: UiCopy
}

interface ProcessSectionProps {
  process: ProcessStep[]
  copy: UiCopy
}

interface ContactSectionProps {
  contact: ContactInfo
  copy: UiCopy
}

export const HeroSection = ({ hero }: HeroSectionProps) => {
  return (
    <Box asChild>
      <section>
        <Box>
          <Text size="1" color="indigo" weight="medium" mb="1" as="p">
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
              <Link to="/contact">
                {hero.primaryCta} <ArrowRightIcon />
              </Link>
            </Button>
            <Button size="3" variant="ghost" asChild>
              <Link to="/work">{hero.secondaryCta}</Link>
            </Button>
          </Flex>
          <Flex align="center" gap="3" wrap="wrap" mb="4">
            <Badge color="indigo">{hero.badge}</Badge>
          </Flex>
        </Box>
      </section>
    </Box>
  )
}

export const ServicesSection = ({ services, differentiators, copy }: ServicesSectionProps) => {
  return (
    <Box asChild>
      <section>
        <Text color="indigo" size="1" weight="medium">
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
                <Badge color="indigo" variant="soft">
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
  )
}

export const CaseStudiesSection = ({ caseStudies, copy }: CaseStudiesSectionProps) => {
  return (
    <Box asChild>
      <section>
        <Text color="indigo" size="1" weight="medium">
          {copy.sections.projectsKicker}
        </Text>
        <Heading size="7" my="1">
          {copy.sections.projectsTitle}
        </Heading>
        <Text color="gray" size="3" mb="4">
          {copy.sections.projectsLead}
        </Text>
        <Grid columns={{ initial: '1', sm: '2' }} gap="3">
          {caseStudies.map((caseStudy) => (
            <Card key={caseStudy.slug} size="3" variant="surface">
              <Flex direction="column" gap="2">
                {caseStudy.status && <Badge variant="soft">{caseStudy.status}</Badge>}
                <Flex align="center" justify="between" gap="3">
                  <Heading size="5">{caseStudy.name}</Heading>
                  <Flex align="center" gap="2">
                    <Button asChild variant="soft" size="1">
                      <Link to={`/work/${caseStudy.slug}`}>Details</Link>
                    </Button>
                    {caseStudy.liveUrl && (
                      <Button asChild variant="ghost" size="1">
                        <a href={caseStudy.liveUrl} target="_blank" rel="noreferrer">
                          Visit
                        </a>
                      </Button>
                    )}
                  </Flex>
                </Flex>
                <Text>{caseStudy.summary}</Text>
                <Text color="gray">{caseStudy.impact}</Text>
                <Flex gap="2" wrap="wrap">
                  {caseStudy.stack.map((tech) => (
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
  )
}

export const ProcessSection = ({ process, copy }: ProcessSectionProps) => {
  return (
    <Box asChild>
      <section>
        <Text color="indigo" size="1" weight="medium">
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
                <Heading size="5">{step.title}</Heading>
                {step.detail && <Text>{step.detail}</Text>}
                {step.outcome && (
                  <Text color="gray" size="2">
                    Support: {step.outcome}
                  </Text>
                )}
              </Flex>
            </Card>
          ))}
        </Grid>
      </section>
    </Box>
  )
}

export const ContactSection = ({ contact, copy }: ContactSectionProps) => {
  return (
    <Box asChild>
      <section>
        <Card size="4" variant="surface">
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" justify="between" align="center">
            <Box>
              <Text color="indigo" size="1" weight="medium">
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
              </Flex>
              {contact.note && (
                <Text color="gray" size="2">
                  {contact.note}
                </Text>
              )}
            </Box>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <a href={`mailto:${contact.email}`}>Email Denuo Web</a>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </section>
    </Box>
  )
}
