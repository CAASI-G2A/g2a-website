"""
Definition of views.
"""

from cgitb import text
from datetime import datetime
from operator import contains
from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q, Prefetch, Count
from django.http import HttpResponse, HttpResponseForbidden, HttpRequest
from .models import *
from .serializers import *
from PxPUC.forms import *
from django.views.generic import ListView, FormView
from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
import os
import sys
import re
import mimetypes
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from django.conf import settings
from django.core.management import call_command
import after_response
import hmac
import hashlib
import subprocess


def landing(request):
    """Renders the landing."""
    context = {
        "title": "G2A",
        "year": datetime.now().year,
    }
    assert isinstance(request, HttpRequest)
    return render(request, "app/landing.html", context)


def map(request):
    """Renders the map."""
    assert isinstance(request, HttpRequest)
    return render(request, "app/test.html")


def marker(request):
    """The icon of the marker"""
    assert isinstance(request, HttpRequest)
    return render(request, "app/marker.png")


def geodata(request):
    """The geo data from geoData.json"""
    assert isinstance(request, HttpRequest)
    return render(request, "app/geoData.json")


def home(request):
    """Renders the home page."""
    context = {
        "title": "Home Page",
        "year": datetime.now().year,
    }
    assert isinstance(request, HttpRequest)
    return render(request, "app/index.html", context)


def view_sentence(request, sid):
    print(sid)
    sentence = Problematic_Sentence.objects.get(id=sid)
    form = ProblematicLanguageForm(instance=sentence)
    return render(
        request,
        "app/view_sentence.html",
        {"title": "Edit Sentence", "form": form, "sentence": sentence},
    )


def edit_sentence(request, sid):
    print(sid)
    sentence = Problematic_Sentence.objects.get(id=sid)
    if request.method == "POST":
        form = ProblematicLanguageForm(request.POST)
        if form.is_valid():
            sentence.refresh_from_db()
            sentence.impact = form.cleaned_data.get("impact")
            sentence.limit_oversight = form.cleaned_data.get("limit_oversight")
            sentence.city_pay_for_misconduct = form.cleaned_data.get(
                "city_pay_for_misconduct"
            )
            sentence.erase_misconduct = form.cleaned_data.get("erase_misconduct")
            sentence.disqualify_complaints = form.cleaned_data.get(
                "disqualify_complaints"
            )
            sentence.restrict_interrogation = form.cleaned_data.get(
                "restrict_interrogation"
            )
            sentence.unfair_information = form.cleaned_data.get("unfair_information")
            sentence.save()
            location = Location.objects.filter(
                Q(name__icontains=sentence.location)
            ).first()
            lid = location.id
            return view_location(request, lid)
    else:
        form = ProblematicLanguageForm(instance=sentence)
        return render(
            request,
            "app/edit_sentence.html",
            {"title": "Edit Sentence", "form": form, "sentence": sentence},
        )


def is_valid_signature(x_hub_signature, data, private_key):
    # x_hub_signature and data are from the webhook payload
    # private key is your webhook secret
    hash_algorithm, github_signature = x_hub_signature.split("=", 1)
    algorithm = hashlib.__dict__.get(hash_algorithm)
    encoded_key = bytes(private_key, "latin-1")
    mac = hmac.new(encoded_key, msg=data, digestmod=algorithm)
    return hmac.compare_digest(mac.hexdigest(), github_signature)


def update_server(request):
    # create async/background task to handle actual updating to meet Github's 10 second timeout
    @after_response.enable
    def run_update_async():
        # get project directory
        project_dir = settings.BASE_DIR

        # try to pull new code
        subprocess.run(["git", "pull"], cwd=project_dir)

        # run setup script
        call_command("runscript", "-v3", "setup_app")

        # restart
        subprocess.run(["touch", settings.WSGI_PATH])

    # process request
    if request.method == "POST":
        # try to get signature from header
        x_hub_signature = request.headers.get("X-Hub-Signature")
        if x_hub_signature is None:
            return HttpResponseForbidden("Permission denied.")

        # validate request
        valid = is_valid_signature(
            x_hub_signature, request.body, settings.GITHUB_HOOK_KEY
        )
        if not valid:
            return HttpResponseForbidden("Permission denied.")

        # start background update task
        run_update_async.after_response()

        # return response
        return HttpResponse("update initiated")
    return HttpResponse()


def save_search_query(request, search):
    print("Made it to query save!")
    return HttpResponse()


class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationRetrieve(generics.RetrieveAPIView):
    lookup_url_kwarg = "lid"
    lookup_field = "id"
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationContractRetrieve(generics.RetrieveAPIView):
    lookup_url_kwarg = "lid"
    lookup_field = "location_id"
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer


def contract_download(request, lid):
    file_format = request.GET.get("format", "pdf").lower()
    if file_format not in ("txt", "pdf"):
        raise serializers.ValidationError(
            {"message": "Only txt and pdf are supported file formats."}
        )

    # get location information
    location = Location.objects.get(pk=lid)
    state = re.sub(" ", "-", location.state)
    city = re.sub(" ", "-", location.name)

    # get filename and path for format
    filename = "%s_%s.%s" % (state, city, file_format)
    contract_directory = "/PxPUC/static/app/contracts_%s/" % (file_format)
    filepath = "%s/%s/%s" % (os.getcwd(), contract_directory, filename)

    # open file for reading and return HTTP response
    contract_file = open(filepath, mode="rb")
    response = HttpResponse(
        contract_file, content_type="application/%s" % (file_format)
    )
    response["Content-Disposition"] = "attachment; filename=%s" % filename
    return response


