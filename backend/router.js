'use strict';

var importer = require('anytv-node-importer');

module.exports = function(router) {

	var __ = importer.dirloadSync(__dirname + '/controller');

	router.get('/search', __.job.findAll);

	return router;


};
