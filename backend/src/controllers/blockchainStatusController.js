const { provider, contract } = require("../config/blockchain");

const getBlockchainStatus = async (req, res) => {
  try {
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    const feeData = await provider.getFeeData();

    res.json({
      network: network.name,
      chainId: Number(network.chainId),
      synced: true,
      blockNumber,
      gasPrice: feeData.gasPrice
        ? `${Number(feeData.gasPrice) / 1e9} gwei`
        : "N/A",
      contractAddress: contract.target
    });
  } catch (error) {
    console.error("Blockchain Status Error:", error);
    res.status(500).json({ message: "Failed to fetch blockchain status" });
  }
};

module.exports = { getBlockchainStatus };
