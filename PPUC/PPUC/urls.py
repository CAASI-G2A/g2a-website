"""
Definition of urls for PPUC.
"""

from datetime import datetime
from django.urls import path
from django.conf.urls import url,include
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from app import forms, views
import PBB.urls
urlpatterns = [
	url('^',include(PBB.urls)),
    path('', views.home, name='home'),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('search/', views.search, name='search'),
    path('search_contract/', views.search_contract, name='search_contract'),
    path('view_location/<int:lid>', views.view_location, name='view_location'),
    path('edit_sentence/<int:sid>', views.edit_sentence, name='edit_sentence'),
    path('complaint/<int:lid>',views.complaint, name='complaint'),
    path('login/',
         LoginView.as_view
         (
             template_name='app/login.html',
             authentication_form=forms.BootstrapAuthenticationForm,
             extra_context=
             {
                 'title': 'Log in',
                 'year' : datetime.now().year,
             }
         ),
         name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('admin/', admin.site.urls)
    ]
