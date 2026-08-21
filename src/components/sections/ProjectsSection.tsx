import type { Translation } from '../../content/translations'

type Props = { translation: Translation['work'] }

export function ProjectsSection({ translation }: Props) {
  return (
    <section id="work" className="section projects-section" aria-labelledby="projects-title">
      <div className="projects-content">
        <div className="section-heading" data-reveal>
          <p className="section-index">{translation.label}</p>
          <h2 id="projects-title">{translation.title}</h2>
        </div>
        <div className="project-list">
          {translation.projects.map((project) => {
            const content = (
              <>
                <span className="project-number">{project.number}</span>
                <div className="project-details">
                  <h3>{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                  <p className="project-description">{project.description}</p>
                  {project.status && <p className="project-status">{project.status}</p>}
                </div>
                <i aria-hidden="true">↗</i>
              </>
            )

            return project.url ? (
              <article key={project.number}>
                <a
                  className="project-card project-card-featured project-card-link"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={project.linkLabel}
                >
                  {content}
                </a>
              </article>
            ) : (
              <article key={project.number} className="project-card project-card-featured">
                {content}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
