const Token = require('../models/tokens.models');
const User = require('../models/users.models')
const geolib = require('geolib');

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

const captureToken = async (userId, tokenId, latitude, longitude) => {
  const token = await Token.findById(tokenId);

  if (!token) {
    throw new Error('Token not found');
  }

  const distance = geolib.getDistance(
    { latitude: token.latitude, longitude: token.longitude },
    { latitude, longitude }
  );

  if (distance > 100) { // Suponiendo 100 metros como distancia máxima para capturar un token
    throw new Error('Too far from the token');
  }

  const user = await User.findById(userId);

  if (user.tokens.includes(tokenId)) {
    throw new Error('Token already captured');
  }

  user.tokens.push(tokenId);
  await user.save();

  return token;
};


module.exports = {
  createToken,
  getAllTokens,
  getTokenById,
  updateTokenById,
  deleteTokenById,
  captureToken
};