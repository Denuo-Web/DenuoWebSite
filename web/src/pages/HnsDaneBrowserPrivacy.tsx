import { Box, Button, Card, Flex, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const SUPPORT_URL = 'https://github.com/Denuo-Web/hns-dane-browser/issues'
const SOURCE_URL = 'https://github.com/Denuo-Web/hns-dane-browser'

const privacyCopy = {
  en: {
    updated: 'Last updated: 2026-06-29',
    title: 'HNS DANE Browser Privacy Policy',
    intro: 'HNS DANE Browser is published by Denuo Web, LLC. For privacy questions or deletion requests, use the project issue tracker or the contact method listed by the developer in Google Play Console.',
    summaryTitle: 'Summary',
    summary: [
      'HNS DANE Browser is a browser for Handshake (HNS), DNSSEC, and DANE testing. The app does not include advertising SDKs, analytics SDKs, developer-operated accounts, or paid feature unlocks. Donations are optional and do not unlock app functionality.',
      'The app stores browser data locally on the device and sends network requests needed to load sites and keep HNS resolution data current.',
    ],
    localTitle: 'Data stored locally',
    localData: [
      'Browsing history: page URLs, page titles, and visit times.',
      'Website data: cookies and other WebView-managed site storage.',
      'Download records: URL, file name, MIME type, Android DownloadManager ID, and queued time for downloads started by the browser.',
      'HNS data: synced headers, peer records, verified resource values, resolver cache, and resolver diagnostics.',
      'Settings: homepage, cookie preference, Strict HNS mode, and related app preferences.',
    ],
    useTitle: 'How local data is used',
    useText: 'Local data is used only to provide browser functionality, diagnostics, and HNS resolution. It is not sold. It is not sent to a Denuo Web analytics or advertising service.',
    networkTitle: 'Network requests',
    networkData: [
      'Websites and web services that you choose to open.',
      'Handshake peers and DNS seed hosts for header sync, peer discovery, and proof retrieval.',
      'Authoritative DNS nameservers for delegated HNS names.',
      'The configured HNS DNS-over-HTTPS compatibility resolver when compatibility mode is enabled and local or direct delegated resolution fails.',
      'Android DownloadManager destinations when you choose to download a file.',
    ],
    securityTitle: 'Network data and security',
    security: [
      'Network endpoints may receive technical information that is normal for network communication, such as your IP address, the requested host or URL, protocol metadata, and any data you submit to websites. Strict HNS mode disables the third-party HNS DNS-over-HTTPS compatibility fallback.',
      'HTTPS, DNSSEC, and DANE are used where applicable. If you intentionally open a cleartext http:// site, that site connection is not encrypted by HTTPS.',
    ],
    cookiesTitle: 'Cookies and website data',
    cookies: 'Websites may set cookies or use WebView storage. HNS DANE Browser provides Settings controls to block third-party cookies and delete cookies. Websites are responsible for their own privacy practices.',
    sharingTitle: 'Data sharing',
    sharing: 'Denuo Web does not sell personal or sensitive user data. HNS DANE Browser shares data only as necessary for user-requested browser functionality, such as loading a website, syncing HNS data, resolving a name, or downloading a file.',
    retentionTitle: 'Retention and deletion',
    retention: [
      'Local browser data remains on the device until you clear it or uninstall the app. The app provides Settings controls for clearing cookies, browsing history, download records, and the HNS resolver cache. Android system settings can also clear all app storage.',
      'HNS DANE Browser does not create developer-operated user accounts, so there is no app account deletion flow.',
    ],
    childrenTitle: 'Children',
    children: "HNS DANE Browser is not directed to children. Because it is a general-purpose browser, websites opened by users may contain third-party content outside Denuo Web's control.",
    changesTitle: 'Changes',
    changes: 'This policy may be updated as the app changes. Material privacy changes should be reflected on this page, in the in-app privacy text, and in the Google Play Data safety form.',
    overview: 'HNS DANE Browser overview',
    support: 'Support / issues',
    source: 'Source code',
  },
  ja: {
    updated: '最終更新日：2026年6月29日',
    title: 'HNS DANE Browser プライバシーポリシー',
    intro: 'HNS DANE BrowserはDenuo Web, LLCが公開しています。プライバシーに関する質問や削除依頼は、プロジェクトの課題管理またはGoogle Play Consoleに記載された開発者の連絡先をご利用ください。',
    summaryTitle: '概要',
    summary: [
      'HNS DANE Browserは、Handshake（HNS）、DNSSEC、DANEの検証に対応するブラウザです。広告SDK、解析SDK、開発者運営のアカウント、有料機能解放はありません。寄付は任意であり、アプリ機能は解放されません。',
      'ブラウザデータは端末内に保存され、サイトの表示とHNS解決データの更新に必要なネットワーク通信を行います。',
    ],
    localTitle: '端末内に保存するデータ',
    localData: [
      '閲覧履歴：ページURL、ページタイトル、閲覧日時。',
      'ウェブサイトデータ：CookieとWebViewが管理するその他のサイトストレージ。',
      'ダウンロード記録：URL、ファイル名、MIMEタイプ、Android DownloadManager ID、ブラウザから登録した日時。',
      'HNSデータ：同期済みヘッダー、ピア情報、検証済みリソース値、リゾルバキャッシュ、リゾルバ診断情報。',
      '設定：ホームページ、Cookie設定、厳格HNSモード、関連するアプリ設定。',
    ],
    useTitle: '端末内データの利用目的',
    useText: '端末内データは、ブラウザ機能、診断、HNS名前解決の提供にのみ使用します。販売せず、Denuo Webの解析・広告サービスへ送信することもありません。',
    networkTitle: 'ネットワーク通信',
    networkData: [
      '利用者が開くことを選んだウェブサイトとウェブサービス。',
      'ヘッダー同期、ピア探索、証明取得に使うHandshakeピアとDNSシードホスト。',
      '委任されたHNS名の権威DNSネームサーバー。',
      '互換モードが有効で、ローカルまたは委任先での直接解決に失敗した場合に使う、設定済みHNS DNS-over-HTTPS互換リゾルバ。',
      '利用者がファイルをダウンロードするときのAndroid DownloadManager送信先。',
    ],
    securityTitle: 'ネットワークデータと安全性',
    security: [
      '通信先には、IPアドレス、要求したホストまたはURL、プロトコル情報、ウェブサイトへ送信したデータなど、通常のネットワーク通信に必要な技術情報が届く場合があります。厳格HNSモードでは第三者HNS DNS-over-HTTPS互換フォールバックが無効になります。',
      '該当する場合はHTTPS、DNSSEC、DANEを使用します。暗号化されていないhttp://サイトを意図的に開いた場合、そのサイトとの通信はHTTPSで暗号化されません。',
    ],
    cookiesTitle: 'Cookieとウェブサイトデータ',
    cookies: 'ウェブサイトはCookieを設定し、WebViewストレージを使用する場合があります。HNS DANE Browserには、第三者Cookieの遮断とCookie削除の設定があります。各ウェブサイトは、それぞれのプライバシー方針に責任を負います。',
    sharingTitle: 'データの共有',
    sharing: 'Denuo Webは個人データまたは機密性の高い利用者データを販売しません。HNS DANE Browserがデータを共有するのは、サイト表示、HNSデータ同期、名前解決、ファイルダウンロードなど、利用者が要求したブラウザ機能に必要な場合のみです。',
    retentionTitle: '保存期間と削除',
    retention: [
      '端末内のブラウザデータは、利用者が消去するかアプリをアンインストールするまで残ります。アプリの設定からCookie、閲覧履歴、ダウンロード記録、HNSリゾルバキャッシュを削除できます。Androidのシステム設定から全アプリストレージを消去することもできます。',
      'HNS DANE Browserは開発者運営の利用者アカウントを作成しないため、アプリアカウントの削除手順はありません。',
    ],
    childrenTitle: '子どもの利用',
    children: 'HNS DANE Browserは子どもを対象としていません。汎用ブラウザであるため、利用者が開くウェブサイトにはDenuo Webが管理しない第三者コンテンツが含まれる場合があります。',
    changesTitle: '変更',
    changes: 'アプリの変更に伴い、本ポリシーを更新する場合があります。重要なプライバシー変更は、このページ、アプリ内のプライバシー表示、Google Playのデータセーフティ欄に反映します。',
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
