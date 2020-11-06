import os
import csv
from app.models import Sentence
from app.models import Location

def run():
    r = 0
    with os.scandir("./app/static/app/problematic_sentences") as entries:
        for entry in entries:
            if entry.is_file():
                with open(entry, encoding = 'cp1252') as csvFile:
                    spamreader = csv.reader(csvFile, delimiter=',', quotechar='"')
                    for row in spamreader:
                        location = row[0]
                        location, get = Location.objects.get_or_create(name=location)
                        if row[4] == "Erases misconduct records":
                            Sentence.objects.filter(location=location, text=row[3]).update(impact=row[4], erase_misconduct=True)
                        if row[4] == "Gives officers unfair access to information":
                            Sentence.objects.filter(location=location, text=row[3]).update(impact=row[4], unfair_information=True)
                        if row[4] == "Limits Oversight / Discipline":
                            Sentence.objects.filter(location=location, text=row[3]).update(impact=row[4], limit_oversight=True)
                        if row[4] == "Requires City Pay for Misconduct":
                            Sentence.objects.filter(location=location, text=row[3]).update(impact=row[4], city_pay_for_misconduct=True)
                        if row[4] == "Restricts/Delays Interrogations":
                            Sentence.objects.filter(location=location, text=row[3]).update(impact=row[4], restrict_interrogation=True)
                        if row[4] == "Disqualifies Complaints":
                            Sentence.objects.filter(location=location, text=row[3]).update(impact=row[4], disqualify_complaints=True)