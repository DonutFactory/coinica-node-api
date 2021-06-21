const chalk = require("chalk");

const { eth_getTransactionByHash } = require("../../services/etherscan_api");

exports.getTransactionByHash = async (req, res) => {
  try {
    const {
      body: { tx_hash, currency },
    } = req;
    const response = await eth_getTransactionByHash({ tx_hash, currency });

    return res.json({ currency, ...response });
  } catch (error) {

    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
