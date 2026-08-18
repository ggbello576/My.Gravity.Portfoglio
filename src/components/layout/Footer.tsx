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
            <a href="https://sketchfab.com/3d-models/blackhole-74cbeaeae2174a218fe9455d77902b5c" target="_blank" rel="noopener noreferrer">{translation.model}</a>{' '}
            {translation.by} <a href="https://sketchfab.com/rubykamen" target="_blank" rel="noopener noreferrer">rubykamen</a> {translation.via}{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">{translation.license}</a>.
          </p>
        </details>
      </div>
      <nav className="footer-socials" aria-label={translation.socialLabel}>
        <a href="https://www.instagram.com/gabriele_gentileeee/" target="_blank" rel="noopener noreferrer" aria-label={translation.instagramLabel}>Instagram <span aria-hidden="true">↗</span></a>
        <a href="/curriculum-gabriele-gentile.pdf" target="_blank" rel="noopener noreferrer" aria-label={translation.curriculumLabel}>CURRICULUM <span aria-hidden="true">↗</span></a>
        <a href="https://www.linkedin.com/in/gabriele-gentile-16196239a/" target="_blank" rel="noopener noreferrer" aria-label={translation.linkedinLabel}>LinkedIn <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/ggbello576" target="_blank" rel="noopener noreferrer" aria-label={translation.githubLabel}><svg aria-hidden="true"><use href="/icons.svg#github-icon" /></svg>GitHub <span aria-hidden="true">↗</span></a>
        <a href="mailto:gabrigentile05@gmail.com" title="gabrigentile05@gmail.com" aria-label={translation.emailLabel}>Email <span aria-hidden="true">↗</span></a>
      </nav>
    </footer>
  )
}
