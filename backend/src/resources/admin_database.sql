
CREATE TABLE IF NOT EXISTS users(
    usr_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usr_user_name varchar(50) UNIQUE NOT NULL,
    usr_password varchar(400) NOT NULL,
    usr_created_at TIMESTAMP NOT NULL,
    usr_last_login TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS companies(
    cmp_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cmp_tax_information_number INT UNIQUE NOT NULL,
    cmp_digit varchar(2) NOT NULL,
    cmp_company_name varchar(250) NOT NULL,
    cmp_address varchar(100),
    cmp_phone_number varchar(15),
    cmp_mobile_number varchar(15),
    cmp_email varchar(200),
    cmp_web_site varchar(200),
    cmp_logo_url varchar(200),
    cmp_city_name varchar(50),
    created_at TIMESTAMP NOT NULL
    );

