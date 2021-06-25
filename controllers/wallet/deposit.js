const chalk = require("chalk");
const WebSocket = require("ws");

exports.deposit = async (req, res) => {
  try {
    const {
      body: { account_id, tx_hash, issuer, receiver, currency, amount },
      wsServerApi,
    } = req;

    if (wsServerApi.readyState === WebSocket.OPEN) {
      wsServerApi.send(
        JSON.stringify({
          account_id,
          tx_hash,
          tx_type: "DEPOSIT",
          issuer,
          receiver,
          currency,
          amount,
        })
      );
      return res.json({ status: 1 });
    }

    return res
      .status(500)
      .json({
        status: 0,
        message: "Cannot connect to websocket server",
        wsServerApi: wsServerApi.readyState,
      });
  } catch (error) {
    console.log(chalk.red(error));

    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};
