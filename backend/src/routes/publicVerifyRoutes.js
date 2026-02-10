const express = require("express");
const router = express.Router();
const { verifyCertificatePublic } = require("../controllers/publicVerifyController");

// Public QR verification
router.get("/:certId", verifyCertificatePublic);

module.exports = router;
