import { fallbackContent } from './fallback'
import type { Language } from '../i18n/uiCopy'
import type { CaseStudy, Project, ServicePackage, SiteContent } from '../types'

const japaneseHero = {
  eyebrow: '独立系ソフトウェアデリバリー',
  title: '実際の業務、外部連携、運用までを見据えた実用的なWebシステム。',
  subtitle:
    'Denuo Web は、Jaron Rosenau が手がける独立系ソフトウェアデリバリーとポートフォリオの名称です。実用的なWebシステム、外部連携、公共分野のツール、運用可能なプロジェクトを紹介しています。',
  badge: '実装 / システム分析 / 運用引き継ぎ',
  primaryCta: 'ケーススタディを見る',
  secondaryCta: '案件を相談する',
}

const japaneseServices = [
  {
    title: '調査 / 実装計画',
    summary: '曖昧な要件、公共・業務フロー、API、データフロー、制約を、実装可能な計画にまとめます。',
    bullets: [
      '利用者、業務フロー、組織上の境界、データソース、公開条件を整理します。',
      'API契約、デプロイ構成、リスク、小規模チームが実行できる進行順序を定義します。',
      'スコープ、システム設計、判断記録、次の実装手順を具体的な成果物として残します。',
    ],
    badge: '計画',
  },
  {
    title: 'Webアプリ / 外部連携構築',
    summary: '認証付きアプリ、ダッシュボード、API、公共・業務ツール、決済、管理画面、自動化を構築します。',
    bullets: [
      'アプリ基盤、データモデル、認証・管理機能、利用者向けフローを実装します。',
      '外部API、Webhook、バックグラウンド処理、業務データフローを接続します。',
      '利用可能な本番環境、リリースノート、引き継ぎ文書を整えます。',
    ],
    badge: '構築',
  },
  {
    title: '安定化 / サポート引き継ぎ',
    summary: '既存システムを、デプロイ・調査・文書化・運用しやすい状態に整えます。',
    bullets: [
      'CI/CD、環境設定、認証の境界、API障害、リリース手順を整理します。',
      'ログ、状態確認、サポートノート、運用手順、保守可能な課題管理を追加します。',
      '引き継ぎ後もチームが支援しやすいシステムにします。',
    ],
    badge: '支援',
  },
]

const japaneseDifferentiators = [
  'Denuo Web は、実用的な実装作業を透明に示すデリバリーとケーススタディの名称です。',
  '予算、データ、スタッフの時間、公共利用者、サポート負担など、既存の制約を出発点にします。',
  'API契約、デプロイ経路、運用手順、サポートノートも納品の一部として扱います。',
  '動くソフトウェア、判断記録、確認できる公開実績を通じて進捗を示します。',
]

const japaneseProjects: Record<string, Partial<Project>> = {
  QuestByCycle: {
    summary: 'クエスト、バッジ、ランキング、認証、管理フロー、イベント運営を備えた公共交通参加プラットフォーム。',
    impact: '公開実証、参加者登録、持続可能な移動プログラム、100人以上の利用者運用を支えました。',
    status: '公開中',
  },
  'Moonshine Art marketplace': {
    name: 'Moonshine Art マーケットプレイス',
    summary: 'Flutter、Firebase、Cloud Run API、Stripe Connect、印刷配送、モデレーション、コンプライアンスを扱う公開ケーススタディ。',
    impact: '非公開コードや機密データを開示せず、公開可能なマーケットプレイス構成を文書化しました。',
    status: 'ケーススタディ',
  },
  'CrowdPM Platform': {
    summary: 'クラウド取込、リアルタイム地図、検証済みデモ環境を備えたFirebase / TypeScript製PM2.5監視プラットフォーム。',
    impact: '環境データの流れを、支援可能な地図画面とクラウドAPIへ接続しました。',
    status: '共同開発中',
  },
  'APK Workbench': {
    summary: 'Rustサービス、GTK画面、ビルド統合、サポート文書を備えたLinux ARM64向けAndroidツール。',
    impact: 'ARM64 Linux上の専門的なAndroid作業に、保守可能なツールチェーンの方向性を確立しました。',
    status: 'オープンソース',
  },
  DripCopy: {
    summary: '低電力USBホスト上の光学メディア向けに、速度制限と復旧動作を備えた堅牢なファイルコピー用ツール。',
    impact: '壊れやすい手作業の転送を、慎重で再現可能なサポート手順に変えました。',
    status: 'オープンソース',
  },
}

