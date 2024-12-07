# Uber Clone MERN Stack

## Project Overview
Uber Clone is a full-stack application that mimics the functionality of the Uber ride-sharing platform. It allows users to register, log in, and manage their profiles while providing real-time tracking and booking features. The project aims to demonstrate the capabilities of the MERN stack (MongoDB, Express.js, React, Node.js) in building scalable web applications.

## Key Features
- User registration and authentication
- Real-time tracking of rides
- User profile management
- Secure password storage and authentication using JWT
- RESTful API for seamless interaction between client and server
- Token-based authentication with JWT for enhanced security
- Blacklist management for revoked tokens
- Input validation for user registration and login

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

### Authentication Routes

#### /api/auth/register
- **Endpoint Description**: Allows new users to register for the application. It validates the input data and creates a new user in the database.
- **HTTP Method**: `POST`
- **Request Structure**:
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

- **Response Structure**:
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

- **Status Codes**:
  - **201 Created**: User successfully registered.
  - **400 Bad Request**: Validation errors occurred.
  - **500 Internal Server Error**: An unexpected error occurred on the server.

#### /api/auth/login
- **Endpoint Description**: Allows existing users to log in to the application. It validates the input data and returns an authentication token if the credentials are valid.
- **HTTP Method**: `POST`
- **Request Structure**:
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

- **Response Structure**:
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

- **Status Codes**:
  - **200 OK**: User successfully logged in.
  - **400 Bad Request**: Validation errors occurred.
  - **401 Unauthorized**: Invalid credentials provided.
  - **500 Internal Server Error**: An unexpected error occurred on the server.

#### /api/auth/logout
- **Endpoint Description**: Allows users to log out of the application. It clears the authentication cookie to log out the user.
- **HTTP Method**: `POST`
- **Request Structure**: No body required.
- **Response Structure**:
  - **Success Response** (HTTP 200):
    ```json
    {
      "success": true,
      "message": "Logged out successfully"
    }
    ```

- **Status Codes**:
  - **200 OK**: User successfully logged out.
  - **500 Internal Server Error**: An unexpected error occurred on the server.

### User Profile Route

#### /api/user/profile
- **Endpoint Description**: Retrieves the authenticated user's profile information. This endpoint requires the user to be logged in and provides access to their personal details.
- **HTTP Method**: `GET`
- **Request Structure**: No body required. The request must include the authentication token in the headers.
- **Headers**:
  - `Authorization`: Bearer token (JWT) for authentication.

- **Response Structure**:
  - **Success Response** (HTTP 200):
    ```json
    {
      "success": true,
      "user": {
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

  - **Failure Response** (HTTP 401):
    ```json
    {
      "success": false,
      "message": "User not authenticated"
    }
    ```

  - **Failure Response** (HTTP 404):
    ```json
    {
      "success": false,
      "message": "User not found"
    }
    ```

- **Status Codes**:
  - **200 OK**: User profile retrieved successfully.
  - **401 Unauthorized**: User is not authenticated.
  - **404 Not Found**: User does not exist in the database.
  - **500 Internal Server Error**: An unexpected error occurred on the server.

### Token Storage and Cookie Management
- The application uses cookies to store the JWT token securely. The token is set as an HTTP-only cookie to prevent client-side access, enhancing security against XSS attacks.
- **Cookie Configuration**:
  - `httpOnly`: Prevents JavaScript access to the cookie.
  - `secure`: Ensures the cookie is sent only over HTTPS in production.
  - `sameSite`: Restricts how cookies are sent with cross-site requests.
  - `maxAge`: Sets the expiration time for the cookie.

### Security Considerations
- Ensure that sensitive information, such as JWT secrets and database connection strings, are stored securely in environment variables and not hard-coded in the application.
- Regularly update dependencies to mitigate vulnerabilities.
- Implement logging and monitoring to detect and respond to security incidents promptly.

### Troubleshooting and Monitoring
- Monitor server logs for any errors or unusual activity.
- Use tools like Postman or curl to test API endpoints and validate responses.
- Ensure that the MongoDB instance is running and accessible from the application.