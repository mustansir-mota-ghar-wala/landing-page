import { useState } from "react";
import { Link } from "react-router-dom";

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
      setMessage("Confirm you are not a robot.");
      return;
    }
    setMessage("ready");
  }

  return (
    <section className="section">
      <div className="container col-lg-5">
        <h1 className="display" data-reveal>Login</h1>
        <p className="lede" data-reveal>Sign in with your CA Dashboard username and password.</p>
        {message === "ready" ? (
          <div className="preview" data-reveal>
            <h2 className="h4">This page does not store your password</h2>
            <p>No password was sent anywhere.</p>
            <a className="btn-green" href="https://www.cadashboard.com/login">Continue to sign in</a>
            <Link className="btn-ghost ms-2" to="/trial">Start a trial instead</Link>
          </div>
        ) : (
          <form className="preview" onSubmit={submit} data-reveal>
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
              I’m not a robot
            </label>
            {message && <p className="text-danger">{message}</p>}
            <button className="btn-green" type="submit">Login</button>
          </form>
        )}
      </div>
    </section>
  );
}
