import { useState } from "react";

const calm = new Set([
  "On",
  "Shared",
  "Full access",
  "Team access",
  "Approved",
  "Complete",
  "Set",
  "Available",
  "Shown",
  "Allowed",
  "Marked",
  "Billable",
  "Paid",
  "Inward",
  "Sent",
  "Accepted",
  "Adjusted",
]);

export default function FeatureStage({ module, plain = false }) {
  const [picked, setPicked] = useState({});
  const [viewId, setViewId] = useState("");
  if (!module) return null;

  const view = module.views?.find((item) => item.id === viewId) || module.views?.[0];

  return (
    <div className={plain ? "mt-1" : "preview"}>
      {!plain && <h2 className="h5 mb-2">{module.title}</h2>}
      {view && (
        <>
          <div className="chip-row mb-3">
            {module.views.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`chip ${view.id === item.id ? "active" : ""}`}
                onClick={() => setViewId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          {view.lines.map((line) => (
            <div className="check-row" key={line}>
              <strong>{line}</strong>
            </div>
          ))}
        </>
      )}
      {module.sample?.map((row) => {
        const state = picked[row.id] || row.state;
        const index = Math.max(0, row.states.indexOf(state));
        const next = row.states[(index + 1) % row.states.length];
        return (
          <div className="check-row" key={row.id}>
            <div>
              <strong>{row.label}</strong>
              <div className="note">{row.meta}</div>
            </div>
            <button
              type="button"
              className={`status ${calm.has(state) ? "ok" : "wait"}`}
              onClick={() => setPicked((current) => ({ ...current, [row.id]: next }))}
            >
              {state}
            </button>
          </div>
        );
      })}
      {!plain && (module.sample || module.views) && (
        <p className="note mt-2 mb-0">Click a status. Nothing is saved.</p>
      )}
    </div>
  );
}
