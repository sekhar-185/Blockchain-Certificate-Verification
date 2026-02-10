const express = require("express");
const router = express.Router();
const {
  registerInstitute,
  loginInstitute
} = require("../controllers/instituteController");

// Register institute
router.post("/register", registerInstitute);

// Login institute
router.post("/login", loginInstitute);

module.exports = router;
