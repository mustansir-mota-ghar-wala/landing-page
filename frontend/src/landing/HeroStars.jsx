import { useEffect, useRef } from "react";

export default function HeroStars({ light, className = "hero-stars" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !context || !host) return undefined;

    let frame = 0;
    let running = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function measure() {
      const rect = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(Math.max(rect.width, 1) * ratio);
      canvas.height = Math.floor(Math.max(rect.height, 1) * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      return rect;
    }

    const view = measure();
    const area = Math.max(1, view.width * view.height);
    const count = Math.round(Math.min(5600, Math.max(90, area / 220)));
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * view.width,
      y: Math.random() * view.height,
      s: Math.random() < 0.86 ? 0.7 + Math.random() * 0.55 : 1.35 + Math.random() * 0.55,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -0.04 - Math.random() * 0.1,
      tone: Math.random() > 0.9 ? 2 : Math.random() > 0.72 ? 1 : 0,
    }));
    stars.sort((a, b) => a.tone - b.tone);
    const darkColors = ["#ffffff", "#bae6fd", "#ddd6fe"];
    const lightColors = ["#0f172a", "#1d4ed8", "#4338ca"];

    function paint(now) {
      if (!running) return;
      const rect = host.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      context.globalAlpha = reduced ? 0.8 : 0.7 + Math.sin(now / 700) * 0.25;
      const colors = light ? lightColors : darkColors;
      let tone = -1;
      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        if (!reduced) {
          star.x += star.vx;
          star.y += star.vy;
          if (star.x < -2) star.x = rect.width + 2;
          if (star.x > rect.width + 2) star.x = -2;
          if (star.y < -2) star.y = rect.height + 2;
          if (star.y > rect.height + 2) star.y = -2;
        }
        if (star.tone !== tone) {
          tone = star.tone;
          context.fillStyle = colors[tone];
        }
        context.fillRect(star.x, star.y, star.s, star.s);
      }
      context.globalAlpha = 1;
      if (!reduced) frame = window.requestAnimationFrame(paint);
    }

    function onHide() {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(frame);
        return;
      }
      if (!running && !reduced) {
        running = true;
        frame = window.requestAnimationFrame(paint);
      }
    }

    frame = window.requestAnimationFrame(paint);
    const observer = new ResizeObserver(() => measure());
    observer.observe(host);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [light]);

  return <canvas className={className} ref={canvasRef} aria-hidden="true" />;
}
