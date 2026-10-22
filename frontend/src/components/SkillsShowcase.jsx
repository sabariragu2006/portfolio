import { useState } from "react";

// Which technologies each project uses. Add Maadala and Baby Tech once you know their stack.
const PROJECT_TECH = {
  Adhigarachi: ["C#", "WPF", "SQLite", "React"],
  "KMV Grand Inn": ["C#", "WPF", "SQLite"],
  "Sairam Sweets": ["C#", "WPF", "QuestPDF", "SkiaSharp"],
  "RS Infotech": ["React", "Bootstrap", "Netlify"],
  // Maadala: [],
  // "Baby Tech": [],
};

const GROUPS = [
  {
    id: "desktop",
    title: "Desktop",
    skills: [
      { name: "C#", desc: "Application logic and data handling for desktop software." },
      { name: "WPF", desc: "Rich, data-bound Windows interfaces." },
      { name: "XAML", desc: "Declarative layouts and styling for WPF screens." },
      { name: "QuestPDF", desc: "Generating professional PDF documents such as invoices and reports." },
      { name: "SkiaSharp", desc: "2D graphics and rendering inside desktop apps." },
    ],
  },
  {
    id: "web",
    title: "Web",
    skills: [
      { name: "React", desc: "Component-based, responsive user interfaces." },
      { name: "JavaScript", desc: "Interactivity and application logic in the browser." },
      { name: "PHP", desc: "Dynamic, database-driven websites and admin panels." },
      { name: "Bootstrap", desc: "Responsive layouts and a consistent grid." },
      { name: "HTML & CSS", desc: "Semantic markup and custom styling." },
    ],
  },
  {
    id: "data",
    title: "Data & Tooling",
    skills: [
      { name: "SQLite", desc: "Embedded databases for desktop applications." },
      { name: "SQL", desc: "Schema design and queries for relational data." },
      { name: "Git", desc: "Version control for every project." },
      { name: "GitHub", desc: "Hosting code and publishing open-source work." },
      { name: "Vite", desc: "Fast development and builds for React projects." },
      { name: "Netlify", desc: "Deploying and hosting websites." },
    ],
  },
];

const ALL = GROUPS.flatMap((g) =>
  g.skills.map((s) => ({ ...s, group: g.title, groupId: g.id }))
);
const PROJECT_NAMES = Object.keys(PROJECT_TECH);
const usedIn = (name) => PROJECT_NAMES.filter((n) => PROJECT_TECH[n].includes(name));
const half = Math.ceil(ALL.length / 2);
const TICK_A = ALL.slice(0, half).map((s) => s.name);
const TICK_B = ALL.slice(half).map((s) => s.name);

const FILTERS = [{ id: "all", title: "All" }, ...GROUPS.map((g) => ({ id: g.id, title: g.title }))];
const countFor = (id) => (id === "all" ? ALL.length : ALL.filter((s) => s.groupId === id).length);

