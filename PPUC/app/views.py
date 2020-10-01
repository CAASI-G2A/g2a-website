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

def search_contract(request):
    context = {}
    query = request.GET.get('q','')
    if query == '':
        results = ''
    else:
        results = Contract.objects.filter(Q(text__icontains=query))

    context = {
        'results' : results,
        }
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/search_contract.html',
        context
    )

def view_location(request, lid):
    context = {}
    location = Location.objects.get(pk=lid)
    reviews = Review.objects.all()
    r = []
    for review in reviews:
        print("checking review")
        if review.location == location:
            print("adding..")
            r.append(review)
            context = {
                       'location' : review.location,
                       'r' : r,
                       }
    assert isinstance(request, HttpRequest)
    return render(request,'app/view_location.html',context)

def view_contract(request, cid):
    context = {}
    contract = Contract.objects.get(pk=cid)
    context = {
        'location' : contract.location,
        'text' : contract.text,
              }
    assert isinstance(request, HttpRequest)
    return render(request,'app/test.html',context)