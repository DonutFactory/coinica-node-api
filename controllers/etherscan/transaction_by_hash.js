const chalk = require("chalk");
const WebSocket = require("ws");

const { eth_getTransactionByHash } = require("../../services/etherscan_api");

exports.getTransactionByHash = async (req, res) => {
  try {
    const {
      body: { tx_hash, currency },
      wsServerApi,
    } = req;
    const response = await eth_getTransactionByHash({ tx_hash, currency });

    const result = { currency, ...response };

    //broadcast the response to server
    if (wsServerApi.readyState === WebSocket.OPEN) {
      wsServerApi.send(JSON.stringify(result));
    }

    return res.json(result);
  } catch (error) {
    console.log(chalk.red(error));

    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
