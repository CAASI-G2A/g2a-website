import pandas as pd
from google_drive_downloader import GoogleDriveDownloader as gdd
from pathlib import Path
import os.path
from django.conf import settings
#added by ACPP SPRING 2023
def run():
    xl_path = Path(settings.BASE_DIR + "/PxPUC/static/app/mastersheets/Model master spreadsheet.xlsx")
    txt_path=Path(settings.BASE_DIR + "/PxPUC/static/app/contracts_txt")


    dataframDict = pd.read_excel(
        xl_path,
        sheet_name=["Provisions", "Contracts", "Police departments", "Municipalities"],
        )

    for index, row in dataframDict["Contracts"].iterrows():
        department=row["Police_Agency_Name"]
        print(department)
        link=row['Google Drive (Text - Correct File Name)']
        str_link=str(link)
        if str_link=='nan':
            continue
        share_code=str_link.split('/')[5]
        print('adding contract for'+ department)
        gdd.download_file_from_google_drive(file_id=share_code,
                                            dest_path=str(txt_path)+'/'+department+'.txt',
                                            )
