import { fallbackPlans, billingNote } from "./data";

export async function getPlans() {
  const response = await fetch("/api/plans/");
  if (!response.ok) {
    return { plans: fallbackPlans, billing_note: billingNote };
  }
  return response.json();
}

export async function sendLead(payload) {
  const response = await fetch("/api/leads/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Could not save that. Try again.");
  }
  return data;
}
