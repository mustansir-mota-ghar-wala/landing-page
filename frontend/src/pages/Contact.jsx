import { useState } from "react";
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
    <section className="section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5">
            <p className="kicker" data-reveal>Book a demo</p>
            <h1 className="display" data-reveal>Tell us about the firm</h1>
            <p data-reveal>We save this request. It does not email anyone, and it does not open a popup over the page.</p>
            <p className="mb-1" data-reveal><a href="tel:+919689093892">+91 96890 93892</a></p>
            <p data-reveal><a href="mailto:sales@cadashboard.com">sales@cadashboard.com</a></p>
          </div>
          <div className="col-lg-7">
            {done ? (
              <div className="preview">
                <h2 className="h4">Saved</h2>
                <p className="mb-0">The demo request is saved. Sales can follow up from here.</p>
              </div>
            ) : (
              <form className="preview" onSubmit={submit} data-reveal>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input id="name" name="name" className="form-control" value={form.name} onChange={update} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="email">Email</label>
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
                <button className="btn-green mt-3" type="submit" disabled={busy}>
                  {busy ? "Saving" : "Request the demo"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
