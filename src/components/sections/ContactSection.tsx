import type { Translation } from '../../content/translations'

type Props = { translation: Translation['contact'] }

export function ContactSection({ translation }: Props) {
  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-content" data-reveal>
        <p className="eyebrow">{translation.label}</p>
        <h2 id="contact-title">{translation.title}</h2>
        <p>{translation.copy}</p>
        <a className="contact-button" href="mailto:gabrigentile05@gmail.com"><span>{translation.button}</span><i aria-hidden="true">↗</i></a>
      </div>
    </section>
  )
}
