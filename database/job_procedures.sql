/*
    Table of Contents
        search_jobs
        create_job
        edit_job
        delete_job_skills
        add_job_skill
        get_jobs_available
        delete_job
        delete_all_jobs
*/

use jobFinder;

/*
    search_jobs
*/
drop procedure if exists search_jobs;
delimiter //
    create procedure search_jobs (
        in skey     char(20)
    )
    BEGIN
        select
            job_id, job_title, employment_type,
            job_level, industry, city, country,
            application_deadline, date_posted
        from
            JOB
        where
            job_title like CONCAT("%", skey, "%")
        order by date_posted desc;
    END;
// 
delimiter ;
/*
    create_job
*/
drop procedure if exists create_job;
delimiter //
    create procedure create_job (
        in _job_title               varchar(40),
        in _job_description         varchar(255),
        in _employment_type         enum('Part-time', 'Full-time'),
        in _job_level               enum('Internship / OJT','Fresh Grad / Entry Level','Associate / Supervisor','Mid-Senior Level / Manager', 'Director / Executive'),
        in _salary                  int,
        in _application_deadline    date,
        in _industry                enum('Accountancy, Banking and finance','Business, consulting and management','Creative arts and design','Energy and utilities','Engineering and manufacturing','Environment and agriculture','Healthcare','Hospitality and events management','Information technology','Law','Law enforcement and security','Leisure, sport and tourism','Marketing, advertising and PR','Property and construction','Public services and administration','Recruitment and HR','Retail','Sales','Science and pharmaceuticals','Teaching and education','Transport and logistics', 'Other'),
        in _address                 varchar(40),
        in _city                    varchar(20),
        in _country                 varchar(20),
        in _attainment              varchar(20),
        in _account_id              int
    )
    BEGIN
        insert into JOB (
            job_title, job_description, employment_type, 
            job_level, salary, application_deadline,
            industry, address, city, country, date_posted,
            account_id
        ) values (
            _job_title, _job_description, _employment_type, 
            _job_level, _salary, _application_deadline, _industry, _address, _city, _country, CURDATE(), _account_id
        );
        insert into REQUIREMENT values (NULL, _attainment, LAST_INSERT_ID());
    END;
//
delimiter ;

/*
    edit_job
*/
drop procedure if exists edit_job;
delimiter //
    create procedure edit_job (
        in _job_id                  int,
        in _job_title               varchar(40),
        in _job_description         varchar(255),
        in _employment_type         enum('Part-time', 'Full-time'),
        in _job_level               enum('Internship / OJT','Fresh Grad / Entry Level','Associate / Supervisor','Mid-Senior Level / Manager', 'Director / Executive'),
        in _salary                  int,
        in _application_deadline    date,
        in _industry                enum('Accountancy, Banking and finance','Business, consulting and management','Creative arts and design','Energy and utilities','Engineering and manufacturing','Environment and agriculture','Healthcare','Hospitality and events management','Information technology','Law','Law enforcement and security','Leisure, sport and tourism','Marketing, advertising and PR','Property and construction','Public services and administration','Recruitment and HR','Retail','Sales','Science and pharmaceuticals','Teaching and education','Transport and logistics', 'Other'),
        in _address                 varchar(40),
        in _city                    varchar(20),
        in _country                 varchar(20),
        in _educational_attainment  varchar(20)
    )
    BEGIN
        update JOB set
            job_title               = _job_title,
            job_description         = _job_description,
            employment_type         = _employment_type,
            job_level               = _job_level,
            salary                  = _salary,
            application_deadline    = _application_deadline,
            industry                = _industry,
            address                 = _address,
            city                    = _city,
            country                 = _country
        where 
            job_id = _job_id;
            
        update REQUIREMENT set
            educational_attainment = _educational_attainment
        where 
            job_id = _job_id;
    END;
//
delimiter ;

/*
    delete_job_skills
*/
drop procedure if exists delete_job_skills;
delimiter //
    create procedure delete_job_skills (
        in _job_id          int
    )
    BEGIN
        declare _requirement_id int;
        set _requirement_id = (
            select 
                requirement_id 
            from 
                REQUIREMENT 
            where
                job_id = _job_id
        );
            
        delete from 
            REQUIREMENT_SKILL 
        where
            requirement_id = _requirement_id;
    END;
//
delimiter ;

/*
    add_job_skill
*/
drop procedure if exists add_job_skill;
delimiter //
    create procedure add_job_skill (
        in _job_id          int,
        in _skill           int
    )
    BEGIN
        declare _requirement_id int;
        set _requirement_id = (
            select 
                requirement_id 
            from 
                REQUIREMENT 
            where
                job_id = _job_id
        );
        insert into REQUIREMENT values (
            _requirement_id,
            _skill
        );
    END;
//
delimiter ;


drop procedure if exists delete_job;
        
/*
    delete_specific_job
*/
drop procedure if exists delete_job;
delimiter //
    create procedure delete_job (
        in _job_id          int
    )
    BEGIN
        delete from 
            JOB 
        where 
            job_id = _job_id;
    END;
//
delimiter ;

/*
    delete_all_jobs
*/
drop procedure if exists delete_all_jobs;
delimiter //
    create procedure delete_all_jobs (
        in _account_id      int
    )
    BEGIN
        delete from 
            JOB 
        where 
            account_id = _account_id;
    END;
//
delimiter ;

/*
    get_jobs_available
*/
drop procedure if exists get_jobs_available;
delimiter //
    create procedure get_jobs_available ()
    BEGIN
        select
            job_id, job_title, employment_type, 
            job_level, industry, city, country, 
            application_deadline, date_posted 
        from 
            JOB 
        where 
            application_deadline > curdate() 
        order by 
            date_posted asc;
    END;
//
delimiter ;
