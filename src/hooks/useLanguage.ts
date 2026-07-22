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

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const translation = translations[language]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = translation.meta.title
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', translation.meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }
  }, [language, translation.meta])

  return { language, setLanguage, translation }
}
