"""
Definition of views.
"""

from datetime import datetime
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


class ResearcherSearchList(generics.ListAPIView):
    serializer_class = LocationSerializer

    def get_queryset(self):
        # Referred to later in get_queryset
        print("GET QUERYSET")

        def build_filter(query, parent_obj=False):
            # we hit an operand
            if type(query) is str:
                if parent_obj:
                    query = query.strip('"')
                    # print("FIRST BLOCK " + str(query))
                    return Q(sentences__text__icontains=query)
                else:
                    query = query.strip('"')
                    # print("SECOND BLOCK " + str(query))
                    return Q(text__icontains=query)
            else:
                # If query is compound (uses operations), must build the filter first
                # build_filter is recursively run for each individual operand
                if query["operation"] == "AND":
                    # print("THIRD BLOCK " + query["operand1"] + " " + query["operand2"])
                    return build_filter(query["operand1"], parent_obj) & build_filter(
                        query["operand2"], parent_obj
                    )
                else:
                    # print("FOURTH BLOCK " + query["operand1"] + " " + query["operand2"])
                    return build_filter(query["operand1"], parent_obj) | build_filter(
                        query["operand2"], parent_obj
                    )

        # Get query from "self" = calling object
        # These blocks run BEFORE the build_filter
        query = self.request.query_params.get("query")
        if query is None:
            raise serializers.ValidationError(
                {"message": "Request missing query string parameter 'query'."}
            )
        # Attempt to load the query from the JSON-formatted request
        try:
            query = json.loads(query)
        except:
            raise serializers.ValidationError(
                {"message": "Invalid JSON data received."}
            )

        # Ensure that the query field was included in the request after it was processed
        query = query.get("query")
        if query is None:
            raise serializers.ValidationError(
                {"message": "JSON root field 'query' missing from request data."}
            )

        # build filter on search terms
        # NOW we call build_filter
        # FIRST to build the query for searching the sentences
        # SECOND to build filter to be used to count results (can we use the same one?)
        prefetch_query_filter = build_filter(query)
        prefetch_queryset = Sentence.objects.filter(prefetch_query_filter)
        count_query_filter = build_filter(query, parent_obj=True)
        sentence_queryset = (
            Location.objects.all()
            .annotate(sentences_count=Count("sentences", filter=count_query_filter))
            .prefetch_related(Prefetch("sentences", queryset=prefetch_queryset))
            .exclude(sentences_count=0)
        )

        # perform lookup as if they're looking for a specific city by name
        def build_loc_filter(query):
            # we hit an operand
            if type(query) is str:
                return Q(name__icontains=query)
            else:
                if query["operation"] == "AND":
                    return build_loc_filter(query["operand1"]) & build_loc_filter(
                        query["operand2"]
                    )
                else:
                    return build_loc_filter(query["operand1"]) | build_loc_filter(
                        query["operand2"]
                    )

        location_queryset = Location.objects.all().filter(build_loc_filter(query))

        # combine results
        queryset = (sentence_queryset | location_queryset).distinct()

        # save search query
        saved_query = SearchQuery.objects.create(query=query, results=queryset.count())
        saved_query.save()

        return queryset


