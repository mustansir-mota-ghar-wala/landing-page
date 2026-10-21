import { useState } from "react";
import { useLocation } from "react-router-dom";
import LandingFooter from "../landing/LandingFooter";
import LandingNav from "../landing/LandingNav";
import PageDepth from "../landing/PageDepth";
import "../landing/page-theme.css";

const THEME_KEY = "cad-theme";

function storedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export default function PageFrame({ children }) {
  const features = useLocation().pathname === "/product";
  const [theme, setTheme] = useState(storedTheme);
  const visual = features ? "light" : theme;

  function toggleTheme() {
    if (features) return;
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage can be blocked */
    }
  }

  return (
    <div className={`cine page-shell${visual === "light" ? " theme-light" : ""}${features ? " lookbook-shell" : ""}`}>
      {!features && <PageDepth />}
      <LandingNav theme={visual} onToggleTheme={toggleTheme} stars={false} />
      {children}
      <LandingFooter />
    </div>
  );
}
