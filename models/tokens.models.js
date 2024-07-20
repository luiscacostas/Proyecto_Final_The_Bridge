/**
 * @fileoverview Modelo de token para la base de datos MongoDB.
 * @author Luis Carlos
 * @exports Token
 * @memberof MongoDBFunctions 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
}, { timestamps: true });

tokenSchema.index({ name: 1 }, { unique: true });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;