export function ContactSection() {
  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-content" data-reveal>
        <p className="eyebrow">04 / Contact</p>
        <h2 id="contact-title">Let’s create something<br />with gravity.</h2>
        <p>Have a project in mind, or simply want to start a conversation?</p>
        <a className="contact-button" href="mailto:hello@lorenzoamerighi.com"><span>Start a project</span><i aria-hidden="true">↗</i></a>
        <div className="contact-links">
          <a href="mailto:hello@lorenzoamerighi.com">hello@lorenzoamerighi.com</a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
      </div>
    </section>
  )
}
