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
]
