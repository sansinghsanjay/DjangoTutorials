# CeleryProgressbar  
This project is updating a progress bar to show the progress of a background running task.  
The background running task is simulating a high computational task. This task is made to run in background by using Celery.  
  
Following is the execution flow of this project:  
1. Click on the "START" button
2. This will connect the front-end (i.e., javascript) with a web-socket (Django at backend)
3. This web-socket code (Django at backend) will accept the connection request and initiate a Celery task (in Python), i.e., in background
4. This web-socket (Django at backend) will get the progress made by the Celery task (Python code) and send it to the connected front-end (javascript)
5. The front-end (javascript) will update the progress-bar and its value (i.e., HTML page)
  
Following are the technologies used to develop this project:  
1. HTML / CSS
2. JavaScript / jQuery
3. Django
4. Celery
5. WebSocket
  
## Demo Video  
Please click on the below YouTube thumbnail to play the demo video:  
[![IMAGE_ALT](./readme_images/CeleryProgressbar_YouTube_thumbnail.jpg)](https://youtu.be/YIprFOy32QA "CeleryProgressbar Demo")  
  
## Steps to build and run this project  
