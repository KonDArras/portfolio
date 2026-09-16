import { projects } from "../data.js";
import { useSpotlight, useReveal } from "../hooks.js";

function ProjectCard({ project, index }) {
  const spotlight = useSpotlight();
  const [ref, visible] = useReveal();
  return (
    <article className={`panel spotlight reveal ${visible ? "is-visible" : ""}`} ref={ref} style={{ "--i": index }} {...spotlight}>
      <div className="project-head">
        <h3>{project.name}</h3>
        <span className="dates">{project.period}</span>
      </div>
      <p className="project-summary">{project.summary}</p>
      <ul className="tags">
        {project.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {project.note && <p className="project-note">{project.note}</p>}
    </article>
  );
}

function Empty() {
  return (
    <div className="empty-state">
      <div className="node" aria-hidden="true" />
      <p>Nothing deployed to this page yet.</p>
      <p className="empty-sub">Projects land here as they're written up — check back soon.</p>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section page-section" aria-labelledby="projects-h">
      <h2 id="projects-h">Projects</h2>
      <p className="page-intro">A few things I've built or shipped. Ask for the details behind any of these.</p>
      {projects.length ? (
        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </section>
  );
}
