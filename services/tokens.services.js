const Token = require('../models/tokens.models');

const createToken = async (tokenData) => {
  try {
    const token = new Token(tokenData);
    await token.save();
    return token;
  } catch (error) {
    throw new Error(`Error creating token: ${error.message}`);
  }
};

const getAllTokens = async () => {
  try {
    return await Token.find();
  } catch (error) {
    throw new Error(`Error fetching tokens: ${error.message}`);
  }
};

const getTokenById = async (tokenId) => {
  try {
    return await Token.findById(tokenId);
  } catch (error) {
    throw new Error(`Error fetching token by ID: ${error.message}`);
  }
};

const updateTokenById = async (tokenId, updateData) => {
  try {
    return await Token.findByIdAndUpdate(tokenId, updateData, { new: true });
  } catch (error) {
    throw new Error(`Error updating token: ${error.message}`);
  }
};

const deleteTokenById = async (tokenId) => {
  try {
    return await Token.findByIdAndDelete(tokenId);
  } catch (error) {
    throw new Error(`Error deleting token: ${error.message}`);
  }
};

module.exports = {
  createToken,
  getAllTokens,
  getTokenById,
  updateTokenById,
  deleteTokenById
};