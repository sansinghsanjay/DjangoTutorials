# CI/CD Pipeline  
This project is just to learn CI/CD (Continuous Integration/Continuous Delivery) by using GitHub Actions and AWS.  
  
Following are the technologies used in this project:  
1. Django  
2. Gunicorn  
3. Nginx  
4. GitHub Actions (for CI/CD pipeline)  
5. AWS EFS (Elastic File System)  
6. AWS EC2  
This may further get extended by Docker and Kubernetes in future.  
  
## Deploying Django project on AWS EC2 instance (Simple Deployment - unprofessional and insecure)  
Here, we will deploy a Django project on a free AWS EC2 instance.  
For this follow the steps given below ([source](https://pythoncircle.com/post/697/hosting-django-app-for-free-on-amazon-aws-ec2-with-gunicorn-and-nginx/)):  
1. Create an AWS Elastic File System (EFS) and AWS Elastic Compute 2 (EC2) instance; and connect them. For the same, follow the following steps given on the [link](https://docs.aws.amazon.com/efs/latest/ug/gs-step-two-create-efs-resources.html):  
   1. Step 1: Create your file system  
   2. Step 2: Create EC2 resources and launch an instance  
2. Start your newly created instance from the AWS EC2 Dashboard.  
3. Connect with the running EC2 instance on SSH:  
   1. Note down the `Public DNS` of your EC2 instance for later use.  
   2. Add the following `inbound rules` to the `security group` of your EC2 instance on AWS:
   ![Inbound Rules](./AWS/inbound_ruels.PNG)  
   3. Run the following SSH command to connect with the instance:
   `$ ssh -i ./AWS/ci_cd-project.pem ubuntu@ec2-54-254-130-0.ap-southeast-1.compute.amazonaws.com`  
   4. Run `exit` command to exit the connection.  
4. After this, create a zip file of the Django project in this repository in the directory `DjangoProject`.  
5. Then, run the following SCP command on the local machine to copy this zip file from the local machine to the running EC2 instance:  
   `$ scp -i ./AWS/ci_cd-project.pem ./DjangoProject.zip ubuntu@ec2-54-254-130-0.ap-southeast-1.compute.amazonaws.com:~/.`  
6. Do SSH login and unzip the copied zip file by running the following commands:  
```commandline
$ ssh -i ./AWS/ci_cd-project.pem ubuntu@ec2-54-254-130-0.ap-southeast-1.compute.amazonaws.com
$ unzip DjangoProject.zip
```
7. Now, copy the public IP address of the running EC2 instance and put it in the `settings.py` file (on EC2 instance):  
```commandline
# run the following command to open settings.py file:
    $ cd DjangoProject
    $ vim DjangoProject/settings.py
# paste the public IP address of the EC2 instance in "ALLOWED_HOSTS" variable, as shown below:
    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = True
    
    ALLOWED_HOSTS = ["54.254.130.0"]
    
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
8. Finally, run the following command on EC2 instance:  
`$ python3 manage.py runserver 0.0.0.0:8000`  
9. Now, hit the `<public_IP_address>:8000` in your browser. The application should work there.  
10. ++  
  
This is an unprofessional and extremely unsafe method of deploying a Django app on AWS EC2 instance. This is because we are using the default Django server on EC2 instance. This server is only for development and debugging purpose. It is not at all for production purpose as it lacks a lot of features that are "must" at production level (including security).  