import PageHero from "../components/PageHero";

export default function Privacy() {
  return (
    <section className="section inner-page">
      <div className="container col-lg-8">
        <PageHero
          kicker="Legal"
          title="Privacy"
          accent="in plain language."
          lede="This marketing site does not replace the full policy your firm receives with the product. The points below are the ones CA Dashboard already states in public."
        />
        <div className="card-plain doc-panel" data-reveal>
          <article>
            <h2>Who owns the files</h2>
            <p>The firm owns what it uploads. Customer data is not sold. You can download your files.</p>
          </article>
          <article>
            <h2>What this website stores</h2>
            <p>Demo and trial forms on this site save the details you type so sales can follow up. They are not used to create a product login from here.</p>
          </article>
          <article>
            <h2>The full policy</h2>
            <p className="mb-0">
              Ask for the current document at <a href="mailto:sales@cadashboard.com">sales@cadashboard.com</a>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
