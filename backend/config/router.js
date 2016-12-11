'use strict';

var importer = require('anytv-node-importer');
var path = require('path');

module.exports = function(router) {

    var __ = importer.dirloadSync(__dirname + '/../controller');
    var root_obj = { root: path.join(__dirname, '/../../frontend') };

    router.get('/getJob',               __.job       .getJob                    );
    router.get('/searchJob',            __.job       .searchJob                 );
    router.get('/getJob_available',     __.job       .getJobAvailable           );
    router.post('/addJob',              __.job       .addJob                    );
    router.post('/updateJob',           __.job       .updateJob                 );  
    router.post('/deleteJob',           __.job       .deleteJob                 );
    
    router.get('/getJobSeeker',         __.jobseeker .getJobSeeker              );
    router.post('/addJobSeeker',        __.jobseeker .addJobSeeker              );
    router.post('/updateJobSeeker',     __.jobseeker .updateJobSeeker           );
    router.post('/deleteJobSeeker',     __.jobseeker .deleteJobSeeker           );
    
    router.get('/getEmployer',          __.employer  .getEmployer               );
    router.get('/searchEmployer',       __.employer  .searchEmployer            );
    router.post('/addEmployer',         __.employer  .addEmployer               );
    router.post('/updateEmployer',      __.employer  .updateEmployer            );
    router.post('/deleteEmployer',      __.employer  .deleteEmployer            );

    router.get('/getJobSeekerApplied',  __.jobseeker   .getJobSeekerApplied     );
    router.post('/addApplication',      __.application .addApplication          );





    
    router.get('/job',              function(req, res) {
        res.sendFile('job.html',            root_obj);
    });
    router.get('/jobseeker',        function(req, res) {
        res.sendFile('jobseeker.html',      root_obj);
    });
    router.get('/employer',         function(req, res) {
        res.sendFile('employer.html',       root_obj);
    });

    router.get('/myapplications',   function(req, res) {
        res.sendFile('myapplications.html', root_obj);
    });
    router.get('/jobapplications',  function(req, res) {
        res.sendFile('jobapplications.html',root_obj);
    });

    router.get('/searchjob',        function(req, res) {
        res.sendFile('searchjob.html',      root_obj);
    });
    router.get('/searchemployer',   function(req, res) {
        res.sendFile('searchemployer.html', root_obj);
    });

    router.get('/editjob',          function(req, res) {
        res.sendFile('editjob.html',        root_obj);
    });
    router.get('/editjobseeker',    function(req, res) {
        res.sendFile('editjobseeker.html',  root_obj);
    });
    router.get('/editemployer',     function(req, res) {
        res.sendFile('editemployer.html',   root_obj);
    });

    router.get('/', function(req, res) {
        res.sendFile('index.html',      root_obj);
    });
    return router;
};
