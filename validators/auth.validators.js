const { check } = require('express-validator');

const validateRegister = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty()
];

const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty()
];

module.exports = {
  validateRegister,
  validateLogin,
};