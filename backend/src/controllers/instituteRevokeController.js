const Certificate = require("../models/Certificate");
const Institute = require("../models/Institute");
const { contract } = require("../config/blockchain");

/**
 * REVOKE CERTIFICATE (Institute Only)
 */
const revokeCertificateByInstitute = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;
    const { certId } = req.params;

    const certificate = await Certificate.findOne({ certId, instituteId });
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    if (certificate.status === "REVOKED") {
      return res.status(400).json({ message: "Certificate already revoked" });
    }

    // 🔐 Wallet ownership check
    const institute = await Institute.findById(instituteId);
    if (
      institute.walletAddress.toLowerCase() !==
      contract.runner.address.toLowerCase()
    ) {
      return res.status(403).json({ message: "Wallet mismatch" });
    }

    // 🔗 Revoke on blockchain
let tx;
try {
  tx = await contract.revokeCertificate(certId);
  await tx.wait();
} catch (err) {
  // 🔥 Handle smart contract revert cleanly
  if (
    err.shortMessage?.includes("already revoked") ||
    err.reason?.includes("already revoked") ||
    err.message?.includes("already revoked")
  ) {
    // Sync DB just in case
    await Certificate.findOneAndUpdate(
      { certId },
      { status: "REVOKED", revokedAt: new Date() }
    );

    return res.status(400).json({
      message: "Certificate already revoked"
    });
  }

  throw err; // unknown error → go to main catch
}


  } catch (error) {
    console.error("Revoke Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  revokeCertificateByInstitute
};
