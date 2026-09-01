import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Button, Theme, type ThemeProps } from '@radix-ui/themes'

import { useSiteContent } from './hooks/useSiteContent'
import { useLocalizedUiCopy } from './hooks/useLocalizedUiCopy'
import { localizeSiteContent } from './content/localized'
import type { Language } from './i18n/uiCopy'
import AdminPage from './pages/Admin'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import HnsDaneBrowserPage from './pages/HnsDaneBrowser'
import HnsDaneBrowserExtensionPage from './pages/HnsDaneBrowserExtension'
import {
  HnsDaneBrowserExtensionLegalPage,
  HnsDaneBrowserExtensionPrivacyPage,
} from './pages/HnsDaneBrowserExtensionLegal'
import HnsDaneBrowserPrivacyPage from './pages/HnsDaneBrowserPrivacy'
import LandingPage from './pages/Landing'
import ProcessPage from './pages/Process'
import ServicesPage from './pages/Services'
import WorkDetailPage from './pages/WorkDetail'
import WorkPage from './pages/Work'

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

const accentOptions = ['indigo', 'blue', 'cyan', 'teal', 'green', 'yellow', 'orange', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris'] as const satisfies readonly AccentColor[]
const grayOptions = ['auto', 'gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const satisfies readonly GrayColor[]
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const satisfies readonly Radius[]
const scalingOptions = ['90%', '95%', '100%', '105%', '110%'] as const satisfies readonly Scaling[]

const optionLabels = {
  en: {
    auto: 'Auto', gray: 'Gray', mauve: 'Mauve', slate: 'Slate', sage: 'Sage', olive: 'Olive', sand: 'Sand',
    none: 'None', small: 'Small', medium: 'Medium', large: 'Large', full: 'Full',
    indigo: 'Indigo', blue: 'Blue', cyan: 'Cyan', teal: 'Teal', green: 'Green', yellow: 'Yellow', orange: 'Orange', red: 'Red', ruby: 'Ruby', crimson: 'Crimson', pink: 'Pink', plum: 'Plum', purple: 'Purple', violet: 'Violet', iris: 'Iris',
  },
  ja: {
    auto: '自動', gray: 'グレー', mauve: 'モーブ', slate: 'スレート', sage: 'セージ', olive: 'オリーブ', sand: 'サンド',
    none: 'なし', small: '小', medium: '中', large: '大', full: '最大',
    indigo: 'インディゴ', blue: '青', cyan: 'シアン', teal: 'ティール', green: '緑', yellow: '黄', orange: 'オレンジ', red: '赤', ruby: 'ルビー', crimson: 'クリムゾン', pink: 'ピンク', plum: 'プラム', purple: '紫', violet: 'バイオレット', iris: 'アイリス',
  },
} as const

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  try {
    const stored = window.localStorage.getItem(LANGUAGE_KEY)
    if (stored === 'en' || stored === 'ja') return stored
  } catch {
    // Fall back to the browser preference when storage is unavailable.
  }

  const browserLanguages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language || 'en']

  for (const locale of browserLanguages) {
    const language = locale.toLowerCase().split('-')[0]
    if (language === 'en' || language === 'ja') return language
  }

  return 'en'
}

