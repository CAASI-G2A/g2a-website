"""
Definition of views.
"""

from datetime import datetime
from django.shortcuts import render
from django.http import HttpRequest

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/index.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
        }
    )

def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/contact.html',
        {
            'title':'Contact',
            'message':'Your contact page.',
            'year':datetime.now().year,
        }
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/about.html',
        {
            'title':'About',
            'message':'Your application description page.',
            'year':datetime.now().year,
        }
    )

def directory(request):
    """Renders the directory page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/directory.html',
        {
            'title':'Directory',
            'message':'Directory stuff',
            'year':datetime.now().year,
        }
    )

def dashboard(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/dashboard.html',
        {
            'title':'Dashboard',
            'message':'Dashboard stuff',
            'year':datetime.now().year,
        }
    )

def submitreview(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'pbb/submitreview.html',
        {
            'title':'Submit A Review',
            'message':'Submit A Review stuff',
            'year':datetime.now().year,
        }
    )