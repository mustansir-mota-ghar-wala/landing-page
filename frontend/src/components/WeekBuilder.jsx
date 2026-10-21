import { useState } from "react";
import { modules } from "../data";
import FeatureStage from "./FeatureStage";

const statuses = ["On track", "Needs documents", "In review"];
const statusClass = {
  "On track": "ok",
  "Needs documents": "wait",
  "In review": "review",
};

const starters = [
  { name: "GST return", date: "20 Oct" },
  { name: "TDS payment", date: "7 Nov" },
  { name: "ROC filing", date: "30 Oct" },
  { name: "Income-tax audit", date: "31 Oct" },
];

let nextId = 10;

export default function WeekBuilder({ mode, onMode, compact = false }) {
  const [rows, setRows] = useState([
    { id: 1, name: "GST return", date: "20 Oct", status: "On track" },
    { id: 2, name: "TDS payment", date: "7 Nov", status: "Needs documents" },
    { id: 3, name: "ROC filing", date: "30 Oct", status: "In review" },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Collect GST workings", owner: "Neha", done: false },
    { id: 2, title: "Review TDS challan", owner: "Amit", done: true },
    { id: 3, title: "Send the open query", owner: "You", done: false },
  ]);
  const [files, setFiles] = useState([
    { id: 1, client: "Mehta Traders", file: "GSTR-3B workings.pdf", shared: true },
    { id: 2, client: "Northwind Pvt Ltd", file: "Board resolution.pdf", shared: false },
  ]);
  const activeModule = modules.find((item) => item.id === mode);
  const builtIn = ["compliance", "tasks", "documents"].includes(mode);

  function addRow(item) {
    setRows((current) => {
      if (current.some((row) => row.name === item.name)) return current;
      return [...current, { id: nextId++, ...item, status: "On track" }];
    });
    onMode("compliance");
  }

  function cycle(id) {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        const index = statuses.indexOf(row.status);
        return { ...row, status: statuses[(index + 1) % statuses.length] };
      }),
    );
  }

  return (
    <div className={`preview ${compact ? "compact" : ""}`} id="week">
      {!compact && (
        <>
          <h2 className="h4 panel-title mb-1">Try a sample firm</h2>
          <p className="note mb-3">Click a status. Nothing here is saved.</p>
          <div className="mode-tabs mb-3" role="tablist">
            {[
              ["compliance", "Compliance"],
              ["tasks", "Tasks"],
              ["documents", "Documents"],
              ["finance", "Finance"],
            ].map(([id, label]) => (
              <button key={id} type="button" className={mode === id ? "active" : ""} onClick={() => onMode(id)}>
                {label}
              </button>
            ))}
            {activeModule && !["compliance", "tasks", "documents", "finance"].includes(mode) && (
              <button type="button" className="active">{activeModule.title}</button>
            )}
          </div>
        </>
      )}

      {mode === "compliance" && (
        <>
          <div className="chip-row mb-2">
            {starters.map((item) => (
              <button key={item.name} type="button" className="chip" onClick={() => addRow(item)}>
                Add {item.name}
              </button>
            ))}
          </div>
          {rows.slice(0, 3).map((row) => (
            <div className="week-row" key={row.id}>
              <strong>{row.name}</strong>
              <span className="note">{row.date}</span>
              <button type="button" className={`status ${statusClass[row.status]}`} onClick={() => cycle(row.id)}>
                {row.status}
              </button>
            </div>
          ))}
        </>
      )}

      {mode === "tasks" && (
        <>
          {tasks.slice(0, 3).map((task) => (
            <label className="task-row" key={task.id}>
              <span>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={task.done}
                  onChange={() =>
                    setTasks((current) =>
                      current.map((item) => (item.id === task.id ? { ...item, done: !item.done } : item)),
                    )
                  }
                />
                <strong className={task.done ? "text-decoration-line-through" : ""}>{task.title}</strong>
              </span>
              <span className="note">{task.owner}</span>
              <span className={`status ${task.done ? "ok" : "wait"}`}>{task.done ? "Done" : "Open"}</span>
            </label>
          ))}
          <button
            type="button"
            className="btn-ghost mt-3"
            onClick={() =>
              setTasks((current) => [
                ...current,
                { id: nextId++, title: "Follow up with the client", owner: "You", done: false },
              ])
            }
          >
            Add a follow-up
          </button>
        </>
      )}

      {mode === "documents" &&
        files.map((file) => (
          <div className="check-row" key={file.id}>
            <div>
              <strong>{file.file}</strong>
              <div className="note">{file.client}</div>
            </div>
            <button
              type="button"
              className={`status ${file.shared ? "ok" : "review"}`}
              onClick={() =>
                setFiles((current) =>
                  current.map((item) => (item.id === file.id ? { ...item, shared: !item.shared } : item)),
                )
              }
            >
              {file.shared ? "Shared with client" : "Internal only"}
            </button>
          </div>
        ))}

      {!builtIn && <FeatureStage module={activeModule} plain />}
    </div>
  );
}
