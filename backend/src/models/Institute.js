const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  website: String,
  walletAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "SUSPENDED"],
    default: "PENDING"
  }
}, { timestamps: true });

module.exports = mongoose.model("Institute", instituteSchema);
