import PageHero from "../components/PageHero";

export default function Terms() {
  return (
    <section className="section inner-page">
      <div className="container col-lg-8">
        <PageHero
          kicker="Legal"
          title="Terms of"
          accent="service."
          lede="The commercial terms are the ones on the proposal your firm signs. This page does not replace that agreement."
        />
        <div className="card-plain doc-panel" data-reveal>
          <article>
            <h2>What governs the product</h2>
            <p>Use of CA Dashboard is covered by the signed proposal, order, or subscription terms issued to the firm.</p>
          </article>
          <article>
            <h2>What this website is</h2>
            <p>These pages describe the product and collect demo or trial requests. They are not a licence to the software.</p>
          </article>
          <article>
            <h2>Questions</h2>
            <p className="mb-0">
              <a href="mailto:sales@cadashboard.com">sales@cadashboard.com</a>
              <span> · </span>
              <a href="tel:+919689093892">+91 96890 93892</a>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
