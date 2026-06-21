import type { Translation } from '../../content/translations'

type Props = { translation: Translation['services'] }

export function ServicesSection({ translation }: Props) {
  return (
    <section id="services" className="section services-section" aria-labelledby="services-title">
      <div className="services-content">
        <div data-reveal>
          <p className="section-index">{translation.label}</p>
          <h2 id="services-title">{translation.title}</h2>
        </div>
        <ol className="service-list">
          {translation.items.map((service, index) => <li className="service-row" key={service}><span>{String(index + 1).padStart(2, '0')}</span><h3>{service}</h3></li>)}
        </ol>
      </div>
    </section>
  )
}
