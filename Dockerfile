#Drew Wiesen

#Base image of Ubuntu, version is from my current WSL Ubuntu Setup
FROM ubuntu:20.04

#install python and nodeJS (versions from WSL Ubuntu)
RUN apt-get update && apt-get install -y software-properties-common gcc && \
    add-apt-repository -y ppa:deadsnakes/ppa

RUN apt-get update && apt-get install -y python3.8 python3-distutils python3-pip python3-apt

RUN apt update
#We directly answer the questions asked using the printf statement
RUN printf 'y\n1\n\1n' | apt install nodejs
RUN apt install -y npm

#clones the repository to the image and moves into that file
#Must install git first
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

#RUN git clone https://github.com/CAASI-G2A/g2a-website.git     This is the actual g2a repo

#my repo on my docker branch. for bugfixing
RUN git clone https://github.com/drewwiesen155/g2a-website.git
RUN git checkout docker
#WORKDIR /g2a-website

#Commands taken from setup wiki of the repo (Docker errors needed to add the install commands)
RUN pip3 install virtualenv
RUN apt install python3.8-venv
RUN virtualenv venv
#Docker doesn't work with just source so had to be changed
RUN python3 -m venv /venv

WORKDIR /g2a-website/PPUC
RUN pip3 install -r requirements.txt

#Fixes error that I had in my WSL setup. Error message gives following commands. (Print handles user input that console needs)
RUN printf 'y' | python3 manage.py makemigrations --merge
RUN python3 manage.py migrate

RUN python3 manage.py runscript -v3 setup_app

WORKDIR /g2a-website/PPUC/frontend
RUN npm install
RUN npm run build

WORKDIR /g2a-website/PPUC
#equivalent for python3 manage.py runserver
CMD [ "python3", "./manage.py", "runserver" ]