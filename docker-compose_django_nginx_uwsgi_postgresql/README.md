# Docker Compose + Django + Nginx + uWSGI + Postgresql (docker-compose_django_nginx_uwsgi_postgresql)  
  
## Introduction  
In this project, following modules are running in separate docker container:  
1. Django app & uWSGI  
2. Nginx  
3. Postgresql database  
  
All these modules are running in different docker containers (i.e., total 3 containers) and all these containers are managed by a Docker Compose file (i.e., a YML file).  
  
Following is the structuring of this entire project (this structuring is done to keep it clean and logical):  
1. django_app: This directory has the Django app. Following are the key files inside this directory:  
   1. Dockerfile: This is the Dockerfile to load this entire Django app with uWSGI in a docker container  
   2. entrypoint.sh: This is a shell script to perform some essential tasks of Django, such as "migrate", "collectstatic", and starting "uWsgi"  
   3. requirements.txt: This file has the list of all required Python packages with their version number in order to maintaing the compatibility between them  
   4. django_app/settings.py: This file has some crucial parameters that needs to be editted in case of any modifications to this project  
2. proxy: This directory has Nginx and uWSGI params file to serve the Django app on a request from client. Following are the key files of this directory:  
   1. Dockerfile: This is the dockerfile to create a docker image of Nginx  
   2. default.conf: This is the default configuration file for the django_app  
   3. uwsgi_params: This is a list of uWSGI params  
3. db: This directory is for Postgresql database with the following important files:  
   1. Dockerfile: This is the dockerfile to create Docker image of the database  
   2. sql_script.sql: This is a sql file with sql queries to create database and tables  
4. docker-compose.yml: This is the docker compose file to manage all docker images and their containers during runtime  
  
## Django  
Django is a high-level Python web framework that encourages rapid development and clean pragmatic design.  
It is free and open-source. Following are some of the key benefits of Django:  
1. Ridiculously Fast  
2. Reassuringly Secure  
3. Exceedingly Scalable  
It was created in the autumn of year 2003. It follows the Model-View-Template (MVT) architecture design.  
  
## Django vs Flask  
| Attributes        | Django                                                                                                        | Flask                                                                                                             |
|-------------------|---------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Type of Framework | Django is a full-stack web framework that enables ready to use solutions with its batteries-included apporach | Flask is a light-weight framework that gives abundant features without external libraries and minimalist features |
| Architecture      | It follows MVT (Model-View-Template) architecture                                                             | It is a minimalistic framework that provides developers flexibility on application structuring                    |
| Project Layout    | Django is suitable for multipage applications                                                                 | Flask is suitable for only single page applications                                                               |
| Maturity          | Launched in 2005. It is a very matured framework with extensive community support                             | Launched in 2010, Flask is a younger framework but has a larger community                                         |
| Database Support  | Django supports the most popular Relational Database Management Systems, like MySQL, Oracle, etc.             | Flask doesn't support the basic database management system and uses SQL Alchemy for database requirements         |  
  
You should use Django when:  
- You are working on a large project  
- You want to scale up to a more complex task later on.  
- When you want to create web apps with ORM support, API backends, and future plans to incorporate high-end technologies like Machine Learning.  
  
You should use Flask when:  
- You are working on smaller projects with coding flexibility.  
- You need API support and want to include more extensions in the future.  
- You want more control over your database.  
- Flask is the best choice for creating static websites, rapid prototypes, MVPs, and RESTful web services.  
  
## uWSGI  
uWSGI is an open-source software application that aims at developing a full-stack for building hosting services. It is named after Web Server Gateway Interface (WSGI).  
WSGI (Web Server Gateway Interface) plays a vital role at the time when you deploy your Django or Flask application. WSGI is a specification that describes the communication between web servers and Python web application or frameworks. It explains how a web server communicates with python web application / framework.  
  
