from django.db import models
import os
import csv
import pandas as pd
from PxPUC.models import Provision,Keyword,Municipality,Department,MasterContract

#added by ACPP SPRING 2023
def run():
    
    """for row in Department.objects.all().reverse():
        row.delete()

    for row in MasterContract.objects.all().reverse():
        row.delete()

    for row in Municipality.objects.all().reverse():
        row.delete()

    for row in Provision.objects.all().reverse():
        row.delete()

    # Provision.objects.none() Maybe?

    for row in Keyword.objects.all().reverse():
        row.delete()"""

    dataframDict = pd.read_excel(
        "PxPUC/static/app/mastersheets/Model master spreadsheet.xlsx",
        sheet_name=["Provisions", "Contracts", "Police departments", "Municipalities"],
    )

    # Provision and Keyword
    for index, row in dataframDict["Provisions"].iterrows():
        if Provision.objects.filter(
            number=row["Number"],
            category=row["Category_Name"],
            explanation=row["Explanation"],
        ).exists():
            pass
        else:
            prov_obj = Provision.objects.create(
                number=row["Number"],
                category=row["Category_Name"],
                explanation=row["Explanation"],
            )
            prov_obj.save()

        if Keyword.objects.filter(
            keyword=row["Keyword_1"], example=row["Example_of_Keyword_1"]
        ).exists():
            pass
        else:
            keyw1_obj = Keyword.objects.create(
                keyword=row["Keyword_1"], example=row["Example_of_Keyword_1"]
            )
            keyw1_obj.save()
            prov_obj.keywords.add(keyw1_obj)

        if row["Keyword_2"] != None:
            if Keyword.objects.filter(
                keyword=row["Keyword_2"], example=row["Example_of_Keyword_2"]
            ).exists():
                pass
            else:
                keyw2_obj = Keyword.objects.create(
                    keyword=row["Keyword_2"], example=row["Example_of_Keyword_2"]
                )
                keyw2_obj.save()
                prov_obj.keywords.add(keyw2_obj)

        if row["Keyword_3"] != None:
            if Keyword.objects.filter(
                keyword=row["Keyword_3"], example=row["Example_of_Keyword_3"]
            ).exists():
                pass
            else:
                keyw3_obj = Keyword.objects.create(
                    keyword=row["Keyword_3"], example=row["Example_of_Keyword_3"]
                )
                keyw3_obj.save()
                prov_obj.keywords.add(keyw3_obj)

    # Municipality
    for index, row in dataframDict["Municipalities"].iterrows():
        if Municipality.objects.filter(
            municID=row["MUNI_ID"],
            municipality=row["Municipality_Served"],
            department=row["Police_Agency_Name_Munic"],
            totPop2010=row["2010_Census"],
            # nonWhitePop2010=row["2010_Census_Non-White"],
            # sqMiArea=row["SQMI"],
            # acreArea=row["ACRES"],
            region=row["REGION"],
            # COG=row["COG"],    commented out for Pittsburgh City bug
            school=row["SCHOOLD"],
            sfGlobalID=row["GlobalID"],
            sfSHAPEleng=row["SHAPE_Leng"],
            sfSHAPEarea=row["SHAPE_Area"],
        ).exists():
            continue
        else:
            muni_obj = Municipality.objects.create(
                municID=row["MUNI_ID"],
                municipality=row["Municipality_Served"],
                department=row["Police_Agency_Name_Munic"],
                totPop2010=row["2010_Census"],
                # nonWhitePop2010=row["2010_Census_Non-White"],
                sqMiArea=row["SQMI"],
                acreArea=row["ACRES"],
                region=row["REGION"],
                COG=row["COG"],
                school=row["SCHOOLD"],
                sfGlobalID=row["GlobalID"],
                sfSHAPEleng=row["SHAPE_Leng"],
                sfSHAPEarea=row["SHAPE_Area"],
            )
            muni_obj.save()

    # Department
    for index, row in dataframDict["Police departments"].iterrows():
        if row["police_bill_of_rights"] == "X":
            tfval = True
        else:
            tfval = False

        if row["Full_Time_Police_2019"] != row["Full_Time_Police_2019"]:
            ft = None
        else:
            ft = row["Full_Time_Police_2019"]

        if row["Part_Time_Police_2019"] != row["Part_Time_Police_2019"]:
            pt = None
        else:
            pt = row["Part_Time_Police_2019"]

        if Department.objects.filter(
            deptName=row["Police_Agency_Name_Dept"],
            webLink=row["Police_Department_Website"],
            fullOfficers2019=ft,
            partOfficers2019=pt,
            hasBill=tfval,
        ).exists():
            continue
        else:
            dept_obj = Department.objects.create(
                deptName=row["Police_Agency_Name_Dept"],
                webLink=row["Police_Department_Website"],
                fullOfficers2019=ft,
                partOfficers2019=pt,
                hasBill=tfval,
            )
            dept_obj.save()

            try:
                parMunic = Municipality.objects.filter(
                    department=row["Police_Agency_Name_Dept"]
                )
            except Municipality.DoesNotExist:
                parMunic = None

            if parMunic != None:
                for munic in parMunic:
                    dept_obj.munici.add(munic)

    # Contract
    for index, row in dataframDict["Contracts"].iterrows():
        if MasterContract.objects.filter(
            department=row["Police_Agency_Name"],
            startYear=row["Contract_Start_Year"],
            endYear=row["Contract_End_Year"],
            bargAgent=row["Collective_Bargaining_Agency"],
        ).exists():
            continue
        else:
            cont_obj = MasterContract.objects.create(
                department=row["Police_Agency_Name"],
                startYear=row["Contract_Start_Year"],
                endYear=row["Contract_End_Year"],
                bargAgent=row["Collective_Bargaining_Agency"],
            )
            cont_obj.save()

            try:
                parDept = Department.objects.filter(deptName=row["Police_Agency_Name"])
            except Department.DoesNotExist:
                parDept = None

            if parDept != None:
                for dept in parDept:
                    cont_obj.dept.add(dept)




# Once objects are read in from the excel sheet, this function can search each contract for each provision   and then connect those objects     
        
        #This method is for searching a contract for a keyword
        # key= keyword
        # dir=path to file
        # file=file name 
    def Contract_Search(key,dir,file):
        directory=os.listdir('PxPUC/static/app/contracts_txt')
        #check to make sure there exists a contract with this name
        if file not in directory:
            return False
        query=key
        for i in range(len(query.split())): #Splits multi worded keywords into several smaller queries
            cur_query = query.rsplit(" ", i)[0]
            #Reads in file to be easily searched
            with open(dir,'r',encoding='utf8',errors='ignore') as file:
                searchInLines=file.readlines()
                file.close
                for line in searchInLines:
                    if cur_query.lower() in line.lower():
                        return True #returns true if found
        return False            

    
    #This is the main part of the contract search for provisions
    path='PxPUC/static/app/contracts_txt/'
    for contract in MasterContract.objects.all(): #for all contracts
        department=contract.department #get department name
        f=department+'.txt' 
        dir=path+f
        for provision in Provision.objects.all(): #for all provisions
            for keyword in provision.keywords.all(): #for all keywords in the provision
                key=keyword.keyword
                if Contract_Search(key,dir,f) == True: #searches contract for keyword
                    print('Provision: '+provision.category + ' added to contract '+contract.department)
                    contract.provisions.add(provision) #if found we add that provision to said contract and break to go to next provision
                    break
                
        
        