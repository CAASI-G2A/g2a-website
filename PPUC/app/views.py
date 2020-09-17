"""
Definition of views.
"""

from datetime import datetime
from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from django.http import HttpRequest
from .models import *
from django.views.generic.list import ListView

def home(request):
    """Renders the home page."""
    context = {
        'title':'Home Page',
        'year':datetime.now().year,
        }
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/index.html',
        context
    )

def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/contact.html',
        {
            'title':'Contact',
            'message':'Contact page.',
            'year':datetime.now().year,
        }
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/about.html',
        {
            'title':'About',
            'message':'application description page.',
            'year':datetime.now().year,
        }
    )

def search(request):
    context = {}
    query = request.GET.get('q','')
    locations = Location.objects.filter(Q(name__icontains=query))

    context = {
        'locations' : locations,
        }
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/search.html',
        context
    )

def view_location(request, lid):
    context = {}
    location = Location.objects.get(pk=lid)
    reviews = Review.objects.all()
    for review in reviews:
        if review.location == location:
            context = {
                        'location' : review.location,
                       'policy_type' : review.policy_type,
                       'expiration' : review.expiration,
                       'section' : review.section,
                       'language' : review.language,
                       'category' : review.category,
                       'impact' : review.impact
                       }
        assert isinstance(request, HttpRequest)
        return render(
            request,
            'app/view_location.html',
            context
        )