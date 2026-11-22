import { useState } from "react";

/* ------------------------------------------------------------------
   Single source of truth for experience.
   Home.jsx imports EXPERIENCES + CompanyLogo from this file, so edit
   the details here and both the home preview and this page update.

   Logos: drop the image files in /public with these names (or change
   the paths). If a file is missing, a styled initials badge shows.
------------------------------------------------------------------- */
export const EXPERIENCES = [
  {
    id: "jasmin",
    company: "Jasmin Infotech",
    role: "Software Developer",
    type: "Full-time",
    start: "Nov 2026",
    end: "Present",
    current: true,
    logo: "/jasmin-infotech.png",
    initials: "JI",
    summary:
      "Building and maintaining software for the company's products and client projects as part of an engineering team, with a focus on clean, maintainable code and reliable delivery.",
    responsibilities: [
      "Develop, test and ship new features across the application stack.",
      "Debug and fix issues reported from production and QA, tracing them to the root cause.",
      "Work from requirements and designs to plan tasks and deliver them on schedule.",
      "Take part in code reviews and keep code consistent with team conventions.",
      "Use Git-based workflows for branching, pull requests and releases.",
    ],
    contributions: [
      "Ramping up on the team's codebase, tooling and delivery process.",
      "Applying my C#, React and PHP background to day-to-day product work.",
      "Writing readable code with clear structure so teammates can extend it.",
    ],
    tech: ["C#", "React", "JavaScript", "SQL", "Git"],
    stats: [
      ["Role", "Software Developer"],
      ["Since", "Nov 2026"],
      ["Status", "Current"],
    ],
  },
  {
    id: "rs-infotech",
    company: "RS Infotech",
    role: "Freelance Frontend Developer",
    type: "Freelance",
    location: "Kanchipuram, Tamil Nadu",
    start: "Jun 2026",
    end: "Sep 2026",
    current: false,
    duration: "4 months",
    logo: "/rs-infotech.jpeg",
    initials: "RS",
    summary:
      "Designed, built and launched the company website for a security services business, and handled the local search presence that helps nearby customers find them.",
    responsibilities: [
      "Built the responsive company website with React, Vite and Bootstrap, covering six security services.",
      "Designed a clean white, green and sky-blue visual identity that suits a trust-focused business.",
      "Configured Netlify deployment and connected the production domains.",
      "Added SEO meta tags, a sitemap and Google Search Console verification.",
      "Linked social profiles and contact channels from the contact page.",
    ],
    contributions: [
      "Reviewed the Google Business Profile category setup and advised on aligning it with the services offered.",
      "Recommended individual service landing pages with LocalBusiness schema for stronger local search.",
      "Advised on Indian business directory submissions and a review collection approach.",
    ],
    tech: ["React", "Vite", "Bootstrap", "Netlify", "SEO", "Search Console"],
    stats: [
      ["Services covered", "6"],
      ["Duration", "4 months"],
      ["Delivery", "Live on Netlify"],
    ],
  },
];

/* Logo slot: shows the image when available, initials badge otherwise */
export function CompanyLogo({ src, name, initials, large }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`pf-logo ${large ? "pf-logo--lg" : ""}`}>
      {src && !broken ? (
        <img src={src} alt={`${name} logo`} onError={() => setBroken(true)} draggable={false} />
      ) : (
        <span className="pf-logo-fallback" aria-label={`${name} logo placeholder`}>
          {initials}
        </span>
      )}
    </div>
  );
}

