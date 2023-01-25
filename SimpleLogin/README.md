# SimpleLogin  
Introduction of this project  
  
## PostgreSQL Database  
Following are the commands to install PostgreSQL database:  
```commandline
$ sudo apt-get update  
$ sudo apt-get install postgresql postgresql-contrib  
```  
Following is the command to check the status of postgresql server:  
```commandline
$ sudo systemctl status postgresql
```  
Following is the command to start the postgresql server:  
```commandline
$ sudo systemctl start postgresql
```  
Following is the command to enter inside the postgresql (here "postgres" is a Linux user and also a postgresql user):  
```commandline
$ sudo -i -u postgres  
```  
Command to start the postgres terminal:  
```commandline
$ psql
```  
Command to create a database:  
```commandline
$ create database SimpleLoginDB;
```  
Command to list all databases:  
```commandline
$ \l  
```  
Command to create a new user with password and all permissions on a database (run this command on terminal, i.e., outside postgres):  
```commandline
$ sudo -u postgres createuser --login --pwprompt master  
$ sudo -u postgres createdb --owner=master simplelogindb  
```  
Command to list all users (run it inside psql):  
```commandline
$ \du
```  
Modify the file pg_hba.conf by running the following commands:  
```commandline
$ sudo vim /etc/postgresql/12/main/pg_hba.conf
```  
In the above file, find the line with values (local, all, postgres, peer) under the line "# Database administrative login by unix domain socket" and change the value "peer" to "md5":  
Earlier:  
```commandline
# Database administrative login by Unix domain socket  
local   all      postgres                        peer
```  
After change:  
```commandline
# Database administrative login by Unix domain socket
local   all      postgres                        md5
```  
Restart the postgresql server:  
```commandline
$ sudo service postgresql restart
```  
Run the following command to login in the database with the newly created user:  
```commandline
$ sudo -i -u postgres
$ psql -U master simplelogindb
```  
Fire the following command to check the current user and database:  
```commandline
$ \conninfo
```  
Following is the command to list all the tables within a database:  
```commandline
$ \dt
```  
Following are the available data types in Postgresql:  
`Enumerated Data Types:`  
![alt text](./readme_images/psql_enumerated_datatypes.png?raw=true "Enumerated Data Types")  
  
`Numeric Data Types:`  
![alt text](./readme_images/psql_numeric_datatypes.png?raw=true "Numeric Data Types")  
  
`Network Address Data Types:`  
![alt text](./readme_images/psql_networkAddress_datatypes.png?raw=true "Network Address Data Types")  
  
`Boolean Data Types:`  
![alt text](./readme_images/psql_boolean_datatypes.png?raw=true "Boolean Data Types")  
  
`Date/Time Data Types:`  
![alt text](./readme_images/psql_dateTime_datatypes.png?raw=true "Date/Time Data Types")  
  
`Character Data Types:`  
![alt text](./readme_images/psql_character_datatypes.png?raw=true "Character Data Types")  
  
`Text Search Data Types:`  
![alt text](./readme_images/psql_textSearch_datatypes.png?raw=true "Text Search Data Types")  
  
`Geometric Data Types:`  
![alt text](./readme_images/psql_geometric_datatypes.png?raw=true "Geometric Data Types")  
  
`Monetary Data Types:`  
![alt text](./readme_images/psql_monetary_datatypes.png?raw=true "Monetary Data Types")  
  
`Binary Data Types:`  
![alt text](./readme_images/psql_binary_datatypes.png?raw=true "Binary Data Types")  
