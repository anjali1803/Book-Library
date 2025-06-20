# Book Library API

## POST /books
Create a new book  
Body: { "title": "str", "author": "str", "genre": "str", "published_year": int }

## GET /books
Get all books (optional ?genre=GenreName)

## GET /books/:id
Get details of a book

## PUT /books/:id
Update a book  
Body: same as POST

## DELETE /books/:id
Delete a book

## GET /authors/:authorName/books
Get books by author
