#!/bin/bash
mysql -uroot < create_tables.sql && echo "Created Tables" && 
mysql -uroot < insert_job_seekers.sql && echo "Inserted Job Seekers Data" && 
mysql -uroot < insert_employers.sql && echo "Inserted Employers Data" && 
mysql -uroot < insert_jobs.sql && echo "Inserted Jobs Data" && 
mysql -uroot < insert_applies.sql && echo "Inserted Applies Data"
