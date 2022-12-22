import time
from celery import shared_task
from CeleryRPCDemo.celery import app

@app.task(bind=True)
def loop(self, l):
    "simulate a long-running task like export of data or generateing a report"
    for i in range(int(l)):
        print(i)
        time.sleep(1)
        self.update_state(state='PROGRESS',
                          meta={'current': i, 'total': l})
    print('Task completed')
    return {'current': 100, 'total': 100, }