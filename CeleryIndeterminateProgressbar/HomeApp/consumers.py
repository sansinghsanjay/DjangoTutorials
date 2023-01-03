from channels.generic.websocket import WebsocketConsumer
import json
import time
from .tasks import gen_random

class WSConsumer(WebsocketConsumer):
    # connect function
    def connect(self):
        # accept the connection
        self.accept()
        # get object of the celery task
        task = gen_random.delay()
        # sleep for 1 second, let that background task start
        time.sleep(1)
        # keep checking until the background task completes successfully
        while(task.ready() != True and task.state != "SUCCESS"):
            # prepare the JSON response for the front-end
            message_dict = {
                'message': "Started",
            }
            json_message = json.dumps(message_dict)
            # send the response
            self.send(json_message)
            # wait for 1 second and check again
            time.sleep(1)
        # on successful completion, prepare the JSON response
        message_dict = {
            'message': "Completed",
        }
        json_message = json.dumps(message_dict)
        # send the response
        self.send(json_message)
        return 1