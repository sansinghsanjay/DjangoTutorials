# Docker Compose + Python Script + Postgresql (docker-compose_python-script_postgresql)  
This project is to demonstrate the working of Docker Compose. Here, two docker containers are created to run the following:  
1. app: "app" is a docker container (or service, in terms of Docker Compose). In this docker container, a Python script runs that hits postgresql database running in another docker container with name "db". This script builds connection with the database running in the another container, insert data and get the data stored in the database.  
This Python script is a non-interactive script.  
2. db: "db" is another docker container (or service, in terms of Docker container). In this container, a Postgresql database runs and listens on port 5432. For the purpose of connection, port 5432 is exposed.  
  
## How to use this?  
Docker compose is a technique to manage multiple docker containers. This technique suggests to use different docker container for different modules of the project. For instance, one should run the following components in different docker containers so that failure of one shouldn't hamper the other(s):  
1. Web App  
2. Database  
3. Web Server  
4. ML Models  
5. Etc.  
  
In this project, two docker containers are created:  
1. app: This docker container is having a simple Python script which is hitting Postgresql database running in another docker container for some simple database operations, such as insert and retrieve records.  
2. db: This docker container has Postgresql database which is listening for connections on port 5432 (default port of Postgresql).  
  
To keep the project structure clear and logical, I have created two directories, representing the two docker containers. Following are the name of these two directories:  
1. app: For "app" docker container  
2. db: For "db" docker container  
  
Following is the detailed directory structure and purpose of each file:  
1. app:  
   1. Dockerfile: Dockerfile for "app" container  
   2. requirements.txt: List of Python packages with their version to be installed  
   3. script.py: Python script which will hit the database for basic database operations  
2. db:  
   1. Dockerfile: Dockerfile for "db" container  
   2. sql_script.sql: It is a SQL script for creating table (i.e., database schema) during the build of docker image  
  
Command to build the docker compose (run it from the root directory, i.e., where the `docker-compose.yml` file is stored):  
```commandline
$ docker compose build
```  
Run the following command to run containers (run it from the root directory, i.e., where the `docker-compose.yml` file is stored):  
```commandline
$ docker compose up
```  