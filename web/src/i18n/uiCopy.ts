export type Language = 'en' | 'ja'

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
  },
}
