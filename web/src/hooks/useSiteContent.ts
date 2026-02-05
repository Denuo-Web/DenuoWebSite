import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'

import { fallbackContent } from '../content/fallback'
import { db } from '../lib/firebase'
import type { SiteContent } from '../types'

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(fallbackContent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }

    const ref = doc(db, 'siteContent', 'public')
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          const liveContent = snapshot.data() as SiteContent
          const contact = liveContent.contact
            ? {
                headline: liveContent.contact.headline ?? fallbackContent.contact.headline,
                subhead: liveContent.contact.subhead ?? fallbackContent.contact.subhead,
                email: liveContent.contact.email ?? fallbackContent.contact.email,
                note: liveContent.contact.note ?? fallbackContent.contact.note,
              }
            : fallbackContent.contact

          setContent({
            ...fallbackContent,
            ...liveContent,
            contact,
          })
        }
        setLoading(false)
      },
      (err) => {
        console.error('Error loading site content', err)
        setError('Unable to load live content. Showing fallback instead.')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const saveContent = async (next: SiteContent) => {
    if (!db) {
      throw new Error('Firebase is not configured. Set VITE_FIREBASE_* env vars to enable saves.')
    }
    await setDoc(doc(db, 'siteContent', 'public'), next)
    setContent(next)
    setError(null)
  }

  return { content, loading, error, saveContent, setContent }
}
