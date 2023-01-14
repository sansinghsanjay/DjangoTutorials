# packages
from django.shortcuts import render

# Create your views here.
def indexView(request):
    return render(request, "index.html")

def signupView(request):
    return render(request, "signup.html")