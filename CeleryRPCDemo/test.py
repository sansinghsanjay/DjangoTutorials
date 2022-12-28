import time
from HomeApp.tasks import loop

task = loop.delay(25)

print("ID of task: ", task.id)
print("Is task is ready: ", task.ready())
print("State of task: ", task.state)

moment = 0
while(True):
	if(task.ready() == True):
		print("Is task is ready: ", task.ready())
		print("State of task: ", task.state)
		break
	else:
		moment += 1
		print("Moment: ", moment)
		print("Is task is ready: ", task.ready())
		print("State of task: ", task.state)
		print("-------------------")
		time.sleep(1)