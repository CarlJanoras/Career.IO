'use strict';

var path = require('path');

var config = {
	PORT: 3005,
	IP: 'localhost',

	ASSETS_DIR: path.normalize(__dirname + '/../../frontend'),


	DATABASE_CREDENTIALS: {
		host: 'localhost',
		user: 'CMSC127',
		password: 'project',
		database: 'jobFinder'
	},

	COOKIE_SECRET: 'TH3B1GS3CR3T'
};

module.exports = config;
