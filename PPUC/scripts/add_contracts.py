# script to add all txt files in the contracts folder to the database

import os
import re
from PxPUC.models import Contract, Location, Sentence, Category
from django.conf import settings


def run():
    category = Category.objects.get_or_create(category="Pre-Complaint")
    category = Category.objects.get_or_create(category="Complaint")
    category = Category.objects.get_or_create(category="Review")
    category = Category.objects.get_or_create(category="Investigation")
    category = Category.objects.get_or_create(category="Result")
    with os.scandir(settings.BASE_DIR + "/PxPUC/static/app/contracts_txt") as entries:
        for entry in entries:
            if entry.is_file():
                filename = entry.name[:-4]
                """find _, everything before is state, after is city"""
                print("filename: " + filename)
                sep = filename.find("_")
                state = re.sub("-", " ", filename[:sep])
                print("state: " + state)
                location = re.sub("-", " ", filename[sep + 1 :])
                print("location: " + location)
                location, created = Location.objects.get_or_create(
                    name=location, state=state
                )

                # Delete existing contracts and sentences in system to avoid duplicates 
                Sentence.objects.filter(location=location).delete()
                Contract.objects.filter(location=location).delete()

                with open(entry, encoding="cp1252", errors="ignore") as textFile:
                    content = strip_periods(textFile.read())
                    contract = Contract.objects.get_or_create(
                        location=location, text=content, is_parsed=True
                    )
                with open(entry, encoding="cp1252", errors="ignore") as textFile:
                    lines = textFile.readlines()

                    for line in lines:
                        line = strip_periods(line)
                        sentence = Sentence.objects.get_or_create(
                            text=line, location=location
                        )


def strip_periods(txt):
    txt = re.sub("\.\.+", ".", txt)
    return txt
