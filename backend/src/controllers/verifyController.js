const { contract } = require("../config/blockchain");

const verifyCertificate = async (req, res) => {
  try {
    const { certId } = req.params;

    const result = await contract.verifyCertificate(certId);

    const statusEnum = Number(result[5]);
    const status = statusEnum === 0 ? "ACTIVE" : "REVOKED";

    res.json({
      valid: status === "ACTIVE",
      status,
      certId: result[0],
      sha256Hash: result[1],
      ipfsCID: result[2],
      issuedAt: new Date(Number(result[3]) * 1000),
      issuer: result[4],
      ipfsURL: `https://green-decisive-rat-768.mypinata.cloud/ipfs/${result[2]}`
    });

  } catch (error) {
    if (error.reason === "Certificate not found") {
      return res.status(404).json({
        valid: false,
        status: "NOT_FOUND",
        message: "Certificate not found on blockchain"
      });
    }

    res.status(500).json({
      valid: false,
      error: error.message
    });
  }
};

module.exports = {
  verifyCertificate,
};