function App() {
  const { content, loading, error, saveContent } = useSiteContent()
  const location = useLocation()
  const [themeState, setThemeState] = useState<ThemeState>(() => {
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
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
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
    document.documentElement.lang = isAdminRoute ? 'en' : language
  }, [isAdminRoute, language])

  const openThemePanel = () => {
    setThemePanelOpen(true)
  }
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'ja' : 'en'))

  const { copy, copyByLanguage, saveTranslation, copyError } = useLocalizedUiCopy(language)
  const localizedContent = useMemo(() => localizeSiteContent(content, language), [content, language])
  const documentCopy = isAdminRoute ? copyByLanguage.en : copy

  useEffect(() => {
    document.title = documentCopy.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', documentCopy.meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', documentCopy.meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', documentCopy.meta.description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', !isAdminRoute && language === 'ja' ? 'ja_JP' : 'en_US')
  }, [documentCopy.meta, isAdminRoute, language])

  const marketingPageProps = {
    content: localizedContent,
    loading,
    error: error ?? copyError,
    onOpenThemePanel: openThemePanel,
    language,
    onToggleLanguage: toggleLanguage,
    copy,
  }

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
            <strong>{copy.chrome.themeTitle}</strong>
            <Button size="1" variant="ghost" onClick={() => setThemePanelOpen(false)}>
              {copy.chrome.closeLabel}
            </Button>
          </div>
          <div style={{ display: 'grid', gap: '0.65rem', marginTop: '0.75rem', minWidth: '14rem' }}>
            <ThemeSelect
              label={copy.theme.appearance}
              value={themeState.appearance}
              options={[
                { value: 'light', label: copy.theme.light },
                { value: 'dark', label: copy.theme.dark },
              ]}
              onChange={(appearance) => setThemeState((previous) => ({ ...previous, appearance: appearance as Appearance }))}
            />
            <ThemeSelect
              label={copy.theme.accentColor}
              value={themeState.accentColor}
              options={accentOptions.map((value) => ({ value, label: optionLabels[language][value] }))}
              onChange={(accentColor) => setThemeState((previous) => ({ ...previous, accentColor: accentColor as AccentColor }))}
            />
            <ThemeSelect
              label={copy.theme.grayColor}
              value={themeState.grayColor}
              options={grayOptions.map((value) => ({ value, label: optionLabels[language][value] }))}
              onChange={(grayColor) => setThemeState((previous) => ({ ...previous, grayColor: grayColor as GrayColor }))}
            />
            <ThemeSelect
              label={copy.theme.radius}
              value={themeState.radius}
              options={radiusOptions.map((value) => ({ value, label: optionLabels[language][value] }))}
              onChange={(radius) => setThemeState((previous) => ({ ...previous, radius: radius as Radius }))}
            />
            <ThemeSelect
              label={copy.theme.scaling}
              value={themeState.scaling}
              options={scalingOptions.map((value) => ({ value, label: value }))}
              onChange={(scaling) => setThemeState((previous) => ({ ...previous, scaling: scaling as Scaling }))}
            />
            <ThemeSelect
              label={copy.theme.panelBackground}
              value={themeState.panelBackground}
              options={[
                { value: 'solid', label: copy.theme.solid },
                { value: 'translucent', label: copy.theme.translucent },
              ]}
              onChange={(panelBackground) => setThemeState((previous) => ({ ...previous, panelBackground: panelBackground as PanelBackground }))}
            />
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<LandingPage {...marketingPageProps} />} />
        <Route path="/services" element={<ServicesPage {...marketingPageProps} />} />
        <Route path="/work" element={<WorkPage {...marketingPageProps} />} />
        <Route path="/work/shakescape" element={<HnsDaneBrowserPage {...marketingPageProps} />} />
        <Route path="/work/shakescape/privacy" element={<HnsDaneBrowserPrivacyPage {...marketingPageProps} />} />
        <Route path="/work/shakescape-extension" element={<HnsDaneBrowserExtensionPage {...marketingPageProps} />} />
        <Route
          path="/work/shakescape-extension/privacy"
          element={<HnsDaneBrowserExtensionPrivacyPage {...marketingPageProps} />}
        />
        <Route
          path="/work/shakescape-extension/legal"
          element={<HnsDaneBrowserExtensionLegalPage {...marketingPageProps} />}
        />
        <Route path="/shakescape" element={<Navigate to="/work/shakescape" replace />} />
        <Route path="/shakescape/privacy" element={<Navigate to="/work/shakescape/privacy" replace />} />
        <Route path="/shakescape-extension" element={<Navigate to="/work/shakescape-extension" replace />} />
        <Route path="/shakescape-extension/privacy" element={<Navigate to="/work/shakescape-extension/privacy" replace />} />
        <Route path="/shakescape-extension/legal" element={<Navigate to="/work/shakescape-extension/legal" replace />} />
        <Route path="/work/hns-browser" element={<Navigate to="/work/shakescape" replace />} />
        <Route path="/work/hns-browser/privacy" element={<Navigate to="/work/shakescape/privacy" replace />} />
        <Route path="/hns-browser" element={<Navigate to="/work/shakescape" replace />} />
        <Route path="/hns-browser/privacy" element={<Navigate to="/work/shakescape/privacy" replace />} />
        <Route path="/hns-dane-browser" element={<Navigate to="/work/shakescape" replace />} />
        <Route path="/hns-dane-browser/privacy" element={<Navigate to="/work/shakescape/privacy" replace />} />
        <Route path="/work/hns-dane-browser" element={<Navigate to="/work/shakescape" replace />} />
        <Route path="/work/hns-dane-browser/privacy" element={<Navigate to="/work/shakescape/privacy" replace />} />
        <Route path="/hns-dane-browser-extension" element={<Navigate to="/work/shakescape-extension" replace />} />
        <Route
          path="/hns-dane-browser-extension/privacy"
          element={<Navigate to="/work/shakescape-extension/privacy" replace />}
        />
        <Route
          path="/hns-dane-browser-extension/legal"
          element={<Navigate to="/work/shakescape-extension/legal" replace />}
        />
        <Route path="/work/hns-dane-browser-extension" element={<Navigate to="/work/shakescape-extension" replace />} />
        <Route path="/work/hns-dane-browser-extension/privacy" element={<Navigate to="/work/shakescape-extension/privacy" replace />} />
        <Route path="/work/hns-dane-browser-extension/legal" element={<Navigate to="/work/shakescape-extension/legal" replace />} />
        <Route path="/work/:slug" element={<WorkDetailPage {...marketingPageProps} />} />
        <Route path="/process" element={<ProcessPage {...marketingPageProps} />} />
        <Route path="/contact" element={<ContactPage {...marketingPageProps} />} />
        <Route path="/about" element={<AboutPage {...marketingPageProps} />} />
        <Route
          path="/admin"
          element={
            <AdminPage
              content={content}
              onSave={saveContent}
              onSaveTranslation={saveTranslation}
              onOpenThemePanel={openThemePanel}
              copy={copyByLanguage.en}
              copyByLanguage={copyByLanguage}
              translationError={copyError}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Theme>
  )
}

const ThemeSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}) => (
  <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.8rem' }}>
    <span>{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{
        border: '1px solid var(--gray-6)',
        borderRadius: 'var(--radius-2)',
        background: 'var(--color-surface)',
        color: 'var(--gray-12)',
        padding: '0.4rem 0.5rem',
      }}
    >
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </label>
)

export default App
