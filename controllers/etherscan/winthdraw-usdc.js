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

const TEMP_NONCE_EXT_DATA = "https://api.jsonbin.io/b/60c1f1c49fc30168f1cbb159"
const headers = { 
  "secret-key": "$2b$10$FEpBX2bZ9BhQ3EoXWDCnteJiMCiuo246Vp1Zdyj32OBRCeqrQoES."
}

const GAS_PRICE_URL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_KEY}`

const ROPSTEN_USDC_ADDRESS = "0x07865c6e87b9f70255377e024ace6630c1eaa37f"

exports.withdrawUSDC = async (req, res) => {
  const { toHex, toWei, fromWei } = Web3.utils;
  try {
    const { address, value  } = req.body;

    if (!address || !value) {
      return res.status(400).json({
        error: true,
        message: 'Required parameters: address, value'
      })
    }

    const web3 = new Web3(new Web3.providers.HttpProvider(`https://:${INFURA_PRIVATE_KEY}@${NETWORK_CHAIN}.infura.io/v3/${INFURA_PROJECT_ID}`));

    const encodedAbi = web3.eth.abi.encodeFunctionCall({
      name: 'transfer',
      type: 'function',
      inputs: [{
          type: 'address',
          name: '_to'
      },{
          type: 'uint256',
          name: '_value'
      }]
    }, [address, `${(+value) * 1000000}`]);

    console.log({ encodedAbi, value: (+value) * 1000000 })
    
    const { data } = await axios.get(GAS_PRICE_URL)
    // custon nonce data
    // const { data: { nonce }} = await axios.get(TEMP_NONCE_EXT_DATA, { headers })
    // nonce based on latest block
    const nonce = await web3.eth.getTransactionCount(META_ADDRESS)
    const gasPrice = toWei(data.result.FastGasPrice, "gwei")
    // const parsedValue = toWei(value.toString(), "ether")
    // const gasPriceInEth = fromWei(gasPrice, "ether")

    const rawTx = {
      nonce,
      gasPrice: toHex(+gasPrice * 1.5),
      gasLimit: toHex("100000"),
      from: META_ADDRESS,
      to: ROPSTEN_USDC_ADDRESS,
      data: encodedAbi,
    }

    console.log(chalk.green('Sending transaction (USDC): '), rawTx)

    const tx = new Tx(rawTx, { chain: NETWORK_CHAIN });
    tx.sign(PRIVATE_KEY);
    const serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .once('transactionHash', async(txHash) => {
      // await axios.put(TEMP_NONCE_EXT_DATA, { nonce: (+nonce + 1) }, { headers })
      // .then(res => console.log("UPDATED NONCE TO: ", +nonce + 1))
      // .catch(err => console.log("ERROR UPDATING NONCE", err))
      
      res.status(200).json({
        error: false,
        message: "success",
        tx_hash: txHash,
      })
    })
    .catch(error => {
      console.log({ sendSignedTransaction_ERROR: error })
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