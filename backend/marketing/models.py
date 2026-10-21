from django.db import models


class Lead(models.Model):
    TRIAL = "trial"
    DEMO = "demo"
    CONTACT = "contact"
    KIND_CHOICES = [
        (TRIAL, "Free trial"),
        (DEMO, "Demo"),
        (CONTACT, "Contact"),
    ]

    kind = models.CharField(max_length=20, choices=KIND_CHOICES)
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    firm = models.CharField(max_length=160, blank=True)
    employees = models.PositiveIntegerField(null=True, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.get_kind_display()} · {self.firm or self.name}"
