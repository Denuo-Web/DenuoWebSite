export type Language = 'en' | 'ja'

interface PathOption {
  title: string
  summary: string
  to: string
}

interface ProcessSummaryStep {
  title: string
  detail: string
}

interface DeliveryStep {
  title: string
  detail: string
  output: string
}

interface CredibilityBullet {
  title: string
  detail: string
}

export interface UiCopy {
  nav: {
    services: string
    work: string
    process: string
    contact: string
    about: string
    admin: string
    backToSite: string
    themeToggle: string
    languageToggle: string
  }
  sections: {
    servicesKicker: string
    servicesTitle: string
    servicesLead: string
    projectsKicker: string
    projectsTitle: string
    projectsLead: string
    processKicker: string
    processTitle: string
    processLead: string
    contactKicker: string
    footerLine: string
  }
  pages: {
    landing: {
      heroPrimaryCta: string
      heroSecondaryCta: string
      credibilityHeading: string
      credibilityBullets: CredibilityBullet[]
      featuredWorkHeading: string
      featuredWorkCta: string
      servicesSnapshotHeading: string
      servicesSnapshotCta: string
      processHeading: string
      processCta: string
      processSummary: ProcessSummaryStep[]
      aboutHeading: string
      aboutBody: string
      aboutCta: string
      intakeLabel: string
      intakePrompts: string[]
      finalPrimaryCta: string
    }
    services: {
      eyebrow: string
      heroTitle: string
      heroLead: string
      heroPrimaryCta: string
      heroSecondaryCta: string
      packagesHeading: string
      packageBadgeRelated: string
      packageBadgeNew: string
      packageTimelinePrefix: string
      packageSeePrefix: string
      packageFallbackCta: string
      pillarsHeading: string
      pillarsCta: string
      pillarBadgeFallback: string
      choosingHeading: string
      choosingBody: string
    }
    work: {
      eyebrow: string
      heroTitle: string
      heroLead: string
      heroPrimaryCta: string
      heroSecondaryCta: string
      gridHeading: string
      openDetailsLabel: string
      packagesHeading: string
      packagesCta: string
      packagesCardSummary: string
      finalHeading: string
      finalBody: string
      emailPrefix: string
    }
    process: {
      eyebrow: string
      heroTitle: string
      heroLead: string
      heroPrimaryCta: string
      heroSecondaryCta: string
      stepsHeading: string
      steps: DeliveryStep[]
      optionsHeading: string
      optionsCta: string
      optionsDetailFallback: string
      kickoffHeading: string
      kickoffChecklist: string[]
    }
    about: {
      eyebrow: string
      heroTitle: string
      heroBody: string
      heroPrimaryCta: string
      heroSecondaryCta: string
      howHeading: string
      howBody: string
      evidenceHeading: string
      evidenceCta: string
      optionsHeading: string
      optionsCta: string
      finalHeading: string
      finalBody: string
    }
    contact: {
      eyebrow: string
      heroSecondaryCta: string
      checklistHeading: string
      checklist: string[]
      startPathsHeading: string
      startPaths: PathOption[]
      responseHeading: string
      responseBody: string
      finalPrimaryCta: string
      finalSecondaryCta: string
    }
  }
}

