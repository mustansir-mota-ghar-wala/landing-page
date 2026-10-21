import { useState } from "react";
import { sendLead } from "../api";

const empty = { name: "", email: "", phone: "", firm: "" };

export default function DemoClose() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a work email.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) next.phone = "Enter a phone number.";
    if (form.firm.trim().length < 2) next.firm = "Enter the firm name.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    try {
      await sendLead({
        kind: "demo",
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        firm: form.firm.trim(),
        message: "Demo request from the landing page.",
      });
      setDone(true);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="cine-close" id="demo">
      <div className="horizon" aria-hidden="true">
        <span className="horizon-planet" />
        <svg className="horizon-astro" viewBox="0 0 80 120">
          <circle cx="40" cy="22" r="12" />
          <rect x="34" y="20" width="14" height="8" rx="3" />
          <path d="M28 48c2-10 22-10 24 0l6 28H22L28 48Z" />
          <path d="M22 78l-8 28M58 78l8 28" />
          <rect x="22" y="42" width="10" height="16" rx="3" />
        </svg>
      </div>
      <div className="cine-wrap cine-split">
        <div className="close-copy" data-reveal>
          <p className="cine-kicker">Ready to grow?</p>
          <h2>Take Your CA Practice<br />to the Next Level</h2>
          <p className="cine-lead">See how a firm can run clients, compliance, and bills in one place.</p>
          <ul className="grow-points">
            <li><i aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></svg></i>Save Time</li>
            <li><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 4 2.7 6.8 7 8 4.3-1.2 7-4 7-8V6z" /></svg></i>Improve Accuracy</li>
            <li><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h16" /><path d="M8 15v-3M12 15V8M16 15v-5" /></svg></i>Grow Your Practice</li>
          </ul>
        </div>
        <div className="demo-card" data-reveal>
          <h3>Book a Free Demo</h3>
          <p className="demo-sub">See how CA Dashboard can transform your practice.</p>
          {done ? (
            <p role="status">Saved. The request is stored. This does not book a calendar time by itself.</p>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="demo-grid">
                <label htmlFor="demo-name">Your Name
                  <input id="demo-name" name="name" autoComplete="name" placeholder="Enter your name" value={form.name} onChange={update} aria-invalid={Boolean(errors.name)} />
                  {errors.name && <small>{errors.name}</small>}
                </label>
                <label htmlFor="demo-email">Work Email
                  <input id="demo-email" name="email" type="email" autoComplete="email" placeholder="you@firm.com" value={form.email} onChange={update} aria-invalid={Boolean(errors.email)} />
                  {errors.email && <small>{errors.email}</small>}
                </label>
                <label htmlFor="demo-phone">Phone Number
                  <input id="demo-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" value={form.phone} onChange={update} aria-invalid={Boolean(errors.phone)} />
                  {errors.phone && <small>{errors.phone}</small>}
                </label>
                <label htmlFor="demo-firm">Firm Name
                  <input id="demo-firm" name="firm" autoComplete="organization" placeholder="Your firm name" value={form.firm} onChange={update} aria-invalid={Boolean(errors.firm)} />
                  {errors.firm && <small>{errors.firm}</small>}
                </label>
              </div>
              {errors.form && <p role="alert">{errors.form}</p>}
              <button type="submit" disabled={busy}>{busy ? "Saving" : <>Book a Demo <span aria-hidden="true">→</span></>}</button>
              <p className="demo-safe"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="11" width="12" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>Your information is safe with us. No spam ever.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
