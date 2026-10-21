const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables from server/.env if present
dotenv.config();

// Initialize Express application
const app = express();

// Server Port (reads from environment or defaults to 5000)
const PORT = process.env.PORT || 5000;

// Enable JSON request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow requests from the React Vite frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy: This origin is not allowed'));
      }
    },
    credentials: true,
  })
);

// Mount API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

// Root informational endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'FarmHelper Backend API',
    description: 'Smart Farming Assistant REST API (MERN Stack)',
    healthCheck: '/api/health',
    status: 'online',
  });
});

// 404 Route Handler for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Endpoint ${req.originalUrl} not found on this server.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// Connect to MongoDB Atlas (if MONGODB_URI is provided)
connectDB();

// Start Express server
const server = app.listen(PORT, () => {
  console.log(`🚀 FarmHelper Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Allowed Frontend Origin: http://localhost:5173`);
});

module.exports = { app, server };
