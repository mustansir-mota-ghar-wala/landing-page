import { useEffect, useRef, useState } from "react";

const STATION = { x: 0.74, y: 0.44 };
const PHOTO = { w: 1280, h: 720 };
const FILM = "/landing/cad-ai-film.mp4";

export function PlanetGate({ onEnter }) {
  const ref = useRef(null);
  const [box, setBox] = useState(null);

  useEffect(() => {
    const hero = ref.current?.closest(".cine-hero");
    if (!hero) return undefined;
    const place = () => {
      const rect = hero.getBoundingClientRect();
      const scale = Math.max(rect.width / PHOTO.w, rect.height / PHOTO.h);
      const drawnW = PHOTO.w * scale;
      const drawnH = PHOTO.h * scale;
      const offsetX = rect.width - drawnW;
      const offsetY = (rect.height - drawnH) / 2;
      setBox({
        left: offsetX + STATION.x * drawnW,
        top: offsetY + STATION.y * drawnH,
      });
    };
    place();
    const watch = new ResizeObserver(place);
    watch.observe(hero);
    return () => watch.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className="planet-gate"
      aria-label="See CAD AI"
      onClick={onEnter}
      style={box ? { left: box.left, top: box.top } : undefined}
    >
      <span className="planet-ring" aria-hidden="true" />
      <span className="planet-call">See CAD AI</span>
    </button>
  );
}

export default function SpaceJourney({ open, onClose, onLand, filmRef }) {
  const done = useRef(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    done.current = false;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    const node = filmRef?.current;
    if (!open || !node || reduce) return undefined;
    const finish = () => {
      if (done.current) return;
      done.current = true;
      node.closest(".journey")?.classList.add("journey-landing");
      window.setTimeout(() => onLand(), 700);
    };
    node.addEventListener("ended", finish);
    return () => node.removeEventListener("ended", finish);
  }, [open, reduce, onLand, filmRef]);

  return (
    <div
      className={`journey${open ? "" : " is-idle"}${reduce ? " journey-quiet" : ""}`}
      role="dialog"
      aria-modal={open ? "true" : undefined}
      aria-hidden={!open}
      aria-label="CAD AI"
    >
      {open && <button type="button" className="journey-back" onClick={onClose}>Back to the page</button>}
      {reduce && open ? (
        <div className="journey-list">
          <article>
            <h2>CAD AI</h2>
            <p>An internal reporting assistant. A natural-language question. A read against this firm’s data. An answer. It is not a public chatbot. It is not WhatsApp.</p>
          </article>
          <button type="button" className="cine-btn" onClick={onLand}>Land on the homepage</button>
        </div>
      ) : (
        <video
          ref={filmRef}
          className="journey-film"
          src={FILM}
          playsInline
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          preload="auto"
        />
      )}
    </div>
  );
}
