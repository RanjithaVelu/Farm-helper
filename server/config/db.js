const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas using Mongoose.
 * 
 * Beginner-friendly connection handler:
 * - If MONGODB_URI is provided, attempts connection and reports success or failure honestly.
 * - If MONGODB_URI is missing, prints a clear instruction rather than crashing confusingly.
 */
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.trim() === '') {
    console.log('------------------------------------------------------------');
    console.log('⚠️  MongoDB URI is NOT configured yet.');
    console.log('ℹ️  To connect to your database:');
    console.log('   1. Create a ".env" file inside the "server" folder.');
    console.log('   2. Add your MongoDB Atlas connection string:');
    console.log('      MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/farmhelper?retryWrites=true&w=majority');
    console.log('ℹ️  The backend will continue running for health checks and APIs,');
    console.log('   but database features will remain inactive until configured.');
    console.log('------------------------------------------------------------');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('------------------------------------------------------------');
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('ℹ️  Please check:');
    console.error('   1. Your MongoDB Atlas username and password.');
    console.error('   2. Network Access in Atlas (IP whitelist / 0.0.0.0/0 allowed).');
    console.error('   3. Database cluster status.');
    console.error('------------------------------------------------------------');
    return false;
  }
};

module.exports = connectDB;
