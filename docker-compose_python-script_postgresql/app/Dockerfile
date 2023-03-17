# base image
FROM python:3.8-alpine

# create working directory
RUN mkdir /app
WORKDIR /app

# copy the script and requirements file
COPY script.py /app/
COPY requirements.txt /app/

# install some dependencies for psycopg2
RUN apk update
RUN apk add gcc python3-dev musl-dev postgresql-dev
RUN apk update

# install packages in requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

# start the script
CMD ["python", "/app/script.py"]