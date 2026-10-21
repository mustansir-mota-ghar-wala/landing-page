import { useState } from "react";
import { stories } from "../data";

const visibleCount = 3;

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const pages = Math.max(1, stories.length - visibleCount + 1);
  const visible = Array.from({ length: visibleCount }, (_, index) => stories[(start + index) % stories.length]);

  function move(step) {
    setStart((value) => (value + step + pages) % pages);
  }

  return (
    <section className="cine-stars quote-section" id="customers">
      <div className="quote-head">
        <p className="cine-kicker" data-reveal>Trusted by CA firms across India</p>
        <h2 data-reveal>Real People. Real Results.</h2>
        <p className="sr-only">The profile pictures are demo illustrations, not photographs of the people quoted.</p>
      </div>
      <div className="quote-row">
        <button type="button" className="quote-arrow" aria-label="Previous testimonials" onClick={() => move(-1)}>‹</button>
        <div className="quote-grid">
          {visible.map((story) => (
            <blockquote key={story.id} data-reveal>
              <span><img src={`/landing/profile-${story.id}.png`} alt="" /></span>
              <p>“{story.quote}”</p>
              <footer>
                <strong>{story.name}</strong>
                <small>{story.firm}</small>
              </footer>
            </blockquote>
          ))}
        </div>
        <button type="button" className="quote-arrow" aria-label="Next testimonials" onClick={() => move(1)}>›</button>
      </div>
      <div className="quote-dots">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            type="button"
            className={index === start ? "on" : undefined}
            aria-label={`Show testimonial group ${index + 1}`}
            aria-current={index === start ? "true" : undefined}
            onClick={() => setStart(index)}
          />
        ))}
      </div>
    </section>
  );
}
