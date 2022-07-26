CREATE TABLE products (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	code varchar NOT NULL,
	description varchar NOT NULL,
	price float8 NOT NULL,
	tax float8 NOT NULL,
	picture varchar NULL
);