const mongoose = require('mongoose');
const User = require('../models/users.models');
const connectDB = require('../config/db_mongo');

const users = [
  { email: 'user1@example.com', password: 'password123', role: 'user', isActive: true },
  { email: 'user2@example.com', password: 'password123', role: 'user', isActive: true },
  { email: 'user3@example.com', password: 'password123', role: 'user', isActive: true },
  { email: 'user4@example.com', password: 'password123', role: 'user', isActive: true },
  { email: 'user5@example.com', password: 'password123', role: 'user', isActive: true },
  { email: 'user6@example.com', password: 'password123', role: 'user', isActive: true },
  { email: 'user7@example.com', password: 'password123', role: 'user', isActive: true },
  { email: 'user8@example.com', password: 'password123', role: 'user', isActive: true },
  { email: 'user9@example.com', password: 'password123', role: 'user', isActive: true },
  { email: 'user10@example.com', password: 'password123', role: 'user', isActive: true },
];

async function seedUsers() {
  try {
    await connectDB();
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Users seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.disconnect();
  }
}

seedUsers();
