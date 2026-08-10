import { Box, Button, Card, Flex, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const SUPPORT_URL = 'https://github.com/handshake-rs/hns-dane-browser-mobile/issues'
const SOURCE_URL = 'https://github.com/handshake-rs/hns-dane-browser-mobile'

const privacyCopy = {
  en: {
    updated: 'Last updated: 2026-08-10',
    title: 'HNS DANE Browser Privacy Policy',
    intro: 'HNS DANE Browser is published by Denuo Web, LLC. For privacy questions or deletion requests, email info@denuoweb.com or use the developer contact listed in the app\'s store listing. Do not post personal information to the public project issue tracker.',
    summaryTitle: 'Summary',
    summary: [
      'HNS DANE Browser is a Handshake-first browser for local HNS proofs, authoritative DNS, optional requester-only HNS P2P DNS relay consumption, optional user-configured recursive HNS DoH recovery, DNSSEC, and DANE diagnostics. The currently published store binaries are wallet-free. The 0.5.9 candidate, once distributed, adds native controls to create or restore one device-local non-value HNS account identity and to open, unlock, or lock that local wallet, plus visible read-only rows for balance, receive target, transaction history, tracked names, and module status. It does not provision the required scoped loopback credential or indexed wallet backend, so those rows remain unavailable and make no wallet-specific network request. It cannot send funds, import or manage names, provide website-provider access, participate in HNSA or HNSR service roles, settle trades, provide exchange features, or expose P2P marketplaces. The requester-only P2P DNS relay is separate from HNSR and does not make the device a relay endpoint or output node. The app has no advertising SDKs, analytics SDKs, developer-operated accounts, or paid feature unlocks. The Android edition may show an optional external donation link that does not unlock functionality; the iOS app has no donation or payment flow.',
      'The app stores browser and native wallet data locally on the device and sends network requests needed to load sites and keep HNS resolution data current.',
    ],
    localTitle: 'Data stored locally',
    localData: [
      'Browsing history and navigation state: page URLs, page titles, visit times, or the current session\'s back-forward list, depending on the platform.',
      'Website data: cookies and other storage managed by Android WebView or Apple WebKit.',
      'Downloads: files saved at your request and platform-specific local records needed to complete or present those downloads. Android records may include the URL, file name, MIME type, DownloadManager ID, and queued time; iOS saves completed files in the app\'s local Documents/Downloads directory until you export or remove the app.',
      'HNS data: synced headers, peer records (including manually added relay-peer IP endpoints), verified resource values, resolver cache, and resolver diagnostics.',
      'Settings: homepage, cookie preference, optional HNS P2P DNS relay requester, optional user-configured recursive HNS DoH recovery URL, and related app preferences. Relay consumption and recursive recovery are independently off by default and require separate explicit choices. Upgrades erase the historical resolver key and never copy it into the new recovery setting or treat it as relay consent.',
      '0.5.9 candidate native wallet data: a network-scoped encrypted wallet database, one non-value HNS account identity, and the key material needed to reopen it. Android keeps the database under app-private no-backup storage and wraps its 32-byte database key with Android Keystore. iOS uses an app-private, backup-excluded database with complete file protection and a ThisDeviceOnly Keychain item requiring user presence. A newly generated recovery phrase is shown once for offline backup; restore input and the one-time display are cleared when the wallet screen leaves its protected lifecycle. If the screen closes before that display is confirmed, the app wipes its unconfirmed database-key buffer and deletes the incomplete wallet database. Swift/UIKit-managed text on iOS cannot be claimed to be deterministically zeroized, although app-owned mutable buffers are wiped. The candidate stores no scoped wallet-backend credential; its visible synchronized-read rows remain unavailable.',
    ],
    useTitle: 'How local data is used',
    useText: 'Local data is used only to provide browser functionality, native wallet controls, diagnostics, and HNS resolution. It is not sold. It is not sent to a Denuo Web analytics or advertising service.',
    networkTitle: 'Network requests',
    networkData: [
      'Websites and web services that you choose to open.',
      'Handshake peers and DNS seed hosts for header sync, peer discovery, and proof retrieval.',
      'Relay-capable Handshake peers for recursive HNS DNS queries after local proof validation and authoritative DNS attempts fail, but only after the user opts into requester consumption. Upgrades preserve an independent relay choice and never convert a former public-DoH or compatibility choice into consent. A manual relay peer must be entered as an IP-literal endpoint and is stored only after its live HSD handshake advertises the relay capability. The browser does not become an output node.',
      'Authoritative DNS nameservers for delegated HNS names.',
      'Proof-bootstrapped or RFC 9461-discovered RFC 8484 authoritative DoH endpoints for delegated HNS names.',
      'A recursive HNS DNS-over-HTTPS endpoint entered explicitly by the user, but only after direct authoritative DNS, owner-published proof-anchored authoritative DoH, and any independently enabled P2P requester path fail because port 53 is intercepted or DNS transport is unavailable. Leaving the setting blank makes no request to such a service. https://hnsdoh.com/dns-query is an example only; it is never prefilled, selected automatically, or contacted unless the user enters it.',
      'Security or reputation services exposed by the platform web engine. In particular, an installed Android WebView provider may check URLs with its Safe Browsing service and apply its own privacy policy. Apple WebKit and the operating system may apply their own browser-security protections. HNS DANE Browser does not operate those platform services.',
      'The non-routable 192.0.2.1 TEST-NET DNS sentinel after delegated DNS failure; a matching reply confirms transparent outbound port 53 interception, while no reply is reported only as not detected.',
      'Cloudflare\'s DNS-over-HTTPS service at cloudflare-dns.com (bootstrapped through the documented 1.1.1.1 addresses) for ordinary internet DNS resolution.',
      'Platform download services and the destination you choose when you download or export a file.',
      'The 0.5.9 candidate contains a bounded read-only wallet projection, but the app provisions no scoped loopback credential or indexed wallet backend. The visible balance, receive, history, tracked-name, and status rows therefore remain unavailable, and the native wallet makes no wallet-specific network request. It cannot send a transaction, contact a website wallet provider, or settle a trade; its available account controls are device-local.',
    ],
    securityTitle: 'Network data and security',
    security: [
      'These network endpoints may receive technical information that is normal for network communication, such as your IP address, the requested host or URL, protocol metadata, and any data you submit to websites. Cloudflare controls its own resolver logging, retention, and privacy practices; Denuo Web does not operate that service. In particular, an HNS relay peer or a user-configured recursive HNS DoH operator can observe queried DNS names and record types, request timing, and the source IP address. An ordinary Handshake TCP connection is not query-confidential; encrypted peer transport should be preferred where available. Relay and configured-recursive responses are still validated locally through the app\'s Handshake proof, DNSSEC, TLSA, and DANE checks; neither a peer\'s DNS authenticated-data bit nor a resolver\'s trust assertion is accepted as proof.',
      'The app has no automatic or default recursive HNS resolver. If the user explicitly configures a recovery endpoint, the app validates its bounded HTTPS URL, resolves its hostname only through validating ICANN DoH, connects only to public addresses with WebPKI, and still validates HNS answers locally. Bogus DNSSEC, invalid DNS, DNS response codes, and stale or missing HNS proof state remain terminal instead of activating recovery. HNS WebPKI fallback remains prohibited. Every complete DNS hostname is also resolved through bounded validating ICANN DoH for dual-root classification; ICANN WebPKI is allowed only after authenticated TLSA denial or a proven unsigned zone.',
      'HTTPS, DNSSEC, and DANE are used where applicable. If you intentionally open a cleartext http:// site, that site connection is not encrypted by HTTPS.',
    ],
    cookiesTitle: 'Cookies and website data',
    cookies: 'Websites may set cookies or use platform web-engine storage. Android provides settings controls to block third-party cookies and delete cookies plus WebView origin storage. iOS uses a persistent WebKit profile and provides a settings action that deletes its cookies and website data. Remaining website data is removed when the app is uninstalled. Websites are responsible for their own privacy practices.',
    sharingTitle: 'Data sharing',
    sharing: 'Denuo Web does not sell personal or sensitive user data. HNS DANE Browser shares data only as necessary for user-requested browser functionality, such as loading a website, syncing HNS data, resolving a name, or downloading a file. The 0.5.9 candidate does not send native wallet databases, recovery phrases, device-bound database keys, account identities, or wallet read data to Denuo Web, websites, analytics services, or a wallet provider.',
    retentionTitle: 'Retention and deletion',
    retention: [
      'Local browser data remains on the device until you clear it using an available platform or app control, or uninstall the app. Android provides controls for clearing cookies and WebView origin storage, browsing history, download records, gateway diagnostics, and the HNS resolver cache; Android system settings can also clear all app storage. iOS provides controls for clearing cookies and WebKit website data, browsing history, download-list records, locally stored gateway diagnostics, and the HNS resolver cache. Clearing the iOS download list does not delete the downloaded files themselves; those app-local files remain until the app is uninstalled. Files you export to another location are then controlled by that destination.',
      'In the 0.5.9 candidate, an unconfirmed newly created wallet is automatically removed when its protected recovery screen closes: the app wipes its unconfirmed database-key buffer and deletes the incomplete database. There is no in-app delete control for a confirmed native wallet. On Android, clearing all app storage or uninstalling the app removes its private wallet database and wrapped-key records. On iOS, uninstalling removes the app-container database; the operating system may retain the ThisDeviceOnly Keychain item under normal Keychain semantics. If the database is absent when the wallet screen is later opened, the app reconciles and deletes that orphaned item. Save the recovery phrase before clearing storage or uninstalling, because the app cannot show it again and cannot recover the wallet for you.',
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
    updated: '最終更新日：2026年8月10日',
    title: 'HNS DANE Browser プライバシーポリシー',
    intro: 'HNS DANE BrowserはDenuo Web, LLCが公開しています。プライバシーに関する質問や削除依頼は、info@denuoweb.comまたはアプリストアに記載された開発者の連絡先をご利用ください。公開の課題管理には個人情報を投稿しないでください。',
    summaryTitle: '概要',
    summary: [
      'HNS DANE Browserは、ローカルHNS証明、権威DNS、任意のリクエスター専用HNS P2P DNSリレー、任意の利用者設定型再帰HNS DoHリカバリー、DNSSEC、DANE診断に対応するHandshake優先ブラウザです。現在ストアで公開されているバイナリにはウォレット機能がありません。0.5.9候補は、公開後に端末内だけで使う1つの非送金型HNSアカウント識別子を作成または復元し、そのローカルウォレットを開く、ロック解除する、ロックするためのネイティブ操作に加えて、残高、受取先、取引履歴、追跡名、モジュール状態の読み取り専用欄を表示します。ただし、必要なスコープ付きループバック認証情報とインデックス対応ウォレットバックエンドは組み込まれていないため、これらの欄は利用不可のままで、ウォレット固有のネットワーク要求も行いません。送金、名前の取り込み・操作、ウェブサイトへのウォレット接続、HNSAまたはHNSRのサービス役割、取引決済、交換機能、P2Pマーケットプレイスは提供しません。リクエスター専用P2P DNSリレーはHNSRとは別の機能であり、端末をリレーエンドポイントまたは出力ノードにしません。広告SDK、解析SDK、開発者運営のアカウント、有料機能解放もありません。Android版には機能を解放しない任意の外部寄付リンクが表示される場合がありますが、iOS版に寄付や支払いの機能はありません。',
      'ブラウザデータとネイティブウォレットデータは端末内に保存され、サイトの表示とHNS解決データの更新に必要なネットワーク通信を行います。',
    ],
    localTitle: '端末内に保存するデータ',
    localData: [
      '閲覧履歴とナビゲーション状態：プラットフォームに応じて、ページURL、ページタイトル、閲覧日時、または現在のセッションの「戻る・進む」リスト。',
      'ウェブサイトデータ：Android WebViewまたはApple WebKitが管理するCookieなどのストレージ。',
      'ダウンロード：利用者の操作で保存したファイルと、その処理や表示に必要なプラットフォーム固有のローカル記録。AndroidではURL、ファイル名、MIMEタイプ、DownloadManager ID、登録日時が含まれる場合があります。iOSでは、書き出すかアプリを削除するまで、完了したファイルをアプリ内のDocuments/Downloadsディレクトリに保存します。',
      'HNSデータ：同期済みヘッダー、ピア情報（手動で追加したリレーピアのIPエンドポイントを含む）、検証済みリソース値、リゾルバキャッシュ、リゾルバ診断情報。',
      '設定：ホームページ、Cookie設定、任意のHNS P2P DNSリレー・リクエスター、任意の利用者設定型再帰HNS DoHリカバリーURL、関連するアプリ設定。リレー利用と再帰リカバリーは個別に初期無効で、それぞれ明示的な選択が必要です。アップグレード時は過去のリゾルバ設定を削除し、新しいリカバリー設定やリレー利用への同意として引き継ぎません。',
      '0.5.9候補のネイティブウォレットデータ：ネットワーク別の暗号化ウォレットデータベース、1つの非送金型HNSアカウント識別子、および再度開くために必要な鍵素材。Androidではデータベースをアプリ専用のバックアップ対象外領域に保存し、32バイトのデータベース鍵をAndroid Keystoreでラップします。iOSでは完全なファイル保護を適用したアプリ専用・バックアップ対象外データベースと、利用者の認証を必要とするThisDeviceOnly Keychain項目を使用します。新規生成したリカバリーフレーズはオフライン保管用に一度だけ表示され、復元入力と一度限りの表示はウォレット画面が保護されたライフサイクルを離れると消去されます。その表示を確認する前に画面を閉じた場合、アプリは未確認のデータベース鍵バッファーを消去し、不完全なウォレットデータベースを削除します。アプリが所有する可変バッファーは消去しますが、iOSのSwift/UIKitが管理するテキストを決定的にゼロ化できるとは表明しません。この候補はスコープ付きウォレットバックエンド認証情報を保存せず、表示される同期読み取り欄は利用不可のままです。',
    ],
    useTitle: '端末内データの利用目的',
    useText: '端末内データは、ブラウザ機能、ネイティブウォレット操作、診断、HNS名前解決の提供にのみ使用します。販売せず、Denuo Webの解析・広告サービスへ送信することもありません。',
    networkTitle: 'ネットワーク通信',
    networkData: [
      '利用者が開くことを選んだウェブサイトとウェブサービス。',
      'ヘッダー同期、ピア探索、証明取得に使うHandshakeピアとDNSシードホスト。',
      'ローカル証明の検証と権威DNSへの接続に失敗した後、利用者がリクエスター利用を明示的に有効にした場合だけ再帰的HNS DNSクエリに使用する、リレー機能を持つHandshakeピア。アップグレードは独立したリレー設定だけを保持し、以前の公開DoHや互換設定を同意へ変換しません。手動リレーピアはIPリテラルのエンドポイントとして入力する必要があり、実際のHSDハンドシェイクでリレー機能が通知された場合にのみ保存されます。ブラウザが出力ノードになることはありません。',
      '委任されたHNS名の権威DNSネームサーバー。',
      '証明から起動するかRFC 9461で検出した、委任されたHNS名のRFC 8484権威DoHエンドポイント。',
      '利用者が明示的に入力した再帰HNS DNS-over-HTTPSエンドポイント。ただし、直接の権威DNS、所有者公開の証明固定型権威DoH、個別に有効化したP2Pリクエスターのすべてが、ポート53の介入またはDNS転送不能によって失敗した後に限ります。設定が空欄なら、この種のサービスへ要求しません。https://hnsdoh.com/dns-query は例にすぎず、利用者が入力しない限り事前入力、自動選択、接続されません。',
      'プラットフォームのウェブエンジンが提供するセキュリティまたはレピュテーションサービス。特に、インストールされたAndroid WebViewプロバイダーはSafe BrowsingサービスでURLを確認し、独自のプライバシーポリシーを適用する場合があります。Apple WebKitとオペレーティングシステムも独自のブラウザセキュリティ保護を適用する場合があります。HNS DANE Browserはこれらのプラットフォームサービスを運営していません。',
      '委任DNSの失敗後に接続する、ルーティング不能な192.0.2.1 TEST-NET DNSセンチネル。一致する応答があれば外向きポート53の透過的な介入を確認し、応答がなければ「検出されず」とのみ表示します。',
      '通常のインターネットDNS解決に使用する、cloudflare-dns.comのCloudflare DNS-over-HTTPSサービス（公開されている1.1.1.1アドレスを介して接続を開始します）。',
      'ファイルをダウンロードまたは書き出すときのプラットフォームのダウンロードサービスと利用者が選んだ保存先。',
      '0.5.9候補には制限付きの読み取り専用ウォレット表示がありますが、アプリはスコープ付きループバック認証情報やインデックス対応ウォレットバックエンドを設定しません。そのため、残高、受取先、履歴、追跡名、状態の各欄は利用不可のままで、ネイティブウォレットはウォレット固有のネットワーク要求を行いません。取引送信、ウェブサイトのウォレットプロバイダーへの接続、取引決済はできず、利用可能なアカウント操作は端末内だけで行われます。',
    ],
    securityTitle: 'ネットワークデータと安全性',
    security: [
      '通信先には、IPアドレス、要求したホストまたはURL、プロトコル情報、ウェブサイトへ送信したデータなど、通常のネットワーク通信に伴う技術情報が届く場合があります。Cloudflareは独自のリゾルバのログ、保存期間、プライバシー慣行を管理しており、Denuo Webはそのサービスを運営していません。特にHNSリレーピアまたは利用者が設定した再帰HNS DoHの運営者は、照会したDNS名とレコード種別、要求時刻、送信元IPアドレスを確認できます。通常のHandshake TCP接続ではクエリの機密性は保護されないため、利用できる場合は暗号化されたピア転送を優先してください。リレーと設定型再帰リゾルバの応答は、アプリのHandshake証明、DNSSEC、TLSA、DANE検査によって端末内で引き続き検証され、ピアのDNS認証済みデータビットもリゾルバの信頼表明も証明として受け入れません。',
      'アプリに自動または初期設定済みの再帰HNSリゾルバはありません。利用者がリカバリーエンドポイントを明示的に設定すると、アプリは範囲を限定したHTTPS URLを検証し、そのホスト名を検証型ICANN DoHだけで解決し、WebPKIを使って公開アドレスだけへ接続し、HNS応答を端末内で引き続き検証します。不正なDNSSEC、無効なDNS、DNS応答コード、古いまたは欠落したHNS証明状態は、リカバリーを起動せず終端エラーになります。HNSへのWebPKIフォールバックは禁止されています。すべての完全なDNSホスト名は、デュアルルート分類のため範囲を限定した検証型ICANN DoHでも解決され、ICANN WebPKIはTLSA不在が認証された場合または未署名ゾーンが証明された場合にのみ許可されます。',
      '該当する場合はHTTPS、DNSSEC、DANEを使用します。暗号化されていないhttp://サイトを意図的に開いた場合、そのサイトとの通信はHTTPSで暗号化されません。',
    ],
    cookiesTitle: 'Cookieとウェブサイトデータ',
    cookies: 'ウェブサイトはCookieを設定し、プラットフォームのウェブエンジンのストレージを使用する場合があります。Androidでは、第三者Cookieを遮断し、CookieとWebViewのオリジンストレージを削除する設定があります。iOSは永続的なWebKitプロファイルを使用し、Cookieとウェブサイトデータを削除する設定アクションを提供します。残りのウェブサイトデータはアプリをアンインストールすると削除されます。各ウェブサイトは、それぞれのプライバシー方針に責任を負います。',
    sharingTitle: 'データの共有',
    sharing: 'Denuo Webは個人データまたは機密性の高い利用者データを販売しません。HNS DANE Browserがデータを共有するのは、サイト表示、HNSデータ同期、名前解決、ファイルダウンロードなど、利用者が要求したブラウザ機能に必要な場合のみです。0.5.9候補は、ネイティブウォレットのデータベース、リカバリーフレーズ、端末に結び付いたデータベース鍵、アカウント識別子、ウォレット読み取りデータをDenuo Web、ウェブサイト、解析サービス、ウォレットプロバイダーへ送信しません。',
    retentionTitle: '保存期間と削除',
    retention: [
      '端末内のブラウザデータは、利用可能なプラットフォームまたはアプリの機能で消去するか、アプリをアンインストールするまで残ります。AndroidではCookieとWebViewのオリジンストレージ、閲覧履歴、ダウンロード記録、ゲートウェイ診断、HNSリゾルバキャッシュを消去でき、Androidのシステム設定から全アプリストレージを消去することもできます。iOSではCookieとWebKitウェブサイトデータ、閲覧履歴、ダウンロード一覧の記録、端末内のゲートウェイ診断、HNSリゾルバキャッシュを消去できます。iOSのダウンロード一覧を消去しても、ダウンロード済みファイルそのものは削除されません。アプリ内のファイルはアンインストールするまで残ります。別の場所に書き出したファイルは、その保存先の管理下に移ります。',
      '0.5.9候補では、未確認の新規ウォレットは保護されたリカバリー画面を閉じると自動的に削除されます。アプリは未確認のデータベース鍵バッファーを消去し、不完全なデータベースを削除します。確認済みのネイティブウォレットをアプリ内で削除する操作はありません。Androidでは、すべてのアプリストレージを消去するかアプリをアンインストールすると、専用ウォレットデータベースとラップ済み鍵の記録が削除されます。iOSではアンインストールによりアプリコンテナ内のデータベースが削除されますが、通常のKeychainの動作によりThisDeviceOnly項目がオペレーティングシステムに残る場合があります。後でウォレット画面を開いたときにデータベースが存在しなければ、アプリはその孤立した項目を照合して削除します。アプリはリカバリーフレーズを再表示できず、利用者に代わってウォレットを復元することもできないため、ストレージ消去またはアンインストールの前に必ず保存してください。',
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
