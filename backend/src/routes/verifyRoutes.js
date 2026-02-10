const express = require("express");
const router = express.Router();
const { verifyCertificate } = require("../controllers/verifyController");

// Public verification endpoint
router.get("/:certId", verifyCertificate);

module.exports = router;
