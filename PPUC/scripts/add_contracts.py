# script to add all txt files in the contracts folder to the database

import os
import re
from app.models import Contract, Location, Sentence, Category

def run():
    category = Category.objects.get_or_create(category = "Pre-Complaint")
    category = Category.objects.get_or_create(category = "Complaint")
    category = Category.objects.get_or_create(category = "Review")
    category = Category.objects.get_or_create(category = "Investigation")
    category = Category.objects.get_or_create(category = "Result")
    with os.scandir("./app/static/app/contracts_txt") as entries:
        for entry in entries:
            if entry.is_file():
                with open(entry, encoding = 'cp1252') as textFile:
                    filename = entry.name[:-4]
                    """find _, everything before is state, after is city"""
                    print("filename: " + filename)
                    sep = filename.find('_')
                    state = filename[:sep]
                    print("state: " + state)
                    location = filename[sep+1:]
                    print("location: " + location)
                    content = strip_periods(textFile.read())
                    location, created = Location.objects.get_or_create(name=location, state=state)
                    contract = Contract.objects.get_or_create(location=location, text=content, is_parsed=True)
                with open(entry, encoding = 'cp1252') as textFile:
                    lines = textFile.readlines()
                    for line in lines:
                        line = strip_periods(line)
                        location = entry.name[:-4]
                        sep = filename.find('_')
                        state = filename[0:sep]
                        location = filename[sep+1:len(filename)]
                        location, get = Location.objects.get_or_create(name=location, state=state)
                        sentence = Sentence.objects.get_or_create(text=line, location=location)

def strip_periods(txt):
    txt = re.sub('\.\.+', '.', txt)
    return txt       