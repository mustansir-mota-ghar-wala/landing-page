import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Assistant from "./components/Assistant";
import PageFrame from "./components/PageFrame";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Customers from "./pages/Customers";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Product from "./pages/Product";
import Sme from "./pages/Sme";
import Terms from "./pages/Terms";
import Trial from "./pages/Trial";

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selector = "main [data-reveal], footer [data-reveal], .orbit-piece, .orbit-label";
    const rise = { fx: 0, fy: 48, fz: -260, rx: 18, ry: 0 };

    function listed() {
      return [...document.querySelectorAll(selector)];
    }

    function settle(node) {
      node.style.opacity = "1";
      node.style.transform = "none";
      node.style.pointerEvents = "";
      delete node.dataset.ty;
    }

    if (reduce || document.querySelector(".page-shell")) {
      listed().forEach(settle);
      return undefined;
    }

    function ease(value) {
      return value * value * (3 - 2 * value);
    }

    function documentTop(node) {
      let y = 0;
      let current = node;
      while (current && current !== document.body && current !== document.documentElement) {
        y += current.offsetTop;
        current = current.offsetParent;
      }
      return y;
    }

    function rowAnchor(node) {
      const foot = node.closest(".cine-foot");
      if (foot) return documentTop(foot);
      if (node.classList.contains("orbit-piece") || node.classList.contains("orbit-label")) {
        const map = node.closest(".orbit-map");
        return map ? documentTop(map) : documentTop(node);
      }
      const parent = node.parentElement;
      if (!parent) return documentTop(node);
      const style = getComputedStyle(parent);
      const horizontal = style.display.includes("flex") || style.display.includes("grid");
      const map = [...parent.children].find((child) => child.classList.contains("orbit-map"));
      if (map && horizontal) return documentTop(map);
      if (!horizontal) return documentTop(node);
      const kids = [...parent.children].filter((child) => child.matches("[data-reveal], .orbit-piece, .orbit-label"));
      if (kids.length < 2) return documentTop(node);
      const tops = kids.map((child) => child.offsetTop);
      const spread = Math.max(...tops) - Math.min(...tops);
      const oneRow = spread <= 72 || (kids.length <= 3 && parent.clientHeight > 0 && spread < parent.clientHeight * 0.4);
      if (oneRow) return documentTop(parent);
      const mine = node.offsetTop;
      const band = kids.filter((child) => Math.abs(child.offsetTop - mine) <= 24);
      if (band.length < 2) return documentTop(node);
      const lead = band.reduce((best, child) => (child.offsetTop < best.offsetTop ? child : best));
      return documentTop(lead);
    }

    function motion(node) {
      if (node.dataset.fx) {
        return {
          fx: parseFloat(node.dataset.fx) || 0,
          fy: parseFloat(node.dataset.fy) || 0,
          fz: parseFloat(node.dataset.fz) || 0,
          rx: parseFloat(node.dataset.rx) || 0,
          ry: parseFloat(node.dataset.ry) || 0,
        };
      }
      return rise;
    }

    const inner = Boolean(document.querySelector(".page-shell"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const view = window.innerHeight || 800;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - view);
      const atEnd = maxScroll - window.scrollY < 2;
      listed().forEach((node) => {
        const layout = rowAnchor(node);
        const top = layout - window.scrollY;
        const end = Math.max(view * 0.48, layout - maxScroll);
        const start = end + Math.max(140, view * 0.42);
        let progress = (start - top) / (start - end);
        if (atEnd) progress = 1;
        progress = Math.min(1, Math.max(0, progress));
        const t = ease(progress);
        node.style.transformOrigin = "50% 50%";
        if (t > 0.992) {
          node.style.opacity = "1";
          node.style.transform = "none";
          node.style.pointerEvents = "";
          return;
        }
        const left = 1 - t;
        if (inner) {
          node.style.opacity = String(0.35 + 0.65 * t);
          node.style.transform = `translate3d(0, ${16 * left}px, 0)`;
          node.style.pointerEvents = "";
          return;
        }
        const move = motion(node);
        node.style.opacity = String(0.45 + 0.55 * t);
        node.style.transform = `perspective(860px) translate3d(${move.fx * left}px, ${move.fy * left}px, ${move.fz * left}px) rotateX(${move.rx * left}deg) rotateY(${move.ry * left}deg)`;
        node.style.pointerEvents = t < 0.8 ? "none" : "";
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const main = document.querySelector("main");
    const changes = new MutationObserver(onScroll);
    if (main) changes.observe(main, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      changes.disconnect();
    };
  }, [pathname]);

  const tone = {
    "/": "tone-home",
    "/product": "tone-product",
    "/sme": "tone-sme",
    "/pricing": "tone-pricing",
    "/customers": "tone-customers",
    "/about": "tone-about",
    "/faq": "tone-faq",
    "/contact": "tone-contact",
    "/trial": "tone-trial",
    "/login": "tone-login",
  }[pathname] || "tone-home";

  const appPage = [
    "/product", "/sme", "/pricing", "/customers", "/about", "/faq", "/contact", "/trial", "/login", "/privacy", "/terms",
  ].includes(pathname);

  return (
    <>
      <main className={tone}>
        {appPage ? (
          <PageFrame>
            <Routes>
              <Route path="/product" element={<Product />} />
              <Route path="/sme" element={<Sme />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/trial" element={<Trial />} />
              <Route path="/login" element={<Login />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </PageFrame>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        )}
      </main>
      {appPage && pathname !== "/product" && <Assistant />}
    </>
  );
}
