const express = require("express");
const router = express.Router();
const { studentLogin } = require("../controllers/studentAuthController");

// Student login
router.post("/login", studentLogin);

module.exports = router;
