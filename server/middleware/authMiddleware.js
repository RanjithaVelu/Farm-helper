const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Express middleware to protect routes that require authentication.
 * 
 * Verifies the Bearer JWT token from the Authorization header:
 * - Rejects requests without a token (401)
 * - Rejects expired or tampered tokens (401)
 * - Attaches safe user profile (without password) to req.user
 */
const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Reject if token is missing
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: Access denied, no token provided',
    });
  }

  // Validate JWT_SECRET is configured
  if (!process.env.JWT_SECRET) {
    console.error('⚠️ Server error: JWT_SECRET environment variable is missing.');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: JWT_SECRET is not configured',
    });
  }

  try {
    // Verify token using environment secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If database is not connected, report honestly
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure MONGODB_URI in server/.env',
      });
    }

    // Retrieve user profile without password hash
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User belonging to this token no longer exists',
      });
    }

    // Attach user object to request and proceed
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Not authorized: Invalid token',
    });
  }
};

module.exports = { protect };
