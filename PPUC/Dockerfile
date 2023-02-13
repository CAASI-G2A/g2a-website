#Drew Wiesen

#Base image of lightweight linux OS w/ Python
FROM python:3.8-slim-buster

#Creates and copies the files from the local machine to the docker image
COPY . .
#ADD . .

RUN pip3 install -r requirements.txt

RUN python3 manage.py runscript -v3 setup_app

#Puts all static files into one directory to be used by Whitenoise (print is to say yes to cmd prompt)
RUN printf 'yes' | python3 manage.py collectstatic

#equivalent for python3 manage.py runserver
CMD [ "python3", "./manage.py", "runserver", "0.0.0.0:8000" ]

#designate port for image
EXPOSE 8000