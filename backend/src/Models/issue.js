const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String },
  ward: { type: Number, required: true },
  isAnonymous: { type: Boolean, default: false },
  images: [{ type: String }], // paths to images
  audio: { type: String }, // path to audio file
  latitude: { type: Number },
  longitude: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Issue", issueSchema);
