const jwt = require('jsonwebtoken');

// Middleware to check token
const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401); // Unauthorized
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

module.exports = auth;
