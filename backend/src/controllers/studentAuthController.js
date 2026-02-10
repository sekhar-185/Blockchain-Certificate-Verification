const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * STUDENT LOGIN
 * Login using Roll Number (studentId) + password
 */
const studentLogin = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
      return res.status(400).json({
        message: "studentId (roll number) and password are required"
      });
    }

    // Find student by roll number
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        studentId: student._id,     // internal ObjectId
        role: "STUDENT"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        rollNumber: student.studentId,
        email: student.email
      }
    });

  } catch (error) {
    console.error("Student Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  studentLogin
};
