

# Bloggify ✍️

A modern, full-stack blogging platform built with the MERN stack (MongoDB, Express, React, Node.js). Bloggify allows users to create accounts, write articles, and manage their content securely.

## ✨ Features

* **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
* **CRUD Operations:** Users can Create, Read, Update, and Delete their own blog posts.
* **Protected Routes:** Route guarding ensures that only authenticated users can access the editor and write articles.
* **Context API State Management:** Seamless global state management for user sessions.
* **Responsive UI:** Clean, modern, and mobile-friendly interface styled with Tailwind CSS.
* **Secure API Requests:** Axios interceptors automatically attach JWT tokens to secure backend requests.

## 🛠️ Tech Stack

**Frontend:**
* React (Vite / Create React App)
* React Router DOM (Navigation)
* Context API (Global State)
* Tailwind CSS (Styling)
* Axios (HTTP Client)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database)
* JSON Web Tokens (JWT) (Authentication)
* bcryptjs (Password Hashing)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/bloggify.git
cd bloggify
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and start the server.

```bash
cd backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

**Start Backend Server:**
```bash
npm run dev
```
*(Runs on http://localhost:3000)*

### 3. Frontend Setup
Open a new terminal window/tab, navigate to the frontend directory, install dependencies, and start the React app.

```bash
cd frontend
npm install
npm run dev
```
*(Runs on http://localhost:5173 or 3000 depending on Vite/CRA)*

---

## 📂 Project Structure

```text
bloggify/
├── backend/
│   ├── models/            # Mongoose schemas (User, Post)
│   ├── routes/            # API endpoints (users, posts)
│   ├── middleware/        # JWT auth verification
│   ├── server.js          # Express server entry point
│   └── .env               # Backend environment variables
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI (Navbar, ProtectedRoute)
    │   ├── context/       # AuthContext for global state
    │   ├── pages/         # View components (Home, Login, CreatePost, etc.)
    │   ├── services/      # Axios API configuration
    │   ├── App.jsx        # Routing configuration
    │   └── main.jsx       # React DOM render entry
    └── package.json
```

## 🔗 API Endpoints

### Authentication (`/api/users`)
* `POST /register` - Register a new user
* `POST /login` - Authenticate user & get token
* `GET /me` - Verify token and get current user data (Protected)

### Blog Posts (`/api/posts`)
* `GET /` - Get all posts
* `GET /:id` - Get a single post by ID
* `POST /` - Create a new post (Protected)
* `PUT /:id` - Update an existing post (Protected, Author only)
* `DELETE /:id` - Delete a post (Protected, Author only)

---

