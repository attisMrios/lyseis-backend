CREATE TABLE products (
	"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"code" varchar(20) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"price" numeric(19,2) NOT NULL,
	"tax" numeric(19,2) NOT NULL,
	"picture_path" varchar(1000) NULL
);

CREATE TABLE third_party (
	"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"identification" float8 NOT NULL,
	"name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"address" varchar NULL,
	"e_mail" varchar NULL,
	"phone" varchar NULL,
	"picture_path" varchar NULL
);

CREATE TABLE documents(
	"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"code" varchar(3) NOT NULL,
	"document_nature" varchar(10),
	"affect_inventory" bool NOT NULL,
	"allow_modify_price" bool NOT NULL default false,
	"allow_modify_cost" bool NOT NULL default false,
	"allow_modify_task" bool NOT NULL default false
);

CREATE TABLE documents_prefix (
	"id" INT NOT NULL GENERATED ALWAYS AS IDENTITY,
	"code" varchar NOT NULL,
	"document_type" INT NOT NULL,
	"name" varchar NOT NULL,
	"consecutive" float8 NOT NULL DEFAULT 0,
	CONSTRAINT documents_prefix_pkey PRIMARY KEY (id)
);
CREATE INDEX documents_prefix_document_type_idx ON documents_prefix (document_type);