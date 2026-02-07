import { useEffect, useMemo, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'

import { db } from '../lib/firebase'
import { coerceUiCopyForLanguage, uiCopy, type Language, type UiCopy } from '../i18n/uiCopy'

type CopyByLanguage = Record<Language, UiCopy>

const defaultCopyByLanguage: CopyByLanguage = {
  en: uiCopy.en,
  ja: uiCopy.ja,
}

const isPermissionDeniedError = (value: unknown): boolean => {
  if (!value) return false

  const code = typeof value === 'object' && value !== null ? (value as { code?: unknown }).code : undefined
  if (typeof code === 'string' && (code === 'permission-denied' || code === 'firestore/permission-denied')) {
    return true
  }

  const message = value instanceof Error ? value.message : String(value)
  return message.includes('permission-denied') || message.includes('Missing or insufficient permissions')
}

export function useLocalizedUiCopy(language: Language) {
  const [copyByLanguage, setCopyByLanguage] = useState<CopyByLanguage>(defaultCopyByLanguage)
  const [copyError, setCopyError] = useState<string | null>(null)

  useEffect(() => {
    if (!db) {
      return
    }
    const firestore = db

    const languages: Language[] = ['en', 'ja']
    const unsubscribers = languages.map((nextLanguage) =>
      onSnapshot(
        doc(firestore, 'siteContent', 'public', 'translations', nextLanguage),
        (snapshot) => {
          const nextCopy = snapshot.exists() ? coerceUiCopyForLanguage(nextLanguage, snapshot.data()) : uiCopy[nextLanguage]
          setCopyByLanguage((prev) => ({ ...prev, [nextLanguage]: nextCopy }))
          setCopyError(null)
        },
        (err) => {
          if (!isPermissionDeniedError(err)) {
            console.error(`Error loading ${nextLanguage} ui copy`, err)
            setCopyError('Unable to load live UI copy translations. Using bundled copy instead.')
          }
          setCopyByLanguage((prev) => ({ ...prev, [nextLanguage]: uiCopy[nextLanguage] }))
        }
      )
    )

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe())
    }
  }, [])

  const saveTranslation = async (nextLanguage: Language, candidate: unknown) => {
    if (!db) {
      throw new Error('Firebase is not configured. Set VITE_FIREBASE_* env vars to enable translation saves.')
    }
    const firestore = db

    const normalized = coerceUiCopyForLanguage(nextLanguage, candidate)
    await setDoc(doc(firestore, 'siteContent', 'public', 'translations', nextLanguage), normalized)
    setCopyByLanguage((prev) => ({ ...prev, [nextLanguage]: normalized }))
  }

  const copy = useMemo(() => copyByLanguage[language], [copyByLanguage, language])

  return { copy, copyByLanguage, saveTranslation, copyError }
}
