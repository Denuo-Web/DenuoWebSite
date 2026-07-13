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
  meta: {
    title: string
    description: string
  }
  chrome: {
    homeLabel: string
    themeTitle: string
    closeLabel: string
    loadingLabel: string
    errorLabel: string
    detailsLabel: string
    visitLabel: string
    supportLabel: string
    emailLabel: string
    emailDenuoLabel: string
  }
  theme: {
    accentColor: string
    grayColor: string
    appearance: string
    light: string
    dark: string
    radius: string
    scaling: string
    panelBackground: string
    solid: string
    translucent: string
  }
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
    meta: {
      title: 'Denuo Web - Practical Software Delivery',
      description: 'Denuo Web builds practical API-driven web apps, integrations, marketplace workflows, internal tools, and supportable launches.',
    },
    chrome: {
      homeLabel: 'Denuo Web home',
      themeTitle: 'Theme',
      closeLabel: 'Close',
      loadingLabel: 'Syncing live content…',
      errorLabel: 'Unable to load live content. Showing bundled content instead.',
      detailsLabel: 'Details',
      visitLabel: 'Visit',
      supportLabel: 'Support',
      emailLabel: 'Email',
      emailDenuoLabel: 'Email Denuo Web',
    },
    theme: {
      accentColor: 'Accent color',
      grayColor: 'Gray color',
      appearance: 'Appearance',
      light: 'Light',
      dark: 'Dark',
      radius: 'Corner radius',
      scaling: 'Scaling',
      panelBackground: 'Panel background',
      solid: 'Solid',
      translucent: 'Translucent',
    },
    nav: {
      services: 'Services',
      work: 'Work',
      process: 'Process',
      contact: 'Contact',
      about: 'About',
      admin: 'Admin',
      backToSite: 'Back to site',
      themeToggle: 'Open theme panel (press T)',
      languageToggle: 'Switch language (EN/JA)',
    },
    sections: {
      servicesKicker: 'Plan / build / stabilize',
      servicesTitle: 'Concrete offers for teams that need a clear path from messy real-world workflows to shipped, supportable software.',
      servicesLead:
        'Each offer has a specific outcome: turn ambiguity into an implementation plan, build the working system, or stabilize what already exists.',
      projectsKicker: 'Case studies',
      projectsTitle: 'Delivery work for API-driven apps, civic systems, marketplace workflows, internal tools, and operational tooling.',
      projectsLead: 'Built around practical launch, public usefulness, and support needs, not generic agency copy.',
      processKicker: 'How engagements work',
      processTitle: 'A short delivery loop that keeps scope, build, and handoff connected.',
      processLead: 'You get visible progress, explicit tradeoffs, and a final system your team can run.',
      contactKicker: 'Qualified contact',
      footerLine: 'Implementation, systems analysis, integrations, and supportable launches for practical web systems.',
    },
    pages: {
      landing: {
        heroPrimaryCta: 'View case studies',
        heroSecondaryCta: 'Discuss your project',
        credibilityHeading: 'Why this delivery umbrella',
        credibilityBullets: [
          {
            title: 'Direct technical ownership',
            detail:
              'Technical decisions, implementation, documentation, and support handoff stay connected.',
          },
          {
            title: 'Fits real constraints',
            detail:
              'Architecture, data flow, and deployment choices are made around the team, budget, institutional context, and operational reality.',
          },
          {
            title: 'Weekly visible progress',
            detail:
              'Work is delivered in small increments so you can see what changed, what is next, and where tradeoffs were made.',
          },
          {
            title: 'Operational readiness',
            detail:
              'The goal is a system that can be launched, documented, supported, and handed off, not just a prototype that looks complete.',
          },
        ],
        featuredWorkHeading: 'Featured case studies',
        featuredWorkCta: 'See all work',
        servicesSnapshotHeading: 'Plan, build, stabilize',
        servicesSnapshotCta: 'See services',
        processHeading: 'How engagements work',
        processCta: 'Open process',
        processSummary: [
          {
            title: '1. Scope',
            detail: 'Define the user, the current system, and the constraints that shape the work.',
          },
          {
            title: '2. Design',
            detail: 'Set the technical boundary, data model, and delivery path before heavy build work starts.',
          },
          {
            title: '3. Build',
            detail: 'Ship in weekly increments with review points and clear output from each step.',
          },
          {
            title: '4. Launch + handoff',
            detail: 'Stabilize deployment, document the system, and hand over operational ownership.',
          },
        ],
        aboutHeading: 'Umbrella behind the work',
        aboutBody:
          "Denuo Web is my independent software-delivery and portfolio umbrella for practical web systems, integrations, civic/public-systems tooling, and case-study projects.",
        aboutCta: 'Read about the work',
        intakeLabel: 'To start, share:',
        intakePrompts: [
          'Who the system is for and what it needs to do.',
          'What already exists today, including code, tools, and manual workflows.',
          'Any deadlines, funding windows, compliance needs, or hard constraints.',
        ],
        finalPrimaryCta: 'Discuss a project',
      },
      services: {
        eyebrow: 'Services',
        heroTitle: 'Three offers for teams that need implementation, systems analysis, integrations, or supportable software.',
        heroLead:
          'Each offer starts with a concrete deliverable and ends with software your team can use, review, and support.',
        heroPrimaryCta: 'Contact about a project',
        heroSecondaryCta: 'View case studies',
        packagesHeading: 'Three offers',
        packageBadgeRelated: 'Seen in case study',
        packageBadgeNew: 'Available engagement',
        packageTimelinePrefix: 'Typical shape: ',
        packageSeePrefix: 'Example: ',
        packageFallbackCta: 'Discuss this offer',
        pillarsHeading: 'What each offer includes',
        pillarsCta: 'How engagements work',
        pillarBadgeFallback: 'Offer',
        choosingHeading: 'Choosing the right starting point',
        choosingBody:
          'If requirements or integrations are unclear, start with Discovery. If the product needs to exist, choose Build. If the system exists but is fragile, choose Stabilize.',
      },
      work: {
        eyebrow: 'Work',
        heroTitle: 'Case studies from app, civic-systems, integration, marketplace, and support tooling work.',
        heroLead:
          'Each case study shows the problem, the implementation, and the operational result so you can see how the three offers map to real-world systems work.',
        heroPrimaryCta: 'Discuss a similar build',
        heroSecondaryCta: 'Review services',
        gridHeading: 'Case studies',
        openDetailsLabel: 'Open case study',
        packagesHeading: 'Offers reflected in this work',
        packagesCta: 'See services',
        packagesCardSummary: 'The delivery shape used for this case study.',
        finalHeading: 'Need a similar outcome?',
        finalBody:
          'Share the current system, deadlines, and what needs to change. I will reply with the most relevant starting offer.',
        emailPrefix: 'Contact: ',
      },
      process: {
        eyebrow: 'Process',
        heroTitle: 'How engagements work',
        heroLead:
          'The process is explicit: align on scope, design the system, build in weekly increments, then launch with handoff.',
        heroPrimaryCta: 'Start with discovery',
        heroSecondaryCta: 'See offers',
        stepsHeading: 'Four steps',
        steps: [
          {
            title: '1. Scope alignment',
            detail:
              'We define the user, the current system, the deadline, and the constraints before build work begins.',
            output: 'Output: a scoped starting point with clear success criteria and risks.',
          },
          {
            title: '2. Technical design',
            detail:
              'The system boundary, data model, API shape, and deployment path are set before implementation starts.',
            output: 'Output: a concrete plan a small team can follow without rework.',
          },
          {
            title: '3. Build and review',
            detail:
              'Work ships in weekly increments, progress is reviewed, and scope is adjusted when needed.',
            output: 'Output: working software with visible progress and decision points.',
          },
          {
            title: '4. Launch and handoff',
            detail:
              'Deployments are stabilized, the system is documented, and operational ownership is transferred.',
            output: 'Output: runbooks, release notes, and a clean next-step backlog.',
          },
        ],
        optionsHeading: 'Offers that fit common starting points',
        optionsCta: 'Review services',
        optionsDetailFallback: 'Each offer includes a concrete deliverable and a handoff path.',
        kickoffHeading: 'What to send before kickoff',
        kickoffChecklist: [
          'The current system or workflow, even if it is mostly manual.',
          'Who the product or tool is for.',
          'What needs to change in the next 60-90 days.',
          'Any deadlines, funding windows, compliance needs, or hard constraints.',
        ],
      },
      about: {
        eyebrow: 'About',
        heroTitle: 'What Denuo Web is',
        heroBody:
          "Denuo Web is Jaron Rosenau's independent software-delivery and portfolio umbrella for API-driven web apps, integrations, marketplace workflows, civic/public-systems tooling, internal tools, and operational tooling.",
        heroPrimaryCta: 'Discuss a project',
        heroSecondaryCta: 'See case studies',
        howHeading: 'How it works',
        howBody:
          'Operator-led delivery keeps scope, design, build, and handoff connected. The goal is a system your team can run, not a slide deck.',
        evidenceHeading: 'Relevant case studies',
        evidenceCta: 'View work',
        optionsHeading: 'The three offers',
        optionsCta: 'See services',
        finalHeading: 'Operator behind the work',
        finalBody:
          "I'm Jaron Rosenau. I stay hands-on from discovery through handoff, and I bias toward practical systems that teams, residents, or operators can actually use.",
      },
      contact: {
        eyebrow: 'Contact',
        heroSecondaryCta: 'Review how engagements work',
        checklistHeading: 'Send this with your first message',
        checklist: [
          'Who the system or product is for.',
          'What exists today, including code, tools, or manual workflows.',
          'What needs to change in the next 60-90 days.',
          'Any deadlines, funding windows, compliance needs, or hard constraints.',
        ],
        startPathsHeading: 'Start where it is most useful',
        startPaths: [
          {
            title: 'Review work',
            summary: 'See how the three offers show up in real projects.',
            to: '/work',
          },
          {
            title: 'Review services',
            summary: 'Match the current problem to the right starting offer.',
            to: '/services',
          },
          {
            title: 'Review process',
            summary: 'See how scope, build, and handoff are handled.',
            to: '/process',
          },
        ],
        responseHeading: 'What happens next',
        responseBody:
          'I will reply with a recommended starting offer, the main risks, and the next concrete step.',
        finalPrimaryCta: 'Email the project details',
        finalSecondaryCta: 'Review case studies',
      },
    },
  },
  ja: {
    meta: {
      title: 'Denuo Web - 実用的なソフトウェア開発',
      description: 'Denuo Webは、API連携Webアプリ、マーケットプレイス、社内ツール、運用可能なシステムを設計・構築します。',
    },
    chrome: {
      homeLabel: 'Denuo Web ホーム',
      themeTitle: 'テーマ',
      closeLabel: '閉じる',
      loadingLabel: '最新コンテンツを同期しています…',
      errorLabel: '最新コンテンツを読み込めないため、内蔵コンテンツを表示しています。',
      detailsLabel: '詳細',
      visitLabel: 'サイトを見る',
      supportLabel: 'サポート',
      emailLabel: 'メール',
      emailDenuoLabel: 'Denuo Webへメールする',
    },
    theme: {
      accentColor: 'アクセント色',
      grayColor: 'グレー色',
      appearance: '表示モード',
      light: 'ライト',
      dark: 'ダーク',
      radius: '角の丸み',
      scaling: '表示倍率',
      panelBackground: 'パネル背景',
      solid: '単色',
      translucent: '半透明',
    },
    nav: {
      services: 'サービス',
      work: '実績',
      process: '進め方',
      contact: '連絡先',
      about: '概要',
      admin: '管理',
      backToSite: 'サイトへ戻る',
      themeToggle: 'テーマパネルを開く（Tキー）',
      languageToggle: '言語を切り替える（英語／日本語）',
    },
    sections: {
      servicesKicker: '計画 / 構築 / 安定化',
      servicesTitle: '複雑な実ワークフローから、公開後に支援しやすいソフトウェアまでをつなぐ具体的な3つの提案。',
      servicesLead:
        '各提案には明確な成果物があります。設計を固める、作る、既存システムを安定させる、のいずれかから始められます。',
      projectsKicker: 'ケーススタディ',
      projectsTitle: 'API連携アプリ、公共系システム、マーケットプレイス、社内ツール、運用ツールの実行例。',
      projectsLead: '公開、公共性、サポートの現実に合わせた実用的なシステムを前提にしています。',
      processKicker: '進め方',
      processTitle: 'スコープ、設計、実装、引き渡しをつなげる短い進行。',
      processLead: '進捗が見え、判断点が明確で、最後にチームが運用できる状態を目指します。',
      contactKicker: '相談について',
      footerLine: '実用的なWebシステムの実装、システム分析、連携、支援しやすい公開を提供します。',
    },
    pages: {
      landing: {
        heroPrimaryCta: 'ケーススタディを見る',
        heroSecondaryCta: '相談する',
        credibilityHeading: '一貫したデリバリーで重視すること',
        credibilityBullets: [
          {
            title: '技術責任をつなげる実行',
            detail:
              '技術判断、実装、ドキュメント、サポート引き継ぎを分断せずにつなげます。',
          },
          {
            title: '制約に合う設計',
            detail:
              'アーキテクチャ、データフロー、デプロイ方針は、チーム規模・予算・組織文脈・運用現実に合わせて決めます。',
          },
          {
            title: '毎週見える進捗',
            detail:
              '小さな単位で納品するため、何が変わったか、次に何が来るか、どこで判断したかが見えます。',
          },
          {
            title: '運用を見据えた納品',
            detail:
              '目的は、見た目だけの試作品ではなく、公開・文書化・サポート・引き継ぎができるシステムです。',
          },
        ],
        featuredWorkHeading: '注目のケーススタディ',
        featuredWorkCta: 'すべて見る',
        servicesSnapshotHeading: '計画・構築・安定化',
        servicesSnapshotCta: 'サービスを見る',
        processHeading: '進め方',
        processCta: '詳細を見る',
        processSummary: [
          {
            title: '1. スコープ',
            detail: '対象ユーザー、現状のシステム、制約条件を整理します。',
          },
          {
            title: '2. 設計',
            detail: '技術境界、データモデル、実装経路を重い開発前に固めます。',
          },
          {
            title: '3. 実装',
            detail: '週次の単位で進め、各ステップの成果を見える形で出します。',
          },
          {
            title: '4. 公開と引き継ぎ',
            detail: 'デプロイを安定させ、システムを文書化し、運用を引き渡します。',
          },
        ],
        aboutHeading: 'この仕事を支える仕組み',
        aboutBody:
          'Denuo Web は、Jaron Rosenau が手がける独立系ソフトウェアデリバリーとポートフォリオの名称です。実用的なWebシステム、外部連携、公共系ツール、ケーススタディを紹介しています。',
        aboutCta: '仕事について読む',
        intakeLabel: '最初の相談で共有してほしい内容:',
        intakePrompts: [
          'システムが誰のためのものか、何を実現する必要があるか。',
          '現在あるもの（コード、ツール、手作業の流れ）。',
          '今後60〜90日で何を変えたいか。',
          '期限、資金期間、コンプライアンス要件、その他の制約。',
        ],
        finalPrimaryCta: '案件を相談する',
      },
      services: {
        eyebrow: 'サービス',
        heroTitle: '実装、システム分析、連携、支援しやすいソフトウェアが必要なチーム向けの3つの提案。',
        heroLead:
          '各提案は明確な成果物から始まり、チームが運用できるシステムとして終わります。',
        heroPrimaryCta: '案件について連絡する',
        heroSecondaryCta: 'ケーススタディを見る',
        packagesHeading: '3つの提案',
        packageBadgeRelated: '事例あり',
        packageBadgeNew: '相談可能',
        packageTimelinePrefix: '目安: ',
        packageSeePrefix: '事例: ',
        packageFallbackCta: 'この提案を相談する',
        pillarsHeading: '各提案に含まれるもの',
        pillarsCta: '進め方を見る',
        pillarBadgeFallback: '提案',
        choosingHeading: '最初の一歩の選び方',
        choosingBody:
          '要件が曖昧なら設計から、作るものが必要ならビルドから、既存システムが不安定なら安定化から始めます。',
      },
      work: {
        eyebrow: '実績',
        heroTitle: 'アプリ、公共系システム、連携、マーケットプレイス、運用ツールのケーススタディ。',
        heroLead:
          '課題、実装、運用結果を示し、3つの提案が実世界のシステム作業にどう対応するかを見やすくしています。',
        heroPrimaryCta: '似た案件を相談する',
        heroSecondaryCta: 'サービスを見る',
        gridHeading: 'ケーススタディ',
        openDetailsLabel: '詳細を開く',
        packagesHeading: 'この実績に対応する提案',
        packagesCta: 'サービスを見る',
        packagesCardSummary: 'このケーススタディで使った進め方です。',
        finalHeading: '同じ成果が必要ですか？',
        finalBody:
          '現在のシステム、期限、変えたい点を共有してください。最も合う提案で返答します。',
        emailPrefix: '連絡先: ',
      },
      process: {
        eyebrow: '進め方',
        heroTitle: '進行の流れ',
        heroLead:
          'スコープを合わせ、設計し、週次で実装し、最後に引き渡します。',
        heroPrimaryCta: '設計から始める',
        heroSecondaryCta: '提案を見る',
        stepsHeading: '4つのステップ',
        steps: [
          {
            title: '1. スコープ整理',
            detail:
              '作業前に、対象ユーザー、現状のシステム、期限、制約を整理します。',
            output: '成果物: 成功条件とリスクが明確な開始点。',
          },
          {
            title: '2. 技術設計',
            detail:
              '実装前に、境界、データモデル、API形状、デプロイ経路を決めます。',
            output: '成果物: 手戻りの少ない具体的な計画。',
          },
          {
            title: '3. 実装とレビュー',
            detail:
              '週次単位で進め、進捗を確認し、必要に応じてスコープを調整します。',
            output: '成果物: 進捗が見える稼働ソフトウェアと判断点。',
          },
          {
            title: '4. 公開と引き継ぎ',
            detail:
              'デプロイを安定させ、システムを文書化し、運用責任を引き渡します。',
            output: '成果物: 運用手順、リリースノート、次のバックログ。',
          },
        ],
        optionsHeading: 'よくある開始点に合う提案',
        optionsCta: 'サービスを見る',
        optionsDetailFallback: '各提案には具体的な成果物と引き渡し手順があります。',
        kickoffHeading: 'キックオフ前に共有してほしいこと',
        kickoffChecklist: [
          '現在のシステムやワークフロー（手作業でも可）。',
          '対象となるユーザーや関係者。',
          '今後60〜90日で変えたいこと。',
          '期限、資金期間、コンプライアンス要件、その他の制約。',
        ],
      },
      about: {
        eyebrow: '概要',
        heroTitle: 'Denuo Web の位置づけ',
        heroBody:
          'Denuo Web は、Jaron Rosenau が手がける独立系ソフトウェアデリバリーとポートフォリオの名称です。API連携Webアプリ、マーケットプレイス、公共系ツール、社内ツール、運用ツールを紹介しています。',
        heroPrimaryCta: '案件を相談する',
        heroSecondaryCta: '実績を見る',
        howHeading: '進め方',
        howBody:
          'オペレーターが直接進めることで、スコープ、設計、実装、引き渡しが分断されません。目的はスライドではなく、チームが運用できるシステムです。',
        evidenceHeading: '関連するケーススタディ',
        evidenceCta: '実績を見る',
        optionsHeading: '3つの提案',
        optionsCta: 'サービスを見る',
        finalHeading: '仕事の実行担当',
        finalBody:
          'Jaron Rosenau が調査から引き渡しまで手を動かし、チーム、住民、運用担当者が実際に使えるシステムを優先します。',
      },
      contact: {
        eyebrow: '連絡',
        heroSecondaryCta: '進め方を見る',
        checklistHeading: '最初のメッセージに入れてほしい内容',
        checklist: [
          'システムやプロダクトが誰のためのものか。',
          '現在あるもの（コード、ツール、手作業の流れ）。',
          '今後60〜90日で何を変えたいか。',
          '期限、資金期間、コンプライアンス要件、その他の制約。',
        ],
        startPathsHeading: '最も役に立つところから始める',
        startPaths: [
          {
            title: '実績を見る',
            summary: '3つの提案が実案件でどう現れるかを確認できます。',
            to: '/work',
          },
          {
            title: 'サービスを見る',
            summary: '現在の課題に合う開始点を選べます。',
            to: '/services',
          },
          {
            title: '進め方を見る',
            summary: 'スコープ、実装、引き渡しの進め方を確認できます。',
            to: '/process',
          },
        ],
        responseHeading: '次に起きること',
        responseBody:
          'おすすめの開始提案、主なリスク、次の具体的な一歩を返答します。',
        finalPrimaryCta: '案件詳細をメールする',
        finalSecondaryCta: 'ケーススタディを見る',
      },
    },
  },
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const coerceByTemplate = (template: unknown, candidate: unknown): unknown => {
  if (typeof template === 'string') {
    return typeof candidate === 'string' ? candidate : template
  }

  if (Array.isArray(template)) {
    if (!Array.isArray(candidate)) {
      return template
    }
    const [templateItem] = template
    if (templateItem === undefined) {
      return []
    }
    return candidate.map((item) => coerceByTemplate(templateItem, item))
  }

  if (isPlainObject(template)) {
    const source = isPlainObject(candidate) ? candidate : {}
    const out: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(template)) {
      out[key] = coerceByTemplate(value, source[key])
    }

    return out
  }

  return candidate ?? template
}

export const coerceUiCopyForLanguage = (language: Language, candidate: unknown): UiCopy =>
  coerceByTemplate(uiCopy[language], candidate) as UiCopy
