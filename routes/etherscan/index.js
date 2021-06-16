var express = require("express");
var router = express.Router();

const {
  getTransactionByHash,
} = require("../../controllers/etherscan/transaction_by_hash");
const { withdrawEther } = require("../../controllers/etherscan/winthdraw-eth");
const { withdrawUSDC } = require("../../controllers/etherscan/winthdraw-usdc");
const validate = require("../../validation/etherscan_validation");

router.get("/", (_, res) => res.send("EGS ETHERSCAN API"));

router.post("/transaction/details", validate.txHash, getTransactionByHash);
router.post("/withdraw-eth", withdrawEther);
router.post("/withdraw-usdc", withdrawUSDC);

module.exports = router;
