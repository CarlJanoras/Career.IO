/*
    Table of Contents
        create_application
        get_job_seeker_applications
        get_job_applications
*/

/*
    create_application
*/

use jobFinder;

drop procedure if exists delete_employer;
delimiter //
    create procedure delete_employer (
        in _account_id          int,
        in _job_id              int
    )
    BEGIN
        insert into 
            APPLIES 
        values (
            _account_id, _job_id, CURDATE()
        );
    END;
//
delimiter ;


/*
    get_job_seeker_applications
*/
drop procedure if exists get_job_seeker_applications;
delimiter //
    create procedure get_job_seeker_applications (
        in _account_id      int
    )
    BEGIN
        select 
            email, first_name, middle_name, last_name, sex, city, country 
        from 
            JOB
        join 
            APPLICATION 
        on 
            APPLICATION.account_id = _account_id
        and 
            JOB.job_id = APPLICATION.job_id;
    END;
//
delimiter ;

/*
    get_job_applications
*/
drop procedure if exists get_job_applications;
delimiter //
    create procedure get_job_applications (
        in _job_id      int
    )
    BEGIN
        select 
            email, first_name, middle_name, last_name, sex, city, country 
        from 
            JOB_SEEKER 
        join 
            APPLICATION 
        on 
            APPLICATION.job_id = _job_id 
        and 
            JOB_SEEKER.account_id = APPLICATION.account_id;
    END;
//
delimiter ;
