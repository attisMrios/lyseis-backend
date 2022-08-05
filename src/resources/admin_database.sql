
CREATE TABLE IF NOT EXISTS users(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_name" varchar(50) UNIQUE NOT NULL,
    "password" varchar(400) NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "last_login" TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS companies(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "tax_information_number" INT UNIQUE NOT NULL,
    "digit" varchar(2) NOT NULL,
    "company_name" varchar(250) NOT NULL,
    "address" varchar(100),
    "phone_number" varchar(15),
    "mobile_number" varchar(15),
    "email" varchar(200),
    "web_site" varchar(200),
    "logo_url" varchar(200),
    "city_name" varchar(50),
    "created_at" TIMESTAMP NOT NULL
);

CREATE TABLE menu (
	"id" INT  PRIMARY KEY,
    "parent_id" INT NOT NULL,
    "order" INT NOT NULL,
	"title" varchar(20) NOT NULL,
	"url" varchar(1000) NOT NULL,
	"icon" varchar(50) NOT NULL
);


-- menu inserts --
INSERT INTO admin_lyseis.menu (id, parent_id,"order",title,url,icon)
	VALUES (1,0,1,'Home','/home','home');

INSERT INTO admin_lyseis.menu (id, parent_id,"order",title,url,icon)
	VALUES (2,0,2,'Documents','/documents','bag-handle');

INSERT INTO admin_lyseis.menu (id, parent_id,"order",title,url,icon)
	VALUES (3,0,3,'Inventories','/inventories','cube');

INSERT INTO admin_lyseis.menu (id, parent_id,"order",title,url,icon)
	VALUES (4,3,3,'Products','/products','cube');
