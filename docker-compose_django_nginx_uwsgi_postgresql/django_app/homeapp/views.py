from django.shortcuts import render
import psycopg2
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def homeView(request):
    return render(request, "home.html")

@csrf_exempt
def showRecordFun(request):
    # connect with the postgresql database
    print(">>>> Connecting to db <<<<")
    conn = psycopg2.connect(
        host="db",
        database="testdb",
        user="postgres",
        password="master",
    )
    print(">>>> Connected to db <<<<")
    # create a database cursor
    cur = conn.cursor()
    # get data
    print(">>>> Executing the query <<<<")
    cur.execute("select * from user_record;")
    print(">>>> Executed the query <<<<")
    # get the secret message
    print(">>>> Fetching records <<<<")
    record = cur.fetchall()[0]
    record_str = str(record[0]) + " - " + record[1] + " " + record[2]
    print(">>>> Fetched records <<<<")
    #record_str = "I am working fine..."
    # close cursor and connection
    cur.close()
    conn.close()
    # prepare response
    json_response = {
        "record": record_str
    }
    return JsonResponse(json_response)