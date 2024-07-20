const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  path: [{
    latitude: { type: Number },
    longitude: { type: Number },
    timestamp: { type: Date, default: Date.now }
  }],
  totalDistance: { 
    type: Number, 
    required: true 
  },
  duration: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true 
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
