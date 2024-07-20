const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  path: [
    {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      timestamp: { type: Date, required: true }
    }
  ],
  totalDistance: { type: Number, required: true },
  duration: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Route', routeSchema);