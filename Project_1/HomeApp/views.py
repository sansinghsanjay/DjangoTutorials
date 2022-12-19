from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def homeView(request):
    return render(request, "home.html")

@csrf_exempt
def processView(request):
    a = int(request.POST.get("a"))
    b = int(request.POST.get("b"))
    c = a + b
    dict_result = {
        'result': c
    }
    return JsonResponse(dict_result)
