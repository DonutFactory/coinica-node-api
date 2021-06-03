const Web3 = require('web3');
const axios = require('axios');
const chalk = require("chalk");
const Tx = require('ethereumjs-tx').Transaction;

const IS_DEV = process.env.NODE_ENV === "development"

const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY;

const META_ADDRESS = process.env.METAMASK_ADDESS;
const PRIVATE_KEY = Buffer.from(process.env.METAMASK_PRIVATE_KEY, 'hex');

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID
const INFURA_PRIVATE_KEY = process.env.INFURA_PROJECT_KEY
const NETWORK_CHAIN = IS_DEV ? process.env.ROPSTEN_TESTNET : process.env.ETH_MAINNET

const GAS_PRICE_URL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_KEY}`

exports.withdrawEther = async (req, res) => {
  const { toHex, toWei } = Web3.utils;
  try {
    const { address, value } = req.body;

    if (!address || !value) {
      return res.status(400).json({
        error: true,
        message: 'Required parameters: address, value'
      })
    }

    const web3 = new Web3(new Web3.providers.HttpProvider(`https://:${INFURA_PRIVATE_KEY}@${NETWORK_CHAIN}.infura.io/v3/${INFURA_PROJECT_ID}`));
    
    const { data } = await axios.get(GAS_PRICE_URL)
    const gasPrice = toWei(data.result.FastGasPrice, "gwei")

    // const parsedValue = parseFloat(toWei((value + ""), 'ether'))
    const rawTx = {
      gasPrice: toHex(gasPrice),
      from: META_ADDRESS,
      to: address,
      value: toHex(toWei(value.toString(), "ether")),
      data: "0x"
    }

    const tx = new Tx(rawTx, { chain: NETWORK_CHAIN });
    tx.sign(PRIVATE_KEY);
    
    const serializedTx = tx.serialize();
    
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .then(response => console.log({ response }))
    .catch((error) => {
      console.log({ transactionErr: error })
      return res.status(400).json({
        error: true,
        message: error,
      });
    })

  } catch (error) {
    console.log(chalk.red(error));

    return res.status(400).json({
      error: true,
      message: error,
    });
  }
};
