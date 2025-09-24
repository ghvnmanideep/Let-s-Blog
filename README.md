Blog Web Application
Overview
This is a full-stack blog web application that allows users to register, login, create, read, update, and delete blog posts. The frontend is developed using React with Tailwind CSS for styling, and the backend is built with Node.js, Express, and MongoDB for data persistence.

The application includes user authentication with JWT tokens, Google OAuth login integration, and role-based access. It features a responsive UI with pagination on the blog listing page and a secure backend API.

Features
User registration and login with hashed passwords.

Google OAuth authentication.

Session management via JWT tokens stored in localStorage.

Create, read, update, and delete blogs.

Role-based access control for users and admins (optional).

Responsive UI with dark theme and color-coded design.

Pagination on blog listing page.

Secure backend with authentication middleware.

RESTful API endpoints for frontend consumption.

Robust error handling and validation.

Cross-origin resource sharing (CORS) properly configured.

Requirements
Node.js (v14 or higher)

MongoDB instance (local or hosted, e.g., MongoDB Atlas)

Google OAuth Client ID for Google Login

Environment variables support through .env file

Installation and Running the Application
Backend Setup
Clone the repository:

bash
git clone <repo-url>
cd backend
Install dependencies:

bash
npm install
Create a .env file in the backend root with the following variables:

text
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLIENT_ID=<your_google_oauth_client_id>
Start the backend server:

bash
npm start
The backend API runs on http://localhost:5000.

Frontend Setup
Navigate to the frontend directory and install dependencies:

bash
cd ../frontend
npm install
Create a .env file in the frontend root:

text
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=<your_google_oauth_client_id>
Start the frontend development server:

bash
npm run dev
The React frontend runs on http://localhost:5173 (or your configured dev server port).

Usage
Register a new account or login with existing credentials.

Alternatively, use Google login to authenticate.

View all blog posts on the home page with pagination.

Create a new blog post when logged in.

Edit or delete your own blog posts.

Logout anytime to clear your session.

Notes on Cross-Origin Issues
Ensure your backend CORS configuration allows requests from your frontend origin.

Do not set strict Cross-Origin-Opener-Policy or Cross-Origin-Embedder-Policy headers globally unless necessary to avoid issues with OAuth popups and window messaging.

If you are getting Cross-Origin-Opener-Policy errors, check your server and hosting configuration for these headers.

Technology Stack
React, React Router, Tailwind CSS

Node.js, Express.js, MongoDB, Mongoose

JWT, bcryptjs for authentication

Google OAuth for social login

Axios for HTTP requests

License
This project is licensed under the MIT License.
