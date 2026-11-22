import { useEffect, useId, useState, type ReactNode } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project, Translation } from '../../content/translations'

type Props = { translation: Translation['work'] }

function projectAccent(project: Project) {
  if (project.number === '01') return ' project-card-capri'
  if (project.number === '02') return ' project-card-salon'
  return ''
}

function ProjectContent({ project, icon }: { project: Project; icon: ReactNode }) {
  return (
    <>
      <span className="project-number">{project.number}</span>
      <div className="project-details">
        <h3>{project.title}</h3>
        <p className="project-category">{project.category}</p>
        <p className="project-description">{project.description}</p>
        {project.status && <p className="project-status">{project.status}</p>}
      </div>
      <i aria-hidden="true">{icon}</i>
    </>
  )
}

function WebsiteProjectCard({ project, isOpen }: { project: Project; isOpen: boolean }) {
  const content = <ProjectContent project={project} icon={project.url ? '↗' : '—'} />

  if (!project.url) {
    return <article className="project-card project-card-child project-card-confidential">{content}</article>
  }

  return (
    <a
      className="project-card project-card-child project-card-link"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={project.linkLabel}
      tabIndex={isOpen ? 0 : -1}
    >
      {content}
    </a>
  )
}

export function ProjectsSection({ translation }: Props) {
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const folderPanelId = useId()

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [isFolderOpen])

  return (
    <section id="work" className="section projects-section" aria-labelledby="projects-title">
      <div className="projects-content">
        <div className="section-heading" data-reveal>
          <p className="section-index">{translation.label}</p>
          <h2 id="projects-title">{translation.title}</h2>
        </div>
        <div className="project-list">
          {translation.projects.map((project) => {
            const accentClass = projectAccent(project)

            if (project.children) {
              return (
                <article key={project.number} className={`project-folder${isFolderOpen ? ' is-open' : ''}`}>
                  <button
                    className={`project-card project-card-featured project-folder-toggle${accentClass}`}
                    type="button"
                    aria-expanded={isFolderOpen}
                    aria-controls={folderPanelId}
                    onClick={() => setIsFolderOpen((open) => !open)}
                  >
                    <ProjectContent project={project} icon={<span className="folder-chevron">⌄</span>} />
                    <span className="folder-cue" aria-hidden="true">
                      {isFolderOpen ? translation.folderClose : translation.folderOpen}
                    </span>
                  </button>
                  <div
                    className="project-folder-panel"
                    id={folderPanelId}
                    role="region"
                    aria-label={project.title}
                    aria-hidden={!isFolderOpen}
                  >
                    <div className="project-folder-contents">
                      {project.children.map((child) => (
                        <WebsiteProjectCard key={child.number} project={child} isOpen={isFolderOpen} />
                      ))}
                    </div>
                  </div>
                </article>
              )
            }

            const content = <ProjectContent project={project} icon="↗" />

            return project.url ? (
              <article key={project.number}>
                <a
                  className={`project-card project-card-featured project-card-link${accentClass}`}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={project.linkLabel}
                >
                  {content}
                </a>
              </article>
            ) : (
              <article key={project.number} className={`project-card project-card-featured${accentClass}`}>
                {content}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
