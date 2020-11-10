# Grief To Action Website
## For Administrators
### To run locally
* setup virtual environment with commands (on Windows) with python and pip:
  * virtualenv venv
  * .\venv\Scripts\Activate
  * pip install -r requirements.txt
* To setup app(from scratch)
  * python manage.py runscript -v3 setup_app
* To reset database
  * manually delete db.sqlite3, and run commands:
  * python manage.py migrate
  * python manage.py migrate --run-syncdb
* populate database with contracts in contracts folder
  * python manage.py runscript -v3 add_contracts
* create administrator account
  * python manage.py createsuperuser
  * follow prompts
