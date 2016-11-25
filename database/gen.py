from __future__ import print_function
import names
import pycountry
import random
import datetime 
from faker import Faker
import string
import sys
fake = Faker()

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

def get_random_date(a = 1975, b = 2010):
	year = random.randint(a,b)
	start_date = datetime.date.today().replace(day=1, month=1).toordinal()
	end_date = datetime.date.today().toordinal()
	random_day = datetime.date.fromordinal(random.randint(start_date, end_date))
	return str(random_day.year) + "-" + str(random_day.month).zfill(2) + "-" + str(random_day.day).zfill(2)

atts = ['Bachelor\'s Degree', 'High School', 'Vocational Course', 'Associate\'s Degree', 'Master\'s Degree', 'Doctorate']
industries	= ['Accountancy, banking and finance','Business, consulting and management','Creative arts and design','Energy and utilities','Engineering and manufacturing','Environment and agriculture','Healthcare','Hospitality and events management','Information technology','Law','Law enforcement and security','Leisure, sport and tourism','Marketing, advertising and PR','Property and construction','Public services and administration','Recruitment and HR','Retail','Sales','Science and pharmaceuticals','Teaching and education','Transport and logistics', 'Other']
jls			= ['Internship / OJT','Fresh Grad / Entry Level','Associate / Supervisor','Mid-Senior Level / Manager', 'Director / Executive']
ets			= ['Part-time', 'Full-time']
SIZE = 100000
def generate_job_seekers():
	print("delete from JOB_SEEKER;")
	print("ALTER TABLE JOB_SEEKER AUTO_INCREMENT = 0;");
	for account_id in range(SIZE):
		eprint("job_seeker: ", account_id)
		account_id += 1
		sex             = random.choice(["female", "male"])
		first_name		= names.get_first_name(gender=sex)
		middle_name 	= names.get_last_name()
		last_name 		= names.get_last_name()
		email 			= fake.email()
		password 		= "".join(random.choice(string.ascii_letters + string.digits) for i in range(random.randint(6,10)))
		last_login      = "CURDATE()"
		creation_date   = "CURDATE()"
		description     = fake.text()
		birthday  		= get_random_date()
		country 		= fake.country()
		city 			= fake.city()
		address 		= fake.street_address()
		phone_number 	= "".join([random.choice(string.digits) for i in range(11)])
		values			= [email, password, description, last_login, creation_date, 
							birthday, phone_number, sex, first_name, middle_name, last_name, address, city, country]
		skills 			= [fake.job().split(",")[0] for i in range(1, 7)]
		values			= [str(account_id)] + list(map(lambda x: "\"" + x + "\"" if x != "CURDATE()" else x, values))
		print("insert into JOB_SEEKER values (" +
			", ".join(values) + ");")
		for skill in set(skills):
			print("insert into JOB_SEEKER_SKILL values (" + str(account_id) + ",\"" + skill + "\");")

		for i in range(random.randint(1,4)):
			school 		= names.get_last_name() + random.choice([" University", " School", " Institution"])
			description = fake.text()
			start 		= get_random_date()
			finished 	= get_random_date()
			at 			= random.choice(atts)
			values 		= [description, school, finished, start, at]
			values		= ["NULL"] + list(map(lambda x: "\"" + x + "\"", values)) + [str(account_id)]
			print("insert into EDUCATION values (" + ",".join(values) + ");")

		# WORK_EXPERIENCE(Work_id, Job_title, Start, Finished, Employer, Description, Account_id)
		for i in range(random.randint(1,4)):
			title 		= fake.job()
			employer	= fake.company()
			description = fake.text()
			start 		= get_random_date()
			finished 	= get_random_date()
			values 		= [title, employer, start, finished,description]
			values		= ["NULL"] + list(map(lambda x: "\"" + x + "\"", values)) + [str(account_id)]
			print("insert into WORK_EXPERIENCE values (" + ",".join(values) + ");")

def generate_employers():
	print("delete from EMPLOYER;")
	print("ALTER TABLE EMPLOYER AUTO_INCREMENT = 0;");
	for i in range(SIZE):
		eprint("employer: ", i)
		email 			= fake.email()
		password 		= "".join(random.choice(string.ascii_letters + string.digits) for i in range(random.randint(6,10)))
		last_login      = "CURDATE()"
		creation_date   = "CURDATE()"
		company_name 	= fake.company()
		website			= fake.url()
		industry 		= random.choice(industries)
		date_posted     = get_random_date()
		description     = fake.text()
		country 		= fake.country()
		city 			= fake.city()
		address 		= fake.street_address()
		values			= [email, password, last_login, creation_date, company_name, website, industry, description, address, city, country]
		values			= ["NULL"] + list(map(lambda x: "\"" + x + "\"" if x != "CURDATE()" else x, values))
		print("insert into EMPLOYER values (" +
			", ".join(values) + ");")

#JOB(Job_id, Title, Description, Employment_type, Job_level, Salary, Application_deadline, Industry, Address, City, Country, Account_id)

def generate_jobs():
	print("delete from JOB;")
	print("ALTER TABLE JOB AUTO_INCREMENT = 0;");

	for i in range(SIZE):
		eprint("job: ", i)
		title 			= fake.job()
		description 	= fake.text()
		et 				= random.choice(ets)
		jl 				= random.choice(jls)
		salary 			= str(random.randint(10,100) * 1000)
		deadline 		= get_random_date(2017,2018)
		date_posted     = get_random_date(2015,2016)
		industry 		= random.choice(industries)
		address 		= fake.street_address()
		city 			= fake.city()
		country 		= fake.country()
		values			= [title, description, et, jl, salary, deadline, industry, address, city, country, date_posted]
		skills 			= list(set([fake.job().split(",")[0] for i in range(1, 7)]))
		values			= ["NULL"] + list(map(lambda x: "\"" + x + "\"" if x != "CURDATE()" else x, values)) + [str(random.randint(1,SIZE))]
		print("insert into JOB values (" +
			", ".join(values) + ");")

		# REQUIREMENT(Requirement_id, Educational_attainment, Job_id)
		at = "\"" + random.choice(atts) + "\"" 
		print("insert into REQUIREMENT values (NULL," + at + ", " + str(i+1) + ");")
		for skill in skills:
			print("insert into REQUIREMENT_SKILL values (LAST_INSERT_ID(),\"" +  skill + "\");")

def generate_applies():
	print("delete from APPLIES;")
	for i in range(SIZE):
		eprint("apply: ", i)
		date_posted 	= get_random_date(2015,2016)
		values			= [str(random.randint(1,SIZE)), str(random.randint(1,SIZE)), "\"" + date_posted + "\""]
		print("insert into APPLIES values (" +
			", ".join(values) + ");")

import time
start = time.time()
print("use jobFinder;")
generate_job_seekers()
generate_employers()
generate_jobs()
generate_applies()
end = time.time()
eprint((end-start) / 60, "minutes")

