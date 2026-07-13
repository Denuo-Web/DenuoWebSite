import { Badge, Box, Button, Card, Flex, Grid, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const PRIVACY_URL = '/work/hns-dane-browser/privacy'
const SOURCE_URL = 'https://github.com/Denuo-Web/hns-dane-browser-android'
const SUPPORT_URL = 'https://github.com/Denuo-Web/hns-dane-browser-android/issues'
const PLAY_PACKAGE = 'com.handshake.browser'

const pageCopy = {
  en: {
    eyebrow: 'Denuo Web product',
    title: 'HNS DANE Browser',
    lead: 'An experimental Android browser for Handshake names, DNSSEC, DANE validation, and resolver diagnostics.',
    source: 'Source code',
    privacy: 'Privacy policy',
    support: 'Support / issues',
    packageLabel: 'Android package',
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
      'Browsing history: page URLs, page titles, and visit times.',
      'Website data: cookies and WebView-managed site storage.',
      'Download records: URL, file name, MIME type, Android DownloadManager ID, and queued time.',
      'HNS data: synced headers, peer records, verified resource values, resolver cache, and diagnostics.',
      'Settings: homepage, cookie preference, Strict HNS mode, and related preferences.',
    ],
    networkHeading: 'Network requests',
    networkData: [
      'Websites and web services that you choose to open.',
      'Handshake peers and DNS seed hosts for header sync, peer discovery, and proof retrieval.',
      'Authoritative DNS nameservers for delegated HNS names.',
      'The configured HNS DNS-over-HTTPS compatibility resolver when compatibility mode is enabled and local or direct delegated resolution fails.',
      'Android DownloadManager destinations when you choose to download a file.',
    ],
    privacyNote:
      'Users can clear cookies, browsing history, download records, resolver cache, or all app data through Android settings. Strict HNS mode disables the third-party HNS DoH compatibility fallback.',
  },
  ja: {
    eyebrow: 'Denuo Web プロダクト',
    title: 'HNS DANE Browser',
    lead: 'Handshake名、DNSSEC、DANE検証、リゾルバ診断のための実験的Androidブラウザです。',
    source: 'ソースコード',
    privacy: 'プライバシーポリシー',
    support: 'サポート / 課題報告',
    packageLabel: 'Androidパッケージ',
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
      '閲覧履歴：ページURL、ページタイトル、閲覧日時。',
      'ウェブサイトデータ：CookieとWebViewが管理するサイトストレージ。',
      'ダウンロード記録：URL、ファイル名、MIMEタイプ、Android DownloadManager ID、登録日時。',
      'HNSデータ：同期済みヘッダー、ピア情報、検証済みリソース値、リゾルバキャッシュ、診断情報。',
      '設定：ホームページ、Cookie設定、厳格HNSモード、関連するアプリ設定。',
    ],
    networkHeading: 'ネットワーク通信',
    networkData: [
      '利用者が開くことを選んだウェブサイトとウェブサービス。',
      'ヘッダー同期、ピア探索、証明取得に使うHandshakeピアとDNSシードホスト。',
      '委任されたHNS名の権威DNSネームサーバー。',
      '互換モードが有効で、ローカルまたは委任先での直接解決に失敗した場合に使う、設定済みHNS DNS-over-HTTPS互換リゾルバ。',
      '利用者がファイルをダウンロードするときのAndroid DownloadManager送信先。',
    ],
    privacyNote:
      'Cookie、閲覧履歴、ダウンロード記録、リゾルバキャッシュはアプリ内で削除でき、Android設定から全アプリデータを消去できます。厳格HNSモードでは第三者HNS DoH互換フォールバックが無効になります。',
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
              <Badge color="indigo">{page.packageLabel}: {PLAY_PACKAGE}</Badge>
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