class LocationQuestionList(generics.ListAPIView):
    serializer_class = CategorySerializer
    lookup_url_kwarg = "lid"

    def get_queryset(self):
        # lid = self.kwargs.get(self.lookup_url_kwarg)
        # location = Location.objects.get(pk=lid)
        queryset = Category.objects.all().prefetch_related(
            Prefetch(
                "questions",
                # queryset=Question.objects.filter(
                #    Q(location=None) | Q(location=location)
                # ),
                queryset=Question.objects.filter(Q(location=None)),
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
            "content": """<p class="lead">What happens in this stage?</p><p>You have an encounter with the police that you don't feel "right" about. If you feel an officer was rude to you or another member of the public, didn't properly investigate your case, or perhaps even hurt someone, you may have experienced police misconduct.</p>""",
            "resources": '<a href="https://www.aclu.org/know-your-rights/stopped-by-police/" target="_blank">ACLU Know Your Rights</a>',
        }
        complaint = {
            "title": "Filing a Complaint",
            "content": """<p class="lead">What happens in this stage?</p>
                                    <p> In Pittsburgh there are two places to file a police misconduct complaint. The Office of Municipal Investigations (OMI) is the City's investigative branch and investigates all complaints filed against any city employees, including police and fire. The Citizens Police Reivew Board (CPRB) is an independent review board staffed with non-city employees. Three members are appointed by the mayor, and two members have to be experienced law professionals. You can choose which one to file the complaint with. Both of these agencies only investigate complaints involving the Pittsburgh Bureau's officers, not outside municipalites. The details, forms, and contact information for both are below. </p>
                                                        <p>To file a complaint with the Citizens Police Review Board (CPRB), you can fill out this online <a target='_blank' href="https://cprbpgh.org/about/filing-a-complaint/file-a-complaint-now">form</a> to file an "informal complaint". Someone from CPRB will contact you within 10 days to help you file an official complaint. The investigation process will not start until an official complaint is filed. 
                                                                            If you want to start with filing an official complaint, you must fill out this <a target='_blank' href="https://cprbpgh.org/documents/cprb-citizen-complaint.pdf">form</a>. You must mail or deliver your form to the following address: 
                                                                                                <address>
                                                                                                                        Citizen Police Review Board<br/>
                                                                                                                                                816 5th Avenue, Suite 400<br/>
                                                                                                                                                                        Pittsburgh, PA 15219
                                                                                                                                                                                            </address>
                                                                                                                                                                                                                NOTE: this complaint form requires a sworn affidavit signed by a notary. This is a written document that is you acknowledging that the informtation in your complaint is accurate, you must sign your name in the prescense of a notary to confirm that your complaint is verified. CPRB has notaries at their office to help with this.</p>
                                                                                                                                                                                                                                    <p>To file a complaint with the Office of Municipal Investigations (OMI), you can mail or deliver your complaint in person. OMI prefers for complaints to be filed in writing but if necessary, you can file a complaint over the phone. Here is their contact information: 
                                                                                                                                                                                                                                                        <address>
                                                                                                                                                                                                                                                                                414 Grant Street, Suite 901 (Ross Street side)<br/>
                                                                                                                                                                                                                                                                                                        Pittsburgh, PA 15219<br/>
                                                                                                                                                                                                                                                                                                                                Phone: 412-255-2804<br/>
                                                                                                                                                                                                                                                                                                                                                        Fax: 412-255-2952
                                                                                                                                                                                                                                                                                                                                                                            </address>
                                                                                                                                                                                                                                                                                                                                                                                                </p>""",
            "resources": None,
        }
        review = {
            "title": "Review of complaint",
            "content": """<p class="lead">What happens in this stage?</p>
                                    <p>OMI and CPRB have different ways of reviewing complaints they recieve.</p>
                                                        <p>When you file a complaint with OMI, you will receive a letter informing you that your complaint has been recieved and the person assigned to investigate your case. That person gathers information from you, witnesses, and any other people involved. At CPRB, all complaints are taken through in an intake coordinator, passed to the executive director, and then assigned to an investigator.</p>
                                                                            <p>The accused officer and those associated with them, as well as their legal representation, must be notified within a specific timeframe which is typically a matter of days.</p>""",
            "resources": None,
        }
        investigation = {
            "title": "Investigation",
            "content": """ <p class="lead">What happens in this stage?</p>
                                    <p>Both CPRB and OMI have their own investigation structure. Depending on which one you file your complaint with, you will experience a different process.</p>
                                                        <p>The process for complaints filed through OMI should take no longer than 120 days from when you file. Once your complaint is assigned an investigator, that person will contact you, witness, and the officers involved to create a full summary of the incidient. That information will be passed to city leadership including the Office of Public Safety where they will decide on the appropriate punishment. The written result and discipline decision will be sent to the officer and their supervisor.</p>
                                                                            <p>Once you file a formal complaint with CPRB including a notarized affidavit, the investigator assigned to your complaint goes over the details and decides if it should be dismissed or presented to the board. If it goes to the board, they either decide to dismiss it or start a preliminary inquiry which takes last 10 buisness days. During this time, the investigator conducts interviews with witnesses, the victim, and the officer in question. They gather documents and request any additonal information they might need from OMI. The inquiry is then brought back to the board who either can decide to dismiss or offer the option of mediation between the citizen and officer. If anyone chooses not to do mediation, the complaint moves to a full investigation with more interviews and research. This review is completed in 30 days and if it requires more time, you will be notified in writing. It then goes back to the board who either dismiss or order a public hearing. You will get a 10 day advance notice of the hearing date. The Hearing panel is made up of three individuals chosen by the CPRB execuitve director. A special prosecutor will represent the complaint and provide the evidence to the panel from the investigation. A final decision is announced publicly either 10 days later or by the next CPRB board meeting, whichever is later. You will be directly notified, the officer in question is notified, and the discipline recommendation is given to the mayor and the police cheif.</p>""",
            "resources": None,
        }
        result = {
            "title": "Result",
            "content": """<p class="lead">What happens in this stage?</p>
                                    <p>You will be always notified of the result of your complaint and sometimes the course of action being taken by the department if your complaint is sustained. Generally, the form of discipline that is decided is kept internal. Again, if your case is dismissed, that does NOT mean you have not experienced police misconduct. Seeking out the assistance of local organizations can help here as well.</p>""",
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
