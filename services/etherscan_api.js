const etherscan = require("etherscan-api");
const Web3 = require("web3");
const { fromWei, hexToNumber } = Web3.utils;

const IS_DEV = process.env.NODE_ENV === "development";
const API_KEY = process.env.ETHERSCAN_API_KEY;
const CHAIN = IS_DEV ? process.env.ETHERSCAN_TEST_NET : "";

const api = etherscan.init(API_KEY, CHAIN);

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_PRIVATE_KEY = process.env.INFURA_PROJECT_KEY;
const NETWORK_CHAIN = IS_DEV
  ? process.env.ROPSTEN_TESTNET
  : process.env.ETH_MAINNET;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://:${INFURA_PRIVATE_KEY}@${NETWORK_CHAIN}.infura.io/v3/${INFURA_PROJECT_ID}`
  )
);

exports.eth_getTransactionByHash = async ({ tx_hash, currency }) => {
  try {
    const response = await api.proxy.eth_getTransactionByHash(tx_hash);

    if (!response.result) {
      return response;
    }

    const {
      result: { input, blockNumber, gas, gasPrice, nonce },
    } = response;
    let decodedData = { to: null, value: null };

    switch (currency.toUpperCase()) {
      case "USDC":
        const inputData = "0x" + input.slice(10);
        const decodedInputData = web3.eth.abi.decodeParameters(
          ["address", "uint256"],
          inputData
        );

        const tokenValue = fromWei(decodedInputData[1], "mwei");
        decodedData = {
          to: decodedInputData[0],
          value: tokenValue,
        };

        break;
      case "ETH":
        const etherValue = fromWei(response.result.value, "ether");

        decodedData = {
          to: response.result.to,
          value: etherValue,
        };
        break;

      default:
        break;
    }

    return {
      ...response,
      result: {
        ...response.result,
        blockNumber: hexToNumber(blockNumber),
        gas: hexToNumber(gas),
        gasPrice: hexToNumber(gasPrice) / 1000000000,
        nonce: hexToNumber(nonce),
        to: decodedData.to.toLowerCase(),
        value: decodedData.value,
      },
    };
  } catch (error) {
    throw error;
  }
};
