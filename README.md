# Local Bookstore

## Demo

[https://alchemy-bookstore.herokuapp.com](https://alchemy-bookstore.herokuapp.com)

### Learning Objectives

- Write a SELECT query that returns all rows from a SQL table
- Write a UPDATE query that updates and returns particular rows in a SQL table
- Write a INSERT query that creates and returns a row in a SQL table
- Write a DELETE query that deletes a particular row in a SQL table
- Write a CREATE query to create a SQL table with opinionated data types
- Write a SELECT query that returns a sorted list of rows using ORDER BY
- Write a SELECT query that returns a list of rows using GROUP BY
- Write a SELECT query that returns the AVG of a set of rows for a numeric field
- Create a table that uses field types: INT, BIGINT, BOOLEAN, TEXT, VARCHAR, DATE, TIME, TIMESTAMPZ, JSON
- Create tables that utilize primary keys, foreign keys, and indexes
- Create a table that has constraints using NOT NULL, UNIQUE, CHECK
- Write a JOIN query to return relational data in two SQL tables
- Model data that requires one-to-one, one-to-many, & many-to-many table relationships
- Describe what a junction table is and when it's used
- Write a SELECT query that JOINs two SQL tables via a junction table

### Description

You've been hired by Bilbo's Books, a local bookstore that's in dire need of a better website. You've been assigned the task of building the store's backend, which includes a database & API. The database will contain books, book reviews, reviewers, publishers, and authors.

### Approach

Start by creating a template using `npm init @alchemycodelab/app@latest` and selecting `express sql`.

1. Work vertically. That means build the tests, route and model for one entity/resource at a time. Horizontal would be building all the models first. Do **not** do that â€” go vertical!
2. Start with the entities/resources that don't depend on other resources: `Publisher`, `Author`, and `Reviewer`

### Models (Entities/Resources)

- Publisher
- Author
- Book
- Reviewer
- Review

## Database Schema Overview

> The term "schema" refers to the organization of data as a blueprint of how the database is constructed (divided into database tables in the case of relational databases).
<sub>[Source](https://en.wikipedia.org/wiki/Database_schema)</sub>

A schema is what defines the structure of a database and its tables. For this database, the schema has been defined below, using the following syntax:

- `<...>` is a placeholder for actual data.
- `S` = string, `D` = date, `N` = number, `I` = BIGINT
- Properties marked with `R` are required.
- `id` property omitted for clarity.

### Publisher

```
{
  name: <name-of-publisher RS>,
  city: <city S>
  state: <state S>
  country: <country S>
}
```

### Author (Many-to-Many with Book)

```
{
  name: <name RS>,
  dob: <date-of-birth D>,
  pob: <place-of-birth S>
}
```

### Book (Many-to-Many with Author)

```
{
  title: <title of book RS>,
  publisher: <publisher id RI>,
  released: <4-digit year RN>
}
```

### Reviewer

```
{
  name: <string RS>,
  company: <company or website name RS>
}
```

### Review

```
{
  rating: <rating number 1-5 RN>,
  reviewer: <reviewer id RI>
  review: <review-text, max-length 140 chars RS>,
  book: <book-id RI>
}
```


## Routes

Pick the set of routes that fit with your vertical slice.

#### GET

While the schemas should look like the data definitions above, these are descriptions of the data that should be returned from the various `GET` methods.

##### `GET /publishers`

```
[{ id, name }]
```

##### `GET /publishers/:id`

```
{ id, name, city, state, country, books: [{ id, title }] }
```

##### `GET /books`

```
[{
    id, title, released, publisherId
}]
```

##### `GET /books/:id`

```
{
    title,
    released,
    publisher: { id, name },
    authors: [{ id, name }], // author id and name
    reviews: [{
        id,
        rating,
        review,
        reviewer: { id, name }
    }]
}
```

##### `GET /authors`

```
[{ id, name }]
```

##### `GET /authors/:id`

```
{
    name,
    dob,
    pob,
    books: [{
      id,
      title,
      released
    }]
}
```

##### `GET /reviewers`

```
[{
  id,
  name,
  company
}]
```

##### `GET /reviewers/:id`

```
{
    id,
    name,
    company,
    reviews: [{
        id,
        rating,
        review,
        book_id,
        book_title
    }]
}
```

##### `GET /reviews`

**limit to 100 highest rated**

```
[{
    id,
    rating,
    review,
    book_id,
    book_title
}]
```

#### POST/PUT

- POST: Publishers, Books, Authors, Reviewers, and Reviews can be added.
- PUT: Only Reviewers can be updated.

#### DELETE

Reviews and Reviewers **However**:
- Reviewers cannot be deleted if there are reviews

### Acceptance Criteria

- User can get a list of Publishers
- User can get a list of Books
- User can get a list of Authors
- User can get a list of Reviewers
- User can get a list of Reviews (limited to the top 100 highest rated)
- User can get a single Publisher
- User can get a single Book
- User can get a single Author
- User can get a single Reviewer
- User can add a Publisher, Book, Author, Reviewer, and Review
- User can update a Reviewer
- User can delete a Reviewer **if they don't have any reviews**
- End-to-end (E2E) tests exist for all the supported routes
- API is deployed to Heroku

### Rubric

| Task                 | Points |
| -------------------- | ------ |
| Models               | 5      |
| Relationships        | 5      |
| Routes               | 5      |
| Tests                | 3      |
| Project Organization | 2      |
