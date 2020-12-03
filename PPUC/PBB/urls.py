"""
Definition of urls for PBB
"""

from datetime import datetime
from django.urls import path
from django.contrib import admin
from PBB import forms, views


urlpatterns = [
    path('PBB/', views.home, name='PBB/'),
    path('PBB/contact/', views.contact, name='PBB/contact'),
    path('PBB/about/', views.about, name='PBB/about'),
    path('PBB/directory/', views.directory, name='PBB/directory'),
    path('PBB/dashboard/', views.dashboard, name='PBB/dashboard'),
    path('PBB/submitreview/', views.submitreview, name='PBB/submitreview'),
]
