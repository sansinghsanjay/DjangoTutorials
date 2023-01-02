# packages
from django.shortcuts import render

# home view for home.html page
def homeView(request):
    return render(request, "home.html")