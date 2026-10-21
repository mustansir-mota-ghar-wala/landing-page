import { useMemo, useState } from "react";
import Continue from "../components/Continue";
import { faqs } from "../data";

export default function Faq() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(faqs[0].q);
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return faqs;
    return faqs.filter((item) => `${item.q} ${item.a}`.toLowerCase().includes(needle));
  }, [query]);

  return (
    <section className="section">
      <div className="container col-lg-8">
        <div>
          <p className="kicker" data-reveal>FAQ</p>
          <h1 className="display" data-reveal>Questions firms ask first</h1>
        </div>
        <input
          data-reveal
          className="form-control my-4"
          placeholder="Search, for example price, data, or trial"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {visible.length === 0 && <p>No match. Try “price” or “data”.</p>}
        {visible.map((item) => (
          <div className="faq-item" data-reveal key={item.q}>
            <button type="button" onClick={() => setOpen(open === item.q ? "" : item.q)}>
              <span>{item.q}</span>
              <span>{open === item.q ? "−" : "+"}</span>
            </button>
            {open === item.q && <p className="pb-3">{item.a}</p>}
          </div>
        ))}
        <Continue to="/contact" text="Still deciding?" label="Book a demo" />
      </div>
    </section>
  );
}
