# base image
FROM python:3.8-alpine

# create directories
RUN mkdir /django_app

# copy files
COPY . /django_app/

# define work directory
WORKDIR /django_app

# set environment
ENV PATH="/django_app:${PATH}"

# install required packages
RUN apk update
RUN apk add --update --no-cache libc-dev linux-headers gcc libpq-dev libpq python3-dev musl-dev postgresql-libs postgresql-dev
RUN apk update
RUN pip install -r /django_app/requirements.txt

# give executable rights to the entrypoint.sh file
RUN chmod +x /django_app/entrypoint.sh

# create shared directories and user
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN adduser -D user
RUN chown -R user:user /vol
RUN chmod -R 755 /vol/web
USER user

# start from the entrypoint
CMD ["/django_app/entrypoint.sh"]