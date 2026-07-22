import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

if (window.location.hash) {
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
}

const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
resetScroll()
window.addEventListener('pageshow', resetScroll, { once: true })

document.body.classList.add('is-loading')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
