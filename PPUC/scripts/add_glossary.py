import os
import csv
from .common import sanitize_city, sanitize_state
from PxPUC.models import GlossaryTerm
from PxPUC.models import Location
from django.conf import settings

def run():
    r = 0
    with os.scandir(settings.BASE_DIR+"/PxPUC/static/app/glossary") as entries:
        for entry in entries:
            if entry.is_file():
                print("Processing file: %s" % entry)
                with open(entry) as f:
                    csv_reader = csv.DictReader(f, delimiter=',', quotechar='"')
                    for row in csv_reader:
                        location, get = Location.objects.get_or_create(name=sanitize_city(row["city"]), state=sanitize_state(row["state"]))
                        GlossaryTerm.objects.get_or_create(location=location, term=row["term"], definition=row["definition"])
