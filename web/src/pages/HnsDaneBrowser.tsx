import { Badge, Box, Button, Card, Flex, Grid, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const PRIVACY_URL = '/work/hns-dane-browser/privacy'
const SOURCE_URL = 'https://github.com/Denuo-Web/hns-dane-browser-android'
const SUPPORT_URL = 'https://github.com/Denuo-Web/hns-dane-browser-android/issues'
const PLAY_PACKAGE = 'com.handshake.browser'

const localData = [
  'Browsing history: page URLs, page titles, and visit times.',
  'Website data: cookies and WebView-managed site storage.',
  'Download records: URL, file name, MIME type, Android DownloadManager ID, and queued time.',
  'HNS data: synced headers, peer records, verified resource values, resolver cache, and diagnostics.',
  'Settings: homepage, cookie preference, Strict HNS mode, and related preferences.',
]

const networkEndpoints = [
  'Websites and web services that you choose to open.',
  'Handshake peers and DNS seed hosts for header sync, peer discovery, and proof retrieval.',
  'Authoritative DNS nameservers for delegated HNS names.',
  'The configured HNS DNS-over-HTTPS compatibility resolver when compatibility mode is enabled and local or direct delegated resolution fails.',
  'Android DownloadManager destinations when you choose to download a file.',
]

const featureCards = [
  {
    title: 'Local HNS proof path',
    body: 'Syncs Handshake headers and verifies HNS resource proofs locally before routing browser requests.',
  },
  {
    title: 'DNSSEC and DANE diagnostics',
    body: 'Shows resolver trace, HNS proof details, TLSA state, DANE result, and compatibility fallback reason.',
  },
  {
    title: 'Strict HNS mode',
    body: 'Lets users disable third-party HNS DoH fallback and fail closed when direct local/delegated resolution fails.',
  },
]

const HnsDaneBrowserPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
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
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="2">
              <Text color="indigo" size="1" weight="medium">
                Denuo Web product
              </Text>
              <Heading size="8">HNS DANE Browser</Heading>
              <Text size="4" color="gray">
                An experimental Android browser for Handshake names, DNSSEC, DANE validation, and resolver diagnostics.
              </Text>
            </Flex>
            <Flex gap="3" wrap="wrap">
              <Button asChild size="3">
                <RadixLink href={SOURCE_URL} target="_blank" rel="noreferrer">
                  Source code
                </RadixLink>
              </Button>
              <Button asChild size="3" variant="soft">
                <Link to={PRIVACY_URL}>Privacy policy</Link>
              </Button>
              <Button asChild size="3" variant="ghost">
                <RadixLink href={SUPPORT_URL} target="_blank" rel="noreferrer">
                  Support / issues
                </RadixLink>
              </Button>
            </Flex>
            <Flex gap="2" wrap="wrap">
              <Badge color="indigo">Android package: {PLAY_PACKAGE}</Badge>
              <Badge variant="soft">No ads</Badge>
              <Badge variant="soft">No developer account system</Badge>
              <Badge variant="soft">Donations unlock no features</Badge>
            </Flex>
          </Flex>
        </Card>

        <Grid columns={{ initial: '1', sm: '3' }} gap="3">
          {featureCards.map((feature) => (
            <Card key={feature.title} size="3" variant="surface">
              <Flex direction="column" gap="2">
                <Heading size="4">{feature.title}</Heading>
                <Text color="gray">{feature.body}</Text>
              </Flex>
            </Card>
          ))}
        </Grid>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading size="6">Privacy summary</Heading>
            <Text color="gray">
              HNS DANE Browser does not include advertising SDKs, analytics SDKs, developer-operated accounts, or paid feature unlocks. The app stores browser data locally on the device and sends network requests needed to load sites and keep HNS resolution data current.
            </Text>
            <Grid columns={{ initial: '1', md: '2' }} gap="3">
              <Box>
                <Heading size="4" mb="2">Stored locally</Heading>
                <Box asChild pl="4" m="0">
                  <ul>
                    {localData.map((item) => (
                      <li key={item}>
                        <Text>{item}</Text>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
              <Box>
                <Heading size="4" mb="2">Network requests</Heading>
                <Box asChild pl="4" m="0">
                  <ul>
                    {networkEndpoints.map((item) => (
                      <li key={item}>
                        <Text>{item}</Text>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            </Grid>
            <Text color="gray" size="2">
              Users can clear cookies, browsing history, download records, resolver cache, or all app data through Android settings. Strict HNS mode disables the third-party HNS DoH compatibility fallback.
            </Text>
          </Flex>
        </Card>
      </Flex>
    </MarketingShell>
  )
}

export default HnsDaneBrowserPage
