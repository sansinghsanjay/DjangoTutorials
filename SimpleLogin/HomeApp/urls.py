# package
from django.urls import path
from .views import indexView, signupView, signupProcess, signinView, signinProcess, homeView

urlpatterns = [
    path("", indexView, name="index page"),
    path("signup", signupView, name="signup page"),
    path("process_signup", signupProcess, name="signup process"),
    path("signin", signinView, name="signin page"),
    path("process_signin", signinProcess, name="signin process"),
    path("home", homeView, name="home page"),
]