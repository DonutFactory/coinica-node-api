var express = require("express");
var router = express.Router();

const { withdrawEther } = require("../../controllers/wallet/withdraw-eth");
const { withdrawUSDC } = require("../../controllers/wallet/withdraw-usdc");
const { deposit } = require("../../controllers/wallet/deposit");
const validate = require("../../validation/wallet_validation");

router.get("/", (_, res) => res.send("EGS WALLET API"));

router.post("/withdraw-eth", withdrawEther);
router.post("/withdraw-usdc", withdrawUSDC);
router.post("/deposit", validate.deposit, deposit);

module.exports = router;