const japaneseCaseStudies: Record<string, Partial<CaseStudy>> = {
  'moonshine-art': {
    summary: 'アプリ、バックエンド、決済、配送、モデレーション、サポートを含むクロスプラットフォーム作品販売サービスの匿名化済み設計事例。',
    impact: '非公開コード、認証情報、機密事業データを公開せず、本番公開に向けた実装経路を文書化しました。',
    challenge: 'モバイルアプリ、出品者登録、決済、印刷配送、モデレーション、サポート運用をまたぐ基盤が必要でした。同時に、公開用資料から非公開コードと機密データを除外する必要がありました。',
    solution: 'Flutter / Firebaseクライアント、Cloud Runサービス、Stripe Connect登録、印刷配送アダプター、Firestoreコレクション、モデレーション関数、コンプライアンス保存、運用引き継ぎを示す匿名化済みケーススタディを構築・文書化しました。',
    outcomes: [
      '出品者登録、購入決済、配送、Webhook、苦情対応を支援可能な業務フローとして整理しました。',
      '公開可能な設計根拠と、非公開の実装詳細・顧客データを分離しました。',
      '技術・非技術の関係者と共有できるデプロイ、データ、運用の境界を記録しました。',
    ],
    status: '公開ケーススタディ',
    servicePackage: {
      title: 'Webアプリ / 外部連携構築',
      summary: 'アプリ、API、決済、配送、運用を一貫して設計。',
      outcomes: ['プロダクト設計', 'APIとWebhookの境界', '運用引き継ぎ'],
      timeline: '複数段階での実施',
    },
  },
  questbycycle: {
    summary: 'アカウント、チャレンジ、ランキング、イベント運営を備えたFlask + Vite PWAの地域向け気候ゲーム。',
    impact: '公開ゲームイベント、参加者登録、再利用可能な公共交通プログラムの運営を支えました。',
    challenge: '非営利団体には、アカウントの安全性、交通行動のゲーム化、モバイル対応のイベント運営を備えた本番アプリが短期間で必要でした。',
    solution: 'FlaskバックエンドとVite PWAを構築し、認証、クエスト進行、ランキング、文書化、実施中キャンペーンのデプロイ支援を提供しました。',
    outcomes: [
      '継続的なゲーム、持続可能な移動への参加、参加者定着に使えるプラットフォームを公開しました。',
      '認証付き利用者フローとポイント・クエスト進行を実装しました。',
      'ランキング、モバイル対応PWA、現場での100人以上の利用者運用を支えました。',
    ],
    status: '公開中',
    servicePackage: {
      title: 'Webアプリ / 外部連携構築',
      summary: 'デプロイ責任を含む本番対応アプリの提供。',
      outcomes: ['機能実装', 'リリース管理', '運用支援'],
      timeline: '企画から公開まで',
    },
  },
  'crowdpm-platform': {
    summary: 'PM2.5データ取込、インタラクティブ地図、構造化データフロー、クラウドAPI境界を中心とした環境データ基盤。',
    impact: 'プロジェクト責任者と参加者が実装を進められる設計、取込方針、検証済みデプロイ、実装基盤を提供しました。',
    challenge: '環境センサーデータ、地図中心の操作、信頼できるバックエンド取込、API契約を結びつける現実的な調査経路が必要でした。',
    solution: 'React + Vite画面、地図データ表示、Firebase / TypeScriptのサービス境界、運用データ取込パイプラインの設計を実装しました。',
    outcomes: [
      '実装チーム向けに明確な設計資料とAPI対応の境界を提供しました。',
      '地図画面の要件をバックエンドのデータ契約と取込手順へ接続しました。',
      '共通の技術方針により、参加者の立ち上がり時間を短縮しました。',
    ],
    status: '共同開発中',
    servicePackage: {
      title: '調査 / 実装計画',
      summary: '複数参加者チーム向けのシステム設計と実装計画。',
      outcomes: ['システム設計', 'API契約', 'データ取込方針'],
      timeline: '設計優先の進行',
    },
  },
  'apk-workbench': {
    summary: 'ツールチェーン、ビルド、対象端末、可観測性をgRPCサービスで扱うLinux ARM64向けGUI優先Android開発基盤。',
    impact: 'ARM64 Linux上の専門的なAndroidツールに、オープンソースのプラットフォーム設計を提供しました。',
    challenge: 'Androidのビルド作業はx86中心である一方、Linux ARM64チームにはネイティブ優先のツールとサービス間の明確な統合が必要でした。',
    solution: 'GTK4画面とCLIを薄いクライアントとし、JobServiceのイベント配信と一連のビルド作業を備えたRust製マルチサービスgRPCシステムを実装しました。',
    outcomes: [
      'ツールチェーン、ビルド、対象端末、監視、プロジェクト、ワークフローのサービス境界を定義しました。',
      'Linux ARM64向けツールチェーンと再現可能なローカル実行を可能にしました。',
      '今後のAndroid自動化に再利用できるオープンソース基盤を公開しました。',
    ],
    status: 'オープンソース',
    servicePackage: {
      title: '安定化 / サポート引き継ぎ',
      summary: '専門的な開発作業向けのツールと自動化支援。',
      outcomes: ['ツール設計', 'サービス統合', '運用手順'],
      timeline: '反復型ロードマップ',
    },
  },
  dripcopy: {
    summary: '低電力または不安定なUSBホストでCD / DVDデータを扱う速度制限付きファイルコピー用ツール。',
    impact: '壊れやすいサポート作業を、慎重な入出力を備えた再現可能なコマンドライン手順へ変えました。',
    challenge: '低電力USBホスト上で光学メディアを一括コピーすると、ドライブが過度に回転し、リセットまたは転送途中の障害が起きることがありました。',
    solution: 'ファイル転送の間隔を空け、進捗を表示し、制約のある支援環境でも簡単に実行できる慎重なコピー手順を実装しました。',
    outcomes: [
      '長時間の光学メディア転送で手作業による監視を減らしました。',
      '転送動作を説明・再現・調査しやすくしました。',
      '限定的なサポート課題を再利用可能な公開ツールにしました。',
    ],
    status: 'オープンソース',
    servicePackage: {
      title: '安定化 / サポート引き継ぎ',
      summary: '壊れやすい業務向けの小規模な運用ツール。',
      outcomes: ['サポート用ツール', '再現可能な手順', '調査ノート'],
      timeline: '対象を絞ったツール',
    },
  },
}

