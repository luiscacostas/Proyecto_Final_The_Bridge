/**
 * @author Luis Carlos <futurefest.com>
 * @exports services
 * @memberof MongoDBFunctions 
 */

const userService = require('../services/users.services');

/**
 * Descripción: Este controlador crea un nuevo usuario.
 * @memberof MongoDBFunctions 
 * @method createUser 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al crear el usuario.
 */
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador obtiene todos los usuarios.
 * @memberof MongoDBFunctions 
 * @method getAllUsers 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al obtener los usuarios.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador obtiene un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @method getUserById 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al obtener el usuario.
 */
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador actualiza un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @method updateUserById 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al actualizar el usuario.
 */
const updateUserById = async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador elimina un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @method deleteUserById 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al eliminar el usuario.
 */
const deleteUserById = async (req, res) => {
  try {
    const user = await userService.deleteUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Descripción: Este controlador obtiene los tokens de un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @method getUserTokens 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al obtener los tokens del usuario.
 */
const getUserTokens = async (req, res) => {
  try {
    const tokens = await userService.getUserTokens(req.params.id);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
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