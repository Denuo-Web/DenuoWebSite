export interface Stat {
  label: string
  value: string
  helper?: string
}

export interface Service {
  title: string
  summary: string
  bullets: string[]
  badge?: string
  link?: string
}

export interface Project {
  name: string
  summary: string
  impact: string
  stack: string[]
  link?: string
  status?: string
}

export interface ProcessStep {
  title: string
  detail: string
  outcome: string
}

export interface ContactInfo {
  headline: string
  subhead: string
  email: string
  note?: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  subtitle: string
  badge: string
  primaryCta: string
  secondaryCta: string
}

export interface SiteContent {
  hero: HeroContent
  stats: Stat[]
  services: Service[]
  differentiators: string[]
  projects: Project[]
  process: ProcessStep[]
  contact: ContactInfo
}
