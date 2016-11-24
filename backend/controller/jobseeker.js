'use strict'; 

var db = require(__dirname + '/../mysql');

exports.add = function(req, res) {
	var query = "insert into JOB_SEEKER"
		+ "(email, password, last_login, "
    		+ "creation_date, birthday, "
    		+ "phone_number, sex, first_name, "
    		+ "middle_name, last_name, address, "
    		+ "city, country) "
    		+ "values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	
  	db.query(query,
		[
			req.body.email,
			req.body.password,
			req.body.last_login,
			req.body.creation_date,
			req.body.birthday,
			req.body.phone_number,
			req.body.sex,
			req.body.first_name,
			req.body.middle_name,
			req.body.last_name,
      			req.body.address,
      			req.body.city,
      			req.body.country
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		});
};

exports.viewProfile = function(res, req) {
	var query = "select * from JOB_SEEKER"
		+ "where account_id=?";
	
	db.query(query, 
		[
			req.body.account_id
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		});
};
