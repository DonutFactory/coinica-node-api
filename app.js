require("dotenv").config();
const express = require("express");
const ws = require("ws");
const http = require("http");
const cors = require("cors");
const reconnectWs = require("reconnecting-websocket");
const { allowedOrigins } = require("./config");

const app = express();
const port = process.env.PORT || 3000;

// init a simple http server
const server = http.createServer(app);

// connect to WebSocket server api
const options = {
  WebSocket: ws,
  connectionTimeout: 1000,
};
const wsServerApi = new reconnectWs(
  process.env.SCALA_WEB_SOCKET_URL,
  [],
  options
);

wsServerApi.addEventListener("open", function open() {
  console.log("WS server connected");
});

wsServerApi.addEventListener("message", function incoming(event) {
  console.log("WS server incoming data: ", event.data);
});

wsServerApi.addEventListener("close", function close() {
  console.log("WS server is disconnected");
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//enable cors
app.use(
  cors({
    origin: allowedOrigins(),
  })
);
app.options("*", cors());

app.use((req, res, next) => {
  req.wsServerApi = wsServerApi;
  next();
});

// Routes
const routes = require("./routes/index");
const multiCurrencyV1 = require("./routes/multi-currency/v1");
const etherscan = require("./routes/etherscan");
const wallet = require("./routes/wallet");
const coincap = require("./routes/coincap");
const mahjonghilo = require("./routes/mahjong-hilo");
const ghostquest = require("./routes/ghostquest");
const treasurehunt = require("./routes/treasurehunt");

app.use("/", routes);
app.use("/multi-currency/v1", multiCurrencyV1);
app.use("/etherscan", etherscan);
app.use("/wallet", wallet);
app.use("/coincap", coincap);
app.use("/mahjong-hilo", mahjonghilo);
app.use("/ghostquest", ghostquest);
app.use("/treasurehunt", treasurehunt);

server.listen(port, () => {
  console.log(`Server is started on port ${port}...`);
});
