import os
import csv
import re
from PxPUC.models import Problematic_Sentence
from PxPUC.models import Location
from django.conf import settings

def run():
    r = 0
    with os.scandir(settings.BASE_DIR+"/PxPUC/static/app/problematic_sentences") as entries:
        for entry in entries:
            if entry.is_file():
                with open(entry, encoding = 'cp1252') as csvFile:
                    spamreader = csv.reader(csvFile, delimiter=',', quotechar='"')
                    for row in spamreader:
                        location = row[0]
                        location, get = Location.objects.get_or_create(name=location)
                        if row[4] == "Erases misconduct records":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[5], erase_misconduct=True)
                        if row[4] == "Gives officers unfair access to information":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[5], unfair_information=True)
                        if row[4] == "Limits Oversight / Discipline":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[5], limit_oversight=True)
                        if row[4] == "Requires City Pay for Misconduct":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[5], city_pay_for_misconduct=True)
                        if row[4] == "Restricts/Delays Interrogations":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[5], restrict_interrogation=True)
                        if row[4] == "Disqualifies Complaints":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[5], disqualify_complaints=True)
							
def strip_periods(txt):
    txt = re.sub('\.\.+', '.', txt)
    return txt    
