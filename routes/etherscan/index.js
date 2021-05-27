var express = require("express");
var router = express.Router();

const { getTransactionHashStatus } = require("../../controllers/etherscan");
const validate = require("../../validation/etherscan_validation");

router.get("/", (_, res) => res.send("EGS ETHERSCAN API"));

router.get("/txhash-status", validate.txHash, getTransactionHashStatus);

module.exports = router;
