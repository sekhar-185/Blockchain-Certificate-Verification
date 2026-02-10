const express = require("express");
const router = express.Router();
const { createStudent, listStudents } = require("../controllers/studentController");
const { authenticateInstitute } = require("../middlewares/auth");

// Institute creates student
router.post("/create", authenticateInstitute, createStudent);

// Institute views all students
router.get("/", authenticateInstitute, listStudents);

module.exports = router;
