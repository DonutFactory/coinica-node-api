var chalk = require("chalk");
var etherscan = require("etherscan-api");

const IS_DEV = process.env.NODE_ENV !== "production";
const API_KEY = process.env.ETHERSCAN_API_KEY;
const CHAIN = IS_DEV ? process.env.ETHERSCAN_TEST_NET : "";

var api = etherscan.init(API_KEY, CHAIN);

exports.getTransactionHashStatus = async (req, res) => {
  try {
    const { txhash, username } = req.body;
    const response = await api.proxy.eth_getTransactionByHash(txhash);

    return res.json({ username, ...response });
  } catch (error) {
    console.log(chalk.red(error));

    return res.status(400).json({
      error: true,
      message: error,
    });
  }
};