## Nginx  
Nginx is an open-source web server, also used as a reverse proxy, HTTP cache and load balancer.  
A reverse proxy sits in front of a web server and receives all the requests before they reach to origin server. Following is the purpose of reverse proxy:  
- When you browse the web normally by entering a domain name or clicking a link, your browser/device connects to the website’s server directly and starts downloading its resources.  
- If you want to anonymize your IP address from the websites you visit, then you can use a proxy server to send all your requests to it first. It’ll forward your requests to the DNS resolver and then download the website’s resources from its origin server.  
- Afterward, it’ll pass on those resources to your device. This is called a forward proxy.  
- You’re completely hidden from the website as it thinks your request is originating from the forward proxy.  
- Apart from enhancing user privacy, a forward proxy is mainly used to bypass geographical content restrictions. For instance, if you want to watch a video that’s blocked in your region, you can use a forward proxy with an IP address on which the video is available to view.  
- A forward proxy works almost the same way as a Virtual Private Network (VPN), but they’re distinct technologies with unique use cases (they can sometimes overlap though).  
- A reverse proxy server acts as a front for the origin server to maintain anonymity and enhance security, just like how a user/client can use a forward proxy to achieve the same. It ensures that no user or client communicates directly with the origin server.  
  
## uWSGI and Nginx  
As Django (and Flask) are built on Python, thus they obey WSGI specifications for communication. However, web servers like Nginx (and Apache) and browsers understand HTTP specifications (or protocol). To break this barrier between Nginx and Django / Flask, uWSGI is used in between.  
  
```
                         _________        _______        __________
            User 1 ---> |         |      |       |      |          |
            User 2 ---> |   Web   |      |       |      | Django / |
              :         | Server  | ---> | uWSGI | ---> |  Flask   |
              :         | (Nginx) |      |       |      |   App    |
            User n ---> |_________|      |_______|      |__________|
```  
  
uWSGI could be used as a standalone web server in production, but that is not its inteneded use. Nginx is much more powerful than uWSGI. For starters, it is more secure. Its default security settings are already decent and they can be configured further. NGINX has better handling of static resources, which can significanlly reduce server and network load. It offers ways to cache your dynamic content and it communicates with CDNs better. It is a great load balancer.  
  
