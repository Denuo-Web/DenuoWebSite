import type { SiteContent } from '../types'

export const fallbackContent: SiteContent = {
  hero: {
    eyebrow: 'Operator-led software studio',
    title:
      'Web platforms, internal tools, and data systems for small research, geospatial, environmental, and mission-driven teams.',
    subtitle:
      'I handle architecture, authenticated web apps, APIs, data workflows, CI/CD, and production hardening so small teams can ship and operate real systems.',
    badge: 'Authenticated apps · APIs · data workflows',
    primaryCta: 'View case studies',
    secondaryCta: 'Discuss your project',
  },
  stats: [],
  services: [
    {
      title: 'Architecture / Discovery Sprint',
      summary: 'Turn requirements ambiguity, data ambiguity, or product ambiguity into a technical plan.',
      bullets: [
        'Clarify scope, data sources, constraints, and tradeoffs before build work starts.',
        'Produce a system design, delivery roadmap, and decision record a team can execute against.',
        'Leave with concrete artifacts instead of an open-ended strategy deck.',
      ],
      badge: 'Sprint',
    },
    {
      title: 'MVP / Internal Tool Build',
      summary: 'Ship authenticated web apps, dashboards, APIs, admin tools, and workflow systems.',
      bullets: [
        'Build the app shell, data model, and auth/admin foundation for a working product increment.',
        'Connect APIs, ingestion flows, and operational workflows into a usable system.',
        'Deploy a production-ready path with a clean handoff.',
      ],
      badge: 'Build',
    },
    {
      title: 'Stabilize / Operate',
      summary: 'Improve an existing codebase or internal tool so it can be deployed and maintained safely.',
      bullets: [
        'Clean up deployments, CI/CD, auth, and release paths.',
        'Add background jobs, integrations, observability, and hardening.',
        'Leave behind operational notes and a handoff the team can keep using.',
      ],
      badge: 'Operate',
    },
  ],
  differentiators: [
    'Operator-led delivery with visible weekly progress.',
    'Systems designed to fit constraints, not force a platform rewrite.',
    'Production hardening and handoff, not just prototypes.',
    'Clear scope, documentation, and decision points for small teams.',
  ],
  projects: [
    {
      name: 'QuestByCycle',
      summary: 'Authenticated climate participation platform with quests, leaderboards, and event workflows.',
      impact: 'Ran multiple public game cycles and supported 100+ riders in a live program setting.',
      stack: ['Flask', 'Vite PWA', 'Auth', 'Leaderboards', 'PostgreSQL', 'Redis'],
      link: 'https://questbycycle.org',
      status: 'Live',
    },
    {
      name: 'Moonshine Art marketplace',
      summary: 'Cross-platform marketplace foundation with auth, billing, and cloud deployment.',
      impact: 'Built the product and infrastructure base needed for a launch-ready commerce flow.',
      stack: ['Flutter', 'Firebase', 'Cloud Run', 'Stripe', 'Terraform'],
      link: 'https://moonshine-dev-be279.web.app/',
      status: 'In progress',
    },
    {
      name: 'CrowdPM Platform',
      summary: 'Map-based planning platform with API boundaries and data ingestion design.',
      impact: 'Delivered the architecture and implementation path used by project leads and contributors.',
      stack: ['React', 'Vite', 'Map UI', 'API', 'Ingest pipeline', 'Cloud Run'],
      link: 'https://crowdpmplatform.web.app',
      status: 'In collaboration',
    },
    {
      name: 'ARM64-ADK',
      summary: 'Linux ARM64 Android tooling with service-oriented workflows and production-style orchestration.',
      impact: 'Established a maintainable toolchain for a specialized build environment.',
      stack: ['Rust', 'gRPC', 'GTK4', 'Linux ARM64', 'Android SDK/NDK'],
      link: 'https://github.com/denuoweb/ARM64-ADK',
      status: 'Open source',
    },
  ],
  work: {
    caseStudies: [
      {
        slug: 'moonshine-art',
        name: 'Moonshine Art',
        summary:
          'Marketplace foundation for an independent art brand with a cross-platform app, secure data layer, and production billing.',
        impact:
          'Shipped the initial commerce stack with authenticated purchasing flows, Stripe support, and deployment guardrails.',
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
          title: 'MVP / Internal Tool Build',
          summary: 'End-to-end product build from architecture through deployment.',
          outcomes: ['Product architecture', 'Backend/API delivery', 'Production deployment path'],
          timeline: 'Multi-phase delivery',
        },
      },
      {
        slug: 'crowdpm-platform',
        name: 'CrowdPM Platform',
        summary:
          'Collaborative planning platform centered on interactive mapping, structured data ingest, and cloud APIs for stakeholder workflows.',
        impact:
          'Delivered the architecture, ingestion design, and implementation scaffolding used by project leads and contributors.',
        challenge:
          'The team needed a credible discovery path that connected map-heavy UI interactions with reliable backend ingestion and API contracts.',
        solution:
          'Implemented a React + Vite interface, mapped-data views, API service boundaries, and an ingest pipeline blueprint for operational data flow.',
        outcomes: [
          'Delivered clear architecture artifacts and API-ready boundaries for implementation teams.',
          'Connected map UI requirements to backend data contracts and ingestion steps.',
          'Reduced onboarding time for new contributors with shared technical direction.',
        ],
        stack: ['React', 'Vite', 'Map UI', 'API', 'Ingest pipeline', 'Cloud Run'],
        status: 'In collaboration',
        liveUrl: 'https://crowdpmplatform.web.app',
        repositoryUrl: 'https://github.com/Denuo-Web/CrowdPMPlatform',
        servicePackage: {
          title: 'Architecture / Discovery Sprint',
          summary: 'System design and implementation planning for multi-contributor teams.',
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
          title: 'MVP / Internal Tool Build',
          summary: 'Production-ready application delivery with deployment ownership.',
          outcomes: ['Feature implementation', 'Release management', 'Operational support'],
          timeline: 'End-to-end launch cycle',
        },
      },
      {
        slug: 'arm64-adk',
        name: 'ARM64-ADK',
        summary:
          'GUI-first Android DevKit scaffold for Linux ARM64, with gRPC services handling toolchain, builds, targets, and observability.',
        impact:
          'Delivered an open-source platform architecture that makes Android development workflows viable on ARM64 Linux hosts.',
        challenge:
          'Android build workflows are often centered on x86 tooling, while Linux ARM64 teams need native-first tooling and clear orchestration between services.',
        solution:
          'Implemented a Rust multi-service gRPC system with GTK4 UI + CLI thin clients, JobService event streaming, and Workflow orchestration for end-to-end build operations.',
        outcomes: [
          'Defined a clean service topology for Toolchain, Build, Target, Observe, Project, and Workflow domains.',
          'Enabled Linux ARM64-focused toolchain workflows and repeatable local runtime orchestration.',
          'Published a reusable open-source scaffold for future Android platform automation.',
        ],
        stack: ['Rust', 'gRPC', 'GTK4', 'Linux ARM64', 'Android SDK/NDK'],
        status: 'Open source',
        repositoryUrl: 'https://github.com/denuoweb/ARM64-ADK',
        servicePackage: {
          title: 'Stabilize / Operate',
          summary: 'Tooling and automation support for specialized engineering workflows.',
          outcomes: ['Tooling architecture', 'Service orchestration', 'Operational runbooks'],
          timeline: 'Iteration-based roadmap',
        },
      },
    ],
    servicePackages: [
      {
        title: 'Architecture / Discovery Sprint',
        summary: 'Technical plan, system design, delivery roadmap, and architecture tradeoffs.',
        outcomes: ['System design', 'Delivery roadmap', 'Tradeoff record'],
        timeline: '1-2 weeks',
      },
      {
        title: 'MVP / Internal Tool Build',
        summary: 'Working product increment with auth, app shell, data model, and deployment path.',
        outcomes: ['App shell + data model', 'Auth/admin foundation', 'Production-ready deployment path'],
        timeline: 'Time-boxed build',
      },
      {
        title: 'Stabilize / Operate',
        summary: 'Cleanup, hardening, and handoff for an existing codebase or internal tool.',
        outcomes: ['CI/CD and deployments', 'Observability and hardening', 'Operational handoff'],
        timeline: 'Targeted stabilization',
      },
    ],
    testimonials: [],
  },
  process: [
    {
      title: 'Scope alignment',
      detail: 'Clarify the user, the current system, the deadline, and the constraints before building.',
      outcome: 'A scoped starting point with clear success criteria and risks.',
    },
    {
      title: 'Technical design',
      detail: 'Define the system boundary, data model, API shape, and deployment path.',
      outcome: 'A concrete plan that a small team can follow without rework.',
    },
    {
      title: 'Build and review',
      detail: 'Ship in weekly increments, review progress, and adjust scope when needed.',
      outcome: 'Working software with visible progress and decision points.',
    },
    {
      title: 'Launch and handoff',
      detail: 'Stabilize deployments, document the system, and hand over operational ownership.',
      outcome: 'Runbooks, release notes, and a clean next-step backlog.',
    },
  ],
  contact: {
    headline: 'Tell me what needs to ship in the next 60-90 days.',
    subhead:
      'Share the current system, who it is for, and any fixed deadlines or constraints. I respond with a concrete next step.',
    email: 'info@denuoweb.com',
    note: 'If there is an existing codebase, I will start from its constraints and return a scope-minded plan.',
  },
}
