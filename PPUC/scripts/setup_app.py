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

    #added by ACPP SPRING 2023
    print('Downloading contracts, this will take a minute or two')
    call_command('runscript', 'download_contracts')
    print('contracts downloaded\n\n')

    # original setup scripts... to be removed once new setup started in 2023 is finalized
    print("running runscript add_contracts")
    print("THIS MAY TAKE AWHILE - PLEASE BE PATIENT")
    call_command('runscript', 'add_contracts')
    print("runscript add_contracts complete\n\n")

    # New setup script... added by ACPP SPRING 2023
    # Not fully ready yet as of SU23.... still need original setup script as of rn to make Location objects 
    print('Reading in Excel Sheet')
    call_command('runscript', 'read_master_sheet')
    print('master sheet read\n\n')

    # Adds sentences for the setupscript 
    print("running runscript add_questions")
    call_command('runscript', 'add_questions')
    print ("runscript add_questions complete\n\n")

