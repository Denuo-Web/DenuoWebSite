import { Badge, Button, Callout, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Link, useParams } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

type OfferKey = 'discovery' | 'build' | 'stabilize'

const offerByCaseStudySlug: Record<string, OfferKey> = {
  'crowdpm-platform': 'discovery',
  'moonshine-art': 'build',
  questbycycle: 'build',
  'arm64-adk': 'stabilize',
}

const offerCopyByLanguage = {
  en: {
    backLabel: 'Back to work',
    offerFitHeading: 'Mapped offer',
    offerFitLabel: 'Best fit',
    buyerValueLabel: 'Buyer value',
    deliverablesLabel: 'What this work delivered',
    evidenceHeading: 'Evidence',
    challengeHeading: 'Challenge',
    solutionHeading: 'Solution',
    outcomesHeading: 'Outcomes',
    contactCta: 'Discuss a similar build',
    notFound: 'Case study not found. It may have been renamed in Firestore.',
    visitProjectLabel: 'Visit project',
    viewRepositoryLabel: 'View repository',
  },
  ja: {
    backLabel: '実績一覧へ戻る',
    offerFitHeading: '対応する提供オプション',
    offerFitLabel: '該当',
    buyerValueLabel: '導入後に得られるもの',
    deliverablesLabel: 'この案件で得られたもの',
    evidenceHeading: '実績の詳細',
    challengeHeading: '課題',
    solutionHeading: '解決内容',
    outcomesHeading: '成果',
    contactCta: '類似案件を相談する',
    notFound: 'ケーススタディが見つかりません。Firestore で名前が変更された可能性があります。',
    visitProjectLabel: '公開中のプロジェクトを見る',
    viewRepositoryLabel: 'リポジトリを見る',
  },
} as const

const offerDefinitions = {
  en: {
    discovery: {
      title: 'Architecture / Discovery Sprint',
      buyerValue: 'You leave with a clear build path and fewer avoidable decisions later.',
      deliverables: ['Technical plan', 'System design', 'Delivery roadmap', 'Constraints and tradeoffs'],
    },
    build: {
      title: 'MVP / Internal Tool Build',
      buyerValue: 'You get something your team can use, review, and continue shipping from.',
      deliverables: ['Working product increment', 'Data model + app shell', 'Auth/admin foundations', 'Production-ready deployment path'],
    },
    stabilize: {
      title: 'Stabilize / Operate',
      buyerValue: 'You get a system that is easier to run, support, and hand off without heroics.',
      deliverables: ['CI/CD and deployments', 'Auth cleanup', 'Integrations and background jobs', 'Observability and hardening'],
    },
  },
  ja: {
    discovery: {
      title: 'アーキテクチャ / ディスカバリー・スプリント',
      buyerValue: '実装に入る前に、進むべき道筋が明確になります。',
      deliverables: ['技術計画', 'システム設計', '進行ロードマップ', '制約とトレードオフ'],
    },
    build: {
      title: 'MVP / 社内ツール構築',
      buyerValue: 'チームが使って、確認して、次の改善へ進める形になります。',
      deliverables: ['動くプロダクトの増分', 'データモデル + アプリ基盤', '認証/管理の土台', '本番対応のデプロイ経路'],
    },
    stabilize: {
      title: '安定化 / 運用支援',
      buyerValue: '運用しやすく、引き継ぎやすいシステムになります。',
      deliverables: ['CI/CD とデプロイ', '認証整理', '連携・バックグラウンド処理', '監視とハードニング'],
    },
  },
} as const

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

const WorkDetailPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const { slug = '' } = useParams()
  const caseStudy = content.work.caseStudies.find((item) => item.slug === slug)
  const offerCopy = offerCopyByLanguage[language]
  const offerDefinition = offerDefinitions[language]
  const offerKey = caseStudy ? getOfferKeyForCaseStudy(caseStudy.slug, caseStudy.servicePackage?.title) : null
  const offer = offerKey ? offerDefinition[offerKey] : null

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
      <Flex direction="column" gap="4">
        <Flex>
          <Button asChild variant="ghost">
            <Link to="/work">{offerCopy.backLabel}</Link>
          </Button>
        </Flex>
        {!caseStudy && (
          <Callout.Root color="amber">
            <Callout.Text>{offerCopy.notFound}</Callout.Text>
          </Callout.Root>
        )}
        {caseStudy && (
          <>
            <Card size="4" variant="surface">
              <Flex direction="column" gap="3">
                <Flex align="center" justify="between" wrap="wrap" gap="2">
                  <Heading size="8">{caseStudy.name}</Heading>
                  {caseStudy.status && <Badge variant="soft">{caseStudy.status}</Badge>}
                </Flex>
                <Text size="4">{caseStudy.summary}</Text>
                <Text color="gray">{caseStudy.impact}</Text>
                <Flex direction="column" gap="2">
                  <Badge color="indigo" variant="soft">
                    {offerCopy.offerFitLabel}
                  </Badge>
                  <Heading size="5">{offerCopy.offerFitHeading}</Heading>
                  {offer && <Text>{offer.title}</Text>}
                  {offer && <Text color="gray">{offerCopy.buyerValueLabel}: {offer.buyerValue}</Text>}
                  {offer && (
                    <Flex direction="column" gap="1">
                      <Text size="2" color="gray">
                        {offerCopy.deliverablesLabel}
                      </Text>
                      {offer.deliverables.map((deliverable) => (
                        <Text key={deliverable} size="2" color="gray">
                          - {deliverable}
                        </Text>
                      ))}
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Card>

            <Card size="4" variant="surface">
              <Flex direction="column" gap="3">
                <Heading size="6">{offerCopy.evidenceHeading}</Heading>
                <Heading size="5">{offerCopy.challengeHeading}</Heading>
                <Text>{caseStudy.challenge}</Text>
                <Heading size="5">{offerCopy.solutionHeading}</Heading>
                <Text>{caseStudy.solution}</Text>
                {caseStudy.outcomes.length > 0 && (
                  <Flex direction="column" gap="1">
                    <Heading size="5">{offerCopy.outcomesHeading}</Heading>
                    <Flex direction="column" gap="1">
                      {caseStudy.outcomes.map((outcome) => (
                        <Text key={outcome} color="gray">
                          - {outcome}
                        </Text>
                      ))}
                    </Flex>
                  </Flex>
                )}
                <Flex gap="2" wrap="wrap">
                  {caseStudy.stack.map((tech) => (
                    <Badge key={tech} variant="soft">
                      {tech}
                    </Badge>
                  ))}
                </Flex>
                <Flex gap="2" wrap="wrap">
                  {caseStudy.liveUrl && (
                    <Button asChild>
                      <a href={caseStudy.liveUrl} target="_blank" rel="noreferrer">
                        {offerCopy.visitProjectLabel}
                      </a>
                    </Button>
                  )}
                  {caseStudy.repositoryUrl && (
                    <Button asChild variant="soft">
                      <a href={caseStudy.repositoryUrl} target="_blank" rel="noreferrer">
                        {offerCopy.viewRepositoryLabel}
                      </a>
                    </Button>
                  )}
                  <Button asChild variant="soft">
                    <Link to="/contact">{offerCopy.contactCta}</Link>
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </>
        )}
      </Flex>
    </MarketingShell>
  )
}

export default WorkDetailPage
