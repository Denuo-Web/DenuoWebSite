import { Badge, Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

type OfferKey = 'discovery' | 'build' | 'stabilize'

interface OfferDefinition {
  key: OfferKey
  title: string
  summary: string
  whoFor: string
  problems: string[]
  deliverables: string[]
  buyerValue: string
  caseStudySlugs: string[]
}

const offerByCaseStudySlug: Record<string, OfferKey> = {
  'crowdpm-platform': 'discovery',
  'moonshine-art': 'build',
  questbycycle: 'build',
  'apk-workbench': 'stabilize',
  'arm64-adk': 'stabilize',
  dripcopy: 'stabilize',
}

const localizedOfferCopy = {
  en: {
    heroNote:
      'Every project below maps to one of three offers: plan, build, or stabilize. That keeps the work legible for teams with real constraints.',
    offerSectionHeading: 'Three offers, not a menu of vague services',
    offerSectionLead:
      'Each offer is framed around a decision point, a type of system, and the kind of handoff a team actually needs.',
    offerCardCta: 'Open the related case study',
    offerLabel: 'Offer',
    buyerValueLabel: 'Buyer value',
    deliverablesLabel: 'Delivered',
    linkedCaseStudiesLabel: 'Supported by',
    mappedOfferHeading: 'How the case studies map to the offers',
    mappedOfferLead:
      'The public work is organized around the three offers so prospective buyers can quickly see which engagement matches their situation.',
  },
  ja: {
    heroNote:
      '各案件は3つの提供オプションのどれかに対応しています。制約のある小規模チームでも判断しやすい形に整理しています。',
    offerSectionHeading: '曖昧なサービスメニューではなく、3つの明確な提供オプション',
    offerSectionLead:
      '各オプションは、判断ポイント、対象システム、そして小規模チームに必要な引き継ぎを基準にまとめています。',
    offerCardCta: '関連ケーススタディを見る',
    offerLabel: '提供オプション',
    buyerValueLabel: '導入後に得られるもの',
    deliverablesLabel: '納品内容',
    linkedCaseStudiesLabel: '該当実績',
    mappedOfferHeading: 'ケーススタディと提供オプションの対応',
    mappedOfferLead:
      '公開実績を3つの提供オプションに整理し、どの案件がどの相談に近いかをすぐ判断できるようにしています。',
  },
} as const

const offerDefinitions: Record<'en' | 'ja', OfferDefinition[]> = {
  en: [
    {
      key: 'discovery',
      title: 'Discovery / Implementation Plan',
      summary: 'For requirements ambiguity, API ambiguity, data ambiguity, or workflow ambiguity.',
      whoFor:
        'Best for teams that need a technical plan before build work, integration work, or stakeholder review.',
      problems: [
        'No shared system design yet',
        'APIs, data sources, and constraints are still unclear',
        'The team needs tradeoffs before committing to implementation',
      ],
      deliverables: ['Technical plan', 'System design', 'Delivery roadmap', 'Constraints and tradeoffs'],
      buyerValue: 'You leave with a clear build path and fewer avoidable decisions later.',
      caseStudySlugs: ['crowdpm-platform'],
    },
    {
      key: 'build',
      title: 'Web App / Integration Build',
      summary: 'For authenticated web apps, APIs, dashboards, checkout flows, admin tools, and workflow systems.',
      whoFor: 'Best for teams that need a working product increment and a supportable launch path.',
      problems: [
        'The product needs to move from concept to a usable system',
        'Auth, data model, API boundaries, and deployment foundations still need to be built',
        'The team needs a production-ready path, not just a prototype',
      ],
      deliverables: [
        'Working product increment',
        'Data model + app shell',
        'Auth/admin foundations',
        'Production-ready deployment path',
      ],
      buyerValue: 'You get something your team can use, review, and continue shipping from.',
      caseStudySlugs: ['questbycycle', 'moonshine-art'],
    },
    {
      key: 'stabilize',
      title: 'Stabilize / Support Handoff',
      summary: 'For existing systems that need cleanup, deployment discipline, documentation, and handoff.',
      whoFor:
        'Best for teams with an existing codebase or internal tool that needs to be made reliable enough to operate.',
      problems: [
        'Deployments are fragile or undocumented',
        'Auth, integrations, or background jobs need cleanup',
        'The team needs observability and a clear operational handoff',
      ],
      deliverables: [
        'CI/CD and deployments',
        'Auth cleanup',
        'Integrations and background jobs',
        'Observability and hardening',
      ],
      buyerValue: 'You get a system that is easier to run, support, and hand off without heroics.',
      caseStudySlugs: ['apk-workbench'],
    },
  ],
  ja: [
    {
      key: 'discovery',
      title: 'アーキテクチャ / ディスカバリー・スプリント',
      summary: '要件・API・データ・ワークフローの不確実性がある段階向けです。',
      whoFor:
        '実装、連携、関係者レビューの前に技術方針を固めたいチームに向いています。',
      problems: ['システム設計の共通認識がまだない', 'API、データソース、制約が不明確', '実装前に判断材料が必要'],
      deliverables: ['技術計画', 'システム設計', '進行ロードマップ', '制約とトレードオフ'],
      buyerValue: '実装に入る前に、進むべき道筋が明確になります。',
      caseStudySlugs: ['crowdpm-platform'],
    },
    {
      key: 'build',
      title: 'Webアプリ / 連携構築',
      summary: '認証付きWebアプリ、API、ダッシュボード、決済、管理画面、ワークフロー向けです。',
      whoFor: '動く成果物と、支援しやすい公開経路が必要なチーム向けです。',
      problems: ['アイデアから使えるシステムへ進めたい', '認証・データモデル・API境界・デプロイ基盤がまだない', '試作品ではなく本番前提の土台が必要'],
      deliverables: ['動くプロダクトの増分', 'データモデル + アプリ基盤', '認証/管理の土台', '本番対応のデプロイ経路'],
      buyerValue: 'チームが使って、確認して、次の改善へ進める形になります。',
      caseStudySlugs: ['questbycycle', 'moonshine-art'],
    },
    {
      key: 'stabilize',
      title: '安定化 / サポート引き継ぎ',
      summary: '既存システムの整理、運用整備、文書化、引き継ぎが必要な段階向けです。',
      whoFor:
        '既存コードベースや社内ツールを、安心して運用できる状態にしたいチーム向けです。',
      problems: ['デプロイが不安定、または手順が残っていない', '認証・連携・バックグラウンド処理の整理が必要', '監視と運用引き継ぎが不足している'],
      deliverables: ['CI/CD とデプロイ', '認証整理', '連携・バックグラウンド処理', '監視とハードニング'],
      buyerValue: '運用しやすく、引き継ぎやすいシステムになります。',
      caseStudySlugs: ['apk-workbench'],
    },
  ],
}

const getOfferKeyForCaseStudy = (caseStudySlug: string, servicePackageTitle?: string): OfferKey => {
  const fromSlug = offerByCaseStudySlug[caseStudySlug]
  if (fromSlug) {
    return fromSlug
  }

  const normalizedTitle = servicePackageTitle?.trim().toLowerCase() ?? ''
  if (normalizedTitle.includes('architecture') || normalizedTitle.includes('platform')) {
    return 'discovery'
  }
  if (normalizedTitle.includes('stabilize') || normalizedTitle.includes('tooling') || normalizedTitle.includes('operate')) {
    return 'stabilize'
  }

  return 'build'
}

const WorkPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const { work, contact } = content
  const workCopy = copy.pages.work
  const offerCopy = localizedOfferCopy[language]
  const offers = offerDefinitions[language]
  const offerByKey = new Map(offers.map((offer) => [offer.key, offer]))
  const offerGroups = offers.map((offer) => ({
    ...offer,
    caseStudies: work.caseStudies.filter(
      (caseStudy) => getOfferKeyForCaseStudy(caseStudy.slug, caseStudy.servicePackage?.title) === offer.key
    ),
  }))

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
          <Flex direction="column" gap="3">
            <Text color="indigo" size="1" weight="medium">
              {workCopy.eyebrow}
            </Text>
            <Heading size="8">{workCopy.heroTitle}</Heading>
            <Text size="4" color="gray">
              {workCopy.heroLead}
            </Text>
            <Text size="2" color="gray">
              {offerCopy.heroNote}
            </Text>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <Link to="/contact">{workCopy.heroPrimaryCta}</Link>
              </Button>
              <Button asChild variant="soft">
                <Link to="/services">{workCopy.heroSecondaryCta}</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="case-study-grid-heading">
            <Flex direction="column" gap="3">
              <Heading id="case-study-grid-heading" size="6">
                {workCopy.gridHeading}
              </Heading>
              <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3">
                {work.caseStudies.map((caseStudy) => {
                  const offerKey = getOfferKeyForCaseStudy(caseStudy.slug, caseStudy.servicePackage?.title)
                  const offer = offerByKey.get(offerKey)

                  return (
                    <Card key={caseStudy.slug} asChild size="3" variant="surface">
                      <Link to={`/work/${caseStudy.slug}`}>
                        <Flex direction="column" gap="2">
                          <Flex gap="2" wrap="wrap">
                            {caseStudy.status && <Badge variant="soft">{caseStudy.status}</Badge>}
                            <Badge color="indigo">{offer?.title ?? caseStudy.servicePackage?.title ?? offerCopy.offerLabel}</Badge>
                          </Flex>
                          <Heading size="4">{caseStudy.name}</Heading>
                          <Text color="gray">{caseStudy.summary}</Text>
                          <Text size="2" color="gray">
                            {caseStudy.impact}
                          </Text>
                          {offer && (
                            <Text size="2" color="gray">
                              {offerCopy.buyerValueLabel}: {offer.buyerValue}
                            </Text>
                          )}
                          <Box asChild pl="3" m="0">
                            <ul>
                              {caseStudy.outcomes.slice(0, 2).map((outcome) => (
                                <li key={outcome}>
                                  <Text size="2">{outcome}</Text>
                                </li>
                              ))}
                            </ul>
                          </Box>
                          <Text size="2" color="gray">
                            {workCopy.openDetailsLabel}
                          </Text>
                        </Flex>
                      </Link>
                    </Card>
                  )
                })}
              </Grid>
            </Flex>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="offer-mapping-heading">
            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" justify="between" wrap="wrap" gap="2">
                  <Heading id="offer-mapping-heading" size="6">
                    {offerCopy.mappedOfferHeading}
                  </Heading>
                  <Button asChild variant="ghost" size="2">
                    <Link to="/services">{copy.nav.services}</Link>
                  </Button>
                </Flex>
                <Text color="gray">{offerCopy.mappedOfferLead}</Text>
                <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                  {offerGroups.map((offer) => (
                    <Card key={offer.key} variant="surface" size="3">
                      <Flex direction="column" gap="2">
                        <Badge variant="soft" color="indigo">
                          {offerCopy.offerLabel}
                        </Badge>
                        <Heading size="4">{offer.title}</Heading>
                        <Text color="gray">{offer.summary}</Text>
                        <Text size="2" color="gray">
                          {offer.whoFor}
                        </Text>
                        <Box asChild pl="3" m="0">
                          <ul>
                            {offer.deliverables.map((deliverable) => (
                              <li key={deliverable}>
                                <Text size="2">{deliverable}</Text>
                              </li>
                            ))}
                          </ul>
                        </Box>
                        <Text size="2" color="gray">
                          {offerCopy.buyerValueLabel}: {offer.buyerValue}
                        </Text>
                        {offer.caseStudies.length > 0 && (
                          <Box asChild pl="3" m="0">
                            <ul>
                              {offer.caseStudies.map((caseStudy) => (
                                <li key={caseStudy.slug}>
                                  <Text size="2" color="gray">
                                    {offerCopy.linkedCaseStudiesLabel}:{' '}
                                    <Link to={`/work/${caseStudy.slug}`}>{caseStudy.name}</Link>
                                  </Text>
                                </li>
                              ))}
                            </ul>
                          </Box>
                        )}
                      </Flex>
                    </Card>
                  ))}
                </Grid>
              </Flex>
            </Card>
          </section>
        </Box>

        <Box asChild>
          <section aria-labelledby="offer-details-heading">
            <Flex direction="column" gap="3">
              <Heading id="offer-details-heading" size="6">
                {offerCopy.offerSectionHeading}
              </Heading>
              <Text color="gray">{offerCopy.offerSectionLead}</Text>
              <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                {offers.map((offer) => (
                  <Card key={offer.key} variant="surface" size="3">
                    <Flex direction="column" gap="2">
                      <Badge variant="soft" color="indigo">
                        {offerCopy.offerLabel}
                      </Badge>
                      <Heading size="4">{offer.title}</Heading>
                      <Text color="gray">{offer.summary}</Text>
                      <Text size="2" color="gray">
                        {offer.whoFor}
                      </Text>
                      <Box asChild pl="3" m="0">
                        <ul>
                          {offer.problems.map((problem) => (
                            <li key={problem}>
                              <Text size="2">{problem}</Text>
                            </li>
                          ))}
                        </ul>
                      </Box>
                      <Text size="2" color="gray">
                        {offerCopy.deliverablesLabel}
                      </Text>
                      <Box asChild pl="3" m="0">
                        <ul>
                          {offer.deliverables.map((deliverable) => (
                            <li key={deliverable}>
                              <Text size="2">{deliverable}</Text>
                            </li>
                          ))}
                        </ul>
                      </Box>
                      <Text size="2" color="gray">
                        {offerCopy.buyerValueLabel}: {offer.buyerValue}
                      </Text>
                      <Button asChild variant="soft" size="2">
                        <Link to={`/work/${offer.caseStudySlugs[0]}`}>{offerCopy.offerCardCta}</Link>
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            </Flex>
          </section>
        </Box>

        <Card size="4">
          <Flex direction={{ initial: 'column', sm: 'row' }} justify="between" gap="4">
            <Flex direction="column" gap="2">
              <Heading size="6">{workCopy.finalHeading}</Heading>
              <Text color="gray">{workCopy.finalBody}</Text>
              <Badge variant="soft">
                {workCopy.emailPrefix}
                {contact.email}
              </Badge>
            </Flex>
            <Flex direction="column" gap="2" align={{ initial: 'start', sm: 'end' }}>
              <Button asChild>
                <Link to="/contact">{copy.nav.contact}</Link>
              </Button>
              <Button asChild variant="soft">
                <Link to="/process">{copy.nav.process}</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </MarketingShell>
  )
}

export default WorkPage
