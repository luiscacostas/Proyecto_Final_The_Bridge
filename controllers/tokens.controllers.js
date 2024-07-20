/**
 * @author Luis Carlos
 * @exports services
 * @memberof MongoDBFunctions 
 */

const tokenService = require('../services/tokens.services');

/**
 * Descripción: Este controlador crea un nuevo token.
 * @memberof MongoDBFunctions 
 * @method createToken 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al crear el token.
 */
const createToken = async (req, res) => {
  try {
    const token = await tokenService.createToken(req.body);
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador obtiene todos los tokens.
 * @memberof MongoDBFunctions 
 * @method getAllTokens 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al obtener los tokens.
 */
const getAllTokens = async (req, res) => {
  try {
    const tokens = await tokenService.getAllTokens();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador obtiene un token por su ID.
 * @memberof MongoDBFunctions 
 * @method getTokenById 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al obtener el token.
 */
const getTokenById = async (req, res) => {
  try {
    const token = await tokenService.getTokenById(req.params.id);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador actualiza un token por su ID.
 * @memberof MongoDBFunctions 
 * @method updateTokenById 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al actualizar el token.
 */
const updateTokenById = async (req, res) => {
  try {
    const token = await tokenService.updateTokenById(req.params.id, req.body);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador elimina un token por su ID.
 * @memberof MongoDBFunctions 
 * @method deleteTokenById 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al eliminar el token.
 */
const deleteTokenById = async (req, res) => {
  try {
    const token = await tokenService.deleteTokenById(req.params.id);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    res.status(200).json({ message: 'Token deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador captura un token basado en la geolocalización.
 * @memberof MongoDBFunctions 
 * @method captureToken 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al capturar el token.
 */
const captureToken = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { tokenId, latitude, longitude } = req.body;

    const token = await tokenService.captureToken(userId, tokenId, latitude, longitude);

    res.status(200).json({ message: 'Token captured successfully', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Descripción: Este controlador obtiene los tokens para un usuario específico.
 * @memberof MongoDBFunctions 
 * @method getTokensForUser 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al obtener los tokens del usuario.
 */
const getTokensForUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tokens = await tokenService.getTokensForUser(userId);
    res.json(tokens);
  } catch (error) {
    console.error('Error in getTokensForUser:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
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