export default function Experience() {
  return (
    <>
      <style>{`
        .pf-xp-page { padding-top: calc(var(--pf-nav-height) + 4rem); min-height: 100vh; }

        .pf-xp-intro { max-width: 40rem; }

        .pf-xp-summary {
          display: flex; flex-wrap: wrap; gap: 2.2rem; margin: 2.2rem 0 3.5rem;
          padding-top: 1.6rem; border-top: 1px solid var(--pf-border);
        }
        .pf-xp-summary strong { display: block; font-size: 1.5rem; font-weight: 700; color: var(--pf-text-strong); }
        .pf-xp-summary span { font-size: 0.78rem; letter-spacing: 0.04em; opacity: 0.65; }

        /* Timeline */
        .pf-xp-timeline { position: relative; display: grid; gap: 2rem; padding-left: 2.4rem; }
        .pf-xp-timeline::before {
          content: ""; position: absolute; left: 7px; top: 10px; bottom: 10px; width: 2px;
          background: linear-gradient(180deg, var(--pf-accent), var(--pf-red) 70%, transparent);
          opacity: 0.55;
        }
        .pf-xp-item { position: relative; }
        .pf-xp-dot {
          position: absolute; left: -2.4rem; top: 1.9rem; width: 16px; height: 16px; border-radius: 50%;
          background: var(--pf-bg); border: 2px solid var(--pf-accent);
        }
        .pf-xp-item.is-current .pf-xp-dot {
          background: var(--pf-red); border-color: var(--pf-accent);
          box-shadow: 0 0 0 0 rgba(193, 18, 31, 0.55); animation: pf-xp-pulse 2.2s ease-out infinite;
        }
        @keyframes pf-xp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(193, 18, 31, 0.55); }
          100% { box-shadow: 0 0 0 12px rgba(193, 18, 31, 0); }
        }

        .pf-xp-card { padding: 2rem; }
        .pf-xp-head { display: flex; flex-wrap: wrap; align-items: center; gap: 1.2rem; margin-bottom: 1.4rem; }
        .pf-xp-title { flex: 1; min-width: 12rem; }
        .pf-xp-title .pf-h3 { font-size: 1.3rem; margin-bottom: 0.2rem; }
        .pf-xp-company { color: var(--pf-accent); font-weight: 600; font-size: 0.98rem; }
        .pf-xp-meta { font-size: 0.82rem; opacity: 0.65; margin-top: 0.25rem; }

        .pf-xp-period { text-align: right; }
        .pf-xp-period strong { display: block; color: var(--pf-text-strong); font-size: 0.95rem; font-weight: 600; }
        .pf-xp-now {
          display: inline-flex; align-items: center; gap: 0.45rem; margin-top: 0.35rem;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.2rem 0.65rem; border-radius: 999px; color: var(--pf-text);
          border: 1px solid var(--pf-border);
        }
        .pf-xp-now i { width: 6px; height: 6px; border-radius: 50%; background: #2ecc71; }
        .pf-xp-dur { display: block; margin-top: 0.3rem; font-size: 0.78rem; opacity: 0.6; }

        .pf-xp-lead { line-height: 1.8; opacity: 0.88; margin-bottom: 1.8rem; }

        .pf-xp-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .pf-xp-col h4 {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--pf-accent); margin-bottom: 0.9rem;
        }
        .pf-xp-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.7rem; }
        .pf-xp-list li { position: relative; padding-left: 1.2rem; line-height: 1.65; font-size: 0.93rem; opacity: 0.88; }
        .pf-xp-list li::before {
          content: ""; position: absolute; left: 0; top: 0.65em; width: 6px; height: 6px;
          border-radius: 50%; background: var(--pf-red);
        }

        .pf-xp-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem; margin-top: 1.9rem;
          padding-top: 1.5rem; border-top: 1px solid var(--pf-border);
        }
        .pf-xp-stats div { text-align: left; }
        .pf-xp-stats strong { display: block; color: var(--pf-text-strong); font-size: 1rem; font-weight: 700; }
        .pf-xp-stats span { font-size: 0.74rem; letter-spacing: 0.05em; opacity: 0.6; }

        .pf-xp-cta {
          margin-top: 3.5rem; display: flex; flex-wrap: wrap; gap: 0.9rem; align-items: center;
        }

        @media (max-width: 767.98px) {
          .pf-xp-cols { grid-template-columns: 1fr; gap: 1.6rem; }
          .pf-xp-stats { grid-template-columns: 1fr 1fr; }
          .pf-xp-period { text-align: left; width: 100%; }
          .pf-xp-card { padding: 1.5rem; }
          .pf-xp-timeline { padding-left: 1.8rem; }
          .pf-xp-dot { left: -1.8rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pf-xp-item.is-current .pf-xp-dot { animation: none; }
        }
      `}</style>

      <section id="experience-page" className="pf-section pf-xp-page">
        <div className="container">
          <div className="pf-head pf-reveal">
            <p className="pf-eyebrow">
              <b>05</b> / EXPERIENCE
            </p>
            <h2 className="pf-h2">Where I've worked</h2>
          </div>

          <div className="pf-xp-intro pf-reveal">
            <p className="pf-text">
              A look at the roles I've held so far: what I was responsible for,
              what I built and the tools I used along the way.
            </p>
          </div>

          <div className="pf-xp-summary pf-reveal">
            <div>
              <strong>{EXPERIENCES.length}</strong>
              <span>Roles</span>
            </div>
            <div>
              <strong>{new Set(EXPERIENCES.map((e) => e.company)).size}</strong>
              <span>Organizations</span>
            </div>
            <div>
              <strong>Jun 2026</strong>
              <span>Started professionally</span>
            </div>
          </div>

          <div className="pf-xp-timeline">
            {EXPERIENCES.map((e, i) => (
              <div
                className={`pf-xp-item pf-reveal ${e.current ? "is-current" : ""}`}
                style={{ "--d": `${i * 0.1}s` }}
                key={e.id}
              >
                <span className="pf-xp-dot" aria-hidden="true" />
                <article className="pf-card pf-xp-card">
                  <div className="pf-xp-head">
                    <CompanyLogo src={e.logo} name={e.company} initials={e.initials} large />
                    <div className="pf-xp-title">
                      <h3 className="pf-h3">{e.role}</h3>
                      <div className="pf-xp-company">{e.company}</div>
                      <div className="pf-xp-meta">
                        {[e.type, e.location].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                    <div className="pf-xp-period">
                      <strong>
                        {e.start} – {e.end}
                      </strong>
                      {e.current ? (
                        <span className="pf-xp-now">
                          <i aria-hidden="true" /> Current
                        </span>
                      ) : (
                        e.duration && <span className="pf-xp-dur">{e.duration}</span>
                      )}
                    </div>
                  </div>

                  <p className="pf-xp-lead">{e.summary}</p>

                  <div className="pf-xp-cols">
                    <div className="pf-xp-col">
                      <h4>Responsibilities</h4>
                      <ul className="pf-xp-list">
                        {e.responsibilities.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pf-xp-col">
                      <h4>{e.current ? "Focus areas" : "Key contributions"}</h4>
                      <ul className="pf-xp-list">
                        {e.contributions.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <ul className="pf-chips">
                    {e.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  <div className="pf-xp-stats">
                    {e.stats.map(([l, v]) => (
                      <div key={l}>
                        <strong>{v}</strong>
                        <span>{l}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="pf-xp-cta pf-reveal">
            <a href="#/projects" className="pf-btn pf-btn--primary">View Projects</a>
            <a href="#contact" className="pf-btn pf-btn--ghost">Contact Me</a>
          </div>
        </div>
      </section>
    </>
  );
}