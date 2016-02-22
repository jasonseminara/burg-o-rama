create table burgers(
  burger_id serial PRIMARY KEY UNIQUE,
  burger_name varchar(50) NOT NULL,
  meat_type varchar(50) NOT NULL,
  meat_temp varchar(20) NOT NULL,
  cheese_type varchar(20),
  extras varchar(100),
  insertion_date timestamp NOT NULL default NOW()
);