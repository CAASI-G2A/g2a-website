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
                # First create the Location object
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

                # PG: Delete existing contracts and sentences in system to avoid duplicates 
                Sentence.objects.filter(location=location).delete()
                Contract.objects.filter(location=location).delete()

                with open(entry, encoding="cp1252", errors="ignore") as textFile:
                    content = clean_lines(textFile.read())

                    # organizes lines by periods/ends of sentances  
                    content = content.replace('\n', ' ').replace('.', '.\n')
                    # re.sub('(?<!\.)\r\n', ' ', content) 

                    contract = Contract.objects.get_or_create(
                        location=location, text=content, is_parsed=True
                    )

                    
                with open(entry, encoding="cp1252", errors="ignore") as textFile:
                    # lines = textFile.readlines()

                    content = textFile.read()

                    # organizes lines by periods/ends of sentances  
                    content = content.replace('\n', ' ')
                    deliminator = ". "
                    lines =  [e+deliminator for e in content.split(deliminator) if e]
                    lines = list(map(str.strip, lines))

                     #  TODO: Add cases for lines not needed for search


                    for line in lines:
                        line = clean_lines(line)
                        sentence = Sentence.objects.get_or_create(
                            text=line, location=location
                        )


# PG: Simple Pattern Matching
#     TODO: More pattern matching
def clean_lines(txt):

    #removes any duplicate periods
    txt = re.sub("\.\.+", ".", txt)

    # PG: keep only certain symbols, which currently include
    #     - A-Z
    #     - a-z
    #     - 1-9
    #     - \n
    #     - single spaces ' '
    #     - punctation: ! . 
    #     - legal and math symbols: % $ § - 
    #     TODO: Add more/fix cases
    txt = re.sub('[^a-zA-Z0-9\n $.!§%-]+', '', txt)

    # PG: remove line breaks that are not after puncitaton
    txt = re.sub('(?<!\.)\n', ' ', txt)
    txt = re.sub('\n', '\n\n', txt)

    return txt

