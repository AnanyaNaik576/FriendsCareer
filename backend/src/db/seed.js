require('dotenv').config({ path: '.env' });

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const connectDatabase = require('./connect');
const User = require('../models/User.model');

async function seedDatabase() {
  if (!process.env.SEED_ADMIN_PASSWORD) {
    throw new Error('Missing SEED_ADMIN_PASSWORD. Add a test password to your .env file before seeding.');
  }

  await connectDatabase();

  const existingUser = await User.findOne({ email: 'admin@test.com' });
  if (!existingUser) {
    const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 10);
    await User.create({ email: 'admin@test.com', passwordHash });
    console.log('Created test user: admin@test.com');
  } else {
    console.log('Test user already exists.');
  }

  console.log('No sample friends are created. Add your own friends in the application.');
}

seedDatabase()
  .catch((error) => {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.connection.close());
