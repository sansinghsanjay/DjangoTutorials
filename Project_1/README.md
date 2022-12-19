# Project 1  
It is a single page application:  
1. Taking input on page "home.html"
2. Printing output on the same page "home.html"  
  
This project is making use of the following technologies:  
1. Django  
2. JavaScript / AJAX / jQuery  
3. CSS  
  
Following is the workflow of this project:  
1. User will input two numbers "a" and "b" (input type="text") on a HTML webpage, defined inside a form
2. User will click on a button (type "button"). This button click will call a JavaScript function, "function_sum()"
3. In this JavaScript function ("function_sum()"), jQuery will take the value of "a" and "b"
4. Then, AJAX will call a Django view ("process/") and send the value of "a" and "b"
5. The Django view ("process/") will take these numbers, i.e., "a" and "b", add them, store the result in "c", and finally send them in a JsonResponse (from django.http import JsonResponse)
6. AJAX call will get the value of addition, i.e., "c", in response and show its value on the same HTML page
  
## Error:  
An error was there, "Error 403, Forbidden". This error usually comes because of some issue with csrf_token.
  
Although, the csrf_token was declared in the HTML page but still this error was coming.  
  
To resolve this, the following has been used in the file "HomeApp/views.py":  
`
from django.views.csrf import csrf_exempt
@csrf_exempt
`  
  
It is not a good practice to use csrf_exempt (as per my understanding) but being a newbie, I feel it is okay for now!