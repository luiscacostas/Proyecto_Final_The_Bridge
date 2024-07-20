const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  path: [{
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
  }],
  totalDistance: { type: Number, required: true },
  duration: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Route', routeSchema);