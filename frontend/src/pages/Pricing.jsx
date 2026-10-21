import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Continue from "../components/Continue";
import { getPlans } from "../api";
import { billingNote, fallbackPlans, inr, matchPlan } from "../data";

export default function Pricing() {
  const [plans, setPlans] = useState(fallbackPlans);
  const [note, setNote] = useState(billingNote);
  const [users, setUsers] = useState(12);

  useEffect(() => {
    getPlans()
      .then((data) => {
        if (data.plans?.length) setPlans(data.plans);
        if (data.billing_note) setNote(data.billing_note);
      })
      .catch(() => {});
  }, []);

  const { plan: fit, overflow } = matchPlan(plans, users);
  const cap = Math.max(...plans.map((item) => item.users), 1);
  const shared = (plans[0]?.features || []).filter((feature) =>
    plans.every((item) => item.features?.includes(feature)),
  );

  return (
    <section className="section price-page">
      <div className="container">
        <div>
          <p className="kicker" data-reveal>Pricing</p>
          <h1 className="display" data-reveal>See which plan fits the team</h1>
          <p className="lede" data-reveal>{note}</p>
        </div>

        <div className="price-finder" data-reveal>
          <p className="price-count">
            {users}
            <span>people</span>
          </p>
          <div>
            <label htmlFor="pricing-team">People who need a login</label>
            <input
              id="pricing-team"
              className="range"
              type="range"
              min="1"
              max="60"
              value={users}
              onChange={(event) => setUsers(Number(event.target.value))}
            />
            <div className="plan-ticks">
              {plans.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === fit.id && !overflow ? "on" : ""}
                  onClick={() => setUsers(item.users)}
                >
                  {item.name} · {item.users}
                </button>
              ))}
            </div>
            <p className="note mb-0 mt-2">
              {overflow
                ? "Above 50 logins, talk to sales. Platinum is the largest published plan."
                : `${fit.name} covers ${fit.users} logins and ${fit.storage_gb} GB.`}
            </p>
          </div>
        </div>

        <div className="tickets">
          {plans.map((item) => {
            const selected = item.id === fit.id;
            const save = Math.max(0, Number(item.list_price) - Number(item.price));
            const extras = item.extras?.length
              ? item.extras
              : (item.features || []).filter((feature) => !shared.includes(feature));
            return (
              <article
                key={item.id}
                data-reveal
                className={`ticket ${item.id}${selected ? " on" : ""}`}
                onClick={() => setUsers(item.users)}
              >
                {selected && <span className="ticket-badge">{overflow ? "Largest plan" : "Fits this team"}</span>}
                <h2>{item.name}</h2>
                <p className="price">
                  <s>{inr(item.list_price)}</s>
                  {inr(item.price)}
                </p>
                {save > 0 && <p className="save">{inr(save)} below the list price</p>}
                <div className="meters">
                  <p><span>Logins</span><strong>{item.users}</strong></p>
                  <div className="meter" aria-hidden="true"><span style={{ width: `${(item.users / cap) * 100}%` }} /></div>
                  <p><span>Storage</span><strong>{item.storage_gb} GB</strong></p>
                  <div className="meter" aria-hidden="true"><span style={{ width: `${(item.storage_gb / cap) * 100}%` }} /></div>
                </div>
                {extras.length > 0 && (
                  <ul className="extras">
                    {extras.map((extra) => <li key={extra}>{extra}</li>)}
                  </ul>
                )}
                <Link
                  className={selected ? "btn-green" : "btn-ghost"}
                  to={`/trial?users=${item.users}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  Start a trial
                </Link>
              </article>
            );
          })}
        </div>

        {shared.length > 0 && (
          <>
            <h2 className="included-title" data-reveal>Included on every plan</h2>
            <ul className="included">
              {shared.map((feature) => <li key={feature} data-reveal>{feature}</li>)}
            </ul>
          </>
        )}

        <Continue to="/contact" text="Want the plan walked through on your own client list?" label="Book a demo" />
      </div>
    </section>
  );
}
