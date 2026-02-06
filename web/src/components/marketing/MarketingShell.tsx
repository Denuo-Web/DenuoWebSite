import { GlobeIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  IconButton,
  Kbd,
  Link as RadixLink,
  Separator,
  Text,
  Tooltip,
} from '@radix-ui/themes'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import type { Language, UiCopy } from '../../i18n/uiCopy'

interface MarketingShellProps {
  onOpenThemePanel: () => void
  language: Language
  onToggleLanguage: () => void
  copy: UiCopy
  contactEmail: string
  children: ReactNode
}

const MarketingShell = ({
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
  contactEmail,
  children,
}: MarketingShellProps) => {
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
              <RadixLink href="#offers" weight="medium">
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

        <Box asChild>
          <main>{children}</main>
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
                <RadixLink href={`mailto:${contactEmail}`}>{contactEmail}</RadixLink>
                <Link to="/admin">{copy.nav.admin}</Link>
              </Flex>
            </Flex>
          </footer>
        </Box>
      </Flex>
    </Container>
  )
}

export default MarketingShell
