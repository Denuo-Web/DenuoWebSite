import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'

import { fallbackContent } from '../content/fallback'
import { db } from '../lib/firebase'
import { toProjectSlug } from '../lib/projectSlug'
import type { CaseStudy, ContactInfo, Project, ServicePackage, SiteContent, Testimonial } from '../types'

const fallbackCaseStudyBySlug = new Map(fallbackContent.work.caseStudies.map((item) => [item.slug, item]))

const isString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0

const toStringArray = (value: unknown, fallback: string[] = []): string[] => {
  if (!Array.isArray(value)) return [...fallback]
  const next = value.filter(isString).map((entry) => entry.trim())
  return next.length > 0 ? next : [...fallback]
}

const normalizeServicePackage = (value: unknown, fallback?: ServicePackage): ServicePackage | undefined => {
  if (!value || typeof value !== 'object') return fallback

  const record = value as Partial<ServicePackage>
  const title = isString(record.title) ? record.title.trim() : fallback?.title
  if (!title) return fallback

  return {
    title,
    summary: isString(record.summary) ? record.summary.trim() : fallback?.summary ?? '',
    outcomes: toStringArray(record.outcomes, fallback?.outcomes ?? []),
    timeline: isString(record.timeline) ? record.timeline.trim() : fallback?.timeline,
  }
}

const normalizeTestimonial = (value: unknown): Testimonial | null => {
  if (!value || typeof value !== 'object') return null

  const record = value as Partial<Testimonial>
  const quote = isString(record.quote) ? record.quote.trim() : null
  const person = isString(record.person) ? record.person.trim() : null
  const role = isString(record.role) ? record.role.trim() : null

  if (!quote || !person || !role) return null

  return {
    quote,
    person,
    role,
    company: isString(record.company) ? record.company.trim() : undefined,
    caseStudySlug: isString(record.caseStudySlug) ? record.caseStudySlug.trim() : undefined,
  }
}

const normalizeCaseStudy = (value: unknown, slugHint?: string): CaseStudy | null => {
  if (!value || typeof value !== 'object') return null

  const record = value as Partial<CaseStudy>
  const fallbackBySlug = slugHint ? fallbackCaseStudyBySlug.get(slugHint) : undefined
  const slugFromRecord = isString(record.slug) ? record.slug.trim() : undefined
  const resolvedSlug = slugFromRecord ?? slugHint ?? fallbackBySlug?.slug
  const fallback = resolvedSlug ? fallbackCaseStudyBySlug.get(resolvedSlug) : fallbackBySlug

  const name = isString(record.name) ? record.name.trim() : fallback?.name
  if (!name) return null

  const slug = resolvedSlug ?? fallback?.slug ?? toProjectSlug(name)
  const summary = isString(record.summary) ? record.summary.trim() : fallback?.summary ?? ''
  const impact = isString(record.impact) ? record.impact.trim() : fallback?.impact ?? summary
  const challenge = isString(record.challenge) ? record.challenge.trim() : fallback?.challenge ?? summary
  const solution = isString(record.solution) ? record.solution.trim() : fallback?.solution ?? impact

  return {
    slug,
    name,
    summary,
    impact,
    challenge,
    solution,
    outcomes: toStringArray(record.outcomes, fallback?.outcomes ?? []),
    stack: toStringArray(record.stack, fallback?.stack ?? []),
    status: isString(record.status) ? record.status.trim() : fallback?.status,
    liveUrl: isString(record.liveUrl) ? record.liveUrl.trim() : fallback?.liveUrl,
    repositoryUrl: isString(record.repositoryUrl) ? record.repositoryUrl.trim() : fallback?.repositoryUrl,
    servicePackage: normalizeServicePackage(record.servicePackage, fallback?.servicePackage),
  }
}

const normalizeContact = (value: unknown): ContactInfo => {
  if (!value || typeof value !== 'object') return fallbackContent.contact

  const record = value as Partial<ContactInfo>

  return {
    headline: isString(record.headline) ? record.headline.trim() : fallbackContent.contact.headline,
    subhead: isString(record.subhead) ? record.subhead.trim() : fallbackContent.contact.subhead,
    email: isString(record.email) ? record.email.trim() : fallbackContent.contact.email,
    note: isString(record.note) ? record.note.trim() : fallbackContent.contact.note,
  }
}

const projectToCaseStudy = (project: Project): CaseStudy => {
  const slug = toProjectSlug(project.name)
  const fallback = fallbackCaseStudyBySlug.get(slug)
  const impact = isString(project.impact) ? project.impact.trim() : fallback?.impact ?? ''
  const summary = isString(project.summary) ? project.summary.trim() : fallback?.summary ?? impact

  return {
    slug,
    name: isString(project.name) ? project.name.trim() : fallback?.name ?? slug,
    summary,
    impact,
    challenge: fallback?.challenge ?? summary,
    solution: fallback?.solution ?? impact,
    outcomes: fallback?.outcomes ?? [impact].filter(Boolean),
    stack: project.stack.length > 0 ? project.stack : fallback?.stack ?? [],
    status: project.status ?? fallback?.status,
    liveUrl: project.link ?? fallback?.liveUrl,
    repositoryUrl: fallback?.repositoryUrl,
    servicePackage: fallback?.servicePackage,
  }
}

