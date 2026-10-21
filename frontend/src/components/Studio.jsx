const shorts = {
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
  "sme-compliance": "Compliance",
  "sme-collab": "Your CA",
  "sme-work": "Tasks",
  "sme-docs": "Documents",
  "sme-roles": "Access",
  "sme-reports": "Reports",
  "sme-mobile": "Mobile",
};

export default function Studio({ groups, items, current, onChange, render, railOnly = false }) {
  const flat = groups.flatMap((group) => group.ids);
  const index = Math.max(0, flat.indexOf(current));
  const pair = [0, 1].map((offset) => items.find((item) => item.id === flat[(index + offset) % flat.length])).filter(Boolean);

  return (
    <div className="studio">
      <div className="studio-rail" role="tablist" aria-label="Features">
        {flat.map((id) => {
          const item = items.find((entry) => entry.id === id);
          if (!item) return null;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              className={current === id ? "active" : ""}
              onClick={() => onChange(id)}
            >
              {shorts[id] || item.title}
            </button>
          );
        })}
      </div>
      {!railOnly && (
      <div className="studio-pair">
        {pair.map((item, offset) => (
          <article className="feature-card" key={item.id}>
            <div className="studio-head">
              <h2>
                {offset === 0 ? item.title : (
                  <button type="button" className="card-switch" onClick={() => onChange(item.id)}>
                    {item.title}
                  </button>
                )}
              </h2>
              <p>{item.summary}</p>
            </div>
            <div className="studio-sample">{render(item)}</div>
          </article>
        ))}
      </div>
      )}
    </div>
  );
}
