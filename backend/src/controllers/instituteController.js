const Institute = require("../models/Institute");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Institute Registration
const registerInstitute = async (req, res) => {
  try {
    const { name, email, password, website, walletAddress } = req.body;

    const existing = await Institute.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Institute already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const institute = await Institute.create({
      name,
      email,
      passwordHash,
      website,
      walletAddress,
      status: "PENDING"
    });

    res.status(201).json({
      message: "Institute registered successfully. Waiting for admin approval.",
      instituteId: institute._id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Institute Login
const loginInstitute = async (req, res) => {
  try {
    const { email, password } = req.body;

    const institute = await Institute.findOne({ email });
    if (!institute) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, institute.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (institute.status !== "APPROVED") {
      return res.status(403).json({
        message: "Institute not approved by admin yet"
      });
    }

    const token = jwt.sign(
      {
        id: institute._id,
        role: "INSTITUTE",
        walletAddress: institute.walletAddress
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerInstitute,
  loginInstitute
};
