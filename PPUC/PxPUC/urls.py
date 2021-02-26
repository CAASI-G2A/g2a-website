"""
Definition of urls for PPUC.
"""

from datetime import datetime
from django.urls import path
from PxPUC import forms, views
urlpatterns = [
    path('PxPUC/', views.home, name='PxPUC'),
    path('PxPUC/search/', views.search, name='search'),
    path('PxPUC/search_contract/', views.search_contract, name='search_contract'),
    path('PxPUC/view_location/<int:lid>', views.view_location, name='view_location'),
    path('PxPUC/view_sentence/<int:sid>', views.view_sentence, name='view_sentence'),
    path('PxPUC/edit_sentence/<int:sid>', views.edit_sentence, name='edit_sentence'),
    path('PxPUC/download_pdf/<int:lid>', views.download_pdf, name='download_pdf'),
    path('PxPUC/download_txt/<int:lid>', views.download_txt, name='download_txt'),
    path('PxPUC/locations', views.LocationList.as_view()),
    path('PxPUC/location/<int:lid>/questions', views.LocationQuestionList.as_view()),
    path('PxPUC/location/<int:lid>/stages', views.LocationStageList.as_view()),
    path('PxPUC/researcher', views.ResearcherSearchList.as_view())
    ]
