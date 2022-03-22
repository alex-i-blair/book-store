-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS publisher, author, book, reviewer, review

CREATE TABLE publisher (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  country TEXT,
);

CREATE TABLE author (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  dob DATE,
  pob TEXT,
);

CREATE TABLE book (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  publisher BIGINT NOT NULL,
  released INT NOT NULL,
);

CREATE TABLE reviewer (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
);

CREATE TABLE review (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rating INT NOT NULL,
  reviewer BIGINT NOT NULL,
  review TEXT NOT NULL,
  book BIGINT NOT NULL,
);