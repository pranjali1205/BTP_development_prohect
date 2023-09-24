const mongoose = require("mongoose");
const NodeGeocoder = require("node-geocoder");


const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const FeatureSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Feature"],
    required: true,
  },
  properties: {
    name: String,
    description: String,
  },
  geometry: {
    type: PointSchema,
    required: true,
  },
  id: String,
});

const FeatureCollectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["FeatureCollection"],
    required: true,
  },
  features: {
    type: [FeatureSchema],
    required: true,
  },
});

const TransportationSchema = new mongoose.Schema({
  geojson: FeatureCollectionSchema,
});

module.exports = mongoose.model("Transportation", TransportationSchema);
