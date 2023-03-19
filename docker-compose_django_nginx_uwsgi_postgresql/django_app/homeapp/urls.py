# packages
from django.urls import path
from .views import homeView, showRecordFun

urlpatterns = [
    path("", homeView, name="home page"),
    path("show_record", showRecordFun, name="show record function"),
]