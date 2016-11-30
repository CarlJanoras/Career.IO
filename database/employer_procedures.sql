/*
    Table of Contents:
        create_employer
        search_employers
        get_employer_details
        edit_employer_details
        delete_employer
*/

use jobFinder;
/*
    create_employer
*/
drop procedure if exists create_employer;
delimiter //
    create procedure create_employer (
        _email              varchar(20),
        _password           varchar(20),
        _company_name       varchar(40),
        _website            varchar(40),
        _industry           enum('Accountancy, banking and finance','Business, consulting and management','Creative arts and design','Energy and utilities','Engineering and manufacturing','Environment and agriculture','Healthcare','Hospitality and events management','Information technology','Law','Law enforcement and security','Leisure, sport and tourism','Marketing, advertising and PR','Property and construction','Public services and administration','Recruitment and HR','Retail','Sales','Science and pharmaceuticals','Teaching and education','Transport and logistics', 'Other')
    )
    BEGIN
        insert into 
            EMPLOYER (
                email, password,last_login, 
                creation_date, company_name, 
                website, industry
            ) 
        values (
                _email, _password, CURDATE(), 
                CURDATE(), _company_name, 
                _website, _industry
        );
    END;
//
delimiter ;

/*
    search_employer
*/
drop procedure if exists search_employers;
delimiter //
    create procedure search_employers (
        in _company_name        varchar(40)
    )
    BEGIN
        select 
            account_id, company_name, industry, 
            city, country
        from 
            EMPLOYER 
        where 
            company_name like concat("%", _company_name, "%");    
    END;
//
delimiter ;

/*
    get_employer_details
*/
drop procedure if exists get_employer_details;
delimiter //
    create procedure get_employer_details (
        in _account_id      int
    )
    BEGIN
        select 
            email, company_name, website, 
            industry, company_description,  
            address, city, country
        from 
            EMPLOYER 
        where 
            account_id = _account_id;
    END;
//
delimiter ;

/*
    edit_employer_details
*/
drop procedure if exists edit_employer_details;
delimiter //
    create procedure edit_employer_details (
        in _account_id             int,
        in _email                  varchar(20),
        in _password               varchar(20),
        in _company_name           varchar(10),
        in _website                varchar(20),
        in _industry               enum('Accountancy, banking and finance','Business, consulting and management','Creative arts and design','Energy and utilities','Engineering and manufacturing','Environment and agriculture','Healthcare','Hospitality and events management','Information technology','Law','Law enforcement and security','Leisure, sport and tourism','Marketing, advertising and PR','Property and construction','Public services and administration','Recruitment and HR','Retail','Sales','Science and pharmaceuticals','Teaching and education','Transport and logistics', 'Other'),
        in _company_description    varchar(40),
        in _address                varchar(40),
        in _city                   varchar(40),
        in _country                varchar(40)
    )
    BEGIN
        update 
            EMPLOYER 
        set 
            email               =   _email,
            password            =   _password,
            company_name        =   _company_name,
            website             =   _website,
            industry            =   _industry,
            company_description =   _company_description,
            address             =   _address,
            city                =   _city,
            country             =   _country
        where 
            account_id = _account_id;
    END;
//
delimiter ;

/*
    delete_employer
*/
drop procedure if exists delete_employer;
delimiter //
    create procedure delete_employer (
        in _account_id          int
    )
    BEGIN
        delete from 
            EMPLOYER 
        where 
            account_id = _account_id;
    END;
//
delimiter ;
    