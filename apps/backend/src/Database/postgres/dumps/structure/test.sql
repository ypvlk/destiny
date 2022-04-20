-- CREATE TYPE "account_type_enum" AS ENUM
-- ('column1', 'column2');

CREATE TABLE
IF NOT EXISTS "users"
(
    "id" uuid DEFAULT uuid_generate_v4
() NOT NULL,
    "email" character varying
(255) NOT NULL,
    "password" character varying
(255),
    "created_at" timestamp DEFAULT timezone
('UTC', now
()) NOT NULL,
    "updated_at" timestamp DEFAULT timezone
('UTC', now
()) NOT NULL,
    CONSTRAINT "users_id_pk" PRIMARY KEY
("id")
)
WITH
(oids = false);

CREATE TABLE
IF NOT EXISTS "test"
(
    "user_id" uuid NOT NULL,
    "options" character varying
(255) NOT NULL,
    CONSTRAINT "test_user_id_pk" PRIMARY KEY
("user_id")
)
WITH
(oids = false);



ALTER TABLE "test" ADD CONSTRAINT "test_user_id_fk" FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE RESTRICT NOT DEFERRABLE;
