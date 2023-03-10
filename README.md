# Django Tutorials  
This is a collection of Djanog projects that I have built while learning Django and other useful web technologies, primarily, HTML, Django, CSS, JavaScript, jQuery, etc.
  
Following are the short description of each of these Django projects. For more details, please read the README.md file available under each of these projects.
  
## Project_1  
It is a single page application:  
1. Taking input on page "home.html"
2. Printing output on the same page "home.html"  
  
This project is making use of the following technologies:  
1. Django  
2. JavaScript / AJAX / jQuery  
3. CSS  
  
## CelerySample  
This is a sample Celery/Django project.  
  
In this project, we will learn to offload the time-consuming tasks to an asynchronous process which will not hinder the responsiveness of the web application so that user don't feel like stuck.  
  
Following technologies have been used in this project:    
1. Django  
2. CSS  
3. JavaScript / AJAX / jQuery  
4. Celery [KEY ROLE]  
  
## CeleryRPCDemo  
This is a sample Celery/Django project.  
  
In this project, we will learn to offload the time-consuming tasks to an asynchronous process which will not hinder the responsiveness of the web application so that user don't feel like stuck. Along with this, we will keep checking the status of the offloaded task in this project.  
  
Following technologies are the key focus in this project:  
1. Django
2. Celery
3. RPC  
  
## SimpleWebsocket  
This is a simple Djanog project to demonstrate the working of WebSockets in Django.  
In this project, following is accomplished:  
1. On clicking a HTML button, the javascript function will connect with the backend (a Django function) through a web-socket  
2. This Django function will generate random numbers and send them at an interval of 1 second to the javascript function  
3. The same javascript function will display that randomly generated number on the HTML page  
  
## CeleryProgressbar  
This project is updating a progress bar to show the progress of a background running task.  
The background running task is simulating a high computational task. This task is made to run in background by using Celery.  
  
Following is the execution flow of this project:  
1. Click on the "START" button
2. This will connect the front-end (i.e., javascript) with a web-socket (Django at backend)
3. This web-socket code (Django at backend) will accept the connection request and initiate a Celery task (in Python), i.e., in background
4. This web-socket (Django at backend) will get the progress made by the Celery task (Python code) and send it to the connected front-end (javascript)
5. The front-end (javascript) will update the progress-bar and its value (i.e., HTML page)  
  
## CeleryIndeterminateProgressbar  
This project is updating an indeterminate progress bar to show the progress of a background running task whose progress cannot be determined.  
The background running task is simulating a high computational task. This task is made to run in background by using Celery.  
  
Following is the execution flow of this project:  
1. Click on the "START" button
2. This will connect the front-end (i.e., javascript) with a web-socket (Django at backend)
3. This web-socket code (Django at backend) will accept the connection request and initiate a Celery task (in Python), i.e., in background
4. This web-socket (Django at backend) will send a signal to the front-end (i.e., javascript) that the background task has started. The front-end (i.e., javascript) script will update the same on the interface by showing status as "Started" and start the indeterminate progress bar  
  
Following are the technologies used to develop this project:  
1. HTML / CSS
2. JavaScript / jQuery
3. Django
4. Celery
5. WebSocket
  
## ProjectVGG16  
This project is just to demonstrate the use of VGG16 model at the backend of a Django app.  
In this project, a VGG16 model is deployed that will process the passed images from the front-end and make predictions. Then, the Django back-end will share those predictions with the front-end which will show them to the user.  
Following is the execution flow:  
1. Use will upload a number of images by clicking on a "Browse" button.  
2. Once those images are selected, the next page will show those images just for the user confirmation. The user will confirm the uploaded images by clicking on a "Submit" button at the bottom of this page.  
3. As the user clicks on the "Submit" button, the from-end will pass those images to the Django back-end.  
4. This Django back-end will process the passed images, i.e., resizing; and then pass them to the VGG16 model. This model will make predictions by processing these images.  
5. After the VGG16 model generate predictions, the Django backend will send those predictions to the front-end to present the result to the user.  
  
Following are the technologies used in this project:  
1. Django  
2. HTML / CSS  
3. JavaScript / jQuery / AJAX  
4. Celery  
5. WebSocket  
  
## ImageUpload  
This project is demonstrating the upload of image files. The progress of upload is shown by a progress bar.  
  
Following are the technologies used in this project:  
1. HTML / CSS  
2. JavaScript / jQuery / AJAX  
3. Django  
  
## SimpleLogin  
This project is demonstrating signup and signin functionality. 
For the same Postgresql database is used.  
  
## ci_cd-pipeline  
This project is just to learn CI/CD (Continuous Integration/Continuous Delivery) by using GitHub Actions and AWS.  
  
Following are the technologies used in this project:  
1. Django  
2. uWSGI  
3. Nginx  
4. GitHub Actions (for CI/CD pipeline)  
5. AWS EFS (Elastic File System)  
6. AWS EC2  
This may further get extended by Docker and Kubernetes in future.  
  