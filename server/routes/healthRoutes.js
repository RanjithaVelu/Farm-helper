const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Check server health and MongoDB connection status
 * @access  Public
 */
router.get('/', (req, res) => {
  // Check Mongoose connection state: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const dbState = mongoose.connection.readyState;
  let dbStatus = 'disconnected';

  if (dbState === 1) {
    dbStatus = 'connected';
  } else if (dbState === 2) {
    dbStatus = 'connecting';
  }

  res.status(200).json({
    status: 'ok',
    message: 'FarmHelper backend server is running successfully',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      isConfigured: Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim() !== ''),
    },
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
