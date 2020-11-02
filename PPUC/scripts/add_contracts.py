# script to add all txt files in the contracts folder to the database

import os
import re
from app.models import Contract
from app.models import Location
from app.models import Sentence

def run():
    with os.scandir("./app/static/app/contracts") as entries:
        for entry in entries:
            if entry.is_file():
                with open(entry, encoding = 'ansi') as textFile:
                    location = entry.name[:-4]
                    content = strip_periods(textFile.read())
                    location, created = Location.objects.get_or_create(name=location)
                    contract = Contract.objects.get_or_create(location=location, text=content, is_parsed=True)
                with open(entry, encoding = 'cp1252') as textFile:
                    lines = textFile.readlines()
                    for line in lines:
                        line = strip_periods(line)
                        location = entry.name[:-4]
                        location, get = Location.objects.get_or_create(name=location)
                        sentence = Sentence.objects.get_or_create(text=line, location=location)
                    						
					
def strip_periods(txt):
    txt = re.sub('\.\.+', '.', txt)
    return txt       