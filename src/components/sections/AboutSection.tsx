import type { Translation } from '../../content/translations'

type Props = { translation: Translation['about'] }

export function AboutSection({ translation }: Props) {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="section-content align-left" data-reveal>
        <p className="section-index">{translation.label}</p>
        <h2 id="about-title">{translation.title}</h2>
        <p className="body-copy">{translation.body}</p>
      </div>
    </section>
  )
}
