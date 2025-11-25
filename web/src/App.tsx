import { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'

import { useSiteContent } from './hooks/useSiteContent'
import { uiCopy, type Language } from './i18n/uiCopy'
import AdminPage from './pages/Admin'
import LandingPage from './pages/Landing'

import '@radix-ui/themes/styles.css'
import './App.css'

type Appearance = 'light' | 'dark'

const THEME_KEY = 'denuo-theme'
const LANGUAGE_KEY = 'denuo-language'

function App() {
  const { content, loading, error, saveContent } = useSiteContent()
  const [appearance, setAppearance] = useState<Appearance>(() => {
    const stored = localStorage.getItem(THEME_KEY) as Appearance | null
    if (stored === 'light' || stored === 'dark') return stored
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem(LANGUAGE_KEY) as Language | null
    return stored === 'ja' ? 'ja' : 'en'
  })

  useEffect(() => {
    localStorage.setItem(THEME_KEY, appearance)
    document.documentElement.setAttribute('data-appearance', appearance)
  }, [appearance])

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  const toggleAppearance = () => setAppearance((prev) => (prev === 'dark' ? 'light' : 'dark'))
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'ja' : 'en'))

  const copy = useMemo(() => uiCopy[language], [language])

  return (
    <Theme appearance={appearance} accentColor="jade" grayColor="slate" radius="large">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              content={content}
              loading={loading}
              error={error}
              appearance={appearance}
              onToggleTheme={toggleAppearance}
              language={language}
              onToggleLanguage={toggleLanguage}
              copy={copy}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPage
              content={content}
              onSave={saveContent}
              appearance={appearance}
              onToggleTheme={toggleAppearance}
              language={language}
              onToggleLanguage={toggleLanguage}
              copy={copy}
            />
          }
        />
      </Routes>
    </Theme>
  )
}

export default App
