const chalk = require("chalk");
const { eth_getTransactionByHash } = require("../services/etherscan_api");

exports.WSetherscan = (ws, wss, app) => {
  ws.on("message", async function incoming(message) {
    try {
      if (!message) {
        ws.send(
          JSON.stringify({
            error: true,
            message: "txhash param is required.",
          })
        );
        return;
      }

      const response = await eth_getTransactionByHash(message);
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
