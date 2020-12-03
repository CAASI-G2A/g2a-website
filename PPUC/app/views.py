"""
Definition of views.
"""

from datetime import datetime
from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from django.http import HttpRequest
from django.http import HttpResponse
from .models import *
from app.forms import *
from django.views.generic import ListView, FormView
from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
import os
import re
import nltk
import mimetypes
from nltk.tokenize import sent_tokenize

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

def researchers(request):
    """Renders the researchers redirect page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/researchers.html',
        {
            'title':'Researchers',
        }
    )

def search(request):
    context = {}
    query = request.GET.get('q','')
    locations = Location.objects.filter(Q(name__icontains=query))

    context = {
        'title' : 'Search',
        'locations' : locations,
        }
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/search.html',
        context
    )
def citizens(request):
    context = {}
    query = request.GET.get('q','')
    locations = Location.objects.filter(Q(name__icontains=query))

    context = {
        'title' : 'Search',
        'locations' : locations,
        }
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/citizens.html',
        context
    )

def search_contract(request):
    context = {}
    query = request.GET.get('q','')
    searched_term = request.GET.get('q')
    if query == '':
        results = ''
    else:
        results = []
        querySet = Sentence.objects.filter(Q(text__icontains=query))
        for result in querySet:
            t = result.text
            lower = t.lower()
            q_length = len(searched_term)
            pos = lower.find(searched_term.lower())
            result.first = t[:pos]
            result.second = t[pos:pos+q_length]
            result.third = t[pos+q_length:]
            loc = Location.objects.get(name=result.location)
            result.lid = loc.id
            results.append((result))
        context = {
            'title' : 'Search Contracts',
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
    sentences = Problematic_Sentence.objects.filter(Q(location=location))
    context = {
        'title' : 'View Location',
        'location' : location,
        'sentences' : sentences,
        'form' : ProblematicLanguageForm
        }
    assert isinstance(request, HttpRequest)
    return render(request,'app/view_location.html',context)

def download_pdf(request, lid):
    location = Location.objects.get(pk=lid)
    state = re.sub(' ', '-', location.state)
    city = re.sub(' ', '-', location.name)
    fn = state + "_" + city + ".pdf"
    dirspot = os.getcwd()
    file_path = dirspot + "/app/static/app/contracts_pdf/" + fn
    filename = fn
    fl = open(file_path, mode="rb")
    mime_type, _ = mimetypes.guess_type(file_path)
    response = HttpResponse(fl, content_type='application/pdf')
    response['Content-Disposition'] = "attachment; filename=%s" % filename
    return response

def download_txt(request, lid):
    location = Location.objects.get(pk=lid)
    state = re.sub(' ', '-', location.state)
    city = re.sub(' ', '-', location.name)
    fn = state + "_" + city + ".txt"
    dirspot = os.getcwd()
    file_path = dirspot + "/app/static/app/contracts_txt/" + fn
    filename = fn
    fl = open(file_path, mode="rb")
    mime_type, _ = mimetypes.guess_type(file_path)
    response = HttpResponse(fl, content_type='application/txt')
    response['Content-Disposition'] = "attachment; filename=%s" % filename
    return response
	
def view_sentence(request, sid):
    print(sid)
    sentence = Problematic_Sentence.objects.get(id=sid)
    form = ProblematicLanguageForm(instance=sentence)
    return render(request, 'app/view_sentence.html', {'title' : 'Edit Sentence', 'form': form, 'sentence' : sentence})

def edit_sentence(request, sid):
    print(sid)
    sentence = Problematic_Sentence.objects.get(id=sid)
    if request.method == 'POST':
        form = ProblematicLanguageForm(request.POST)
        if form.is_valid():
            sentence.refresh_from_db()
            sentence.impact = form.cleaned_data.get('impact')
            sentence.limit_oversight = form.cleaned_data.get('limit_oversight')
            sentence.city_pay_for_misconduct = form.cleaned_data.get('city_pay_for_misconduct')
            sentence.erase_misconduct = form.cleaned_data.get('erase_misconduct')
            sentence.disqualify_complaints = form.cleaned_data.get('disqualify_complaints')
            sentence.restrict_interrogation = form.cleaned_data.get('restrict_interrogation')
            sentence.unfair_information = form.cleaned_data.get('unfair_information')
            sentence.save()
            location = Location.objects.filter(Q(name__icontains=sentence.location)).first()
            lid = location.id
            return view_location(request, lid)
    else:
        form = ProblematicLanguageForm(instance=sentence)
        return render(request, 'app/edit_sentence.html', {'title' : 'Edit Sentence','form': form, 'sentence' : sentence})

def complaint(request,lid):
    location = Location.objects.get(pk=lid)
    questions = location.questions.all()
    context = {}
    searchTerm = request.GET.get('searchTerm','')
    if searchTerm != '':
        results = Sentence.objects.filter(Q(location=location),Q(text__icontains=searchTerm))
    else:
        results = ''
    context = {'title': 'Complaints', 'location' : location, 'questions': questions, 'results' : results}
    return render(request,'app/complaint.html', context)
