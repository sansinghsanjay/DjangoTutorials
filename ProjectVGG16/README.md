# ProjectVGG16  
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
  
## Demo Video  
Click on the below YouTube thumbnail to play the video:  
[![IMAGE_ALT](./readme_images/ProjectVGG16_YouTube_video_thumbnail.jpg)](https://youtu.be/tPBiO1z6i3c "ProjectVGG16 Demo")  
  
## Steps to build this project  
> **_NOTE:_** Please get the model weights by running the script `./misc_scripts/download_save_vgg16_weights.py` in this repository. Place the stored weights at a safe location and update its path in the variable `weights_path` defined in file `./HomeApp/views.py`.  
1. Create the Django project, migrate the initial changes and check the working of default server:  
`$ django-admin startproject ProjectVGG16`  
`$ cd ProjectVGG16`  
`$ python manage.py migrate`  
`$ python manage.py runserver`  
After running the last command given above, hit "localhost:8000" in a browser and you should see the default Django server page.  
2. Create a new app:  
`$ python manage.py startapp HomeApp`  
3. Open "ProjectVGG16/settings.py" and add the name of new app:  
```commandline
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'HomeApp',
]
```  
4. Create the following directories:  
   1. "HomeApp/templates/"  
   2. "HomeApp/static/"  
5. Create a file "HomeApp/templates/home.html" and paste the following code:  
```commandline
<paste - code>
```  
6. Create a file "HomeApp/static/home.css" and paste the following code:  
```commandline
<paste - code>
```  
7. Open "HomeApp/views.py" and paste the following code:  
```commandline
<paste - code>
```  
8. Create "HomeApp/urls.py" and paste the following code:  
```commandline
<paste - code>
```  
9. Open "ProjectVGG16/urls.py" and paste the following code:  
```commandline
<paste - code>
```  
10. Create "HomeApp/static/home.js" and paste the following code in it:  
```commandline
<paste - code>
```  
11. 