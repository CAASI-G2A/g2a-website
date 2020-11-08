import os
import csv
from app.models import Problematic_Sentence
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
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[4], erase_misconduct=True)
                        if row[4] == "Gives officers unfair access to information":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[4], unfair_information=True)
                        if row[4] == "Limits Oversight / Discipline":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[4], limit_oversight=True)
                        if row[4] == "Requires City Pay for Misconduct":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[4], city_pay_for_misconduct=True)
                        if row[4] == "Restricts/Delays Interrogations":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[4], restrict_interrogation=True)
                        if row[4] == "Disqualifies Complaints":
                            Problematic_Sentence.objects.get_or_create(location=location, text=strip_periods(row[3]), impact=row[4], disqualify_complaints=True)
							
def strip_periods(txt):
    txt = re.sub('\.\.+', '.', txt)
    return txt    