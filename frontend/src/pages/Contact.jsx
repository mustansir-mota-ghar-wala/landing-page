import { useState } from "react";
import PageHero from "../components/PageHero";
import { sendLead } from "../api";

const empty = { name: "", email: "", phone: "", firm: "", employees: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await sendLead({ kind: "demo", ...form });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section inner-page">
      <div className="container">
        <div className="inner-split">
          <div>
            <PageHero
              kicker="Book a demo"
              title="Walk the product on"
              accent="your own client list."
              lede="Tell us the firm, the team size, and what the demo should cover. The request is saved here. It does not open a popup, and it does not email you an OTP."
              chips={["Weekdays 10–7 IST", "Sales desk", "No popup forms"]}
            />
            <div className="fact-grid">
              <article className="fact-card" data-reveal>
                <small>Phone</small>
                <strong><a href="tel:+919689093892">+91 96890 93892</a></strong>
                <p>Sales</p>
              </article>
              <article className="fact-card" data-reveal>
                <small>Email</small>
                <strong><a href="mailto:sales@cadashboard.com">sales@cadashboard.com</a></strong>
                <p>Demo requests</p>
              </article>
              <article className="fact-card" data-reveal>
                <small>Support</small>
                <strong><a href="mailto:support@cadashboard.com">support@cadashboard.com</a></strong>
                <p>+91 88050 08574</p>
              </article>
            </div>
          </div>
          {done ? (
            <div className="preview" data-reveal>
              <p className="cine-kicker">Request saved</p>
              <h2 className="h4">We’ll follow from this record</h2>
              <p className="mb-0">The demo request is stored. Sales can pick it up from here without a separate email blast.</p>
            </div>
          ) : (
            <form className="preview halo-form" onSubmit={submit} data-reveal>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input id="name" name="name" className="form-control" value={form.name} onChange={update} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="email">Work email</label>
                  <input id="email" name="email" type="email" className="form-control" value={form.email} onChange={update} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" className="form-control" value={form.phone} onChange={update} />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="firm">Firm</label>
                  <input id="firm" name="firm" className="form-control" value={form.firm} onChange={update} />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="employees">People in the firm</label>
                  <input id="employees" name="employees" type="number" min="1" className="form-control" value={form.employees} onChange={update} />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="message">What should the demo cover?</label>
                  <textarea id="message" name="message" className="form-control" rows="4" value={form.message} onChange={update} />
                </div>
              </div>
              {error && <p className="text-danger mt-3 mb-0">{error}</p>}
              <button className="cine-btn mt-3" type="submit" disabled={busy}>
                {busy ? "Saving" : "Request the demo"} <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
