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
          <article className="project-card project-card-featured">
            <span className="project-number">01</span>
            <div className="project-details">
              <h3>DANIELA FLOWER DESIGNER</h3>
              <p className="project-category">{translation.danielaSubtitle}</p>
              <p className="project-description">{translation.danielaDescription}</p>
              <p className="project-status">{translation.status}</p>
            </div>
            <i aria-hidden="true">↗</i>
          </article>
          <article className="project-card project-card-featured">
            <span className="project-number">02</span>
            <div className="project-details">
              <h3>WE CLUBS</h3>
              <p className="project-category">{translation.weClubsSubtitle}</p>
              <p className="project-description">{translation.weClubsDescription}</p>
              <p className="project-status">{translation.status}</p>
            </div>
            <i aria-hidden="true">↗</i>
          </article>
          <article className="project-card project-card-confidential">
            <span className="project-number">03</span>
            <div className="project-details">
              <h3>Top Secret</h3>
              <p className="project-category">{translation.confidentialTwo}</p>
              <p className="project-status">{translation.status}</p>
            </div>
            <span className="redacted" aria-hidden="true" />
          </article>
        </div>
      </div>
    </section>
  )
}
