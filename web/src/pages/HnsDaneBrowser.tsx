import { Badge, Box, Button, Card, Flex, Grid, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const PRIVACY_URL = '/work/hns-dane-browser/privacy'
const SOURCE_URL = 'https://github.com/Denuo-Web/hns-dane-browser'
const SUPPORT_URL = 'https://github.com/Denuo-Web/hns-dane-browser/issues'
const ANDROID_PACKAGE = 'com.denuoweb.hnsdane'
const IOS_BUNDLE_ID = 'com.denuoweb.hnsdane.ios'

const pageCopy = {
  en: {
    eyebrow: 'Denuo Web product',
    title: 'HNS DANE Browser',
    lead: 'An open-source Android and iOS browser for Handshake names, DNSSEC, DANE validation, and resolver diagnostics.',
    source: 'Source code',
    privacy: 'Privacy policy',
    support: 'Support / issues',
    androidPackageLabel: 'Android package',
    iosBundleLabel: 'iOS bundle ID',
    badges: ['No ads', 'No developer account system', 'Donations unlock no features'],
    features: [
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
    ],
    privacyHeading: 'Privacy summary',
    privacySummary:
      'HNS DANE Browser does not include advertising SDKs, analytics SDKs, developer-operated accounts, or paid feature unlocks. The app stores browser data locally on the device and sends network requests needed to load sites and keep HNS resolution data current.',
    localHeading: 'Stored locally',
    localData: [
      'Browsing history and navigation state: persistent history on Android or the current session\'s back-forward list on iOS.',
      'Website data: cookies and other storage managed by Android WebView or Apple WebKit.',
      'Downloads: files saved at your request and platform-specific records used to complete or present them.',
      'HNS data: synced headers, peer records, verified resource values, resolver cache, and diagnostics.',
      'Settings: homepage, cookie preference, relay and legacy fallback preferences, Strict HNS mode, and related preferences.',
    ],
    networkHeading: 'Network requests',
    networkData: [
      'Websites and web services that you choose to open.',
      'Handshake peers and DNS seed hosts for header sync, peer discovery, and proof retrieval.',
      'Relay-capable Handshake peers for recursive HNS DNS queries when enabled.',
      'Authoritative DNS nameservers and authoritative DoH endpoints for delegated HNS names.',
      'Cloudflare DNS-over-HTTPS at cloudflare-dns.com for ordinary ICANN DNS resolution.',
      'The legacy HNS compatibility resolver at zorro.hnsdoh.com when enabled and earlier HNS resolution paths fail.',
      'Platform download services and the destination you choose when you download or export a file.',
    ],
    privacyNote:
      'Privacy controls differ by platform. Android provides controls for clearing local browser data. The initial iOS release provides resolver-cache clearing and removes app-local data and its WebKit profile when uninstalled. Strict HNS mode disables the third-party HNS DoH compatibility fallback.',
  },
  ja: {
    eyebrow: 'Denuo Web プロダクト',
    title: 'HNS DANE Browser',
    lead: 'Handshake名、DNSSEC、DANE検証、リゾルバ診断に対応する、Android・iOS向けのオープンソースブラウザです。',
    source: 'ソースコード',
    privacy: 'プライバシーポリシー',
    support: 'サポート / 課題報告',
    androidPackageLabel: 'Androidパッケージ',
    iosBundleLabel: 'iOSバンドルID',
    badges: ['広告なし', '開発者運営のアカウントなし', '寄付による機能解放なし'],
    features: [
      {
        title: 'ローカルHNS証明経路',
        body: 'Handshakeヘッダーを同期し、ブラウザ通信を振り分ける前にHNSリソース証明を端末上で検証します。',
      },
      {
        title: 'DNSSECとDANEの診断',
        body: 'リゾルバの追跡、HNS証明の詳細、TLSA状態、DANE結果、互換フォールバックの理由を表示します。',
      },
      {
        title: '厳格HNSモード',
        body: '第三者HNS DoHフォールバックを無効にし、ローカルまたは委任先での直接解決に失敗した場合は接続を停止できます。',
      },
    ],
    privacyHeading: 'プライバシー概要',
    privacySummary:
      'HNS DANE Browserには、広告SDK、解析SDK、開発者運営のアカウント、有料機能解放はありません。ブラウザデータは端末内に保存され、サイトの表示とHNS解決データの更新に必要な通信のみを行います。',
    localHeading: '端末内に保存するデータ',
    localData: [
      '閲覧履歴とナビゲーション状態：Androidでは保存された履歴、iOSでは現在のセッションの「戻る・進む」リスト。',
      'ウェブサイトデータ：Android WebViewまたはApple WebKitが管理するCookieなどのストレージ。',
      'ダウンロード：利用者の操作で保存したファイルと、その処理や表示に必要なプラットフォーム固有の記録。',
      'HNSデータ：同期済みヘッダー、ピア情報、検証済みリソース値、リゾルバキャッシュ、診断情報。',
      '設定：ホームページ、Cookie設定、リレーと従来フォールバックの設定、厳格HNSモード、関連するアプリ設定。',
    ],
    networkHeading: 'ネットワーク通信',
    networkData: [
      '利用者が開くことを選んだウェブサイトとウェブサービス。',
      'ヘッダー同期、ピア探索、証明取得に使うHandshakeピアとDNSシードホスト。',
      '有効な場合に再帰的HNS DNSクエリを処理する、リレー機能を持つHandshakeピア。',
      '委任されたHNS名の権威DNSネームサーバーと権威DoHエンドポイント。',
      '通常のICANN DNS解決に使用するcloudflare-dns.comのCloudflare DNS-over-HTTPS。',
      '有効な場合に、それ以前のHNS解決経路が失敗した後で使用するzorro.hnsdoh.comの従来HNS互換リゾルバ。',
      'ファイルをダウンロードまたは書き出すときのプラットフォームのダウンロードサービスと利用者が選んだ保存先。',
    ],
    privacyNote:
      'プライバシー管理機能はプラットフォームによって異なります。Androidではローカルのブラウザデータを消去できます。初期iOS版ではリゾルバキャッシュを消去でき、アンインストールするとアプリ内データとWebKitプロファイルが削除されます。厳格HNSモードでは第三者HNS DoH互換フォールバックが無効になります。',
  },
} as const

const HnsDaneBrowserPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const page = pageCopy[language]

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
              <Text color="indigo" size="1" weight="medium">{page.eyebrow}</Text>
              <Heading size="8">{page.title}</Heading>
              <Text size="4" color="gray">{page.lead}</Text>
            </Flex>
            <Flex gap="3" wrap="wrap">
              <Button asChild size="3">
                <RadixLink href={SOURCE_URL} target="_blank" rel="noreferrer">{page.source}</RadixLink>
              </Button>
              <Button asChild size="3" variant="soft">
                <Link to={PRIVACY_URL}>{page.privacy}</Link>
              </Button>
              <Button asChild size="3" variant="ghost">
                <RadixLink href={SUPPORT_URL} target="_blank" rel="noreferrer">{page.support}</RadixLink>
              </Button>
            </Flex>
            <Flex gap="2" wrap="wrap">
              <Badge color="indigo">{page.androidPackageLabel}: {ANDROID_PACKAGE}</Badge>
              <Badge color="indigo">{page.iosBundleLabel}: {IOS_BUNDLE_ID}</Badge>
              {page.badges.map((badge) => <Badge key={badge} variant="soft">{badge}</Badge>)}
            </Flex>
          </Flex>
        </Card>

        <Grid columns={{ initial: '1', sm: '3' }} gap="3">
          {page.features.map((feature) => (
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
            <Heading size="6">{page.privacyHeading}</Heading>
            <Text color="gray">{page.privacySummary}</Text>
            <Grid columns={{ initial: '1', md: '2' }} gap="3">
              <Box>
                <Heading size="4" mb="2">{page.localHeading}</Heading>
                <CopyList items={page.localData} />
              </Box>
              <Box>
                <Heading size="4" mb="2">{page.networkHeading}</Heading>
                <CopyList items={page.networkData} />
              </Box>
            </Grid>
            <Text color="gray" size="2">{page.privacyNote}</Text>
          </Flex>
        </Card>
      </Flex>
    </MarketingShell>
  )
}

const CopyList = ({ items }: { items: readonly string[] }) => (
  <Box asChild pl="4" m="0">
    <ul>
      {items.map((item) => <li key={item}><Text>{item}</Text></li>)}
    </ul>
  </Box>
)

export default HnsDaneBrowserPage
