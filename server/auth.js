const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./User'); // Adjust the path to your User model

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  console.log('Registration request body:', req.body); // Log incoming request body
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error); // Log error for debugging
    res.status(400).json({ error: 'User registration failed.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('Login request body:', req.body); // Log incoming request body
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ message: 'Login successful!' });
  } else {
    console.log('Login failed for:', email); // Log failed login attempt
    res.status(401).json({ error: 'Invalid credentials. Try again.' });
  }
});

module.exports = router;
