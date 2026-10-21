import { useRef, useState } from "react";

const photos = {
  compliance: "compliance",
  collaboration: "clients",
  tasks: "tasks",
  documents: "documents",
  finance: "finance",
  roles: "access",
  reports: "reports",
  alerts: "alerts",
  mobile: "mobile",
  dashboards: "dashboards",
  quotes: "quotes",
  expenses: "expenses",
  ai: "reports",
  "sme-compliance": "compliance",
  "sme-collab": "clients",
  "sme-work": "tasks",
  "sme-docs": "documents",
  "sme-roles": "access",
  "sme-reports": "reports",
  "sme-mobile": "mobile",
};

export function photoFor(id) {
  return `/features/photo-${photos[id] || "compliance"}.jpg`;
}

export default function PhotoDeck({ items, current, onChange }) {
  const index = Math.max(0, items.findIndex((item) => item.id === current));
  const [pose, setPose] = useState("idle");
  const timer = useRef(null);
  const count = items.length || 1;

  function at(offset) {
    return items[(index + offset + count) % count];
  }

  function go(dir) {
    if (!items.length || timer.current) return;
    const step = dir > 0 ? 1 : -1;
    setPose(step > 0 ? "next" : "prev");
    timer.current = window.setTimeout(() => {
      timer.current = null;
      setPose("idle");
      onChange(at(step).id);
    }, 480);
  }

  const stack = pose === "prev" ? [-1, 0, 1] : [0, 1, 2];

  return (
    <div className="deck">
      <button type="button" className="deck-arrow back" aria-label="Previous feature" onClick={() => go(-1)}>
        ‹
      </button>
      <div className={`deck-stage ${pose}`} aria-live="polite">
        {stack.map((offset) => {
          const item = at(offset);
          const role = pose === "prev" && offset === -1 ? "incoming" : `depth-${offset < 0 ? 0 : offset}`;
          const behind = offset > 0 && pose === "idle";
          return (
            <article
              className={`deck-card ${role}`}
              key={item.id}
              style={{ zIndex: offset < 0 ? 5 : 4 - offset }}
              role={behind ? "button" : undefined}
              tabIndex={behind ? 0 : undefined}
              aria-label={behind ? `Show ${item.title}` : undefined}
              onClick={behind ? () => go(1) : undefined}
              onKeyDown={behind ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  go(1);
                }
              } : undefined}
            >
              <img src={photoFor(item.id)} alt="" />
              {((pose === "idle" && offset === 0) || (pose === "next" && offset === 1) || (pose === "prev" && offset === -1)) && (
                <div className="photo-label">
                  <strong>{item.title}</strong>
                  <span>{item.summary}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <button type="button" className="deck-arrow forward" aria-label="Next feature" onClick={() => go(1)}>
        ›
      </button>
    </div>
  );
}
