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
      name: 'QuestByCycle.org',
      summary: 'A Flask + Vite PWA with auth, quests, leaderboards, and offline-ready pages for a local climate nonprofit.',
      impact: 'Ran four public games, onboarded 100+ riders, and earned a $2,000 honorarium.',
      stack: ['Flask', 'Vite/React', 'PostgreSQL', 'Redis', 'NGINX', 'Gunicorn'],
      link: 'https://questbycycle.org',
      status: 'Live',
    },
    {
      name: 'Moonshine Art marketplace',
      summary: 'Flutter + Firebase + Cloud Run poster marketplace with Stripe payments and Terraform-managed GCP.',
      impact: 'Built monorepo foundations, auth flows, and CI for a remote art founder.',
      stack: ['Flutter', 'Firebase', 'Cloud Run', 'Stripe', 'Terraform'],
      status: 'In progress',
    },
    {
      name: 'CrowdPM Platform',
      summary: 'React + Vite map UI over Firebase/Cloud Run API with deck.gl for a collaborative planning tool.',
      impact: 'Partnered with OSU capstone teams; delivered MVP specs, architecture docs, and OpenAPI contracts.',
      stack: ['React/Vite', 'deck.gl', 'Firebase', 'Cloud Run'],
      status: 'In collaboration',
    },
  ],
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
