from django.core.management import call_command
from django.conf import settings
import subprocess

FRONTEND_DIR = settings.BASE_DIR+'/frontend'

def run():
    
    print("running migrate")
    call_command('migrate')
    print("migrate complete\n\n")

    print("running makemigrations")
    call_command('makemigrations')
    print("makemigrations complete\n\n")

    print("running migrate --run-syncdb")
    call_command('migrate','--run-syncdb')
    print("migrate --run-syncdb complete\n\n")

    # original setup scripts... to be removed once new setup started in 2023 is finalized
    print("running runscript add_contracts")
    print("THIS MAY TAKE AWHILE - PLEASE BE PATIENT")
    call_command('runscript', 'add_contracts')
    print("runscript add_contracts complete\n\n")

    print("running runscript add_sentences")
    call_command('runscript', 'add_sentences')
    print ("runscript add_sentences complete\n\n")

    print("running runscript add_questions")
    call_command('runscript', 'add_questions')
    print ("runscript add_questions complete\n\n")

    #added by ACPP SPRING 2023
    print('Downloading contracts, this will take a minute or two')
    call_command('runscript', 'download_contracts')
    print('contracts downloaded\n\n')

    # #added by ACPP SPRING 2023
    # print('Reading in Excel Sheet')
    # call_command('runscript', 'read_master_sheet')
    # print('master sheet read\n\n')

    # print("running npm install")
    # subprocess.run('npm install', cwd=FRONTEND_DIR, shell=True)
    # print ("npm install complete\n\n")

    # print("running npm run build")
    # subprocess.run('npm run build', cwd=FRONTEND_DIR, shell=True)
    # print ("npm run build complete\n\n")
