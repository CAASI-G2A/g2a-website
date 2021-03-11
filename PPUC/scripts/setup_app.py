from django.core.management import call_command
import subprocess

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

    print("running npm install")
    subprocess.run('npm install', cwd='./frontend', shell=True)
    print ("npm install complete\n\n")

    print("running npm run build")
    subprocess.run('npm run build', cwd='./frontend', shell=True)
    print ("npm run build complete\n\n")
