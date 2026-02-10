const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  studentId: { // Roll number like 22XW1A0551
    type: String,
    required: true
  },

  program: {   // B.Tech
    type: String,
    required: true
  },

  department: { // CSE
    type: String,
    required: true
  },

  admissionYear: { // 2022
    type: Number,
    required: true
  },

  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
    required: true
  }

}, { timestamps: true });

// 🔐 Unique roll number per institute
studentSchema.index(
  { studentId: 1, instituteId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Student", studentSchema);
