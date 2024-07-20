const Route = require('../models/routes.models');

const saveRoute = async (userId, path, totalDistance, duration) => {
  const route = new Route({ userId, path, totalDistance, duration });
  await route.save();
  return route;
};

const getRoutes = async (userId) => {
  const routes = await Route.find({ userId }).sort({ createdAt: -1 });
  return routes;
};

module.exports = {
  saveRoute,
  getRoutes
};