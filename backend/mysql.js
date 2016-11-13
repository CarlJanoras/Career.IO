'use strict';

var mysql = require('mysql');
var config	= require(__dirname + '/config');

module.exports = mysql.createConnection(config.DATABASE_CREDENTIALS);