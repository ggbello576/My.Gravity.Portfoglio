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
        <a href="https://www.instagram.com/gabriele_gentileeee/" target="_blank" rel="noopener noreferrer" aria-label="Profilo Instagram ufficiale di Gabriele Gentile — si apre in una nuova scheda">Instagram <span aria-hidden="true">↗</span></a>
        <a href="https://www.linkedin.com/in/gabriele-gentile-16196239a/" target="_blank" rel="noopener noreferrer" aria-label="Profilo LinkedIn ufficiale di Gabriele Gentile — si apre in una nuova scheda">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/ggbello576" target="_blank" rel="noopener noreferrer" aria-label="Profilo GitHub ufficiale di Gabriele Gentile — si apre in una nuova scheda"><svg aria-hidden="true"><use href="/icons.svg#github-icon" /></svg>GitHub <span aria-hidden="true">↗</span></a>
        <a href="mailto:gabrigentile05@gmail.com" title="gabrigentile05@gmail.com" aria-label="Invia un’email a Gabriele Gentile">Email <span aria-hidden="true">↗</span></a>
      </nav>
    </footer>
  )
}
