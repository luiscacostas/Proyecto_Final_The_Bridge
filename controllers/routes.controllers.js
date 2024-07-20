const { saveRoute, getRoutesForUser } = require('../services/routes.services');

const saveRouteController = async (req, res) => {
  try {
    const { path, totalDistance, duration } = req.body;
    const userId = req.user.userId;
    const route = await saveRoute(userId, path, totalDistance, duration);
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getRoutesForUserController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const routes = await getRoutesForUser(userId);
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  saveRouteController,
  getRoutesForUserController
};


