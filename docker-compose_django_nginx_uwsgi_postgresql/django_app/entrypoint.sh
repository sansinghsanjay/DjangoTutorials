#!/bin/sh

set -e

python manage.py migrate
python manage.py collectstatic --noinput

uwsgi --socket :8000 --master --enable-threads --module django_app.wsgi
