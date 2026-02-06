import type { Language, UiCopy } from '../i18n/uiCopy'
import type { SiteContent } from '../types'

export interface MarketingPageProps {
  content: SiteContent
  loading: boolean
  error: string | null
  onOpenThemePanel: () => void
  language: Language
  onToggleLanguage: () => void
  copy: UiCopy
}
