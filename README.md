# Blog Application API Documentation

This document provides an overview of the APIs available in the Blogging Application.
## Host Url : 
```
https://blog-backend-seven-lovat.vercel.app
```

## Authors

### Create an Author

**Endpoint:** `POST /authors`

Create a new author.

**Request Body:**
```json
{
  "full_name": "Savan",
  "email": "s123@google.com"
}
```

**Response:**
- `201 Created` - Author created successfully
  ```json
  {
    "_id": "author_id",
    "full_name": "Savan",
    "email": "s123@google.com"
  }
  ```

- `409 Conflict` - Author with the same username or email already exists

---

## Blogs

### Create a Blog

**Endpoint:** `POST /blogs`

Create a new blog.

**Request Body:**
```json
{
  "title": "Introduction to Blogging",
  "content": "This is a blog post about the basics of blogging.",
  "author": "author_id"
}
```

**Response:**
- `201 Created` - Blog created successfully
  ```json
  {
    "_id": "blog_id",
    "title": "Introduction to Blogging",
    "content": "This is a blog post about the basics of blogging.",
    "author": {
      "_id": "author_id",
      "full_name": "Savan",
      "email": "s123@google.com"
    }
  }
  ```

---

## Comments

### Create a Comment

**Endpoint:** `POST /comments`

Create a new comment for a blog.

**Request Body:**
```json
{
  "user_info": "Savan",
  "blogId": "blog_id"
}
```

**Response:**
- `201 Created` - Comment created successfully
  ```json
  {
    "_id": "comment_id",
    "user_info": "Savan",
    "blog": "blog_id"
  }
  ```

---

### Get All Blogs

**Endpoint:** `GET /blogs`

Get a list of all blogs.

**Response:**
- `200 OK` - Blogs retrieved successfully
  ```json
  [
    {
      "_id": "blog_id",
      "title": "Introduction to Blogging",
      "content": "This is a blog post about the basics of blogging.",
      "author": {
        "_id": "author_id",
        "full_name": "Savan",
        "email": "s123@google.com"
      },
      "comments": [
        {
          "_id": "comment_id",
          "user_info": "Savan",
          "blog": "blog_id"
        }
      ]
    }
  ]
  ```

---

### Add Co-Authors to a Blog

**Endpoint:** `PUT /blogs/:id/co-authors`

Add co-authors to a blog.

**Request Parameters:**
- `id` - The ID of the blog

**Request Body:**
```json
{
  "co_authors": ["author_id1", "author_id2"]
}
```

**Response:**
- `200 OK` - Co-authors added successfully
  ```json
  {
    "_id": "blog_id",
    "title": "Introduction to Blogging",
    "content": "This is a blog post about the basics of blogging.",
    "author": {
      "_id": "author_id",
      "full_name": "Savan",
      "email": "s123@google.com"
    },
    "co_authors": ["author_id1", "author_id2"]
  }
  ```

---

### Get a Blog by ID

**Endpoint:** `GET /blogs/:id`

Get a blog by its ID.

**Request Parameters:**
- `id` - The ID of the blog

**Response:**
- `200 OK` - Blog retrieved successfully
  ```json
  {
    "_id": "blog_id",
    "title": "Introduction to Blogging",
    "content": "This is a blog post about the basics of blogging.",
    "author": {
      "_id": "author_id",
      "full_name": "Savan",
      "email": "s123@google.com"
    },
    "comments": [
      {
        "_id": "comment_id",
        "user_info": "Savan",
        "blog": "blog_id"
      }
    ],
    "views": 10,
    "likes": 5
  }
  ```

---

### Like a Blog

**Endpoint:** `POST /blogs/:id/like`

Like a blog.

**Request Parameters:**
- `id` - The ID of the blog

**Request Body:**
```json
{
  "userId": "user_id"
}
```

**Response:**
- `200 OK` - Blog liked successfully
  ```json
  {
    "_id": "blog_id",
    "title": "Introduction to Blogging",
    "content": "This is a blog post about the basics of blogging.",
    "author": {
      "_id": "author_id",
      "full_name": "Savan",
      "email": "s123@google.com"
    },
    "comments": [
      {
        "_id": "comment_id",
        "user_info": "Savan",
        "blog": "blog_id"
      }
    ],
    "views": 10,
    "likes": 6
  }
  ```

---

## Error Responses

- `404 Not Found` - The requested resource was not found.
- `409 Conflict` - A conflict occurred, such as author already exists or user has already liked the blog.
- `500 Internal Server Error` - An internal server error occurred.

---
