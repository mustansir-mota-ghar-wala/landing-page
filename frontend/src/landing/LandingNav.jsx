import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BrandMark from "./BrandMark";

function Play() {
  return (
    <svg className="nav-play" viewBox="0 0 8 10" aria-hidden="true">
      <path d="M1 1.2v7.6L7.2 5z" />
    </svg>
  );
}

function DemoLink({ to, href, onClick }) {
  const inner = (
    <>
      Book a Demo
      <span className="demo-arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M3 8h8M8 4l4 4-4 4" /></svg>
      </span>
    </>
  );
  if (href) {
    return <a className="cine-demo" href={href} onClick={onClick}>{inner}</a>;
  }
  return <Link className="cine-demo" to={to} onClick={onClick}>{inner}</Link>;
}

export default function LandingNav({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState("");
  const close = () => {
    setOpen(false);
    setDrop("");
  };
  const toggleDrop = (name) => (event) => {
    event.preventDefault();
    setDrop((value) => (value === name ? "" : name));
  };
  const light = theme === "light";
  const path = useLocation().pathname;
  const onHome = path === "/";
  const here = {
    home: onHome,
    features: path === "/product",
    solutions: path === "/sme",
    pricing: path === "/pricing",
    resources: ["/faq", "/customers", "/about", "/privacy", "/terms"].includes(path),
    login: path === "/login",
  };

  return (
    <header className="cine-nav">
      {onHome ? (
        <a className="cine-logo" href="#top" onClick={close}>
          <BrandMark />
          CA Dashboard
        </a>
      ) : (
        <Link className="cine-logo" to="/" onClick={close}>
          <BrandMark />
          CA Dashboard
        </Link>
      )}
      <nav className={open ? "open" : ""} aria-label="Primary">
        {onHome ? (
          <a className={here.home ? "is-here" : undefined} href="#top" onClick={close}>Home</a>
        ) : (
          <Link className={here.home ? "is-here" : undefined} to="/" onClick={close}>Home</Link>
        )}
        {onHome ? (
          <a href="#features" onClick={close}>Features</a>
        ) : (
          <Link className={here.features ? "is-here" : undefined} to="/product" onClick={close}>Features</Link>
        )}
        <details open={drop === "solutions"}>
          <summary className={here.solutions ? "is-here" : undefined} onClick={toggleDrop("solutions")}>
            <Play />
            Solutions
          </summary>
          <div>
            <Link to="/product" onClick={close}>For CA and CS firms</Link>
            <Link to="/sme" onClick={close}>For the client company</Link>
          </div>
        </details>
        <Link className={here.pricing ? "is-here" : undefined} to="/pricing" onClick={close}>Pricing</Link>
        <details open={drop === "resources"}>
          <summary className={here.resources ? "is-here" : undefined} onClick={toggleDrop("resources")}>
            <Play />
            Resources
          </summary>
          <div>
            <Link to="/faq" onClick={close}>FAQ</Link>
            <Link to="/customers" onClick={close}>Customers</Link>
            <Link to="/about" onClick={close}>About</Link>
          </div>
        </details>
        <span className="nav-spacer" />
        <Link className={`nav-login${here.login ? " is-here" : ""}`} to="/login" onClick={close}>Login</Link>
        {onHome ? (
          <DemoLink href="#demo" onClick={close} />
        ) : (
          <DemoLink to="/contact" onClick={close} />
        )}
      </nav>
      <div className="nav-end">
        <button
          className="theme-switch"
          type="button"
          aria-pressed={light}
          aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
          onClick={onToggleTheme}
        >
          {light ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          )}
        </button>
        <button className="cine-menu" type="button" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          {open ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h14" /></svg>
          )}
        </button>
      </div>
    </header>
  );
}