export const uiCopy: Record<Language, UiCopy> = {
  en: {
    nav: {
      services: 'Services',
      work: 'Work',
      process: 'Offers',
      contact: 'Contact',
      about: 'About',
      admin: 'Admin',
      backToSite: 'Back to site',
      themeToggle: 'Open theme panel (press T)',
      languageToggle: 'Switch language (EN/JA)',
    },
    sections: {
      servicesKicker: 'What I do',
      servicesTitle: 'Product direction + full-stack build, done together.',
      servicesLead:
        'Strategy, engineering, and cloud operations combined. Every engagement ships with documentation, admin controls, and CI/CD so you can keep momentum.',
      projectsKicker: 'Recent work',
      projectsTitle: 'Modern launches for nonprofits, founders, and research teams.',
      projectsLead: 'From production PWAs to platform-ready monorepos.',
      processKicker: 'What I offer',
      processTitle: 'Clear engagement options.',
      processLead: 'Pick a focused offer, then expand as needed with direct ownership and clean handoffs.',
      contactKicker: 'Get started',
      footerLine: 'Full-stack delivery by Jaron Rosenau — Firebase, Google Cloud Run, and modern web.',
    },
    pages: {
      landing: {
        heroPrimaryCta: 'View work',
        heroSecondaryCta: 'Contact',
        credibilityHeading: 'What you can expect',
        credibilityBullets: [
          {
            title: 'Architecture that fits your constraints',
            detail:
              'Data model, authentication, and deployment decisions are documented up front so founders and team leads can make tradeoffs early.',
          },
          {
            title: 'Delivery with weekly proof',
            detail:
              'You get scoped milestones, shipped increments, and visible progress each week instead of end-of-project surprises.',
          },
          {
            title: 'Operational readiness from day one',
            detail:
              'CI/CD, monitoring, and runbooks are built into delivery so nonprofits and research teams can run what gets launched.',
          },
        ],
        featuredWorkHeading: 'Featured work',
        featuredWorkCta: 'See all case studies',
        servicesSnapshotHeading: 'Services snapshot',
        servicesSnapshotCta: 'Explore services',
        processHeading: 'Process',
        processCta: 'Open full process',
        processSummary: [
          {
            title: '1. Scope',
            detail: 'Define objectives, constraints, and success criteria with your decision makers.',
          },
          {
            title: '2. Architect',
            detail: 'Set technical boundaries, data flows, and delivery slices before heavy build work.',
          },
          {
            title: '3. Build',
            detail: 'Ship production-ready increments with review checkpoints and measurable outcomes.',
          },
          {
            title: '4. Launch + support',
            detail: 'Handoff docs, operational guardrails, and next-priority roadmap recommendations.',
          },
        ],
        aboutHeading: 'About the operator',
        aboutBody:
          "I'm Jaron Rosenau, founder of Denuo Web. I work directly with founders, nonprofits, and research teams to turn requirements into shipped software and stable operations.",
        aboutCta: 'Read full background',
        intakeLabel: 'Intake prompt:',
        intakePrompts: [
          'Who the product is for and what needs to improve in the next 60-90 days.',
          'What already exists today (codebase, tools, or manual process).',
          'Any fixed dates, compliance constraints, or budget boundaries.',
        ],
        finalPrimaryCta: 'Contact',
      },
      services: {
        eyebrow: 'Services',
        heroTitle: 'Service packages built for teams that need shipped outcomes.',
        heroLead:
          'Each package combines planning, implementation, and handoff so founders, nonprofits, and research teams can move from backlog to production with fewer blockers.',
        heroPrimaryCta: 'Start a package discussion',
        heroSecondaryCta: 'View related case studies',
        packagesHeading: 'Packages and deliverables',
        packageBadgeRelated: 'Related case study',
        packageBadgeNew: 'New engagement',
        packageTimelinePrefix: 'Timeline: ',
        packageSeePrefix: 'See: ',
        packageFallbackCta: 'Discuss this package with your context',
        pillarsHeading: 'Delivery pillars',
        pillarsCta: 'How delivery works',
        pillarBadgeFallback: 'Delivery area',
        choosingHeading: 'Choosing the right package',
        choosingBody:
          'Most teams start with a narrow scope, ship one measurable outcome, then expand with the same architecture and delivery rhythm.',
      },
      work: {
        eyebrow: 'Work',
        heroTitle: 'Case studies focused on delivery outcomes, not demos.',
        heroLead:
          'Each project includes the context, challenge, implementation choices, and operational result so you can assess fit before starting your own engagement.',
        heroPrimaryCta: 'Discuss a similar project',
        heroSecondaryCta: 'See service packages',
        gridHeading: 'Recent case studies',
        openDetailsLabel: 'Open case study details',
        packagesHeading: 'Engagement packages used in these projects',
        packagesCta: 'Open services',
        packagesCardSummary: 'See package deliverables and where it fits.',
        finalHeading: 'Need this level of execution for your team?',
        finalBody: "Send your current constraints and timeline. You'll get a scoped recommendation and first-step plan.",
        emailPrefix: 'Email: ',
      },
      process: {
        eyebrow: 'Process',
        heroTitle: 'A delivery process built to reduce risk and keep momentum.',
        heroLead:
          'Teams get a clear working cadence, explicit ownership, and practical handoff artifacts from planning through launch.',
        heroPrimaryCta: 'Start planning',
        heroSecondaryCta: 'Review packages',
        stepsHeading: 'Four-step delivery sequence',
        steps: [
          {
            title: '1. Scope alignment',
            detail:
              'We map objectives, risks, dependencies, and constraints with the people who own timeline and budget decisions.',
            output: 'Output: scoped target, architecture boundaries, and delivery checkpoints.',
          },
          {
            title: '2. Technical design',
            detail:
              'Data models, API boundaries, and environment strategy are defined before implementation to reduce rework.',
            output: 'Output: implementation plan with explicit tradeoffs and sequencing.',
          },
          {
            title: '3. Build and review',
            detail:
              'Work ships in production-grade increments with weekly reviews, issue tracking, and scope adjustments as needed.',
            output: 'Output: tested features and documented operational expectations.',
          },
          {
            title: '4. Launch and handoff',
            detail:
              'Deployment, monitoring, and handoff artifacts are finalized so your team can sustain and extend the product.',
            output: 'Output: release checklist, runbook, and prioritized next-step backlog.',
          },
        ],
        optionsHeading: 'Engagement options currently offered',
        optionsCta: 'Open services',
        optionsDetailFallback: 'Scope and stack details shared during planning.',
        kickoffHeading: 'Before kickoff, send this intake context',
        kickoffChecklist: [
          'Current product state or process gaps to address first.',
          'Decision owners and how quickly approvals can happen.',
          'Deadlines tied to grants, launches, or stakeholder commitments.',
        ],
      },
      about: {
        eyebrow: 'About',
        heroTitle: 'Operator-led delivery for teams that need practical execution.',
        heroBody:
          "I'm Jaron Rosenau, founder of Denuo Web. I work directly with founders, nonprofits, and research teams to take projects from fuzzy requirements to production systems with clear ownership and handoff.",
        heroPrimaryCta: 'Start a conversation',
        heroSecondaryCta: 'Review case studies',
        howHeading: 'How I work',
        howBody:
          'Engagements are built around decision velocity, measurable outcomes, and operational readiness. Strategy and implementation stay connected so teams can ship without losing context.',
        evidenceHeading: 'Recent delivery evidence',
        evidenceCta: 'See all work',
        optionsHeading: 'Engagement options',
        optionsCta: 'Delivery process',
        finalHeading: 'If you need a technical partner who ships, not just advises',
        finalBody: "Share your timeline, constraints, and what success looks like. I'll reply with a concrete next step.",
      },
      contact: {
        eyebrow: 'Contact',
        heroSecondaryCta: 'Review process first',
        checklistHeading: 'Include this in your first message',
        checklist: [
          'Who this is for and the main user or stakeholder problem.',
          'What already exists (codebase, tools, or current manual workflow).',
          'Any deadlines, compliance requirements, or budget limits.',
        ],
        startPathsHeading: 'Choose your starting path',
        startPaths: [
          {
            title: 'See delivery evidence',
            summary: 'Review comparable projects and outcomes first.',
            to: '/work',
          },
          {
            title: 'Review service packages',
            summary: 'Pick the package closest to your immediate need.',
            to: '/services',
          },
          {
            title: 'Understand the process',
            summary: 'See how scope, build, and handoff are run.',
            to: '/process',
          },
        ],
        responseHeading: 'Response expectation',
        responseBody: 'I reply within one business day with either clarifying questions or a proposed first-step scope.',
        finalPrimaryCta: 'Start via email',
        finalSecondaryCta: 'View case studies',
      },
    },
  },
  ja: {
    nav: {
      services: 'サービス',
      work: '実績',
      process: '提供プラン',
      contact: '連絡先',
      about: '会社情報',
      admin: '管理',
      backToSite: 'サイトへ戻る',
      themeToggle: 'テーマパネルを開く（Tキー）',
      languageToggle: '言語を切り替える（英語／日本語）',
    },
    sections: {
      servicesKicker: '提供サービス',
      servicesTitle: 'プロダクト戦略からフルスタック開発まで伴走します。',
      servicesLead:
        '戦略・開発・クラウド運用をワンチームで。ドキュメントと管理画面、CI/CDを含めて継続しやすい形で納品します。',
      projectsKicker: '最近のプロジェクト',
      projectsTitle: 'NPO・スタートアップ・研究チーム向けの最新リリース。',
      projectsLead: '本番稼働のPWAからモノレポ基盤まで対応。',
      processKicker: '提供プラン',
      processTitle: '明確な提供オプション。',
      processLead: '目的に合うパッケージを選び、必要に応じて段階的に拡張できます。',
      contactKicker: 'まずはご相談ください',
      footerLine: 'Jaron Rosenau が提供するフルスタックデリバリー — Firebase / Google Cloud Run / Modern Web',
    },
    pages: {
      landing: {
        heroPrimaryCta: '実績を見る',
        heroSecondaryCta: '連絡する',
        credibilityHeading: '提供する内容',
        credibilityBullets: [
          {
            title: '制約に合うアーキテクチャ設計',
            detail:
              'データモデル・認証・デプロイ方針を初期に明文化し、創業者や意思決定者が早い段階で判断できるようにします。',
          },
          {
            title: '週次で確認できる進捗',
            detail: 'スコープ済みマイルストーンと成果物を毎週提示し、終盤での想定外を減らします。',
          },
          {
            title: '運用を前提にした納品',
            detail: 'CI/CD、監視、運用手順を実装に含め、NPOや研究チームでも継続運用しやすくします。',
          },
        ],
        featuredWorkHeading: '注目の実績',
        featuredWorkCta: '実績一覧を見る',
        servicesSnapshotHeading: 'サービス概要',
        servicesSnapshotCta: 'サービス詳細へ',
        processHeading: '進め方',
        processCta: '進め方の詳細へ',
        processSummary: [
          {
            title: '1. 要件整理',
            detail: '目的、制約、成功基準を意思決定者と揃えます。',
          },
          {
            title: '2. 設計',
            detail: '実装前に技術境界、データフロー、提供単位を定義します。',
          },
          {
            title: '3. 実装',
            detail: 'レビュー点を設けながら、本番品質の単位で継続的に提供します。',
          },
          {
            title: '4. 公開・運用',
            detail: '引き継ぎ資料と運用ガードレールを整え、次の優先事項まで提示します。',
          },
        ],
        aboutHeading: '担当者について',
        aboutBody:
          'Denuo Web代表のJaron Rosenauです。創業者、NPO、研究チームと直接連携し、要件整理から本番運用まで一貫して担当します。',
        aboutCta: 'プロフィール詳細へ',
        intakeLabel: '初回相談で共有いただきたい内容:',
        intakePrompts: [
          '対象ユーザーと、今後60〜90日で改善したい点。',
          '現在あるもの（コード、ツール、手作業の運用）。',
          '固定納期、コンプライアンス要件、予算上限。',
        ],
        finalPrimaryCta: '連絡する',
      },
      services: {
        eyebrow: 'サービス',
        heroTitle: '成果を出すためのサービスパッケージを提供します。',
        heroLead:
          '各パッケージは、計画・実装・引き継ぎを一体化し、創業者・NPO・研究チームが滞りなく本番運用へ進める構成です。',
        heroPrimaryCta: 'パッケージ相談を始める',
        heroSecondaryCta: '関連実績を見る',
        packagesHeading: 'パッケージと納品物',
        packageBadgeRelated: '関連実績あり',
        packageBadgeNew: '新規相談向け',
        packageTimelinePrefix: '期間: ',
        packageSeePrefix: '実績: ',
        packageFallbackCta: 'このパッケージを相談する',
        pillarsHeading: '提供領域',
        pillarsCta: '進め方を見る',
        pillarBadgeFallback: '提供領域',
        choosingHeading: '適切なパッケージの選び方',
        choosingBody:
          '多くのチームは小さな範囲から開始し、測定可能な成果を1つ出してから同じ設計と進行で段階的に拡張します。',
      },
      work: {
        eyebrow: '実績',
        heroTitle: 'デモではなく、成果に焦点を当てたケーススタディです。',
        heroLead:
          '各プロジェクトで背景・課題・実装判断・運用結果を示し、開始前に適合性を判断できるようにしています。',
        heroPrimaryCta: '類似案件を相談する',
        heroSecondaryCta: 'サービスパッケージを見る',
        gridHeading: '最近のケーススタディ',
        openDetailsLabel: '実績詳細を見る',
        packagesHeading: 'この実績で利用したパッケージ',
        packagesCta: 'サービスを見る',
        packagesCardSummary: 'パッケージの納品内容と適用範囲を確認できます。',
        finalHeading: '同じレベルの実行支援が必要ですか？',
        finalBody: '制約と希望時期を共有いただければ、最初の一歩を明確にした提案を返答します。',
        emailPrefix: 'メール: ',
      },
      process: {
        eyebrow: '進め方',
        heroTitle: 'リスクを下げ、推進力を維持するための進行設計です。',
        heroLead:
          '計画から公開まで、作業リズム、責任範囲、引き継ぎ成果物を明確にして進めます。',
        heroPrimaryCta: '計画を始める',
        heroSecondaryCta: 'パッケージを見る',
        stepsHeading: '4ステップの進行',
        steps: [
          {
            title: '1. 目的整理',
            detail: '目的、リスク、依存関係、制約を意思決定者と確認します。',
            output: '成果物: 目標範囲、設計境界、進捗確認ポイント。',
          },
          {
            title: '2. 技術設計',
            detail: '実装前にデータモデル、API境界、環境方針を確定し、手戻りを減らします。',
            output: '成果物: 優先順と判断理由を含む実装計画。',
          },
          {
            title: '3. 実装とレビュー',
            detail: '週次レビューと課題管理を行いながら、本番品質の単位で継続提供します。',
            output: '成果物: 検証済み機能と運用前提のドキュメント。',
          },
          {
            title: '4. 公開と引き継ぎ',
            detail: 'デプロイ、監視、引き継ぎ資料を整備し、継続開発できる状態にします。',
            output: '成果物: 公開チェックリスト、運用手順書、次期バックログ。',
          },
        ],
        optionsHeading: '現在提供しているオプション',
        optionsCta: 'サービスを見る',
        optionsDetailFallback: '詳細スコープと技術構成は初回計画時に共有します。',
        kickoffHeading: 'キックオフ前に共有いただきたい情報',
        kickoffChecklist: [
          '現在のプロダクト状態、または最優先で解消したい運用課題。',
          '意思決定者と承認にかかる目安時間。',
          '助成金・公開日・関係者調整に関わる期限。',
        ],
      },
      about: {
        eyebrow: '会社情報',
        heroTitle: '実行まで担う技術パートナーとして伴走します。',
        heroBody:
          'Denuo Web代表のJaron Rosenauです。創業者、NPO、研究チームと直接連携し、曖昧な要件を本番運用可能なシステムへ変換します。',
        heroPrimaryCta: '相談を始める',
        heroSecondaryCta: '実績を見る',
        howHeading: '進め方の方針',
        howBody:
          '意思決定速度、測定可能な成果、運用継続性を重視します。戦略と実装を分断せず、文脈を保ったまま提供します。',
        evidenceHeading: '最近の提供実績',
        evidenceCta: '実績一覧を見る',
        optionsHeading: '提供オプション',
        optionsCta: '進め方を見る',
        finalHeading: '助言だけでなく、実装まで担う技術パートナーが必要な場合',
        finalBody: '制約、期限、成功条件を共有ください。次に進むための具体案を返答します。',
      },
      contact: {
        eyebrow: '連絡先',
        heroSecondaryCta: '先に進め方を見る',
        checklistHeading: '初回メッセージに含めてほしい内容',
        checklist: [
          '対象ユーザーと、解決したい主要課題。',
          '現状の資産（コード、ツール、手作業運用）。',
          '納期、コンプライアンス要件、予算制約。',
        ],
        startPathsHeading: '開始前に確認できるページ',
        startPaths: [
          {
            title: '実績を確認する',
            summary: '近い領域の成果と進め方を確認できます。',
            to: '/work',
          },
          {
            title: 'パッケージを確認する',
            summary: '現在の課題に近い提供内容を選べます。',
            to: '/services',
          },
          {
            title: '進め方を確認する',
            summary: '要件整理から引き継ぎまでの流れを確認できます。',
            to: '/process',
          },
        ],
        responseHeading: '返信の目安',
        responseBody: '1営業日以内に、確認事項または初期スコープ案を返信します。',
        finalPrimaryCta: 'メールで相談する',
        finalSecondaryCta: '実績を見る',
      },
    },
  },
}
