var express = require("express");
var router = express.Router();

const {
  getTransactionByHash,
} = require("../../controllers/etherscan/transaction_by_hash");
const { withdrawEther } = require("../../controllers/etherscan/winthdraw");
const validate = require("../../validation/etherscan_validation");

router.get("/", (_, res) => res.send("EGS ETHERSCAN API"));

router.get("/txhash-status", validate.txHash, getTransactionByHash);
router.get("/withdraw-eth", withdrawEther);

module.exports = router;
