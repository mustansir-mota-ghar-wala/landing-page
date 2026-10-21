import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import AiSection from "../landing/AiSection";
import DemoClose from "../landing/DemoClose";
import FeatureUniverse from "../landing/FeatureUniverse";
import LandingFooter from "../landing/LandingFooter";
import HeroStars from "../landing/HeroStars";
import LandingNav from "../landing/LandingNav";
import ProductShowcase from "../landing/ProductShowcase";
import SpaceJourney, { PlanetGate } from "../landing/SpaceJourney";
import Testimonials from "../landing/Testimonials";
import "../landing/landing.css";

const THEME_KEY = "cad-theme";

function storedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function showOpening() {
  try {
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return true;
  }
}

const openingLines = ["Clients, work, money, and compliance.", "One firm. One login."];

function Typed({ text, caret }) {
  const head = text.slice(0, -1);
  const last = text.slice(-1);
  return (
    <>
      {head}
      {last && <em key={text}>{last}</em>}
      {caret && <i className="caret" />}
    </>
  );
}

function stickPoints() {
  const nodes = document.querySelectorAll(
    ".cine-mark, .cine-logo, .cine-nav a, .cine-nav summary, .theme-switch, .cine-menu, .cine-hero h1, .cine-hero-copy > p, .cine-actions a, .cine-chips li, .cine-hero",
  );
  const boxes = [...nodes]
    .map((node) => node.getBoundingClientRect())
    .filter((box) => box.width > 6 && box.height > 6 && box.bottom > 0 && box.top < window.innerHeight);
  const pool = boxes.length
    ? boxes
    : [{ left: 0, top: 0, width: window.innerWidth, height: window.innerHeight, right: window.innerWidth, bottom: window.innerHeight }];
  const points = [];
  pool.forEach((box) => {
    const count = Math.max(14, Math.round((box.width + box.height) / 8));
    for (let index = 0; index < count; index += 1) {
      const around = Math.random() < 0.78;
      const side = Math.floor(Math.random() * 4);
      const along = Math.random();
      if (!around) {
        points.push([box.left + Math.random() * box.width, box.top + Math.random() * box.height]);
      } else if (side === 0) points.push([box.left + along * box.width, box.top]);
      else if (side === 1) points.push([box.right, box.top + along * box.height]);
      else if (side === 2) points.push([box.left + along * box.width, box.bottom]);
      else points.push([box.left, box.top + along * box.height]);
    }
  });
  return points;
}

