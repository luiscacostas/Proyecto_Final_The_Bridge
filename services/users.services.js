const User = require('../models/users.models');
const Token = require('../models/tokens.models');

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getAllUsers = async () => {
  try {
    return await User.find().populate('tokens');
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getUserById = async (userId) => {
  try {
    return await User.findById(userId).populate('tokens');
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

const updateUserById = async (userId, updateData) => {
  try {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

const deleteUserById = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};


const getUserTokens = async (userId) => {
  try {
    const user = await User.findById(userId).populate('tokens');
    if (!user) {
      throw new Error('User not found');
    }
    const allTokens = await Token.find();
    const userTokens = user.tokens.map(token => token._id.toString());
    const missingTokens = allTokens.filter(token => !userTokens.includes(token._id.toString()));
    return { userTokens: user.tokens, missingTokens };
  } catch (error) {
    throw new Error(`Error fetching user tokens: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserTokens
};