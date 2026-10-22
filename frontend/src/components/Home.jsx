import { useState, useEffect } from "react";
import ProjectsShowcase from "./ProjectsShowcase.jsx";
import SkillsShowcase from "./SkillsShowcase.jsx";

const EMAIL = "sabariragu2006@email.com";
const GITHUB = "https://github.com/sabariragu2006";
const LINKEDIN = "https://www.linkedin.com/in/sabariragu/";
const PHONE = "8608560874";
const RESUME_URL = "/sabariraguMern.pdf";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#/skills" },
  { label: "Projects", href: "#/projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const ROLES = [
  "Full-Stack Developer",
  "C# WPF Engineer",
  "React Frontend Builder",
  "PHP Web Developer",
];

const HERO_STATS = [
  ["4+", "Projects delivered"],
  ["3", "Core technologies"],
  ["Open", "Source contributor"],
];

const SERVICES = [
  { n: "01", title: "Desktop Applications", text: "Business-ready Windows apps in C# and WPF: billing, bookings, inventory and PDF reports." },
  { n: "02", title: "Web Frontends", text: "Responsive, fast React interfaces with clean structure and polished interactions." },
  { n: "03", title: "PHP Web Apps", text: "Dynamic, database-driven websites and admin panels built on PHP." },
  { n: "04", title: "Database Design", text: "Reliable SQLite and relational schemas designed for real day-to-day use." },
];

const SKILL_GROUPS = [
  { n: "01", title: "Desktop", note: "Windows applications", items: ["C#", "WPF", "XAML", "QuestPDF", "SkiaSharp"] },
  { n: "02", title: "Web", note: "Frontends and backends", items: ["React", "JavaScript", "PHP", "Bootstrap", "HTML & CSS"] },
  { n: "03", title: "Data & Tooling", note: "Storage and workflow", items: ["SQLite", "SQL", "Git", "GitHub", "Vite", "Netlify"] },
];

const TICKER_A = ["C#", "WPF", "XAML", "React", "JavaScript", "PHP", "Bootstrap", "HTML", "CSS"];
const TICKER_B = ["SQLite", "SQL", "Git", "GitHub", "Vite", "Netlify", "QuestPDF", "SkiaSharp"];

const PROJECTS = [
  {
    title: "Adhigarachi",
    tag: "Open Source",
    text: "A SQLite database manager built as a WPF desktop app, with a React promotional site.",
    tech: ["C#", "WPF", "SQLite", "React"],
  },
  {
    title: "KMV Grand Inn",
    tag: "Desktop App",
    text: "Hotel room booking system with a dual-database architecture for reliable record keeping.",
    tech: ["C#", "WPF", "SQLite"],
  },
  {
    title: "Sairam Sweets",
    tag: "Desktop App",
    text: "Textile shop management system with billing and professional PDF generation.",
    tech: ["C#", "WPF", "QuestPDF", "SkiaSharp"],
  },
  {
    title: "RS Infotech",
    tag: "Website",
    text: "Business website for a security systems company, deployed on Netlify.",
    tech: ["React", "Bootstrap", "Netlify"],
  },
];

// Image-only cards. Put the files in /public with these names (or change the paths).
// The caption under the stack uses badge + title; the cards themselves show only the image.
const ACHIEVEMENTS = [
  {
    id: "sih",
    badge: "Smart India Hackathon",
    title: "Second Round Qualifier",
    image: "/sih.png",
  },
  {
    id: "bca",
    badge: "Education",
    title: "Passed out BCA with CGPA 8.72",
    image: "/bca.png",
  },
  {
    id: "kcorner",
    badge: "K Corner",
    title: "Second Prize, PowerPoint Presentation",
    image: "/award.png",
  },
];

