'use strict';

var config = require(__dirname + '/config');
var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	app = express(),

	server = app.listen(config.PORT, config.IP,
    	function(){
	        var host = server.address().address;
	        var port = server.address().port;
	        console.log('Example app is listening at http://%s:%s', host, port);
    	});

app.use(express.static(config.ASSETS_DIR));

console.log('info:', 'Setting up sessions...');

app.use(
	session({
	    secret: config.COOKIE_SECRET,
	    name: 'CMSC127',
	    resave: true,
	    rolling: true,
	    saveUninitialized: true,
	    cookie: {
			maxAge: 7200000 //2 hours
	    }
 	})
);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(require(__dirname + '/router')(express.Router()));
