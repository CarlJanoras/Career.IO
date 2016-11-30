'use strict'; 

var db = require(__dirname + '/../mysql');

exports.getJobSeekerApplied = function(res, req) {
	var query 	= "select "
			+ "	account_id, email, first_name, "
			+ "	middle_name, last_name, "
			+ "	sex, city, country "
			+ "from JOB_SEEKER "
			+ "where account_id in "
			+ "	(select distinct account_id from APPLICATION where job_id = ?)";
	db.query(query,
		[
			req.query.job_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);
};

exports.addJobSeeker = function(res, req) {
	var query = "insert into" 
		+ "	JOB_SEEKER ("	
		+ "		email, password, last_login, "
		+ "		creation_date, first_name, middle_name,"
		+ "		last_name, birthday, sex "
		+ "	) "
		+ "values ( "
		+ "	?, ?, CURDATE(), "
		+ "	CURDATE(), ?, ?, "
		+ "	?, ?, ? "
		+ ")";
	
  	db.query(query,
		[
			req.body.email,
			req.body.password,
			req.body.first_name,
			req.body.middle_name,
			req.body.last_name,
			req.body.birthday,
			req.body.sex
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);
};

exports.getJobSeeker = function(res, req) {
	var queryJobSeeker = "select "
		+ "	email, description, "
		+ "	birthday, phone_number, sex, "
		+ "	first_name, middle_name, last_name, "
		+ "	address, city, country "
		+ "from "
		+ "	JOB_SEEKER "
		+ "where "
		+ "	account_id = ?";
	var queryJobSeekerSkill = "select "
				+ "	skill "
				+ "from "
				+ "	JOB_SEEKER_SKILL "
				+ "where "
				+ "	account_id = ?";
	var queryJobSeekerWorkExp = "select "
				+ "	job_title, employer, start, "
				+ "	finished, description "
				+ "from "
				+ "	WORK_EXPERIENCE "
				+ "where "
				+ "	account_id = ?";
	var queryJobSeekerEduc = "select "
				+ "	description, school_name, "
				+ "	finished, start, attainment "
				+ "from "
				+ "	EDUCATION "
				+ "where "
				+ "	account_id = ?";
	var job_seeker_row;
	var job_seeker_skills;
	var job_seeker_experiences;
	var job_seeker_educations;
	db.query(queryJobSeeker, 
		[
			req.query.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			job_seeker_row = rows[0];
		}
	);
	
	db.query(queryJobSeekerSkill,
		[
			req.query.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			job_seeker_skills = rows;
			job_seeker_row.skill = job_seeker_skills;
		}
	);
	
	db.query(queryJobSeekerWorkExp,
		[
			req.query.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			job_seeker_experiences = rows;
			job_seeker_row.workExp = job_seeker_experiences;
		}
	);
	
	db.query(queryJobSeekerEduc,
		[
			req.query.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			job_seeker_educations = rows;
			job_seeker_row.educ = job_seeker_educations;
		}
	);
	res.send(job_seeker_row)
};

exports.updateJobSeeker = function (res, req) {
	var jobSeeker = req.body;
	var count;
	//email, password, first_name, middle_name, last_name, 
	//birthday, phone_number, sex, address, city, country, description,
	
	// update atomic attributes
	var queryUpdJobSeeker = "update "
				+ "	JOB_SEEKER "
				+ "set "
				+ "	email = ?, "
				+ "	password = ?, "
				+ "	first_name = ?, "
				+ "	middle_name = ?, "
				+ "	last_name = ?, "
				+ "	birthday = ?, "
				+ "	phone_number = ?, "
				+ "	sex = ?, "
				+ "	address = ?, "
				+ "	city = ?, "
				+ "	country = ?, "
				+ "	description = ? "
				+ "where "
				+ "	account_id = ?";
	db.query(queryUpdJobSeeker,
		[
			jobSeeker.email,
			jobSeeker.password,
			jobSeeker.first_name,
			jobSeeker.middle_name,
			jobSeeker.last_name,
			jobSeeker.birthday,
			jobSeeker.phone_number,
			jobSeeker.sex,
			jobSeeker.address,
			jobSeeker.city,
			jobSeeker.country,
			jobSeeker.description,
			req.query.account_id		
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);
	// delete original skills
	var queryDelSkills = "delete from "
			+ "	JOB_SEEKER_SKILL "
			+ "where "
			+ "	account_id = ?";
	db.query(queryDelSkills,
		[
			req.query.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);
	// add new/edited set of skills
		// for each skill 
	var queryInsertSkill = "insert into "
				+ "	JOB_SEEKER_SKILL "
				+ "values ("
				+ "	?, ?"
				+ ")";
	for (count = 0; count < jobSeeker.skill.length; count++) {
		db.query(queryInsertSkill,
			[
				req.query.account_id, 
				jobSeeker.skill[count]
			],
			function (err, rows) {
				if (err) {
					return res.status(500).send({code: err.code});
				}
				res.send(rows);
			}
		);
	}
	// delete original work experiences
	var queryDelWorkExp = "delete from "
			+ "	WORK_EXPERIENCE "
			+ "where "
			+ "	account_id = ?";
	db.query(queryDelWorkExp,
		[
			req.query.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);
	// add new/edited set of work experiences
		// for each work experience 	
	var queryInsertWorkExp = "insert into "
			+ "		WORK_EXPERIENCE "
			+ "values ("
			+ "		NULL, ?, ?, ?, ?, ?, ?"
			+ ")";
	for (count = 0; count < jobSeeker.workExp.length; count++) {
		db.query(queryInsertWorkExp,
			[
				jobSeeker.workExp[count].job_title,
				jobSeeker.workExp[count].employer,
				jobSeeker.workExp[count].start,
				jobSeeker.workExp[count].finished,
				jobSeeker.workExp[count].description,
				req.query.account_id
			],
			function (err, rows) {
				if (err) {
					return res.status(500).send({code: err.code});
				}
				res.send(rows);
			}
		);
	}
	// delete original education
	var queryDelEduc = "delete from "
			+ "	EDUCATION "
			+ "where "
			+ "	account_id = ?";
	db.query(queryDelEduc,
		[
			req.query.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);// add new/edited set of education
		// for each education 	
	var queryInsertEduc = "insert into "
			+ "	EDUCATION "
			+ "values ("
			+ "	NULL, ?, ?, ?, ?, ?, ?"
			+ ")";
	for (count = 0; count < jobSeeker.educ.length; count++) {
		db.query(queryInsertWorkExp,
			[
				jobSeeker.educ[count].description,
				jobSeeker.educ[count].school_name,
				jobSeeker.educ[count].finished,
				jobSeeker.educ[count].start,
				jobSeeker.educ[count].attainment,
				req.query.account_id
			],
			function (err, rows) {
				if (err) {
					return res.status(500).send({code: err.code});
				}
				res.send(rows);
			}
		);
	}
	
};

exports.deleteJobSeeker = function (res, req) {
	var query = "delete from "
		+ "	JOB_SEEKER "
		+ "where "
		+ "	account_id = ?";
	db.query(query,
		[
			req.query.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);
};