const japaneseServicePackages: ServicePackage[] = [
  {
    title: '調査 / 実装計画',
    summary: '技術計画、システム設計、進行ロードマップ、業務・API境界、リスク一覧。',
    outcomes: ['システム設計', '進行ロードマップ', '判断記録'],
    timeline: '1〜2週間',
  },
  {
    title: 'Webアプリ / 外部連携構築',
    summary: 'アプリ基盤、データモデル、認証、API、デプロイ経路を含む動く成果物。',
    outcomes: ['アプリ基盤 + データモデル', '認証・管理の土台', '本番デプロイ経路'],
    timeline: '期間を区切った構築',
  },
  {
    title: '安定化 / サポート引き継ぎ',
    summary: '既存コードや運用ツールの整理、強化、運用手順、引き継ぎ。',
    outcomes: ['CI/CDとデプロイ', '監視と安定化', '運用引き継ぎ'],
    timeline: '対象を絞った安定化',
  },
]

const japaneseProcess = [
  {
    title: '運用可能な範囲を定める',
    detail: '利用者、現在の業務、既存コード・データ、組織状況、期限、運用制約を整理します。',
    outcome: '成功条件、リスク、不明点を示した明確な開始点。',
  },
  {
    title: '実装経路を設計する',
    detail: 'システム境界、データモデル、API、連携点、サポート経路、デプロイ経路を定義します。',
    outcome: '構築、レビュー、支援が可能な具体的な計画。',
  },
  {
    title: '構築して連携する',
    detail: '小さな単位で公開し、APIと業務フローを接続し、進捗を確認して必要に応じて範囲を調整します。',
    outcome: '進捗と判断点が見える動作中のソフトウェア。',
  },
  {
    title: '公開して引き継ぐ',
    detail: 'デプロイを安定させ、システムを文書化し、今後の運用に必要な支援情報を残します。',
    outcome: '運用手順、リリースノート、整理された次の作業一覧。',
  },
]

const japaneseContact = {
  headline: '今後60〜90日で公開・連携・安定化したい実際の業務フローを教えてください。',
  subhead: '現在のシステム、利用者、既にあるもの、固定された制約を共有してください。具体的な次の一歩と適した進行方法をご案内します。',
  note: '既存コード、API、手作業の業務フロー、途中までの実装も有用な出発点です。',
}

const japaneseTechnologyLabels: Record<string, string> = {
  Auth: '認証',
  Leaderboards: 'ランキング',
  'Map UI': '地図UI',
  'API design': 'API設計',
  'Data ingest': 'データ取込',
  'File IO': 'ファイル入出力',
  'Rate limiting': '速度制限',
  Recovery: '復旧',
}

const mergeProject = (project: Project): Project => ({
  ...project,
  ...japaneseProjects[project.name],
})

const mergeCaseStudy = (caseStudy: CaseStudy): CaseStudy => {
  const translation = japaneseCaseStudies[caseStudy.slug]
  if (!translation) return caseStudy

  return {
    ...caseStudy,
    ...translation,
    stack: caseStudy.stack.map((item) => japaneseTechnologyLabels[item] ?? item),
    liveUrl: caseStudy.liveUrl,
    repositoryUrl: caseStudy.repositoryUrl,
    servicePackage: translation.servicePackage
      ? { ...caseStudy.servicePackage, ...translation.servicePackage }
      : caseStudy.servicePackage,
  }
}

export const localizeSiteContent = (content: SiteContent, language: Language): SiteContent => {
  if (language === 'en') return content

  return {
    ...content,
    hero: { ...content.hero, ...japaneseHero },
    services: content.services.map((service, index) => ({
      ...service,
      ...(japaneseServices[index] ?? fallbackContent.services[index]),
      link: service.link,
    })),
    differentiators: japaneseDifferentiators,
    projects: content.projects.map(mergeProject),
    work: {
      caseStudies: content.work.caseStudies.map(mergeCaseStudy),
      servicePackages: content.work.servicePackages.map(
        (servicePackage, index) => ({ ...servicePackage, ...(japaneseServicePackages[index] ?? servicePackage) })
      ),
      testimonials: content.work.testimonials,
    },
    process: content.process.map((step, index) => ({ ...step, ...(japaneseProcess[index] ?? step) })),
    contact: { ...content.contact, ...japaneseContact, email: content.contact.email },
  }
}
