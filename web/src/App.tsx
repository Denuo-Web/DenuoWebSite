import { useEffect, useMemo, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Button, Theme, ThemePanel, type ThemeProps } from '@radix-ui/themes'

import { useSiteContent } from './hooks/useSiteContent'
import { uiCopy, type Language } from './i18n/uiCopy'
import AdminPage from './pages/Admin'
import LandingPage from './pages/Landing'

import '@radix-ui/themes/styles.css'
import './App.css'

type Appearance = 'light' | 'dark'
type AccentColor = NonNullable<ThemeProps['accentColor']>
type GrayColor = NonNullable<ThemeProps['grayColor']>
type PanelBackground = NonNullable<ThemeProps['panelBackground']>
type Radius = NonNullable<ThemeProps['radius']>
type Scaling = NonNullable<ThemeProps['scaling']>

type ThemeState = {
  appearance: Appearance
  accentColor: AccentColor
  grayColor: GrayColor
  panelBackground: PanelBackground
  radius: Radius
  scaling: Scaling
}

const THEME_KEY = 'denuo-theme'
const LANGUAGE_KEY = 'denuo-language'

function App() {
  const { content, loading, error, saveContent } = useSiteContent()
  const location = useLocation()
  const [themeState] = useState<ThemeState>(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(THEME_KEY) : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<ThemeState>
        return {
          appearance: parsed.appearance === 'light' || parsed.appearance === 'dark' ? parsed.appearance : 'light',
          accentColor: (parsed.accentColor as AccentColor) || 'indigo',
          grayColor: (parsed.grayColor as GrayColor) || 'auto',
          panelBackground: (parsed.panelBackground as PanelBackground) || 'translucent',
          radius: (parsed.radius as Radius) || 'large',
          scaling: (parsed.scaling as Scaling) || '100%',
        }
      } catch {
        // fall through to defaults
      }
    }
    return {
      appearance: 'light',
      accentColor: 'indigo',
      grayColor: 'auto',
      panelBackground: 'translucent',
      radius: 'large',
      scaling: '100%',
    }
  })
  const [language, setLanguage] = useState<Language>(() => {
    const stored = typeof window !== 'undefined' ? (window.localStorage.getItem(LANGUAGE_KEY) as Language | null) : null
    return stored === 'ja' ? 'ja' : 'en'
  })
  const [themePanelOpen, setThemePanelOpen] = useState(false)
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(THEME_KEY, JSON.stringify(themeState))
    document.documentElement.setAttribute('data-appearance', themeState.appearance)
  }, [themeState])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  const openThemePanel = () => {
    setThemePanelOpen(true)
  }
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'ja' : 'en'))

  const copy = useMemo(() => uiCopy[language], [language])

  return (
    <Theme
      className="app-shell"
      appearance={themeState.appearance}
      accentColor={themeState.accentColor}
      grayColor={themeState.grayColor}
      panelBackground={themeState.panelBackground}
      radius={themeState.radius}
      scaling={themeState.scaling}
    >
      {themePanelOpen && !isAdminRoute && (
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 1000,
            background: 'var(--color-panel-translucent)',
            padding: '0.75rem',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
            <strong>Theme</strong>
            <Button size="1" variant="ghost" onClick={() => setThemePanelOpen(false)}>
              Close
            </Button>
          </div>
          <ThemePanel defaultOpen />
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              content={content}
              loading={loading}
              error={error}
              onOpenThemePanel={openThemePanel}
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
              onOpenThemePanel={openThemePanel}
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
