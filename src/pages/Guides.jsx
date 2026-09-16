import { useMemo, useState } from "react";
import { guides } from "../data.js";
import { useSpotlight, useReveal } from "../hooks.js";

const ALL_TAGS = [...new Set(guides.flatMap((g) => g.tags))];

function GuideCard({ guide, defaultOpen, index }) {
  const [open, setOpen] = useState(defaultOpen);
  const spotlight = useSpotlight();
  const [ref, visible] = useReveal();

  return (
    <article
      className={`panel spotlight reveal ${visible ? "is-visible" : ""}`}
      ref={ref}
      style={{ "--i": index }}
      {...spotlight}
    >
      <button className="entry-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <h3>{guide.title}</h3>
        <span className="chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <ul className="tags">
        {guide.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className={`accordion ${open ? "is-open" : ""}`}>
        <ul className="guide-body">
          {guide.body.map((line) => {
            const [lead, ...rest] = line.split(" ");
            return (
              <li key={line}>
                <span className="tip-lead">{lead}</span> {rest.join(" ")}
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

export default function Guides() {
  const [tag, setTag] = useState(null);
  const visible = useMemo(() => (tag ? guides.filter((g) => g.tags.includes(tag)) : guides), [tag]);

  return (
    <section className="section page-section" aria-labelledby="guides-h">
      <h2 id="guides-h">Guides</h2>
      <p className="page-intro">Short, practical notes on how I approach the stack day to day.</p>

      <div className="filter-row" role="group" aria-label="Filter guides by topic">
        <button className={`filter-pill ${!tag ? "is-active" : ""}`} onClick={() => setTag(null)}>
          All
        </button>
        {ALL_TAGS.map((t) => (
          <button key={t} className={`filter-pill ${tag === t ? "is-active" : ""}`} onClick={() => setTag(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="guide-list">
        {visible.map((g, i) => (
          <GuideCard key={g.title} guide={g} defaultOpen={i === 0} index={i} />
        ))}
      </div>
    </section>
  );
}
