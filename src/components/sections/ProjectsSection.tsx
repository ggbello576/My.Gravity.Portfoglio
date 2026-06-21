const projects = [
  ['01', 'MAXUREX', 'Brand experience'],
  ['02', 'SUMMER REELS', 'Digital product'],
  ['03', 'SELECTED WORK', 'Creative direction'],
]

export function ProjectsSection() {
  return (
    <section id="work" className="section projects-section" aria-labelledby="projects-title">
      <div className="projects-content">
        <div className="section-heading" data-reveal>
          <p className="section-index">02 / Selected work</p>
          <h2 id="projects-title">Objects in<br />orbit.</h2>
        </div>
        <div className="project-list">
          {projects.map(([number, title, category]) => (
            <article className="project-card" key={title}>
              <span>{number}</span><h3>{title}</h3><p>{category}</p><i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
