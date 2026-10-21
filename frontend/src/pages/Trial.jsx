import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { sendLead } from "../api";
import { inr, matchPlan, fallbackPlans } from "../data";

export default function Trial() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firm: "",
    employees: params.get("users") || "8",
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);
  const [busy, setBusy] = useState(false);
  const suggestion = useMemo(
    () => matchPlan(fallbackPlans, Number(form.employees) || 1),
    [form.employees],
  );

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function next(event) {
    event.preventDefault();
    if (!form.firm.trim()) {
      setError("Enter the firm name.");
      return;
    }
    const count = Number(form.employees);
    if (!Number.isInteger(count) || count < 1) {
      setError("Enter how many people need a login.");
      return;
    }
    setError("");
    setStep(2);
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await sendLead({ kind: "trial", ...form, message: "Free trial preview" });
      setDone(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section inner-page">
      <div className="container">
        <div className="inner-split auth">
          <div>
            <PageHero
              kicker="Free trial"
              title="Start without a"
              accent="sales OTP."
              lede="Two short steps. No GST number. We save the request on this site. A production trial would send the login from here — this form does not create an account."
              chips={["No GST on this form", "Plan matched to team size", "Saved, not emailed"]}
            />
          </div>
          <div>
            <div className="progress-dots" data-reveal aria-hidden="true">
              <span className={step >= 1 ? "on" : ""} />
              <span className={step >= 2 || done ? "on" : ""} />
            </div>
            {done ? (
              <div className="preview" data-reveal>
                <p className="cine-kicker">Request saved</p>
                <h2 className="h4">{form.firm} is on file</h2>
                <p>
                  Recorded for {form.employees} people.
                  {done.plan ? ` The closest published plan is ${done.plan.name} at ${inr(done.plan.price)}.` : ""}
                </p>
                <p className="note mb-0">Nothing was emailed. A live trial would issue the login from this step.</p>
              </div>
            ) : step === 1 ? (
              <form className="preview halo-form" onSubmit={next} data-reveal>
                <div>
                  <label className="form-label" htmlFor="firm">Firm name</label>
                  <input id="firm" name="firm" className="form-control mb-3" value={form.firm} onChange={update} />
                </div>
                <div>
                  <label className="form-label" htmlFor="employees">People who need a login</label>
                  <input id="employees" name="employees" type="number" min="1" className="form-control" value={form.employees} onChange={update} />
                </div>
                <p className="note mt-3">
                  That team size fits <strong>{suggestion.plan.name}</strong>
                  {suggestion.overflow ? " only up to 50 published logins." : ` (${suggestion.plan.users} logins, ${inr(suggestion.plan.price)}).`}
                </p>
                {error && <p className="text-danger">{error}</p>}
                <button className="cine-btn" type="submit">Continue <span aria-hidden="true">→</span></button>
              </form>
            ) : (
              <form className="preview halo-form" onSubmit={submit} data-reveal>
                <div>
                  <label className="form-label" htmlFor="name">Your name</label>
                  <input id="name" name="name" className="form-control mb-3" value={form.name} onChange={update} />
                </div>
                <div>
                  <label className="form-label" htmlFor="email">Work email</label>
                  <input id="email" name="email" type="email" className="form-control mb-3" value={form.email} onChange={update} />
                </div>
                <div>
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" className="form-control" value={form.phone} onChange={update} />
                </div>
                {error && <p className="text-danger mt-3">{error}</p>}
                <div className="d-flex gap-2 mt-3">
                  <button className="cine-btn ghost" type="button" onClick={() => setStep(1)}>Back</button>
                  <button className="cine-btn" type="submit" disabled={busy}>{busy ? "Saving" : "Save trial request"}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