## How to create the project?  
Following are the steps to create this project:  
1. Firstly, create a root directory, here it is "docker-compose_django_nginx_uwsgi_postgresql" and make it the currect directory by running the following command:  
```commandline
$ mkdir docker-compose_django_nginx_uwsgi_postgresql
$ cd docker-compose_django_nginx_uwsgi_postgresql
```  
2. Create a django project and apps inside it:  
```commandline
$ django-admin startproject django_app
$ python django_app/manage.py startapp homeapp
$ python django_app/manage.py makemigrations
$ python django_app/manage.py migrate
```  
3. Develop the entire django project and test it.  
4. Make following changes in `django_app/django_app/settings.py` file:  
```commandline
"""
Django settings for django_app project.

Generated by 'django-admin startproject' using Django 4.0.8.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-=+*ixs0&y63aziknqkz@9l60km$iy#k43dun2%o5qchc&h*k^)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(int(os.environ.get('DEBUG', 0)))

ALLOWED_HOSTS = []
ALLOWED_HOSTS_ENV = os.environ.get('ALLOWED_HOSTS')
if ALLOWED_HOSTS_ENV:
    ALLOWED_HOSTS.extend(ALLOWED_HOSTS_ENV.split(','))


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'homeapp',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_app.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

#STATIC_URL = 'static/'
STATIC_URL = '/static/static/'
MEDIA_URL = '/static/media/'

STATIC_ROOT = '/vol/web/static'
MEDIA_ROOT = '/vol/web/media'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
```  
5. Create `django_app/requirements.txt` and paste the following text:  
```commandline
Django==4.0.8
uWSGI==2.0.21
psycopg2==2.9.5
```  
6. Create `django_app/entrypoint.sh` and paste the following content:  
```commandline
#!/bin/sh

set -e

python manage.py migrate
python manage.py collectstatic --noinput

uwsgi --socket :8000 --master --enable-threads --module django_app.wsgi

```  
7. Create `django_app/Dockerfile` and paste the following content:  
```commandline
# base image
FROM python:3.8-alpine

# create directories
RUN mkdir /django_app

# copy files
COPY . /django_app/

# define work directory
WORKDIR /django_app

# set environment
ENV PATH="/django_app:${PATH}"

# install required packages
RUN apk update
RUN apk add --update --no-cache libc-dev linux-headers gcc libpq-dev libpq python3-dev musl-dev postgresql-libs postgresql-dev
RUN apk update
RUN pip install -r /django_app/requirements.txt

# give executable rights to the entrypoint.sh file
RUN chmod +x /django_app/entrypoint.sh

# create shared directories and user
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN adduser -D user
RUN chown -R user:user /vol
RUN chmod -R 755 /vol/web
USER user

# start from the entrypoint
CMD ["/django_app/entrypoint.sh"]
```  
8. Now, create a directory "proxy":  
```commandline
$ cd proxy
```  
9. Create file `proxy/uwsgi_params` and paste the following content:  
```commandline
uwsgi_param QUERY_STRING $query_string;
uwsgi_param REQUEST_METHOD $request_method;
uwsgi_param CONTENT_TYPE $content_type;
uwsgi_param CONTENT_LENGTH $content_length;
uwsgi_param REQUEST_URI $request_uri;
uwsgi_param PATH_INFO $document_uri;
uwsgi_param DOCUMENT_ROOT $document_root;
uwsgi_param SERVER_PROTOCOL $server_protocol;
uwsgi_param REMOTE_ADDR $remote_addr;
uwsgi_param REMOTE_PORT $remote_port;
uwsgi_param SERVER_ADDR $server_addr;
uwsgi_param SERVER_PORT $server_port;
uwsgi_param SERVER_NAME $server_name;
```  
10. Create file `proxy/default.conf` and paste the following content:  
```commandline
server {
    listen 8080;

    location /static {
        alias /vol/static;
    }

    location / {
        uwsgi_pass django_app:8000;
        include /etc/nginx/uwsgi_params;
    }
}
```  
11. Create file `proxy/Dockerfile` and paste the following content:  
```commandline
FROM nginxinc/nginx-unprivileged:1-alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./uwsgi_params /etc/nginx/uwsgi_params

USER root

RUN mkdir -p /vol/static
RUN chmod 755 /vol/static

USER nginx
```  
12. Now, create a directory "db":  
```commandline
$ mkdir db
```  
13. Create a file `db/sql_script.sql` and paste the following content:  
```commandline
create table user_record (
	roll_no int primary key,
	first_name varchar(30) not null,
	last_name varchar(30) not null
);
insert into user_record (roll_no, first_name, last_name) values (1, 'Sanjay', 'Singh');
```  
14. Create a file "db/Dockerfile" and paste the following content:  
```commandline
# base image
FROM postgres:latest

# environment variables
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD master
ENV POSTGRES_DB testdb

# expose port
EXPOSE 5432

# sql script to create table schema
ADD sql_script.sql /docker-entrypoint-initdb.d/
```  
15. Finally, create a file `docker-compose.yml` and paste the following content:  
```commandline
version: '2.16'

services:
  db:
    build: ./db/
    ports:
      - "5433:5432"

  django_app:
    build: ./django_app/
    volumes:
      - static_data:/vol/web
    environment:
      - SECRET_KEY=samplesecret123
      - ALLOWED_HOSTS=127.0.0.1,localhost
    depends_on:
      - db

  proxy:
    build: ./proxy/
    volumes:
      - static_data:/vol/static
    ports:
      - "8080:8080"
    depends_on:
      - django_app

volumes:
  static_data:
```  
  
## How to Build and Run the project?  
Run the following command to build the project (make sure that you are inside the project directory `docker-compose_django_nginx_uwsgi_postgresql/`):  
```commandline
$ docker compose build
```  
On successful build of the project, run the following command to run the project:  
```commandline
$ docker compose up
```  
Finally, hit the following URL in your browser:  
`localhost:8080`  
