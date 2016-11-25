
'use strict'; 

var db = require(__dirname + '/../mysql');

exports.addApplication = function(res, req) {
      var query = "insert into APPLIES "
            + "values (?, ?, CURDATE())";
      db.query(query,
              [
                req.body.account_id,
                req.body.job_id
              ],
              function(err, rows) {
                if (err) {
                  return res.status(500).send({code: err.code});
                }
                res.send(rows);
              }
      );
  
};
