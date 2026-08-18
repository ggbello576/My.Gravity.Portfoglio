import { useEffect, useState } from 'react'
import { translations, type Language } from '../content/translations'

const STORAGE_KEY = 'gabriele-gentile-language-v2'

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' || saved === 'it' ? saved : 'en'
  } catch {
    return 'en'
  }
}

function setMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const translation = translations[language]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = translation.meta.title
    setMetaContent('meta[name="description"]', translation.meta.description)
    setMetaContent('meta[property="og:locale"]', translation.meta.locale)
    setMetaContent('meta[property="og:locale:alternate"]', translation.meta.alternateLocale)
    setMetaContent('meta[property="og:title"]', translation.meta.title)
    setMetaContent('meta[property="og:description"]', translation.meta.description)
    setMetaContent('meta[property="og:image:alt"]', translation.meta.imageAlt)
    setMetaContent('meta[name="twitter:title"]', translation.meta.title)
    setMetaContent('meta[name="twitter:description"]', translation.meta.description)
    setMetaContent('meta[name="twitter:image:alt"]', translation.meta.imageAlt)
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }
  }, [language, translation.meta])

  return { language, setLanguage, translation }
}
