import type { SiteContent } from '../types'

export const fallbackContent: SiteContent = {
  hero: {
    eyebrow: 'Denuo Web, LLC',
    title: 'Fractional CTO + full-stack delivery for founders, nonprofits, and research teams.',
    subtitle:
      'I ship modern web apps end-to-end—product framing, architecture, build, and launch—on Firebase, Google Cloud Run, and Vite-based front ends.',
    badge: 'Firebase · Cloud Run · React/Vite',
    primaryCta: 'Book a build consult',
    secondaryCta: 'See recent work',
  },
  stats: [],
  services: [
    {
      title: 'Product & delivery leadership',
      summary: 'Turn fuzzy ideas into MVPs and production plans.',
      bullets: [
        'Facilitated specs, data models, and OpenAPI contracts for multi-team builds.',
        'Rapid prototypes to validate flows with real stakeholders.',
        'Keeps a steady cadence: weekly milestones, demos, and course-correction.',
      ],
      badge: 'Strategy',
    },
    {
      title: 'Full-stack engineering',
      summary: 'Build and ship resilient, typed apps front-to-back.',
      bullets: [
        'React/Vite SPAs, Flutter apps, and PWAs with offline + push.',
        'Python/TypeScript APIs on Cloud Run with Postgres/Redis or Firestore.',
        'Authentication, payments, file handling, and accessibility baked in.',
      ],
      badge: 'Build',
    },
    {
      title: 'Platform & operations',
      summary: 'Production readiness from day one.',
      bullets: [
        'CI/CD with GitHub Actions, preview channels, and trunk-based releases.',
        'Observability, error reporting, and infra-as-code baselines.',
        'Secure by default: authn/z, secrets management, and dependency hygiene.',
      ],
      badge: 'Reliability',
    },
  ],
  differentiators: [
    'Founder mindset: I co-own outcomes, not just tickets.',
    'Hands-on with Linux servers, TLS, and mail—no black boxes.',
    'Pragmatic stack choices that fit the problem and budget.',
    'Clear artifacts: specs, diagrams, and admin dashboards clients can use.',
  ],
  projects: [
    {
      name: 'QuestByCycle',
      summary: 'Flask + Vite PWA with auth, quests, and leaderboards for a local climate nonprofit.',
      impact: 'Ran four public games, onboarded 100+ riders, and earned a $2,000 honorarium.',
      stack: ['Flask', 'Vite PWA', 'Auth', 'Leaderboards', 'PostgreSQL', 'Redis'],
      link: 'https://questbycycle.org',
      status: 'Live',
    },
    {
      name: 'Moonshine Art marketplace',
      summary: 'Flutter + Firebase + Cloud Run poster marketplace with Stripe and Terraform-managed infrastructure.',
      impact: 'Built monorepo foundations, auth flows, and CI for a remote art founder.',
      stack: ['Flutter', 'Firebase', 'Cloud Run', 'Stripe', 'Terraform'],
      link: 'https://moonshine-dev-be279.web.app/',
      status: 'In progress',
    },
    {
      name: 'CrowdPM Platform',
      summary: 'React + Vite map platform with API and ingestion pipeline for collaborative planning.',
      impact: 'Partnered with OSU capstone teams; delivered MVP specs, architecture docs, and OpenAPI contracts.',
      stack: ['React', 'Vite', 'Map UI', 'API', 'Ingest pipeline', 'Cloud Run'],
      link: 'https://crowdpmplatform.web.app',
      status: 'In collaboration',
    },
  ],
  work: {
    caseStudies: [
      {
        slug: 'moonshine-art',
        name: 'Moonshine Art',
        summary:
          'Marketplace foundation for an independent art brand with a cross-platform app, serverless data layer, and production billing.',
        impact:
          'Shipped the initial commerce stack with authenticated purchasing flows, Stripe invoicing support, and deployment guardrails.',
        challenge:
          'The founder needed a launch-ready marketplace spanning client app, backend logic, and cloud infrastructure without a platform team.',
        solution:
          'Built a Flutter + Firebase experience, Cloud Run services for business logic, Stripe payment flows, and Terraform-managed GCP resources for repeatable environments.',
        outcomes: [
          'Established a monorepo workflow for app, backend, and infrastructure changes.',
          'Implemented secure auth and purchase lifecycle handling backed by Firebase and Cloud Run.',
          'Provisioned baseline infrastructure and deployment automation with Terraform.',
        ],
        stack: ['Flutter', 'Firebase', 'Cloud Run', 'Stripe', 'Terraform'],
        status: 'In progress',
        liveUrl: 'https://moonshine-dev-be279.web.app/',
        repositoryUrl: 'https://github.com/denuoweb/moonshine',
        servicePackage: {
          title: 'Full-stack delivery sprint',
          summary: 'End-to-end product build from architecture through production operations.',
          outcomes: ['Product architecture', 'Backend/API delivery', 'Infrastructure as code'],
          timeline: 'Multi-phase delivery',
        },
      },
      {
        slug: 'crowdpm-platform',
        name: 'CrowdPM Platform',
        summary:
          'Collaborative planning platform centered on interactive mapping, structured data ingest, and cloud APIs for stakeholder workflows.',
        impact:
          'Delivered MVP architecture, ingestion design, and implementation scaffolding used by capstone contributors and project leads.',
        challenge:
          'The team needed a credible MVP path that connected map-heavy UI interactions with reliable backend ingestion and API contracts.',
        solution:
          'Implemented a React + Vite interface, mapped-data views, API service boundaries, and an ingest pipeline blueprint for operational data flow.',
        outcomes: [
          'Delivered clear architecture artifacts and OpenAPI-ready boundaries for implementation teams.',
          'Connected map UI requirements to backend data contracts and ingestion steps.',
          'Reduced onboarding time for new contributors with shared technical direction.',
        ],
        stack: ['React', 'Vite', 'Map UI', 'API', 'Ingest pipeline', 'Cloud Run'],
        status: 'In collaboration',
        liveUrl: 'https://crowdpmplatform.web.app',
        repositoryUrl: 'https://github.com/Denuo-Web/CrowdPMPlatform',
        servicePackage: {
          title: 'Platform architecture package',
          summary: 'MVP architecture and implementation planning for multi-contributor teams.',
          outcomes: ['System design', 'API contracts', 'Data ingestion strategy'],
          timeline: 'Architecture-first engagement',
        },
      },
      {
        slug: 'questbycycle',
        name: 'QuestByCycle',
        summary:
          'Community climate game platform delivered as a Flask + Vite PWA with account flows, challenge mechanics, and real-time standings.',
        impact: 'Powered multiple public game events, onboarded riders, and supported measurable community participation.',
        challenge:
          'The nonprofit needed a production application quickly, with account security and gamified features that worked on mobile for live events.',
        solution:
          'Built a Flask backend with a Vite PWA frontend, implemented auth workflows, quest progression logic, and leaderboard capabilities for active campaigns.',
        outcomes: [
          'Launched a working program platform for recurring games and participant retention.',
          'Delivered authenticated user journeys and points/quest progression.',
          'Shipped leaderboard features and mobile-ready PWA behavior for field usage.',
        ],
        stack: ['Flask', 'Vite PWA', 'Auth', 'Leaderboards', 'PostgreSQL', 'Redis'],
        status: 'Live',
        liveUrl: 'https://questbycycle.org',
        repositoryUrl: 'https://github.com/Denuo-Web/QuestByCycle',
        servicePackage: {
          title: 'Backend to production package',
          summary: 'Production-ready application delivery with deployment ownership.',
          outcomes: ['Feature implementation', 'Release management', 'Operational support'],
          timeline: 'End-to-end launch cycle',
        },
      },
    ],
    servicePackages: [
      {
        title: 'Backend to production package',
        summary: 'API, data model, deployment, and operational handoff for a production launch.',
        outcomes: ['Backend implementation', 'Deployment automation', 'Runbook and support'],
      },
      {
        title: 'Platform architecture package',
        summary: 'Scope and architecture planning for teams building roadmap-driven platforms.',
        outcomes: ['System diagrams', 'API contracts', 'Delivery milestones'],
      },
      {
        title: 'Full-stack delivery sprint',
        summary: 'Time-boxed delivery sprint to move from validated concept to shippable product.',
        outcomes: ['Working product increment', 'Quality gates', 'Launch checklist'],
      },
    ],
    testimonials: [],
  },
  process: [
    {
      title: 'Offer A: Backend to Production',
      detail: 'Flask/Python + Postgres/Redis + Linux deploy + CI/CD',
      outcome: 'QuestByCycle ops ownership.',
    },
    {
      title: 'Offer B: Data ingestion + dashboard',
      detail: 'Cloud pipeline + API + mapping',
      outcome: 'CrowdPM architecture (ingest, Pub/Sub worker, API), Rosenau resume, and OSU proposer listing.',
    },
    {
      title: 'Offer C: Developer tooling / automation',
      detail: '',
      outcome: 'ARM64-ADK, DripCopy, and the VS Code extension.',
    },
  ],
  contact: {
    headline: 'Ready for a build sprint or technical partner?',
    subhead:
      'Email project details and context. I respond within one business day with next steps.',
    email: 'info@denuoweb.com',
    note: 'Prefer async? I will return a short plan with scope, risks, and timeline.',
  },
}
