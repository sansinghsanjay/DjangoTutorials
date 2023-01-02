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
        time.sleep(1)
        while(task.ready() != True and task.state != "SUCCESS"):
            message_dict = {
                'message': task.result['result'],
            }
            json_message = json.dumps(message_dict)
            self.send(json_message)
            time.sleep(1)