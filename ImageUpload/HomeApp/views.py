from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import base64

# Create your views here.
def homeView(request):
    return render(request, "home.html")

@csrf_exempt
def uploadProcessView(request):
    # get the POST data
    base64_data = request.POST.get('image_base64')
    filename = request.POST.get("filename")
    # convert the received data from base64 to image and save it
    image_data = base64.b64decode(base64_data)
    # write image
    image_file = open("./HomeApp/received_data/" + filename, "wb")
    image_file.write(image_data)
    image_file.close()
    # make a dictionary with a status value
    result_dict = {
        'result': "Success"
    }
    return JsonResponse(result_dict)
