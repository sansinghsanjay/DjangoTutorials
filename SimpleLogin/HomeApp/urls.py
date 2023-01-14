# package
from django.urls import path
from .views import indexView, signupView

urlpatterns = [
    path("", indexView, name="index page"),
    path("signup/", signupView, name="signup page"),
]