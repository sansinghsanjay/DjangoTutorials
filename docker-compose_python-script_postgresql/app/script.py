# packages
import psycopg2

# function to insert data
def insert_data(roll_no, firstname, lastname):
	# connect with db
	cur, conn = connect_db()
	# insert data
	cur.execute("insert into user_record (roll_no, first_name, last_name) values (" + str(roll_no) + ", '" + firstname + "', '" + lastname + "');")
	conn.commit()
	# close connection with db
	close_db(cur, conn)
	# update status
	print("")
	print("* * *")
	print(">>>> Record inserted successfully")
	print("* * *")
	print("")
	# return success
	return True

# function to show the entire data
def show_data():
	# connect with db
	cur, conn = connect_db()
	# get the data
	cur.execute("select * from user_record;")
	all_records = cur.fetchall()
	# close connection with db
	close_db(cur, conn)
	# show the entire data
	print("")
	print("* * *")
	for i in range(len(all_records)):
		print(">>>>", i, all_records[i])
	print("* * *")
	print("")
	# return success
	return True

# function to connect with db
def connect_db():
	# connect with db
    conn = psycopg2.connect(
        host="db",
        database="testdb",
        user="postgres",
        password="master",
    )
    # create a database cursor
    cur = conn.cursor()
    # return cur and conn
    return cur, conn

# function to close db connection
def close_db(cur, conn):
	cur.close()
	conn.close()
	return True

insert_data(1, 'Sanjay', 'Singh')
insert_data(2, 'Bhavana', 'Singh')
show_data()