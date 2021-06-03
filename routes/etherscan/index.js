var express = require("express");
var router = express.Router();

const { getTransactionHashStatus } = require("../../controllers/etherscan");
const { withdrawEther } = require("../../controllers/etherscan/winthdraw");
const validate = require("../../validation/etherscan_validation");

router.get("/", (_, res) => res.send("EGS ETHERSCAN API"));

router.get("/txhash-status", validate.txHash, getTransactionHashStatus);
router.get("/withdraw-eth", withdrawEther);

module.exports = router;
