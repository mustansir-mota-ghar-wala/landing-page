import { Link } from "react-router-dom";

export default function FeatureDeck({
  title,
  badge,
  kicker,
  items,
  labels,
  headlines,
  current,
  onChoose,
}) {
  const mid = (items.length - 1) / 2;

  return (
    <section className="wall">
      <header className="wall-head">
        <h1>
          {title}
          <span>{badge}</span>
        </h1>
        <p>{kicker}</p>
      </header>

      <div className="wall-fan" aria-label={title}>
        {items.map((item, i) => {
          const offset = i - mid;
          const on = item.id === current;
          return (
            <article
              key={item.id}
              className={`wall-phone skin-${i % 8}${on ? " on" : ""}`}
              style={{ "--i": offset }}
              onClick={() => onChoose(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onChoose(item.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={on}
            >
              <span className="wall-notch" aria-hidden="true" />
              <em>{labels[item.id]}</em>
              <strong>{headlines[item.id] || item.title}</strong>
              <ul>
                {item.points.slice(0, 3).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="wall-cta" to="/trial" onClick={(event) => event.stopPropagation()}>
                Start a trial
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
