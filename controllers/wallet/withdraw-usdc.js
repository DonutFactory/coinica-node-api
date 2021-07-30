const Web3 = require("web3");
const axios = require("axios");
const chalk = require("chalk");
const Tx = require("ethereumjs-tx").Transaction;
const WebSocket = require("ws");
const { onMessageSocketTx } = require("../../services/socket");

const IS_DEV = process.env.NODE_ENV === "development";

const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY;

const META_ADDRESS = process.env.METAMASK_ADDESS;
const PRIVATE_KEY = Buffer.from(process.env.METAMASK_PRIVATE_KEY, "hex");

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_PRIVATE_KEY = process.env.INFURA_PROJECT_KEY;
const NETWORK_CHAIN = IS_DEV
  ? process.env.ROPSTEN_TESTNET
  : process.env.ETH_MAINNET;

const TEMP_NONCE_EXT_DATA = "https://api.jsonbin.io/b/60c1f1c49fc30168f1cbb159";
const headers = {
  "secret-key": "$2b$10$FEpBX2bZ9BhQ3EoXWDCnteJiMCiuo246Vp1Zdyj32OBRCeqrQoES.",
};

const GAS_PRICE_URL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_KEY}`;

const ROPSTEN_USDC_ADDRESS = "0x07865c6e87b9f70255377e024ace6630c1eaa37f";

exports.withdrawUSDC = async (req, res) => {
  const { toHex, toWei, fromWei } = Web3.utils;
  try {
    const {
      body: { address, value, gasPrice, account_id },
      wsServerApi,
    } = req;

    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://:${INFURA_PRIVATE_KEY}@${NETWORK_CHAIN}.infura.io/v3/${INFURA_PROJECT_ID}`
      )
    );

    const encodedAbi = web3.eth.abi.encodeFunctionCall(
      {
        name: "transfer",
        type: "function",
        inputs: [
          {
            type: "address",
            name: "_to",
          },
          {
            type: "uint256",
            name: "_value",
          },
        ],
      },
      [address, `${+value * 1000000}`]
    );

    // const { data } = await axios.get(GAS_PRICE_URL)
    // const gasPrice = toWei(data.result.FastGasPrice, "gwei")

    // custon nonce data
    // const { data: { nonce }} = await axios.get(TEMP_NONCE_EXT_DATA, { headers })
    // nonce based on latest block
    const nonce = await web3.eth.getTransactionCount(
      META_ADDRESS.toLowerCase()
    );
    // const parsedValue = toWei(value.toString(), "ether")
    // const gasPriceInEth = fromWei(gasPrice, "ether")

    const rawTx = {
      nonce,
      gasPrice: toHex(gasPrice),
      gasLimit: toHex("500000"),
      from: META_ADDRESS.toLowerCase(),
      to: ROPSTEN_USDC_ADDRESS.toLowerCase(),
      data: encodedAbi,
    };

    console.log(chalk.green("Sending transaction (USDC): "), rawTx);

    const tx = new Tx(rawTx, { chain: NETWORK_CHAIN });
    tx.sign(PRIVATE_KEY);
    const serializedTx = tx.serialize();

    if (wsServerApi.readyState === WebSocket.OPEN) {
      web3.eth
        .sendSignedTransaction("0x" + serializedTx.toString("hex"))
        .once("transactionHash", async (txHash) => {
          // await axios.put(TEMP_NONCE_EXT_DATA, { nonce: (+nonce + 1) }, { headers })
          // .then(res => console.log("UPDATED NONCE TO: ", +nonce + 1))
          // .catch(err => console.log("ERROR UPDATING NONCE", err))

          // Notify server api via websocket about user withdraw
          try {
            const result = {
              account_id: account_id,
              tx_hash: txHash,
              tx_type: "WITHDRAW",
              currency: "USDC",
            };
            wsServerApi.send(JSON.stringify(result));

            // Note: status: 0 = Fail, 1 = Pass
            const { data } = await onMessageSocketTx(
              wsServerApi,
              "withdraw-usdc"
            );
            return res.json({ status: data });
          } catch (error) {
            return res.status(500).json({
              status: 0,
              message: error.message,
            });
          }
        })
        .catch((error) => {
          console.log({ sendSignedTransaction_ERROR: error });

          return res.status(500).json({
            status: 0,
            message: error.message,
          });
        });
    } else {
      return res.status(500).json({
        status: 0,
        message: "Cannot connect to websocket server",
      });
    }
  } catch (error) {
    console.log(chalk.red(error));

    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};
