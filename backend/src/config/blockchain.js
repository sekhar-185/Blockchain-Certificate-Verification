require("dotenv").config(); // 🔥 MUST be first

const { ethers } = require("ethers");

// 🌐 Provider (Sepolia)
const provider = new ethers.JsonRpcProvider(
  process.env.SEPOLIA_RPC_URL
);

// 👛 Wallet (trim fixes Windows newline issues)
const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY.trim(),
  provider
);

// 📜 Contract ABI (matches deployed contract)
const contractABI = [
  "function issueCertificate(string,string,string)",
  "function revokeCertificate(string)",
  "function verifyCertificate(string) view returns (string,string,string,uint256,address,uint8)"
];

// 📦 Contract instance
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  wallet
);

module.exports = {
  provider,
  wallet,
  contract
};
