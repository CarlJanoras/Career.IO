'use strict'; 

var db = require(__dirname + '/../mysql');

exports.create = function(req, res) {
	var queryString = "INSERT INTO account"
					+ "(email, password)"
					+ "VALUES(?,?)";
	db.query(
		queryString,
		[
			req.body.email,
			req.body.password
		],
		function(err, rows) {
			if (err) {
				return res.status(500).send({code: err.code});
			}
			res.send(rows);
		}
	);
};

exports.login = function(req, res, next) {
	var data = {
		email: req.body.email,
		password: req.body.password
	};
	//what to do at the start of the query
	function start() {
		//Do not append the user inputs to string. This eliminates SQL Injection.
		var queryString = "SELECT *"
						+ " FROM account"
						+ " WHERE email=?"
						+ " AND password=?";
		db.query(
			queryString,
			[
				data.email, 
				data.password
			],
			send_response
		);
	};

	//what to do after the query is done
	function send_response(err, result, args, last_query) {
		if(err) {
			next(err);
			return res.status(500).send(err);
		} else if(!result.length) {
			//Do not send which one is wrong. This eliminates user enumeration.
			return res.status(404).send({message: 'Wrong username or password.'});
		} else {
			req.session.user = {
				username: result[0].username,
			};
			return res.send(result[0]);
		}
	};
	start();
};

exports.logout = function(req, res, next) {
	function start() {
		req.session.destroy();
		return res.send({message: 'Logout success!'});
	};
	start();
};

exports.checkSession = function (req, res, next) {
    function  start() {
		if (!req.session.username) {
        	return res.send("NO_SESSION");
    	} else {
        	return res.send("SESSION");
    	}
	};
	start();
};