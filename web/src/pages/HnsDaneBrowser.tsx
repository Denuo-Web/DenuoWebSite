import { Badge, Box, Button, Card, Flex, Grid, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const PRIVACY_URL = '/work/shakescape/privacy'
const SOURCE_URL = 'https://github.com/handshake-rs/hns-dane-browser-mobile'
const SUPPORT_URL = 'https://github.com/handshake-rs/hns-dane-browser-mobile/issues'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.denuoweb.hnsdane'
const APPLE_APP_STORE_URL = 'https://apps.apple.com/us/app/hns-dane-browser/id6791914326'
const ANDROID_PACKAGE = 'com.denuoweb.hnsdane'
const IOS_BUNDLE_ID = 'com.denuoweb.hnsdane.ios'

const pageCopy = {
  en: {
    eyebrow: 'Denuo Web product',
    title: 'Shakescape',
    lead: 'An open-source Android and iOS browser for Handshake names, DNSSEC, DANE validation, and resolver diagnostics.',
    googlePlay: 'Get it on Google Play',
    appleAppStore: 'Download on the App Store',
    source: 'Source code',
    privacy: 'Privacy policy',
    support: 'Support / issues',
    androidPackageLabel: 'Android package',
    iosBundleLabel: 'iOS bundle ID',
    badges: ['No ads', 'No developer account system', 'Android donations unlock no features; iOS has no payments'],
    features: [
      {
        title: 'Local HNS proof path',
        body: 'Syncs Handshake headers and verifies HNS resource proofs locally before routing browser requests.',
      },
      {
        title: 'DNSSEC and DANE diagnostics',
        body: 'Shows resolver trace, HNS proof details, TLSA state, DANE result, and the selected resolution path or failure reason.',
      },
      {
        title: 'Fail-closed HNS security',
        body: 'HNS resolution always fails closed when local proof, DNSSEC, TLSA, or DANE validation cannot establish a secure result; it never falls back to HNS WebPKI.',
      },
    ],
    privacyHeading: 'Privacy summary',
    privacySummary:
      'Shakescape has no advertising SDKs, analytics SDKs, developer-operated accounts, or paid feature unlocks. Currently published store binaries are wallet-free. The 0.5.9 candidate adds native lifecycle controls for one device-local non-value HNS account identity and visible read-only balance, receive, history, tracked-name, and status rows. It provisions no scoped credential or indexed wallet backend, so those rows remain unavailable and make no wallet-specific network request. Transfers, name import/actions, website-provider access, HNSA/HNSR service roles, settlement, exchange, and P2P marketplaces remain unavailable. Its requester-only P2P DNS relay is separate from HNSR and does not make the device an output node. Android may show an optional external donation link that unlocks no functionality; iOS has no donation or payment flow.',
    localHeading: 'Stored locally',
    localData: [
      'Browsing history and navigation state: page URLs, page titles, visit times, or the current session\'s back-forward list, depending on the platform.',
      'Website data: cookies and other storage managed by Android WebView or Apple WebKit.',
      'Downloads: files saved at your request and platform-specific records used to complete or present them.',
      'HNS data: synced headers, peer records, verified resource values, resolver cache, and diagnostics.',
      'Settings: homepage, cookie preference, optional requester-only HNS P2P DNS relay, separately configured recursive HNS DoH recovery URL, and related preferences. Relay consumption and recursive recovery are independently off by default and require separate explicit choices.',
      '0.5.9 candidate native wallet data: a network-scoped encrypted database, one non-value HNS account identity, and a device-bound database key. A generated recovery phrase is shown only once for offline backup; leaving before confirmation wipes the pending key and deletes the incomplete database. No wallet-backend credential is stored in this candidate.',
    ],
    networkHeading: 'Network requests',
    networkData: [
      'Websites and web services that you choose to open.',
      'Handshake peers and DNS seed hosts for header sync, peer discovery, and proof retrieval.',
      'Relay-capable Handshake peers for recursive HNS DNS queries only after you explicitly enable requester-only consumption; the browser does not become an output node.',
      'Authoritative DNS nameservers and proof-bootstrapped or RFC 9461-discovered authoritative DoH endpoints for delegated HNS names.',
      'A recursive HNS DoH endpoint entered explicitly by you, only after direct authoritative DNS, owner-published authoritative DoH, and any independently enabled P2P requester path fail because DNS transport is unavailable or intercepted. The setting is blank and off by default.',
      'Cloudflare DNS-over-HTTPS at cloudflare-dns.com for ordinary ICANN DNS resolution.',
      'Platform download services and the destination you choose when you download or export a file.',
    ],
    privacyNote:
      'Android can clear cookies and WebView origin storage, history, download records, gateway diagnostics, and the HNS resolver cache. iOS can clear cookies and WebKit website data, history, download-list records, locally stored gateway diagnostics, and the HNS resolver cache; clearing the list does not delete downloaded files. The 0.5.9 candidate has no in-app delete control for a confirmed wallet. Clear all Android app storage or uninstall the app to remove Android wallet data; uninstalling iOS removes its app-container database, and a later wallet-screen open reconciles an orphaned ThisDeviceOnly Keychain item. Save the one-time recovery phrase first.',
  },
  ja: {
    eyebrow: 'Denuo Web プロダクト',
    title: 'Shakescape',
    lead: 'Handshake名、DNSSEC、DANE検証、リゾルバ診断に対応する、Android・iOS向けのオープンソースブラウザです。',
    googlePlay: 'Google Playで入手',
    appleAppStore: 'App Storeからダウンロード',
    source: 'ソースコード',
    privacy: 'プライバシーポリシー',
    support: 'サポート / 課題報告',
    androidPackageLabel: 'Androidパッケージ',
    iosBundleLabel: 'iOSバンドルID',
    badges: ['広告なし', '開発者運営のアカウントなし', 'Androidの寄付で機能解放なし・iOSに支払い機能なし'],
    features: [
      {
        title: 'ローカルHNS証明経路',
        body: 'Handshakeヘッダーを同期し、ブラウザ通信を振り分ける前にHNSリソース証明を端末上で検証します。',
      },
      {
        title: 'DNSSECとDANEの診断',
        body: 'リゾルバの追跡、HNS証明の詳細、TLSA状態、DANE結果、選択された解決経路または失敗理由を表示します。',
      },
      {
        title: 'フェイルクローズのHNSセキュリティ',
        body: 'ローカル証明、DNSSEC、TLSA、DANEの検証で安全な結果を確立できない場合、HNS解決は常に接続を停止し、HNSでWebPKIにフォールバックすることはありません。',
      },
    ],
    privacyHeading: 'プライバシー概要',
    privacySummary:
      'Shakescapeには、広告SDK、解析SDK、開発者運営のアカウント、有料機能解放はありません。現在ストアで公開されているバイナリにはウォレット機能がありません。0.5.9候補は端末内の1つの非送金型HNSアカウント識別子を管理するネイティブ操作と、残高、受取先、取引履歴、追跡名、状態の読み取り専用欄を追加します。ただしスコープ付き認証情報やインデックス対応ウォレットバックエンドは設定されないため、これらの欄は利用不可のままで、ウォレット固有のネットワーク要求も行いません。送金、名前の取り込み・操作、ウェブサイトへのウォレット接続、HNSA/HNSRのサービス役割、決済、交換、P2Pマーケットプレイスは提供しません。リクエスター専用P2P DNSリレーはHNSRとは別で、端末を出力ノードにしません。Androidでは機能を解放しない任意の外部寄付リンクを表示する場合がありますが、iOSには寄付や支払いの機能がありません。',
    localHeading: '端末内に保存するデータ',
    localData: [
      '閲覧履歴とナビゲーション状態：プラットフォームに応じて、ページURL、ページタイトル、訪問時刻、または現在のセッションの「戻る・進む」リスト。',
      'ウェブサイトデータ：Android WebViewまたはApple WebKitが管理するCookieなどのストレージ。',
      'ダウンロード：利用者の操作で保存したファイルと、その処理や表示に必要なプラットフォーム固有の記録。',
      'HNSデータ：同期済みヘッダー、ピア情報、検証済みリソース値、リゾルバキャッシュ、診断情報。',
      '設定：ホームページ、Cookie設定、任意のリクエスター専用HNS P2P DNSリレー、別途設定する再帰的HNS DoH復旧URL、関連するアプリ設定。リレー利用と再帰的復旧はそれぞれ初期状態で無効であり、個別に明示的な選択が必要です。',
      '0.5.9候補のネイティブウォレットデータ：ネットワーク別の暗号化データベース、1つの非送金型HNSアカウント識別子、端末に結び付いたデータベース鍵。新規生成したリカバリーフレーズはオフライン保管用に一度だけ表示され、確認前に画面を離れると未確認の鍵を消去して不完全なデータベースを削除します。この候補はウォレットバックエンド認証情報を保存しません。',
    ],
    networkHeading: 'ネットワーク通信',
    networkData: [
      '利用者が開くことを選んだウェブサイトとウェブサービス。',
      'ヘッダー同期、ピア探索、証明取得に使うHandshakeピアとDNSシードホスト。',
      '利用者がリクエスター専用の利用を明示的に有効にした場合に限り、再帰的HNS DNSクエリを処理するリレー機能付きHandshakeピア。ブラウザが出力ノードになることはありません。',
      '委任されたHNS名の権威DNSネームサーバーと、証明からブートストラップまたはRFC 9461で検出された権威DoHエンドポイント。',
      '利用者が明示的に入力した再帰的HNS DoHエンドポイント。DNS通信が利用不能または傍受され、直接の権威DNS、所有者が公開した権威DoH、個別に有効化したP2Pリクエスター経路が失敗した後に限り使用します。この設定は初期状態では空欄で無効です。',
      '通常のICANN DNS解決に使用するcloudflare-dns.comのCloudflare DNS-over-HTTPS。',
      'ファイルをダウンロードまたは書き出すときのプラットフォームのダウンロードサービスと利用者が選んだ保存先。',
    ],
    privacyNote:
      'AndroidではCookieとWebViewのオリジンストレージ、履歴、ダウンロード記録、ゲートウェイ診断、HNSリゾルバキャッシュを消去できます。iOSではCookieとWebKitウェブサイトデータ、履歴、ダウンロード一覧、ゲートウェイ診断、HNSリゾルバキャッシュを消去できますが、一覧を消去してもダウンロード済みファイルは削除されません。0.5.9候補には確認済みウォレットをアプリ内で削除する操作がありません。Androidでは全アプリストレージの消去またはアンインストールでウォレットデータを削除します。iOSではアンインストールでアプリコンテナ内データベースを削除し、後でウォレット画面を開くと孤立したThisDeviceOnly Keychain項目を照合して削除します。その前に一度だけ表示されるリカバリーフレーズを保存してください。',
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
                <RadixLink href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">{page.googlePlay}</RadixLink>
              </Button>
              <Button asChild size="3">
                <RadixLink href={APPLE_APP_STORE_URL} target="_blank" rel="noreferrer">{page.appleAppStore}</RadixLink>
              </Button>
              <Button asChild size="3" variant="soft">
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
