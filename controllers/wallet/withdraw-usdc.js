const Web3 = require("web3");
const chalk = require("chalk");
const WebSocket = require("ws");
const { onMessageSocketTx } = require("../../services/socket");

const IS_DEV = process.env.NODE_ENV === "development";

const META_ADDRESS = process.env.METAMASK_ADDESS;
const META_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_PRIVATE_KEY = process.env.INFURA_PROJECT_KEY;
const NETWORK_CHAIN = IS_DEV
  ? process.env.ROPSTEN_TESTNET
  : process.env.ETH_MAINNET;

const ROPSTEN_USDC_ADDRESS = "0x07865c6e87b9f70255377e024ace6630c1eaa37f";

exports.withdrawUSDC = async (req, res) => {
  const { toHex, toWei } = Web3.utils;
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

    const to = ROPSTEN_USDC_ADDRESS.toLowerCase();
    const from = META_ADDRESS.toLowerCase();
    const nonce = await web3.eth.getTransactionCount(from);
    const maxPriorityFeePerGas = toHex(toWei("1", "gwei"));
    const txType = toHex(2); // transaction type that support property maxFeePerGas and maxPriorityFeePerGas

    const paramsTx = {
      nonce,
      to,
      from,
      gasLimit: toHex("500000"),
      data: encodedAbi,
      type: txType,
      maxPriorityFeePerGas,
      chain: NETWORK_CHAIN,
      hardfork: "london",
    };

    console.log(chalk.green("Sending transaction (USDC): "), paramsTx);

    if (wsServerApi.readyState !== WebSocket.OPEN) {
      return res.status(500).json({
        status: 0,
        message: "Cannot connect to websocket server",
      });
    }
    const signedTx = await web3.eth.accounts.signTransaction(
      paramsTx,
      META_PRIVATE_KEY
    );

    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .once("transactionHash", async (txHash) => {

        // Notify scala websocket server about user withdraw
        try {
          const result = {
            account_id: account_id,
            tx_hash: txHash,
            tx_type: "WITHDRAW",
            currency: "USDC",
          };
          wsServerApi.send(JSON.stringify(result));

          // Note: status: 0 = Fail, 1 = Pass
          const { data } = await onMessageSocketTx(wsServerApi, "withdraw-usdc");
          return res.json({ status: data });

        } catch (error) {
          return res.status(500).json({
            status: 0,
            message: error.message,
          });
        }
      })
      .catch((error) => {
        console.log(chalk.red({ sendSignedTransaction_ERROR: error }));

        return res.status(500).json({
          status: 0,
          message: error.message,
        });
      });
  } catch (error) {
    console.log(chalk.red(error));

    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};
