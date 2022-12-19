# packages
from django.urls import path
from .views import homeView, processView

urlpatterns = [
    path("", homeView, name="home_page"),
    path("process/", processView, name="process_function"),
]