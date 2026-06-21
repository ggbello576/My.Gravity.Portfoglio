import type { Translation } from '../../content/translations'

type Props = { translation: Translation['hero'] }

export function HeroSection({ translation }: Props) {
  return (
    <section id="home" className="section hero-section" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">{translation.eyebrow}</p>
        <h1 id="hero-title">{translation.title}</h1>
        <p className="hero-copy">{translation.copy}</p>
      </div>
      <div className="scroll-cue"><span>{translation.scroll}</span><i /></div>
    </section>
  )
}
