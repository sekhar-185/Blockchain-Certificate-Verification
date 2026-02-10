const express = require("express");
const router = express.Router();
const { listIssuedCertificates } = require("../controllers/instituteDashboardController");
const { revokeCertificateByInstitute } = require("../controllers/instituteRevokeController");
const { authenticateInstitute } = require("../middlewares/auth");

// List issued certificates
router.get("/certificates", authenticateInstitute, listIssuedCertificates);

// Revoke certificate
router.post("/revoke/:certId", authenticateInstitute, revokeCertificateByInstitute);

module.exports = router;
