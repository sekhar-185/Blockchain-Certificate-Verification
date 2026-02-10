const Institute = require("../models/Institute");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const instituteLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const institute = await Institute.findOne({ email });
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    if (institute.status !== "APPROVED") {
      return res.status(403).json({ message: "Institute not approved" });
    }

    const isMatch = await bcrypt.compare(password, institute.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        instituteId: institute._id,
        role: "INSTITUTE"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      institute: {
        id: institute._id,
        name: institute.name,
        email: institute.email,
        walletAddress: institute.walletAddress,
        status: institute.status
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { instituteLogin };
