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
  stats: [
    {
      label: 'QuestByCycle launches',
      value: '4 public games',
      helper: '~100+ riders onboarded with quests, leaderboards, and web push.',
    },
    { label: 'Client honorarium', value: '$2,000', helper: 'Awarded by 350 Eugene for end-to-end delivery.' },
    { label: 'Cloud coverage', value: 'Firebase · GCP · AWS', helper: 'Comfortable across hosting, auth, and observability.' },
  ],
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
      title: 'Discover & scope',
      detail: 'Work sessions to clarify users, success metrics, and constraints.',
      outcome: 'A lean spec, timeline, and budget owners can sign off on.',
    },
    {
      title: 'Architecture & plan',
      detail: 'Choose the right stack, data model, and hosting. Diagram auth, observability, and rollout.',
      outcome: 'An actionable blueprint: tickets, environments, and risks mapped.',
    },
    {
      title: 'Build & validate',
      detail: 'Iterative sprints with demos. Tests, accessibility, and analytics wired in.',
      outcome: 'Working software in staging with real data and admin controls.',
    },
    {
      title: 'Launch & support',
      detail: 'Cutover, smoke tests, and training. Handoffs with docs and dashboards.',
      outcome: 'A reliable system you can operate—and a partner who can extend it.',
    },
  ],
  contact: {
    headline: 'Ready for a build sprint or technical partner?',
    subhead:
      'Email or call directly, or drop details via the contact form. I respond within one business day.',
    email: 'jaron@rosenau.info',
    phone: '+1 (920) 292-0431',
    calendly: 'https://calendly.com/denuoweb/intro',
    note: 'Prefer async? I will return a short plan with scope, risks, and timeline.',
  },
}
