import { useState } from "react";
import LandingFooter from "../landing/LandingFooter";
import LandingNav from "../landing/LandingNav";
import PageSpace from "../landing/PageSpace";
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
  const [theme, setTheme] = useState(storedTheme);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage can be blocked */
    }
  }

  return (
    <div className={`cine page-shell${theme === "light" ? " theme-light" : ""}`}>
      <PageSpace light={theme === "light"} />
      <LandingNav theme={theme} onToggleTheme={toggleTheme} stars={false} />
      {children}
      <LandingFooter />
    </div>
  );
}
