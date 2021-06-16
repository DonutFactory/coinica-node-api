const chalk = require("chalk");
const WebSocket = require("ws");

const { eth_getTransactionByHash } = require("../../services/etherscan_api");

const broadcast = (clients, message) => {
  if (clients && clients.size) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
};

exports.getTransactionByHash = async (req, res) => {
  try {
    const {
      body: { txhash, currency },
      app,
    } = req;
    const response = await eth_getTransactionByHash({ txhash, currency });

    //broadcast the response to connected client
    broadcast(app.locals.clients, JSON.stringify(response));

    return res.json({ currency, ...response });
  } catch (error) {
    console.log(chalk.red(error));

    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
