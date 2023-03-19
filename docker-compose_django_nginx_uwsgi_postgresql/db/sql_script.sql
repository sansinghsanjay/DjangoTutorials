create table user_record (
	roll_no int primary key,
	first_name varchar(30) not null,
	last_name varchar(30) not null
);
insert into user_record (roll_no, first_name, last_name) values (1, 'Sanjay', 'Singh');