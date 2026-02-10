const express = require("express");
const router = express.Router();
const { revokeCertificate } = require("../controllers/revokeController");

// Only issuer can revoke
router.post("/:certId", revokeCertificate);

module.exports = router;
