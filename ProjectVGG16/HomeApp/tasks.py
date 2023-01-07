# packages
import time
from ProjectVGG16.celery import app

@app.task(bind=True)
def processing(self):
    "simulate a long-running task like export of data or generateing a report"
    # sleep for 10 seconds to simulate heavy processing
    time.sleep(10)
    # response dictionary
    response_dict = {
        "result": "success",
    }
    return response_dict