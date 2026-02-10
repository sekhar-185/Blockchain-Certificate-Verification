const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certId: {
    type: String,
    unique: true,
    required: true
  },

  certificateCategory: {
    type: String,
    enum: ["DEGREE", "MARKSHEET", "PROVISIONAL", "BONAFIDE", "COURSE"],
    required: true
  },

  type: {
    type: String,
    enum: ["DIGITAL", "PHYSICAL"],
    required: true
  },

  title: {
    type: String
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
    required: true
  },

  sha256Hash: {
    type: String,
    required: true
  },

  ipfsCID: String,
  ipfsURL: String,

  blockchainTx: String,

  status: {
    type: String,
    enum: ["ACTIVE", "REVOKED"],
    default: "ACTIVE"
  },

  issuedAt: {
    type: Date,
    required: true
  },
  verifyURL: {
  type: String,
  required: true
},
qrCode: {
  type: String, // base64 image
  required: true
},


  revokedAt: Date

}, { timestamps: true });

module.exports = mongoose.model("Certificate", certificateSchema);
