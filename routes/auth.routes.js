/**
 * @fileoverview Rutas de autenticación para el registro y login de usuarios.
 * @author Luis Carlos
 * @exports router
 * @memberof MongoDBFunctions 
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const { validateRegister, validateLogin } = require('../validators/auth.validators');

/**
 * Ruta para registrar un nuevo usuario.
 * @memberof MongoDBFunctions 
 * @name post/register
 * @function
 * @param {middleware} validateRegister - Middleware para validar los datos de registro.
 * @param {function} authController.register - Controlador para registrar un nuevo usuario.
 */
router.post('/register', validateRegister, authController.register);

/**
 * Ruta para el login de un usuario.
 * @memberof MongoDBFunctions 
 * @name post/login
 * @function
 * @param {middleware} validateLogin - Middleware para validar los datos de login.
 * @param {function} authController.login - Controlador para el login de un usuario.
 */
router.post('/login', validateLogin, authController.login);

module.exports = router;