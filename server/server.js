require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./auth'); // Authentication routes
const cartRoutes = require('./routes'); // Cart routes

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "your-mongodb-uri-here";

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://foodies-websites.netlify.app'], // Allow both localhost and Netlify
  methods: ['GET', 'POST', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Use Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/cart', cartRoutes); // Cart routes

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
