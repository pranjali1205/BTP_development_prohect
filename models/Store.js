const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  type: {
    type: String,
    enum: ['Feature'],
  },
  properties: {
    stop_id: {
      type: Number,
    },
   stop_name: {
      type: String,
    },
    stop_lat: {
      type: Number,
    },
    stop_lon: {
      type: Number,
    },
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
});


// Geocode and create location.
// StoreSchema.pre('save', async function (next) {
//   const loc = await geocoder.geocode(this.address);
//   this.location = {
//     type: 'Point',
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress,
//   };

//   this.address = undefined;
//   next();
// });

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;








    