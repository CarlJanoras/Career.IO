'use strict';

var db = require(__dirname + '/../mysql');

exports.getJob = function (res, req) {
	var query	= "select "
			+ "	job_title, job_description, employment_type, "
			+ "	job_level, salary, application_deadline, "
			+ "	industry, address, city, country, date_posted "
			+ "from JOB where job_id = ?";
			
	var query2 = "select "
	        + " requirement_id, educational_attainment from REQUIREMENT where job_id = ?";
		
	var requirement_id;	
	db.query(query2,
	   [
	       req.query.job_id
	   ],
	   function (err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			requirement_id = rows[0].requirement_id;
		}
	)
	
	db.query(query,
		[
			req.query.job_id
		],
		 function (err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			rows[0].requirement_id = requirement_id;
			return rows[0];
		}
	);
};

exports.searchJob = function (res, req) {
	var query = "select "
		+ "	job_id, job_title, employment_type, "
		+ "	job_level, industry, city, country, "
		+ "	application_deadline, date_posted "
		+ "from "
		+ "	JOB "
		+ "where "
		+ "	job_title like '%?%' "
		+ " 	or job_description like '%?%' "
		+ "order by "
		+ "		date_posted desc";
	db.query(query,
		[
			req.query.job_title,
			req.query.job_description
		],
		function (err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);	
};

exports.getJobAvailable = function (res, req) {
    var query   = "select "
                + "    job_id, job_title, employment_type, "
                + "    job_level, industry, city, country, "
                + "    application_deadline, date_posted "
                + "from JOB where application_deadline > curdate() "
                + "    order by date_posted asc";
                
    db.query(query, 
        [],
        function (err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
        }
    );
};

exports.addJob = function (res, req) {
	var job = req.body;
	var count;
	// set atomic attributes
	var queryInsertJob = "insert into "
			+ "	JOB (	"
			+ "		job_title, job_description, employment_type, "
			+ "		job_level, salary, application_deadline, "
			+ "		industry, address, city, country, date_posted"
			+ "	) "
			+ "values ("
			+ "		?, ?, ?, "
			+ "		?, ?, ?, "
			+ "		?, ?, ?, ?, CURDATE()"
			+ ")";
	db.query(queryInsertJob,
		[
			job.job_title,
			job.job_description,
			job.employment_type,
			job.job_level,
			job.salary,
			job.application_deadline,
			job.industry,
			job.address,
			job.city,
			job.country
		],
		function (err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);
	// set educational attainment
	var queryInsertReqEducation = "insert into "
				                + "     REQUIREMENT "
			                   	+ "values ( "
			                	+ "     NULL, ?, LAST_INSERT_ID())";
	db.query(queryInsertReqEducation,
		[
			job.educational_attainment			
		],
		function (err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);

	// for each skill
	var queryInsertSkill = "insert into "
				        + "	REQUIREMENT_SKILL "
			            + "values ("
			            + "	?, LAST_INSERT_ID()"
				        + ")";
	for (count = 0; count < job.skill.length; count++) {
		db.query(queryInsertSkill,
			[
				job.skill[count]			
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

exports.updateJob = function (res, req) {
	var job = req.body;
	// update atomic attributes
	var queryUpdJob	= "update "
	            	+ "	 	JOB "
	               	+ "set "
	               	+ "     title = ?, description = ?, "
	            	+ "     employment_type = ?, job_level  = ?, "
	            	+ "     salary = ?, application_deadline = ?, "
	            	+ "     industry = ?, address = ?, "
	            	+ "     city = ?, address = ?, "
	            	+ "     country = ? "
	            	+ "where job_id = ?";
	            	
	db.query(queryUpdJob,
		[
		    job.title,
			job.description,
			job.employment_type,
			job.job_level,
			job.salary,
			job.application_deadline,
			job.industry,
			job.address,
			job.country,
			job.job_id
		],
		function (err,rows) {
			if (err) {
					return res.status(500).send({code: err.code});
				}
				res.send(rows);    
		}
	);	
    // set educational attainment
    var queryUpdEducnAttain	= "update REQUIREMENT set "
                             + "	educational_attainment = ? "
                             + "	where job_id = ?";
	db.query(queryUpdEducnAttain,
		[
			job.educational_attainment,
			job.job_id
		],
		function (err,rows) {
			if (err) {
					return res.status(500).send({code: err.code});
				}
				res.send(rows);    
		}
	);	


    // first delete original skills
    var queryDelSkill = "delete from REQUIREMENT_SKILL "
                    + "	where requirement_id = ?";
    db.query(queryDelSkill,
		[
			job.requirement_id
		],
		function (err,rows) {
			if (err) {
					return res.status(500).send({code: err.code});
			}
			res.send(rows);    
		}
	);	
    // add new/edited set of skills
    // for each skill 
    var queryInsertSkill = "insert into REQUIREMENT_SKILL "
        + "	values (?, ?)";
    for (var count = 0; count < job.skill.length; count++) {
        db.query(queryInsertSkill,
                [
                    job.requirement_id,
                    job.skill[count]
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

exports.deleteJob = function (res, req) {
    var query 	= "delete from JOB "
    + "	where job_id = ?";

    db.query(query,
            [
                req.body.job_id
            ],
            function (err, rows) {
                 if (err) {
        					return res.status(500).send({code: err.code});
        			}
        			res.send(rows);
            }
    );
};
