import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlans } from "../api";
import { billingNote, fallbackPlans, inr, matchPlan } from "../data";

export default function PlanMatcher({ compact = false }) {
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

  const { plan, overflow } = matchPlan(plans, users);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-end gap-3 mb-2">
        <label htmlFor="team-size" className="fw-bold">
          People who need a login
        </label>
        <strong>{users}</strong>
      </div>
      <input
        id="team-size"
        className="range"
        type="range"
        min="1"
        max="60"
        value={users}
        onChange={(event) => setUsers(Number(event.target.value))}
      />
      <p className="mt-3 mb-1">
        <strong>{plan.name}</strong> covers {plan.users} logins and {plan.storage_gb} GB.
      </p>
      <p className="price mb-1">{inr(plan.price)}</p>
      {overflow && <p className="note">Above 50 logins, talk to sales. Platinum is the largest published plan.</p>}
      {!compact && <p className="note">{note}</p>}
      <Link className="btn-green mt-2" to={`/trial?users=${users}`}>
        Start a trial for {users} people
      </Link>
      {!compact && (
        <div className="row g-3 mt-2">
          {plans.map((item) => (
            <div className="col-md-4" key={item.id}>
              <article className={`card-plain plan-card ${item.id === plan.id ? "fit" : ""}`}>
                <h3 className="h5">{item.name}</h3>
                <p className="price">
                  <s>{inr(item.list_price)}</s>
                  {inr(item.price)}
                </p>
                <p className="mb-1">{item.users} user logins</p>
                <p className="note mb-0">{item.storage_gb} GB storage</p>
              </article>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
