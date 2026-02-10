const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

const {
  verifyCertificateWithFile
} = require("../controllers/verifyCertificateWithFile");

router.post(
  "/verify-file/:certId",
  upload.single("certificate"),
  verifyCertificateWithFile
);

module.exports = router;
