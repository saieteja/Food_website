// routes.js
const express = require('express');
const router = express.Router();
const auth = require('./authMiddleware'); // Import the auth middleware

// Example of a protected route
router.get('/protected-route', auth, (req, res) => {
  res.send('This is a protected route. You are authenticated!');
});

// You can add more routes here
router.get('/another-route', (req, res) => {
  res.send('This is another route!');
});

module.exports = router; // Export the router
