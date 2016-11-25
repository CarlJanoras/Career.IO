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
			job_seeker_row.work_exp = job_seeker_experiences;
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
			job_seeker_row.educations = job_seeker_educations;
		}
	);
	res.send(job_seeker_row);
};

exports.updateJobSeeker = function (res, req) {
	var jobSeekerDetails = req.body;
	// update atomic attributes
	var queryUpdJobSeeker = "update "
				+ "	JOB_SEEKER "
				+ "set "
				+ "	? "
				+ "where "
				+ "	account_id = ?";
	// delete original skills
	var queryDelSkills = "delete from "
			+ "	JOB_SEEKER_SKILL "
			+ "where "
			+ "	account_id = ?";
	// add new/edited set of skills
		// for each skill 
	var queryInsertSkill = "insert into "
				+ "	JOB_SEEKER_SKILL "
				+ "values ("
				+ "	?, ?"
				+ ")";
	// delete original work experiences
	var queryDelWorkExp = "delete from "
			+ "	WORK_EXPERIENCE "
			+ "where "
			+ "	account_id = ?";
	// add new/edited set of work experiences
		// for each work experience 	
	var queryInsertWorkExp = "insert into "
			+ "		WORK_EXPERIENCE "
			+ "values ("
			+ "		NULL, ?, ?, ?, ?, ?, ?"
			+ ")";
	// delete original education
	var queryDelEduc = "delete from "
			+ "	EDUCATION "
			+ "where "
			+ "	account_id = ?";
	// add new/edited set of education
		// for each education 	
	var queryInsertEduc = "insert into "
			+ "	EDUCATION "
			+ "values ("
			+ "	NULL, ?, ?, ?, ?, ?, ?"
			+ ")";
	db.query(
	);
};
