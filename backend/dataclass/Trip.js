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


module.exports = mongoose.model("Trip", DataSchema);
