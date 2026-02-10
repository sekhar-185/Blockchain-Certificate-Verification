const express = require("express");
const router = express.Router();
const { instituteLogin } = require("../controllers/instituteAuthController");

// Institute login
router.post("/login", instituteLogin);

module.exports = router;
