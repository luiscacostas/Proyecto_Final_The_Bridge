const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokens.controllers');

router.post('/', tokenController.createToken);
router.get('/', tokenController.getAllTokens);
router.get('/:id', tokenController.getTokenById);
router.put('/:id', tokenController.updateTokenById);
router.delete('/:id', tokenController.deleteTokenById);

module.exports = router;