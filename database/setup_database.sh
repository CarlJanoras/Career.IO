#!/bin/bash
mysql -uroot < create_tables.sql            && echo "Created Tables"                  && 
mysql -uroot < insert_job_seekers.sql       && echo "Inserted Job Seekers Data"       && 
mysql -uroot < insert_employers.sql         && echo "Inserted Employers Data"         && 
mysql -uroot < insert_jobs.sql              && echo "Inserted Jobs Data"              && 
mysql -uroot < insert_applications.sql      && echo "Inserted Application Data"       &&
mysql -uroot < jobseeker_procedures.sql     && echo "Inserted Job Seekers Procedures" && 
mysql -uroot < employer_procedures.sql      && echo "Inserted Employers Procedures"   && 
mysql -uroot < job_procedures.sql           && echo "Inserted Jobs Procedures"        && 
mysql -uroot < application_procedures.sql   && echo "Inserted Application Procedures"  
