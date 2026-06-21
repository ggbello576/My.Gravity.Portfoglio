import { useEffect, useState } from 'react'
import type { Language, Translation } from '../../content/translations'

type Props = {
  language: Language
  onLanguageChange: (language: Language) => void
  translation: Translation['nav']
}

export function Navigation({ language, onLanguageChange, translation }: Props) {
  const [open, setOpen] = useState(false)
  const links = [
    [translation.about, '#about'],
    [translation.work, '#work'],
    [translation.services, '#services'],
    [translation.contact, '#contact'],
  ]

  const languageSwitcher = (
    <div className="language-switcher" role="group" aria-label={translation.language}>
      <button type="button" className={language === 'it' ? 'is-active' : ''} aria-pressed={language === 'it'} onClick={() => onLanguageChange('it')}>IT</button>
      <span aria-hidden="true">/</span>
      <button type="button" className={language === 'en' ? 'is-active' : ''} aria-pressed={language === 'en'} onClick={() => onLanguageChange('en')}>EN</button>
    </div>
  )

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <header className="navigation">
      <a className="brand" href="#home">Gabriele Gentile</a>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen((value) => !value)}>
        <span>{open ? translation.close : translation.menu}</span>
      </button>
      <div className="nav-actions">
        <nav id="main-menu" aria-label="Primary navigation" className={open ? 'is-open' : ''}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <div className="mobile-language">{languageSwitcher}</div>
        </nav>
        <div className="desktop-language">{languageSwitcher}</div>
      </div>
    </header>
  )
}
