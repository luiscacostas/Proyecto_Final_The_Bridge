const express = require('express');
const { saveRoute, getRoutes } = require('../controllers/routes.controllers');
const { verifyToken } = require('../config/jwt');
const router = express.Router();

router.post('/', verifyToken, saveRoute);
router.get('/', verifyToken, getRoutes);

module.exports = router;