// routes/blockchainRoutes.js
const express = require("express");
const router = express.Router();
const { getBlockchainStatus } = require("../controllers/blockchainStatusController");

router.get("/status", getBlockchainStatus);

module.exports = router;
