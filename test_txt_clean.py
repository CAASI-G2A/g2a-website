

import os
import re
# from PxPUC.models import Contract, Location, Sentence, Category
from django.conf import settings


###### original test #####

# with open("PPUC/PxPUC/static/app/contracts_txt/Pennsylvania_Castle-Shannon-Borough.txt", "r") as fic:
#     content = fic.read()


# # keep only certain symbols 
# content = re.sub('[^a-zA-Z1-9\n )($.!§-]+', '', content)

# # remove line breaks not after puncitaton
# content = re.sub('(?<!\.)\n', ' ', content)

# #M ake all line breaks the start of each a new paragraph
# content = re.sub('\n', '\n\n', content)


# # Print to file
# with open('contract_test.txt', 'w') as f:
#     f.write("%s\n" % content)



######### Make new folder ########

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

                #removes any duplicate periods
                content = re.sub("\.\.+", ".", content)

                # keep only certain symbols 
                content = re.sub('[^a-zA-Z1-9\n )($.!§-]+', '', content)

                # remove line breaks not after puncitaton
                content = re.sub('(?<!\.)\n', ' ', content)

                #M ake all line breaks the start of each a new paragraph
                content = re.sub('\n', '\n\n', content)

                # Print to file
                with open('newcontracts/' + filename + ".txt", 'w+') as f:
                    f.write("%s\n" % content)


               
                    
                



######### Past ideas #########

# with open("contract_test.txt", "r") as fic:
#     content = fic.read()


# content = content.replace('\n', ' ')
# deliminator = ". "
# sentences =  [e+deliminator for e in content.split(deliminator) if e]
# re.sub('(?<!\.)\r\n', ' ', content) 
# sentences = content.split(". ")
# sentences = list(map(str.strip, content))

# print(re.sub('[^a-zA-Z]+', '', content)

# remove new lines not befor a period 
# content = re.sub('(?<!\.)\r\n', ' ', content) 

# Keep only letters
# content = re.sub('[^a-zA-Z1-9]+', '', content)




# re.split('. !',str)
# #  same as
# sentences = [s.strip() for s in sentences]


# with open('contract_test.txt', 'w') as f:
#     for item in sentences:
#         f.write("%s\n" % item)

