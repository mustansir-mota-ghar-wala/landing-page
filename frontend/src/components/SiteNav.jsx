import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  ["Home", "/"],
  ["Product", "/product"],
  ["For SME", "/sme"],
  ["Pricing", "/pricing"],
  ["Customers", "/customers"],
  ["FAQ", "/faq"],
  ["Login", "/login"],
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="container py-2 d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center justify-content-between flex-grow-1 flex-lg-grow-0">
          <NavLink to="/" className="nav-brand" onClick={() => setOpen(false)}>
            <span className="leaf" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3c2 4 2 7 0 10 4-1 7-4 8-8-3 0-6 0-8-2Z" fill="#fff" />
                <path d="M12 13c-2 3-2 5 0 8 2-3 2-5 0-8Z" fill="#fff" />
              </svg>
            </span>
            <span className="nav-brand-name">CADASHBOARD</span>
          </NavLink>
          <button className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <nav className={`nav-links ${open ? "open" : ""} justify-content-end`}>
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => {
              setOpen(false);
              if (to === "/") window.scrollTo(0, 0);
            }}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/trial" className="nav-trial" onClick={() => setOpen(false)}>
            Start free trial
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
