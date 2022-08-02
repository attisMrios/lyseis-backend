CREATE TABLE products (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	code varchar NOT NULL,
	description varchar NOT NULL,
	price float8 NOT NULL,
	tax float8 NOT NULL,
	picture_path varchar NULL
);

CREATE TABLE third_party (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name varchar NOT NULL,
	last_name varchar NOT NULL,
	address varchar NULL,
	e_mail varchar NULL,
	phone varchar NULL,
	picture_path varchar NULL
)