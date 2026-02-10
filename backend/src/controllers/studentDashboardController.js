const Certificate = require("../models/Certificate");

/**
 * GET MY CERTIFICATES
 * Logged-in student can view all certificates issued to them
 */const getMyCertificates = async (req, res) => {
  try {
    const studentObjectId = req.user.studentId;

    const certificates = await Certificate.find({
      studentId: studentObjectId
    })
      .select(
        "certId title type status issuedAt ipfsURL blockchainTx verifyURL qrCode"
      )
      .sort({ issuedAt: -1 });

    res.json({ certificates });

  } catch (error) {
    console.error("Student Dashboard Error:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getMyCertificates
};
