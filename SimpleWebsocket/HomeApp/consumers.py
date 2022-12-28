from channels.generic.websocket import WebsocketConsumer
import json
from random import randint
import time
class WSConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        for i in range(1000):
            message_dict = {
                'message': randint(0, 100),
            }
            json_message = json.dumps(message_dict)
            self.send(json_message)
            time.sleep(1)