const express = require('express');
const router = express.Router();
const { getAllTokens, getTokenById, createToken, updateTokenById, deleteTokenById, captureToken , getTokensForUser} = require('../controllers/tokens.controllers');
const { verifyToken, isAdmin } = require('../config/jwt');

router.get('/', getAllTokens);
router.get('/user-tokens', verifyToken, getTokensForUser);
router.post('/', createToken);
router.get('/:id', verifyToken, getTokenById);
router.put('/:id', verifyToken, updateTokenById);
router.delete('/:id', verifyToken,  deleteTokenById);
router.post('/capture', verifyToken, captureToken);


module.exports = router;