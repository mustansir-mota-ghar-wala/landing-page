import { Link } from "react-router-dom";

const points = [
  { id: "dashboards", text: "Client & employee management" },
  { id: "tasks", text: "Task tracking & reminders" },
  { id: "compliance", text: "Compliance & audit support" },
  { id: "reports", text: "Reports & analytics" },
];

export default function ProductShowcase() {
  return (
    <section className="cine-dark product-section" id="product">
      <div className="cine-wrap cine-split">
        <div className="product-copy" data-reveal>
          <p className="cine-kicker">See it in action</p>
          <h2>A Dashboard Designed<br />for CA Professionals</h2>
          <p className="cine-lead">Clean, powerful and easy to use. Everything you need to manage your practice in one intuitive interface.</p>
          <ul className="cine-checks">
            {points.map((item) => (
            <li key={item.id}>
                <Link to={`/product?m=${item.id}`}>
                  <span aria-hidden="true">✓</span>{item.text}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="cine-btn tour" to="/product">
            <i className="play" aria-hidden="true" />
            Watch Product Tour <span aria-hidden="true">→</span>
          </Link>
          <p className="sr-only">The laptop on the right is an illustrative preview. The figures on its screen are sample interface numbers.</p>
        </div>
      </div>
    </section>
  );
}
