import { useState } from "react";
import Continue from "../components/Continue";
import TiltCard from "../components/TiltCard";
import { photoFor } from "../components/PhotoDeck";
import { smeModules } from "../data";

const filesSeed = [
  { id: 1, label: "GST workings for March", shared: true },
  { id: 2, label: "Query on the TDS challan", shared: true },
  { id: 3, label: "Draft board minutes", shared: false },
];

export default function Sme() {
  const [files, setFiles] = useState(filesSeed);
  const [current, setCurrent] = useState(smeModules[0].id);
  const active = smeModules.find((item) => item.id === current) || smeModules[0];
  const index = Math.max(0, smeModules.findIndex((item) => item.id === current));
  const showShare = active.id === "sme-collab" || active.id === "sme-docs";

  return (
    <section className="section">
      <div className="container col-lg-9">
        <div>
          <p className="kicker" data-reveal>For the client</p>
          <h1 className="display" data-reveal>What your company sees</h1>
          <p className="lede" data-reveal>A short path. Open a step to see the page your CA would share with you.</p>
        </div>
        <div className="client-path" role="tablist" aria-label="Client steps">
          {smeModules.map((item, step) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-reveal
              className={item.id === current ? "on" : ""}
              onClick={() => setCurrent(item.id)}
            >
              {step + 1}
            </button>
          ))}
        </div>
        <TiltCard as="article" className="client-letter" key={active.id} data-reveal>
          <img className="client-banner" src={photoFor(active.id)} alt="" />
          <div className="client-body">
            <p className="note mb-1">Step {index + 1} of {smeModules.length}</p>
            <h2>{active.title}</h2>
            <p>{active.summary}</p>
            <ul className="facts">
              {active.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {showShare && (
              <div className="share-split">
                <div>
                  <h3 className="h6">Your side</h3>
                  {files.map((file) => (
                    <div className="check-row" key={file.id}>
                      <strong>{file.label}</strong>
                      <button
                        type="button"
                        className={`status ${file.shared ? "ok" : "review"}`}
                        onClick={() =>
                          setFiles((list) =>
                            list.map((entry) => (entry.id === file.id ? { ...entry, shared: !entry.shared } : entry)),
                          )
                        }
                      >
                        {file.shared ? "Shared" : "Private"}
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="h6">What your CA sees</h3>
                  {files.every((file) => !file.shared) && <p className="note">Nothing shared.</p>}
                  <ul className="mb-0">
                    {files.filter((file) => file.shared).map((file) => (
                      <li key={file.id}>{file.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </TiltCard>
        <Continue to="/" text="The firm runs this from the homepage." label="Back to the firm view" />
      </div>
    </section>
  );
}
