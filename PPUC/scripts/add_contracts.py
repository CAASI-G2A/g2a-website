# script to add all txt files in the contracts folder to the database

import os
import re
from app.models import Contract
from app.models import Location

def run():
    with os.scandir("./app/contracts") as entries:
        for entry in entries:
            if entry.is_file():
                with open(entry, encoding = 'ansi') as textFile:
                    location = entry.name[:-4]
                    content = strip_periods(textFile.read())
                    contract = Contract.objects.get_or_create(location=location, text=content)
                    location = Location.objects.get_or_create(name=location)
					
def strip_periods(txt):
    txt = re.sub('\.\.+', '.', txt)
    return txt       