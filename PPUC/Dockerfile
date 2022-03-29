# Drew Wiesen

# Base image of Ubuntu, version is from my current WSL Ubuntu Setup
FROM ubuntu:20.04

COPY requirements.txt /app/requirements.txt

# Install python and nodeJS (versions from WSL Ubuntu)
RUN apt-get update && apt-get install -y software-properties-common gcc && \
    add-apt-repository -y ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y python3.8 python3-distutils python3-pip python3-apt
RUN apt update

# We directly answer the questions asked using the printf statement
RUN printf 'y\n1\n\1n' | apt install nodejs
RUN apt install -y npm

# Clones the repository to the image and moves into that file
# Must install git first
# RUN apt-get update && \
#   apt-get upgrade -y && \
#   apt-get install -y git

# The actual g2a repo
# RUN git clone https://github.com/CAASI-G2A/g2a-website.git     

# Commands taken from setup wiki of the repo (Docker errors needed to add the install commands)
# RUN pip3 install virtualenv
# RUN apt install python3.8-venv
# RUN virtualenv venv
# Docker doesn't work with just source so had to be changed
# RUN python3 -m venv /venv
# WORKDIR /g2a-website/PPUC

RUN pip3 install -r app/requirements.txt

WORKDIR /app

ADD . .

# Fixes error that I had in my WSL setup. Error message gives following commands. (Print handles user input that console needs)
# RUN printf 'y' | python3 manage.py makemigrations --merge
# RUN python3 manage.py migrate

# RUN python3 manage.py runscript -v3 setup_app

# WORKDIR /frontend
# RUN npm install
# RUN npm run build

# WORKDIR /app

# Exposes port for connection
EXPOSE 8000

# Equivalent for python3 manage.py runserver
CMD ["python3", "./manage.py", "runserver"]