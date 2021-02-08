"""
Definition of urls for PPUC.
"""

from datetime import datetime
from django.urls import path
from PxPUC import forms, views
urlpatterns = [
    path('PxPUC/', views.home, name='PxPUC'),
    path('PxPUC/contact/', views.contact, name='contact'),
    path('PxPUC/about/', views.about, name='about'),
    path('PxPUC/search/', views.search, name='search'),
    path('PxPUC/researchers/', views.researchers, name='researchers'),
    path('PxPUC/citizens/', views.citizens, name='citizens'),
    path('PxPUC/search_contract/', views.search_contract, name='search_contract'),
    path('PxPUC/view_location/<int:lid>', views.view_location, name='view_location'),
    path('PxPUC/view_sentence/<int:sid>', views.view_sentence, name='view_sentence'),
    path('PxPUC/edit_sentence/<int:sid>', views.edit_sentence, name='edit_sentence'),
    path('PxPUC/complaint/<int:lid>',views.complaint, name='complaint'),
    path('PxPUC/download_pdf/<int:lid>', views.download_pdf, name='download_pdf'),
    path('PxPUC/download_txt/<int:lid>', views.download_txt, name='download_txt')
    ]
