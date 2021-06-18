var express = require("express");
var router = express.Router();

const { withdrawEther } = require("../../controllers/wallet/withdraw-eth");
const { withdrawUSDC } = require("../../controllers/wallet/withdraw-usdc");

router.get("/", (_, res) => res.send("EGS WALLET API"));

router.post("/withdraw-eth", withdrawEther);
router.post("/withdraw-usdc", withdrawUSDC);

module.exports = router;
