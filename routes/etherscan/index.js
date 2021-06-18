var express = require("express");
var router = express.Router();

const {
  getTransactionByHash,
} = require("../../controllers/etherscan/transaction_by_hash");
const validate = require("../../validation/etherscan_validation");

router.get("/", (_, res) => res.send("EGS ETHERSCAN API"));

router.post("/transaction/details", validate.txHash, getTransactionByHash);

module.exports = router;
