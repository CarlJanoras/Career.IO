/*
    Table of Contents:
        create_job_seeker
        get_job_seeker
        get_job_seeker_skills
        get_job_seeker_work
        get_job_seeker_education
        edit_job_seeker
        delete_job_seeker_skills
        delete_job_seeker_work
        delete_job_seeker_education
        add_job_seeker_skill
        add_job_seeker_work
        add_job_seeker_education
        get_job_seeker_application
*/

use jobFinder;
/* 
    create_job_seeker
*/
drop procedure if exists create_job_seeker;
delimiter //
	create procedure create_job_seeker (
		in _email           int,
		in _password        char(20),
		in _first_name      char(20),
		in _middle_name     char(20),
		in _last_name       char(20),
		in _birthday        date,
		in _sex             date
	)
	BEGIN
		insert into 
		JOB_SEEKER 
		(   
			email, password, last_login, creation_date,
			first_name, middle_name, last_name, birthday, sex
		) 
		values 
		(
			_email, _password, CURDATE(), CURDATE(), 
			_first_name, _middle_name, _last_name, _birthday, _sex
		);
	END;
//
delimiter ;

/* 
    get_job_seeker
*/
drop procedure if exists get_job_seeker;
delimiter //
	create procedure get_job_seeker (
		in _account_id  int
	)
	BEGIN
		select 
			email, description, birthday, phone_number, sex,
			first_name, middle_name, last_name, address, city, country
		from 
			JOB_SEEKER
		where
			account_id = _account_id;
	END;
//
delimiter ;

/* 
    get_job_seeker_skills
*/
drop procedure if exists get_job_seeker_skills;
delimiter //
	create procedure get_job_seeker_skills (
		in _account_id  int
	)
	BEGIN
		select 
			skill 
		from 
			JOB_SEEKER_SKILL 
		where 
			account_id = _account_id;
	END;
//
delimiter ;

/* 
    get_job_seeker_work
        
*/
drop procedure if exists get_job_seeker_work;
delimiter //
	create procedure get_job_seeker_work (
		in _account_id  int
	)
	BEGIN
		select 
			job_title, employer, start, finished, description 
		from 
			WORK_EXPERIENCE 
		where 
			account_id = _account_id;
	END;
//
delimiter ;

/* 
    get_job_seeker_education
*/
drop procedure if exists get_job_seeker_education;
delimiter //
	create procedure get_job_seeker_education (
		in _account_id  int
	)
	BEGIN
		select 
			description, school_name, 
			finished, start, attainment 
		from 
			EDUCATION 
		where 
			account_id = _account_id;
	END;
//
delimiter ;

/* 
    edit_job_seeker
*/
drop procedure if exists edit_job_seeker;
delimiter //
    create procedure edit_job_seeker (
        in _account_id         int,
        in _email              varchar(20),
        in _password           varchar(20),
        in _description        varchar(255),
        in _birthday           date,
        in _phone_number       varchar(11), 
        in _sex                enum('male', 'female'),
        in _first_name         varchar(20),
        in _middle_name        varchar(20),
        in _last_name          varchar(20),
        in _address            varchar(20),
        in _city               varchar(20),
        in _country            varchar(20)
    )
    BEGIN
        update JOB_SEEKER set
            email           = _email,
            password        = _password,
            description     = _description,
            birthday        = _birthday,
            phone_number    = _phone_number,
            sex             = _sex,
            first_name      = _first_name,
            middle_name     = _middle_name,
            last_name       = _last_name,
            address         = _address,
            city            = _city,
            country         = _country
        where 
            account_id = _account_id;
    END;
//
delimiter ;

/* 
    delete_job_seeker_skills
*/
drop procedure if exists delete_job_seeker_skills;
delimiter //
    create procedure delete_job_seeker_skills (
        in _account_id     int
    )
    BEGIN
        delete from 
            SKILL
        where 
            account_id = _account_id;
    END;
//
delimiter ;

/* 
    delete_job_seeker_work
*/
drop procedure if exists delete_job_seeker_work;
delimiter //
    create procedure delete_job_seeker_work (
        in _account_id     int
    )
    BEGIN
        delete from 
            WORK_EXPERIENCE 
        where 
            account_id = _account_id;
    END;
//
delimiter ;

/* 
    delete_job_seeker_education
*/
drop procedure if exists delete_job_seeker_education;
delimiter //
    create procedure delete_job_seeker_education (
        in _account_id     int
    )
    BEGIN
        delete from 
            EDUCATION
        where 
            account_id = _account_id;
    END;
//
delimiter ;

/*
    add_job_seeker_skill
*/
drop procedure if exists add_job_seeker_skill;
delimiter //
    create procedure add_job_seeker_skill (
        in _account_id     int,
        in _skill          varchar(40)
    )
    BEGIN
        insert into 
            SKILL
        values (
            _account_id, _skill
        );
    END;
//
delimiter ;

/* 
    add_job_seeker_work
*/
drop procedure if exists add_job_seeker_work;
delimiter //
    create procedure add_job_seeker_work (
        in _account_id     int,
        in _job_title      varchar(40),
        in _employer       varchar(40),
        in _start          date,
        in _finished       date,
        in _description    varchar(255)
    )
    BEGIN
        insert into 
            WORK_EXPERIENCE 
        values (
            NULL, _job_title, _employer, _start, 
            _finished, _description, _account_id
        );
    END;
//
delimiter ;

/* 
    add_job_seeker_education
*/
drop procedure if exists add_job_seeker_education;
delimiter //
    create procedure add_job_seeker_education (
        in _account_id     int,
        in _school_name    varchar(40),
        in _start          date,
        in _finished       date,
        in _description    varchar(255),
        in _attainment     enum('Bachelor\'s Degree', 'High School', 'Vocational Course', 'Associate\'s Degree', 'Master\'s Degree', 'Doctorate')
    )
    BEGIN
        insert into 
            EDUCATION 
        values (
            NULL, _description, _school_name, _finished,
            _start, _attainment, _account_id
        );
    END;
//
delimiter ;
