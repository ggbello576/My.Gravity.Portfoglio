const services = ['Creative Direction', 'Web Experience', 'Brand Identity', 'Digital Products']

export function ServicesSection() {
  return (
    <section id="services" className="section services-section" aria-labelledby="services-title">
      <div className="services-content">
        <div data-reveal>
          <p className="section-index">03 / Capabilities</p>
          <h2 id="services-title">What I bring<br />into focus.</h2>
        </div>
        <ol className="service-list">
          {services.map((service, index) => <li className="service-row" key={service}><span>{String(index + 1).padStart(2, '0')}</span><h3>{service}</h3></li>)}
        </ol>
      </div>
    </section>
  )
}
