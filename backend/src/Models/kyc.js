// src/Models/kyc.js
const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  nid: String,
  imagePath: String,
});

const KYCModel = mongoose.model("KYC", kycSchema);
module.exports = KYCModel;
