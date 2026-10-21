import { useState } from "react";
import Continue from "../components/Continue";
import PageHero from "../components/PageHero";
import TiltCard from "../components/TiltCard";
import { stories } from "../data";

export default function Customers() {
  const [current, setCurrent] = useState(stories[0].id);
  const active = stories.find((story) => story.id === current);

  return (
    <section className="section inner-page">
      <div className="container">
        <PageHero
          kicker="Customers"
          title="What firms said,"
          accent="in their own words."
          lede="These are notes from practices already running compliance, tasks, and billing on CA Dashboard. Open a name to read the full line."
          chips={["CA firms", "CS practices", "India and Dubai"]}
        />
        <div className="firm-row">
          {stories.map((story) => (
            <button
              key={story.id}
              type="button"
              data-reveal
              className={`firm-chip ${current === story.id ? "active" : ""}`}
              onClick={() => setCurrent(story.id)}
            >
              {story.name}
            </button>
          ))}
        </div>
        <div className="inner-split">
          <TiltCard className="holo-frame" data-reveal>
            <img className="page-photo" src="/features/photo-clients.jpg" alt="" />
          </TiltCard>
          <blockquote className="preview quote-holo quote-panel mb-0" data-reveal>
            <p className="quote">“{active.quote}”</p>
            <footer>
              <strong>{active.name}</strong>
              <div className="note">{active.firm}</div>
            </footer>
          </blockquote>
        </div>
        <Continue to="/contact" text="Want the same setup for your firm?" label="Book a demo" />
      </div>
    </section>
  );
}
