import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const closeMenu = () => setIsOpen(false);

  const handleLinkClick = (href) => {
    setActive(href);
    closeMenu();
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Reset menu state when resizing up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="pf-header">
      <nav className="navbar navbar-expand-lg pf-nav" aria-label="Main navigation">
        <div className="container">
          <a
            className="pf-brand"
            href="#home"
            onClick={() => handleLinkClick("#home")}
          >
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

          <div
            id="pf-nav-panel"
            className={`navbar-collapse pf-panel ${isOpen ? "is-open" : ""}`}
          >
            <ul className="navbar-nav ms-lg-auto pf-links">
              {NAV_LINKS.map(({ label, href }) => (
                <li className="nav-item" key={href}>
                  <a
                    href={href}
                    className={`pf-link ${active === href ? "active" : ""}`}
                    aria-current={active === href ? "page" : undefined}
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

export default function Home() {
  return (
    <>
      <style>{`
        :root {
  --pf-bg: #050505;
  --pf-bg-nav: rgba(8, 6, 6, 0.8);
  --pf-border: rgba(212, 175, 55, 0.16);
  --pf-text: #d6cfc2;
  --pf-text-strong: #f8f1e0;
  --pf-accent: #d4af37;        /* gold */
  --pf-red: #c1121f;           /* red */
  --pf-nav-height: 68px;
}

        html { scroll-behavior: smooth; }
        body {
          background: var(--pf-bg);
          overflow-x: hidden;
        }
        /* Offset future section anchors for the fixed navbar */
        section[id] { scroll-margin-top: calc(var(--pf-nav-height) + 8px); }

        .pf-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1030;
        }

        .pf-nav {
          min-height: var(--pf-nav-height);
          padding: 0;
          background: var(--pf-bg-nav);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--pf-border);
        }
        .pf-nav .container {
          min-height: var(--pf-nav-height);
          flex-wrap: wrap;
          align-items: center;
        }

        /* Brand */
        .pf-brand {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.18em;
          color: var(--pf-text-strong);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .pf-brand:hover { color: var(--pf-accent); }
        .pf-brand-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--pf-red);
  box-shadow: 0 0 8px rgba(193, 18, 31, 0.65);
}

        /* Links */
        .pf-links {
          gap: 0.25rem;
          margin: 0;
          padding: 0;
        }
        .pf-link {
          position: relative;
          display: block;
          padding: 0.5rem 0.9rem;
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--pf-text);
          text-decoration: none;
          border-radius: 6px;
          transition: color 0.25s ease, background-color 0.25s ease;
        }
        .pf-link::after {
          content: "";
          position: absolute;
          left: 0.9rem;
          right: 0.9rem;
          bottom: 0.2rem;
          height: 2px;
background: linear-gradient(90deg, var(--pf-red), var(--pf-accent));          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .pf-link:hover { color: var(--pf-text-strong); }
        .pf-link:hover::after { transform: scaleX(0.4); }
        .pf-link.active { color: var(--pf-accent); }
        .pf-link.active::after { transform: scaleX(1); }

        /* Focus indicators */
        .pf-brand:focus-visible,
        .pf-link:focus-visible,
        .pf-toggler:focus-visible {
          outline: 2px solid var(--pf-accent);
          outline-offset: 3px;
        }

        /* Hamburger */
        .pf-toggler {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          padding: 0 10px;
          background: transparent;
          border: 1px solid var(--pf-border);
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.25s ease;
        }
.pf-toggler:hover { border-color: rgba(212, 175, 55, 0.55); }
        .pf-bar {
          display: block;
          height: 2px;
          width: 100%;
          background: var(--pf-text-strong);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.2s ease;
        }
        .pf-toggler.is-open .pf-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .pf-toggler.is-open .pf-bar:nth-child(2) { opacity: 0; }
        .pf-toggler.is-open .pf-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile panel (animated open/close) */
        @media (max-width: 991.98px) {
          .pf-panel {
            max-height: 0;
            overflow: hidden;
            visibility: hidden;
            opacity: 0;
            transition: max-height 0.35s ease, opacity 0.25s ease, visibility 0s linear 0.35s;
          }
          .pf-panel.is-open {
            max-height: 360px;
            visibility: visible;
            opacity: 1;
            transition: max-height 0.35s ease, opacity 0.25s ease, visibility 0s;
          }
          .pf-links {
            padding: 0.5rem 0 1rem;
            gap: 0;
          }
          .pf-link {
            padding: 0.75rem 0.5rem;
            font-size: 1rem;
            border-bottom: 1px solid var(--pf-border);
            border-radius: 0;
          }
          .pf-link::after { display: none; }
.pf-link.active { background: rgba(193, 18, 31, 0.1); }        }

        @media (min-width: 992px) {
          .pf-panel { visibility: visible; opacity: 1; max-height: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pf-panel, .pf-link, .pf-link::after, .pf-bar, .pf-brand {
            transition: none !important;
          }
          html { scroll-behavior: auto; }
        }
      `}</style>

      <Navbar />
    </>
  );
}