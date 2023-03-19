# base image
FROM postgres:latest

# environment variables
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD master
ENV POSTGRES_DB testdb

# expose port
EXPOSE 5432

# sql script to create table schema
ADD sql_script.sql /docker-entrypoint-initdb.d/