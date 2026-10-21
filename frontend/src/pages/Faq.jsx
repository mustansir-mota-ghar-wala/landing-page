import { useMemo, useState } from "react";
import Continue from "../components/Continue";
import PageHero from "../components/PageHero";
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
    <section className="section inner-page">
      <div className="container col-lg-8">
        <PageHero
          kicker="FAQ"
          title="Straight answers"
          accent="before the demo."
          lede="Price, data ownership, trial, and who this product is for. Search if you already know the topic."
          chips={["Plans", "Data", "Trial", "Support"]}
        />
        <input
          data-reveal
          className="form-control my-4"
          placeholder="Search price, data, trial, or support"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search questions"
        />
        {visible.length === 0 && <p>No match. Try “price” or “data”.</p>}
        {visible.map((item) => (
          <div className="faq-item" data-reveal key={item.q}>
            <button type="button" onClick={() => setOpen(open === item.q ? "" : item.q)} aria-expanded={open === item.q}>
              <span>{item.q}</span>
              <span>{open === item.q ? "−" : "+"}</span>
            </button>
            {open === item.q && <p className="pb-3">{item.a}</p>}
          </div>
        ))}
        <Continue to="/contact" text="If the answer is not here, book a walkthrough on your own files." label="Book a demo" />
      </div>
    </section>
  );
}
