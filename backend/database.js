const mongoose = require('mongoose');
require('dotenv').config();


console.log('Loading database configuration');
console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);

const url = process.env.MONGODB_URI

const connectDatabase = async () => {
  console.log('connecting to', url);

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to MongoDB');
  } catch (error) {
    console.log('error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDatabase;

