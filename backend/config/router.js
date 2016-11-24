'use strict';

var importer = require('anytv-node-importer');
var path = require('path');

module.exports = function(router) {

	var __ = importer.dirloadSync(__dirname + '/controller');

	router.get('/getJobDetails', __.job.getJobDetails);
	router.get('/search', __.job.findAll);

	router.get('/job', function(req, res) {
		if (req.query.id != undefined && req.query.id.match(/^\d+$/)){
			res.sendFile('job.html', { root: path.join(__dirname, '../frontend') });
		} else {
			res.sendFile('index.html', { root: path.join(__dirname, '../frontend') });
		}
	});
	router.get('/searchjobs', function(req, res) {
		res.sendFile('searchjob.html', { root: path.join(__dirname, '../frontend') });
	});
	router.get('/', function(req, res) {
		res.sendFile('index.html', { root: path.join(__dirname, '../frontend') });
	});
	router.get('/employer', function(req, res) {
		res.sendFile('employer.html', { root: path.join(__dirname, '../frontend') });
	});
	return router;

};
