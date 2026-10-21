import Continue from "../components/Continue";
import PageHero from "../components/PageHero";
import TiltCard from "../components/TiltCard";

export default function About() {
  return (
    <section className="section inner-page">
      <div className="container">
        <div className="inner-split">
          <div>
            <PageHero
              kicker="About"
              title="Built for how a"
              accent="practice actually runs."
              lede="CA Dashboard is product software from Orgpro Softwares Private Limited. It exists because firms and their clients were losing dates, files, and status inside email."
              chips={["Pune", "Practice software", "One firm login"]}
            />
            <p data-reveal>
              The product puts that work in one login. The firm sets the clients, the dates, and the tasks. The people doing the work update the status. The client sees only what the firm shares.
            </p>
            <div className="fact-grid">
              <article className="fact-card" data-reveal>
                <small>Company</small>
                <strong>Orgpro Softwares</strong>
                <p>Private Limited</p>
              </article>
              <article className="fact-card" data-reveal>
                <small>Office</small>
                <strong>Crystal Corporate</strong>
                <p>Bibwewadi, Pune</p>
              </article>
              <article className="fact-card" data-reveal>
                <small>Sales</small>
                <strong>+91 96890 93892</strong>
                <p>sales@cadashboard.com</p>
              </article>
            </div>
          </div>
          <TiltCard className="holo-frame" data-reveal>
            <img className="page-photo" src="/features/photo-dashboards.jpg" alt="CA Dashboard workspace" />
          </TiltCard>
        </div>
        <div className="card-plain mt-4" data-reveal>
          <h2 className="h5">Office address</h2>
          <p className="mb-1">Off 306–308, 310, SNo 572/C, Crystal Corporate, Bibwewadi, Pune</p>
          <p className="mb-0">
            <a href="mailto:sales@cadashboard.com">sales@cadashboard.com</a>
            <span> · </span>
            <a href="tel:+919689093892">+91 96890 93892</a>
          </p>
        </div>
        <Continue to="/customers" text="See what practices already using it said." label="Read their notes" />
      </div>
    </section>
  );
}
