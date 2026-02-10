const Certificate = require("../models/Certificate");
const Student = require("../models/Student");

/**
 * LIST ALL CERTIFICATES ISSUED BY INSTITUTE
 */
const listIssuedCertificates = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const certificates = await Certificate.find({ instituteId })
      .populate("studentId", "name studentId")
      .select(
        "certId title type status issuedAt revokedAt blockchainTx ipfsURL"
      )
      .sort({ issuedAt: -1 });

    res.json({ certificates });

  } catch (error) {
    console.error("Institute Dashboard Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listIssuedCertificates
};
