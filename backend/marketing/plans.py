PLANS = [
    {
        "id": "silver",
        "name": "Silver",
        "price": 40000,
        "list_price": 50000,
        "users": 10,
        "storage_gb": 10,
        "extras": [],
    },
    {
        "id": "gold",
        "name": "Gold",
        "price": 70000,
        "list_price": 85000,
        "users": 20,
        "storage_gb": 20,
        "extras": [],
    },
    {
        "id": "platinum",
        "name": "Platinum",
        "price": 150000,
        "list_price": 175000,
        "users": 50,
        "storage_gb": 50,
        "extras": ["Proforma invoice", "Tally integration"],
    },
]

SHARED_FEATURES = [
    "Email and call support",
    "Compliance calendar and alerts",
    "Document management",
    "Invoice management",
    "Client communication",
    "Unlimited client logins",
    "Android and iOS app",
]

BILLING_NOTE = (
    "Taxes extra. Prices are shown without a month or year label."
)


def match_plan(users):
    ordered = sorted(PLANS, key=lambda plan: plan["users"])
    for plan in ordered:
        if users <= plan["users"]:
            return plan, False
    return ordered[-1], True
