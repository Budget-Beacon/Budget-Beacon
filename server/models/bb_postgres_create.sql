SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- command to connect to db and run script that creates tables
-- psql -d <elephant-url> -f server/models/bb_postgres_create.sql


CREATE TABLE public.users (
  "_id" serial NOT NULL,
  "username" varchar NOT NULL UNIQUE,
  "password" varchar NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.budgets (
  "_id" serial NOT NULL,
  "user_id" bigint NOT NULL,
  "income" int NOT NULL,
  CONSTRAINT "budgets_pk" PRIMARY KEY ("_id"),
  "budget_amount" int NOT NULL
);

CREATE TABLE public.expenses (
  "_id" serial NOT NULL,
  "budget_id" serial NOT NULL,
  "expense_amount" bigint NOT NULL,
  CONSTRAINT "expenses_pk" PRIMARY KEY ("_id")
);

ALTER TABLE public.budgets ADD CONSTRAINT "budgets_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.expenses ADD CONSTRAINT "expenses_fk0" FOREIGN KEY ("budget_id") REFERENCES public.budgets("_id");
ALTER TABLE public.expenses ADD CONSTRAINT "expenses_unique" UNIQUE ("_id","budget_id");