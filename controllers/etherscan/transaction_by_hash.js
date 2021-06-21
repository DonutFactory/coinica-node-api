const chalk = require("chalk");
const WebSocket = require("ws");

const { eth_getTransactionByHash } = require("../../services/etherscan_api");

// const broadcast = (clients, message) => {
//   if (clients && clients.size) {
//     clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   }
// };

exports.getTransactionByHash = async (req, res) => {
  try {
    const {
      body: { txhash, currency },
      wsConn,
    } = req;
    const response = await eth_getTransactionByHash({ txhash, currency });

    const result = { ...req.body, ...response };
    //broadcast the response to connected client
    // broadcast(app.locals.clients, JSON.stringify(response));
    // console.log("ws send mssage", req.wsConn);
    wsConn.on("open", () => {
      wsConn.send(JSON.stringify(result));
    });

    return res.json(result);
  } catch (error) {
    console.log(chalk.red(error));

    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
