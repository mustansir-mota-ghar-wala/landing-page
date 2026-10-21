import { useMemo, useState } from "react";

export default function HoursEstimator() {
  const [clients, setClients] = useState(40);
  const [hours, setHours] = useState(6);
  const saved = useMemo(() => Math.round(hours * 4 * 0.6), [hours]);

  return (
    <div className="card-plain">
      <h2 className="h3">See the follow-up time</h2>
      <p className="note">
        An estimate, not a promise. It assumes about 60% of weekly chasing can sit on the dashboard instead of in calls.
      </p>
      <label className="fw-bold" htmlFor="clients">
        Active clients: {clients}
      </label>
      <input
        id="clients"
        className="range mb-3"
        type="range"
        min="5"
        max="300"
        value={clients}
        onChange={(event) => setClients(Number(event.target.value))}
      />
      <label className="fw-bold" htmlFor="hours">
        Hours a week spent chasing status: {hours}
      </label>
      <input
        id="hours"
        className="range"
        type="range"
        min="1"
        max="25"
        value={hours}
        onChange={(event) => setHours(Number(event.target.value))}
      />
      <p className="mt-3 mb-1">
        About <strong>{saved} hours a month</strong> of follow-up, across {clients} clients, could move into one status list.
      </p>
      <p className="note mb-0">Your number will differ. The point is to put the chasing where the work already lives.</p>
    </div>
  );
}
