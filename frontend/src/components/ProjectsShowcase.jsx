import { useState, useEffect, useRef } from "react";
import { PROJECTS } from "./projectsData";
import IndividualProjectPage from "./IndividualProjectPage";

const GITHUB = "https://github.com/sabariragu2006";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "desktop", label: "Desktop" },
  { id: "github", label: "GitHub" },
];

const KIND_LABEL = { live: "Live site", desktop: "Desktop app", github: "Open source" };

/* Cover shown at the top of each card:
   screenshot -> live preview -> monogram */
function Cover({ p }) {
  const host = p.link ? p.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : p.title;
  let body;

  if (p.images.length > 0) {
    body = <img className="pj-cover-img" src={p.images[0]} alt={`${p.title} screenshot`} loading="lazy" />;
  } else if (p.category === "live" && p.link) {
    body = (
      <div className="pj-cover-live" aria-hidden="true">
        <iframe src={p.link} title={`${p.title} preview`} loading="lazy" tabIndex={-1} />
      </div>
    );
  } else {
    body = <span className="pj-mono">{p.title.slice(0, 2).toUpperCase()}</span>;
  }

  return (
    <div className="pj-cover">
      <div className="pj-cover-bar" aria-hidden="true">
        <i /><i /><i />
        <span>{host}</span>
      </div>
      <div className="pj-cover-body">
        {body}
        {p.category === "live" && p.link && (
          <span className="pj-badge"><i /> Live</span>
        )}
        {p.images.length > 1 && (
          <span className="pj-badge pj-badge--count">{p.images.length} screenshots</span>
        )}
      </div>
    </div>
  );
}

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState("all");
  const [detailId, setDetailId] = useState(null); // project whose detail page is open
  const scrollY = useRef(0);

  const list = filter === "all" ? PROJECTS : PROJECTS.filter((x) => x.category === filter);

  // Detail page: opens in place (no router needed) and the browser Back button closes it
  useEffect(() => {
    const onPop = (e) => setDetailId(e.state && e.state.pjDetail ? e.state.pjDetail : null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Back on the list: return to where the visitor was
  useEffect(() => {
    if (detailId === null) window.scrollTo({ top: scrollY.current });
  }, [detailId]);

  const openDetail = (id) => {
    scrollY.current = window.scrollY;
    window.history.pushState({ pjDetail: id }, "");
    setDetailId(id);
  };
  const swapDetail = (id) => {
    window.history.replaceState({ pjDetail: id }, "");
    setDetailId(id);
  };
  const closeDetail = () => {
    if (window.history.state && window.history.state.pjDetail) window.history.back();
    else setDetailId(null);
  };

  if (detailId) {
    return <IndividualProjectPage projectId={detailId} onBack={closeDetail} onSelect={swapDetail} />;
  }

  return (
    <main id="projects" className="pj">
      <style>{`
        .pj {
          min-height: 100vh;
          padding: calc(var(--pf-nav-height, 68px) + 2.5rem) 0 5rem;
          background:
            radial-gradient(ellipse at 85% 0%, rgba(193, 18, 31, 0.1), transparent 55%),
            var(--pf-bg-alt, #0a0808);
        }
        .pj-rise {
          opacity: 0; transform: translateY(20px);
          animation: pj-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
          animation-delay: var(--d, 0s);
        }
        @keyframes pj-rise { to { opacity: 1; transform: none; } }

        .pj-back {
          display: inline-block; margin-bottom: 1.8rem; color: var(--pf-text);
          font-size: 0.85rem; letter-spacing: 0.06em; text-decoration: none;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .pj-back:hover { color: var(--pf-accent); transform: translateX(-3px); }

        /* Header: title left, filters right */
        .pj-head { display: grid; gap: 1.6rem; align-items: end; }
        @media (min-width: 992px) { .pj-head { grid-template-columns: minmax(0, 1fr) auto; } }
        .pj-eyebrow {
          color: var(--pf-text); opacity: 0.8; font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.22em; margin: 0 0 0.7rem;
        }
        .pj-eyebrow b { color: var(--pf-accent); }
        .pj-title {
          font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -0.015em;
          color: var(--pf-text-strong); margin: 0 0 0.8rem;
        }
        .pj-lead { max-width: 38rem; line-height: 1.8; opacity: 0.85; margin: 0; }

        .pj-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .pj-filter {
          padding: 0.45rem 1.1rem; border-radius: 999px; cursor: pointer; font: inherit;
          font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; color: var(--pf-text);
          border: 1px solid var(--pf-border); background: transparent;
          transition: border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease;
        }
        .pj-filter:hover { border-color: rgba(212, 175, 55, 0.5); }
        .pj-filter.is-on { color: #0a0707; background: var(--pf-accent); border-color: var(--pf-accent); }
        .pj-filter small { opacity: 0.7; margin-left: 0.35rem; font-size: 0.72rem; }

        /* Card grid */
        .pj-grid {
          display: grid; gap: 1.5rem; margin-top: 2.4rem;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
        }
        .pj-card {
          position: relative; display: flex; flex-direction: column; border-radius: 16px; overflow: hidden;
          border: 1px solid var(--pf-border); background: rgba(255, 255, 255, 0.022);
          transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
          animation: pj-rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
          animation-delay: calc(var(--i, 0) * 0.07s);
        }
        .pj-card:hover, .pj-card:focus-within {
          transform: translateY(-5px); border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
        }

        /* Cover */
        .pj-cover { border-bottom: 1px solid var(--pf-border); background: rgba(0, 0, 0, 0.35); }
        .pj-cover-bar { display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.8rem; background: rgba(255, 255, 255, 0.03); border-bottom: 1px solid var(--pf-border); }
        .pj-cover-bar i { width: 8px; height: 8px; border-radius: 50%; background: rgba(255, 255, 255, 0.18); }
        .pj-cover-bar i:first-child { background: var(--pf-red); }
        .pj-cover-bar i:nth-child(2) { background: var(--pf-accent); }
        .pj-cover-bar span { margin-left: 0.6rem; font-size: 0.68rem; letter-spacing: 0.05em; opacity: 0.6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pj-cover-body {
          position: relative; aspect-ratio: 16 / 10; overflow: hidden; display: flex; align-items: center; justify-content: center;
          background:
            radial-gradient(ellipse at 20% 0%, rgba(193, 18, 31, 0.18), transparent 65%),
            linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px) 0 0 / 100% 26px;
        }
        .pj-cover-img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1); }
        .pj-card:hover .pj-cover-img { transform: scale(1.05); }
        .pj-cover-live { position: absolute; inset: 0; background: #fff; }
        .pj-cover-live iframe { width: 250%; height: 250%; border: 0; transform: scale(0.4); transform-origin: 0 0; pointer-events: none; background: #fff; }
        .pj-mono {
          font-size: 3.2rem; font-weight: 800; letter-spacing: 0.1em; opacity: 0.6;
          background: linear-gradient(90deg, var(--pf-red), var(--pf-accent));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .pj-badge {
          position: absolute; top: 0.6rem; right: 0.6rem; display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.22rem 0.65rem; border-radius: 999px; font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: #fff; background: rgba(10, 7, 7, 0.82);
          border: 1px solid rgba(212, 175, 55, 0.5);
        }
        .pj-badge i { width: 7px; height: 7px; border-radius: 50%; background: #3ddc84; animation: pj-pulse 1.6s ease-in-out infinite; }
        .pj-badge--count { top: auto; right: auto; bottom: 0.6rem; left: 0.6rem; letter-spacing: 0.06em; text-transform: none; font-weight: 600; }
        @keyframes pj-pulse { 50% { opacity: 0.35; } }

        /* Card text */
        .pj-info { display: flex; flex-direction: column; flex: 1; padding: 1.3rem 1.4rem 1.4rem; }
        .pj-kind { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--pf-accent); margin: 0 0 0.45rem; }
        .pj-name { font-size: 1.3rem; font-weight: 800; margin: 0 0 0.5rem; color: var(--pf-text-strong); }
        .pj-sum {
          margin: 0; line-height: 1.7; font-size: 0.92rem; opacity: 0.82;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .pj-chips { list-style: none; display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0; margin: 1rem 0 0; }
        .pj-chips li {
          font-size: 0.72rem; padding: 0.2rem 0.65rem; border-radius: 999px;
          border: 1px solid var(--pf-border); color: var(--pf-text-strong); background: rgba(255, 255, 255, 0.03);
        }
        .pj-foot { display: flex; align-items: center; gap: 1rem; margin-top: auto; padding-top: 1.2rem; }
        .pj-more {
          color: var(--pf-accent); font-weight: 600; font-size: 0.88rem; text-decoration: none;
        }
        /* Stretch the main link over the whole card so the card is clickable */
        .pj-more::after { content: ""; position: absolute; inset: 0; z-index: 1; }
        .pj-more span { display: inline-block; transition: transform 0.25s ease; }
        .pj-card:hover .pj-more span { transform: translateX(4px); }
        .pj-ext {
          position: relative; z-index: 2; margin-left: auto; font-size: 0.78rem; color: var(--pf-text);
          text-decoration: none; border-bottom: 1px solid var(--pf-border);
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .pj-ext:hover { color: var(--pf-accent); border-color: var(--pf-accent); }
        .pj-ext + .pj-ext { margin-left: 0; }

        /* CTA */
        .pj-cta {
          margin-top: 3.5rem; padding: 1.8rem 2rem; border-radius: 14px;
          display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;
          border: 1px solid var(--pf-border);
          background: linear-gradient(90deg, rgba(193, 18, 31, 0.1), rgba(212, 175, 55, 0.06));
        }
        .pj-cta h3 { font-size: 1.1rem; font-weight: 700; color: var(--pf-text-strong); margin: 0 0 0.2rem; }
        .pj-cta p { margin: 0; opacity: 0.75; }
        .pj-btn {
          display: inline-block; padding: 0.65rem 1.3rem; border-radius: 8px; cursor: pointer;
          font: inherit; font-size: 0.88rem; font-weight: 600; text-decoration: none; border: 1px solid transparent;
          background: var(--pf-accent); color: #0a0707;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }
        .pj-btn:hover { transform: translateY(-2px); background: #e6c14e; color: #0a0707; }
        .pj-btn--ghost { background: transparent; color: var(--pf-accent); border-color: rgba(212, 175, 55, 0.4); }
        .pj-btn--ghost:hover { background: rgba(212, 175, 55, 0.08); color: var(--pf-accent); border-color: var(--pf-accent); }
        .pj-cta-actions { display: flex; flex-wrap: wrap; gap: 0.8rem; }

        .pj-back:focus-visible, .pj-filter:focus-visible, .pj-more:focus-visible, .pj-ext:focus-visible, .pj-btn:focus-visible {
          outline: 2px solid var(--pf-accent); outline-offset: 3px;
        }
        .pj-card:has(.pj-more:focus-visible) { border-color: var(--pf-accent); }
        .pj-more:focus-visible { outline-offset: 5px; }

        @media (prefers-reduced-motion: reduce) {
          .pj-rise, .pj-card { animation: none; opacity: 1; transform: none; }
          .pj-badge i { animation: none; }
          .pj-card, .pj-cover-img, .pj-more span, .pj-btn, .pj-back { transition: none; }
          .pj-card:hover { transform: none; }
          .pj-card:hover .pj-cover-img, .pj-card:hover .pj-more span { transform: none; }
        }
      `}</style>

      <div className="container">
        <a href="#home" className="pj-back pj-rise">← Back to home</a>

        <header className="pj-head pj-rise" style={{ "--d": "0.08s" }}>
          <div>
            <p className="pj-eyebrow"><b>04</b> / PROJECTS</p>
            <h1 className="pj-title">Selected work</h1>
            <p className="pj-lead">
              Live websites, desktop software and open-source projects I've built.
              Open any project for screenshots, the full story and what I learned.
            </p>
          </div>

          <div className="pj-filters" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => {
              const count = f.id === "all" ? PROJECTS.length : PROJECTS.filter((x) => x.category === f.id).length;
              return (
                <button
                  type="button"
                  key={f.id}
                  className={`pj-filter ${filter === f.id ? "is-on" : ""}`}
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}<small>{count}</small>
                </button>
              );
            })}
          </div>
        </header>

        {/* key restarts the card entrance animation when the filter changes */}
        <div className="pj-grid" key={filter}>
          {list.map((p, i) => (
            <article className="pj-card" key={p.id} style={{ "--i": i }}>
              <Cover p={p} />

              <div className="pj-info">
                <p className="pj-kind">{p.tag}</p>
                <h2 className="pj-name">{p.title}</h2>
                <p className="pj-sum">{p.summary}</p>

                {p.tech.length > 0 && (
                  <ul className="pj-chips" aria-label="Technologies">
                    {p.tech.slice(0, 5).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}

                <div className="pj-foot">
                  <a
                    className="pj-more"
                    href={`#project/${p.id}`}
                    aria-label={`View details of ${p.title}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openDetail(p.id);
                    }}
                  >
                    View details <span aria-hidden="true">→</span>
                  </a>
                  {p.link && (
                    <a className="pj-ext" href={p.link} target="_blank" rel="noreferrer">
                      {p.linkLabel || "Live site"} ↗
                    </a>
                  )}
                  {p.repo && (
                    <a className="pj-ext" href={p.repo} target="_blank" rel="noreferrer">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="pj-cta pj-rise" style={{ "--d": "0.3s" }}>
          <div>
            <h3>Have a project in mind?</h3>
            <p>Let's talk about what you'd like to build.</p>
          </div>
          <div className="pj-cta-actions">
            <a href={GITHUB} target="_blank" rel="noreferrer" className="pj-btn pj-btn--ghost">More on GitHub</a>
            <a href="#contact" className="pj-btn">Get in touch</a>
          </div>
        </div>
      </div>
    </main>
  );
}