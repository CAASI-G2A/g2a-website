## File created by Patrick Gavazzi
##
## Purpose: to preform simple pattern matching and cleaning up all contract files
## Effects: Creats a new file with all clean up .txt files, does not delete or 
# ##        replace old files, that has to be done manually


import os
import re
from django.conf import settings

with os.scandir("PPUC/PxPUC/static/app/contracts_txt") as entries:
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

                with open(entry, encoding="cp1252", errors="ignore") as textFile:
                    content = textFile.read()

                # removes any duplicate periods
                content = re.sub("\.\.+", ".", content)

                # keep only certain symbols 
                content = re.sub('[^a-zA-Z1-9\n )($.!§-]+', '', content)

                # remove line breaks not after puncitaton
                content = re.sub('(?<!\.)\n', ' ', content)

                # Make all line breaks the start of each a new paragraph
                content = re.sub('\n', '\n\n', content)

                # Print to file in new folder newcontracts/
                with open('newcontracts/' + filename + ".txt", 'w+') as f:
                    f.write("%s\n" % content)