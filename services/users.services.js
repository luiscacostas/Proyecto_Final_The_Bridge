/**
 * @fileoverview Funciones de gestión de usuarios.
 * @author Luis Carlos
 * @exports services
 * @memberof MongoDBFunctions 
 */

const User = require('../models/users.models');
const Token = require('../models/tokens.models');

/**
 * Descripción: Crea un nuevo usuario.
 * @memberof MongoDBFunctions 
 * @method createUser 
 * @async 
 * @param {Object} userData - Los datos del usuario a crear.
 * @returns {Promise<Object>} El usuario creado.
 * @throws {Error} Si ocurre un error al crear el usuario.
 */
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

/**
 * Descripción: Obtiene todos los usuarios.
 * @memberof MongoDBFunctions 
 * @method getAllUsers 
 * @async 
 * @returns {Promise<Array<Object>>} Una lista de todos los usuarios.
 * @throws {Error} Si ocurre un error al obtener los usuarios.
 */
const getAllUsers = async () => {
  try {
    return await User.find().populate('tokens');
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

/**
 * Descripción: Obtiene un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @method getUserById 
 * @async 
 * @param {string} userId - El ID del usuario a obtener.
 * @returns {Promise<Object|null>} El usuario encontrado o null si no se encuentra.
 * @throws {Error} Si ocurre un error al obtener el usuario.
 */
const getUserById = async (userId) => {
  try {
    return await User.findById(userId).populate('tokens');
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

/**
 * Descripción: Actualiza un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @method updateUserById 
 * @async 
 * @param {string} userId - El ID del usuario a actualizar.
 * @param {Object} updateData - Los datos de actualización.
 * @returns {Promise<Object|null>} El usuario actualizado o null si no se encuentra.
 * @throws {Error} Si ocurre un error al actualizar el usuario.
 */
const updateUserById = async (userId, updateData) => {
  try {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

/**
 * Descripción: Elimina un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @method deleteUserById 
 * @async 
 * @param {string} userId - El ID del usuario a eliminar.
 * @returns {Promise<Object|null>} El usuario eliminado o null si no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el usuario.
 */
const deleteUserById = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

/**
 * Descripción: Obtiene los tokens de un usuario por su ID y los tokens faltantes.
 * @memberof MongoDBFunctions 
 * @method getUserTokens 
 * @async 
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Object>} Un objeto que contiene los tokens del usuario y los tokens faltantes.
 * @throws {Error} Si ocurre un error al obtener los tokens del usuario.
 */
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