import { Box, Button, Card, Flex, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const SUPPORT_URL = 'https://github.com/Denuo-Web/hns-dane-browser/issues'
const SOURCE_URL = 'https://github.com/Denuo-Web/hns-dane-browser'

const privacyCopy = {
  en: {
    updated: 'Last updated: 2026-07-17',
    title: 'HNS DANE Browser Privacy Policy',
    intro: 'HNS DANE Browser is published by Denuo Web, LLC. For privacy questions or deletion requests, email info@denuoweb.com or use the developer contact listed in the app\'s store listing. Do not post personal information to the public project issue tracker.',
    summaryTitle: 'Summary',
    summary: [
      'HNS DANE Browser is a Handshake-first browser for local HNS proofs, authoritative DNS, an HNS P2P DNS relay, RFC 8484 DoH transport, DNSSEC, and DANE diagnostics. The app does not include advertising SDKs, analytics SDKs, developer-operated accounts, or paid feature unlocks. Donations are optional and do not unlock app functionality.',
      'The app stores browser data locally on the device and sends network requests needed to load sites and keep HNS resolution data current.',
    ],
    localTitle: 'Data stored locally',
    localData: [
      'Browsing history and navigation state: page URLs, page titles, visit times, or the current session\'s back-forward list, depending on the platform.',
      'Website data: cookies and other storage managed by Android WebView or Apple WebKit.',
      'Downloads: files saved at your request and platform-specific local records needed to complete or present those downloads. Android records may include the URL, file name, MIME type, DownloadManager ID, and queued time; iOS saves completed files in the app\'s local Documents/Downloads directory until you export or remove the app.',
      'HNS data: synced headers, peer records (including manually added relay-peer IP endpoints), verified resource values, resolver cache, and resolver diagnostics.',
      'Settings: homepage, cookie preference, HNS P2P DNS relay and legacy DoH fallback preferences, Strict HNS mode, and related app preferences.',
    ],
    useTitle: 'How local data is used',
    useText: 'Local data is used only to provide browser functionality, diagnostics, and HNS resolution. It is not sold. It is not sent to a Denuo Web analytics or advertising service.',
    networkTitle: 'Network requests',
    networkData: [
      'Websites and web services that you choose to open.',
      'Handshake peers and DNS seed hosts for header sync, peer discovery, and proof retrieval.',
      'Relay-capable Handshake peers for recursive HNS DNS queries after local proof validation and authoritative DNS attempts fail. Android new installs enable this experimental path by default; iOS leaves it disabled by default. A manual relay peer must be entered as an IP-literal endpoint and is stored only after its live HSD handshake advertises the relay capability.',
      'Authoritative DNS nameservers for delegated HNS names.',
      'Proof-bootstrapped or RFC 9461-discovered RFC 8484 authoritative DoH endpoints for delegated HNS names.',
      'Security or reputation services exposed by the platform web engine. In particular, an installed Android WebView provider may check URLs with its Safe Browsing service and apply its own privacy policy. Apple WebKit and the operating system may apply their own browser-security protections. HNS DANE Browser does not operate those platform services.',
      'The non-routable 192.0.2.1 TEST-NET DNS sentinel after delegated DNS failure; a matching reply confirms transparent outbound port 53 interception, while no reply is reported only as not detected.',
      'Cloudflare\'s DNS-over-HTTPS service at cloudflare-dns.com (bootstrapped through the documented 1.1.1.1 addresses) for ordinary ICANN DNS resolution.',
      'The legacy HNS DNS-over-HTTPS compatibility resolver at zorro.hnsdoh.com when compatibility mode is enabled and local or direct delegated resolution fails.',
      'Platform download services and the destination you choose when you download or export a file.',
    ],
    securityTitle: 'Network data and security',
    security: [
      'These network endpoints may receive technical information that is normal for network communication, such as your IP address, the requested host or URL, protocol metadata, and any data you submit to websites. Each DNS resolver may receive your IP address, queried DNS name and record type, timing, and protocol metadata. Cloudflare and the operator of zorro.hnsdoh.com control their own resolver logging, retention, and privacy practices; Denuo Web does not operate or control those services. In particular, an HNS relay peer can observe the queried DNS name and record type together with your P2P connection and network address. An ordinary Handshake TCP connection is not query-confidential; encrypted peer transport should be preferred where available. The relay response is still validated locally through the app\'s Handshake proof, DNSSEC, TLSA, and DANE checks, and the peer\'s DNS authenticated-data bit is not trusted.',
      'The legacy third-party HNS DNS-over-HTTPS compatibility fallback is independently enabled by default on new installs and remains available after the P2P relay path fails. Strict HNS mode disables that third-party fallback. Relay and legacy fallback controls are available in the app\'s runtime settings.',
      'HTTPS, DNSSEC, and DANE are used where applicable. If you intentionally open a cleartext http:// site, that site connection is not encrypted by HTTPS.',
    ],
    cookiesTitle: 'Cookies and website data',
    cookies: 'Websites may set cookies or use platform web-engine storage. Android provides settings controls to block third-party cookies and delete cookies plus WebView origin storage. The initial iOS release uses a persistent WebKit profile; its website data remains local to the app and is removed when the app is uninstalled. Websites are responsible for their own privacy practices.',
    sharingTitle: 'Data sharing',
    sharing: 'Denuo Web does not sell personal or sensitive user data. HNS DANE Browser shares data only as necessary for user-requested browser functionality, such as loading a website, syncing HNS data, resolving a name, or downloading a file.',
    retentionTitle: 'Retention and deletion',
    retention: [
      'Local browser data remains on the device until you clear it using an available platform or app control, or uninstall the app. Android provides controls for clearing cookies and WebView origin storage, browsing history, download records, gateway diagnostics, and the HNS resolver cache; Android system settings can also clear all app storage. The initial iOS release keeps its navigation list in the current app session, provides a resolver-cache control, and removes its app-local storage and WebKit profile when the app is uninstalled. Files you export to another location are then controlled by that destination.',
      'HNS DANE Browser does not create developer-operated user accounts, so there is no app account deletion flow.',
    ],
    childrenTitle: 'Children',
    children: "HNS DANE Browser is not directed to children. Because it is a general-purpose browser, websites opened by users may contain third-party content outside Denuo Web's control.",
    changesTitle: 'Changes',
    changes: 'This policy may be updated as the app changes. Material privacy changes should be reflected on this page, in the in-app privacy text, Google Play\'s Data safety form, and Apple\'s App Privacy answers as applicable.',
    overview: 'HNS DANE Browser overview',
    support: 'Support / issues',
    source: 'Source code',
  },
  ja: {
    updated: '最終更新日：2026年7月17日',
    title: 'HNS DANE Browser プライバシーポリシー',
    intro: 'HNS DANE BrowserはDenuo Web, LLCが公開しています。プライバシーに関する質問や削除依頼は、info@denuoweb.comまたはアプリストアに記載された開発者の連絡先をご利用ください。公開の課題管理には個人情報を投稿しないでください。',
    summaryTitle: '概要',
    summary: [
      'HNS DANE Browserは、ローカルHNS証明、権威DNS、HNS P2P DNSリレー、RFC 8484 DoH転送、DNSSEC、DANE診断に対応するHandshake優先ブラウザです。広告SDK、解析SDK、開発者運営のアカウント、有料機能解放はありません。寄付は任意であり、アプリ機能は解放されません。',
      'ブラウザデータは端末内に保存され、サイトの表示とHNS解決データの更新に必要なネットワーク通信を行います。',
    ],
    localTitle: '端末内に保存するデータ',
    localData: [
      '閲覧履歴とナビゲーション状態：プラットフォームに応じて、ページURL、ページタイトル、閲覧日時、または現在のセッションの「戻る・進む」リスト。',
      'ウェブサイトデータ：Android WebViewまたはApple WebKitが管理するCookieなどのストレージ。',
      'ダウンロード：利用者の操作で保存したファイルと、その処理や表示に必要なプラットフォーム固有のローカル記録。AndroidではURL、ファイル名、MIMEタイプ、DownloadManager ID、登録日時が含まれる場合があります。iOSでは、書き出すかアプリを削除するまで、完了したファイルをアプリ内のDocuments/Downloadsディレクトリに保存します。',
      'HNSデータ：同期済みヘッダー、ピア情報（手動で追加したリレーピアのIPエンドポイントを含む）、検証済みリソース値、リゾルバキャッシュ、リゾルバ診断情報。',
      '設定：ホームページ、Cookie設定、HNS P2P DNSリレーと従来DoHフォールバックの設定、厳格HNSモード、関連するアプリ設定。',
    ],
    useTitle: '端末内データの利用目的',
    useText: '端末内データは、ブラウザ機能、診断、HNS名前解決の提供にのみ使用します。販売せず、Denuo Webの解析・広告サービスへ送信することもありません。',
    networkTitle: 'ネットワーク通信',
    networkData: [
      '利用者が開くことを選んだウェブサイトとウェブサービス。',
      'ヘッダー同期、ピア探索、証明取得に使うHandshakeピアとDNSシードホスト。',
      'ローカル証明の検証と権威DNSへの接続に失敗した後、再帰的HNS DNSクエリに使用するリレー機能を持つHandshakeピア。Androidの新規インストールでは、この実験的な経路が初期状態で有効です。iOSでは初期状態で無効です。手動リレーピアはIPリテラルのエンドポイントとして入力する必要があり、実際のHSDハンドシェイクでリレー機能が通知された場合にのみ保存されます。',
      '委任されたHNS名の権威DNSネームサーバー。',
      '証明から起動するかRFC 9461で検出した、委任されたHNS名のRFC 8484権威DoHエンドポイント。',
      'プラットフォームのウェブエンジンが提供するセキュリティまたはレピュテーションサービス。特に、インストールされたAndroid WebViewプロバイダーはSafe BrowsingサービスでURLを確認し、独自のプライバシーポリシーを適用する場合があります。Apple WebKitとオペレーティングシステムも独自のブラウザセキュリティ保護を適用する場合があります。HNS DANE Browserはこれらのプラットフォームサービスを運営していません。',
      '委任DNSの失敗後に接続する、ルーティング不能な192.0.2.1 TEST-NET DNSセンチネル。一致する応答があれば外向きポート53の透過的な介入を確認し、応答がなければ「検出されず」とのみ表示します。',
      '通常のICANN DNS解決に使用する、cloudflare-dns.comのCloudflare DNS-over-HTTPSサービス（公開されている1.1.1.1アドレスを介して接続を開始します）。',
      '互換モードが有効で、ローカルまたは委任先での直接解決に失敗した場合に使用する、zorro.hnsdoh.comの従来HNS DNS-over-HTTPS互換リゾルバ。',
      'ファイルをダウンロードまたは書き出すときのプラットフォームのダウンロードサービスと利用者が選んだ保存先。',
    ],
    securityTitle: 'ネットワークデータと安全性',
    security: [
      '通信先には、IPアドレス、要求したホストまたはURL、プロトコル情報、ウェブサイトへ送信したデータなど、通常のネットワーク通信に伴う技術情報が届く場合があります。各DNSリゾルバは、利用者のIPアドレス、照会したDNS名とレコード種別、時刻、プロトコル情報を受信する場合があります。Cloudflareおよびzorro.hnsdoh.comの運営者は、それぞれのリゾルバのログ、保存期間、プライバシー慣行を管理しており、Denuo Webはこれらのサービスを運営または管理していません。特にHNSリレーピアは、照会したDNS名とレコード種別を、P2P接続およびネットワークアドレスとともに確認できます。通常のHandshake TCP接続ではクエリの機密性は保護されないため、利用できる場合は暗号化されたピア転送を優先してください。リレー応答はアプリのHandshake証明、DNSSEC、TLSA、DANE検査によって端末内で引き続き検証され、ピアのDNS認証済みデータビットは信頼されません。',
      '従来の第三者HNS DNS-over-HTTPS互換フォールバックは、新規インストールで個別に初期有効化され、P2Pリレー経路の失敗後も利用できます。厳格HNSモードではこの第三者フォールバックが無効になります。リレーと従来フォールバックの設定はアプリの実行時設定から変更できます。',
      '該当する場合はHTTPS、DNSSEC、DANEを使用します。暗号化されていないhttp://サイトを意図的に開いた場合、そのサイトとの通信はHTTPSで暗号化されません。',
    ],
    cookiesTitle: 'Cookieとウェブサイトデータ',
    cookies: 'ウェブサイトはCookieを設定し、プラットフォームのウェブエンジンのストレージを使用する場合があります。Androidでは、第三者Cookieを遮断し、CookieとWebViewのオリジンストレージを削除する設定があります。初期iOS版は永続的なWebKitプロファイルを使用します。そのウェブサイトデータはアプリ内に保持され、アプリをアンインストールすると削除されます。各ウェブサイトは、それぞれのプライバシー方針に責任を負います。',
    sharingTitle: 'データの共有',
    sharing: 'Denuo Webは個人データまたは機密性の高い利用者データを販売しません。HNS DANE Browserがデータを共有するのは、サイト表示、HNSデータ同期、名前解決、ファイルダウンロードなど、利用者が要求したブラウザ機能に必要な場合のみです。',
    retentionTitle: '保存期間と削除',
    retention: [
      '端末内のブラウザデータは、利用可能なプラットフォームまたはアプリの機能で消去するか、アプリをアンインストールするまで残ります。AndroidではCookieとWebViewのオリジンストレージ、閲覧履歴、ダウンロード記録、ゲートウェイ診断、HNSリゾルバキャッシュを消去でき、Androidのシステム設定から全アプリストレージを消去することもできます。初期iOS版はナビゲーションリストを現在のアプリセッション内に保持し、リゾルバキャッシュの消去機能を提供します。アプリをアンインストールするとアプリ内ストレージとWebKitプロファイルが削除されます。別の場所に書き出したファイルは、その保存先の管理下に移ります。',
      'HNS DANE Browserは開発者運営の利用者アカウントを作成しないため、アプリアカウントの削除手順はありません。',
    ],
    childrenTitle: '子どもの利用',
    children: 'HNS DANE Browserは子どもを対象としていません。汎用ブラウザであるため、利用者が開くウェブサイトにはDenuo Webが管理しない第三者コンテンツが含まれる場合があります。',
    changesTitle: '変更',
    changes: 'アプリの変更に伴い、本ポリシーを更新する場合があります。重要なプライバシー変更は、このページ、アプリ内のプライバシー表示、Google Playのデータセーフティ欄、AppleのApp Privacy回答に該当する範囲で反映します。',
    overview: 'HNS DANE Browserの概要',
    support: 'サポート / 課題報告',
    source: 'ソースコード',
  },
} as const

const HnsDaneBrowserPrivacyPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const page = privacyCopy[language]

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
            <Text color="indigo" size="1" weight="medium">{page.updated}</Text>
            <Heading size="8">{page.title}</Heading>
            <Text color="gray" size="3">{page.intro}</Text>
          </Flex>

          <PolicyParagraphs title={page.summaryTitle} paragraphs={page.summary} />
          <PolicyList title={page.localTitle} items={page.localData} />
          <PolicyParagraphs title={page.useTitle} paragraphs={[page.useText]} />
          <PolicyList title={page.networkTitle} items={page.networkData} />
          <PolicyParagraphs title={page.securityTitle} paragraphs={page.security} />
          <PolicyParagraphs title={page.cookiesTitle} paragraphs={[page.cookies]} />
          <PolicyParagraphs title={page.sharingTitle} paragraphs={[page.sharing]} />
          <PolicyParagraphs title={page.retentionTitle} paragraphs={page.retention} />
          <PolicyParagraphs title={page.childrenTitle} paragraphs={[page.children]} />
          <PolicyParagraphs title={page.changesTitle} paragraphs={[page.changes]} />

          <Flex gap="3" wrap="wrap">
            <Button asChild><Link to="/work/hns-dane-browser">{page.overview}</Link></Button>
            <Button asChild variant="soft">
              <RadixLink href={SUPPORT_URL} target="_blank" rel="noreferrer">{page.support}</RadixLink>
            </Button>
            <Button asChild variant="ghost">
              <RadixLink href={SOURCE_URL} target="_blank" rel="noreferrer">{page.source}</RadixLink>
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

const PolicyParagraphs = ({ title, paragraphs }: { title: string; paragraphs: readonly string[] }) => (
  <PolicySection title={title}>
    {paragraphs.map((paragraph) => <Text key={paragraph}>{paragraph}</Text>)}
  </PolicySection>
)

const PolicyList = ({ title, items }: { title: string; items: readonly string[] }) => (
  <PolicySection title={title}>
    <Box asChild pl="4" m="0">
      <ul>{items.map((item) => <li key={item}><Text>{item}</Text></li>)}</ul>
    </Box>
  </PolicySection>
)

export default HnsDaneBrowserPrivacyPage
