# packages
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import base64
from keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPool2D, Flatten, Dense
import cv2
import numpy as np
import pandas as pd
import os

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
    # path of weights
    weights_path = "/home/sansingh/san_home/dl_models/vgg16/vgg16_weights.h5"
    # path of classes
    class_path = "./HomeApp/static/vgg16/vgg16_class.csv"
    # data path
    data_path = "./HomeApp/received_data/"
    # vgg16 model
    model = Sequential()
    model.add(Conv2D(input_shape=(224, 224, 3), filters=64, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(Conv2D(filters=64, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
    model.add(Conv2D(filters=128, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(Conv2D(filters=128, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
    model.add(Conv2D(filters=256, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(Conv2D(filters=256, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(Conv2D(filters=256, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
    model.add(Conv2D(filters=512, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(Conv2D(filters=512, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(Conv2D(filters=512, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
    model.add(Conv2D(filters=512, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(Conv2D(filters=512, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(Conv2D(filters=512, kernel_size=(3, 3), padding="same", activation="relu"))
    model.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
    model.add(Flatten())
    model.add(Dense(units=4096, activation="relu"))
    model.add(Dense(units=4096, activation="relu"))
    model.add(Dense(units=1000, activation="softmax"))
    # load weights
    model.load_weights(weights_path)
    # get list of files
    image_files = os.listdir(data_path)
    # create a ndarray to store all the image files
    images_ndarray = np.ndarray((len(image_files), 224, 224, 3))
    # one by one load each file, process it and make predictions
    for i in range(len(image_files)):
        # read image
        img = cv2.imread(data_path + image_files[i])
        # change the order of channels in image
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        # resize the image
        img = cv2.resize(img, (224, 224))
        # store it in the ndarray
        images_ndarray[i] = img
    # make predictions
    pred_confidence = model.predict(images_ndarray)
    pred_ids = np.argmax(pred_confidence, axis=1)
    # load label files
    labels_df = pd.read_csv(class_path)
    # get labels
    labels = list(labels_df['labels'])
    # get prediction labels
    pred_labels = [labels[i] for i in pred_ids]
    # prepare the result dictionary
    result_dict = dict()
    for i in range(len(image_files)):
        # make id of the element at the front-end
        id = image_files[i]
        id = id.replace(".", "_")
        result_dict["div_" + id + "_text"] = pred_labels[i]
    return JsonResponse(result_dict)