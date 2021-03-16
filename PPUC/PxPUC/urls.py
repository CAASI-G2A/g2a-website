"""
Definition of urls for PPUC.
"""

from datetime import datetime
from django.urls import path
from PxPUC import forms, views

urlpatterns = [
    path("PxPUC/", views.home, name="PxPUC"),
    path("PxPUC/view_location/<int:lid>", views.view_location, name="view_location"),
    path("PxPUC/view_sentence/<int:sid>", views.view_sentence, name="view_sentence"),
    path("PxPUC/edit_sentence/<int:sid>", views.edit_sentence, name="edit_sentence"),
    path("PxPUC/locations", views.LocationList.as_view(), name="location-list"),
    path("PxPUC/update", views.update_server),
    path(
        "PxPUC/location/<int:lid>",
        views.LocationRetrieve.as_view(),
        name="location-retrieve",
    ),
    path(
        "PxPUC/location/<int:lid>/contract",
        views.LocationContractRetrieve.as_view(),
        name="location-contract-retrieve",
    ),
    path("PxPUC/location/<int:lid>/contract/download", views.contract_download),
    path(
        "PxPUC/location/<int:lid>/questions",
        views.LocationQuestionList.as_view(),
        name="location-questions-list",
    ),
    path(
        "PxPUC/location/<int:lid>/stages",
        views.LocationStageList.as_view(),
        name="location-stages-list",
    ),
    path(
        "PxPUC/researcher",
        views.ResearcherSearchList.as_view(),
        name="researcher-search",
    ),
]
