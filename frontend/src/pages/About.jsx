import Continue from "../components/Continue";

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-7">
            <p className="kicker" data-reveal>About</p>
            <h1 className="display" data-reveal>Built for how a practice actually runs</h1>
            <p data-reveal>
              CA Dashboard comes from Orgpro Softwares Private Limited. It started from a simple observation: firms and their clients were losing compliance dates, files, and status inside email.
            </p>
            <p data-reveal>
              The product puts that work in one login. The firm sets the clients, the dates, and the tasks. The people doing the work update the status. The client sees only what the firm shares.
            </p>
            <div className="card-plain" data-reveal>
              <h2 className="h5">Office</h2>
              <p>Orgpro Softwares Private Limited<br />Off 306–308, 310, SNo 572/C<br />Crystal Corporate, Bibwewadi, Pune</p>
              <p className="mb-1"><a href="mailto:sales@cadashboard.com">sales@cadashboard.com</a></p>
              <p className="mb-0"><a href="tel:+919689093892">+91 96890 93892</a></p>
            </div>
          </div>
          <div className="col-lg-5" data-reveal>
            <img className="page-photo" src="/features/photo-dashboards.jpg" alt="" />
          </div>
        </div>
        <Continue to="/customers" text="See what practices already using it said." label="Read their notes" />
      </div>
    </section>
  );
}
