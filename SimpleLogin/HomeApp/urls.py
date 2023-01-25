# package
from django.urls import path
from .views import indexView, signupView, signupProcess

urlpatterns = [
    path("", indexView, name="index page"),
    path("signup", signupView, name="signup page"),
    path("process_signup", signupProcess, name="signup process"),
]