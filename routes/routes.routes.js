/**
 * @fileoverview Rutas para la gestión de rutas de usuarios.
 * @author Luis Carlos
 * @exports router
 * @memberof MongoDBFunctions 
 */

const express = require('express');
const routesController = require('../controllers/routes.controllers');
const { verifyToken } = require('../config/jwt');
const router = express.Router();

/**
 * Ruta para guardar una nueva ruta.
 * @memberof MongoDBFunctions 
 * @name post/
 * @function
 * @param {function} verifyToken - Middleware para verificar el token del usuario.
 * @param {function} routesController.saveRoute - Controlador para guardar una nueva ruta.
 */
router.post('/', verifyToken, routesController.saveRoute);

/**
 * Ruta para obtener todas las rutas de un usuario.
 * @memberof MongoDBFunctions 
 * @name get/
 * @function
 * @param {function} verifyToken - Middleware para verificar el token del usuario.
 * @param {function} routesController.getRoutes - Controlador para obtener todas las rutas de un usuario.
 */
router.get('/', verifyToken, routesController.getRoutes);

module.exports = router;
