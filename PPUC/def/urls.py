"""
Definition of urls for def.
"""

from datetime import datetime
from django.urls import path, re_path, include
from django.conf.urls import include
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from PxPUC import forms, views
import PxPUC.urls

urlpatterns = [
    re_path('^',include(PxPUC.urls)),
    path('', views.home, name='home'),
    path('login/',
         LoginView.as_view
         (
             template_name='PxPUC/login.html',
             authentication_form=forms.BootstrapAuthenticationForm,
             extra_context=
             {
                 'title': 'Log in',
                 'year' : datetime.now().year,
             }
         ),
         name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('admin/', admin.site.urls),
    ]
