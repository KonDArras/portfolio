import { roles, stats, stack, experience, terminalScript, hobbies } from "../data.js";
import { useTypewriter, useReveal, useScrollSpy, useCountUp, useSpotlight, useSequentialTyping } from "../hooks.js";
import Portrait from "../components/Portrait.jsx";
import Terminal from "../components/Terminal.jsx";
import { IconMountain, IconStopwatch, IconDice, IconMug } from "../components/icons.jsx";

const HOBBY_ICONS = { mountain: IconMountain, stopwatch: IconStopwatch, dice: IconDice, mug: IconMug };

const SECTIONS = [
  { id: "top", label: "Start" },
  { id: "practice", label: "In practice" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Pipeline" },
  { id: "about", label: "Background" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

function RailNav({ active }) {
  return (
    <nav className="railnav" aria-label="Section navigation">
      <ol>
        {SECTIONS.map((s) => (
          <li key={s.id} className={active === s.id ? "is-active" : ""}>
            <a href={`#${s.id}`}>
              <span className="rail-dot" aria-hidden="true" />
              <span className="rail-label">{s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Stat({ value, suffix, label }) {
  const [ref, visible] = useReveal();
  const count = useCountUp(value, visible);
  return (
    <div className={`stat ${visible ? "is-visible" : ""}`} ref={ref}>
      <span className="stat-value">
        {count}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function Hero() {
  const role = useTypewriter(roles);
  return (
    <header className="hero" id="top">
      <div className="hero-top enter" style={{ "--i": 0 }}>
        <div className="hero-copy">
          <p className="kicker">Based in Artemida, Greece</p>
          <h1>Christos Karagiannis</h1>
          <p className="role">
            <span className="type-text">{role}</span>
            <span className="caret" aria-hidden="true" />
          </p>
        </div>
        <Portrait />
      </div>

      <p className="summary enter" style={{ "--i": 1 }}>
        I design and ship cloud infrastructure for financial services and EU-funded projects — serverless AWS
        architectures, CI/CD pipelines, and infrastructure as code — backed by a background in threat intelligence
        and incident response.
      </p>

      <ul className="status enter" style={{ "--i": 2 }}>
        {experience
          .filter((e) => e.live)
          .map((e) => (
            <li key={e.company}>
              <span className="dot dot-live" aria-hidden="true" />
              {e.linkedin ? (
                <a href={e.linkedin} target="_blank" rel="noopener">
                  {e.company}
                </a>
              ) : (
                e.company
              )}{" "}
              — {e.role} <span className="since">since {e.dates.split(" — ")[0]}</span>
            </li>
          ))}
      </ul>

      <div className="links enter" style={{ "--i": 3 }}>
        <a href="https://www.linkedin.com/in/chris-karagiannis/" target="_blank" rel="noopener">
          LinkedIn
        </a>
        <a href="mailto:christos.s.karagiannis@gmail.com">Email</a>
        <a className="cv-download" href={`${import.meta.env.BASE_URL}christos-karagiannis-cv.pdf`} download>
          Download CV
        </a>
      </div>

      <div className="stats enter" style={{ "--i": 4 }}>
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </header>
  );
}

function InPractice() {
  const [ref, visible] = useReveal();
  return (
    <section className="section" id="practice" aria-labelledby="practice-h">
      <h2 id="practice-h">In practice</h2>
      <p className="page-intro">What actually happens between a merge and a deploy.</p>
      <div className={`reveal ${visible ? "is-visible" : ""}`} ref={ref}>
        <Terminal script={terminalScript} />
      </div>
    </section>
  );
}

const LEVEL_LOAD = {
  expert: 96,
  advanced: 84,
  "certified associate": 90,
  certified: 100,
  intermediate: 62,
  "cert pending": 45,
};

function SkillRow({ item, index }) {
  const load = LEVEL_LOAD[item.level] ?? null;
  return (
    <li className="skill-row" style={{ "--row": index }}>
      <div className="skill-row-head">
        <span className="skill-name">{item.name}</span>
        {item.level && <span className="lvl">{item.level}</span>}
      </div>
      {load !== null ? (
        <div className="meter" role="img" aria-label={`${item.name}: ${item.level}`}>
          <div className="meter-fill" style={{ "--load": `${load}%` }} />
        </div>
      ) : (
        <div className="meter meter-idle" aria-hidden="true" />
      )}
    </li>
  );
}

function StackPanel({ group, index }) {
  const spotlight = useSpotlight();
  const [ref, visible] = useReveal();
  return (
    <div
      className={`panel spotlight reveal monitor-card ${visible ? "is-visible" : ""}`}
      ref={ref}
      style={{ "--i": index }}
      {...spotlight}
    >
      <div className="monitor-card-head">
        <h3>{group.name}</h3>
        <span className="monitor-status">
          <span className="dot dot-live" aria-hidden="true" /> up
        </span>
      </div>
      <ul className="skills">
        {group.items.map((item, i) => (
          <SkillRow key={item.name} item={item} index={i} />
        ))}
      </ul>
    </div>
  );
}

function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-h">
      <h2 id="stack-h">Stack</h2>
      <p className="page-intro monitor-summary">
        <span className="dot dot-live" aria-hidden="true" /> All systems operational — {stack.length} services
        monitored
      </p>
      <div className="panels">
        {stack.map((group, i) => (
          <StackPanel key={group.name} group={group} index={i} />
        ))}
      </div>
    </section>
  );
}

// experience is newest-first; the typing sequence runs oldest-first, so
// stage 0 here is the oldest role.
const PIPELINE_STAGES_OLDEST_FIRST = [...experience].reverse().map((e) => e.role);

function PipelineRecord({ entry }) {
  return (
    <div className="pipeline-record">
      <div className="terminal-cmd">
        <span className="terminal-prompt">$</span> {entry.role} —{" "}
        {entry.linkedin ? (
          <a href={entry.linkedin} target="_blank" rel="noopener">
            {entry.company}
          </a>
        ) : (
          entry.company
        )}
      </div>
      <div className="pipeline-meta">
        {entry.dates}
        {entry.place ? ` · ${entry.place}` : ""}
      </div>
      {entry.bullets.map((b) => (
        <div className="pipeline-bullet" key={b}>
          {b}
        </div>
      ))}
    </div>
  );
}

// An "upside-down" terminal: each new line types in at the top, and
// everything already written is pushed further down — the opposite of a
// normal shell, where new output appends at the bottom.
function PipelineTerminal() {
  const [ref, visible] = useReveal();
  const { shownCount, typing } = useSequentialTyping(PIPELINE_STAGES_OLDEST_FIRST, visible);
  const last = experience.length - 1;
  const isTyping = shownCount < experience.length;
  const landed = experience.filter((_, i) => last - i < shownCount);

  return (
    <div className="terminal pipeline-terminal" ref={ref}>
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-r" />
        <span className="terminal-dot terminal-dot-y" />
        <span className="terminal-dot terminal-dot-g" />
        <span className="terminal-title">christos@career ~ history.log</span>
      </div>
      <div className="terminal-body">
        {isTyping && (
          <div className="terminal-cmd">
            <span className="terminal-prompt">$</span> {typing}
            <span className="terminal-caret" />
          </div>
        )}
        {landed.map((entry) => (
          <PipelineRecord key={entry.company} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function Pipeline() {
  return (
    <section className="section" id="experience" aria-labelledby="exp-h">
      <h2 id="exp-h">Pipeline</h2>
      <p className="page-intro">Runs oldest to newest — the top line is where things stand today.</p>
      <PipelineTerminal />
    </section>
  );
}

function HobbyChip({ hobby, index }) {
  const spotlight = useSpotlight();
  const Icon = HOBBY_ICONS[hobby.icon];
  return (
    <li className="hobby-chip spotlight" style={{ "--i": index }} {...spotlight}>
      <Icon />
      {hobby.name}
    </li>
  );
}

function About() {
  const eduSpotlight = useSpotlight();
  const workSpotlight = useSpotlight();
  const [ref, visible] = useReveal();
  return (
    <section className="section" id="about" aria-labelledby="about-h">
      <h2 id="about-h">Background</h2>
      <div className={`about-grid reveal ${visible ? "is-visible" : ""}`} ref={ref}>
        <div className="panel spotlight" {...eduSpotlight}>
          <span className="about-tag">Education</span>
          <h3>MSc Computer Engineering</h3>
          <p className="place">University of Patras, Greece</p>
        </div>
        <div className="panel spotlight" {...workSpotlight}>
          <span className="about-tag">Before this</span>
          <h3>E-commerce &amp; sales</h3>
          <p className="place">Operations, online sales, and technical support (2017–2020)</p>
        </div>
      </div>
      <ul className="hobbies">
        {hobbies.map((h, i) => (
          <HobbyChip key={h.name} hobby={h} index={i} />
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  const active = useScrollSpy(SECTION_IDS);

  return (
    <>
      <RailNav active={active} />
      <Hero />
      <main>
        <InPractice />
        <Stack />
        <Pipeline />
        <About />
      </main>
    </>
  );
}
