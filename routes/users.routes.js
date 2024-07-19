const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);
router.get('/:id/tokens', userController.getUserTokens);

module.exports = router;