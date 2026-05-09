// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// connect to Database
connectDB();

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON payloads

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Basic test route
app.get('/', (req, res) => {
    res.send('Bloggify API is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});