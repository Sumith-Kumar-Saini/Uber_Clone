# Uber Clone MERN Stack

## Project Overview
Uber Clone is a full-stack application that mimics the functionality of the Uber ride-sharing platform. It allows users to register, log in, and manage their profiles while providing real-time tracking and booking features. The project aims to demonstrate the capabilities of the MERN stack (MongoDB, Express.js, React, Node.js) in building scalable web applications.

### Key Features
- User registration and authentication
- Real-time tracking of rides
- User profile management
- Secure password storage and authentication using JWT
- RESTful API for seamless interaction between client and server

## Technology Stack
- **MongoDB**: NoSQL database for storing user data and ride information.
- **Express.js**: Web framework for Node.js to build the server-side application.
- **React**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for executing server-side code.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcrypt**: For hashing passwords.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.

## Installation Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git (for cloning the repository)

### Steps to Set Up Locally
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sumith-Kumar-Saini/Uber_Clone.git
   cd Uber_Clone
   ```

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies** (if applicable):
   ```bash
   cd client
   npm install
   ```

4. **Set up environment variables**:
   - Create a `.env` file in the `server` directory and add the following:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

5. **Start the server**:
   ```bash
   npm run dev:server
   ```

6. **Start the client** (if applicable):
   ```bash
   cd client
   npm run dev:client
   ```

## Usage Guide
- Access the application in your browser at `http://localhost:5000`.
- Use the registration endpoint to create a new user account.
- After registration, you can log in and manage your profile.

## Contribution Guidelines
We welcome contributions to the Uber Clone project! If you would like to propose changes or contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear messages.
4. Push your changes to your forked repository.
5. Submit a pull request detailing your changes.

## API Documentation

### /api/auth/register

#### Endpoint Description
The `/api/auth/register` endpoint allows new users to register for the application. It validates the input data and creates a new user in the database.

#### HTTP Method
`POST`

#### Request Structure
- **Request Body** (JSON):
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "StrongPassword123"
  }
  ```
- **Field Validations**:
  - `email`: Must be a valid email format.
  - `fullName.firstName`: Minimum length of 3 characters.
  - `fullName.lastName`: Optional, minimum length of 3 characters.
  - `password`: Must be a strong password with a minimum length of 8 characters.

#### Response Structure
- **Success Response** (HTTP 201):
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "jwt_token_here",
    "userInfo": {
      "_id": "user_id_here",
      "email": "john.doe@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

- **Failure Response** (HTTP 400):
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

#### Status Codes
- **201 Created**: User successfully registered.
- **400 Bad Request**: Validation errors occurred.
- **500 Internal Server Error**: An unexpected error occurred on the server.

### /api/auth/login

#### Endpoint Description
The `/api/auth/login` endpoint allows existing users to log in to the application. It validates the input data and returns an authentication token if the credentials are valid.

#### HTTP Method
`POST`

#### Request Structure
- **Request Body** (JSON):
  ```json
  {
    "email": "john.doe@example.com",
    "password": "StrongPassword123"
  }
  ```
- **Field Validations**:
  - `email`: Must be a valid email format.
  - `password`: Minimum length of 8 characters.

#### Response Structure
- **Success Response** (HTTP 200):
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "token": "jwt_token_here"
  }
  ```

- **Failure Response** (HTTP 401):
  ```json
  {
    "success": false,
    "message": "Invalid credentials",
    "error": "Invalid password" // or "User not found" based on the error
  }
  ```

#### Status Codes
- **200 OK**: User successfully logged in.
- **400 Bad Request**: Validation errors occurred.
- **401 Unauthorized**: Invalid credentials provided.
- **500 Internal Server Error**: An unexpected error occurred on the server.