import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "", human: false });
  const [message, setMessage] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      setMessage("Enter both the username and the password.");
      return;
    }
    if (!form.human) {
      setMessage("Confirm this sign-in is being made by a person.");
      return;
    }
    setMessage("ready");
  }

  return (
    <section className="section inner-page">
      <div className="container">
        <div className="inner-split auth">
          <PageHero
            kicker="Sign in"
            title="Your CA practice."
            accent="One login."
            lede="Use the same username and password as the live CA Dashboard product. This page does not store or transmit the password you type here."
            chips={["Firm workspace", "Client logins stay separate"]}
            actions={[{ to: "/trial", label: "Start a trial", ghost: true }]}
          />
          {message === "ready" ? (
            <div className="preview" data-reveal>
              <p className="cine-kicker">Ready</p>
              <h2 className="h4">Continue on the product login</h2>
              <p>No password was sent anywhere from this marketing site.</p>
              <a className="cine-btn" href="https://www.cadashboard.com/login">Continue to sign in <span aria-hidden="true">→</span></a>
            </div>
          ) : (
            <form className="preview halo-form" onSubmit={submit} data-reveal>
              <div>
                <label className="form-label" htmlFor="username">Username</label>
                <input id="username" className="form-control mb-3" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
              </div>
              <div>
                <label className="form-label" htmlFor="password">Password</label>
                <input id="password" type="password" className="form-control mb-3" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
              </div>
              <label className="d-flex gap-2 align-items-center mb-3">
                <input type="checkbox" checked={form.human} onChange={(event) => setForm({ ...form, human: event.target.checked })} />
                Confirm this sign-in is being made by a person
              </label>
              {message && <p className="text-danger">{message}</p>}
              <button className="cine-btn" type="submit">Login</button>
              <p className="note mt-3 mb-0">
                Need an account? <Link to="/trial">Request a trial</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
