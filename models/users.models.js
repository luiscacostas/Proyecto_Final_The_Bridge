/**
 * @fileoverview Modelo de usuario para la base de datos MongoDB.
 * @author Luis Carlos
 * @exports User
 * @memberof MongoDBFunctions 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  lastLoggedIn: {
    type: Date,
  },
  tokens: [{
    type: Schema.Types.ObjectId,
    ref: 'Token'
  }]
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;