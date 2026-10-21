import json

from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .models import Lead
from .plans import BILLING_NOTE, PLANS, SHARED_FEATURES, match_plan


def _plan_payload(plan, overflow=False):
    return {
        **plan,
        "overflow": overflow,
        "features": SHARED_FEATURES + plan["extras"],
    }


@require_GET
def plans(request):
    return JsonResponse(
        {
            "plans": [_plan_payload(plan) for plan in PLANS],
            "billing_note": BILLING_NOTE,
        }
    )


@require_GET
def recommend(request):
    raw = request.GET.get("users", "")
    try:
        users = int(raw)
    except (TypeError, ValueError):
        return JsonResponse({"error": "Enter a whole number of users."}, status=400)
    if users < 1 or users > 500:
        return JsonResponse({"error": "Enter between 1 and 500 users."}, status=400)
    plan, overflow = match_plan(users)
    return JsonResponse(
        {
            "users": users,
            "plan": _plan_payload(plan, overflow),
            "billing_note": BILLING_NOTE,
        }
    )


@csrf_exempt
@require_POST
def create_lead(request):
    try:
        data = json.loads(request.body.decode() or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Send a JSON body."}, status=400)

    kind = (data.get("kind") or "").strip()
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip()
    firm = (data.get("firm") or "").strip()
    message = (data.get("message") or "").strip()
    employees = data.get("employees")

    if kind not in {Lead.TRIAL, Lead.DEMO, Lead.CONTACT}:
        return JsonResponse({"error": "Choose trial, demo, or contact."}, status=400)
    if len(name) < 2:
        return JsonResponse({"error": "Enter your name."}, status=400)
    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"error": "Enter a valid email."}, status=400)
    if len(phone) > 20 or len(firm) > 160 or len(message) > 2000 or len(name) > 120:
        return JsonResponse({"error": "One of the fields is too long."}, status=400)

    employee_count = None
    if employees not in (None, ""):
        try:
            employee_count = int(employees)
        except (TypeError, ValueError):
            return JsonResponse({"error": "Employee count must be a number."}, status=400)
        if employee_count < 1 or employee_count > 500:
            return JsonResponse({"error": "Enter between 1 and 500 employees."}, status=400)

    if kind == Lead.TRIAL and not firm:
        return JsonResponse({"error": "Enter the firm name."}, status=400)

    lead = Lead.objects.create(
        kind=kind,
        name=name,
        email=email,
        phone=phone,
        firm=firm,
        employees=employee_count,
        message=message,
    )
    plan = None
    if employee_count:
        matched, overflow = match_plan(employee_count)
        plan = _plan_payload(matched, overflow)

    return JsonResponse({"ok": True, "id": lead.id, "plan": plan}, status=201)
