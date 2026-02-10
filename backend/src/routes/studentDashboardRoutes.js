const express = require("express");
const router = express.Router();
const { getMyCertificates } = require("../controllers/studentDashboardController");
const { authenticateStudent } = require("../middlewares/authStudent");

// Student dashboard: My certificates
router.get("/certificates", authenticateStudent, getMyCertificates);

module.exports = router;
