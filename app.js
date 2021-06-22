require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const port = process.env.PORT || 3000;

// init a simple http server
const server = http.createServer(app);

// connect to WebSocket server api
const wsServerApi = new WebSocket("ws://151.106.113.207:9000/ws");

wsServerApi.on("message", function incoming(data) {
  console.log("incoming data: ", data);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use((req, res, next) => {
  req.wsServerApi = wsServerApi;
  next();
});

// Routes
const routes = require("./routes/index");
const ghostquests = require("./routes/ghostquest");
const multiCurrencyV1 = require("./routes/multi-currency/v1");
const etherscan = require("./routes/etherscan");
const wallet = require("./routes/wallet");

app.use("/", routes);
app.use("/ghostquest", ghostquests);
app.use("/multi-currency/v1", multiCurrencyV1);
app.use("/etherscan", etherscan);
app.use("/wallet", wallet);

server.listen(port, () => {
  console.log(`Server is started on port ${port}...`);
});
