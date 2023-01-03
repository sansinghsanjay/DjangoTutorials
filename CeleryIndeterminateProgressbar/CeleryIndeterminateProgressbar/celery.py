# packages
import os
from celery import Celery

# set default environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CeleryIndeterminateProgressbar.settings')
# create celery instance with a name
app = Celery('CeleryIndeterminateProgressbar')
# celery configurations
app.config_from_object('django.conf:settings', namespace="CELERY")
# celery - discover tasks
app.autodiscover_tasks()