const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  source: { type: String, required: true },
  message: { type: String, required: true },
  location: {
    address: { type: String }, // User's selected address
    lat: { type: Number }, // Latitude of selected location
    lng: { type: Number }, // Longitude of selected location
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
