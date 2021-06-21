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

    console.log("try init wsServerApi", wsServerApi)
    console.log("try init wsServerApi readyState", wsServerApi.readyState)

    //broadcast the response to server
    if (wsServerApi && wsServerApi.readyState === WebSocket.OPEN) {
      wsServerApi.send(JSON.stringify(result));
    }
    else {
      console.log("cannot send message to websocket server");
    }

    return res.json(result);
  } catch (error) {
    console.log(chalk.red(error));
    console.log("catch init wsServerApi", wsServerApi)
    console.log("catch init wsServerApi readyState", wsServerApi.readyState)

    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
