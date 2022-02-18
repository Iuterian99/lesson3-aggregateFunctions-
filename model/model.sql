-- we are in database called "basics";

CREATE TABLE courses(
  course_id serial PRIMARY KEY,
  course_name varchar(250) not null,
  course_price int not null
);

CREATE TABLE groups(
  group_id serial PRIMARY KEY,
  group_name varchar(250) not null,
  group_teacher varchar(250) not null,
  group_of int REFERENCES courses(course_id)
);

CREATE TABLE students(
  student_id serial PRIMARY KEY,
  student_name varchar(250) not null,
  student_of int REFERENCES groups(group_id)
);

