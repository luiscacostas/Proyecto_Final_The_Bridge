/**
 * @fileoverview Rutas para la gestión de tokens.
 * @author Luis Carlos
 * @exports router
 * @memberof MongoDBFunctions 
 */

const express = require('express');
const router = express.Router(); 
const tokenController = require('../controllers/tokens.controllers');
const { verifyToken } = require('../config/jwt');

/**
 * Ruta para obtener todos los tokens.
 * @memberof MongoDBFunctions 
 * @name get/
 * @function
 * @param {function} tokenController.getAllTokens - Controlador para obtener todos los tokens.
 */
router.get('/', tokenController.getAllTokens);

/**
 * Ruta para obtener los tokens de un usuario autenticado.
 * @memberof MongoDBFunctions 
 * @name get/user-tokens
 * @function
 * @param {function} verifyToken - Middleware para verificar el token del usuario.
 * @param {function} tokenController.getTokensForUser - Controlador para obtener los tokens de un usuario.
 */
router.get('/user-tokens', verifyToken, tokenController.getTokensForUser);

/**
 * Ruta para crear un nuevo token.
 * @memberof MongoDBFunctions 
 * @name post/
 * @function
 * @param {function} tokenController.createToken - Controlador para crear un nuevo token.
 */
router.post('/', tokenController.createToken);

/**
 * Ruta para obtener un token por su ID.
 * @memberof MongoDBFunctions 
 * @name get/:id
 * @function
 * @param {function} verifyToken - Middleware para verificar el token del usuario.
 * @param {function} tokenController.getTokenById - Controlador para obtener un token por su ID.
 */
router.get('/:id', verifyToken, tokenController.getTokenById);

/**
 * Ruta para actualizar un token por su ID.
 * @memberof MongoDBFunctions 
 * @name put/:id
 * @function
 * @param {function} verifyToken - Middleware para verificar el token del usuario.
 * @param {function} tokenController.updateTokenById - Controlador para actualizar un token por su ID.
 */
router.put('/:id', verifyToken, tokenController.updateTokenById);

/**
 * Ruta para eliminar un token por su ID.
 * @memberof MongoDBFunctions 
 * @name delete/:id
 * @function
 * @param {function} verifyToken - Middleware para verificar el token del usuario.
 * @param {function} tokenController.deleteTokenById - Controlador para eliminar un token por su ID.
 */
router.delete('/:id', verifyToken, tokenController.deleteTokenById);

/**
 * Ruta para capturar un token basado en la geolocalización.
 * @memberof MongoDBFunctions 
 * @name post/capture
 * @function
 * @param {function} verifyToken - Middleware para verificar el token del usuario.
 * @param {function} tokenController.captureToken - Controlador para capturar un token.
 */
router.post('/capture', verifyToken, tokenController.captureToken);

module.exports = router;