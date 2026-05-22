import { Badge, Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import MarketingShell from '../components/marketing/MarketingShell'
import type { MarketingPageProps } from './marketingPageProps'

interface OfferNarrative {
  whoFor: string
  solves: string[]
  buyerGets: string
}

const servicesSectionCopy = {
  en: {
    whoForLabel: 'Who it is for',
    solvesLabel: 'What problems it solves',
    deliversLabel: 'What is delivered',
    buyerGetsLabel: 'What you get at the end',
  },
  ja: {
    whoForLabel: '向いているチーム',
    solvesLabel: '解決する課題',
    deliversLabel: '納品内容',
    buyerGetsLabel: '最後に得られるもの',
  },
} as const

const offerNarrativesByLanguage: Record<'en' | 'ja', OfferNarrative[]> = {
  en: [
    {
      whoFor:
        'Teams with requirements ambiguity, data ambiguity, civic or operational workflow ambiguity, or product ambiguity that need a concrete technical plan before implementation.',
      solves: [
        'The system shape is still unclear',
        'The users, data sources, institutional constraints, or integrations are still moving',
        'The team needs architecture tradeoffs before committing build time',
      ],
      buyerGets: 'A technical plan, delivery roadmap, workflow boundary, and system boundary the team can act on immediately.',
    },
    {
      whoFor:
        'Teams that need an authenticated web app, civic or operations tool, API, dashboard, admin tool, or workflow system to move from concept into real use.',
      solves: [
        'The product needs to become usable by real people',
        'Auth, app structure, support paths, and data flows still need to be established',
        'The team needs a production-ready path instead of a throwaway prototype',
      ],
      buyerGets: 'A working product increment with the technical foundations needed to keep shipping.',
    },
    {
      whoFor:
        'Teams with an existing codebase or internal tool that needs cleanup, deployment discipline, and operational handoff.',
      solves: [
        'Deployments are fragile or unclear',
        'Auth, background jobs, or integrations need cleanup',
        'The team needs observability, hardening, and a supportable operating path',
      ],
      buyerGets: 'A system that is easier to run, maintain, and hand off without relying on a single operator.',
    },
  ],
  ja: [
    {
      whoFor:
        '要件、データ、公共 / 運用ワークフロー、プロダクト像がまだ固まっておらず、実装前に具体的な技術方針が必要なチーム向けです。',
      solves: [
        'システムの形がまだ見えていない',
        '利用者、データソース、組織上の制約、連携条件が固まっていない',
        '実装に入る前に設計上の判断材料が必要',
      ],
      buyerGets: 'すぐに実行へ移せる技術計画、進行ロードマップ、ワークフロー境界、システム境界を得られます。',
    },
    {
      whoFor:
        '認証付きWebアプリ、公共 / 運用ツール、API、ダッシュボード、管理画面、ワークフローを形にして実運用へ進めたいチーム向けです。',
      solves: [
        'アイデアを実際に使える形へ進めたい',
        '認証、アプリ構成、サポート経路、データフローの土台がまだない',
        '試作品ではなく本番を見据えた道筋が必要',
      ],
      buyerGets: '継続して改善できる技術基盤付きの動く成果物を得られます。',
    },
    {
      whoFor:
        '既存コードベースや社内ツールを整理し、デプロイと運用を安定させたいチーム向けです。',
      solves: [
        'デプロイが不安定、または手順が曖昧',
        '認証、バックグラウンド処理、外部連携の整理が必要',
        '監視、ハードニング、引き継ぎ可能な運用経路が不足している',
      ],
      buyerGets: '運用しやすく、保守しやすく、引き継ぎしやすい状態を得られます。',
    },
  ],
}

const ServicesPage = ({
  content,
  loading,
  error,
  onOpenThemePanel,
  language,
  onToggleLanguage,
  copy,
}: MarketingPageProps) => {
  const { services, differentiators, work } = content
  const servicesCopy = copy.pages.services
  const serviceSectionLabels = servicesSectionCopy[language]
  const offerNarratives = offerNarrativesByLanguage[language]

  const findLinkedCaseStudy = (packageTitle: string) =>
    work.caseStudies.find(
      (caseStudy) =>
        caseStudy.servicePackage?.title?.trim().toLowerCase() === packageTitle.trim().toLowerCase()
    )

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
              {servicesCopy.eyebrow}
            </Text>
            <Heading size="8">{servicesCopy.heroTitle}</Heading>
            <Text size="4" color="gray">
              {servicesCopy.heroLead}
            </Text>
            <Flex gap="2" wrap="wrap">
              <Button asChild>
                <Link to="/contact">{servicesCopy.heroPrimaryCta}</Link>
              </Button>
              <Button asChild variant="soft">
                <Link to="/work">{servicesCopy.heroSecondaryCta}</Link>
              </Button>
            </Flex>
          </Flex>
        </Card>

        <Box asChild>
          <section aria-labelledby="package-cards-heading">
            <Flex direction="column" gap="3">
              <Heading id="package-cards-heading" size="6">
                {servicesCopy.packagesHeading}
              </Heading>
              <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                {services.map((service, index) => {
                  const linkedCaseStudy = findLinkedCaseStudy(service.title)
                  const link = linkedCaseStudy ? `/work/${linkedCaseStudy.slug}` : '/contact'
                  const narrative = offerNarratives[index]

                  return (
                    <Card key={service.title} asChild size="3" variant="surface">
                      <Link to={link}>
                        <Flex direction="column" gap="2">
                          <Badge variant="soft">
                            {linkedCaseStudy ? servicesCopy.packageBadgeRelated : servicesCopy.packageBadgeNew}
                          </Badge>
                          <Heading size="4">{service.title}</Heading>
                          <Text color="gray">{service.summary}</Text>
                          {narrative && (
                            <>
                              <Text size="2" weight="medium">
                                {serviceSectionLabels.whoForLabel}
                              </Text>
                              <Text size="2" color="gray">
                                {narrative.whoFor}
                              </Text>
                              <Text size="2" weight="medium">
                                {serviceSectionLabels.solvesLabel}
                              </Text>
                              <Box asChild pl="3" m="0">
                                <ul>
                                  {narrative.solves.map((problem) => (
                                    <li key={problem}>
                                      <Text size="2">{problem}</Text>
                                    </li>
                                  ))}
                                </ul>
                              </Box>
                            </>
                          )}
                          <Text size="2" weight="medium">
                            {serviceSectionLabels.deliversLabel}
                          </Text>
                          <Box asChild pl="3" m="0">
                            <ul>
                              {service.bullets.slice(0, 3).map((outcome) => (
                                <li key={outcome}>
                                  <Text size="2">{outcome}</Text>
                                </li>
                              ))}
                            </ul>
                          </Box>
                          {narrative && (
                            <>
                              <Text size="2" weight="medium">
                                {serviceSectionLabels.buyerGetsLabel}
                              </Text>
                              <Text size="2" color="gray">
                                {narrative.buyerGets}
                              </Text>
                            </>
                          )}
                          <Text size="2" color="gray">
                            {linkedCaseStudy
                              ? `${servicesCopy.packageSeePrefix}${linkedCaseStudy.name}`
                              : servicesCopy.packageFallbackCta}
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
          <section aria-labelledby="delivery-pillars-heading">
            <Flex direction="column" gap="3">
              <Flex align="center" justify="between" wrap="wrap" gap="2">
                <Heading id="delivery-pillars-heading" size="6">
                  {servicesCopy.pillarsHeading}
                </Heading>
                <Button asChild variant="ghost" size="2">
                  <Link to="/process">{servicesCopy.pillarsCta}</Link>
                </Button>
              </Flex>
              <Grid columns={{ initial: '1', sm: '3' }} gap="3">
                {differentiators.slice(0, 3).map((item) => (
                  <Card key={item} variant="surface" size="3">
                    <Flex direction="column" gap="2">
                      <Badge variant="soft">{servicesCopy.pillarBadgeFallback}</Badge>
                      <Heading size="4">{item}</Heading>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            </Flex>
          </section>
        </Box>

        <Card size="4">
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" justify="between">
            <Flex direction="column" gap="2">
              <Heading size="6">{servicesCopy.choosingHeading}</Heading>
              <Text color="gray">{servicesCopy.choosingBody}</Text>
              <Flex gap="2" wrap="wrap">
                {differentiators.slice(0, 4).map((item) => (
                  <Badge key={item} variant="soft">
                    {item}
                  </Badge>
                ))}
              </Flex>
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

export default ServicesPage
