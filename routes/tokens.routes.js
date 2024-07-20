const express = require('express');
const router = express.Router();
const { getAllTokens, getTokenById, createToken, updateTokenById, deleteTokenById, captureToken , getTokensForUser} = require('../controllers/tokens.controllers');
const { verifyToken, isAdmin } = require('../config/jwt');

router.get('/', getAllTokens);
router.get('/:id', verifyToken, getTokenById);
router.post('/', createToken);
router.put('/:id', verifyToken, updateTokenById);
router.delete('/:id', verifyToken,  deleteTokenById);
router.post('/capture', verifyToken, captureToken);
router.get('/user-tokens', verifyToken, getTokensForUser);

module.exports = router;