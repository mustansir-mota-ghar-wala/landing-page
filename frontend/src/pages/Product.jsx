import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { photoFor } from "../components/PhotoDeck";
import { modules } from "../data";

const featured = [
  "compliance",
  "collaboration",
  "tasks",
  "documents",
  "finance",
  "reports",
  "alerts",
  "dashboards",
];

const labels = {
  compliance: "Compliance",
  collaboration: "Clients",
  tasks: "Tasks",
  documents: "Documents",
  finance: "Finance",
  reports: "Reports",
  alerts: "Alerts",
  dashboards: "Dashboards",
};

const headlines = {
  compliance: "Never miss a filing",
  collaboration: "Work with clients, not around them",
  tasks: "The whole firm’s work, in one list",
  documents: "Every file lives with the work",
  finance: "Bill the work. Collect what’s due.",
  reports: "See the practice without a spreadsheet",
  alerts: "The right person hears it in time",
  dashboards: "One firm. Four clear views.",
};

const aliases = {
  client: "collaboration",
  clients: "collaboration",
  team: "collaboration",
  workflow: "tasks",
  reminders: "alerts",
  analytics: "reports",
  roles: "dashboards",
  access: "dashboards",
  mobile: "alerts",
  quotes: "finance",
  expenses: "finance",
  ai: "reports",
};

const items = featured
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
  }, [requested]);

  function choose(id) {
    setCurrent(id);
    setParams({ m: id }, { replace: true });
  }

  return (
    <section className="lookbook">
      <nav className="look-rail" aria-label="Product modules">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === current ? "on" : ""}
            onClick={() => choose(item.id)}
          >
            <img src={photoFor(item.id)} alt="" />
            <span>{labels[item.id]}</span>
          </button>
        ))}
      </nav>

      <div className="look-stage" id="module">
        <img src={photoFor(active.id)} alt="" />
        <div className="look-idea" key={`idea-${active.id}`}>
          <p className="look-idea-kicker">{labels[active.id]}</p>
          <h1>{headlines[active.id]}</h1>
        </div>
        <article className="look-card" key={active.id}>
          <p className="look-kicker">{labels[active.id]}</p>
          <p className="look-copy">{active.summary}</p>
          <ul className="look-points">
            {active.points.slice(0, 2).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link className="look-cta" to="/trial">
            Start a trial
          </Link>
        </article>
      </div>
    </section>
  );
}
