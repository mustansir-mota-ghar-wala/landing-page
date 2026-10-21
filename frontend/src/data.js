export const fallbackPlans = [
  {
    id: "silver",
    name: "Silver",
    price: 40000,
    list_price: 50000,
    users: 10,
    storage_gb: 10,
    extras: [],
    features: [
      "Email and call support",
      "Compliance calendar and alerts",
      "Document management",
      "Invoice management",
      "Client communication",
      "Unlimited client logins",
      "Android and iOS app",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 70000,
    list_price: 85000,
    users: 20,
    storage_gb: 20,
    extras: [],
    features: [
      "Email and call support",
      "Compliance calendar and alerts",
      "Document management",
      "Invoice management",
      "Client communication",
      "Unlimited client logins",
      "Android and iOS app",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 150000,
    list_price: 175000,
    users: 50,
    storage_gb: 50,
    extras: ["Proforma invoice", "Tally integration"],
    features: [
      "Email and call support",
      "Compliance calendar and alerts",
      "Document management",
      "Invoice management",
      "Client communication",
      "Unlimited client logins",
      "Android and iOS app",
      "Proforma invoice",
      "Tally integration",
    ],
  },
];

export const billingNote =
  "Taxes extra. Prices are shown without a month or year label.";

export function inr(amount) {
  return `INR ${Number(amount).toLocaleString("en-IN")}`;
}

export function matchPlan(plans, users) {
  const ordered = [...plans].sort((a, b) => a.users - b.users);
  const fit = ordered.find((plan) => users <= plan.users);
  if (fit) return { plan: fit, overflow: false };
  return { plan: ordered[ordered.length - 1], overflow: true };
}

export const modules = [
  {
    id: "compliance",
    title: "Manage compliance",
    summary: "GST, TDS, income tax, and ROC dates for the firm and each client.",
    points: [
      "Import the India master list, or define your own.",
      "Turn a master item into tasks for the people who do the work.",
      "Open one compliance dashboard and filter by client and period.",
    ],
  },
  {
    id: "collaboration",
    title: "Collaboration with clients",
    summary: "Give the client a login and share only the tasks, files, status, and invoices you choose.",
    points: [
      "Unlimited client logins on every published plan.",
      "The client cannot see another client’s file.",
      "Queries stay on the item instead of in a long email chain.",
    ],
    sample: [
      { id: 1, label: "GST status for March", meta: "Mehta Traders", states: ["Shared", "Hidden"], state: "Shared" },
      { id: 2, label: "Open query on TDS", meta: "Mehta Traders", states: ["Shared", "Hidden"], state: "Shared" },
      { id: 3, label: "Internal review note", meta: "Firm only", states: ["Shared", "Hidden"], state: "Hidden" },
    ],
  },
  {
    id: "tasks",
    title: "Work management",
    summary: "Assign work, move it between people, and see what is still open.",
    points: [
      "One list for the firm instead of personal inboxes.",
      "Reminders go out without a partner chasing them.",
      "Due dates stay attached to the client file.",
    ],
  },
  {
    id: "documents",
    title: "Document management",
    summary: "Client files live with the work, not in a drive nobody can search.",
    points: [
      "Share a file with the client without emailing it.",
      "Keep last year’s workings next to this year’s task.",
      "The firm owns the files and can download them.",
    ],
  },
  {
    id: "finance",
    title: "Financial management",
    summary: "Bill from the work already done, chase what is unpaid, and log hours and expenses.",
    points: [
      "Raise an invoice from a finished task.",
      "Send a payment reminder without rewriting the bill.",
      "Log billable hours and expenses so revenue is not missed.",
    ],
    sample: [
      { id: 1, label: "GST return · 3.5 hours", meta: "Mehta Traders", states: ["Unbilled", "On invoice"], state: "Unbilled" },
      { id: 2, label: "Invoice INR 25,000", meta: "Due 7 days", states: ["Unpaid", "Reminder sent", "Paid"], state: "Unpaid" },
      { id: 3, label: "Out-of-pocket travel", meta: "INR 1,800", states: ["Expense", "Added to bill"], state: "Expense" },
    ],
  },
  {
    id: "roles",
    title: "Role based access",
    summary: "Partner, manager, staff, and client each see a different slice of the same firm.",
    points: [
      "A staff login sees assigned work, not the whole practice.",
      "A client login sees only what was shared.",
      "You can change a person’s role without a new account.",
    ],
    sample: [
      { id: 1, label: "Partner", meta: "Whole firm", states: ["Full access", "Restricted"], state: "Full access" },
      { id: 2, label: "Manager", meta: "Team and bills", states: ["Team access", "Own work only"], state: "Team access" },
      { id: 3, label: "Staff", meta: "Assigned tasks", states: ["Own work only", "Team access"], state: "Own work only" },
      { id: 4, label: "Client", meta: "Shared items", states: ["Shared only", "No login"], state: "Shared only" },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    summary: "Compliance status, task progress, and money still to collect, without rebuilding a sheet.",
    points: [
      "Filter by client, owner, or period.",
      "See which jobs are late before the month closes.",
      "Use the same numbers the team is already updating.",
    ],
    views: [
      { id: "compliance", label: "Compliance", lines: ["12 due this month", "3 waiting on documents", "1 already filed"] },
      { id: "tasks", label: "Tasks", lines: ["28 open", "9 due this week", "6 finished yesterday"] },
      { id: "money", label: "Collections", lines: ["INR 1,80,000 invoiced", "INR 46,000 unpaid", "4 reminders not sent"] },
    ],
  },
  {
    id: "alerts",
    title: "Configurable alerts",
    summary: "Choose which dates and overdue items notify you, the team, or the client.",
    points: [
      "Turn an alert on for GST, TDS, ROC, or a task you marked critical.",
      "Send it by email or on the mobile app.",
      "Keep noise down by alerting the owner, not the whole firm.",
    ],
    sample: [
      { id: 1, label: "GST due in 3 days", meta: "Email and app", states: ["On", "Off"], state: "On" },
      { id: 2, label: "Task overdue", meta: "Partner", states: ["On", "Off"], state: "On" },
      { id: 3, label: "Invoice unpaid 15 days", meta: "Client email", states: ["On", "Off"], state: "Off" },
    ],
  },
  {
    id: "mobile",
    title: "CA Dashboard on mobile",
    summary: "Android and iOS, on every published plan, with the same login as the web app.",
    points: [
      "See what is due when you are away from the office.",
      "Receive the alerts you configured.",
      "Update a task status without opening a laptop.",
    ],
    sample: [
      { id: 1, label: "Today’s due list", meta: "Home screen", states: ["Shown", "Hidden"], state: "Shown" },
      { id: 2, label: "Push alert for GST", meta: "3 days before", states: ["On", "Off"], state: "On" },
      { id: 3, label: "Mark a task done", meta: "From the phone", states: ["Allowed", "View only"], state: "Allowed" },
    ],
  },
  {
    id: "dashboards",
    title: "Dashboards",
    summary: "Employee, client, compliance, and business views of the same work.",
    points: [
      "Compliance dashboard for what is due.",
      "Employee view for who is carrying the load.",
      "Client and business views for status and billing.",
    ],
    views: [
      { id: "compliance", label: "Compliance", lines: ["4 due this week", "2 blocked on the client", "1 filed today"] },
      { id: "employee", label: "Employee", lines: ["Neha · 6 open", "Amit · 3 open", "You · 2 reviews"] },
      { id: "client", label: "Client", lines: ["Mehta Traders · GST open", "Northwind · invoice unpaid"] },
      { id: "business", label: "Business", lines: ["18 active clients", "INR 46,000 to collect", "11 tasks closed this week"] },
    ],
  },
  {
    id: "inward",
    title: "Inward and outward",
    summary: "Log what came in from a client or department, and what the firm sent out.",
    points: [
      "Record an inward paper or file against the client.",
      "Record what was sent out, and to whom.",
      "Find it later next to the task, not in a register book.",
    ],
    sample: [
      { id: 1, label: "GST notice", meta: "Mehta Traders", states: ["Inward", "Outward"], state: "Inward" },
      { id: 2, label: "Signed engagement letter", meta: "Northwind", states: ["Outward", "Inward"], state: "Outward" },
    ],
  },
  {
    id: "master",
    title: "Master data",
    summary: "Clients, services, and people set up once, then reused on every compliance and bill.",
    points: [
      "Keep the client’s legal name, GSTIN, and contacts in one record.",
      "Attach the services you actually provide.",
      "New tasks pick the client from this list instead of retyping it.",
    ],
    sample: [
      { id: 1, label: "Legal name", meta: "Mehta Traders Pvt Ltd", states: ["Complete", "Missing"], state: "Complete" },
      { id: 2, label: "GSTIN", meta: "Client master", states: ["Missing", "Complete"], state: "Missing" },
      { id: 3, label: "Services", meta: "GST, TDS, ROC", states: ["Set", "Not set"], state: "Set" },
    ],
  },
  {
    id: "quotes",
    title: "Quotation, invoice, and payment",
    summary: "Send a quote, turn the accepted one into an invoice, and mark the payment.",
    points: [
      "Keep a standard quote for repeat work.",
      "Convert an accepted quote into the invoice.",
      "Platinum adds a proforma invoice.",
    ],
    sample: [
      { id: 1, label: "GST retainer quote", meta: "INR 40,000", states: ["Draft", "Sent", "Accepted"], state: "Draft" },
      { id: 2, label: "Proforma invoice", meta: "Platinum", states: ["Not on this plan", "Available"], state: "Available" },
    ],
  },
  {
    id: "expenses",
    title: "Advance and expense",
    summary: "Staff advances and out-of-pocket costs, marked so they can be billed or adjusted.",
    points: [
      "Log an expense against the client job.",
      "Record a staff advance and clear it later.",
      "Do not lose the amount because it lived in a chat message.",
    ],
    sample: [
      { id: 1, label: "Travel to client", meta: "INR 1,800", states: ["Billable", "Firm cost"], state: "Billable" },
      { id: 2, label: "Advance to Amit", meta: "INR 5,000", states: ["Open", "Adjusted"], state: "Open" },
    ],
  },
  {
    id: "ai",
    title: "Ask the firm",
    summary: "Ask a plain-language question about this organisation’s tasks, bills, GST, and compliance. The answer is read from those records.",
    points: [
      "It only sees the organisation you are logged into.",
      "It does not return a database query.",
      "It does not create, edit, or delete a record.",
    ],
  },
  {
    id: "leave",
    title: "Leave and holidays",
    summary: "See who is away before you assign a filing that is due that week.",
    points: [
      "Staff apply for leave inside the same login.",
      "A manager approves or keeps it pending.",
      "The work list can avoid a person who is out.",
    ],
    sample: [
      { id: 1, label: "Neha · 21 Oct", meta: "Casual leave", states: ["Pending", "Approved"], state: "Pending" },
      { id: 2, label: "Office holiday · 2 Oct", meta: "Firm calendar", states: ["Marked", "Not marked"], state: "Marked" },
    ],
  },
];

export const moduleGroups = [
  {
    title: "For professionals",
    note: "Compliance, client work, documents, money, access, reports, alerts, and mobile.",
    ids: ["compliance", "collaboration", "tasks", "documents", "finance", "roles", "reports", "alerts", "mobile"],
  },
  {
    title: "Also in the product",
    note: "Dashboards, quotes, expenses, and Ask the firm.",
    ids: ["dashboards", "quotes", "expenses", "ai"],
  },
];

export const smeModules = [
  {
    id: "sme-compliance",
    title: "Take control of compliance",
    summary: "See the organisation’s compliance in real time, instead of waiting for a status mail.",
    points: ["Dates your CA is tracking.", "What is on track, waiting, or in review.", "A single list for the company."],
  },
  {
    id: "sme-collab",
    title: "Collaborate with your CA, CS, or other advisor",
    summary: "Connect to the firm that serves you and share files and answers on the same item.",
    points: ["One login for the company.", "Send a document back on the request.", "Keep other clients’ work out of your view."],
  },
  {
    id: "sme-work",
    title: "Work management",
    summary: "The tasks your advisor assigned to your team, with a due date.",
    points: ["See what they are waiting on.", "Mark your part done.", "The firm sees the same status."],
  },
  {
    id: "sme-docs",
    title: "Document management",
    summary: "Company files shared with the firm, next to the request they belong to.",
    points: ["Share only the file you choose.", "Keep a private draft off their list.", "Download what you uploaded."],
  },
  {
    id: "sme-roles",
    title: "Role based access",
    summary: "Directors, accounts, and staff inside the company do not all see the same items.",
    points: ["Accounts can see bills and GST.", "A staff login can be limited to one request.", "You decide who gets a login."],
  },
  {
    id: "sme-reports",
    title: "Reports",
    summary: "A short view of what is due and what is still open with your advisor.",
    points: ["Compliance status for the period.", "Open requests.", "Invoices still to pay."],
  },
  {
    id: "sme-mobile",
    title: "CA Dashboard on mobile",
    summary: "The same client login on Android and iOS.",
    points: ["Check a due date away from the office.", "Reply to a request.", "See an alert you opted into."],
  },
];

export const steps = [
  {
    id: 1,
    title: "Add your clients",
    text: "Put firms, contacts, and the services you handle for each of them in one list.",
  },
  {
    id: 2,
    title: "Set the work",
    text: "Create compliance dates and hand tasks to the people who will do them.",
  },
  {
    id: 3,
    title: "Track it together",
    text: "You, your staff, and your clients look at the same status.",
  },
];

export const stories = [
  {
    id: "joisar",
    name: "CA Rohit Joisar",
    firm: "R S Joisar & Co.",
    quote:
      "CA Dashboard has changed how we bill and how we see which staff member holds which task. Client data sits in one place instead of being rebuilt for every job.",
  },
  {
    id: "sas",
    name: "Sudha Baskar",
    firm: "SAS Partners · using it since 2014",
    quote:
      "We use it for client details, standard quotes, assigning tasks, and reports on what is finished. Requests for changes have been taken up by the team.",
  },
  {
    id: "mukherjee",
    name: "P Mukherjee and Co.",
    firm: "Kolkata",
    quote:
      "Allocating work online and watching the status let us deliver inside the time we promised, and it cut the chance of missing a statutory date.",
  },
  {
    id: "jain",
    name: "Pawan Jain & Associates",
    firm: "Practice team",
    quote:
      "Scheduling tasks, moving them between people, reminding clients, and invoicing from one page is what made the firm’s process digital.",
  },
  {
    id: "chennai",
    name: "A large CA firm",
    firm: "Chennai",
    quote:
      "I can see how the teams are working from wherever I am. The practice is easier to supervise, and productivity went up.",
  },
];

export const firms = [
  "Kreston Menon, Dubai",
  "R S Joisar & Co.",
  "SAS Partners",
  "P Mukherjee and Co.",
  "Pawan Jain & Associates",
  "Dron Bhardwaj and Associates",
];

export const faqs = [
  {
    q: "What is CA Dashboard?",
    a: "A cloud practice system for CA, CS, and lawyer firms, and for the SME clients they serve. It keeps compliance dates, tasks, documents, and bills in one login.",
  },
  {
    q: "Who is this site for?",
    a: "This site is for CA and CS firms. SME clients have their own page, because the job they need is different: see what their advisor needs, and share files back.",
  },
  {
    q: "How does a free trial work here?",
    a: "The form saves your request. It does not ask for GST, and it does not ask you to phone sales for an OTP. It does not create a login.",
  },
  {
    q: "What do the prices include?",
    a: "Silver, Gold, and Platinum differ by user logins and storage. Every plan includes the modules, client logins, email and call support, and the mobile apps. Platinum adds proforma invoices and Tally. Taxes are extra. Prices are shown without a month or year label.",
  },
  {
    q: "Is the price per month or per year?",
    a: "The prices are shown as a single amount. They are not labelled per month or per year.",
  },
  {
    q: "Who owns the data?",
    a: "The firm owns what it uploads. CA Dashboard’s own policy says you can download your files, and that customer data is not sold.",
  },
  {
    q: "Can another client see my files?",
    a: "No. Access is by login. A client login sees only what that firm shares with them.",
  },
  {
    q: "When is support available?",
    a: "Weekdays, 10 AM to 7 PM IST. Sales: sales@cadashboard.com and +91 96890 93892. Support: support@cadashboard.com and +91 88050 08574.",
  },
];
