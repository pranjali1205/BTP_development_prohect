const mongoose = require('mongoose');

const PathSchema = new mongoose.Schema({
  sourceStore:{ type: [Number],
  index: '2dsphere'},
  destinationStore: { type: [Number],
    index: '2dsphere'},
  geometry: {
    type: { type: String, enum: ['LineString'] },
    coordinates: {
        type: array,
        minItems: 2,
        items: {
            type: array,
            minItems: 2,
            items: {
                type: number
            }
        } }
  },
  distance: { type: Number} 
});

const Path = mongoose.model('Path', PathSchema);

module.exports = Path;
