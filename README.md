# MERN Stack Sample Application

## Project Structure
- `backend/`: Express.js server and API routes
- `frontend/`: React.js application

## Prerequisites
- Node.js (v14 or later)
- MongoDB

## Setup Instructions
1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
4. Create `.env` file in backend with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern_sample_db
   JWT_SECRET=your_secret_key
   ```

## Running the Application
- Backend (development): 
  ```
  cd backend
  npm run dev
  ```
- Frontend (development):
  ```
  cd frontend
  npm start
  ```

## Authentication
The application uses JSON Web Tokens (JWT) for authentication:
- `/api/auth/register`: Register a new user
- `/api/auth/login`: Authenticate and receive a token

### Authentication Endpoints
- **Register**: `POST /api/auth/register`
  - Request Body: `{ username, email, password }`
  - Returns: `{ token, user }`

- **Login**: `POST /api/auth/login`
  - Request Body: `{ email, password }`
  - Returns: `{ token, user }`

### Protected Routes
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

### JWT Configuration
- Token Expiration: 1 hour
- Secret stored in `.env` file

## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.
