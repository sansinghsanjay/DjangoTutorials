# packages
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import psycopg2

# Create your views here.
def indexView(request):
    return render(request, "index.html")

def signupView(request):
    return render(request, "signup.html")

@csrf_exempt
def signupProcess(request):
    # get first name
    firstName = request.POST.get("firstName")
    # get last name
    lastName = request.POST.get("lastName")
    # get gender
    gender = request.POST.get("gender")
    # get dob
    dob = request.POST.get("dob")
    # get emailId
    emailId = request.POST.get("emailId")
    # get contact number
    contactNo = request.POST.get("contactNo")
    # get password
    pwd = request.POST.get("pwd")
    # get retyped-password
    retype_pwd = request.POST.get("retype_pwd")
    # check if retype_pwd matches pwd
    if(retype_pwd == pwd):
        # connect with the postgresql database
        conn = psycopg2.connect(
            host="localhost",
            database="simplelogindb",
            user="master",
            password="master",
        )
        # create a database cursor
        cur = conn.cursor()
        # insert data
        cur.execute(
            "insert into table_user_login (first_name, last_name, gender, dob, email_id, contact_no, pwd) values ('" + firstName + "', '" + lastName + "', '" + gender[0] + "', '" + dob + "', '" + emailId + "', '" + contactNo + "', '" + pwd + "')"
        )
        # commit your insert
        conn.commit()
        # close cursor and connection
        cur.close()
        conn.close()
        # response
        json_response = {
            "result": "successful"
        }
    else:
        print(">> Passwords don't match")
        # response
        json_response = {
            "result": "failed"
        }
    return JsonResponse(json_response)

def signinView(request):
    return render(request, "signin.html")

@csrf_exempt
def signinProcess(request):
    # get email id
    email_id = request.POST.get("emailId")
    # get password
    input_pwd = request.POST.get("pwd")
    # connect with the postgresql database
    conn = psycopg2.connect(
        host="localhost",
        database="simplelogindb",
        user="master",
        password="master",
    )
    # create a database cursor
    cur = conn.cursor()
    # insert data
    cur.execute(
        "select pwd from table_user_login where email_id='" + email_id + "'"
    )
    # get the result
    stored_pwd = cur.fetchone()[0]
    # close cursor and connection
    cur.close()
    conn.close()
    # check if password matches
    if(input_pwd == stored_pwd):
        # response
        json_response = {
            "result": "successful",
        }
    else:
        # response
        json_response = {
            "result": "failed",
        }
    return JsonResponse(json_response)

@csrf_exempt
def homeView(request):
    return render(request, "home.html")