import { Box, Button, Card, Flex, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const PRODUCT_URL = '/work/shakescape-extension'
const PRIVACY_URL = '/work/shakescape-extension/privacy'
const LEGAL_URL = '/work/shakescape-extension/legal'
const SOURCE_URL = 'https://github.com/handshake-rs/hns-dane-browser-extension'
const SUPPORT_URL = 'https://github.com/handshake-rs/hns-dane-browser-extension/issues'
const SOURCE_PRIVACY_URL = `${SOURCE_URL}/blob/main/docs/privacy-policy.md`
const SOURCE_LICENSE_URL = `${SOURCE_URL}/blob/main/LICENSE`
const THIRD_PARTY_URL = `${SOURCE_URL}/blob/main/extension/THIRD_PARTY_NOTICES.txt`
const POLYFORM_URL = 'https://polyformproject.org/licenses/noncommercial/1.0.0'

type PolicySection = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

type PolicyCopy = {
  updated: string
  eyebrow: string
  title: string
  intro: string
  sections: PolicySection[]
  overview: string
  privacy: string
  legal: string
  support: string
  source: string
  fullLicense?: string
  polyform?: string
  thirdParty?: string
}

const privacyCopy: Record<'en' | 'ja', PolicyCopy> = {
  en: {
    updated: 'Last updated: 2026-08-13',
    eyebrow: 'Shakescape Extension',
    title: 'Privacy Policy',
    intro:
      'Shakescape Extension is published by Denuo Web, LLC. Privacy and support questions can be sent to info@denuoweb.com. Do not post personal information to the public issue tracker.',
    sections: [
      {
        title: 'Summary',
        paragraphs: [
          'The extension, local Rust native host, and Setup application do not operate a telemetry, analytics, advertising, developer-account, or browsing-history service. Denuo Web does not sell personal or sensitive data. Optional donations do not unlock features or change how browsing data is handled.',
          'The product keeps the state needed to provide its security feature on the user\'s computer and makes network requests needed to resolve names and load websites. Those local and network boundaries are described below.',
        ],
      },
      {
        title: 'Data stored locally',
        items: [
          'Extension settings, the optional MeshMine public-statistics endpoint, the explicit requester-only P2P DNS-relay choice, the independently configured recursive HNS DoH URL, and the last header-sync attempt time used for retry limiting.',
          'Native-host registration, Setup receipts or in-progress ownership transactions, installation markers, selected trust-store path, selected browser compatibility flavors, and the exact registered extension IDs.',
          'A per-install local CA key and certificate, current proxy/runtime generations and credentials, and the local files needed to operate the authenticated loopback proxy.',
          'Handshake headers, peer state, verified proof and resource cache, namespace bindings, and bounded resolver state.',
          'A bounded in-memory or browser-session security-result window used by the popup, waiting page, and diagnostics. It can include exact HTTP(S) targets, tab/document identifiers, selected host and port, generation values, and sanitized security receipts, but not page bodies, cookies, request or response headers, or raw certificate bytes.',
        ],
      },
      {
        title: 'Network disclosure',
        items: [
          'Websites receive the ordinary connection and request data needed to serve pages, including the network address, requested URL, headers, cookies, and content the user submits. Denuo Web does not proxy that traffic through a developer-operated browsing service.',
          'ICANN resolution and TLSA discovery use built-in validating Cloudflare DNS-over-HTTPS at cloudflare-dns.com. Cloudflare can observe queried names and record types, request timing, protocol metadata, and the caller\'s network address, and controls its own logging and retention.',
          'HNS header and proof synchronization connects to Handshake peers and seed hosts. If the user explicitly enables the requester-only P2P DNS relay, a selected relay peer can observe the relayed qname, qtype, request timing, and source connection. Ordinary Handshake TCP does not provide query confidentiality.',
          'After local proof validation, direct delegated authoritative DNS and proof-anchored owner-published authoritative DoH endpoints can observe the HNS qname, qtype, request timing, and source connection needed to answer the query. Their replies remain subject to local HNS DNSSEC, TLSA, and DANE validation.',
          'The recursive HNS DoH recovery field is blank by default. If the user enters and applies an endpoint, its operator can observe the HNS qnames and qtypes, timing, and source address when that recovery path is selected. Replies remain subject to local HNS proof, DNSSEC, TLSA, and DANE validation.',
          'If the user enters a MeshMine public-statistics endpoint, the extension sends a credential-free, no-referrer request directly to that operator. The operator can observe ordinary transport metadata. The response is bounded, displayed as unverified, and is not sent to Denuo Web.',
        ],
      },
      {
        title: 'Session and diagnostic data',
        paragraphs: [
          'The raw internal resolution trace is not sent through native messaging because it can contain URLs or certificate material. Browser-visible responses receive sanitized, bounded protocol state rather than page bodies or private internal metadata.',
          'To bind a Rust security receipt to the correct active document, the extension can keep a bounded set of exact URLs and Chromium tab/document identifiers in chrome.storage.session. That browser-managed state stays local and is cleared when the browser session ends. A local waiting page can also keep one exact credential-free GET target in its URL fragment and sessionStorage to prevent an automatic resume loop. Fragments are not transmitted in HTTP requests, POST requests are never queued or replayed, and temporary worker-memory targets expire after at most one minute.',
        ],
      },
      {
        title: 'Use, sharing, and retention',
        paragraphs: [
          'Local data is used only to install, operate, verify, repair, diagnose, or remove the extension and its native component. Denuo Web receives no installation receipt, synced browsing history, local CA key, runtime credential, configured recovery URL, or MeshMine endpoint.',
          'Normal logs omit full qnames, URLs, headers, bodies, raw DNS messages, and stable browser identifiers. Temporary diagnostic state is bounded and cleared when its lifecycle, runtime, or authority changes.',
          'Users can clear the recursive resolver, disable the P2P requester, replace or clear the MeshMine endpoint, remove the extension, or run Complete Uninstall. Complete Uninstall removes this product\'s user-level native-host registrations, exact per-install trust anchor, native executable, CA key material, marker, chain/cache state, and runtime data. Chromium removes extension-managed storage according to the browser\'s extension-removal behavior. There is no developer-operated account or server-side profile to delete.',
        ],
      },
      {
        title: 'Scope and changes',
        paragraphs: [
          'This policy covers the Chromium extension, its local native host, and Shakescape Setup. The separate Android and iOS product has its own privacy policy.',
          'This policy may change as the product changes. Material changes will be reflected on this page and in applicable browser-store privacy declarations. The source repository retains the detailed technical policy and release boundaries used to keep those disclosures aligned with the software.',
        ],
      },
    ],
    overview: 'Extension overview',
    privacy: 'Privacy policy',
    legal: 'License & terms',
    support: 'Support / issues',
    source: 'Policy in source',
  },
  ja: {
    updated: '最終更新日：2026年8月13日',
    eyebrow: 'Shakescape Extension',
    title: 'プライバシーポリシー',
    intro:
      'Shakescape ExtensionはDenuo Web, LLCが公開しています。プライバシーとサポートに関するお問い合わせはinfo@denuoweb.comへお送りください。公開の課題管理には個人情報を投稿しないでください。',
    sections: [
      {
        title: '概要',
        paragraphs: [
          '拡張機能、ローカルRustネイティブホスト、Setupアプリは、テレメトリ、解析、広告、開発者運営アカウント、閲覧履歴の各サービスを運営しません。Denuo Webは個人データや機密性の高いデータを販売しません。任意の寄付で機能が解放されたり、閲覧データの扱いが変わったりすることはありません。',
          '製品は安全機能の提供に必要な状態を利用者のコンピューター内に保持し、名前解決とウェブサイト表示に必要な通信を行います。その境界を以下に示します。',
        ],
      },
      {
        title: 'ローカルに保存するデータ',
        items: [
          '拡張機能の設定、任意のMeshMine公開統計エンドポイント、明示的な要求側P2P DNSリレーの選択、個別に設定する再帰HNS DoH URL、再試行制限に使う最後のヘッダー同期試行時刻。',
          'ネイティブホスト登録、Setupの完了記録または処理中トランザクション、インストール印、選択した信頼ストアとブラウザ互換種別、登録した正確な拡張機能ID。',
          'インストールごとのローカルCA鍵と証明書、現在のプロキシ／ランタイム世代と認証情報、認証済みループバックプロキシの運用ファイル。',
          'Handshakeヘッダー、ピア状態、検証済み証明・リソースキャッシュ、名前空間の対応、範囲を限定したリゾルバ状態。',
          'ポップアップ、待機ページ、診断に使う範囲限定のメモリ内またはブラウザセッション状態。正確なHTTP(S)対象、タブ／文書ID、選択ホストとポート、世代値、無害化した安全性記録を含む場合がありますが、ページ本文、Cookie、要求・応答ヘッダー、生の証明書バイトは含みません。',
        ],
      },
      {
        title: 'ネットワーク通信',
        items: [
          'ウェブサイトには、ページ提供に必要な送信元アドレス、要求URL、ヘッダー、Cookie、利用者が送信した内容など通常の通信情報が届きます。Denuo Web運営の閲覧サービスがその通信を中継することはありません。',
          'ICANN名前解決とTLSA検出にはcloudflare-dns.comの検証型Cloudflare DNS-over-HTTPSを使用します。Cloudflareは照会名とレコード種別、時刻、プロトコル情報、送信元アドレスを確認でき、独自のログと保存期間を管理します。',
          'HNSヘッダーと証明の同期はHandshakeピアとシードホストへ接続します。要求側P2P DNSリレーを明示的に有効にすると、選択されたピアはqname、qtype、時刻、接続元を確認できます。通常のHandshake TCPにはクエリ機密性がありません。',
          'ローカルで証明を検証した後、委任先の権威DNSと、証明で固定された所有者公開の権威DoHは、応答に必要なHNS qname、qtype、要求時刻、接続元を確認できます。応答は引き続きローカルのHNS DNSSEC、TLSA、DANE検証を受けます。',
          '再帰HNS DoH復旧欄は初期状態で空です。利用者が通信先を入力して適用すると、その経路が選ばれた際に運営者はHNS照会名、種別、時刻、送信元アドレスを確認できます。応答は引き続きローカルのHNS証明、DNSSEC、TLSA、DANE検証を受けます。',
          'MeshMine公開統計エンドポイントを入力すると、資格情報とリファラーを付けない要求をその運営者へ直接送ります。応答は範囲を限定して未検証と表示され、Denuo Webへ送信されません。',
        ],
      },
      {
        title: 'セッションと診断データ',
        paragraphs: [
          'URLや証明書情報を含み得る内部の生の解決トレースは、ネイティブメッセージングで送信しません。ブラウザにはページ本文や非公開メタデータではなく、無害化して範囲を限定したプロトコル状態だけを返します。',
          'Rustの安全性記録を正しい文書へ結び付けるため、chrome.storage.sessionに正確なURLとChromiumのタブ／文書IDを限定数保持する場合があります。この状態はローカルにとどまり、ブラウザセッション終了時に消去されます。ローカル待機ページは自動再開ループを防ぐため、資格情報を含まないGET対象をURLフラグメントとsessionStorageに一時保持できます。フラグメントはHTTP要求では送信されず、POST要求は待機・再送されず、ワーカーメモリの対象は最長1分で失効します。',
        ],
      },
      {
        title: '利用、共有、保存期間',
        paragraphs: [
          'ローカルデータは、拡張機能とネイティブ部品の導入、運用、検証、修復、診断、削除にだけ使います。Denuo Webはインストール記録、同期された閲覧履歴、ローカルCA鍵、ランタイム認証情報、設定した復旧URL、MeshMine通信先を受信しません。',
          '通常のログには完全なqname、URL、ヘッダー、本文、生のDNSメッセージ、安定したブラウザ識別子を残しません。一時診断状態は範囲を限定し、ライフサイクル、ランタイム、権限が変わると消去します。',
          '利用者は再帰リゾルバの消去、P2P要求側の無効化、MeshMine通信先の変更・消去、拡張機能の削除、完全アンインストールをいつでも実行できます。完全アンインストールは、この製品のユーザー単位ネイティブホスト登録、インストール固有の信頼アンカー、実行ファイル、CA鍵、印、チェーン／キャッシュ状態、ランタイムデータを削除します。拡張機能ストレージはChromiumの削除動作に従います。開発者運営のアカウントやサーバー側プロフィールはありません。',
        ],
      },
      {
        title: '適用範囲と変更',
        paragraphs: [
          '本ポリシーはChromium拡張機能、ローカルネイティブホスト、Shakescape Setupに適用されます。Android・iOS版は別のプライバシーポリシーを持つ別製品です。',
          '製品の変更に応じて本ポリシーを更新する場合があります。重要な変更は本ページと該当するブラウザストアの申告に反映します。ソースリポジトリには、開示内容をソフトウェアと一致させる詳細な技術ポリシーとリリース境界を掲載します。',
        ],
      },
    ],
    overview: '拡張機能の概要',
    privacy: 'プライバシーポリシー',
    legal: 'ライセンス・利用規約',
    support: 'サポート / 課題報告',
    source: 'ソース内のポリシー',
  },
}

const legalCopy: Record<'en' | 'ja', PolicyCopy> = {
  en: {
    updated: 'Effective: 2026-08-13',
    eyebrow: 'Shakescape Extension',
    title: 'License & Terms of Use',
    intro:
      'These terms apply to the Shakescape Chromium extension, native host, and Setup application published by Denuo Web, LLC. The product license controls copyright and patent permissions; this page does not replace or expand that license.',
    sections: [
      {
        title: 'Product license',
        paragraphs: [
          'The product is source-available under the PolyForm Noncommercial License 1.0.0 with the required notice “Copyright 2026 Denuo Web, LLC.” To receive a license under those terms, you must accept and comply with them.',
          'The license permits noncommercial use, study, research, experimentation, modification, and distribution subject to its conditions. Commercial use is not granted and requires separate written permission from Denuo Web, LLC.',
        ],
      },
      {
        title: 'Copies, changes, and notices',
        paragraphs: [
          'If you distribute the software, including changes or new works permitted by the license, you must provide recipients with the PolyForm terms or their URL and every plain-text Required Notice supplied with the software. The complete repository LICENSE is authoritative for those obligations.',
          'Third-party components remain under their own licenses. Their notices are included in release packages and in the repository. The product license does not replace third-party terms or grant rights that their licensors have not granted.',
        ],
      },
      {
        title: 'Use of the installed product',
        items: [
          'Use the extension and Setup only in compliance with applicable law, the product license, and the terms of browser stores, operating systems, websites, DNS operators, and network services you choose to use.',
          'Install only the package for the correct platform and architecture. Review release checksums, provenance, notarization, and signing disclosures before running native software.',
          'Keep browser and operating-system security updates current. Do not bypass the product\'s blocking state, trust-boundary checks, or warnings in a way that misrepresents an unverified connection as verified.',
          'You are responsible for endpoints and recovery services you configure and for information you submit to websites. Denuo Web does not operate those third-party services.',
        ],
      },
      {
        title: 'Product boundaries',
        paragraphs: [
          'The product is local software, not a Denuo Web browsing, DNS, custody, account, or availability service. It can depend on Chromium, the operating system, Handshake peers, DNS operators, websites, and network conditions outside Denuo Web\'s control.',
          'The current released product does not provide a usable wallet provider, send funds, settle trades, exchange assets, or operate a marketplace. Protocol validation and fail-closed behavior reduce specific risks but do not guarantee that a name, website, peer, resolver, certificate, or network will remain available or safe.',
          'Windows builds use a project self-signed Authenticode certificate that is not publicly trusted, so SmartScreen or Unknown Publisher may warn. macOS and Linux have the signing, notarization, checksum, and provenance boundaries stated on the product and release pages.',
        ],
      },
      {
        title: 'Warranty and liability',
        paragraphs: [
          'As far as the law allows, the software is provided as is, without warranty or condition, and the licensor is not liable for damages arising from the terms or the use or nature of the software. The complete Product License controls this disclaimer and any license termination or cure provisions.',
        ],
      },
      {
        title: 'Changes and contact',
        paragraphs: [
          'Published versions remain governed by the license and notices distributed with those versions. Denuo Web may update these website terms for later releases; the effective date above identifies this version.',
          'For commercial licensing or legal questions, contact info@denuoweb.com. For public technical support, use the project issue tracker without posting private information.',
        ],
      },
    ],
    overview: 'Extension overview',
    privacy: 'Privacy policy',
    legal: 'License & terms',
    support: 'Support / issues',
    source: 'Source code',
    fullLicense: 'Full product license',
    polyform: 'PolyForm standard text',
    thirdParty: 'Third-party notices',
  },
  ja: {
    updated: '発効日：2026年8月13日',
    eyebrow: 'Shakescape Extension',
    title: 'ライセンス・利用規約',
    intro:
      '本規約はDenuo Web, LLCが公開するShakescapeのChromium拡張機能、ネイティブホスト、Setupアプリに適用されます。著作権と特許に関する許諾は製品ライセンスが規定し、本ページはその内容を置き換えたり拡張したりしません。',
    sections: [
      {
        title: '製品ライセンス',
        paragraphs: [
          '本製品は「Copyright 2026 Denuo Web, LLC.」のRequired Noticeを伴うPolyForm Noncommercial License 1.0.0に基づき、ソースを公開しています。その許諾を得るには、同ライセンスに同意して遵守する必要があります。',
          'ライセンス条件に従う非商用の利用、学習、研究、実験、変更、再配布が許可されます。商用利用は許諾されておらず、Denuo Web, LLCの書面による別途許可が必要です。',
        ],
      },
      {
        title: '複製、変更、表示義務',
        paragraphs: [
          'ライセンスで許された変更や新しい成果物を含めてソフトウェアを配布する場合、受領者へPolyFormの条文またはそのURLと、ソフトウェアに添付されたすべてのRequired Noticeを提供する必要があります。これらの義務はリポジトリの完全なLICENSEが優先します。',
          '第三者コンポーネントにはそれぞれのライセンスが適用されます。通知はリリースパッケージとリポジトリに含まれます。製品ライセンスは第三者条件を置き換えず、第三者が許諾していない権利を与えません。',
        ],
      },
      {
        title: 'インストール済み製品の利用',
        items: [
          '適用法、製品ライセンス、ブラウザストア、OS、ウェブサイト、DNS運営者、選択したネットワークサービスの条件に従って利用してください。',
          '正しいプラットフォームとアーキテクチャのパッケージだけを導入し、実行前にリリースのチェックサム、来歴、公証、署名に関する開示を確認してください。',
          'ブラウザとOSのセキュリティ更新を維持し、未検証の接続を検証済みと誤認させるような形で遮断状態、信頼境界の検査、警告を回避しないでください。',
          '利用者が設定する通信先と復旧サービス、ウェブサイトへ送信する情報は利用者の責任です。Denuo Webはこれらの第三者サービスを運営しません。',
        ],
      },
      {
        title: '製品境界',
        paragraphs: [
          '本製品はローカルソフトウェアであり、Denuo Webが運営する閲覧、DNS、資産保管、アカウント、可用性サービスではありません。Chromium、OS、Handshakeピア、DNS運営者、ウェブサイト、ネットワーク状況などDenuo Webの管理外の要素に依存する場合があります。',
          '現在の公開製品は、利用可能なウォレットプロバイダー、送金、取引決済、資産交換、マーケットプレイスを提供しません。プロトコル検証とフェイルクローズ動作は特定のリスクを減らしますが、名前、サイト、ピア、リゾルバ、証明書、ネットワークの安全性や可用性を保証するものではありません。',
          'Windows版は公開信頼されていないプロジェクト自己署名Authenticode証明書を使うため、SmartScreenや「不明な発行元」の警告が出る場合があります。macOSとLinuxには製品ページとリリースページに記載する署名、公証、チェックサム、来歴の境界があります。',
        ],
      },
      {
        title: '保証と責任',
        paragraphs: [
          '法律で認められる限り、ソフトウェアは現状有姿で提供され、保証または条件は付されず、ライセンサーは本条件またはソフトウェアの利用・性質から生じる損害について責任を負いません。この免責とライセンスの終了・是正条項は、完全な製品ライセンスが規定します。',
        ],
      },
      {
        title: '変更とお問い合わせ',
        paragraphs: [
          '公開済みの各バージョンには、そのバージョンと共に配布されたライセンスと通知が引き続き適用されます。Denuo Webは将来のリリースについて本ウェブ規約を更新する場合があり、上記の発効日が本版を識別します。',
          '商用ライセンスまたは法的なお問い合わせはinfo@denuoweb.comへお送りください。公開の技術サポートには、個人情報を含めずにプロジェクトの課題管理をご利用ください。',
        ],
      },
    ],
    overview: '拡張機能の概要',
    privacy: 'プライバシーポリシー',
    legal: 'ライセンス・利用規約',
    support: 'サポート / 課題報告',
    source: 'ソースコード',
    fullLicense: '完全な製品ライセンス',
    polyform: 'PolyForm標準条文',
    thirdParty: '第三者ソフトウェア通知',
  },
}

type ExtensionPolicyPageProps = MarketingPageProps & {
  page: PolicyCopy
  current: 'privacy' | 'legal'
}

const ExtensionPolicyPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
  page,
  current,
}: ExtensionPolicyPageProps) => (
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
          <Text color="indigo" size="2" weight="medium">{page.eyebrow}</Text>
          <Heading size="8">{page.title}</Heading>
          <Text color="gray" size="3">{page.intro}</Text>
        </Flex>

        {page.sections.map((section) => (
          <Box asChild key={section.title}>
            <section>
              <Flex direction="column" gap="2">
                <Heading size="5">{section.title}</Heading>
                {section.paragraphs?.map((paragraph) => <Text key={paragraph}>{paragraph}</Text>)}
                {section.items && (
                  <Box asChild pl="4" m="0">
                    <ul>{section.items.map((item) => <li key={item}><Text>{item}</Text></li>)}</ul>
                  </Box>
                )}
              </Flex>
            </section>
          </Box>
        ))}

        <Flex gap="3" wrap="wrap">
          <Button asChild><Link to={PRODUCT_URL}>{page.overview}</Link></Button>
          {current !== 'privacy' && (
            <Button asChild variant="soft"><Link to={PRIVACY_URL}>{page.privacy}</Link></Button>
          )}
          {current !== 'legal' && (
            <Button asChild variant="soft"><Link to={LEGAL_URL}>{page.legal}</Link></Button>
          )}
          <Button asChild variant="ghost">
            <RadixLink href={SUPPORT_URL} target="_blank" rel="noreferrer">{page.support}</RadixLink>
          </Button>
          <Button asChild variant="ghost">
            <RadixLink
              href={current === 'privacy' ? SOURCE_PRIVACY_URL : SOURCE_URL}
              target="_blank"
              rel="noreferrer"
            >
              {page.source}
            </RadixLink>
          </Button>
          {current === 'legal' && (
            <>
              <Button asChild variant="ghost">
                <RadixLink href={SOURCE_LICENSE_URL} target="_blank" rel="noreferrer">{page.fullLicense}</RadixLink>
              </Button>
              <Button asChild variant="ghost">
                <RadixLink href={POLYFORM_URL} target="_blank" rel="noreferrer">{page.polyform}</RadixLink>
              </Button>
              <Button asChild variant="ghost">
                <RadixLink href={THIRD_PARTY_URL} target="_blank" rel="noreferrer">{page.thirdParty}</RadixLink>
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Card>
  </MarketingShell>
)

export const HnsDaneBrowserExtensionPrivacyPage = (props: MarketingPageProps) => (
  <ExtensionPolicyPage {...props} page={privacyCopy[props.language]} current="privacy" />
)

export const HnsDaneBrowserExtensionLegalPage = (props: MarketingPageProps) => (
  <ExtensionPolicyPage {...props} page={legalCopy[props.language]} current="legal" />
)
