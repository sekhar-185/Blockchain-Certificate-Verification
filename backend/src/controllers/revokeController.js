const { contract } = require("../config/blockchain");

const revokeCertificate = async (req, res) => {
  try {
    const { certId } = req.params;

    const tx = await contract.revokeCertificate(certId);
    await tx.wait();

    res.json({
      message: "Certificate revoked permanently",
      certId,
      txHash: tx.hash
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

module.exports = {
  revokeCertificate,
};
