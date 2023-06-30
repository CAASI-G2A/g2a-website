"""
Definition of views.
"""

from cgitb import text
from datetime import datetime
from operator import contains
from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q, Prefetch, Count, Value, CharField
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
from rest_framework import generics, mixins, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from django.conf import settings
from django.core.management import call_command
import after_response
import hmac
import hashlib
import subprocess
import logging

# from fuzzywuzzy import fuzz
from thefuzz import fuzz
from thefuzz import process

logger = logging.getLogger(__name__)


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

        # SU23 Add: Beginning new algorithm
        """
        # First init sets for location and sentence models
        location_queryset = Location.objects.none()
        prefetch = Sentence.objects.none()

        # Filter in sentences that contain any words in the query (query broken into indiv words)
        split_query = query.split(" ")
        for word in split_query:
            temp_queryset = Sentence.objects.none()
            temp_queryset = Sentence.objects.filter(text__icontains=word)
            prefetch = temp_queryset.union(prefetch)

        #First create a query set for sentences that is empty
        new_prefetch = Sentence.objects.none()

        # For each sentence in the original queryset (prefetch), create a new temporary queryset
        # for that single sentence. Annotate a score for that single sentence and union it to a permanent queryset
        for sentence in prefetch:
            temp_queryset = Sentence.objects.none()
            temp_queryset = Sentence.objects.all().annotate(score=fuzz.partial_token_sort_ratio(query, sentence.text)
                                            ).get(id=sentence.id)
            
            new_prefetch = temp_queryset.union(new_prefetch)


        # Next, order new_prefetch by the scores
        new_prefetch = new_prefetch.order_by("-score")

        # One thing to think about before the following step is excluding locations with zero sentences from this queryset
        # This will look a little different from the original algorithm below as the query is taken as a full phrase

        # Now link the new_prefetch sentences sorted by their scores to a location
        location_queryset = location_queryset.prefetch_related(Prefetch("sentences", queryset=new_prefetch))

        #This location queryset is what will be returned to the frontend
            """
        # SU23: End new algorithm

        # This loop takes the search query and finds results for each possible query, making the
        # query smaller from right to left (i.e. police officer salary -> police officer -> police)
        for i in range(len(query.split())):
            cur_query = query.rsplit(" ", i)[0]

            prefetch_queryset = Sentence.objects.filter(text__icontains=cur_query)
            count_query_filter = Q(sentences__text__icontains=cur_query)
            sentence_queryset = (
                Location.objects.all()
                .annotate(sentences_count=Count("sentences", filter=count_query_filter))
                .prefetch_related(Prefetch("sentences", queryset=prefetch_queryset))
                .exclude(sentences_count=0)
            )

            # generate letter grade based on current iteration in loop (lower i value = higher letter grade)
            letter_grade = chr(i + 65)
            # add rank field to sentence_queryset to be returned to front end
            sentence_queryset = sentence_queryset.annotate(
                rank=Value(letter_grade, output_field=CharField())
            )

            # Add current sentence_queryset to previous query_set
            queryset = sentence_queryset.union(queryset)

            # queryset = queryset.order_by("-rank")

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


# SU23: Added the following views for the search box in commentary (see keyword view for issues)
class ProvisionView(generics.ListAPIView):
    serializer_class = ProvisionSerializer

    def get_queryset(self):
        # queryset = Provision.objects.all().values('category') FIRST
        # queryset = [str(elem) for elem in list(Provision.objects.all().values_list('category'))]

        queryset = Provision.objects.all().values("category")

        logger.info(queryset)

        return queryset


class ProvisionExplView(generics.ListAPIView):
    serializer_class = ProvisionSerializer

    def get_queryset(self):
        queryset = Provision.objects.all().values("explanation")
        return queryset


class KeywordView(generics.ListAPIView):
    serializer_class = KeywordSerializer

    def get_queryset(self):
        # The keyword queryset getting sent to the frontend as is, is a bit out of order. This makes
        # displaying them clunky. One solution to this could be to make a provision queryset and then
        # link the keywords grabbed from the queryset below to those provisions via prefetch_related.
        # This would make it so the queryset will always be in an understandable order once it reaches the frontend
        # (with understandable meaning in line with the order it appears on the master sheet)
        queryset = Keyword.objects.all().values("keyword")
        return queryset


class MasterContractView(generics.ListAPIView):
    serializer_class = MasterContractSerializer
    queryset = MasterContract.objects.all()


class DepartmentView(generics.ListAPIView):
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()


class MunicipalityView(generics.ListAPIView):
    serializer_class = MunicipalitySerializer
    queryset = Municipality.objects.all()