const normalizeServicePackages = (value: unknown): ServicePackage[] => {
  if (!Array.isArray(value)) return fallbackContent.work.servicePackages
  const next = value
    .map((item, index) => normalizeServicePackage(item, fallbackContent.work.servicePackages[index]))
    .filter((item): item is ServicePackage => Boolean(item))

  return next.length > 0 ? next : fallbackContent.work.servicePackages
}

const normalizeTestimonials = (value: unknown): Testimonial[] => {
  if (!Array.isArray(value)) return fallbackContent.work.testimonials
  return value.map((item) => normalizeTestimonial(item)).filter((item): item is Testimonial => Boolean(item))
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(fallbackContent)
  const [loading, setLoading] = useState(() => Boolean(db))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!db) {
      return
    }

    const ref = doc(db, 'siteContent', 'public')
    const workRef = collection(db, 'siteContent', 'public', 'work')
    let liveDocument: Partial<SiteContent> = {}
    let liveWorkCaseStudies: CaseStudy[] = []
    let hasLiveWorkSnapshot = false
    let docSettled = false
    let workSettled = false

    const finalizeLoading = () => {
      if (docSettled && workSettled) {
        setLoading(false)
      }
    }

    const syncContent = () => {
      const liveProjects = Array.isArray(liveDocument.projects) ? liveDocument.projects : fallbackContent.projects
      const docCaseStudies = Array.isArray(liveDocument.work?.caseStudies)
        ? liveDocument.work.caseStudies
            .map((item) => normalizeCaseStudy(item))
            .filter((item): item is CaseStudy => Boolean(item))
        : []
      const projectCaseStudies =
        liveProjects.length > 0 ? liveProjects.map((project) => projectToCaseStudy(project)) : fallbackContent.work.caseStudies

      const caseStudies =
        hasLiveWorkSnapshot && liveWorkCaseStudies.length > 0
          ? liveWorkCaseStudies
          : docCaseStudies.length > 0
            ? docCaseStudies
            : projectCaseStudies

      setContent({
        hero: liveDocument.hero ?? fallbackContent.hero,
        stats: Array.isArray(liveDocument.stats) ? liveDocument.stats : fallbackContent.stats,
        services: Array.isArray(liveDocument.services) ? liveDocument.services : fallbackContent.services,
        differentiators: Array.isArray(liveDocument.differentiators)
          ? liveDocument.differentiators
          : fallbackContent.differentiators,
        projects: liveProjects,
        work: {
          caseStudies,
          servicePackages: normalizeServicePackages(liveDocument.work?.servicePackages),
          testimonials: normalizeTestimonials(liveDocument.work?.testimonials),
        },
        process: Array.isArray(liveDocument.process) ? liveDocument.process : fallbackContent.process,
        contact: normalizeContact(liveDocument.contact),
      })
    }

    const unsubscribeDoc = onSnapshot(
      ref,
      (snapshot) => {
        liveDocument = snapshot.exists() ? (snapshot.data() as Partial<SiteContent>) : {}
        docSettled = true
        syncContent()
        if (workSettled && hasLiveWorkSnapshot) {
          setError(null)
        }
        finalizeLoading()
      },
      (err) => {
        console.error('Error loading site content', err)
        setError('Unable to load live content. Showing fallback instead.')
        docSettled = true
        finalizeLoading()
      }
    )

    const unsubscribeWork = onSnapshot(
      workRef,
      (snapshot) => {
        hasLiveWorkSnapshot = true
        liveWorkCaseStudies = snapshot.docs
          .map((workDoc) =>
            normalizeCaseStudy(
              {
                ...(workDoc.data() as Partial<CaseStudy>),
                slug: workDoc.id,
              },
              workDoc.id
            )
          )
          .filter((item): item is CaseStudy => Boolean(item))
        workSettled = true
        syncContent()
        setError(null)
        finalizeLoading()
      },
      (err) => {
        console.error('Error loading case studies', err)
        setError((prev) => prev ?? 'Unable to load live case studies. Showing fallback instead.')
        workSettled = true
        finalizeLoading()
      }
    )

    return () => {
      unsubscribeDoc()
      unsubscribeWork()
    }
  }, [])

  const saveContent = async (next: SiteContent) => {
    if (!db) {
      throw new Error('Firebase is not configured. Set VITE_FIREBASE_* env vars to enable saves.')
    }

    await setDoc(doc(db, 'siteContent', 'public'), {
      ...next,
      work: {
        servicePackages: next.work.servicePackages,
        testimonials: next.work.testimonials,
      },
    })

    setContent(next)
    setError(null)
  }

  return { content, loading, error, saveContent, setContent }
}
