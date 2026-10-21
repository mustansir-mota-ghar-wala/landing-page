import { Link } from "react-router-dom";

const spots = [
  { id: "collaboration", name: "Client Management", x: "6%", y: "8%", w: "38%", h: "22%" },
  { id: "documents", name: "Documents", x: "3%", y: "36%", w: "32%", h: "22%" },
  { id: "tasks", name: "Task & Workflow", x: "6%", y: "64%", w: "34%", h: "26%" },
  { id: "compliance", name: "Compliance Tracking", x: "60%", y: "6%", w: "36%", h: "24%" },
  { id: "reports", name: "Reports & Analytics", x: "68%", y: "36%", w: "30%", h: "22%" },
  { id: "collaboration", name: "Team Collaboration", x: "58%", y: "62%", w: "40%", h: "28%", key: "team" },
];

const pieces = [
  { key: "clients", x: 0, y: 0, w: 54, h: 34, fx: "-72px", fy: "0px", fz: "-240px", rx: "14deg", ry: "-16deg" },
  { key: "compliance", x: 46, y: 0, w: 54, h: 34, fx: "72px", fy: "0px", fz: "-240px", rx: "14deg", ry: "16deg" },
  { key: "documents", x: 0, y: 26, w: 34, h: 40, fx: "-84px", fy: "0px", fz: "-240px", rx: "10deg", ry: "-18deg" },
  { key: "reports", x: 66, y: 26, w: 34, h: 40, fx: "84px", fy: "0px", fz: "-240px", rx: "10deg", ry: "18deg" },
  { key: "tasks", x: 0, y: 60, w: 56, h: 40, fx: "-72px", fy: "0px", fz: "-240px", rx: "14deg", ry: "-14deg" },
  { key: "team", x: 44, y: 60, w: 56, h: 40, fx: "72px", fy: "0px", fz: "-240px", rx: "14deg", ry: "14deg" },
  { key: "core", x: 22, y: 12, w: 56, h: 76, fx: "0px", fy: "0px", fz: "-360px", rx: "18deg", ry: "0deg" },
];

const motion = Object.fromEntries(pieces.map((piece, order) => [piece.key, { ...piece, order }]));

export default function FeatureUniverse() {
  return (
    <section className="cine-light universe-section" id="features">
      <div className="cine-wrap cine-feature">
        <div className="universe-copy" data-reveal>
          <p className="cine-kicker light">Explore the universe</p>
          <h2>Everything You Need<br />in One Place</h2>
          <p className="cine-lead dark">From client management to compliance, everything works together like a well-orchestrated universe.</p>
          <Link className="cine-btn line" to="/product">Explore All Features <span aria-hidden="true">→</span></Link>
        </div>
        <div className="orbit-map">
          <img className="orbit-spacer" src="/landing/orbit-diagram.jpg" alt="" />
          {pieces.map((piece) => (
            <span
              key={piece.key}
              className="orbit-piece"
              aria-hidden="true"
              data-order={motion[piece.key].order}
              data-fx={piece.fx}
              data-fy={piece.fy}
              data-fz={piece.fz}
              data-rx={piece.rx}
              data-ry={piece.ry}
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                width: `${piece.w}%`,
                height: `${piece.h}%`,
                "--fx": piece.fx,
                "--fy": piece.fy,
                "--fz": piece.fz,
                "--rx": piece.rx,
                "--ry": piece.ry,
                zIndex: piece.key === "core" ? 2 : 1,
              }}
            >
              <i
                style={{
                  width: `${(100 / piece.w) * 100}%`,
                  height: `${(100 / piece.h) * 100}%`,
                  left: `${(-piece.x / piece.w) * 100}%`,
                  top: `${(-piece.y / piece.h) * 100}%`,
                }}
              />
            </span>
          ))}
          <p className="sr-only">CA Dashboard at the centre, with client management, documents, tasks, compliance, reports, and team collaboration around it.</p>
          <Link className="orbit-core-hit" to="/product" aria-label="Open all CA Dashboard features" />
          {spots.map((spot) => (
            <Link
              key={spot.key || spot.name}
              className="orbit-hit"
              to={`/product?m=${spot.id}`}
              aria-label={spot.name}
              style={{ left: spot.x, top: spot.y, width: spot.w, height: spot.h }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
