const mongoose = require("mongoose");
const NodeGeocoder = require("node-geocoder");

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

const DataSchema = new mongoose.Schema({
  route_id: {
    type: Number,
    required: true,
  },
  source_name: {
    type: String,
    required: true,
  },
  location_name: {
    type: String,
    required: true,
  },
  service_day_name: {
    type: String,
    required: true,
  },
  trip_id: {
    type: Number,
    required: true,
  },
  trip_short_name: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

DataSchema.pre('save', async function(next) {
  const locationName = this.source_name;
  
  // set the location name based on the source name
  this.location_name = locationName;
  
  // geocode the location name to obtain its coordinates
  const result = await geocoder.geocode(locationName);
  if (result.length > 0) {
    const { lat, lng } = result[0].geometry.location;
  
    // set the longitude and latitude fields in the document
    this.longitude = lng;
    this.latitude = lat;
  } else {
    console.log(`Unable to geocode location: ${locationName}`);
  }
  
  next();
});


module.exports = mongoose.model("Trip", DataSchema);
