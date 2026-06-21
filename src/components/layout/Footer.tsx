import type { Translation } from '../../content/translations'

type Props = { translation: Translation['footer'] }

export function Footer({ translation }: Props) {
  return (
    <footer className="footer">
      <div className="footer-meta">
        <p>© {new Date().getFullYear()} {translation.copyright}</p>
        <details className="model-credit">
          <summary>{translation.credits}</summary>
          <p>
            <a href="https://sketchfab.com/3d-models/blackhole-74cbeaeae2174a218fe9455d77902b5c" target="_blank" rel="noreferrer">{translation.model}</a>{' '}
            {translation.by} <a href="https://sketchfab.com/rubykamen" target="_blank" rel="noreferrer">rubykamen</a> {translation.via}{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">{translation.license}</a>.
          </p>
        </details>
      </div>
      <nav className="footer-socials" aria-label={translation.socialLabel}>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram — apre il sito di Instagram">Instagram <span aria-hidden="true">↗</span></a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn — apre il sito di LinkedIn">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href="mailto:gabrigentile05@gmail.com" title="gabrigentile05@gmail.com">Email <span aria-hidden="true">↗</span></a>
      </nav>
    </footer>
  )
}
