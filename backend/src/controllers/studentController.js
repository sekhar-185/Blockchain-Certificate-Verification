const Student = require("../models/Student");
const Institute = require("../models/Institute");
const bcrypt = require("bcryptjs");

/**
 * CREATE STUDENT
 * Only APPROVED institute can create students
 */
const createStudent = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const {
      name,
      email,
      password,
      studentId,       // Roll number
      program,         // B.Tech
      department,      // CSE
      admissionYear    // 2022
    } = req.body;

    // 🔴 Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !studentId ||
      !program ||
      !department ||
      !admissionYear
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ✅ Check institute
    const institute = await Institute.findById(instituteId);
    if (!institute || institute.status !== "APPROVED") {
      return res.status(403).json({
        message: "Institute not approved"
      });
    }

    // 🔐 Check duplicate roll number per institute
    const existingStudent = await Student.findOne({
      studentId,
      instituteId
    });

    if (existingStudent) {
      return res.status(409).json({
        message: "Student with this roll number already exists"
      });
    }

    // 🔒 Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 🧑‍🎓 Create student
    const student = await Student.create({
      name,
      email,
      passwordHash,
      studentId,
      program,
      department,
      admissionYear,
      instituteId
    });

    // ✅ Success response
    res.json({
      message: "Student created successfully",
      student: {
        id: student._id,
        name: student.name,
        rollNumber: student.studentId,
        email: student.email,
        program: student.program,
        department: student.department,
        admissionYear: student.admissionYear
      }
    });

  } catch (error) {
    console.error("Create Student Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * LIST STUDENTS (Institute Dashboard)
 */
const listStudents = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const students = await Student.find({ instituteId })
      .select(
        "name email studentId program department admissionYear createdAt"
      )
      .sort({ createdAt: -1 });

    res.json({ students });

  } catch (error) {
    console.error("List Students Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  listStudents
};
