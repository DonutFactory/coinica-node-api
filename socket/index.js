const chalk = require("chalk");
const { eth_getTransactionByHash } = require("../services/etherscan_api");

exports.WSetherscan = (ws, wss, app) => {
  // incoming message should json-formated string.
  ws.on("message", async function incoming(message) {
    try {
      const data = JSON.parse(message);

      if (!data || !data.txhash || !data.currency) {
        ws.send(
          JSON.stringify({
            error: true,
            message: "txhash and currency params is required.",
          })
        );
        return;
      }

      const response = await eth_getTransactionByHash(data);
      ws.send(JSON.stringify(response));
    } catch (error) {
      console.log(chalk.red(error));

      ws.send(JSON.stringify({ error: true, message: error.message }));
    }
  });
  // Get connected ws client id to able received from response of http request.
  app.locals.clients = wss.clients;
  ws.send("Etherscan websocket server connected!");
};
