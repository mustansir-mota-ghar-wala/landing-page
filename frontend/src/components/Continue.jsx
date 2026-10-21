import { Link } from "react-router-dom";

export default function Continue({ to, text, label }) {
  return (
    <div className="continue" data-reveal>
      <p>{text}</p>
      <Link className="cine-btn" to={to}>
        {label} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
