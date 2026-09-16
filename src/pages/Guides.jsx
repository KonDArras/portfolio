import { useMemo, useState } from "react";
import { guides } from "../data.js";
import { useSpotlight, useReveal } from "../hooks.js";

const ALL_TAGS = [...new Set(guides.flatMap((g) => g.tags))];

function GuideCard({ guide, index }) {
  const spotlight = useSpotlight();
  const [ref, visible] = useReveal();

  return (
    <article
      className={`panel spotlight reveal ${visible ? "is-visible" : ""}`}
      ref={ref}
      style={{ "--i": index }}
      {...spotlight}
    >
      <h3>{guide.title}</h3>
      <ul className="tags">
        {guide.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
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
          <GuideCard key={g.title} guide={g} index={i} />
        ))}
      </div>
    </section>
  );
}
