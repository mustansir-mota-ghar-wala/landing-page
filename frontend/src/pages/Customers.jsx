import { useState } from "react";
import Continue from "../components/Continue";
import TiltCard from "../components/TiltCard";
import { stories } from "../data";

export default function Customers() {
  const [current, setCurrent] = useState(stories[0].id);
  const active = stories.find((story) => story.id === current);

  return (
    <section className="section">
      <div className="container">
        <div>
          <p className="kicker" data-reveal>Customers</p>
          <h1 className="display" data-reveal>What firms said in their own words</h1>
          <p className="lede" data-reveal>Click a name to read their note.</p>
        </div>
        <div className="d-flex flex-wrap gap-2 my-4">
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
        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <TiltCard className="holo-frame" data-reveal>
              <img className="page-photo" src="/features/photo-clients.jpg" alt="" />
            </TiltCard>
          </div>
          <div className="col-lg-7">
            <blockquote className="preview quote-holo mb-0" data-reveal>
              <p className="quote">“{active.quote}”</p>
              <footer>
                <strong>{active.name}</strong>
                <div className="note">{active.firm}</div>
              </footer>
            </blockquote>
          </div>
        </div>
        <Continue to="/contact" text="Want the same setup for your firm?" label="Book a demo" />
      </div>
    </section>
  );
}
