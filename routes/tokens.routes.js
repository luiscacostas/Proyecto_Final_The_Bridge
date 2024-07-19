const express = require('express');
const router = express.Router();
const { getAllTokens, getTokenById, createToken, updateTokenById, deleteTokenById, captureToken } = require('../controllers/tokens.controllers');
const { verifyToken, isAdmin } = require('../config/jwt');

router.get('/', verifyToken, isAdmin, getAllTokens);
router.get('/:id', verifyToken, isAdmin, getTokenById);
router.post('/', verifyToken, isAdmin, createToken);
router.put('/:id', verifyToken, isAdmin, updateTokenById);
router.delete('/:id', verifyToken, isAdmin, deleteTokenById);
router.post('/capture', verifyToken, captureToken);

module.exports = router;