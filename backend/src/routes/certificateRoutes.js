const express = require("express");
const router = express.Router();
const multer = require("multer");
const { issueCertificate } = require("../controllers/issueController");
const { authenticateInstitute } = require("../middlewares/auth");
// multer config
const upload = multer({ dest: "uploads/" });

// ISSUE certificate (hash only for now)
router.post("/issue",authenticateInstitute, upload.single("certificate"), issueCertificate);

// test route
router.get("/test", (req, res) => {
  res.json({ message: "Certificate routes working" });
});

module.exports = router;
