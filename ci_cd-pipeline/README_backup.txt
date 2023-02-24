This project has been developed in different stages, as shown below:
1. Deploying Django project on Gunicorn and Nginx on local machine: [link](https://arctype.com/blog/install-django-ubuntu/)

More update will come as we will progress in this project.

## How to point your namecheap domain name to your AWS EC2 Linux instance
Namecheap is a domain registrar that gives you the opportunity to register a new domain name.
Following are the steps to make your namecheap domain name point to your AWS EC2 instance.
1. Purchase a domain name on namecheap.com.
2. You are going to need an Elastic IP address:
   1. An Elastic IP address is a static IPv4 address designed for dynamic cloud computing. An Elastic IP address is allocated to your AWS account, and it will be yours until you release it. By using an Elastic IP address, you can mask the failure of an instance or software by rapidly remapping the address to another instance in your account. Alternatively, you can specify the Elastic IP address in a DNS record for your domain, so that your domain points to your instance.
   2. If your computer is hosting a web server, its IP address is what identifies it to the rest of the Internet. A computer on the Internet can have a static IP address, which means it stays the same over time, or a dynamic IP address, which means the address can change over time.
   3. An Elastic IP address is a public IPv4 address, which is reachable from the Internet. If your instance does not have a public IPv4 address, you can associate an Elastic IP address with your instance to enable communication with the Internet.
   4. To ensure efficient use of Elastic IP addresses, we impose a small hourly charge if an Elastic IP address is not associated with a running instance, or if it associated with a stopped instance or an unattached network interface. While your instance is running, you are not charged for an Elastic IP address associate with the instance, but you are charged for an additional Elastic IP addresses associated with the instance.
   5. An Elastic IP address is for use in a specific region only, and cannot be moved to a different region.
3. ++

## Setting up environment
We will run this project in a virtual environment. Following are the commands that we have to run in order to create and use this environment:
```commandline
# command to install virtual environment
    $ sudo pip3 install virtualenv
# change directory to the project directory
    $ cd DjangoProject
# create a virtual environment
    $ python3 -m venv myprojectenv
# activate the virtual environment
    $ source ./myprojectenv/bin/activate
# install django and gunicorn
    (myprojectenv) $ python3 -m pip install Django
    (myprojectenv) $ python3 -m pip install gunicorn

```

## Enabling "systemctl" on WSL2
`systemctl` is Linux command useful for starting/stopping background services. This will be quite helpful in setting-up Gunicorn in the next steps. Thus, it is crucial to have `systemctl` enabled and working in the system.
If you are working on WSL2 (Windows Subsystem for Linux 2 - on Windows), then you may not be able to run systemctl command as it is not provisioned there.
To check if `systemctl` command is working or not on your WSL2, please run the following command:
`sudo systemctl status time-sync.target`
If the above command doesn't work then it means `systemctl` is not available on your system.
To enable `systemctl` on your WSL2, follow the steps given in the below link:
https://gist.github.com/djfdyuruiry/6720faa3f9fc59bfdf6284ee1f41f950

## Gunicorn
```commandline
# assuming project name is "DjangoProject" created by "django-admin startproject" command
    $ cd DjangoProject
# Edit settings.py file and add "STATIC_ROOT" variable after importing "os" package
# This is necessary so that Nginx can handle requests for these items
# The added lines will tell Django to place the static files (such as images, css, js, etc.) in a
# directory called "static" in the base project directory.
    $ vim DjangoProject/DjangoProject/settings.py
        . . .
        STATIC_URL = 'static/'

        # Default primary key field type
        # https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

        DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

        import os
        STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
    $ python3 manage.py makemigrations
    $ python3 manage.py migrate
    $ python3 manage.py collectstatic
# command to allow the firewall port 8000
    $ sudo ufw allow 8000
# Finally you can test your project through Gunicorn
    $ gunicorn --bind 0.0.0.0:8000 DjangoProject.wsgi
```

## Creating systemd socket and service files for Gunicorn
We have tested above that Gunicorn can interact with our Django application, but you should now implement a more robust way of starting and stopping the application server. To accomplish this, you will make systemd service and socket files.
The Gunicorn socket will be created at boot and will listen for connections. When a connection occurs, systemd will automatically start the Gunicorn process to handle the connection.
Start by creating and opening a systemd socket file for Gunicorn with `sudo` privileges.
Paste the following code in `$ sudo vim /etc/systemd/system/gunicorn.socket` file:
```commandline
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```
Next, create and open a systemd service file for Gunicorn with `sudo` privileges in your text editor. The service filename should match the socket filename with the exception of the extension. Past the following code in `$ sudo vim /etc/systemd/system/gunicorn.service`:
```commandline
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=root
Group=www-data
WorkingDirectory=/home/sammy/myprojectdir
ExecStart=/home/sammy/myprojectdir/myprojectenv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          myproject.wsgi:application

[Install]
WantedBy=multi-user.target
```
Don't forget to update the paths `WorkingDirectory` and `ExecStart` in the above file.
Now, run the following commands to create service:
```commandline
$ sudo systemctl start gunicorn.socket
$ sudo systemctl status gunicorn.socket
$ sudo systemctl enable gunicorn.socket
```
Now, to check for the existence of the `gunicorn.sock` file within the `/run` directory, run the following command:
`$ file /run/gunicorn.sock`
If the `systemctl status` command indicates that an error occurred or if you do not find the `gunicorn.sock` file in `/run/` directory, then it means that the Gunicorn socket is not created successfully. Check the gunicorn logs by running the following command:
`$ sudo journalctl -u gunicorn.socket`

## Nginx
Following are the useful Nginx commands:
```commandline
# commands to install nginx
    $ sudo apt-get update
    $ sudo apt-get install nginx
    $ sudo apt-get update
# commands to check the working of nginx
    $ sudo service nginx status
    $ sudo service nginx start
    $ sudo service nginx stop
# Create a Nginx configuration file by firing the following command:
    $ sudo vim /etc/nginx/conf.d/django.conf
# paste the following content in the above file (update the path against "root"):
    server {
    	listen 80;
    	server_name django.example.com;
    	location = /favicon.ico { access_log off; log_not_found off; }
    	location /static/ {
    		root /root/django_project;
    	}
    	location / {
    		include proxy_params;
    		proxy_pass http://unix:/run/gunicorn.sock;
    	}
    }
# Save and close the file
# Then, run the following command to verify the Nginx for any configuration error in the above file:
    $ sudo nginx -t
# You should get to see the following output:
    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful
# Restart the Nginx service to apply the changes:
    $ sudo service nginx restart
# Now, hit the following URL in a browser to access your Django application:
    http://django.example.com/admin
```
