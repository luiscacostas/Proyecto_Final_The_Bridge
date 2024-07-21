const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../config/jwt');

router.get('/admin/dashboard', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;