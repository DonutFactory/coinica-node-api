const chalk = require("chalk");
const WebSocket = require("ws");
const { onMessageSocketTx } = require("../../services/socket");

exports.deposit = async (req, res) => {
  try {
    const {
      body: { account_id, tx_hash, issuer, receiver, currency, amount },
      wsServerApi,
    } = req;

    if (wsServerApi.readyState === WebSocket.OPEN) {
      try {
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

        // Note: status: 0 = Fail, 1 = Pass
        const { data } = await onMessageSocketTx(wsServerApi, "deposit");
        return res.json({ status: data });
      } catch (error) {
        return res.status(500).json({
          status: 0,
          message: error.message,
        });
      }
    }
    return res
      .status(500)
      .json({ status: 0, message: "Cannot connect to websocket server" });
  } catch (error) {
    console.log(chalk.red(error));

    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};
