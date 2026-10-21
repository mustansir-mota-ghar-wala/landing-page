import { Link } from "react-router-dom";

const cards = [
  { title: "Smart Task Suggestions", text: "Prioritize your work", icon: "user", id: "tasks" },
  { title: "Document Insights", text: "Extract key information", icon: "doc", id: "documents" },
  { title: "Draft Communications", text: "Generate emails & replies", icon: "shield", id: "collaboration" },
  { title: "Intelligent Reports", text: "Get insights instantly", icon: "chart", id: "reports" },
];

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, "aria-hidden": true };
  if (name === "user") return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M5.5 19a6.5 6.5 0 0 1 13 0" /></svg>;
  if (name === "doc") return <svg {...common}><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v6h6M9 13h6M9 17h6" /></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 3 5 6v6c0 4 2.8 7 7 8.5C16.2 19 19 16 19 12V6z" /><path d="M9 12h6" /></svg>;
  return <svg {...common}><path d="M4 19V5M4 19h16" /><path d="M8 15v-3M12 15V8M16 15v-5" /></svg>;
}

export default function AiSection() {
  return (
    <section className="cine-light ai-section" id="ai">
      <div className="cine-wrap ai-layout">
        <div className="ai-copy" data-reveal>
          <p className="cine-kicker light">AI powered</p>
          <h2>Work Smarter.<br />Let AI Handle More.</h2>
          <p className="cine-lead dark">Our AI features help you save time, reduce manual work and get intelligent insights for better decisions.</p>
          <Link className="cine-btn line" to="/product?m=ai">Explore AI Features <span aria-hidden="true">→</span></Link>
          <p className="sr-only">These four cards are proposed. Ask the firm is the AI in the product today. It reads this firm’s tasks, bills, and GST, and it does not change them.</p>
        </div>
        <img className="ai-orb-img" src="/landing/ai-orb.jpg" alt="" />
        <div className="ai-cards">
          {cards.map((card) => (
            <Link key={card.title} className="ai-card" to={`/product?m=${card.id}`} data-reveal>
              <i aria-hidden="true"><Icon name={card.icon} /></i>
              <span>
                <strong>{card.title}</strong>
                <small>{card.text}</small>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
