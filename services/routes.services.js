/**
 * @fileoverview Funciones de gestión de rutas para los usuarios.
 * @author Luis Carlos
 * @exports services
 * @memberof MongoDBFunctions 
 */

const Route = require('../models/routes.models');

/**
 * Descripción: Guarda una nueva ruta para un usuario.
 * @memberof MongoDBFunctions 
 * @method saveRoute 
 * @async 
 * @param {string} userId - El ID del usuario.
 * @param {Array<Object>} path - El recorrido de la ruta.
 * @param {number} totalDistance - La distancia total de la ruta.
 * @param {number} duration - La duración de la ruta.
 * @returns {Promise<Object>} La ruta guardada.
 * @throws {Error} Si ocurre un error al guardar la ruta.
 */
const saveRoute = async (userId, path, totalDistance, duration) => {
  const route = new Route({ user: userId, path, totalDistance, duration });
  await route.save();
  return route;
};

/**
 * Descripción: Obtiene todas las rutas de un usuario.
 * @memberof MongoDBFunctions 
 * @method getRoutes 
 * @async 
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Array<Object>>} Una lista de rutas del usuario.
 * @throws {Error} Si ocurre un error al obtener las rutas.
 */
const getRoutes = async (userId) => {
  const routes = await Route.find({ user: userId }).sort({ createdAt: -1 });
  return routes;
};

module.exports = {
  saveRoute,
  getRoutes
};

