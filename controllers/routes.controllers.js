/**
 * @fileoverview Controladores para la gestión de rutas.
 * @author Luis Carlos
 * @exports services
 * @memberof MongoDBFunctions 
 */

const routeService = require('../services/routes.services');

/**
 * Descripción: Este controlador guarda una nueva ruta para un usuario.
 * @memberof MongoDBFunctions 
 * @method saveRoute 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al guardar la ruta.
 */
const saveRoute = async (req, res) => {
  try {
    const { path, totalDistance, duration } = req.body;
    const userId = req.user.userId;
    const route = await routeService.saveRoute(userId, path, totalDistance, duration);
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Descripción: Este controlador obtiene todas las rutas de un usuario.
 * @memberof MongoDBFunctions 
 * @method getRoutes 
 * @async 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @return {Promise<void>}
 * @throws {Error} Error al obtener las rutas.
 */
const getRoutes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const routes = await routeService.getRoutes(userId);
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  saveRoute,
  getRoutes
};