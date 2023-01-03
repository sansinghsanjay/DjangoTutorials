# packages
from CeleryIndeterminateProgressbar.celery import app
from random import randint
import time

@app.task(bind=True)
def gen_random(self):
    # generate a random number
    r = randint(10, 20)
    # sleep for r seconds
    time.sleep(r)
    return 1