function Opening({ onDone }) {
  const layer = useRef(null);
  const canvasRef = useRef(null);
  const closed = useRef(false);
  const beginLeave = useRef(() => {});
  const [count, setCount] = useState(0);
  const total = openingLines[0].length + openingLines[1].length;
  const first = openingLines[0].slice(0, count);
  const second = openingLines[1].slice(0, Math.max(0, count - openingLines[0].length));

  const finish = useCallback(() => {
    if (closed.current) return;
    closed.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      beginLeave.current = () => finish();
      return undefined;
    }

    let frame = 0;
    let safety = 0;
    let mode = "drift";
    let gatherStart = 0;
    const gatherMs = 2000;
    const width = () => window.innerWidth;
    const height = () => window.innerHeight;
    const light = document.querySelector(".cine")?.classList.contains("theme-light");
    const countStars = Math.round(Math.min(14000, Math.max(8000, (width() * height()) / 90)));
    const stars = Array.from({ length: countStars }, () => {
      const roll = Math.random();
      return {
        x: Math.random() * width(),
        y: Math.random() * height(),
        r: roll < 0.9 ? 0.28 + Math.random() * 0.38 : 0.7 + Math.random() * 0.45,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -0.02 - Math.random() * 0.08,
        a: roll < 0.9 ? 0.45 + Math.random() * 0.55 : 0.85 + Math.random() * 0.15,
        tw: Math.random() * Math.PI * 2,
        tone: Math.random(),
        delay: Math.random() * 0.16,
      };
    });

    function fit() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width() * ratio);
      canvas.height = Math.floor(height() * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function paint(now) {
      context.clearRect(0, 0, width(), height());
      const gathering = mode === "gather";
      const progress = gathering ? Math.min(1, (now - gatherStart) / gatherMs) : 0;
      stars.forEach((star) => {
        if (!gathering) {
          star.x += star.vx;
          star.y += star.vy;
          if (star.x < -2) star.x = width() + 2;
          if (star.x > width() + 2) star.x = -2;
          if (star.y < -2) star.y = height() + 2;
          if (star.y > height() + 2) star.y = -2;
        } else {
          const local = Math.min(1, Math.max(0, (progress - star.delay) / (1 - star.delay)));
          const ease = 1 - (1 - local) ** 3;
          star.x = star.sx + (star.tx - star.sx) * ease;
          star.y = star.sy + (star.ty - star.sy) * ease;
        }
        const twinkle = 0.55 + Math.sin(now / 380 + star.tw) * 0.45;
        const fade = gathering && progress > 0.9 ? 1 - (progress - 0.9) / 0.1 : 1;
        context.globalAlpha = Math.max(0, star.a * twinkle * fade);
        if (light) {
          context.fillStyle = star.tone > 0.72 ? "#4338ca" : star.tone > 0.4 ? "#1d4ed8" : "#0f172a";
        } else {
          context.fillStyle = star.tone > 0.9 ? "#ddd6fe" : star.tone > 0.74 ? "#bae6fd" : "#ffffff";
        }
        const radius = Math.max(0.32, gathering ? star.r * (1 - progress * 0.25) : star.r);
        context.beginPath();
        context.arc(star.x, star.y, radius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      if (gathering && progress >= 1) {
        finish();
        return;
      }
      frame = window.requestAnimationFrame(paint);
    }

    beginLeave.current = () => {
      if (mode === "gather") {
        finish();
        return;
      }
      const spots = stickPoints();
      if (!spots.length) spots.push([width() / 2, height() / 2]);
      stars.forEach((star, index) => {
        const spot = spots[index % spots.length];
        star.sx = star.x;
        star.sy = star.y;
        star.tx = spot[0];
        star.ty = spot[1];
      });
      mode = "gather";
      gatherStart = performance.now();
      layer.current?.classList.add("leaving");
      document.querySelector(".cine")?.classList.add("revealing");
      safety = window.setTimeout(() => finish(), 2100);
    };

    fit();
    frame = window.requestAnimationFrame(paint);
    window.addEventListener("resize", fit);
    return () => {
      window.clearTimeout(safety);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", fit);
    };
  }, [finish]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (count >= total) {
      const hold = window.setTimeout(() => beginLeave.current(), 680);
      return () => window.clearTimeout(hold);
    }
    const step = window.setTimeout(() => setCount((value) => value + 1), 46);
    return () => window.clearTimeout(step);
  }, [count, total]);

  useEffect(() => {
    function skip(event) {
      if (event.type === "keydown" && event.key !== "Escape") return;
      beginLeave.current();
    }
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  return (
    <button
      type="button"
      className="cine-intro"
      ref={layer}
      aria-label="Continue to the page"
      onClick={() => beginLeave.current()}
    >
      <span className="space-veil" aria-hidden="true" />
      <canvas className="star-field" ref={canvasRef} aria-hidden="true" />
      <p aria-hidden="true">
        <Typed text={first} caret={count < openingLines[0].length} />
        <span className="accent-row">
          <span className="accent">
            <Typed text={second} />
          </span>
          {count >= openingLines[0].length && count < total && <i className="caret" />}
        </span>
      </p>
    </button>
  );
}

export default function Home() {
  const [theme, setTheme] = useState(storedTheme);
  const [opening, setOpening] = useState(showOpening);
  const [journey, setJourney] = useState(false);
  const filmRef = useRef(null);
  const closeOpening = useCallback(() => setOpening(false), []);
  const stopFilm = useCallback(() => {
    const node = filmRef.current;
    if (!node) return;
    node.pause();
    node.currentTime = 0;
  }, []);
  const landHome = useCallback(() => {
    stopFilm();
    setJourney(false);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }, [stopFilm]);
  function openJourney() {
    flushSync(() => setJourney(true));
    const node = filmRef.current;
    if (!node) return;
    node.muted = false;
    node.defaultMuted = false;
    node.volume = 1;
    node.currentTime = 0;
    node.play();
  }

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
    <div className={`${theme === "light" ? "cine theme-light" : "cine"}${opening ? " opening" : " landed"}`} id="top">
      {opening && <Opening onDone={closeOpening} />}
      <LandingNav theme={theme} onToggleTheme={toggleTheme} stars={!opening} />
      <section className="cine-hero">
        {!opening && <HeroStars light={theme === "light"} />}
        {!opening && <PlanetGate onEnter={openJourney} />}
        {!opening && (
          <a className="hero-scroll" href="#features" aria-label="Scroll down">
            <svg viewBox="0 0 28 28" aria-hidden="true">
              <path d="M6 8l8 8 8-8" />
            </svg>
          </a>
        )}
        <div className="cine-hero-copy">
          <p className="cine-kicker rise d1">Built for modern CA firms</p>
          <h1>
            <span className="rise d2">Your CA Practice.</span>
            <span className="limit rise d3">Beyond Limits.</span>
          </h1>
          <p className="rise d4">Manage clients, automate workflows, track compliance and grow your CA practice — all in one powerful platform.</p>
          <div className="cine-actions">
            <a className="cine-btn rise d5" href="#demo">Book a Demo <span aria-hidden="true">→</span></a>
            <a className="cine-btn ghost rise d6" href="#features">Explore Features</a>
          </div>
          <ul className="cine-chips">
            <li className="rise d7">Trusted by CA Firms</li>
            <li className="rise d8">Secure & Compliant</li>
            <li className="rise d9">Easy to Use</li>
          </ul>
        </div>
      </section>
      <FeatureUniverse />
      <ProductShowcase />
      <AiSection />
      <Testimonials />
      <DemoClose />
      <LandingFooter />
      <SpaceJourney
        open={journey}
        filmRef={filmRef}
        onClose={() => {
          stopFilm();
          setJourney(false);
        }}
        onLand={landHome}
      />
    </div>
  );
}
