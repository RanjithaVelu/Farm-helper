const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper function to generate JWT using environment secret
const generateToken = (userId, email) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured in server environment');
  }
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Email validation regex helper
const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and password.',
      });
    }

    // 2. Validate email format
    const trimmedEmail = email.trim().toLowerCase();
    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // 3. Validate minimum password length (8 characters)
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.',
      });
    }

    // 4. Validate server environment configuration
    if (!process.env.JWT_SECRET) {
      console.error('⚠️ Server error: JWT_SECRET environment variable is missing.');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: JWT_SECRET is not configured.',
      });
    }

    // 5. Check database connection honestly
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure your MONGODB_URI in server/.env to enable account registration.',
      });
    }

    // 6. Check for duplicate account
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please log in instead.',
      });
    }

    // 7. Save user using Mongoose model
    // The User model's pre('save') hook securely hashes the password with bcrypt before writing to MongoDB.
    const user = await User.create({
      name: name.trim(),
      email: trimmedEmail,
      password,
    });

    // 8. Generate JWT
    const token = generateToken(user._id, user.email);

    // 9. Return safe user details (never password or password hash)
    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Registration Error:', error.message);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred during registration.',
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    // 2. Validate server environment configuration
    if (!process.env.JWT_SECRET) {
      console.error('⚠️ Server error: JWT_SECRET environment variable is missing.');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: JWT_SECRET is not configured.',
      });
    }

    // 3. Check database connection honestly
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure your MONGODB_URI in server/.env to enable login.',
      });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // 4. Find user by normalized email
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      // Generic error response for invalid credentials
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // 5. Securely verify password with bcrypt compare helper
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      // Generic error response for invalid credentials
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // 6. Generate JWT
    const token = generateToken(user._id, user.email);

    // 7. Return token and safe user profile (never password hash)
    return res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred during login.',
    });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get currently logged in user profile
 * @access  Private (Protected by JWT)
 */
router.get('/me', protect, async (req, res) => {
  try {
    // req.user was populated securely by protect middleware without password
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error('Profile Retrieval Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile.',
    });
  }
});

module.exports = router;
