from django.urls import path

from . import views

urlpatterns = [
    path("plans/", views.plans, name="plans"),
    path("recommend/", views.recommend, name="recommend"),
    path("leads/", views.create_lead, name="create-lead"),
]
