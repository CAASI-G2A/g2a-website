# script to add all txt files in the contracts folder to the database

import os
import re
from PxPUC.models import Contract, Location, Sentence, Category
from django.conf import settings

### ADDED ###
import pkg_resources
from symspellpy import SymSpell


# EDGE CASES
#   Solutions:
#       Add more as they are found
#       OR
#       Find ways to solve error in word_segmentation
#       OR
#       Implement more algorithms for solution
#
# This algorithm deals with edge case of hyphenated words 
#   (i.e. "text-edit", "twenty-five", "sixty-four")
#   as well as other edge cased words missed by symspellpy. 
# Splits the word up by '-' 
#   (ex. "fortwenty-five" --> ["fortwenty", "five"]). 
# Only proceeds for strings that have multiple
#   words/parts (as those are the edge case strings). 
# Then runs word_segmentation on each part of the string 
#   and appends them to a temporary list.
#   (ex. ["fortwenty", "five"] --> ["for twenty", "five"]).
# After all parts of string have run through
#   word_segmentation, the list elements are joined 
#   by '-'
#   (ex. ["for twenty", "five"] --> "for twenty-five").

def edge_cases(word, sym_dict):
    snd_check = word.split('-') 
    if len(snd_check) > 1:
        hold_list = []
        for snd_word in snd_check:
            if snd_word != '':
                new_data_txt = sym_dict.word_segmentation(
                    snd_word,
                    ignore_token='[^a-zA-Z]+[0-9\n $.!§%-]+'
                )
                hold_list.append(new_data_txt[0])
            else:
                hold_list.append(snd_word)
        string = "-".join(hold_list)

    elif word == "ofa":
        string = "of a"

    elif word == "ofhis":
        string = "of his"

    elif word == "ifapplicable":
        string = "if applicable"

    elif word == "ifan":
        string = "if an"

    elif word == "Ifan":
        string = "If an"

    elif word == "willbe":
        string = "will be"

    elif word == "hereto":
        string = "hereto"

    elif word == "hereto,":
        string = "hereto,"

    elif word == "hereto.":
        string = "hereto."

    elif word == "thereto":
        string = "thereto"

    elif word == "thereto,":
        string = "thereto,"

    elif word == "thereto.":
        string = "thereto."

    elif word == "ofan":
        string = "of an"

    elif word == "ofall":
        string = "of all"

    elif word == "ofseven":
        string = "of seven"

    elif word == "Aflac,":
        string = "Aflac,"

    elif word == "offive":
        string = "of five"
    
    else:
        string = ""

    return string

# END OF EDGE CASES


def ws_clean(data_line, sym_dict):
    input_list = []

    # Goes through each line in the text file and finds words 
    #   that are incorrectly combined and separates them
    #   (i.e. "fora", "ifa", "ifhis")
    for line in data_line:
        word_list = line.split() # Split line into list of words
        for word in word_list:
            
            string = edge_cases(word, sym_dict)

            # Normal Case:
            #  Just run word_segmentation on word
            #   and return result
            if string == "":
                new_data_txt = sym_dict.word_segmentation(
                    word,
                    ignore_token='[^a-zA-Z]+[0-9\n $.!§%-]+'
                )
                string = new_data_txt[0]

            # END OF NORMAL CASE
            #

            # Rebuild Text Line:
            #  Takes the string from edge or normal case 
            #   and appends them to a list to recreate
            #   the word segmented text line.
            #    
            input_list.append(string + " ") 
        
            # END OF REBUILD LINE
            #    

        # Rebuild Text Document:
        #   After a text line is built,
        #    insert a newline character to 
        #    separate lines at same point as
        #    original document.
        
        input_list.append('\n')
        
        # END OF REBUILD LINE
        #    

    # NOTE: input_list is a list of the text file lines

    return ''.join(input_list)


############




def run():
    category = Category.objects.get_or_create(category="Pre-Complaint")
    category = Category.objects.get_or_create(category="Complaint")
    category = Category.objects.get_or_create(category="Review")
    category = Category.objects.get_or_create(category="Investigation")
    category = Category.objects.get_or_create(category="Result")

    #### ADDED ####

    # SETUP:
    #   Loads dictionaries from 
    #      https://github.com/mammothb/symspellpy/tree/master/symspellpy
    #   and initializes symspell to contain these dictionaries
    # NOTE: More documentation for symspellpy can be found:
    #   https://symspellpy.readthedocs.io/en/latest/index.html

    dictionary_path = pkg_resources.resource_filename(
        "symspellpy", "frequency_dictionary_en_82_765.txt" 
    )
    bigram_dict_path = pkg_resources.resource_filename(
        "symspellpy", "frequency_bigramdictionary_en_243_342.txt"
    )
    sym_dict = SymSpell()
    sym_dict.load_dictionary(dictionary_path, 0, 1)
    sym_dict.load_bigram_dictionary(bigram_dict_path, 0, 2)
    ##############

    with os.scandir(settings.BASE_DIR + "/PxPUC/static/app/contracts_txt") as entries:
        for entry in entries:
            if entry.is_file():
                # First create the Location object
                filename = entry.name[:-4]
                
                print("filename: " + filename)
                print("location: Pennsylvania")
                # SU23: Hard code state as PA for now, change later if 
                filename, created = Location.objects.get_or_create(
                    name=filename, state="Pennsylvania"
                )

                # PG: Delete existing contracts and sentences in system to avoid duplicates 
                Sentence.objects.filter(location=filename).delete()
                Contract.objects.filter(location=filename).delete()

                with open(entry, encoding="cp1252", errors="ignore") as textFile:
                    content = clean_lines(textFile.read())

                    # organizes lines by periods/ends of sentances  
                    content = content.replace('\n', ' ').replace('.', '.\n')
                    # re.sub('(?<!\.)\r\n', ' ', content) 

                    contract = Contract.objects.get_or_create(
                        location=filename, text=content, is_parsed=True
                    )

                    
                with open(entry, encoding="cp1252", errors="ignore") as textFile:
                    lines = textFile.readlines()

                    ##### ADDED #####
                    content = ws_clean(lines, sym_dict)
                    #################

                    #REMOVED
                    #content = textFile.read()

                    # organizes lines by periods/ends of sentances  
                    content = content.replace('\n', ' ')
                    deliminator = ". "
                    lines =  [e+deliminator for e in content.split(deliminator) if e]
                    lines = list(map(str.strip, lines))

                     #  TODO: Add cases for lines not needed for search


                    for line in lines:
                        line = clean_lines(line)
                        sentence = Sentence.objects.get_or_create(
                            text=line, location=filename
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

