# packages
from CeleryProgressbar.celery import app
from random import randint
import time

@app.task(bind=True)
def gen_random(self):
    total_progress = 0
    # initial result or progress
    dict_result = {
        'result': -1
    }
    # send the initial result or progress
    self.update_state(state="PROGRESS", meta=dict_result)
    # run the while loop - simulating the processing
    while(total_progress < 100):
        # generate a random number or progress
        r = randint(3, 10)
        # calculate the total progress
        if((total_progress + r) > 100):
            r = 100 - total_progress
        total_progress += r
        # update the progress on the terminal
        print(">>>>>>>>>>> " + str(r) + " -- " + str(total_progress))
        # make result dictionary
        dict_result = {
            'result': total_progress
        }
        # sleep the process before sending the result
        time.sleep(r)
        # send the update
        self.update_state(state="PROGRESS", meta=dict_result)
    # wait for smooth finish
    time.sleep(3)
    return 1