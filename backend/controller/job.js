'use strict';

var db = require(__dirname + '/../mysql');

exports.findAll = function(req, res) {
	var queryString = "SELECT *"
					+ "FROM MOCK_DATA";
	db.query(
		queryString,
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			if (rows.length === 0) {
				return res.status(404).send({error:true, message:'No jobs found.'});
			}
			res.send(rows);
		}
	);
};

exports.search = function(req, res) {
	var queryString = "SELECT *"
					+ "FROM MOCK_DATA"
					+ "WHERE name=?"
					+ "OR description=?"
					+ "OR location=?";
	db.query(
		queryString,
		[
			req.body.name,
			req.body.description
		],
		function(err, rows) {
		if (err) {
			return res.status(500).send({code: err.code});
		}
		if (rows.length === 0) {
			return res.status(404).send({error:true, message:'No jobs found.'});
		}
		res.send(rows);
	});
};

exports.getJobDetails = function(req, res) {
	var queryString = "SELECT * "
					+ "FROM MOCK_DATA where "
					+ "id=?";
	db.query(
		queryString,
		[
			req.query.id
		],
		function(err, rows) {
		if (err) {
			return res.status(500).send({code: err.code});
		}
		if (rows.length === 0) {
			return res.status(404).send({error:true, message:'No jobs found.'});
		}
		res.send(rows);
	});
};
