const chalk = require("chalk");
const WebSocket = require("ws");

const { eth_getTransactionByHash } = require("../../services/etherscan_api");

exports.getTransactionByHash = async (req, res) => {
  try {
    const {
      body: { account_id, tx_hash, tx_type, currency },
      wsServerApi,
    } = req;
    const response = await eth_getTransactionByHash({ tx_hash, currency });

    const result = {
      account_id,
      tx_hash,
      tx_type,
      data: { currency, ...response },
    };

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
