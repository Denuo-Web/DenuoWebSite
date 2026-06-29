import { Box, Button, Card, Flex, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const SUPPORT_URL = 'https://github.com/denuoweb/handshake-browser-android/issues'
const SOURCE_URL = 'https://github.com/denuoweb/handshake-browser-android'

const localData = [
  'Browsing history: page URLs, page titles, and visit times.',
  'Website data: cookies and other WebView-managed site storage.',
  'Download records: URL, file name, MIME type, Android DownloadManager ID, and queued time for downloads started by the browser.',
  'HNS data: synced headers, peer records, verified resource values, resolver cache, and resolver diagnostics.',
  'Settings: homepage, cookie preference, Strict HNS mode, and related app preferences.',
]

const networkRequests = [
  'Websites and web services that you choose to open.',
  'Handshake peers and DNS seed hosts for header sync, peer discovery, and proof retrieval.',
  'Authoritative DNS nameservers for delegated HNS names.',
  'The configured HNS DNS-over-HTTPS compatibility resolver when compatibility mode is enabled and local or direct delegated resolution fails.',
  'Android DownloadManager destinations when you choose to download a file.',
]

const HnsBrowserPrivacyPage = ({
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
      <Card size="4" variant="surface">
        <Flex direction="column" gap="5">
          <Flex direction="column" gap="2">
            <Text color="indigo" size="1" weight="medium">
              Last updated: 2026-06-29
            </Text>
            <Heading size="8">HNS Browser Privacy Policy</Heading>
            <Text color="gray" size="3">
              HNS Browser is published by Denuo Web, LLC. For privacy questions or deletion requests, use the project issue tracker or the contact method listed by the developer in Google Play Console.
            </Text>
          </Flex>

          <PolicySection title="Summary">
            <Text>
              HNS Browser is a browser for Handshake (HNS), DNSSEC, and DANE testing. The app does not include advertising SDKs, analytics SDKs, developer-operated accounts, or paid feature unlocks. Donations are optional and do not unlock app functionality.
            </Text>
            <Text>
              The app stores browser data locally on the device and sends network requests needed to load sites and keep HNS resolution data current.
            </Text>
          </PolicySection>

          <PolicyList title="Data stored locally" items={localData} />

          <PolicySection title="How local data is used">
            <Text>
              Local data is used only to provide browser functionality, diagnostics, and HNS resolution. It is not sold. It is not sent to a Denuo Web analytics or advertising service.
            </Text>
          </PolicySection>

          <PolicyList title="Network requests" items={networkRequests} />

          <PolicySection title="Network data and security">
            <Text>
              Network endpoints may receive technical information that is normal for network communication, such as your IP address, the requested host or URL, protocol metadata, and any data you submit to websites. Strict HNS mode disables the third-party HNS DNS-over-HTTPS compatibility fallback.
            </Text>
            <Text>
              HTTPS, DNSSEC, and DANE are used where applicable. If you intentionally open a cleartext http:// site, that site connection is not encrypted by HTTPS.
            </Text>
          </PolicySection>

          <PolicySection title="Cookies and website data">
            <Text>
              Websites may set cookies or use WebView storage. HNS Browser provides Settings controls to block third-party cookies and delete cookies. Websites are responsible for their own privacy practices.
            </Text>
          </PolicySection>

          <PolicySection title="Data sharing">
            <Text>
              Denuo Web does not sell personal or sensitive user data. HNS Browser shares data only as necessary for user-requested browser functionality, such as loading a website, syncing HNS data, resolving a name, or downloading a file.
            </Text>
          </PolicySection>

          <PolicySection title="Retention and deletion">
            <Text>
              Local browser data remains on the device until you clear it or uninstall the app. The app provides Settings controls for clearing cookies, browsing history, download records, and the HNS resolver cache. Android system settings can also clear all app storage.
            </Text>
            <Text>
              HNS Browser does not create developer-operated user accounts, so there is no app account deletion flow.
            </Text>
          </PolicySection>

          <PolicySection title="Children">
            <Text>
              HNS Browser is not directed to children. Because it is a general-purpose browser, websites opened by users may contain third-party content outside Denuo Web&apos;s control.
            </Text>
          </PolicySection>

          <PolicySection title="Changes">
            <Text>
              This policy may be updated as the app changes. Material privacy changes should be reflected on this page, in the in-app privacy text, and in the Google Play Data safety form.
            </Text>
          </PolicySection>

          <Flex gap="3" wrap="wrap">
            <Button asChild>
              <Link to="/hns-browser">HNS Browser overview</Link>
            </Button>
            <Button asChild variant="soft">
              <RadixLink href={SUPPORT_URL} target="_blank" rel="noreferrer">
                Support / issues
              </RadixLink>
            </Button>
            <Button asChild variant="ghost">
              <RadixLink href={SOURCE_URL} target="_blank" rel="noreferrer">
                Source code
              </RadixLink>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </MarketingShell>
  )
}

const PolicySection = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box asChild>
    <section>
      <Flex direction="column" gap="2">
        <Heading size="5">{title}</Heading>
        {children}
      </Flex>
    </section>
  </Box>
)

const PolicyList = ({ title, items }: { title: string; items: string[] }) => (
  <PolicySection title={title}>
    <Box asChild pl="4" m="0">
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Text>{item}</Text>
          </li>
        ))}
      </ul>
    </Box>
  </PolicySection>
)

export default HnsBrowserPrivacyPage
