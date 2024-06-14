# Assignment: To-Do List Management System

## Objective
Develop a user and to-do list management system using MongoDB, Node.js, and Express.js. The system should allow users to register, log in, and manage their to-do lists. Each to-do list item should be associated with a user.

## Requirements

### 1. User Schema
Create a User schema with the following fields:
- `name`: String
- `email`: String
- `password`: String

### 2. To-Do List Schema
Create a To-Do List schema with the following fields:
- `title`: String
- `status`: Enum { `completed`, `uncompleted` }
- `createdAt`: Date
- `completedAt`: Date (nullable)
- `userId`: Reference to User schema's ID

### API Specifications

#### 1. Registration API
Endpoint: `/api/register`  
Method: `POST`  
Description: Register a new user.

Request Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}

2. Login API
Endpoint: /api/login
Method: POST
Description: Login an existing user.

Request Body:
{
  "email": "string",
  "password": "string"
}
Response:

Success: 200 OK (with user data and authentication token)
Failure: 401 Unauthorized (with error message)

CRUD Operations for To-Do List

3. Create To-Do List
Endpoint: /api/todos
Method: POST
Description: Create a new to-do list item.

Request Body:
{
  "title": "string",
  "status": "uncompleted",
  "createdAt": "date",
  "userId": "string"
}
Response:

Success: 201 Created
Failure: 400 Bad Request (with error message)

4. Update To-Do List
Endpoint: /api/todos/:id
Method: PUT
Description: Update an existing to-do list item by ID.

Request Body:
{
  "title": "string",
  "status": "completed/uncompleted",
  "completedAt": "date",
  "userId": "string"
}
Response:

Success: 200 OK
Failure: 400 Bad Request (with error message)

5. Delete To-Do List
Endpoint: /api/todos/:id
Method: DELETE
Description: Delete an existing to-do list item by ID.

Response:

Success: 200 OK
Failure: 400 Bad Request (with error message)

6. Get To-Do List by User ID and Username/email
Endpoint: /api/users/:userId/todos
Method: GET
Description: Retrieve all to-do list items for a user by user ID and username.

Response:

Success: 200 OK (with list of to-do items and user details)
Failure: 404 Not Found (with error message)