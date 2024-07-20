const express = require('express');
const router = express.Router();
const { saveRouteController, getRoutesForUserController } = require('../controllers/routes.controllers');
const { verifyToken } = require('../config/jwt');

router.post('/', verifyToken, saveRouteController);
router.get('/', verifyToken, getRoutesForUserController);

module.exports = router;