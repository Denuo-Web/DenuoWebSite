import type { SiteContent } from '../types'

export const fallbackContent: SiteContent = {
  hero: {
    eyebrow: 'Software delivery lab',
    title: 'Practical web systems for teams that need implementation, integrations, and supportable launches.',
    subtitle:
      "Denuo Web is Jaron Rosenau's software delivery practice. I scope, build, integrate, deploy, document, and support API-driven web apps, internal tools, marketplace workflows, and operational tooling.",
    badge: 'Implementation / integrations / support handoff',
    primaryCta: 'View case studies',
    secondaryCta: 'Discuss your project',
  },
  stats: [],
  services: [
    {
      title: 'Discovery / Implementation Plan',
      summary: 'Turn unclear requirements, APIs, data flows, or operating constraints into a buildable delivery plan.',
      bullets: [
        'Clarify users, workflows, system boundaries, data sources, and launch constraints.',
        'Define API contracts, deployment shape, risks, and a delivery sequence a small team can execute.',
        'Leave with concrete artifacts: scope, system design, decisions, and next implementation steps.',
      ],
      badge: 'Plan',
    },
    {
      title: 'Web App / Integration Build',
      summary: 'Ship authenticated apps, dashboards, APIs, checkout flows, admin tools, and workflow automation.',
      bullets: [
        'Build the app shell, data model, auth/admin paths, and customer-facing workflows.',
        'Connect third-party APIs, webhooks, background jobs, and operational data flows.',
        'Deploy a usable production path with release notes and handoff documentation.',
      ],
      badge: 'Build',
    },
    {
      title: 'Stabilize / Support Handoff',
      summary: 'Make existing systems easier to deploy, debug, document, and operate.',
      bullets: [
        'Clean up CI/CD, environment config, auth edges, API failures, and release steps.',
        'Add logging, status checks, support notes, runbooks, and maintainable issue paths.',
        'Leave the team with a system that is easier to support after handoff.',
      ],
      badge: 'Support',
    },
  ],
  differentiators: [
    'Technical decisions and implementation stay with one accountable operator.',
    'Work starts from existing constraints: budget, data, staff time, live users, and support burden.',
    'API contracts, deployment paths, runbooks, and support notes are treated as part of delivery.',
    'Progress is shown through working software, documented decisions, and clear next actions.',
  ],
  projects: [
    {
      name: 'QuestByCycle',
      summary: 'Authenticated community climate game with quests, scorekeeping, admin workflows, and event support.',
      impact: 'Supported live program cycles, participant onboarding, and recurring event operations.',
      stack: ['Flask', 'Vite PWA', 'Auth', 'Leaderboards', 'PostgreSQL', 'Redis'],
      link: 'https://questbycycle.org',
      status: 'Live',
    },
    {
      name: 'Moonshine Art marketplace',
      summary:
        'Public case study covering a Flutter client, Firebase data model, Cloud Run APIs, Stripe Connect, print fulfillment, moderation, and compliance workflows.',
      impact: 'Documented a launch-ready marketplace architecture without exposing private source or sensitive product data.',
      stack: ['Flutter', 'Firebase', 'Cloud Run', 'Stripe Connect', 'Firestore', 'Terraform'],
      link: 'https://github.com/Denuo-Web/moonshine-art-case-study',
      status: 'Case study',
    },
    {
      name: 'CrowdPM Platform',
      summary: 'Map-based planning platform with API boundaries, structured data flows, and contributor-ready architecture.',
      impact: 'Delivered the implementation path and technical scaffolding used by project leads and contributors.',
      stack: ['React', 'Vite', 'Map UI', 'API design', 'Data ingest', 'Cloud Run'],
      link: 'https://crowdpmplatform.web.app',
      status: 'In collaboration',
    },
    {
      name: 'APK Workbench',
      summary: 'Linux ARM64 Android tooling with Rust services, GTK UI, build orchestration, and support-oriented docs.',
      impact: 'Established a maintainable toolchain direction for specialized Android workflows on ARM64 Linux.',
      stack: ['Rust', 'gRPC', 'GTK4', 'Linux ARM64', 'Android SDK/NDK'],
      link: 'https://github.com/Denuo-Web/APK-Workbench',
      status: 'Open source',
    },
    {
      name: 'DripCopy',
      summary: 'Resilient file-copy utility for optical media on low-power USB hosts with rate limiting and recovery behavior.',
      impact: 'Turned a fragile manual data-transfer problem into a conservative, repeatable support tool.',
      stack: ['Linux', 'CLI', 'File IO', 'Rate limiting', 'Recovery'],
      link: 'https://github.com/Denuo-Web/DripCopy',
      status: 'Open source',
    },
  ],
  work: {
    caseStudies: [
      {
        slug: 'moonshine-art',
        name: 'Moonshine Art',
        summary:
          'Sanitized marketplace architecture case study for a cross-platform art commerce product with app, backend, payments, fulfillment, moderation, and support workflows.',
        impact:
          'Documented a launch-ready implementation path while keeping private code, credentials, and sensitive business data out of the public artifact.',
        challenge:
          'The product needed a marketplace foundation spanning mobile app, seller onboarding, checkout, print fulfillment, moderation, and support operations, while the public portfolio artifact needed to avoid exposing private source or sensitive data.',
        solution:
          'Built and documented a sanitized reference case study showing Flutter/Firebase client architecture, Cloud Run services, Stripe Connect onboarding, print/ship adapter boundaries, Firestore collections, moderation functions, compliance archiving, and operational handoff notes.',
        outcomes: [
          'Mapped seller onboarding, buyer checkout, fulfillment, webhook handling, and complaint moderation as supportable workflows.',
          'Separated public architecture evidence from private implementation details and client data.',
          'Captured deployment, data, and operations boundaries that can be discussed with technical and nontechnical stakeholders.',
        ],
        stack: ['Flutter', 'Firebase', 'Cloud Run', 'Stripe Connect', 'Gelato API', 'Firestore', 'Terraform'],
        status: 'Public case study',
        repositoryUrl: 'https://github.com/Denuo-Web/moonshine-art-case-study',
        servicePackage: {
          title: 'Web App / Integration Build',
          summary: 'End-to-end app, API, payment, fulfillment, and operations architecture.',
          outcomes: ['Product architecture', 'API and webhook boundaries', 'Operational handoff'],
          timeline: 'Multi-phase delivery',
        },
      },
      {
        slug: 'questbycycle',
        name: 'QuestByCycle',
        summary:
          'Community climate game platform delivered as a Flask + Vite PWA with account flows, challenge mechanics, leaderboards, and event operations.',
        impact: 'Powered public game events, supported rider onboarding, and gave organizers a reusable program platform.',
        challenge:
          'The nonprofit needed a production application quickly, with account security and gamified features that worked on mobile for live events.',
        solution:
          'Built a Flask backend with a Vite PWA frontend, implemented auth workflows, quest progression logic, leaderboard capabilities, and deployment support for active campaigns.',
        outcomes: [
          'Launched a working program platform for recurring games and participant retention.',
          'Delivered authenticated user journeys and points/quest progression.',
          'Supported leaderboard features and mobile-ready PWA behavior for field usage.',
        ],
        stack: ['Flask', 'Vite PWA', 'Auth', 'Leaderboards', 'PostgreSQL', 'Redis'],
        status: 'Live',
        liveUrl: 'https://questbycycle.org',
        repositoryUrl: 'https://github.com/Denuo-Web/QuestByCycle',
        servicePackage: {
          title: 'Web App / Integration Build',
          summary: 'Production-ready application delivery with deployment ownership.',
          outcomes: ['Feature implementation', 'Release management', 'Operational support'],
          timeline: 'End-to-end launch cycle',
        },
      },
      {
        slug: 'crowdpm-platform',
        name: 'CrowdPM Platform',
        summary:
          'Collaborative planning platform centered on interactive mapping, structured data ingest, and cloud API boundaries for stakeholder workflows.',
        impact:
          'Delivered architecture, ingestion design, and implementation scaffolding that project leads and contributors could build from.',
        challenge:
          'The team needed a credible discovery path that connected map-heavy UI interactions with reliable backend ingestion and API contracts.',
        solution:
          'Implemented a React + Vite interface, mapped-data views, API service boundaries, and an ingest pipeline blueprint for operational data flow.',
        outcomes: [
          'Delivered clear architecture artifacts and API-ready boundaries for implementation teams.',
          'Connected map UI requirements to backend data contracts and ingestion steps.',
          'Reduced onboarding time for contributors with shared technical direction.',
        ],
        stack: ['React', 'Vite', 'Map UI', 'API design', 'Data ingest', 'Cloud Run'],
        status: 'In collaboration',
        liveUrl: 'https://crowdpmplatform.web.app',
        repositoryUrl: 'https://github.com/Denuo-Web/CrowdPMPlatform',
        servicePackage: {
          title: 'Discovery / Implementation Plan',
          summary: 'System design and implementation planning for multi-contributor teams.',
          outcomes: ['System design', 'API contracts', 'Data ingestion strategy'],
          timeline: 'Architecture-first engagement',
        },
      },
      {
        slug: 'apk-workbench',
        name: 'APK Workbench',
        summary:
          'GUI-first Android DevKit scaffold for Linux ARM64, with gRPC services handling toolchain, builds, targets, and observability.',
        impact:
          'Delivered an open-source platform architecture for specialized Android tooling on ARM64 Linux hosts.',
        challenge:
          'Android build workflows are often centered on x86 tooling, while Linux ARM64 teams need native-first tooling and clear orchestration between services.',
        solution:
          'Implemented a Rust multi-service gRPC system with GTK4 UI + CLI thin clients, JobService event streaming, and workflow orchestration for end-to-end build operations.',
        outcomes: [
          'Defined service boundaries for Toolchain, Build, Target, Observe, Project, and Workflow domains.',
          'Enabled Linux ARM64-focused toolchain workflows and repeatable local runtime orchestration.',
          'Published a reusable open-source scaffold for future Android platform automation.',
        ],
        stack: ['Rust', 'gRPC', 'GTK4', 'Linux ARM64', 'Android SDK/NDK'],
        status: 'Open source',
        repositoryUrl: 'https://github.com/Denuo-Web/APK-Workbench',
        servicePackage: {
          title: 'Stabilize / Support Handoff',
          summary: 'Tooling and automation support for specialized engineering workflows.',
          outcomes: ['Tooling architecture', 'Service orchestration', 'Operational runbooks'],
          timeline: 'Iteration-based roadmap',
        },
      },
      {
        slug: 'dripcopy',
        name: 'DripCopy',
        summary:
          'Rate-limited file-copy utility for CD/DVD data on low-power or unstable USB hosts.',
        impact:
          'Converted a fragile support task into a repeatable command-line workflow with conservative IO behavior.',
        challenge:
          'Bulk optical-media copying on low-power USB hosts can cause drives to spin aggressively, reset, or fail mid-transfer.',
        solution:
          'Implemented a conservative copy workflow that spaces file transfers, keeps operator feedback visible, and is simple enough to run in constrained support environments.',
        outcomes: [
          'Reduced manual babysitting during long optical-media transfers.',
          'Made transfer behavior easier to explain, repeat, and troubleshoot.',
          'Captured a narrow support problem as a reusable public utility.',
        ],
        stack: ['Linux', 'CLI', 'File IO', 'Rate limiting', 'Recovery'],
        status: 'Open source',
        repositoryUrl: 'https://github.com/Denuo-Web/DripCopy',
        servicePackage: {
          title: 'Stabilize / Support Handoff',
          summary: 'Small operational tooling for fragile workflows.',
          outcomes: ['Support utility', 'Repeatable workflow', 'Troubleshooting notes'],
          timeline: 'Targeted utility',
        },
      },
    ],
    servicePackages: [
      {
        title: 'Discovery / Implementation Plan',
        summary: 'Technical plan, system design, delivery roadmap, API boundaries, and risk register.',
        outcomes: ['System design', 'Delivery roadmap', 'Tradeoff record'],
        timeline: '1-2 weeks',
      },
      {
        title: 'Web App / Integration Build',
        summary: 'Working product increment with app shell, data model, auth, APIs, and deployment path.',
        outcomes: ['App shell + data model', 'Auth/admin foundation', 'Production deployment path'],
        timeline: 'Time-boxed build',
      },
      {
        title: 'Stabilize / Support Handoff',
        summary: 'Cleanup, hardening, runbooks, and handoff for an existing codebase or operational tool.',
        outcomes: ['CI/CD and deployments', 'Observability and hardening', 'Operational handoff'],
        timeline: 'Targeted stabilization',
      },
    ],
    testimonials: [],
  },
  process: [
    {
      title: 'Scope the supportable system',
      detail: 'Clarify the user, current workflow, existing code/data, deadline, and operational constraints.',
      outcome: 'A scoped starting point with success criteria, risks, and known unknowns.',
    },
    {
      title: 'Design the implementation path',
      detail: 'Define system boundaries, data model, API shape, integration points, and deployment path.',
      outcome: 'A concrete plan that can be built, reviewed, and supported.',
    },
    {
      title: 'Build and integrate',
      detail: 'Ship in small increments, connect APIs and workflows, review progress, and adjust scope when needed.',
      outcome: 'Working software with visible progress and explicit decision points.',
    },
    {
      title: 'Launch and hand off',
      detail: 'Stabilize deployments, document the system, and leave support notes for future operation.',
      outcome: 'Runbooks, release notes, and a clean next-step backlog.',
    },
  ],
  contact: {
    headline: 'Tell me what needs to ship, integrate, or stabilize in the next 60-90 days.',
    subhead:
      'Share the current system, who uses it, what already exists, and any fixed constraints. I respond with a concrete next step.',
    email: 'info@denuoweb.com',
    note: 'Existing codebases, APIs, manual workflows, or partial builds are useful starting points.',
  },
}