function useTyping(words, speed = 70, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const full = text === word;
    const delay = !deleting && full ? pause : deleting ? 35 : speed;
    const t = setTimeout(() => {
      if (!deleting && full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((n) => n + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}
const PAGES = { "#/projects": "projects", "#/skills": "skills" };

const getPage = () => PAGES[window.location.hash] || "home";

function usePage() {
  const [page, setPage] = useState(getPage);
  useEffect(() => {
    const onHash = () => setPage(getPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return page;
}

function Navbar({ page }) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  const current = page === "home" ? active : `#/${page}`;

  const handleLinkClick = (href) => {
    if (!href.startsWith("#/")) setActive(href);
    setIsOpen(false);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (window.scrollY < 12) setActive("#home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (page !== "home") return;
    const h = window.location.hash;
    setActive(NAV_LINKS.some((l) => l.href === h) ? h : "#home");
  }, [page]);

  useEffect(() => {
    if (page !== "home") return;
    const els = NAV_LINKS.filter((l) => !l.href.startsWith("#/"))
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [page]);

  return (
    <header className={`pf-header ${scrolled || isOpen || page !== "home" ? "is-solid" : ""}`}>
      <nav className="navbar navbar-expand-lg pf-nav" aria-label="Main navigation">
        <div className="container">
          <a className="pf-brand" href="#home" onClick={() => handleLinkClick("#home")}>
            <span className="pf-brand-dot" aria-hidden="true" />
            SABARI RAGU
          </a>

          <button
            type="button"
            className={`pf-toggler d-lg-none ${isOpen ? "is-open" : ""}`}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="pf-nav-panel"
            onClick={() => setIsOpen((o) => !o)}
          >
            <span className="pf-bar" />
            <span className="pf-bar" />
            <span className="pf-bar" />
          </button>

          <div id="pf-nav-panel" className={`navbar-collapse pf-panel ${isOpen ? "is-open" : ""}`}>
            <ul className="navbar-nav ms-lg-auto pf-links">
              {NAV_LINKS.map(({ label, href }) => (
                <li className="nav-item" key={href}>
                  <a
                    href={href}
                    className={`pf-link ${href === "#contact" ? "pf-link--contact" : ""} ${current === href ? "active" : ""}`}
                    aria-current={current === href ? "page" : undefined}
                    onClick={() => handleLinkClick(href)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const typed = useTyping(ROLES);
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <main id="home" className="pf-home">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="pf-badge pf-rise" style={{ "--d": "0.05s" }}>
              <i aria-hidden="true" /> Available for new projects
            </span>
            <h1 className="pf-name pf-rise" style={{ "--d": "0.2s" }}>
              Hi, I'm Sabari <span>Ragu</span>
            </h1>
            <p className="pf-role pf-rise" style={{ "--d": "0.35s" }}>
              <span className="pf-typed">{typed}</span>
              <span className="pf-caret" aria-hidden="true" />
            </p>
            <p className="pf-desc pf-rise" style={{ "--d": "0.5s" }}>
              Independent developer crafting fast, reliable desktop and web
              applications with C# WPF, React and PHP, from database design to
              polished interfaces.
            </p>
            <div className="pf-cta pf-rise" style={{ "--d": "0.65s" }}>
              <a href="#/projects" className="pf-btn pf-btn--primary">View Projects</a>
              <a href="#contact" className="pf-btn pf-btn--ghost">Contact Me</a>
            </div>
            <div className="pf-hero-stats pf-rise" style={{ "--d": "0.8s" }}>
              {HERO_STATS.map(([v, l]) => (
                <div key={l}>
                  <strong>{v}</strong>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {photoOk && (
            <div className="col-lg-5 d-flex justify-content-center pf-rise" style={{ "--d": "0.4s" }}>
              <div className="pf-photo-wrap">
                <img
                  src="/developer.png"
                  alt="Sabari Ragu"
                  className="pf-photo"
                  onError={() => setPhotoOk(false)}
                />
                <div className="pf-float" aria-hidden="true">
                  <span>Stack</span>
                  <strong>C# · React · PHP</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function SectionHead({ num, eyebrow, title }) {
  return (
    <div className="pf-head pf-reveal">
      <p className="pf-eyebrow">
        <b>{num}</b> / {eyebrow}
      </p>
      <h2 className="pf-h2">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="pf-section">
      <div className="container">
        <SectionHead num="01" eyebrow="ABOUT" title="Building software that works" />
        <div className="row g-5 align-items-center">
          <div className="col-lg-7 pf-reveal">
            <p className="pf-text">
              I'm Sabari, an independent developer based in India. I build
              desktop and web applications end to end: planning the database,
              writing the logic and shaping an interface people enjoy using.
            </p>
            <p className="pf-text">
              My work spans C# WPF management systems, React frontends and PHP
              web apps. I care about clean structure, practical features and
              software that holds up in everyday use.
            </p>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="pf-btn pf-btn--ghost">
              View my GitHub
            </a>
          </div>
          <div className="col-lg-5">
            <div className="row g-3">
              {[
                ["4+", "Projects built"],
                ["3", "Core languages"],
                ["Open", "Source work"],
                ["100%", "Hands-on delivery"],
              ].map(([v, l], i) => (
                <div className="col-6 pf-reveal" style={{ "--d": `${i * 0.08}s` }} key={l}>
                  <div className="pf-stat">
                    <strong>{v}</strong>
                    <span>{l}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="pf-section pf-section--alt">
      <div className="container">
        <SectionHead num="02" eyebrow="SERVICES" title="What I do" />
        <div className="row g-4">
          {SERVICES.map((s, i) => (
            <div className="col-md-6 col-xl-3 pf-reveal" style={{ "--d": `${i * 0.08}s` }} key={s.n}>
              <article className="pf-card h-100">
                <span className="pf-num">{s.n}</span>
                <h3 className="pf-h3">{s.title}</h3>
                <p className="pf-muted">{s.text}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ group }) {
  // Cursor-following spotlight
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article className="pf-card pf-skill-card h-100" onMouseMove={onMove}>
      <div className="pf-skill-head">
        <span className="pf-skill-n">{group.n}</span>
        <span className="pf-skill-count">{group.items.length} tools</span>
      </div>
      <h3 className="pf-h3">{group.title}</h3>
      <p className="pf-muted">{group.note}</p>
      <ul className="pf-skill-chips">
        {group.items.map((t, i) => (
          <li className="pf-skill-chip" style={{ "--i": i }} key={t}>
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Ticker({ items, reverse }) {
  // Items are doubled so the loop is seamless
  const loop = [...items, ...items];
  return (
    <div className="pf-ticker">
      <div className={`pf-ticker-track ${reverse ? "is-reverse" : ""}`}>
        {loop.map((t, i) => (
          <span className="pf-ticker-item" key={`${t}-${i}`} aria-hidden={i >= items.length}>
            <i aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="pf-section">
      <div className="container">
        <SectionHead num="03" eyebrow="SKILLS" title="Tools I work with" />
        <div className="row g-4">
          {SKILL_GROUPS.map((g, i) => (
            <div className="col-lg-4 pf-reveal" style={{ "--d": `${i * 0.1}s` }} key={g.title}>
              <SkillCard group={g} />
            </div>
          ))}
        </div>

        <div className="pf-ticker-wrap pf-reveal" style={{ "--d": "0.2s" }}>
          <Ticker items={TICKER_A} />
          <Ticker items={TICKER_B} reverse />
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="pf-section pf-section--alt">
      <div className="container">
        <SectionHead num="04" eyebrow="PROJECTS" title="Selected work" />
        <div className="row g-4">
          {PROJECTS.map((p, i) => (
            <div className="col-md-6 pf-reveal" style={{ "--d": `${i * 0.08}s` }} key={p.title}>
              <article className="pf-card h-100">
                <span className="pf-tag">{p.tag}</span>
                <h3 className="pf-h3">{p.title}</h3>
                <p className="pf-muted">{p.text}</p>
                <ul className="pf-chips">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
        <div className="pf-reveal mt-5">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="pf-btn pf-btn--ghost">
            More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const n = ACHIEVEMENTS.length;
  const [front, setFront] = useState(1); // middle card starts in front
  const [zoom, setZoom] = useState(false);
  const [broken, setBroken] = useState({});

  // The card in front sits in the middle; the other two go behind it, left and right
  const behind = ACHIEVEMENTS.map((_, i) => i).filter((i) => i !== front);
  const slotOf = (i) => (i === front ? "center" : behind[0] === i ? "left" : "right");

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") setFront((f) => (f + 1) % n);
    if (e.key === "ArrowLeft") setFront((f) => (f - 1 + n) % n);
  };

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => e.key === "Escape" && setZoom(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom]);

  const current = ACHIEVEMENTS[front];

  return (
    <section id="achievements" className="pf-section">
      <div className="container">
        <SectionHead num="05" eyebrow="ACHIEVEMENTS" title="Milestones so far" />

        <div className="pf-ach-stage pf-reveal" onKeyDown={onKeyDown}>
          {ACHIEVEMENTS.map((a, i) => {
            const slot = slotOf(i);
            const isFront = i === front;
            return (
              <button
                type="button"
                key={a.id}
                className={`pf-ach-card is-${slot}`}
                aria-label={isFront ? `${a.badge}: ${a.title}. Open full size` : `Bring forward: ${a.badge}, ${a.title}`}
                aria-current={isFront ? "true" : undefined}
                onClick={() => (isFront ? setZoom(true) : setFront(i))}
              >
                {a.image && !broken[a.id] ? (
                  <img
                    src={a.image}
                    alt=""
                    draggable={false}
                    onError={() => setBroken((b) => ({ ...b, [a.id]: true }))}
                  />
                ) : (
                  <span className="pf-ach-fallback">{a.title}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="pf-ach-foot pf-reveal">
          <div className="pf-ach-cap" key={current.id} aria-live="polite">
            <span className="pf-tag">{current.badge}</span>
            <h3 className="pf-h3">{current.title}</h3>
          </div>
          <div className="pf-ach-dots" role="group" aria-label="Choose achievement">
            {ACHIEVEMENTS.map((a, i) => (
              <button
                type="button"
                key={a.id}
                className={`pf-ach-dot ${i === front ? "is-on" : ""}`}
                aria-label={`${a.badge}: ${a.title}`}
                aria-pressed={i === front}
                onClick={() => setFront(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {zoom && current.image && !broken[current.id] && (
        <div className="pf-lb" role="dialog" aria-modal="true" aria-label={current.title} onClick={() => setZoom(false)}>
          <img src={current.image} alt={`${current.badge}: ${current.title}`} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="pf-lb-x" aria-label="Close" onClick={() => setZoom(false)}>✕</button>
        </div>
      )}
    </section>
  );
}

function Resume() {
  return (
    <section id="resume" className="pf-section pf-section--alt">
      <div className="container">
        <SectionHead num="06" eyebrow="RESUME" title="Download my resume" />
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 pf-reveal">
            <p className="pf-text">
              Everything in one place: my skills, selected projects, education and
              achievements. Download a copy or open it in a new tab.
            </p>
            <ul className="pf-resume-points">
              <li>Skills across C#, React and PHP</li>
              <li>Selected desktop and web projects</li>
              <li>Education and achievements</li>
            </ul>
            <div className="pf-resume-actions">
              <a className="pf-btn pf-btn--primary" href={RESUME_URL} download="SabariRagu_Resume.pdf">
                Download Resume
              </a>
              <a className="pf-btn pf-btn--ghost" href={RESUME_URL} target="_blank" rel="noreferrer">
                View online
              </a>
            </div>
          </div>

          <div className="col-lg-6 d-flex justify-content-center pf-reveal" style={{ "--d": "0.12s" }}>
            <div className="pf-doc" aria-hidden="true">
              <span className="pf-doc-badge">PDF</span>
              <div className="pf-doc-head">
                <i />
                <div><b /><b /></div>
              </div>
              <div className="pf-doc-block"><b /><b /><b /></div>
              <div className="pf-doc-block"><b /><b /></div>
              <div className="pf-doc-block"><b /><b /><b /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    hint: "Best for project enquiries",
  },
  {
    label: "Phone",
    value: `+91 ${PHONE}`,
    href: `tel:+91${PHONE}`,
    hint: "Call or WhatsApp",
  },
  {
    label: "LinkedIn",
    value: "in/sabariragu",
    href: LINKEDIN,
    hint: "Let's connect",
    external: true,
  },
  {
    label: "GitHub",
    value: "sabariragu2006",
    href: GITHUB,
    hint: "See my code",
    external: true,
  },
];

  return (
    <section id="contact" className="pf-section">
      <div className="container">
        <SectionHead num="07" eyebrow="CONTACT" title="Let's build something" />
        <p className="pf-text pf-reveal" style={{ maxWidth: "36rem" }}>
          Have a project in mind or want to collaborate? Reach out through any
          of the channels below and I'll get back to you.
        </p>
        <div className="row g-4 mt-2">
          {items.map((c, i) => (
            <div className="col-md-6 col-xl-3 pf-reveal" style={{ "--d": `${i * 0.08}s` }} key={c.label}>
              <a
                className="pf-card pf-contact-card h-100"
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span className="pf-tag">{c.label}</span>
                <strong>{c.value}</strong>
                <small>{c.hint}</small>
              </a>
            </div>
          ))}
        </div>
        <p className="pf-muted mt-4 pf-reveal">Based in India</p>
      </div>
    </section>
  );
}

export default function Home() {
  const page = usePage();

  // Re-observe reveal elements whenever the page changes
  useEffect(() => {
    const els = document.querySelectorAll(".pf-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [page]);

  // Scroll position after switching pages
  useEffect(() => {
    if (page === "projects") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = window.location.hash.slice(1);
    const el = id && !id.startsWith("/") ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

        :root {
          --pf-bg: #050505;
          --pf-bg-alt: #0a0808;
          --pf-bg-nav: rgba(8, 6, 6, 0.82);
          --pf-border: rgba(212, 175, 55, 0.14);
          --pf-text: #cfc8ba;
          --pf-text-strong: #f6efde;
          --pf-accent: #d4af37;
          --pf-red: #c1121f;
          --pf-nav-height: 68px;
        }

        html { scroll-behavior: smooth; }
        body {
          font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          background: var(--pf-bg);
          color: var(--pf-text);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        section[id], main[id] { scroll-margin-top: calc(var(--pf-nav-height) + 8px); }

        /* ---------- Navbar ---------- */
        .pf-header { position: fixed; top: 0; left: 0; right: 0; z-index: 1030; }
        .pf-nav {
          min-height: var(--pf-nav-height);
          padding: 0;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .pf-header.is-solid .pf-nav {
          background: var(--pf-bg-nav);
          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);
          border-bottom-color: var(--pf-border);
        }
        .pf-nav .container { min-height: var(--pf-nav-height); flex-wrap: wrap; align-items: center; }

        .pf-brand {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-weight: 700; font-size: 1rem; letter-spacing: 0.2em;
          color: var(--pf-text-strong); text-decoration: none;
          transition: color 0.25s ease;
        }
        .pf-brand:hover { color: var(--pf-accent); }
        .pf-brand-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--pf-red); box-shadow: 0 0 8px rgba(193, 18, 31, 0.65);
        }

        .pf-links { gap: 0.25rem; margin: 0; padding: 0; }
        .pf-link {
          position: relative; display: block; padding: 0.5rem 0.9rem;
          font-size: 0.9rem; font-weight: 500; letter-spacing: 0.03em;
          color: var(--pf-text); text-decoration: none; border-radius: 6px;
          transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
        }
        .pf-link::after {
          content: ""; position: absolute; left: 0.9rem; right: 0.9rem; bottom: 0.2rem; height: 2px;
          background: linear-gradient(90deg, var(--pf-red), var(--pf-accent));
          transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease;
        }
        .pf-link:hover { color: var(--pf-text-strong); }
        .pf-link:hover::after { transform: scaleX(0.4); }
        .pf-link.active { color: var(--pf-accent); }
        .pf-link.active::after { transform: scaleX(1); }

        .pf-link--contact { color: var(--pf-accent); }
        @media (min-width: 992px) {
          .pf-link--contact { margin-left: 0.5rem; border: 1px solid rgba(212, 175, 55, 0.35); }
          .pf-link--contact::after { display: none; }
          .pf-link--contact:hover, .pf-link--contact.active {
            border-color: var(--pf-accent); background: rgba(212, 175, 55, 0.08);
          }
        }

        .pf-brand:focus-visible, .pf-link:focus-visible, .pf-toggler:focus-visible,
        .pf-btn:focus-visible, .pf-contact-card:focus-visible, .pf-foot-links a:focus-visible {
          outline: 2px solid var(--pf-accent); outline-offset: 3px;
        }

        .pf-toggler {
          display: inline-flex; flex-direction: column; justify-content: center; gap: 5px;
          width: 42px; height: 42px; padding: 0 10px; background: transparent;
          border: 1px solid var(--pf-border); border-radius: 8px; cursor: pointer;
          transition: border-color 0.25s ease;
        }
        .pf-toggler:hover { border-color: rgba(212, 175, 55, 0.55); }
        .pf-bar {
          display: block; height: 2px; width: 100%; background: var(--pf-text-strong);
          border-radius: 2px; transition: transform 0.3s ease, opacity 0.2s ease;
        }
        .pf-toggler.is-open .pf-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .pf-toggler.is-open .pf-bar:nth-child(2) { opacity: 0; }
        .pf-toggler.is-open .pf-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        @media (max-width: 991.98px) {
          .pf-panel {
            max-height: 0; overflow: hidden; visibility: hidden; opacity: 0;
            transition: max-height 0.35s ease, opacity 0.25s ease, visibility 0s linear 0.35s;
          }
          .pf-panel.is-open {
            max-height: 420px; visibility: visible; opacity: 1;
            transition: max-height 0.35s ease, opacity 0.25s ease, visibility 0s;
          }
          .pf-links { padding: 0.5rem 0 1rem; gap: 0; }
          .pf-link {
            padding: 0.75rem 0.5rem; font-size: 1rem;
            border-bottom: 1px solid var(--pf-border); border-radius: 0;
          }
          .pf-link::after { display: none; }
          .pf-link.active { background: rgba(193, 18, 31, 0.1); }
        }
        @media (min-width: 992px) {
          .pf-panel { visibility: visible; opacity: 1; max-height: none; }
        }

        /* ---------- Hero ---------- */
        .pf-home {
          min-height: 100vh;
          padding: calc(var(--pf-nav-height) + 2rem) 0 4rem;
          display: flex; align-items: center;
          background:
            radial-gradient(ellipse at 80% 40%, rgba(193, 18, 31, 0.13), transparent 58%),
            radial-gradient(ellipse at 5% 95%, rgba(212, 175, 55, 0.05), transparent 55%),
            var(--pf-bg);
        }
        .pf-rise {
          opacity: 0; transform: translateY(22px);
          animation: pf-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
          animation-delay: var(--d, 0s);
        }
        @keyframes pf-rise { to { opacity: 1; transform: none; } }

        .pf-badge {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.38rem 0.9rem; margin-bottom: 1.4rem; border-radius: 999px;
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.03em;
          color: var(--pf-text); border: 1px solid var(--pf-border);
          background: rgba(255, 255, 255, 0.025);
        }
        .pf-badge i {
          width: 7px; height: 7px; border-radius: 50%; background: #2ecc71;
          box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.5);
          animation: pf-ping 2s ease-out infinite;
        }
        @keyframes pf-ping {
          0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.5); }
          100% { box-shadow: 0 0 0 9px rgba(46, 204, 113, 0); }
        }

        .pf-name {
          font-size: clamp(2.4rem, 6vw, 4.2rem); font-weight: 800; line-height: 1.08;
          letter-spacing: -0.02em; color: var(--pf-text-strong); margin-bottom: 0.9rem;
        }
        .pf-name span {
          background: linear-gradient(90deg, var(--pf-red), var(--pf-accent));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .pf-role {
          font-size: clamp(1.15rem, 2.4vw, 1.55rem); min-height: 2.2rem; margin-bottom: 1rem;
        }
        .pf-typed { color: var(--pf-accent); font-weight: 600; }
        .pf-caret {
          display: inline-block; width: 2px; height: 1.1em; margin-left: 4px;
          vertical-align: text-bottom; background: var(--pf-red);
          animation: pf-blink 1s steps(1) infinite;
        }
        @keyframes pf-blink { 50% { opacity: 0; } }
        .pf-desc { max-width: 35rem; opacity: 0.82; line-height: 1.75; }

        .pf-cta { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-top: 1.75rem; }
        .pf-btn {
          display: inline-block; padding: 0.72rem 1.5rem; border-radius: 8px;
          font-size: 0.9rem; font-weight: 600; letter-spacing: 0.03em;
          text-decoration: none; cursor: pointer; border: 1px solid transparent;
          transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }
        .pf-btn:hover { transform: translateY(-2px); }
        .pf-btn--primary { background: var(--pf-accent); color: #0a0707; }
        .pf-btn--primary:hover { background: #e6c14e; color: #0a0707; }
        .pf-btn--ghost { border-color: rgba(212, 175, 55, 0.4); color: var(--pf-accent); background: transparent; }
        .pf-btn--ghost:hover { border-color: var(--pf-accent); background: rgba(212, 175, 55, 0.08); color: var(--pf-accent); }

        .pf-hero-stats {
          display: flex; flex-wrap: wrap; gap: 2.2rem; margin-top: 2.6rem;
          padding-top: 1.6rem; border-top: 1px solid var(--pf-border); max-width: 35rem;
        }
        .pf-hero-stats strong { display: block; font-size: 1.5rem; font-weight: 700; color: var(--pf-text-strong); }
        .pf-hero-stats span { font-size: 0.78rem; letter-spacing: 0.04em; opacity: 0.65; }

        /* Photo */
        .pf-photo-wrap { position: relative; width: clamp(230px, 30vw, 340px); }
        .pf-photo-wrap::before {
          content: ""; position: absolute; inset: 0; transform: translate(16px, 16px);
          border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 22px;
        }
        .pf-photo {
          position: relative; display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover;
          border-radius: 22px; border: 1px solid var(--pf-border);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55), 0 0 50px rgba(193, 18, 31, 0.15);
        }
        .pf-float {
          position: absolute; left: -22px; bottom: 28px; padding: 0.7rem 1rem;
          border-radius: 12px; background: var(--pf-bg-nav);
          -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
          border: 1px solid var(--pf-border); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .pf-float span { display: block; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--pf-accent); }
        .pf-float strong { font-size: 0.86rem; font-weight: 600; color: var(--pf-text-strong); }

        /* ---------- Sections ---------- */
        .pf-section { padding: 6.5rem 0; border-top: 1px solid var(--pf-border); background: var(--pf-bg); }
        .pf-section--alt { background: var(--pf-bg-alt); }

        .pf-head { margin-bottom: 3rem; }
        .pf-eyebrow {
          color: var(--pf-text); opacity: 0.8; font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.22em; margin-bottom: 0.7rem;
        }
        .pf-eyebrow b { color: var(--pf-accent); font-weight: 700; }
        .pf-h2 {
          font-size: clamp(1.8rem, 3.6vw, 2.5rem); font-weight: 800; letter-spacing: -0.015em;
          color: var(--pf-text-strong); margin: 0;
        }
        .pf-h3 { font-size: 1.08rem; font-weight: 700; color: var(--pf-text-strong); margin-bottom: 0.55rem; }
        .pf-text { line-height: 1.85; opacity: 0.85; margin-bottom: 1.1rem; }
        .pf-muted { opacity: 0.75; line-height: 1.7; margin: 0; font-size: 0.95rem; }

        .pf-reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
          transition-delay: var(--d, 0s);
        }
        .pf-reveal.is-in { opacity: 1; transform: none; }

        /* Cards */
        .pf-card {
          position: relative; overflow: hidden; padding: 1.7rem; border-radius: 14px;
          background: rgba(255, 255, 255, 0.022); border: 1px solid var(--pf-border);
          transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
        }
        .pf-card::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--pf-red), var(--pf-accent));
          transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
        }
        .pf-card:hover { transform: translateY(-4px); border-color: rgba(212, 175, 55, 0.4); background: rgba(212, 175, 55, 0.03); }
        .pf-card:hover::before { transform: scaleX(1); }

        .pf-num { display: block; color: var(--pf-red); font-weight: 800; font-size: 1.3rem; margin-bottom: 0.7rem; }
        .pf-tag {
          display: inline-block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--pf-accent); margin-bottom: 0.7rem;
        }
        .pf-chips { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 1.1rem 0 0; }
        .pf-chips li {
          font-size: 0.8rem; padding: 0.3rem 0.75rem; border-radius: 999px;
          border: 1px solid var(--pf-border); color: var(--pf-text);
          background: rgba(255, 255, 255, 0.02);
        }

        /* ---------- Skills ---------- */
        .pf-skill-card { display: flex; flex-direction: column; }
        .pf-skill-card::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0;
          background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(212, 175, 55, 0.13), transparent 70%);
          transition: opacity 0.35s ease;
        }
        .pf-skill-card:hover::after { opacity: 1; }
        .pf-skill-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.9rem; }
        .pf-skill-n { color: var(--pf-red); font-weight: 800; font-size: 1.3rem; }
        .pf-skill-count {
          font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.2rem 0.6rem; border-radius: 999px; border: 1px solid var(--pf-border); opacity: 0.8;
        }
        .pf-skill-chips { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 1.3rem 0 0; position: relative; z-index: 1; }
        .pf-skill-chip {
          font-size: 0.82rem; font-weight: 500; padding: 0.35rem 0.85rem; border-radius: 999px;
          border: 1px solid var(--pf-border); color: var(--pf-text-strong);
          background: rgba(255, 255, 255, 0.03);
          opacity: 0; transform: translateY(10px) scale(0.88);
          transition:
            opacity 0.5s ease calc(0.25s + var(--i) * 0.07s),
            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) calc(0.25s + var(--i) * 0.07s),
            background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
          cursor: default;
        }
        .is-in .pf-skill-chip { opacity: 1; transform: none; }
        .is-in .pf-skill-chip:hover {
          transform: translateY(-3px);
          background: var(--pf-accent); color: #0a0707; border-color: var(--pf-accent);
          transition-delay: 0s;
        }

        /* Ticker */
        .pf-ticker-wrap {
          margin-top: 3.5rem; display: grid; gap: 0.9rem;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .pf-ticker { overflow: hidden; }
        .pf-ticker-track {
          display: flex; width: max-content; gap: 0.9rem;
          animation: pf-marquee 34s linear infinite;
        }
        .pf-ticker-track.is-reverse { animation-direction: reverse; animation-duration: 40s; }
        .pf-ticker-wrap:hover .pf-ticker-track { animation-play-state: paused; }
        @keyframes pf-marquee { to { transform: translateX(calc(-50% - 0.45rem)); } }
        .pf-ticker-item {
          display: inline-flex; align-items: center; gap: 0.6rem; white-space: nowrap;
          padding: 0.65rem 1.3rem; border-radius: 10px; font-size: 0.9rem; font-weight: 500;
          color: var(--pf-text-strong); border: 1px solid var(--pf-border);
          background: rgba(255, 255, 255, 0.025);
          transition: border-color 0.25s ease, color 0.25s ease;
        }
        .pf-ticker-item i { width: 6px; height: 6px; border-radius: 50%; background: var(--pf-red); }
        .pf-ticker-item:hover { border-color: var(--pf-accent); color: var(--pf-accent); }

        /* Stats */
        .pf-stat {
          padding: 1.4rem 1rem; text-align: center; border-radius: 14px;
          border: 1px solid var(--pf-border); background: rgba(255, 255, 255, 0.022);
        }
        .pf-stat strong { display: block; font-size: 1.8rem; font-weight: 800; color: var(--pf-accent); }
        .pf-stat span { font-size: 0.8rem; opacity: 0.7; }

        /* ---------- Achievements (card stack) ---------- */
        .pf-ach-stage {
          --shift: 58%;
          position: relative; display: flex; align-items: center; justify-content: center;
          height: clamp(250px, 40vw, 390px); perspective: 1300px;
        }
        .pf-ach-card {
          position: absolute; width: clamp(210px, 36vw, 440px); aspect-ratio: 4 / 3;
          padding: 0; overflow: hidden; border-radius: 16px; cursor: pointer;
          border: 1px solid var(--pf-border); background: #0d0a0a; color: inherit;
          transition:
            transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.5s ease,
            border-color 0.3s ease, box-shadow 0.5s ease;
          will-change: transform;
        }
        .pf-ach-card img { display: block; width: 100%; height: 100%; object-fit: contain; user-select: none; }
        .pf-ach-card.is-center {
          z-index: 3; cursor: zoom-in; transform: translateX(0) scale(1);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6), 0 0 44px rgba(193, 18, 31, 0.2);
        }
        .pf-ach-card.is-left {
          z-index: 1; filter: brightness(0.5);
          transform: translateX(calc(var(--shift) * -1)) scale(0.8) rotateY(14deg);
        }
        .pf-ach-card.is-right {
          z-index: 1; filter: brightness(0.5);
          transform: translateX(var(--shift)) scale(0.8) rotateY(-14deg);
        }
        .pf-ach-card.is-left:hover, .pf-ach-card.is-right:hover { filter: brightness(0.78); border-color: rgba(212, 175, 55, 0.45); }
        .pf-ach-fallback {
          display: flex; align-items: center; justify-content: center; height: 100%; padding: 1.5rem;
          text-align: center; font-weight: 700; color: var(--pf-text-strong);
          background:
            radial-gradient(ellipse at 20% 0%, rgba(193, 18, 31, 0.25), transparent 65%),
            linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px) 0 0 / 100% 26px;
        }
        .pf-ach-foot { display: grid; justify-items: center; gap: 1.1rem; margin-top: 2.2rem; text-align: center; }
        .pf-ach-cap { animation: pf-cap 0.45s ease; }
        .pf-ach-cap .pf-h3 { margin: 0; font-size: 1.2rem; }
        @keyframes pf-cap { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .pf-ach-dots { display: flex; gap: 0.6rem; }
        .pf-ach-dot {
          width: 10px; height: 10px; padding: 0; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(212, 175, 55, 0.5); background: transparent;
          transition: width 0.3s ease, background-color 0.3s ease;
        }
        .pf-ach-dot.is-on { width: 28px; background: var(--pf-accent); }
        .pf-ach-card:focus-visible, .pf-ach-dot:focus-visible, .pf-lb-x:focus-visible {
          outline: 2px solid var(--pf-accent); outline-offset: 4px;
        }
        @media (max-width: 991.98px) { .pf-ach-card { width: clamp(210px, 44vw, 440px); } .pf-ach-stage { --shift: 55%; } }
        @media (max-width: 575.98px) { .pf-ach-card { width: 62vw; } .pf-ach-stage { --shift: 40%; } }

        .pf-lb {
          position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center;
          padding: 1.5rem; background: rgba(5, 3, 3, 0.94); cursor: zoom-out; animation: pf-cap 0.25s ease;
        }
        .pf-lb img { max-width: 100%; max-height: 100%; border-radius: 12px; border: 1px solid var(--pf-border); cursor: default; }
        .pf-lb-x {
          position: absolute; top: 1rem; right: 1rem; width: 44px; height: 44px; border-radius: 50%;
          font-size: 1.1rem; cursor: pointer; color: var(--pf-text-strong);
          background: rgba(10, 7, 7, 0.7); border: 1px solid var(--pf-border);
        }

        /* ---------- Resume ---------- */
        .pf-resume-points { list-style: none; padding: 0; margin: 0 0 0.4rem; display: grid; gap: 0.6rem; }
        .pf-resume-points li { position: relative; padding-left: 1.3rem; opacity: 0.9; }
        .pf-resume-points li::before {
          content: ""; position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px;
          border-radius: 50%; background: var(--pf-red);
        }
        .pf-resume-actions { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1.8rem; }

        .pf-doc {
          position: relative; width: min(100%, 320px); aspect-ratio: 3 / 4; padding: 1.6rem; border-radius: 14px;
          border: 1px solid var(--pf-border); background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(193, 18, 31, 0.12);
          transform: rotate(-2deg); transition: transform 0.4s ease;
          display: flex; flex-direction: column; gap: 1.1rem;
        }
        .pf-doc:hover { transform: rotate(0deg) translateY(-4px); }
        .pf-doc-badge {
          position: absolute; top: -12px; right: 18px; padding: 0.25rem 0.7rem; border-radius: 8px;
          font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; color: var(--pf-text-strong);
          background: linear-gradient(135deg, var(--pf-red), rgba(212, 175, 55, 0.8));
        }
        .pf-doc-head { display: flex; align-items: center; gap: 0.9rem; }
        .pf-doc-head i { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--pf-red), var(--pf-accent)); opacity: 0.85; }
        .pf-doc-head div { flex: 1; display: grid; gap: 0.5rem; }
        .pf-doc b { display: block; height: 7px; border-radius: 4px; background: rgba(255, 255, 255, 0.12); }
        .pf-doc-head b:first-child { width: 70%; background: rgba(212, 175, 55, 0.45); }
        .pf-doc-head b:last-child { width: 45%; }
        .pf-doc-block { display: grid; gap: 0.55rem; }
        .pf-doc-block b:nth-child(2) { width: 88%; }
        .pf-doc-block b:nth-child(3) { width: 64%; }

        /* Contact */
        .pf-contact-card { display: flex; flex-direction: column; gap: 0.35rem; text-decoration: none; color: inherit; }
        .pf-contact-card strong { color: var(--pf-text-strong); font-size: 1rem; font-weight: 600; word-break: break-word; }
        .pf-contact-card small { opacity: 0.6; font-size: 0.82rem; }

        /* Footer */
        .pf-footer { padding: 2.2rem 0; border-top: 1px solid var(--pf-border); background: var(--pf-bg-alt); font-size: 0.85rem; }
        .pf-footer .container { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between; align-items: center; }
        .pf-foot-links { display: flex; flex-wrap: wrap; gap: 1.4rem; list-style: none; margin: 0; padding: 0; }
        .pf-foot-links a { color: var(--pf-text); text-decoration: none; transition: color 0.25s ease; }
        .pf-foot-links a:hover { color: var(--pf-accent); }

        @media (max-width: 991.98px) {
          .pf-float { left: -8px; }
        }
        @media (max-width: 575.98px) {
          .pf-section { padding: 4.5rem 0; }
          .pf-hero-stats { gap: 1.5rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pf-panel, .pf-link, .pf-link::after, .pf-bar, .pf-brand, .pf-nav, .pf-card, .pf-card::before, .pf-btn {
            transition: none !important;
          }
          .pf-rise { animation: none; opacity: 1; transform: none; }
          .pf-caret, .pf-badge i { animation: none; }
          .pf-reveal { opacity: 1; transform: none; transition: none; }
          .pf-skill-chip { opacity: 1; transform: none; transition: none; }
          .pf-skill-card::after { display: none; }
          .pf-ach-card, .pf-ach-dot, .pf-doc { transition: none !important; }
          .pf-ach-cap, .pf-lb { animation: none; }
          .pf-ticker-wrap { -webkit-mask-image: none; mask-image: none; }
          .pf-ticker { overflow: visible; }
          .pf-ticker-track { animation: none; flex-wrap: wrap; width: auto; }
          .pf-ticker-item[aria-hidden="true"] { display: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      <Navbar page={page} />

      {page === "home" && (
        <>
          <Hero />
          <About />
          <Services />
          <Achievements />
          <Resume />
          <Contact />
        </>
      )}
      {page === "projects" && <ProjectsShowcase />}
      {page === "skills" && <SkillsShowcase />}

    <footer className="pf-footer">
  <div className="container">
    <span>
      © {new Date().getFullYear()} Sabari Ragu. All rights reserved.
    </span>

    <ul className="pf-foot-links">
      <li>
        <a href="#home">Back to top</a>
      </li>
      <li>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </li>
      <li>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </li>
      <li>
        <a href={`mailto:${EMAIL}`}>Email</a>
      </li>
    </ul>
  </div>
</footer>
    </>
  );
}