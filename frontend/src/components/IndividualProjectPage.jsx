import { useState, useEffect } from "react";
import { PROJECTS, getProject } from "./projectsData";

const GITHUB = "https://github.com/sabariragu2006";

// Reads the project id from the URL hash: #project/maadala
const idFromHash = () => {
  const m = window.location.hash.match(/^#project\/([^/?]+)/);
  return m ? decodeURIComponent(m[1]) : null;
};

function VideoPlayer({ v }) {
  if (v.youtube) {
    return (
      <iframe
        className="ip-video"
        src={`https://www.youtube-nocookie.com/embed/${v.youtube}`}
        title={v.title}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <video className="ip-video" src={v.src} poster={v.poster} controls preload="metadata">
      Your browser does not support video playback.
    </video>
  );
}

// projectId / onBack / onSelect are optional: ProjectsShowcase passes them to open this page in place.
// Without them the page reads the id from the URL hash (#project/<id>).
export default function IndividualProjectPage({ projectId, onBack, onSelect }) {
  const [hashId, setHashId] = useState(idFromHash);
  const [shot, setShot] = useState(null); // lightbox index
  const [vid, setVid] = useState(0);

  useEffect(() => {
    const onHash = () => setHashId(idFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goBack = (e) => {
    if (onBack) {
      e.preventDefault();
      onBack();
    }
  };
  const goTo = (e, target) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(target);
    }
  };

  const id = projectId || hashId;
  const p = getProject(id);

  // New project: back to top, reset media state
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setShot(null);
    setVid(0);
  }, [id]);

  // Lightbox keyboard: Esc closes, arrows navigate
  useEffect(() => {
    if (shot === null || !p) return;
    const n = p.images.length;
    const onKey = (e) => {
      if (e.key === "Escape") setShot(null);
      if (e.key === "ArrowRight") setShot((s) => (s + 1) % n);
      if (e.key === "ArrowLeft") setShot((s) => (s - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shot, p]);

  const styles = (
    <style>{`
      .ip {
        min-height: 100vh;
        padding: calc(var(--pf-nav-height, 68px) + 2.5rem) 0 5rem;
        background:
          radial-gradient(ellipse at 85% 0%, rgba(193, 18, 31, 0.1), transparent 55%),
          var(--pf-bg-alt, #0a0808);
      }
      .ip-rise {
        opacity: 0; transform: translateY(20px);
        animation: ip-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        animation-delay: var(--d, 0s);
      }
      @keyframes ip-rise { to { opacity: 1; transform: none; } }

      .ip-back {
        display: inline-block; margin-bottom: 1.8rem; color: var(--pf-text);
        font-size: 0.85rem; letter-spacing: 0.06em; text-decoration: none;
        transition: color 0.25s ease, transform 0.25s ease;
      }
      .ip-back:hover { color: var(--pf-accent); transform: translateX(-3px); }
      .ip-tag { color: var(--pf-accent); font-size: 0.74rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 0.7rem; }
      .ip-title { font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 800; letter-spacing: -0.015em; color: var(--pf-text-strong); margin: 0 0 0.9rem; }
      .ip-lead { max-width: 42rem; line-height: 1.8; opacity: 0.85; margin: 0; }
      .ip-actions { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1.6rem; }

      .ip-btn {
        display: inline-block; padding: 0.7rem 1.4rem; border-radius: 8px; cursor: pointer;
        font: inherit; font-size: 0.9rem; font-weight: 600; text-decoration: none; border: 1px solid transparent;
        transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
      }
      .ip-btn:hover { transform: translateY(-2px); }
      .ip-btn--primary { background: var(--pf-accent); color: #0a0707; }
      .ip-btn--primary:hover { background: #e6c14e; color: #0a0707; }
      .ip-btn--ghost { color: var(--pf-accent); border-color: rgba(212, 175, 55, 0.4); background: transparent; }
      .ip-btn--ghost:hover { border-color: var(--pf-accent); background: rgba(212, 175, 55, 0.08); color: var(--pf-accent); }

      /* Layout */
      .ip-layout { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; margin-top: 2.6rem; }
      @media (min-width: 992px) { .ip-layout { grid-template-columns: minmax(0, 1fr) 290px; align-items: start; } }
      .ip-main { display: grid; gap: 2.8rem; min-width: 0; }

      .ip-h3 { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--pf-accent); margin: 0 0 1rem; }
      .ip-text p { line-height: 1.9; opacity: 0.88; margin: 0 0 1rem; max-width: 44rem; }

      /* Frames */
      .ip-frame { border-radius: 12px; overflow: hidden; border: 1px solid var(--pf-border); background: rgba(0, 0, 0, 0.35); }
      .ip-frame-bar { display: flex; align-items: center; gap: 0.4rem; padding: 0.6rem 0.9rem; border-bottom: 1px solid var(--pf-border); background: rgba(255, 255, 255, 0.03); }
      .ip-frame-bar i { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, 0.18); }
      .ip-frame-bar i:first-child { background: var(--pf-red); }
      .ip-frame-bar i:nth-child(2) { background: var(--pf-accent); }
      .ip-frame-bar span { margin-left: 0.7rem; font-size: 0.72rem; opacity: 0.6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ip-frame-bar a { margin-left: auto; font-size: 0.72rem; color: var(--pf-accent); text-decoration: none; white-space: nowrap; }
      .ip-frame-body { position: relative; aspect-ratio: 16 / 10; background: #fff; }
      .ip-frame-body iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
      .ip-note { font-size: 0.8rem; opacity: 0.6; margin: 0.7rem 0 0; }

      .ip-hero-fallback {
        aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; border-radius: 12px;
        border: 1px solid var(--pf-border);
        background:
          radial-gradient(ellipse at 20% 0%, rgba(193, 18, 31, 0.2), transparent 65%),
          linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px) 0 0 / 100% 26px;
      }
      .ip-mono {
        font-size: 4rem; font-weight: 800; letter-spacing: 0.1em; opacity: 0.6;
        background: linear-gradient(90deg, var(--pf-red), var(--pf-accent));
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }

      /* Video */
      .ip-video { display: block; width: 100%; aspect-ratio: 16 / 9; border: 0; border-radius: 12px; background: #000; }
      .ip-vtabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.9rem; }
      .ip-vtab {
        padding: 0.4rem 0.9rem; border-radius: 999px; cursor: pointer; font: inherit; font-size: 0.78rem; color: var(--pf-text);
        border: 1px solid var(--pf-border); background: transparent;
      }
      .ip-vtab.is-on { color: #0a0707; background: var(--pf-accent); border-color: var(--pf-accent); }

      /* Gallery */
      .ip-gallery { display: grid; gap: 0.8rem; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
      .ip-gimg {
        padding: 0; border-radius: 10px; overflow: hidden; cursor: zoom-in; aspect-ratio: 16 / 10;
        border: 1px solid var(--pf-border); background: rgba(0, 0, 0, 0.35);
        transition: border-color 0.25s ease, transform 0.25s ease;
      }
      .ip-gimg:hover { border-color: var(--pf-accent); transform: translateY(-2px); }
      .ip-gimg img { width: 100%; height: 100%; object-fit: cover; display: block; }

      /* Lists */
      .ip-feat { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.7rem 1.5rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
      .ip-feat li { position: relative; padding-left: 1.2rem; opacity: 0.9; }
      .ip-feat li::before { content: ""; position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 50%; background: var(--pf-red); }

      .ip-learn { display: grid; gap: 0.9rem; }
      .ip-card {
        padding: 1.2rem 1.4rem; border-radius: 12px; border: 1px solid var(--pf-border);
        background: rgba(255, 255, 255, 0.022);
      }
      .ip-card b { display: block; color: var(--pf-text-strong); margin-bottom: 0.35rem; }
      .ip-card b em { font-style: normal; color: var(--pf-red); margin-right: 0.6rem; font-size: 0.8rem; }
      .ip-card p { margin: 0; line-height: 1.8; opacity: 0.85; font-size: 0.93rem; }

      /* Side card */
      .ip-side { padding: 1.4rem; border-radius: 14px; border: 1px solid var(--pf-border); background: rgba(255, 255, 255, 0.025); display: grid; gap: 1.2rem; }
      @media (min-width: 992px) { .ip-side { position: sticky; top: calc(var(--pf-nav-height, 68px) + 1.5rem); } }
      .ip-side dt { font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.55; margin-bottom: 0.3rem; }
      .ip-side dd { margin: 0; color: var(--pf-text-strong); font-size: 0.92rem; }
      .ip-chips { list-style: none; display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0; margin: 0; }
      .ip-chips li { font-size: 0.76rem; padding: 0.25rem 0.7rem; border-radius: 999px; border: 1px solid var(--pf-border); color: var(--pf-text-strong); background: rgba(255, 255, 255, 0.03); }
      .ip-side .ip-btn { text-align: center; }

      /* Prev / next */
      .ip-nav { margin-top: 3.5rem; display: grid; gap: 1rem; grid-template-columns: 1fr 1fr; }
      .ip-nav a {
        display: block; padding: 1.1rem 1.3rem; border-radius: 12px; text-decoration: none;
        border: 1px solid var(--pf-border); color: var(--pf-text-strong);
        transition: border-color 0.25s ease, background-color 0.25s ease;
      }
      .ip-nav a:hover { border-color: rgba(212, 175, 55, 0.5); background: rgba(212, 175, 55, 0.05); }
      .ip-nav a:last-child { text-align: right; }
      .ip-nav small { display: block; font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.55; margin-bottom: 0.25rem; }

      .ip-cta {
        margin-top: 2rem; padding: 1.8rem 2rem; border-radius: 14px; display: flex; flex-wrap: wrap; gap: 1rem;
        align-items: center; justify-content: space-between; border: 1px solid var(--pf-border);
        background: linear-gradient(90deg, rgba(193, 18, 31, 0.1), rgba(212, 175, 55, 0.06));
      }
      .ip-cta h3 { font-size: 1.1rem; font-weight: 700; color: var(--pf-text-strong); margin: 0 0 0.2rem; }
      .ip-cta p { margin: 0; opacity: 0.75; }

      /* Lightbox */
      .ip-lb { position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: rgba(5, 3, 3, 0.94); animation: ip-fade 0.25s ease; }
      @keyframes ip-fade { from { opacity: 0; } to { opacity: 1; } }
      .ip-lb img { max-width: 100%; max-height: 100%; border-radius: 10px; border: 1px solid var(--pf-border); }
      .ip-lb button {
        position: absolute; width: 44px; height: 44px; border-radius: 50%; font-size: 1.1rem; cursor: pointer;
        color: var(--pf-text-strong); background: rgba(10, 7, 7, 0.7); border: 1px solid var(--pf-border);
      }
      .ip-lb .x { top: 1rem; right: 1rem; }
      .ip-lb .l { left: 1rem; top: 50%; transform: translateY(-50%); }
      .ip-lb .r { right: 1rem; top: 50%; transform: translateY(-50%); }

      .ip-back:focus-visible, .ip-btn:focus-visible, .ip-gimg:focus-visible, .ip-vtab:focus-visible,
      .ip-nav a:focus-visible, .ip-lb button:focus-visible, .ip-frame-bar a:focus-visible {
        outline: 2px solid var(--pf-accent); outline-offset: 3px;
      }
      @media (max-width: 560px) { .ip-nav { grid-template-columns: 1fr; } .ip-nav a:last-child { text-align: left; } }
      @media (prefers-reduced-motion: reduce) {
        .ip-rise, .ip-lb { animation: none; opacity: 1; transform: none; }
        .ip-btn, .ip-back, .ip-gimg { transition: none; }
      }
    `}</style>
  );

  // Unknown project id
  if (!p) {
    return (
      <main className="ip">
        {styles}
        <div className="container">
          <a href="#projects" className="ip-back" onClick={goBack}>← Back to projects</a>
          <h1 className="ip-title">Project not found</h1>
          <p className="ip-lead">That project doesn't exist. Head back and pick one from the list.</p>
          <div className="ip-actions">
            <a href="#projects" className="ip-btn ip-btn--primary" onClick={goBack}>View all projects</a>
          </div>
        </div>
      </main>
    );
  }

  const i = PROJECTS.findIndex((x) => x.id === p.id);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const host = p.link ? p.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  const showLive = p.category === "live" && p.link;

  return (
    <main className="ip">
      {styles}
      <div className="container" key={p.id}>
        <a href="#projects" className="ip-back ip-rise" onClick={goBack}>← Back to projects</a>

        <header className="ip-rise" style={{ "--d": "0.08s" }}>
          <p className="ip-tag">{p.tag}</p>
          <h1 className="ip-title">{p.title}</h1>
          <p className="ip-lead">{p.summary}</p>
          <div className="ip-actions">
            {p.link && (
              <a className="ip-btn ip-btn--primary" href={p.link} target="_blank" rel="noreferrer">
                {p.linkLabel || "Visit live site"}
              </a>
            )}
            {p.repo && (
              <a className="ip-btn ip-btn--primary" href={p.repo} target="_blank" rel="noreferrer">View source on GitHub</a>
            )}
            <a className="ip-btn ip-btn--ghost" href={GITHUB} target="_blank" rel="noreferrer">More on GitHub</a>
          </div>
        </header>

        <div className="ip-layout ip-rise" style={{ "--d": "0.2s" }}>
          <div className="ip-main">
            {/* Live website */}
            {showLive && (
              <section aria-label="Live website">
                <h2 className="ip-h3">Live website</h2>
                <div className="ip-frame">
                  <div className="ip-frame-bar">
                    <i /><i /><i />
                    <span>{host}</span>
                    <a href={p.link} target="_blank" rel="noreferrer">Open in new tab ↗</a>
                  </div>
                  <div className="ip-frame-body">
                    <iframe src={p.link} title={`${p.title} live site`} loading="lazy" />
                  </div>
                </div>
                <p className="ip-note">If the preview stays blank, the site can't be embedded. Use "Open in new tab".</p>
              </section>
            )}

            {/* Videos */}
            {p.videos.length > 0 && (
              <section aria-label="Video">
                <h2 className="ip-h3">Video</h2>
                {p.videos.length > 1 && (
                  <div className="ip-vtabs">
                    {p.videos.map((v, n) => (
                      <button type="button" key={v.title} className={`ip-vtab ${n === vid ? "is-on" : ""}`} onClick={() => setVid(n)}>
                        {v.title}
                      </button>
                    ))}
                  </div>
                )}
                <VideoPlayer key={vid} v={p.videos[vid]} />
              </section>
            )}

            {/* Images */}
            {p.images.length > 0 && (
              <section aria-label="Screenshots">
                <h2 className="ip-h3">Screenshots</h2>
                <div className="ip-gallery">
                  {p.images.map((src, n) => (
                    <button type="button" key={src} className="ip-gimg" onClick={() => setShot(n)} aria-label={`Open screenshot ${n + 1}`}>
                      <img src={src} alt={`${p.title} screenshot ${n + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Fallback when there is no media at all */}
            {!showLive && p.videos.length === 0 && p.images.length === 0 && (
              <div className="ip-hero-fallback" aria-hidden="true">
                <span className="ip-mono">{p.title.slice(0, 2).toUpperCase()}</span>
              </div>
            )}

            {/* Detailed explanation */}
            <section className="ip-text" aria-label="Overview">
              <h2 className="ip-h3">About the project</h2>
              {p.overview.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </section>

            {p.features.length > 0 && (
              <section aria-label="Key features">
                <h2 className="ip-h3">Key features</h2>
                <ul className="ip-feat">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </section>
            )}

            {p.learnings.length > 0 && (
              <section aria-label="Key learnings">
                <h2 className="ip-h3">Key learnings</h2>
                <div className="ip-learn">
                  {p.learnings.map((l, n) => (
                    <div className="ip-card" key={l.title}>
                      <b><em>{String(n + 1).padStart(2, "0")}</em>{l.title}</b>
                      <p>{l.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Side info */}
          <aside className="ip-side" aria-label="Project info">
            <dl style={{ margin: 0, display: "grid", gap: "1.2rem" }}>
              <div><dt>Type</dt><dd>{p.tag}</dd></div>
              {p.role && <div><dt>My role</dt><dd>{p.role}</dd></div>}
              {p.tech.length > 0 && (
                <div>
                  <dt>Tech stack</dt>
                  <dd>
                    <ul className="ip-chips" aria-label="Technologies">
                      {p.tech.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
            {p.link && <a className="ip-btn ip-btn--primary" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel || "Visit live site"}</a>}
            {p.repo && <a className="ip-btn ip-btn--ghost" href={p.repo} target="_blank" rel="noreferrer">Source code</a>}
          </aside>
        </div>

        <nav className="ip-nav" aria-label="More projects">
          <a href={`#project/${prev.id}`} onClick={(e) => goTo(e, prev.id)}><small>← Previous</small>{prev.title}</a>
          <a href={`#project/${next.id}`} onClick={(e) => goTo(e, next.id)}><small>Next →</small>{next.title}</a>
        </nav>

        <div className="ip-cta">
          <div>
            <h3>Want something like this?</h3>
            <p>Let's talk about what you'd like to build.</p>
          </div>
          <a href="#contact" className="ip-btn ip-btn--primary">Get in touch</a>
        </div>
      </div>

      {shot !== null && p.images[shot] && (
        <div className="ip-lb" role="dialog" aria-modal="true" aria-label="Screenshot viewer" onClick={() => setShot(null)}>
          <img src={p.images[shot]} alt={`${p.title} screenshot ${shot + 1}`} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="x" aria-label="Close" onClick={() => setShot(null)}>✕</button>
          {p.images.length > 1 && (
            <>
              <button type="button" className="l" aria-label="Previous screenshot" onClick={(e) => { e.stopPropagation(); setShot((shot - 1 + p.images.length) % p.images.length); }}>←</button>
              <button type="button" className="r" aria-label="Next screenshot" onClick={(e) => { e.stopPropagation(); setShot((shot + 1) % p.images.length); }}>→</button>
            </>
          )}
        </div>
      )}
    </main>
  );
}