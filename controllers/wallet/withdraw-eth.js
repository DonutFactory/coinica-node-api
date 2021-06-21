const Web3 = require('web3');
const axios = require('axios');
const chalk = require("chalk");
const Tx = require('ethereumjs-tx').Transaction;
const WebSocket = require("ws");

const IS_DEV = process.env.NODE_ENV === "development"

const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY;

const META_ADDRESS = process.env.METAMASK_ADDESS;
const PRIVATE_KEY = Buffer.from(process.env.METAMASK_PRIVATE_KEY, 'hex');

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID
const INFURA_PRIVATE_KEY = process.env.INFURA_PROJECT_KEY
const NETWORK_CHAIN = IS_DEV ? process.env.ROPSTEN_TESTNET : process.env.ETH_MAINNET

const TEMP_NONCE_EXT_DATA = "https://api.jsonbin.io/b/60c1f2b192164b68bec82608"
const headers = {
  "secret-key": "$2b$10$FEpBX2bZ9BhQ3EoXWDCnteJiMCiuo246Vp1Zdyj32OBRCeqrQoES.",
  "versioning": false
}

const GAS_PRICE_URL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_KEY}`

exports.withdrawEther = async (req, res) => {
  const { toHex, toWei, fromWei } = Web3.utils;
  try {
    const { body: { address, value, gasPrice, account_id }, wsServerApi } = req;

    if (!address || !value || !gasPrice) {
      return res.status(400).json({
        error: true,
        message: 'Required parameters: address, value, gasPrice'
      })
    }

    const web3 = new Web3(new Web3.providers.HttpProvider(`https://:${INFURA_PRIVATE_KEY}@${NETWORK_CHAIN}.infura.io/v3/${INFURA_PROJECT_ID}`));

    // const { data } = await axios.get(GAS_PRICE_URL)
    // const gasPrice = toWei(data.result.FastGasPrice, "gwei")

    // custon nonce data
    // const { data: { nonce }} = await axios.get(TEMP_NONCE_EXT_DATA, { headers })
    // nonce based on latest block
    const nonce = await web3.eth.getTransactionCount(META_ADDRESS)

    const parsedValue = toWei(value.toString(), "ether")
    // const gasPriceInEth = fromWei(gasPrice, "ether")

    const rawTx = {
      nonce,
      gasPrice: toHex(gasPrice),
      gasLimit: toHex("500000"),
      from: META_ADDRESS,
      to: address,
      value: toHex(parsedValue),
      data: "0x",
    }

    console.log(chalk.green('Sending transaction (ETH): '), rawTx)

    const tx = new Tx(rawTx, { chain: NETWORK_CHAIN });
    tx.sign(PRIVATE_KEY);
    const serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
      .once('transactionHash', (txHash) => {
        // console.log({ txHash })
        // axios.put(TEMP_NONCE_EXT_DATA, { nonce: (+nonce + 1) }, { headers })
        // .then(res => console.log("UPDATED NONCE TO: ", +nonce + 1))
        // .catch(err => console.log("ERROR UPDATING NONCE", err))
        // console.log("DONE UPDATING")

        //error = 0, success = 1
        //broadcast the response to websocket server api
        if (wsServerApi.readyState === WebSocket.OPEN) {
          console.log("send")
          const result = {
            status: 1,
            tx_hash: txHash,
            tx_type: "withdraw",
            currency: "ETH",
            account_id: account_id || null
          }
          wsServerApi.send(JSON.stringify(result));
        }

        res.status(200).json({
          error: false,
          message: "success",
          tx_hash: txHash,
        })
      })
      .catch(error => {
        console.log({ sendSignedTransaction_ERROR: error })
        const result = {
          status: 0,
          tx_hash: txHash,
          tx_type: "withdraw",
          currency: "ETH",
          account_id: account_id || null
        }
        wsServerApi.send(JSON.stringify(result));
        res.status(400).json({
          from: "sendSignedTransaction",
          error: true,
          message: error.message
        })
      })

  } catch (error) {
    console.log(chalk.red(error));

    return res.status(400).json({
      error: true,
      message: error.msg || error.message || error,
    });
  }
};
