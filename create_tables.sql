drop user if exists 'CMSC127'@'localhost';
create user 'CMSC127'@'localhost' identified by 'project';
grant all privileges on jobFinder.* to 'CMSC127'@'localhost' with grant option;

drop database if exists jobFinder;
create database jobFinder;
use jobFinder;

create table JOB_SEEKER (
 account_id     int auto_increment primary key not null,
 email          varchar(256) not null,
 password       varchar(256) not null,
 description    varchar(2048),
 last_login     date not null,
 creation_date  date not null,
 birthday       date not null,
 phone_number   varchar(11), 
 sex            enum('male', 'female') not null,
 first_name     varchar(256) not null,
 middle_name    varchar(256) not null,
 last_name      varchar(256) not null,
 address        varchar(256),
 city           varchar(256),
 country        varchar(256)
);

create table JOB_SEEKER_SKILL (
 account_id      int not null,
 skill           varchar(128) not null,
 PRIMARY KEY     (requirement_id, skill_name)
);

create table EMPLOYER (
 account_id          int auto_increment primary key not null,
 email               varchar(256) not null,
 password            varchar(256) not null,
 last_login          date not null,
 creation_date       date not null,
 company_name        varchar(256) not null,
 website             varchar(256),
 industry            enum('Accountancy, banking and finance','Business, consulting and management','Creative arts and design','Energy and utilities','Engineering and manufacturing','Environment and agriculture','Healthcare','Hospitality and events management','Information technology','Law','Law enforcement and security','Leisure, sport and tourism','Marketing, advertising and PR','Property and construction','Public services and administration','Recruitment and HR','Retail','Sales','Science and pharmaceuticals','Teaching and education','Transport and logistics', 'Other') not null,
 company_description varchar(2048),
 address             varchar(256),
 city                varchar(256),
 country             varchar(256)
);

create table JOB (
 job_id                 int auto_increment primary key not null,
 job_title              varchar(256) not null,
 job_description        varchar(2048),
 employment_type        enum('Part-time', 'Full-time'),
 job_level              enum('Internship / OJT','Fresh Grad / Entry Level','Associate / Supervisor','Mid-Senior Level / Manager', 'Director / Executive'),
 salary                 int,
 application_deadline   date,
 industry               enum('Accountancy, banking and finance','Business, consulting and management','Creative arts and design','Energy and utilities','Engineering and manufacturing','Environment and agriculture','Healthcare','Hospitality and events management','Information technology','Law','Law enforcement and security','Leisure, sport and tourism','Marketing, advertising and PR','Property and construction','Public services and administration','Recruitment and HR','Retail','Sales','Science and pharmaceuticals','Teaching and education','Transport and logistics', 'Other') not null,
 address                varchar(256),
 city                   varchar(256),
 country                varchar(256),
 account_id             int not null,
 Constraint            `fk_job_employer`
  foreign key (account_id) REFERENCES EMPLOYER (account_id)
  on delete cascade
  on update restrict
);

create table EDUCATION (
 education_id       int auto_increment primary key not null,
 description        varchar(2048),
 school_name        varchar(256) not null,
 finished           date,
 start              date,
 attainment         enum('Bachelor\'s Degree', 'High School', 'Vocational Course', 'Associate\'s Degree', 'Master\'s Degree', 'Doctorate'),
 account_id         int not null,
 Constraint         `fk_education_job_seeker`
  foreign key (account_id) references JOB_SEEKER (account_id)
  on delete cascade
  on update restrict
);

create table REQUIREMENT (
 requirement_id            int auto_increment primary key not null,
 educational_attainment    varchar(256) not null,
 job_id                    int not null,
 Constraint               `fk_requirement_job`
  foreign key (job_id) references JOB (job_id)
  on delete cascade
  on update restrict
);

create table REQUIREMENT_SKILL (
 requirement_id        int not null,
 skill_name            varchar(128) not null,
 PRIMARY KEY           (requirement_id, skill_name)
);

create table WORK_EXPERIENCE (
 work_id          int auto_increment primary key not null,
 job_title        varchar(256) not null,
 employer         varchar(256) not null,
 start            date,
 finished         date,
 description      varchar(2048),
 account_id       int not null,
 Constraint       `fk_workexperience_job_seeker`
  foreign key (account_id) REFERENCES JOB_SEEKER (account_id)
  on delete cascade
  on update restrict
);

create table APPLIES (
 account_id        int not null,
 job_id            int not null,
 date_applied      date not null,
 PRIMARY KEY       (account_id, job_id, date_applied)
);

create table POSTS (
 account_id        int not null,
 job_id            int not null,
 date_posted       date not null,
 PRIMARY KEY       (account_id, job_id, date_posted)
);
