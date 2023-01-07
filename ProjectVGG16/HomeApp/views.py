from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import base64
from .tasks import processing

# Create your views here.
def homeView(request):
    return render(request, "home.html")

@csrf_exempt
def uploadView(request):
    # get the POST data
    base64_data = request.POST.get('image_base64')
    filename = request.POST.get("filename")
    # convert the received data from base64 to image and save it
    image_data = base64.b64decode(base64_data)
    # write image
    image_file = open("./HomeApp/received_data/" + filename, "wb")
    image_file.write(image_data)
    image_file.close()
    # prepare result dictionary
    response_dict = {
        'result': "Success",
    }
    return JsonResponse(response_dict)

@csrf_exempt
def processView(request):
    # create celery task
    celery_task = processing.delay()
    # prepare the result dictionary
    result_dict = {
        "result": "success",
    }
    return JsonResponse(result_dict)