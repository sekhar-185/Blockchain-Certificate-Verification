const Certificate = require("../models/Certificate");
const Student = require("../models/Student");
const Institute = require("../models/Institute");
const { contract } = require("../config/blockchain");

/**
 * PUBLIC CERTIFICATE VERIFICATION
 * No authentication required
 */const verifyCertificatePublic = async (req, res) => {
  try {
    const { certId } = req.params;

    // 1️⃣ Find certificate in DB
    const certificate = await Certificate.findOne({ certId });
    if (!certificate) {
      return res.status(404).json({
        valid: false,
        message: "Certificate not found"
      });
    }

    // 2️⃣ Fetch blockchain data (proof)
    const chainData = await contract.verifyCertificate(certId);

    // 3️⃣ Fetch related entities
    const student = await Student.findById(certificate.studentId);
    const institute = await Institute.findById(certificate.instituteId);

    if (!student || !institute) {
      return res.status(500).json({
        valid: false,
        message: "Related data missing"
      });
    }

    // 🧠 Extract blockchain values
    const onChainHash = chainData[1];
    const issuer = chainData[4];

    // 🔐 Hash comparison
    const fileHash = certificate.sha256Hash;
    const hashMatched = fileHash === onChainHash;

    // 4️⃣ Final public response (EXTENDED, NOT BROKEN)
    res.json({
      valid: certificate.status === "ACTIVE",
      certId: certificate.certId,
      status: certificate.status,

      student: {
        name: student.name,
        rollNumber: student.studentId,
        program: student.program,
        department: student.department,
        admissionYear: student.admissionYear
      },

      institute: {
        name: institute.name
      },

      certificate: {
        title: certificate.title,
        type: certificate.type,
        category: certificate.certificateCategory
      },

      issuedAt: certificate.issuedAt,
      revokedAt: certificate.revokedAt || null,

      ipfsURL: certificate.ipfsURL,

      // 🔗 Blockchain info (existing + new)
      blockchain: {
        contractAddress: process.env.CONTRACT_ADDRESS,
        issuer,
        txHash: certificate.blockchainTx || null
      },

      // 🔑 Hash verification (NEW, SAFE)
      hashes: {
        fileHash,
        onChainHash,
        matched: hashMatched
      }
    });

  } catch (error) {
    console.error("Public Verify Error:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  verifyCertificatePublic
};