function Tile({ s, i }) {
  const used = usedIn(s.name);

  // Cursor-following spotlight
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="col-md-6 col-xl-4 sk-pop" style={{ "--d": `${i * 0.05}s` }}>
      <article className="sk-tile h-100" onMouseMove={onMove}>
        <div className="sk-tile-top">
          <span className="sk-group">{s.group}</span>
          <span
            className="sk-dots"
            role="img"
            aria-label={`Used in ${used.length} of ${PROJECT_NAMES.length} projects`}
          >
            {PROJECT_NAMES.map((n) => (
              <i key={n} className={used.includes(n) ? "on" : ""} title={n} />
            ))}
          </span>
        </div>
        <h3 className="sk-name">{s.name}</h3>
        <p className="sk-desc">{s.desc}</p>
        {used.length > 0 && (
          <ul className="sk-used" aria-label="Used in">
            {used.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}

function Ticker({ items, reverse }) {
  const loop = [...items, ...items]; // doubled for a seamless loop
  return (
    <div className="sk-ticker">
      <div className={`sk-ticker-track ${reverse ? "is-reverse" : ""}`}>
        {loop.map((t, i) => (
          <span className="sk-ticker-item" key={`${t}-${i}`} aria-hidden={i >= items.length}>
            <i aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsShowcase() {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? ALL : ALL.filter((s) => s.groupId === filter);

  return (
    <main id="skills" className="sk">
      <style>{`
        .sk {
          min-height: 100vh;
          padding: calc(var(--pf-nav-height, 68px) + 2.5rem) 0 5rem;
          background:
            radial-gradient(ellipse at 10% 0%, rgba(193, 18, 31, 0.1), transparent 55%),
            var(--pf-bg-alt, #0a0808);
        }
        .sk-rise {
          opacity: 0; transform: translateY(20px);
          animation: sk-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
          animation-delay: var(--d, 0s);
        }
        @keyframes sk-rise { to { opacity: 1; transform: none; } }

        .sk-back {
          display: inline-block; margin-bottom: 1.8rem; color: var(--pf-text);
          font-size: 0.85rem; letter-spacing: 0.06em; text-decoration: none;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .sk-back:hover { color: var(--pf-accent); transform: translateX(-3px); }
        .sk-eyebrow {
          color: var(--pf-text); opacity: 0.8; font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.22em; margin-bottom: 0.7rem;
        }
        .sk-eyebrow b { color: var(--pf-accent); }
        .sk-title {
          font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -0.015em;
          color: var(--pf-text-strong); margin: 0 0 0.8rem;
        }
        .sk-lead { max-width: 38rem; line-height: 1.8; opacity: 0.85; margin: 0; }

        /* Summary stats */
        .sk-stats {
          display: flex; flex-wrap: wrap; gap: 2.4rem; margin-top: 2.2rem;
          padding-top: 1.5rem; border-top: 1px solid var(--pf-border); max-width: 38rem;
        }
        .sk-stats strong { display: block; font-size: 1.6rem; font-weight: 700; color: var(--pf-text-strong); }
        .sk-stats span { font-size: 0.78rem; letter-spacing: 0.04em; opacity: 0.65; }

        /* Filters */
        .sk-filters { display: flex; flex-wrap: wrap; gap: 0.6rem; margin: 2.4rem 0; }
        .sk-filter {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1rem; border-radius: 999px; cursor: pointer;
          font: inherit; font-size: 0.85rem; font-weight: 500;
          color: var(--pf-text); background: transparent; border: 1px solid var(--pf-border);
          transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .sk-filter span { font-size: 0.72rem; opacity: 0.6; }
        .sk-filter:hover { border-color: rgba(212, 175, 55, 0.5); color: var(--pf-text-strong); }
        .sk-filter.is-on { background: var(--pf-accent); border-color: var(--pf-accent); color: #0a0707; }

        /* Tiles */
        .sk-pop {
          opacity: 0; transform: translateY(18px) scale(0.98);
          animation: sk-pop 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
          animation-delay: var(--d, 0s);
        }
        @keyframes sk-pop { to { opacity: 1; transform: none; } }

        .sk-tile {
          position: relative; overflow: hidden; display: flex; flex-direction: column;
          padding: 1.5rem; border-radius: 14px;
          background: rgba(255, 255, 255, 0.022); border: 1px solid var(--pf-border);
          transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
        }
        .sk-tile::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--pf-red), var(--pf-accent));
          transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
        }
        .sk-tile::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0;
          background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(212, 175, 55, 0.12), transparent 70%);
          transition: opacity 0.35s ease;
        }
        .sk-tile:hover { transform: translateY(-4px); border-color: rgba(212, 175, 55, 0.4); }
        .sk-tile:hover::before { transform: scaleX(1); }
        .sk-tile:hover::after { opacity: 1; }

        .sk-tile-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.9rem; }
        .sk-group { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--pf-accent); }
        .sk-dots { display: inline-flex; gap: 4px; }
        .sk-dots i { width: 7px; height: 7px; border-radius: 50%; background: rgba(255, 255, 255, 0.12); }
        .sk-dots i.on { background: var(--pf-red); box-shadow: 0 0 6px rgba(193, 18, 31, 0.6); }
        .sk-name { font-size: 1.25rem; font-weight: 700; color: var(--pf-text-strong); margin: 0 0 0.45rem; }
        .sk-desc { margin: 0; font-size: 0.92rem; line-height: 1.65; opacity: 0.78; }
        .sk-used { list-style: none; display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0; margin: 1.1rem 0 0; position: relative; z-index: 1; }
        .sk-used li {
          font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 999px;
          border: 1px solid var(--pf-border); color: var(--pf-text);
        }

        /* Ticker */
        .sk-ticker-wrap {
          margin-top: 4rem; display: grid; gap: 0.9rem;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .sk-ticker { overflow: hidden; }
        .sk-ticker-track { display: flex; width: max-content; gap: 0.9rem; animation: sk-marquee 34s linear infinite; }
        .sk-ticker-track.is-reverse { animation-direction: reverse; animation-duration: 40s; }
        .sk-ticker-wrap:hover .sk-ticker-track { animation-play-state: paused; }
        @keyframes sk-marquee { to { transform: translateX(calc(-50% - 0.45rem)); } }
        .sk-ticker-item {
          display: inline-flex; align-items: center; gap: 0.6rem; white-space: nowrap;
          padding: 0.65rem 1.3rem; border-radius: 10px; font-size: 0.9rem; font-weight: 500;
          color: var(--pf-text-strong); border: 1px solid var(--pf-border); background: rgba(255, 255, 255, 0.025);
          transition: border-color 0.25s ease, color 0.25s ease;
        }
        .sk-ticker-item i { width: 6px; height: 6px; border-radius: 50%; background: var(--pf-red); }
        .sk-ticker-item:hover { border-color: var(--pf-accent); color: var(--pf-accent); }

        /* CTA */
        .sk-cta {
          margin-top: 3.5rem; padding: 1.8rem 2rem; border-radius: 14px;
          display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;
          border: 1px solid var(--pf-border);
          background: linear-gradient(90deg, rgba(193, 18, 31, 0.1), rgba(212, 175, 55, 0.06));
        }
        .sk-cta h3 { font-size: 1.1rem; font-weight: 700; color: var(--pf-text-strong); margin: 0 0 0.2rem; }
        .sk-cta p { margin: 0; opacity: 0.75; }
        .sk-btn {
          display: inline-block; padding: 0.65rem 1.3rem; border-radius: 8px;
          font-size: 0.88rem; font-weight: 600; text-decoration: none;
          background: var(--pf-accent); color: #0a0707;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }
        .sk-btn:hover { transform: translateY(-2px); background: #e6c14e; color: #0a0707; }

        .sk-back:focus-visible, .sk-filter:focus-visible, .sk-btn:focus-visible {
          outline: 2px solid var(--pf-accent); outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sk-rise, .sk-pop { animation: none; opacity: 1; transform: none; }
          .sk-tile, .sk-tile::before, .sk-tile::after, .sk-filter, .sk-btn, .sk-back { transition: none; }
          .sk-ticker-wrap { -webkit-mask-image: none; mask-image: none; }
          .sk-ticker { overflow: visible; }
          .sk-ticker-track { animation: none; flex-wrap: wrap; width: auto; }
          .sk-ticker-item[aria-hidden="true"] { display: none; }
        }
      `}</style>

      <div className="container">
        <a href="#home" className="sk-back sk-rise">← Back to home</a>

        <header className="sk-rise" style={{ "--d": "0.08s" }}>
          <p className="sk-eyebrow"><b>03</b> / SKILLS</p>
          <h1 className="sk-title">Tools I work with</h1>
          <p className="sk-lead">
            The languages, frameworks and tools behind my desktop and web work.
            The dots on each tile show how many of my projects use it.
          </p>
          <div className="sk-stats">
            <div><strong>{ALL.length}</strong><span>Technologies</span></div>
            <div><strong>{GROUPS.length}</strong><span>Focus areas</span></div>
            <div><strong>{PROJECT_NAMES.length}</strong><span>Projects counted</span></div>
          </div>
        </header>

        <div className="sk-filters sk-rise" style={{ "--d": "0.18s" }} role="group" aria-label="Filter skills">
          {FILTERS.map((f) => (
            <button
              type="button"
              key={f.id}
              className={`sk-filter ${filter === f.id ? "is-on" : ""}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.title}
              <span>{countFor(f.id)}</span>
            </button>
          ))}
        </div>

        {/* key re-mounts the grid so the entrance animation replays on each filter */}
        <div className="row g-4" key={filter}>
          {list.map((s, i) => (
            <Tile s={s} i={i} key={s.name} />
          ))}
        </div>

        <div className="sk-ticker-wrap sk-rise" style={{ "--d": "0.3s" }}>
          <Ticker items={TICK_A} />
          <Ticker items={TICK_B} reverse />
        </div>

        <div className="sk-cta sk-rise" style={{ "--d": "0.35s" }}>
          <div>
            <h3>Need these skills on your project?</h3>
            <p>Let's talk about what you'd like to build.</p>
          </div>
          <a href="#contact" className="sk-btn">Get in touch</a>
        </div>
      </div>
    </main>
  );
}