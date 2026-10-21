import { useState } from "react";
import { Link } from "react-router-dom";

export default function Assistant() {
  const [open, setOpen] = useState(false);

  return (
    <div className="assistant">
      {open && (
        <div className="assistant-panel">
          <strong>What do you want to do?</strong>
          <p className="note mb-2">Pick one. This panel stays closed until you open it.</p>
          <a className="btn-ghost" href="/#week">Build a sample week</a>
          <Link className="btn-ghost" to="/pricing">Find a plan for my team</Link>
          <Link className="btn-green" to="/trial">Start a free trial</Link>
        </div>
      )}
      <button className="btn-green" type="button" onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Help me choose"}
      </button>
    </div>
  );
}
