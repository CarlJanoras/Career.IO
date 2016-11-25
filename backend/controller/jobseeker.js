'use strict'; 

var db = require(__dirname + '/../mysql');

exports.addJobseeker = function(req, res) {
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
			req.body.last_login,
			req.body.creation_date,
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
	var queryJobSeekerSkill = "select 
				+ "	skill 
				+ "from 
				+ "	JOB_SEEKER_SKILL 
				+ "where 
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
			req.body.account_id
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
			req.body.account_id
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
			req.body.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			job_seeker_experiences = rows;
			job_seeker_row.work_exp = job_seeker_experiences;
		}
	);
	
	db.query(queryJobSeekerEduc,
		[
			req.body.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			job_seeker_educations = rows;
			job_seeker_row.educations = job_seeker_educations;
		}
	);
	res.send(job_seeker_row);
};
