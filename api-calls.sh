#!/bin/bash

# 1. Create a book
curl -X POST http://localhost:5000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Harry Potter","author":"J.K. Rowling","genre":"Fantasy","published_year":1997}'

echo -e "\n\n"

# 2. Get a book by ID (assuming ID = 1)
curl -X GET http://localhost:5000/books/1

echo -e "\n\n"

# 3. Delete a book by ID (assuming ID = 1)
curl -X DELETE http://localhost:5000/books/1

echo -e "\n\n"
