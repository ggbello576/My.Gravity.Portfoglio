import { useState } from 'react'

const links = [
  ['About', '#about'],
  ['Work', '#work'],
  ['Services', '#services'],
  ['Contact', '#contact'],
]

export function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navigation">
      <a className="brand" href="#home">Lorenzo Amerighi</a>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen((value) => !value)}>
        <span>{open ? 'Close' : 'Menu'}</span>
      </button>
      <nav id="main-menu" aria-label="Primary navigation" className={open ? 'is-open' : ''}>
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  )
}
