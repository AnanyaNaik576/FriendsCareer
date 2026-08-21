const mongoose = require('mongoose');

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB. Check MONGODB_URI and Atlas network access.', error.message);
    process.exit(1);
  }
}

module.exports = connectDatabase;
