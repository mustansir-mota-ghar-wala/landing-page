from django.contrib import admin

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("created_at", "kind", "name", "firm", "email", "employees")
    list_filter = ("kind",)
    search_fields = ("name", "email", "firm")
