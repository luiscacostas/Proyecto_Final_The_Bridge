require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db_mongo');
const User = require('./users.models');
const Token = require('./tokens.models');

async function runTests() {
  try {
    await connectDB();

    // Limpiar la base de datos antes de las pruebas
    await User.deleteMany({});
    await Token.deleteMany({});

    // Crear un nuevo token
    const tokenData = {
      name: 'Santiago Bernabeu',
      description: 'A famous Stadium.',
      latitude: 41.689247,
      longitude: -71.044502
    };

    let newToken;
    try {
      newToken = await Token.create(tokenData);
      console.log('Token created:', newToken);
    } catch (err) {
      console.error('Error creating token:', err.message);
      throw err;
    }

    // Intentar crear el mismo token nuevamente (debería fallar)
    try {
      await Token.create(tokenData);
      throw new Error('Duplicate token creation should have failed');
    } catch (err) {
      if (err.code === 11000) {
        console.log('Duplicate token creation failed as expected');
      } else {
        throw err;
      }
    }

    // Crear un nuevo usuario
    const userData = {
      email: 'userOne@example.com',
      password: 'password123'
    };

    let newUser;
    try {
      newUser = await User.create(userData);
      newUser.tokens.push(newToken._id);
      await newUser.save();
      console.log('User created:', newUser);
    } catch (err) {
      console.error('Error creating user:', err.message);
      throw err;
    }

    // Intentar crear el mismo usuario nuevamente (debería fallar)
    try {
      await User.create(userData);
      throw new Error('Duplicate user creation should have failed');
    } catch (err) {
      if (err.code === 11000) {
        console.log('Duplicate user creation failed as expected');
      } else {
        throw err;
      }
    }

    // Verificar si el usuario tiene el token
    const user = await User.findById(newUser._id).populate('tokens');
    console.log('User with tokens:', user);

    // Verificaciones adicionales
    const tokenCount = await Token.countDocuments();
    const userCount = await User.countDocuments();

    console.assert(tokenCount === 1, `Expected 1 token, but found ${tokenCount}`);
    console.assert(userCount === 1, `Expected 1 user, but found ${userCount}`);

  } finally {
    await mongoose.connection.close();
  }
}

runTests().catch(err => console.error(err));