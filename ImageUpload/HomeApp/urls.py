# packages
from django.urls import path
from .views import homeView, uploadProcessView

urlpatterns = [
    path("", homeView, name="home page"),
    path("upload_process/", uploadProcessView, name="upload & process view"),
]