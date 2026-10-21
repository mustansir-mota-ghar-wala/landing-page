import { useEffect, useRef } from "react";
import HeroStars from "./HeroStars";

export default function PageSpace({ light }) {
  const stage = useRef(null);

  useEffect(() => {
    const root = stage.current?.closest(".page-shell");
    if (!root) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lookX = 0;
    let lookY = 0;
    let curX = 0;
    let curY = 0;
    let frame = 0;

    function onMove(event) {
      lookX = (event.clientX / window.innerWidth - 0.5) * 2;
      lookY = (event.clientY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--px", String((event.clientX / window.innerWidth).toFixed(3)));
      root.style.setProperty("--py", String((event.clientY / window.innerHeight).toFixed(3)));
    }

    function tick() {
      curX += (lookX - curX) * 0.06;
      curY += (lookY - curY) * 0.06;
      root.style.setProperty("--look-x", curX.toFixed(3));
      root.style.setProperty("--look-y", curY.toFixed(3));
      frame = window.requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    if (!reduce) frame = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="page-space" ref={stage} aria-hidden="true">
      <HeroStars light={light} className="page-stars" />
      <div className="page-nebula" />
      <div className="page-planet-stage">
        <span className="page-ring" />
        <span className="page-ring two" />
        <span className="page-orb">
          <i />
        </span>
        <span className="page-orbit a"><i className="page-sat" /></span>
        <span className="page-orbit b"><i className="page-sat" /></span>
        <span className="page-orbit c"><i className="page-sat" /></span>
      </div>
    </div>
  );
}
