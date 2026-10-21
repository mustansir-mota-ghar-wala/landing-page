import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Continue from "../components/Continue";
import FeatureStage from "../components/FeatureStage";
import { photoFor } from "../components/PhotoDeck";
import { moduleGroups, modules } from "../data";

const labels = {
  compliance: "Compliance",
  collaboration: "Clients",
  tasks: "Tasks",
  documents: "Documents",
  finance: "Finance",
  roles: "Access",
  reports: "Reports",
  alerts: "Alerts",
  mobile: "Mobile",
  dashboards: "Dashboards",
  quotes: "Quotes",
  expenses: "Expenses",
  ai: "Ask the firm",
};

const aliases = {
  client: "collaboration",
  clients: "collaboration",
  team: "collaboration",
  workflow: "tasks",
  reminders: "alerts",
  analytics: "reports",
  ask: "ai",
};

const items = moduleGroups
  .flatMap((group) => group.ids)
  .map((id) => modules.find((item) => item.id === id))
  .filter(Boolean);

function resolveModule(raw) {
  if (!raw) return "";
  const id = aliases[raw.toLowerCase()] || raw.toLowerCase();
  return items.some((item) => item.id === id) ? id : "";
}

export default function Product() {
  const [params, setParams] = useSearchParams();
  const requested = resolveModule(params.get("m"));
  const [current, setCurrent] = useState(requested || items[0].id);
  const active = items.find((item) => item.id === current) || items[0];

  useEffect(() => {
    if (!requested) return;
    setCurrent(requested);
    const timer = window.setTimeout(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("module")?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [requested]);

  function choose(id) {
    setCurrent(id);
    setParams({ m: id }, { replace: true });
  }

  return (
    <section className="section showroom-page">
      <div className="container">
        <div>
          <p className="kicker" data-reveal>Showroom</p>
          <h1 className="display" data-reveal>Walk the modules</h1>
          <p className="lede" data-reveal>Each tile is one part of the practice. Open it to see what it does.</p>
        </div>
        <div className="exhibits">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              data-reveal
              className={item.id === current ? "on" : ""}
              onClick={() => choose(item.id)}
            >
              <img src={photoFor(item.id)} alt="" />
              <span>{labels[item.id] || item.title}</span>
            </button>
          ))}
        </div>
        <article className="exhibit" id="module" key={active.id} data-reveal>
          <img className="exhibit-photo" src={photoFor(active.id)} alt="" />
          <div className="exhibit-copy">
            <h2>{active.title}</h2>
            <p>{active.summary}</p>
            <ul className="facts">
              {active.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <FeatureStage module={active} plain />
          </div>
        </article>
        <Continue to="/pricing" text="When a module fits the firm, check the plan." label="See pricing" />
      </div>
    </section>
  );
}
