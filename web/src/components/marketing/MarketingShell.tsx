import { GlobeIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
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
  loading: boolean
  error: string | null
  children: ReactNode
}

const MarketingShell = ({
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
  contactEmail,
  loading,
  error,
  children,
}: MarketingShellProps) => {
  const links = [
    { to: '/services', label: copy.nav.services },
    { to: '/work', label: copy.nav.work },
    { to: '/process', label: copy.nav.process },
    { to: '/contact', label: copy.nav.contact },
    { to: '/about', label: copy.nav.about },
  ]

  return (
    <Container size="4" px="5" py="6">
      <Flex direction="column" gap="6">
        <Card size="3" variant="surface">
          <Flex align="center" justify="between" wrap="wrap" gap="4">
            <Box asChild>
              <Link to="/" aria-label={copy.chrome.homeLabel} className="brand-logo-link">
                <img src="/denuweb.png" alt="Denuo Web" className="brand-logo brand-logo--header" />
              </Link>
            </Box>
            <Flex gap="3" align="center" wrap="wrap">
              {links.map((link) => (
                <RadixLink key={link.to} asChild weight="medium">
                  <Link to={link.to}>{link.label}</Link>
                </RadixLink>
              ))}
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
          <Callout.Root color="indigo">
            <Callout.Text>{copy.chrome.loadingLabel}</Callout.Text>
          </Callout.Root>
        )}
        {error && (
          <Callout.Root color="ruby">
            <Callout.Text>{copy.chrome.errorLabel}</Callout.Text>
          </Callout.Root>
        )}

        <Box asChild>
          <main>{children}</main>
        </Box>

        <Separator my="4" />

        <Box asChild>
          <footer>
            <Flex align="center" justify="between" wrap="wrap" gap="3">
              <Box>
                <Box asChild mb="2">
                  <Link to="/" aria-label={copy.chrome.homeLabel} className="brand-logo-link">
                    <img src="/denuweb.png" alt="Denuo Web, LLC" className="brand-logo brand-logo--footer" />
                  </Link>
                </Box>
                <Text color="gray" size="2">
                  {copy.sections.footerLine}
                </Text>
              </Box>
              <Flex gap="3" wrap="wrap">
                <RadixLink href={`mailto:${contactEmail}`}>{contactEmail}</RadixLink>
              </Flex>
            </Flex>
          </footer>
        </Box>
      </Flex>
    </Container>
  )
}

export default MarketingShell
