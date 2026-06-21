import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

document.body.classList.add('is-loading')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
