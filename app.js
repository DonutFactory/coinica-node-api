require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const port = process.env.PORT || 3000;

// init a simple http server
const server = http.createServer(app);

// init the WebSocket server instance
const wss = new WebSocket.Server({ server, path: "/etherscan" });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const { WSetherscan } = require("./socket");

// Handle client websocket requests
wss.on("connection", (ws) => WSetherscan(ws, wss, app));

// Routes
const routes = require("./routes/index");
const ghostquests = require("./routes/ghostquest");
const multiCurrencyV1 = require("./routes/multi-currency/v1");
const etherscan = require("./routes/etherscan");

app.use("/", routes);
app.use("/ghostquest", ghostquests);
app.use("/multi-currency/v1", multiCurrencyV1);
app.use("/etherscan", etherscan);

server.listen(port, () => {
  console.log(`Server is started on port ${port}...`);
});
