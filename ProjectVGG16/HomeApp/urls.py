# packages
from django.urls import path
from .views import homeView, uploadView, processView

urlpatterns = [
    path("", homeView, name="home page"),
    path("upload/", uploadView, name="upload images"),
    path("process/", processView, name="process images"),
]