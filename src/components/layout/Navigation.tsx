import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { Language, Translation } from '../../content/translations'

type Props = {
  language: Language
  onLanguageChange: (language: Language) => void
  onNavigate: (hash: string) => void
  translation: Translation['nav']
}

export function Navigation({ language, onLanguageChange, onNavigate, translation }: Props) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLElement>(null)
  const links = [
    [translation.about, '#about'],
    [translation.work, '#work'],
    [translation.services, '#services'],
    [translation.contact, '#contact'],
  ]

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setOpen(false)
    window.requestAnimationFrame(() => onNavigate(href))
  }

  const languageSwitcher = (
    <div className="language-switcher" role="group" aria-label={translation.language}>
      <button type="button" className={language === 'en' ? 'is-active' : ''} aria-pressed={language === 'en'} onClick={() => onLanguageChange('en')}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" className={language === 'it' ? 'is-active' : ''} aria-pressed={language === 'it'} onClick={() => onLanguageChange('it')}>IT</button>
    </div>
  )

  useEffect(() => {
    if (!open) return
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusable = () => [
      menuButton.current,
      ...Array.from(menu.current?.querySelectorAll<HTMLElement>('a, button:not([disabled])') ?? []),
    ].filter((element): element is HTMLElement => Boolean(element))
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const elements = focusable()
      if (elements.length === 0) return
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [open])

  return (
    <header className="navigation">
      <a className="brand" href="#home" onClick={(event) => handleNavigation(event, '#home')}>Gabriele Gentile</a>
      <button ref={menuButton} className="menu-button" type="button" aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen((value) => !value)}>
        <span>{open ? translation.close : translation.menu}</span>
      </button>
      <div className="nav-actions">
        <nav ref={menu} id="main-menu" aria-label="Primary navigation" className={open ? 'is-open' : ''}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={(event) => handleNavigation(event, href)}>{label}</a>)}
          <div className="mobile-language">{languageSwitcher}</div>
        </nav>
        <div className="desktop-language">{languageSwitcher}</div>
      </div>
    </header>
  )
}
