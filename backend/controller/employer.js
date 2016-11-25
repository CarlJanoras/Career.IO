'use strict';

var db = require(__dirname + '/../mysql');

exports.getEmployer = function (res, req) {
	var query = "select" 
		+ "		email, company_name, website, "
		+ "		industry, company_description, "
		+ "		address, city, country "
		+ "from "
		+ "		EMPLOYER "
		+ "where "
		+ "		account_id = ?";
	db.query(query,
					[
						req.query.account_id
					],
					function (err, rows) {
						if (err) {
							return res.status(500).send({code: err.code});
						}
						res.send(rows);
					}
	);
};

exports.searchEmployer = function (res, req) {
	var query = "select" 
					+ "		account_id, company_name, industry, "
					+ "		city, country"
					+ "from "
					+ "		EMPLOYER "
					+ "where "
					+ "		company_name like '%?%' "
					+ "		or industry like '%?%'"
					+ "		or city like '%?%'"
					+ " 	or country like '%?%'";
	db.query(query,
					[
						req.query.company_name,
						req.query.industry,
						req.query.city,
						req.query.country
					],
					function (err, rows) {
						if (err) {
							return res.status(500).send({code: err.code});
						}
						res.send(rows);
					}
	);
};

exports.addEmployer = function(res, req) {
	var query = "insert into" 
					+ "	EMPLOYER ("	
					+ "		email, password, last_login, "
					+ "		creation_date,  company_name, "
					+ "		website, industry "
					+ ") "
					+ "values ( "
					+ "	?, ?, CURDATE(), "
					+ "	CURDATE(), ?, "
					+ "	?, ?"
					+ ")";
	
  db.query(query,
					[
						req.body.email,
						req.body.password,
						req.body.company_name,
						req.body.website,
						req.body.industry
					],
					function(err, rows) {
						if (err) {
							return res.status(500).send({code: err.code});
						}
						res.send(rows);
					}
	);
};

exports.updateEmployer = function (res, req) {
	var query = "update "
						+ "			EMPLOYER " 
						+ "set "
						+ "			email = ?, "
						+ "			password = ?, "
						+ "			company_name = ?, "
						+ "			website = ?, "
						+ "			industry = ?, "
						+ "			company_description = ?, "
						+ " 		address = ?, "
						+ "			city = ?, "
						+ "			country = ? "
						+ "where "
						+ "			account_id = ?";
	db. query(query,
						[
								req.body.email,
								req.body.password,
								req.body.company_name,
								req.body.website,
								req.body.industry,
								req.body.company_description,
								req.body.address,
								req.body.city,
								req.body.country,
								req.query.account_id
						],
						function (err, rows) {
							if (err) {
								return res.status(500).send({code: err.code});
							}
							res.send(rows);
						}			
	);
};

exports.deleteEmployer = function (res, req) {
	var query = "delete from "
						+ "			EMPLOYER "
						+ "where "
						+ "			account_id = ?";
	db. query(query,
						[
								req.query.account_id
						],
						function (err, rows) {
							if (err) {
								return res.status(500).send({code: err.code});
							}
							res.send(rows);
						}			
	);
};