def load_contract_pdf(request, lid):
    # get location information
    location = Location.objects.get(pk=lid)
    state = re.sub(" ", "-", location.state)
    city = re.sub(" ", "-", location.name)

    # get filename and path for format
    filename = "%s_%s.pdf" % (state, city)
    contract_directory = "/PxPUC/static/app/contracts_pdf/"
    filepath = "%s/%s/%s" % (os.getcwd(), contract_directory, filename)

    # open file for reading and return HTTP response
    contract_file = open(filepath, mode="rb")
    response = HttpResponse(contract_file, content_type="application/pdf")
    response["Content-Disposition"] = "attachment; filename=%s" % filename
    return response


class ResearcherSearchList(generics.ListAPIView):
    serializer_class = LocationSerializer

    def get_queryset(self):
        query = self.request.GET.get("query", "")
        if query is None:
            raise serializers.ValidationError(
                {"message": "Request missing query string parameter 'query'."}
            )

        # Remove the quotes surrounding the query (which are added for processing in the URL)
        query = query[1:-1]
        if (
            query.__contains__('"')
            | query.__contains__("AND")
            | query.__contains__("OR")
        ):
            print("Contains operators")

        # Create an empty queryset to add results for each subquery
        queryset = Location.objects.none()

        # This loop takes the search query and finds results for each possible query, making the
        # query smaller from right to left (i.e. police officer salary -> police officer -> police)
        for i in range(len(query.split())):
            cur_query = query.rsplit(" ", i)[0]
            print(cur_query)

            prefetch_queryset = Sentence.objects.filter(text__icontains=cur_query)
            count_query_filter = Q(sentences__text__icontains=cur_query)
            sentence_queryset = (
                Location.objects.all()
                .annotate(sentences_count=Count("sentences", filter=count_query_filter))
                .prefetch_related(Prefetch("sentences", queryset=prefetch_queryset))
                .exclude(sentences_count=0)
            )

            # Compare whether in the current sentence_queryset or in the previous
            # sentence_queryset MUST be listed first, so that the newest results are added
            queryset = sentence_queryset | queryset

        # save search query
        saved_query = SearchQuery.objects.create(query=query, results=queryset.count())
        saved_query.save()

        return queryset


# Used for FAQ page, gets list of "questions" for the location (which is specified as null, since they
# all refer to the same location, i.e. Allegheny County)
class LocationQuestionList(generics.ListAPIView):
    serializer_class = CategorySerializer
    lookup_url_kwarg = "lid"

    def get_queryset(self):
        queryset = Category.objects.all().prefetch_related(
            Prefetch(
                "questions",
                # queryset=Question.objects.filter(
                #    Q(location=None) | Q(location=location)
                # ),
                queryset=Question.objects.all(),
            )
        )
        return queryset


class LocationProblematicSentenceList(generics.ListAPIView):
    serializer_class = ProblematicSentenceSerializer
    lookup_url_kwarg = "lid"

    def get_queryset(self):
        lid = self.kwargs.get(self.lookup_url_kwarg)
        location = Location.objects.get(pk=lid)
        queryset = location.problematic_sentences
        return queryset


class LocationGlossaryTermList(generics.ListAPIView):
    serializer_class = GlossaryTermSerializer
    lookup_url_kwarg = "lid"

    def get_queryset(self):
        lid = self.kwargs.get(self.lookup_url_kwarg)
        location = Location.objects.get(pk=lid)
        queryset = location.glossary_terms
        return queryset


# this is a generic view until the data model is formalized for stages
class LocationStageList(APIView):
    def get(self, request, lid, format=None):
        precomplaint = {
            "title": "Interaction with Police",
            "content": """<p class="lead">What happens in this stage?</p><p>You have an encounter with the police that you don't feel "right" about.</p>""",
            "resources": '<a href="https://www.aclu.org/know-your-rights/stopped-by-police/" target="_blank">ACLU Know Your Rights</a>',
        }
        complaint = {
            "title": "Filing a Complaint",
            "content": """<p class="lead">What happens in this stage?</p>
                                    <p> After your interaction, you decide you want to file a formal complaint with the city of Pittsburgh. 
                                    In Pittsburgh there are two places to file a police misconduct complaint. 
                                    The Office of Municipal Investigations (OMI) is the City's investigative branch and investigates all complaints filed 
                                    against any city employees, including police and fire. The Citizens Police Review Board (CPRB) is an independent review 
                                    board staffed with non-city employees. You can file a complaint with either group. </p>""",
            "resources": None,
        }
        review = {
            "title": "Review of complaint",
            "content": """<p class="lead">What happens in this stage?</p>
                                    <p><You have filed your complaint and are waiting for the department to review it and decide whether an investigation 
                                    should go forward. </p>
                                    <p>The accused officer and those associated with them, as well as their legal representation, must be notified 
                                    within a specific timeframe which is typically a matter of days.</p>
</p>""",
            "resources": None,
        }
        investigation = {
            "title": "Investigation",
            "content": """ <p class="lead">What happens in this stage?</p>
                                    <p>Both CPRB and OMI have their own investigation structure. Depending on which one you file your complaint with, 
                                    you will experience a different process. Each process is outlined below.</p>""",
            "resources": None,
        }
        result = {
            "title": "Result",
            "content": """<p class="lead">What happens in this stage?</p>
                                    <p>You will be always notified of the result of your complaint and sometimes the course of action being 
                                    taken by the department if your complaint is sustained. Generally, the decided discipline is kept internal. 
                                    Again, if your case is dismissed, that does NOT mean you have not experienced police misconduct. Seeking out the 
                                    assistance of local organizations can help here as well.</p>""",
            "resources": None,
        }
        stages = {
            "pre-complaint": precomplaint,
            "complaint": complaint,
            "review": review,
            "investigation": investigation,
            "result": result,
        }
        return Response(stages)
