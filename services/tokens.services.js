/**
 * @fileoverview Funciones de gestión de tokens y servicios relacionados con usuarios y geolocalización.
 * @author Luis Carlos
 * @exports services
 * @memberof MongoDBFunctions 
 */

const Token = require('../models/tokens.models');
const User = require('../models/users.models');
const geolib = require('geolib');

/**
 * Descripción: Crea un nuevo token.
 * @memberof MongoDBFunctions 
 * @method createToken 
 * @async 
 * @param {Object} tokenData - Los datos del token a crear.
 * @returns {Promise<Object>} El token creado.
 * @throws {Error} Si ocurre un error al crear el token.
 */
const createToken = async (tokenData) => {
  try {
    const token = new Token(tokenData);
    await token.save();
    return token;
  } catch (error) {
    throw new Error(`Error creating token: ${error.message}`);
  }
};

/**
 * Descripción: Obtiene todos los tokens.
 * @memberof MongoDBFunctions 
 * @method getAllTokens 
 * @async 
 * @returns {Promise<Array<Object>>} Una lista de todos los tokens.
 * @throws {Error} Si ocurre un error al obtener los tokens.
 */
const getAllTokens = async () => {
  try {
    return await Token.find();
  } catch (error) {
    throw new Error(`Error fetching tokens: ${error.message}`);
  }
};

/**
 * Descripción: Obtiene un token por su ID.
 * @memberof MongoDBFunctions 
 * @method getTokenById 
 * @async 
 * @param {string} tokenId - El ID del token a obtener.
 * @returns {Promise<Object|null>} El token encontrado o null si no se encuentra.
 * @throws {Error} Si ocurre un error al obtener el token.
 */
const getTokenById = async (tokenId) => {
  try {
    return await Token.findById(tokenId);
  } catch (error) {
    throw new Error(`Error fetching token by ID: ${error.message}`);
  }
};

/**
 * Descripción: Actualiza un token por su ID.
 * @memberof MongoDBFunctions 
 * @method updateTokenById 
 * @async 
 * @param {string} tokenId - El ID del token a actualizar.
 * @param {Object} updateData - Los datos de actualización.
 * @returns {Promise<Object|null>} El token actualizado o null si no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el token.
 */
const updateTokenById = async (tokenId, updateData) => {
  try {
    return await Token.findByIdAndUpdate(tokenId, updateData, { new: true });
  } catch (error) {
    throw new Error(`Error updating token: ${error.message}`);
  }
};

/**
 * Descripción: Elimina un token por su ID.
 * @memberof MongoDBFunctions 
 * @method deleteTokenById 
 * @async 
 * @param {string} tokenId - El ID del token a eliminar.
 * @returns {Promise<Object|null>} El token eliminado o null si no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el token.
 */
const deleteTokenById = async (tokenId) => {
  try {
    return await Token.findByIdAndDelete(tokenId);
  } catch (error) {
    throw new Error(`Error deleting token: ${error.message}`);
  }
};

/**
 * Descripción: Captura un token basado en la geolocalización.
 * @memberof MongoDBFunctions 
 * @method captureToken 
 * @async 
 * @param {string} userId - El ID del usuario que captura el token.
 * @param {string} tokenId - El ID del token a capturar.
 * @param {number} latitude - La latitud del usuario.
 * @param {number} longitude - La longitud del usuario.
 * @returns {Promise<Object>} El token capturado.
 * @throws {Error} Si ocurre un error al capturar el token.
 */
const captureToken = async (userId, tokenId, latitude, longitude) => {
  const token = await Token.findById(tokenId);

  if (!token) {
    throw new Error('Token not found');
  }

  const distance = geolib.getDistance(
    { latitude: token.latitude, longitude: token.longitude },
    { latitude, longitude }
  );

  if (distance > 100) {
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

/**
 * Descripción: Obtiene los tokens para un usuario específico.
 * @memberof MongoDBFunctions 
 * @method getTokensForUser 
 * @async 
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Array<Object>>} Una lista de tokens con información de captura.
 * @throws {Error} Si ocurre un error al obtener los tokens del usuario.
 */
const getTokensForUser = async (userId) => {
  try {
    const user = await User.findById(userId).populate('tokens');
    const allTokens = await Token.find();
    const capturedTokenIds = user.tokens.map(token => token._id.toString());

    const tokens = allTokens.map(token => ({
      ...token.toObject(),
      captured: capturedTokenIds.includes(token._id.toString())
    }));

    return tokens;
  } catch (error) {
    console.error('Error in getTokensForUser service:', error);
    throw new Error(`Error fetching tokens for user: ${error.message}`);
  }
};

module.exports = {
  createToken,
  getAllTokens,
  getTokenById,
  updateTokenById,
  deleteTokenById,
  captureToken,
  getTokensForUser
};