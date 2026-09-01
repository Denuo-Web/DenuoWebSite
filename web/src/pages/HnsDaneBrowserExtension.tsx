import { Badge, Box, Button, Card, Flex, Grid, Heading, Link as RadixLink, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

const PRIVACY_URL = '/work/shakescape-extension/privacy'
const LEGAL_URL = '/work/shakescape-extension/legal'
const MOBILE_URL = '/work/shakescape'
const SOURCE_URL = 'https://github.com/handshake-rs/hns-dane-browser-extension'
const RELEASES_URL = 'https://github.com/handshake-rs/hns-dane-browser-extension/releases/latest'
const SUPPORT_URL = 'https://github.com/handshake-rs/hns-dane-browser-extension/issues'

const pageCopy = {
  en: {
    eyebrow: 'Denuo Web desktop product',
    title: 'Shakescape Extension',
    lead:
      'A source-available Chromium extension and local Rust runtime for Handshake names, dual-root DNSSEC classification, and TLSA/DANE enforcement on Linux, macOS, and Windows.',
    source: 'Source code',
    releases: 'Native downloads',
    privacy: 'Privacy policy',
    legal: 'License & terms',
    support: 'Support / issues',
    mobile: 'Android and iOS product',
    badges: [
      'Chrome, Edge, Opera, Brave, and Vivaldi',
      'No ads or telemetry',
      'Per-user native setup',
    ],
    features: [
      {
        title: 'Authenticated dual-root decisions',
        body:
          'The local Rust runtime resolves complete hostnames through Handshake and ICANN, verifies the available evidence, and classifies names as HNS-only, ICANN-only, convergent, divergent, absent, or indeterminate.',
      },
      {
        title: 'DNSSEC and DANE enforcement',
        body:
          'Handshake proofs, DNSSEC, and supported TLSA records are checked locally. Bogus or indeterminate evidence fails closed instead of becoming a direct-network or WebPKI fallback.',
      },
      {
        title: 'Browser-visible security state',
        body:
          'The toolbar popup reports the selected namespace, proof and header state, certificate policy, recovery path, and explicit failure reason for the active page.',
      },
    ],
    installHeading: 'How installation works',
    installLead:
      'Chromium stores install the extension. The extension then offers the finalized Setup package embedded for the current desktop platform; the user saves and runs it explicitly.',
    platforms: [
      {
        title: 'Windows',
        body:
          'Run the embedded Setup executable. Release builds use the project self-signed Authenticode certificate and an RFC 3161 SHA-256 timestamp. Because that certificate is not publicly trusted, SmartScreen or Unknown Publisher can still warn; compare the published checksum and certificate fingerprint before running it.',
      },
      {
        title: 'macOS',
        body:
          'Open the embedded Setup application and approve the normal macOS prompts. Release packages require a Developer ID signature, Apple notarization, and a stapled ticket.',
      },
      {
        title: 'Linux',
        body:
          'Run the embedded per-user Setup package for the matching architecture. Tagged archives publish checksums and keyless GitHub build-provenance attestations.',
      },
    ],
    setupNote:
      'Setup installs the version-matched native host, a validated Handshake header bootstrap through height 300,000, browser registrations, and one per-install local trust anchor. A native-component mismatch keeps browsing blocked and prompts for the newly embedded Setup. Complete Uninstall is available from Setup and the extension dropdown.',
    privacyHeading: 'Local by design',
    privacyBody:
      'Denuo Web operates no advertising, analytics, telemetry, account, or browsing-history service for this product. Settings, proof state, the local trust anchor, runtime credentials, and bounded diagnostics stay on the computer. Websites, Handshake peers, Cloudflare DNS-over-HTTPS, and any endpoint the user configures receive the ordinary network data described in the extension privacy policy.',
    boundariesHeading: 'Current product boundaries',
    boundaries: [
      'The native component is required; ChromeOS and mobile Chromium cannot use it.',
      'P2P DNS relay use is requester-only, off by default, and never turns the computer into an output node.',
      'The recursive HNS DoH recovery field is blank by default and is used only after the defined transport failures.',
      'Wallet-provider, transaction, exchange, settlement, and marketplace paths are unavailable in the released product.',
      'The software is source-available for noncommercial use under PolyForm Noncommercial 1.0.0; commercial use requires separate written permission.',
    ],
  },
  ja: {
    eyebrow: 'Denuo Web デスクトップ製品',
    title: 'Shakescape Extension',
    lead:
      'Linux、macOS、Windows上のHandshake名、デュアルルートDNSSEC分類、TLSA/DANE強制に対応する、ソース公開型のChromium拡張機能とローカルRustランタイムです。',
    source: 'ソースコード',
    releases: 'ネイティブ版ダウンロード',
    privacy: 'プライバシーポリシー',
    legal: 'ライセンス・利用規約',
    support: 'サポート / 課題報告',
    mobile: 'Android・iOS製品',
    badges: [
      'Chrome・Edge・Opera・Brave・Vivaldi',
      '広告・テレメトリなし',
      'ユーザー単位のネイティブSetup',
    ],
    features: [
      {
        title: '認証済みデュアルルート判定',
        body:
          'ローカルRustランタイムが完全なホスト名をHandshakeとICANNの両方で解決し、証拠を検証して、HNSのみ、ICANNのみ、収束、相違、双方に存在しない、判定不能のいずれかに分類します。',
      },
      {
        title: 'DNSSECとDANEの強制',
        body:
          'Handshake証明、DNSSEC、対応するTLSAレコードをローカルで検査します。不正または判定不能な証拠を、直接接続やWebPKIフォールバックとして扱わず、接続を停止します。',
      },
      {
        title: 'ブラウザで確認できる安全状態',
        body:
          'ツールバーのポップアップに、選択された名前空間、証明とヘッダーの状態、証明書ポリシー、復旧経路、明示的な失敗理由を表示します。',
      },
    ],
    installHeading: 'インストールの流れ',
    installLead:
      'Chromiumストアから拡張機能を追加すると、現在のデスクトップ環境向けに同梱された最終版Setupが案内されます。利用者が保存し、明示的に実行します。',
    platforms: [
      {
        title: 'Windows',
        body:
          '同梱されたSetup実行ファイルを起動します。リリース版はプロジェクトの自己署名Authenticode証明書とRFC 3161 SHA-256タイムスタンプを使用します。証明書は公開信頼されていないため、SmartScreenまたは「不明な発行元」の警告が出る場合があります。実行前に公開チェックサムと証明書フィンガープリントを照合してください。',
      },
      {
        title: 'macOS',
        body:
          '同梱されたSetupアプリを開き、通常のmacOS確認に従います。リリースパッケージにはDeveloper ID署名、Apple公証、ステープル済みチケットが必要です。',
      },
      {
        title: 'Linux',
        body:
          '一致するアーキテクチャのユーザー単位Setupパッケージを実行します。タグ付きアーカイブにはチェックサムとGitHubのキーレス・ビルド来歴証明を公開します。',
      },
    ],
    setupNote:
      'Setupは、バージョンが一致するネイティブホスト、ブロック高300,000まで検証済みのHandshakeヘッダーブートストラップ、ブラウザ登録、インストールごとのローカル信頼アンカーを導入します。ネイティブ部品のバージョンが合わない場合は閲覧を遮断したまま、新しく同梱されたSetupの実行を案内します。完全アンインストールはSetupと拡張機能のメニューから利用できます。',
    privacyHeading: 'ローカル中心の設計',
    privacyBody:
      'Denuo Webは、この製品について広告、解析、テレメトリ、アカウント、閲覧履歴の各サービスを運営しません。設定、証明状態、ローカル信頼アンカー、ランタイム認証情報、範囲を限定した診断はコンピューター内に保持されます。ウェブサイト、Handshakeピア、Cloudflare DNS-over-HTTPS、利用者が設定した通信先には、拡張機能のプライバシーポリシーに記載した通常のネットワーク情報が届きます。',
    boundariesHeading: '現在の製品境界',
    boundaries: [
      'ネイティブ部品が必須であり、ChromeOSとモバイル版Chromiumでは利用できません。',
      'P2P DNSリレーは要求側としてのみ利用でき、初期状態では無効です。コンピューターが出力ノードになることはありません。',
      '再帰HNS DoH復旧欄は初期状態で空であり、定義された通信障害の後にだけ使用されます。',
      '公開製品では、ウォレットプロバイダー、取引送信、交換、決済、マーケットプレイスの経路は利用できません。',
      'PolyForm Noncommercial 1.0.0に基づき非商用利用向けにソースを公開しています。商用利用にはDenuo Web, LLCの書面による別途許可が必要です。',
    ],
  },
} as const

const HnsDaneBrowserExtensionPage = ({
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
                <RadixLink href={RELEASES_URL} target="_blank" rel="noreferrer">{page.releases}</RadixLink>
              </Button>
              <Button asChild size="3" variant="soft">
                <RadixLink href={SOURCE_URL} target="_blank" rel="noreferrer">{page.source}</RadixLink>
              </Button>
              <Button asChild size="3" variant="soft"><Link to={PRIVACY_URL}>{page.privacy}</Link></Button>
              <Button asChild size="3" variant="soft"><Link to={LEGAL_URL}>{page.legal}</Link></Button>
              <Button asChild size="3" variant="ghost">
                <RadixLink href={SUPPORT_URL} target="_blank" rel="noreferrer">{page.support}</RadixLink>
              </Button>
            </Flex>
            <Flex gap="2" wrap="wrap">
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
            <Heading size="6">{page.installHeading}</Heading>
            <Text color="gray">{page.installLead}</Text>
            <Grid columns={{ initial: '1', md: '3' }} gap="3">
              {page.platforms.map((platform) => (
                <Card key={platform.title} variant="surface">
                  <Flex direction="column" gap="2">
                    <Heading size="4">{platform.title}</Heading>
                    <Text color="gray">{platform.body}</Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
            <Text size="2" color="gray">{page.setupNote}</Text>
          </Flex>
        </Card>

        <Grid columns={{ initial: '1', md: '2' }} gap="3">
          <Card size="3">
            <Flex direction="column" gap="2">
              <Heading size="5">{page.privacyHeading}</Heading>
              <Text color="gray">{page.privacyBody}</Text>
              <Button asChild variant="soft"><Link to={PRIVACY_URL}>{page.privacy}</Link></Button>
            </Flex>
          </Card>
          <Card size="3">
            <Flex direction="column" gap="2">
              <Heading size="5">{page.boundariesHeading}</Heading>
              <Box asChild pl="4" m="0">
                <ul>{page.boundaries.map((item) => <li key={item}><Text>{item}</Text></li>)}</ul>
              </Box>
            </Flex>
          </Card>
        </Grid>

        <Flex gap="3" wrap="wrap">
          <Button asChild variant="soft"><Link to={MOBILE_URL}>{page.mobile}</Link></Button>
          <Button asChild variant="ghost">
            <RadixLink href={SUPPORT_URL} target="_blank" rel="noreferrer">{page.support}</RadixLink>
          </Button>
        </Flex>
      </Flex>
    </MarketingShell>
  )
}

export default HnsDaneBrowserExtensionPage
