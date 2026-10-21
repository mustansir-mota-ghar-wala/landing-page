import { Link } from "react-router-dom";

export default function PageHero({ kicker, title, accent, lede, chips, actions }) {
  return (
    <header className="inner-hero">
      {kicker && <p className="cine-kicker">{kicker}</p>}
      <h1 className="display">
        {title}
        {accent ? <span className="limit"> {accent}</span> : null}
      </h1>
      {lede && <p className="lede">{lede}</p>}
      {actions?.length > 0 && (
        <div className="cine-actions">
          {actions.map((action) =>
            action.href ? (
              <a key={action.label} className={`cine-btn${action.ghost ? " ghost" : ""}`} href={action.href}>
                {action.label}
                {!action.ghost && <span aria-hidden="true"> →</span>}
              </a>
            ) : (
              <Link key={action.label} className={`cine-btn${action.ghost ? " ghost" : ""}`} to={action.to}>
                {action.label}
                {!action.ghost && <span aria-hidden="true"> →</span>}
              </Link>
            ),
          )}
        </div>
      )}
      {chips?.length > 0 && (
        <ul className="cine-chips">
          {chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      )}
    </header>
  );
}
