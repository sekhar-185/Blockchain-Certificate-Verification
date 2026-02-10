const fs = require("fs");
const { generateFileHash } = require("../services/hashService");
const Certificate = require("../models/Certificate");
const { contract } = require("../config/blockchain");
const { generateQRCode } = require("../services/qrService");

const verifyCertificateWithFile = async (req, res) => {
  try {
    const { certId } = req.params;

    if (!req.file) {
      return res.status(400).json({
        valid: false,
        message: "Certificate PDF file is required"
      });
    }

    // 1️⃣ Fetch certificate from DB
    const certificate = await Certificate
      .findOne({ certId })
      .populate("studentId", "name studentId program department");

    if (!certificate) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        valid: false,
        message: "Certificate not found"
      });
    }

    // 2️⃣ Check revocation
    if (certificate.status === "REVOKED") {
      fs.unlinkSync(req.file.path);
      return res.json({
        valid: false,
        revoked: true,
        status: "REVOKED",
        message: "Certificate has been revoked by institute"
      });
    }

    // 3️⃣ Fetch blockchain hash
    const chainData = await contract.verifyCertificate(certId);
    const blockchainHash = chainData[1]; // sha256 hash stored on-chain

    // 4️⃣ Generate hash from uploaded file
    const uploadedFileHash = generateFileHash(req.file.path);

    // cleanup uploaded file
    fs.unlinkSync(req.file.path);

    // 5️⃣ Compare hashes
    if (uploadedFileHash !== blockchainHash) {
      return res.json({
        valid: false,
        tampered: true,
        status: "TAMPERED",
        message: "Uploaded certificate does not match blockchain record"
      });
    }

    // 6️⃣ Generate verify URL + QR
    const verifyURL = `${process.env.BASE_URL}/api/public/verify/${certId}`;
    const qrCode = await generateQRCode(verifyURL);

    // 7️⃣ SUCCESS RESPONSE (STANDARD)
    res.json({
      valid: true,
      tampered: false,
      status: "ACTIVE",
      message: "Certificate is authentic and untampered",

      certId: certificate.certId,

      certificate: {
        title: certificate.title,
        type: certificate.type,
        category: certificate.certificateCategory,
        issuedAt: certificate.issuedAt
      },

      student: {
        name: certificate.studentId.name,
        rollNumber: certificate.studentId.studentId,
        program: certificate.studentId.program,
        department: certificate.studentId.department
      },

      ipfsURL: certificate.ipfsURL,
      blockchainTx: certificate.blockchainTx,
      verifyURL,
      qrCode
    });

  } catch (error) {
    console.error("Verify File Error:", error);
    res.status(500).json({
      valid: false,
      message: "Verification failed",
      error: error.message
    });
  }
};

module.exports = { verifyCertificateWithFile };
