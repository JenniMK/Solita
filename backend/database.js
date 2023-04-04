const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const url = process.env.MONGODB_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDatabase;