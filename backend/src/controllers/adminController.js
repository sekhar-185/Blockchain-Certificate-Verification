const Admin = require("../models/Admin");
const Institute = require("../models/Institute");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, role: "ADMIN" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

// Get all institutes
const getInstitutes = async (req, res) => {
  const institutes = await Institute.find();
  res.json(institutes);
};

// Approve institute
const approveInstitute = async (req, res) => {
  const { id } = req.params;

  const institute = await Institute.findByIdAndUpdate(
    id,
    { status: "APPROVED" },
    { new: true }
  );

  res.json({
    message: "Institute approved",
    institute
  });
};

module.exports = {
  adminLogin,
  getInstitutes,
  approveInstitute
};
