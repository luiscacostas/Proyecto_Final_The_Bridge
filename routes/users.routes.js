/**
 * @fileoverview Rutas para la gestión de usuarios.
 * @author Luis Carlos
 * @exports router
 * @memberof MongoDBFunctions 
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');

/**
 * Ruta para crear un nuevo usuario.
 * @memberof MongoDBFunctions 
 * @name post/
 * @function
 * @param {function} userController.createUser - Controlador para crear un nuevo usuario.
 */
router.post('/', userController.createUser);

/**
 * Ruta para obtener todos los usuarios.
 * @memberof MongoDBFunctions 
 * @name get/
 * @function
 * @param {function} userController.getAllUsers - Controlador para obtener todos los usuarios.
 */
router.get('/', userController.getAllUsers);

/**
 * Ruta para obtener un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @name get/:id
 * @function
 * @param {function} userController.getUserById - Controlador para obtener un usuario por su ID.
 */
router.get('/:id', userController.getUserById);

/**
 * Ruta para actualizar un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @name put/:id
 * @function
 * @param {function} userController.updateUserById - Controlador para actualizar un usuario por su ID.
 */
router.put('/:id', userController.updateUserById);

/**
 * Ruta para eliminar un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @name delete/:id
 * @function
 * @param {function} userController.deleteUserById - Controlador para eliminar un usuario por su ID.
 */
router.delete('/:id', userController.deleteUserById);

/**
 * Ruta para obtener los tokens de un usuario por su ID.
 * @memberof MongoDBFunctions 
 * @name get/:id/tokens
 * @function
 * @param {function} userController.getUserTokens - Controlador para obtener los tokens de un usuario por su ID.
 */
router.get('/:id/tokens', userController.getUserTokens);

module.exports = router;